/**
 * server.js - 金苹果之旅 后端服务（企业级架构版）
 *
 * 架构：
 *   db.js       → SQLite 数据库（替代 PostgreSQL，零安装）
 *   coze.js     → Coze API 调用纯函数（同步接口 + 异步队列复用）
 *   queue.js    → 进程内轻量异步队列（替代 Bull+Redis，含重试退避）
 *   fallback.js → AI 失败时的降级题目生成器
 *
 * 接口总览：
 *   GET  /                          首页
 *   GET  /health                    健康检查
 *   GET  /api/articles              列出所有文章（从 DB）
 *   GET  /api/article/:id           获取单篇文章
 *   GET  /api/article-status/:id    查询文章处理状态（异步轮询用）
 *   POST /api/upload-article         异步上传文章（入队，立即返回 pending）
 *   POST /api/analyze                SSE 同步分析（保留兼容旧前端）
 *   POST /api/word-meaning          查词（word_cache 表）
 *   GET  /api/user-words            获取用户收藏单词（按 status 筛选）
 *   POST /api/collect-word          拖拽收藏（存入 user_words 表）
 *   PUT  /api/word-status/:id        更新单词分类状态
 *   POST /api/check-in              连续打卡（更新 users.streak）
 *   POST /api/learning-record       记录学习数据
 *   POST /api/migrate                迁移 localStorage 数据到 DB
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const dbOps = require('./db');
const coze = require('./coze');
const queue = require('./queue');
const { generateFallbackQuestions } = require('./fallback');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// ==================== 工具函数 ====================

/**
 * 从请求中解析用户身份
 * 优先级：x-username header → body.username → 默认用户
 */
function getUserIdFromReq(req) {
    const username = req.headers['x-username'] || (req.body && req.body.username) || null;
    const user = dbOps.getOrCreateUser(username);
    return user.id;
}

// ==================== 启动初始化 ====================
dbOps.bootstrap();
const recovered = queue.recoverInterrupted();
if (recovered > 0) console.log(`🔄 恢复 ${recovered} 个中断任务`);

// ==================== 基础路由 ====================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        cozeConfigured: coze.isCozeConfigured(),
        cozeBotId: coze.config.COZE_BOT_ID || '未配置',
        port: PORT,
        database: 'SQLite',
        queue: '进程内轻量队列'
    });
});

// ==================== 文章相关接口 ====================

// 列出所有文章（从数据库）
app.get('/api/articles', (req, res) => {
    const articles = dbOps.listArticles().map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        level: a.level,
        levelLabel: a.level_label,
        source: a.source,
        status: a.status,
        wordCount: a.word_count,
        questionCount: (a.questions || []).length
    }));
    res.json(articles);
});

// 获取单篇文章（含 content/words/questions）
app.get('/api/article/:id', (req, res) => {
    const article = dbOps.getArticleById(req.params.id);
    if (!article) {
        return res.status(404).json({ error: '文章不存在' });
    }

    // 文章的 words 来自 word_cache 表（按文章内容提取）
    const allWords = coze.extractWords(article.content || '');
    const wordMeanings = dbOps.getWordMeaningFromCache(allWords);

    res.json({
        id: article.id,
        title: article.title,
        description: article.description,
        level: article.level,
        levelLabel: article.level_label,
        article: article.content,
        words: wordMeanings,
        sentences: article.sentences || [],
        questions: article.questions || [],
        status: article.status,
        source: article.source
    });
});

// 查询文章处理状态（前端轮询用）
app.get('/api/article-status/:id', (req, res) => {
    const article = dbOps.getArticleById(req.params.id);
    if (!article) {
        return res.status(404).json({ error: '文章不存在', status: 'not_found' });
    }

    // 已完成：返回文章内容 + questions
    if (article.status === 'completed') {
        const allWords = coze.extractWords(article.content || '');
        const wordMeanings = dbOps.getWordMeaningFromCache(allWords);
        return res.json({
            status: 'completed',
            articleId: article.id,
            title: article.title,
            content: article.content,
            level: article.level,
            levelLabel: article.level_label,
            words: wordMeanings,
            sentences: article.sentences || [],
            questions: article.questions || [],
            isFallback: false
        });
    }

    // 失败：调用降级函数生成基础题目
    if (article.status === 'failed') {
        const fallbackQuestions = generateFallbackQuestions(article.content || '');
        const allWords = coze.extractWords(article.content || '');
        const wordMeanings = dbOps.getWordMeaningFromCache(allWords);
        const queueStatus = queue.getQueueStatus(article.id);
        return res.json({
            status: 'failed',
            articleId: article.id,
            title: article.title,
            content: article.content,
            level: article.level,
            levelLabel: article.level_label,
            words: wordMeanings,
            questions: fallbackQuestions,
            isFallback: true,
            error: queueStatus ? queueStatus.error : 'AI 分析失败，已使用降级题目'
        });
    }

    // pending 或 processing：返回 processing（前端继续轮询）
    const queueStatus = queue.getQueueStatus(article.id);
    return res.json({
        status: 'processing',
        articleId: article.id,
        queueStatus: queueStatus ? queueStatus.status : article.status,
        retries: queueStatus ? queueStatus.retries : 0
    });
});

// 强制使用降级题目（前端 30 秒超时后点击「使用基础题目」按钮调用）
// 不更新文章 status（Coze 后台可能仍在重试），只返回降级题目供前端临时使用
app.post('/api/article-fallback/:id', (req, res) => {
    const article = dbOps.getArticleById(req.params.id);
    if (!article) {
        return res.status(404).json({ error: '文章不存在' });
    }
    const fallbackQuestions = generateFallbackQuestions(article.content || '');
    const allWords = coze.extractWords(article.content || '');
    const wordMeanings = dbOps.getWordMeaningFromCache(allWords);
    console.log(`🩹 降级题目: articleId=${article.id} | ${fallbackQuestions.length} 题`);
    res.json({
        status: 'failed',
        articleId: article.id,
        title: article.title,
        content: article.content,
        level: article.level,
        levelLabel: article.level_label,
        words: wordMeanings,
        sentences: article.sentences || [],
        questions: fallbackQuestions,
        isFallback: true
    });
});

// 异步上传文章（入队，立即返回）
app.post('/api/upload-article', (req, res) => {
    const { content, title, username } = req.body;

    if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: '文章内容不能为空' });
    }

    const userId = getUserIdFromReq(req);
    // 生成文章 ID：upload_<timestamp>
    const articleId = `upload_${Date.now()}`;

    // 插入 articles 表，status='pending'
    dbOps.insertArticle({
        id: articleId,
        user_id: userId,
        title: title || '用户上传文章',
        description: '用户上传的英语文章',
        content: content,
        source: 'upload',
        level: content.length > 3000 ? 'high' : 'middle',
        level_label: content.length > 3000 ? '高中' : '初中',
        status: 'pending',
        questions: [],
        sentences: []
    });

    // 加入队列（立即返回，后台处理）
    queue.enqueue({ articleId, content, userId, title });

    console.log(`📤 异步上传: articleId=${articleId} | ${content.length} 字符`);

    res.json({
        success: true,
        articleId,
        status: 'pending',
        message: '文章已提交，AI 正在后台分析'
    });
});

// SSE 同步分析接口（保留兼容旧前端 callAnalyzeAPI）
app.post('/api/analyze', async (req, res) => {
    const { article, title } = req.body;

    if (!article || article.trim().length === 0) {
        return res.status(400).json({ error: '文章内容不能为空' });
    }

    const taskId = Date.now().toString();

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked'
    });

    try {
        // 提取单词 + 查缓存
        res.write(`data: ${JSON.stringify({ taskId, progress: 15, status: 'processing', message: '正在提取单词并查询缓存...' })}\n\n`);

        const allWords = coze.extractWords(article);
        const cacheMap = dbOps.getWordMeaningFromCache(allWords);
        const { cached, uncached } = coze.splitCachedUncached(allWords, cacheMap);

        console.log(`📖 文章共 ${allWords.length} 个唯一单词 | 缓存命中 ${cached.length} | 未缓存 ${uncached.length}`);

        res.write(`data: ${JSON.stringify({ taskId, progress: 30, status: 'processing', message: 'AI 正在并行分析文章和生成题目...' })}\n\n`);

        // 并行调用两个 workflow（article_word_analyzer + quiz_generator）
        // 一个失败不影响另一个（Promise.allSettled）
        const [articleRes, quizRes] = await Promise.allSettled([
            coze.analyzeArticleWithCoze(article, title, cached, (progress, message) => {
                res.write(`data: ${JSON.stringify({ taskId, progress, status: 'processing', message })}\n\n`);
            }),
            coze.generateQuestionsWithCoze(article, title, 4)
        ]);

        // article_word_analyzer 结果（wordList + sentenceList + 可能的 questions）
        let articleData = null;
        let addedCount = 0;
        if (articleRes.status === 'fulfilled') {
            articleData = articleRes.value;
            const newWordList = articleData.wordList || {};
            console.log(`📦 [server] 即将写入 word_cache 的单词数=${Object.keys(newWordList).length}，前5条=${JSON.stringify(Object.entries(newWordList).slice(0, 5))}`);
            addedCount = dbOps.saveWordsToCache(newWordList);
            console.log(`💾 article_word_analyzer 实际新增 ${addedCount} 个单词到缓存表`);

            const wordContextList = articleData.wordContextList || [];
            const ctxAdded = dbOps.saveWordContextList(wordContextList);
            if (ctxAdded > 0) console.log(`🧠 [server] 写入 word_context 语境库 ${ctxAdded} 条`);

            // 扫描 definition 为空的词，批量调用 word_meaning_generator 补全
            // SSE 同步路径无 articleId，按 word 匹配回填（article_id 为空的记录）
            try {
                const emptyWords = dbOps.getWordContextEmptyDefinitions();
                if (emptyWords.length > 0) {
                    const wl = emptyWords.map(e => e.word);
                    const cl = emptyWords.map(e => e.context);
                    const filled = await coze.generateWordMeaningsWithCoze(wl, cl);
                    let filledCount = 0;
                    // 大模型可能乱序返回，按 word + context 匹配回填（不再按索引，避免跨语境混淆）
                    for (const f of filled) {
                        if (f && f.word && f.context && f.definition) {
                            filledCount += dbOps.updateWordContextDefinitionByWordAndContext(f.word, f.context, null, f.definition);
                        }
                    }
                    if (filledCount > 0) console.log(`🧠 [server] word_meaning_generator 按 word + context 补全 ${filledCount} 个空释义到 word_context`);
                }
            } catch (e) {
                console.error('❌ [server] word_meaning_generator 补全失败:', e.message);
            }
        } else {
            console.error('❌ article_word_analyzer 失败:', (articleRes.reason && articleRes.reason.message) || articleRes.reason);
        }

        // quiz_generator 结果（questions）
        let questions = [];
        let quizFromGenerator = false;
        if (quizRes.status === 'fulfilled') {
            questions = quizRes.value.questions || [];
            quizFromGenerator = true;
            console.log(`📝 quiz_generator 返回 ${questions.length} 题`);
        } else {
            console.error('❌ quiz_generator 失败:', (quizRes.reason && quizRes.reason.message) || quizRes.reason);
        }

        // 合并：quiz 失败则回退用 article_word_analyzer 的 questions（若有）
        if (questions.length === 0 && articleData && articleData.questions && articleData.questions.length > 0) {
            questions = articleData.questions;
            console.log('📝 quiz_generator 失败，回退用 article_word_analyzer 的题目');
        }
        // 两者都失败：用 fallback 降级题目（保证用户有题做）
        if (questions.length === 0) {
            questions = generateFallbackQuestions(article);
            console.log('🩹 两个工作流都失败，使用降级题目');
        }

        const mergedWords = articleData
            ? coze.mergeWordData(cached, cacheMap, articleData.wordList || {})
            : cacheMap;
        const sentences = articleData ? (articleData.sentenceList || []) : [];

        res.write(`data: ${JSON.stringify({
            taskId,
            progress: 100,
            status: 'completed',
            message: '分析完成！',
            data: {
                title: (articleData && articleData.title) || title || '用户上传文章',
                description: (articleData && articleData.description) || '用户上传的英语文章',
                level: (articleData && articleData.level) || 'middle',
                levelLabel: (articleData && articleData.levelLabel) || '自定义',
                article: (articleData && articleData.article) || article,
                words: mergedWords,
                sentences: sentences,
                questions: questions,
                fromCache: false,
                cachedCount: cached.length,
                newCount: addedCount,
                quizFromGenerator: quizFromGenerator
            }
        })}\n\n`);
        res.end();
    } catch (error) {
        console.error('分析失败:', error);
        res.write(`data: ${JSON.stringify({
            taskId,
            progress: 0,
            status: 'failed',
            message: '分析失败: ' + (error.message || '未知错误')
        })}\n\n`);
        res.end();
    }
});

// ==================== 单词相关接口 ====================

// 查词（从 word_cache 表）
app.post('/api/word-meaning', (req, res) => {
    const { word } = req.body;
    if (!word) return res.status(400).json({ error: '缺少 word 参数' });

    const row = dbOps.getWordFromCache(word);
    if (row) {
        return res.json({ word: row.word, meaning: row.definition, found: true });
    }
    res.json({ word: word.toLowerCase(), meaning: null, found: false });
});

// 获取某单词的释义（语境库 → 通用词库；语境释义来自文章分析的 sentenceIndex 关联）
app.get('/api/words/:word', (req, res) => {
    const word = (req.params.word || '').trim();
    if (!word) return res.status(400).json({ error: '缺少 word 参数' });

    const context = (req.query.context || '').trim();
    const lower = word.toLowerCase();

    // 第一层：语境库（word + 当前句子精确命中，释义来自文章分析时的 sentenceIndex 关联）
    if (context) {
        const ctx = dbOps.getWordContext(lower, context);
        if (ctx) {
            return res.json({
                success: true, word: lower, context: context, source: 'context',
                definitions: [{ definition: ctx.definition, part_of_speech: ctx.part_of_speech }]
            });
        }
    }

    // 第二层：通用词库兜底（标注「通用释义」）
    const definitions = dbOps.getWordDefinitions(lower);
    res.json({
        success: true, word: lower, context: context,
        source: definitions.length > 0 ? 'cache' : 'none',
        definitions: definitions
    });
});

// 新增一条释义（不覆盖已有释义）；带 context 时同时写入语境库
app.post('/api/words', (req, res) => {
    const { word, definition, part_of_speech, context } = req.body;
    if (!word || !definition || !definition.trim()) {
        return res.status(400).json({ error: '缺少 word 或 definition' });
    }

    const result = dbOps.addWordDefinition(word, definition.trim(), part_of_speech || null);
    let contextSaved = null;
    if (context && context.trim()) {
        contextSaved = dbOps.saveWordContext(word, context, definition.trim(), part_of_speech || null);
    }
    res.json({
        success: true,
        word: result.word,
        definition: result.definition,
        part_of_speech: result.part_of_speech,
        context_saved: !!contextSaved
    });
});

// 批量查词
app.post('/api/word-meanings', (req, res) => {
    const { words } = req.body;
    if (!Array.isArray(words)) return res.status(400).json({ error: 'words 必须是数组' });
    const map = dbOps.getWordMeaningFromCache(words);
    res.json(map);
});

// ==================== user_words 接口（拖拽收藏 + 分类 + 单词本） ====================

// 获取用户收藏单词（按 status 筛选）
app.get('/api/user-words', (req, res) => {
    const userId = getUserIdFromReq(req);
    const status = req.query.status || 'all';
    const rows = dbOps.getUserWords(userId, status);
    res.json(rows.map(r => ({
        id: r.id,
        word: r.word,
        definition: r.definition,
        sentence: r.sentence,
        articleId: r.article_id,
        paragraphIndex: r.paragraph_index,
        sentenceIndex: r.sentence_index,
        status: r.status,
        knowledge: r.knowledge,
        collectedAt: r.collected_at,
        nextReviewAt: r.next_review_at
    })));
});

// 判断某句中单词是否已收藏
app.get('/api/word-collected', (req, res) => {
    const userId = getUserIdFromReq(req);
    const { word, articleId, sentence } = req.query;
    if (!word || !articleId || !sentence) {
        return res.status(400).json({ error: '缺少 word/articleId/sentence' });
    }
    const collected = dbOps.isWordCollectedInSentence(userId, word, articleId, sentence);
    res.json({ collected });
});

// 拖拽收藏（存入 user_words 表）
app.post('/api/collect-word', (req, res) => {
    const userId = getUserIdFromReq(req);
    const { word, meaning, sentence, articleId, paragraphIndex, sentenceIndex } = req.body;

    if (!word) return res.status(400).json({ error: '缺少 word' });

    // 用 user_id + word + article_id + sentence 四字段组合判断
    if (articleId && sentence && dbOps.isWordCollectedInSentence(userId, word, articleId, sentence)) {
        return res.json({ success: false, reason: 'duplicate', message: '本句中已收藏过这个词' });
    }

    const result = dbOps.insertUserWord({
        user_id: userId,
        word: word,
        definition: meaning || null,
        sentence: sentence || null,
        article_id: articleId || null,
        paragraph_index: paragraphIndex || 0,
        sentence_index: sentenceIndex || 0,
        status: 'pending',
        knowledge: 0
    });

    if (result.success) {
        res.json({ success: true, id: result.id, message: '收藏成功！待分类 +1' });
    } else {
        res.json({ success: false, reason: result.reason, message: '本句中已收藏过这个词' });
    }
});

// 更新单词分类状态（已掌握/学习中/需复习）
app.put('/api/word-status/:id', (req, res) => {
    const wordId = parseInt(req.params.id, 10);
    const { status, knowledge } = req.body;

    if (!['pending', 'learning', 'mastered', 'review'].includes(status)) {
        return res.status(400).json({ error: 'status 取值非法' });
    }

    dbOps.updateUserWordStatus(wordId, status, knowledge);
    res.json({ success: true, id: wordId, status });
});

// ==================== 用户 & 打卡接口 ====================

// 连续打卡（更新 users.streak 和 last_active）
app.post('/api/check-in', (req, res) => {
    const userId = getUserIdFromReq(req);
    const today = new Date().toDateString();
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);

    const user = dbOps.getOrCreateUser(req.headers['x-username'] || req.body.username);
    let streak = user.streak || 0;

    if (user.last_active !== today) {
        streak = (user.last_active === yesterday.toDateString()) ? streak + 1 : 1;
        dbOps.updateUserStreak(userId, streak, today);
    }

    res.json({ success: true, streak, lastActive: today, level: user.level });
});

// 更新用户等级
app.put('/api/user-level', (req, res) => {
    const userId = getUserIdFromReq(req);
    const { level } = req.body;
    dbOps.updateUserLevel(userId, level);
    res.json({ success: true, level });
});

// ==================== 学习记录接口 ====================

app.post('/api/learning-record', (req, res) => {
    const userId = getUserIdFromReq(req);
    const { date, wordsLearned, quizScore, timeSpent } = req.body;
    dbOps.recordLearning(userId, date || new Date().toDateString(), wordsLearned, quizScore, timeSpent);
    res.json({ success: true });
});

// ==================== 数据迁移接口 ====================

// 迁移 localStorage 数据到 DB（前端首次连接时调用）
app.post('/api/migrate', (req, res) => {
    const userId = getUserIdFromReq(req);
    const { collectedWords, streak, lastDate, level, userName } = req.body;

    let result = { userId, migrated: {} };

    // 迁移收藏单词
    if (Array.isArray(collectedWords) && collectedWords.length > 0) {
        const added = dbOps.migrateLocalCollectedWords(userId, collectedWords);
        result.migrated.collectedWords = added;
    }

    // 迁移打卡数据
    if (typeof streak === 'number') {
        dbOps.updateUserStreak(userId, streak, lastDate || new Date().toDateString());
        result.migrated.streak = streak;
    }

    // 迁移等级
    if (level) {
        dbOps.updateUserLevel(userId, level);
        result.migrated.level = level;
    }

    console.log(`📥 用户 ${userId} 数据迁移完成:`, result.migrated);
    res.json(result);
});

// ==================== 启动 ====================

app.listen(PORT, () => {
    console.log('\n🍎 金苹果之旅 - 后端服务启动成功！（企业级架构版）');
    console.log('========================================');
    console.log(`📍 访问地址:  http://localhost:${PORT}`);
    console.log(`🔌 API 端口:  ${PORT}`);
    console.log(`📦 静态目录:  ${__dirname}`);
    console.log(`🗄️  数据库:    SQLite (${process.env.DATABASE_PATH || './data/app.db'})`);
    console.log(`🔄 异步队列:  进程内轻量队列 (重试 ${process.env.QUEUE_MAX_RETRIES || 3} 次)`);
    console.log(`🤖 Coze:      ${coze.isCozeConfigured() ? '✅ 已配置' : '⚠️  未配置 (.env)'}`);
    console.log(`🩺 健康检查:  http://localhost:${PORT}/health`);
    console.log('========================================\n');
});
