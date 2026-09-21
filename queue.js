/**
 * queue.js - 进程内轻量异步任务队列
 *
 * 替代 Bull + Redis 方案：
 * - 用 Map 存任务状态，Node 进程内调度（setImmediate + setTimeout）
 * - 不依赖 Redis，零安装；进程重启时队列内存丢失，
 *   但文章 status 持久化在 articles 表（重启后可重新入队 pending/processing 的）
 * - 重试策略：最多 3 次，指数退避（5s → 10s → 20s）
 *
 * 处理流程（对应需求第二部分）：
 *   1. 接收 { articleId, content, userId }
 *   2. 调用 analyzeArticleWithCoze（提取单词→查缓存→调 Coze）
 *   3. saveWordsToCache（新单词存入 word_cache 表）
 *   4. 更新 articles.status='completed'，存 questions + sentences
 *   5. 失败则 status='failed'，重试；超过次数保持 failed
 */

const dbOps = require('./db');
const coze = require('./coze');
const { generateFallbackQuestions } = require('./fallback');

const MAX_RETRIES = parseInt(process.env.QUEUE_MAX_RETRIES || '3', 10);
const BASE_BACKOFF_MS = 5000;  // 指数退避起步：5秒

// 进程内任务状态表：articleId → { status, retries, error, startedAt }
const taskMap = new Map();

/**
 * 加入队列（立即返回，后台处理）
 * @param {object} job - { articleId, content, userId, title }
 * @returns {{ articleId, status: 'pending' }}
 */
function enqueue(job) {
    const { articleId } = job;
    taskMap.set(articleId, {
        status: 'pending',
        retries: 0,
        error: null,
        startedAt: Date.now()
    });
    // 异步处理，不阻塞调用方
    setImmediate(() => processWithRetry(job, 0));
    return { articleId, status: 'pending' };
}

/**
 * 查询队列状态
 */
function getQueueStatus(articleId) {
    return taskMap.get(articleId) || null;
}

/**
 * 判断 Coze 错误是否为「不可重试」的致命错误（额度不足/鉴权等 4xxx 客户端错误）
 * 这类错误重试无意义，应立刻失败并让前端降级。
 */
function isFatalCozeError(err) {
    if (!err) return false;
    const message = (err && err.message) ? err.message : String(err);
    return /code=4\d{3}/.test(message) || /额度|quota|insufficient|4028/i.test(message);
}

/**
 * 带重试的处理函数
 */
async function processWithRetry(job, attempt) {
    const { articleId } = job;
    const task = taskMap.get(articleId) || { status: 'pending', retries: 0 };

    try {
        task.status = 'processing';
        task.retries = attempt;
        taskMap.set(articleId, task);

        await processArticle(job);

        task.status = 'completed';
        taskMap.set(articleId, task);
        console.log(`✅ 队列任务完成: articleId=${articleId}`);

    } catch (err) {
        console.error(`❌ 队列任务失败 (attempt ${attempt + 1}/${MAX_RETRIES}): articleId=${articleId}`, err.message);

        // Coze 不可用（额度不足等致命错误）：立即标记失败，不重试，让前端马上降级
        if (err && err.fatal) {
            task.status = 'failed';
            task.error = err.message;
            taskMap.set(articleId, task);
            dbOps.updateArticleStatus(articleId, 'failed');
            console.error(`💥 队列任务失败（Coze 不可用，不重试）: articleId=${articleId}`);
            return;
        }

        if (attempt + 1 < MAX_RETRIES) {
            // 指数退避：5s, 10s, 20s...
            const backoff = BASE_BACKOFF_MS * Math.pow(2, attempt);
            task.status = 'retrying';
            task.error = err.message;
            taskMap.set(articleId, task);
            console.log(`⏳ ${backoff / 1000}s 后重试...`);
            setTimeout(() => processWithRetry(job, attempt + 1), backoff);
        } else {
            // 达到最大重试次数，标记为 failed
            task.status = 'failed';
            task.error = err.message;
            taskMap.set(articleId, task);
            dbOps.updateArticleStatus(articleId, 'failed');
            console.error(`💥 队列任务最终失败: articleId=${articleId}`);
        }
    }
}

/**
 * 实际处理逻辑（调用 Coze + 缓存 + 更新文章）
 */
async function processArticle(job) {
    const { articleId, content, userId, title } = job;

    // 1. 标记为 processing
    dbOps.updateArticleStatus(articleId, 'processing');

    // 2. 提取单词 + 查缓存
    const allWords = coze.extractWords(content);
    const cacheMap = dbOps.getWordMeaningFromCache(allWords);
    const { cached, uncached } = coze.splitCachedUncached(allWords, cacheMap);

    console.log(`📖 [队列] 文章 ${articleId} 共 ${allWords.length} 词 | 缓存 ${cached.length} | 新词 ${uncached.length}`);

    // 3. 并行调用两个 workflow（article_word_analyzer + quiz_generator），互不阻塞
    const [articleRes, quizRes] = await Promise.allSettled([
        coze.analyzeArticleWithCoze(content, title, cached),
        coze.generateQuestionsWithCoze(content, title, 4)
    ]);

    const articleFailed = articleRes.status === 'rejected';
    const quizFailed = quizRes.status === 'rejected';

    // 3.0 两个工作流都失败 = Coze 完全不可用，走降级（立即失败，前端切基础模式）
    if (articleFailed && quizFailed) {
        const reason = articleRes.reason || quizRes.reason;
        const message = (reason && reason.message) || String(reason) || 'Coze 两个工作流均失败';
        console.error('❌ [队列] Coze 两个工作流均失败:', message);
        const err = new Error(message);
        err.fatal = isFatalCozeError(articleRes.reason) || isFatalCozeError(quizRes.reason);
        throw err;
    }

    // 3.1 部分成功：谁成功用谁的，成功率不因另一个失败被丢弃
    let articleData = null;
    if (!articleFailed) {
        articleData = articleRes.value;
        const wordList = articleData.wordList || {};
        console.log(`📦 [队列] 即将写入 word_cache 的单词数=${Object.keys(wordList).length}，前5条=${JSON.stringify(Object.entries(wordList).slice(0, 5))}`);
        const added = dbOps.saveWordsToCache(wordList);
        if (added > 0) console.log(`💾 [队列] article_word_analyzer 实际新增 ${added} 个单词到缓存表`);

        const wordContextList = articleData.wordContextList || [];
        if (wordContextList.length > 0) console.log(`🧠 [队列] wordContextList 首条（context 来自 sentenceIndex 关联）:`, JSON.stringify(wordContextList[0]));
        const ctxAdded = dbOps.saveWordContextList(wordContextList, articleId);
        if (ctxAdded > 0) console.log(`🧠 [队列] 写入 word_context 语境库 ${ctxAdded} 条`);

        // 扫描「当前文章」内 definition 为空的词，批量调用 word_meaning_generator 补全
        try {
            const emptyWords = dbOps.getWordContextEmptyDefinitions(articleId);
            if (emptyWords.length > 0) {
                const wl = emptyWords.map(e => e.word);
                const cl = emptyWords.map(e => e.context);
                const filled = await coze.generateWordMeaningsWithCoze(wl, cl);
                let filledCount = 0;
                // 大模型可能乱序返回，按 word + context 匹配回填（不再按索引，避免跨语境混淆）
                for (const f of filled) {
                    if (f && f.word && f.context && f.definition) {
                        filledCount += dbOps.updateWordContextDefinitionByWordAndContext(f.word, f.context, articleId, f.definition);
                    }
                }
                if (filledCount > 0) console.log(`🧠 [队列] word_meaning_generator 按 word + context 补全 ${filledCount} 个空释义到 word_context`);
            }
        } catch (e) {
            console.error('❌ [队列] word_meaning_generator 补全失败:', e.message);
        }
    } else {
        console.error('❌ [队列] article_word_analyzer 失败（quiz 可能已成功，继续用缓存释义）:', (articleRes.reason && articleRes.reason.message) || articleRes.reason);
    }

    // 3.2 quiz_generator 结果（questions）
    let questions = [];
    if (!quizFailed) {
        questions = quizRes.value.questions || [];
        console.log(`📝 [队列] quiz_generator 返回 ${questions.length} 题`);
    } else {
        console.error('❌ [队列] quiz_generator 失败:', (quizRes.reason && quizRes.reason.message) || quizRes.reason);
    }

    // 4. 合并：quiz 失败则回退用 article_word_analyzer 的 questions（若有）
    if (questions.length === 0 && articleData && articleData.questions && articleData.questions.length > 0) {
        questions = articleData.questions;
        console.log('📝 [队列] quiz_generator 失败，回退用 article_word_analyzer 的题目');
    }
    // 兜底：都没有题目时用通用降级题
    if (questions.length === 0) {
        questions = generateFallbackQuestions(content);
        console.log('🩹 [队列] 无可用题目，使用降级题目');
    }

    // 5. 合并缓存数据（article_word_analyzer 失败则只用已有缓存释义）
    const mergedWords = articleData
        ? coze.mergeWordData(cached, cacheMap, articleData.wordList || {})
        : cacheMap;
    const sentences = articleData ? (articleData.sentenceList || []) : [];

    // 6. 更新 articles 表：status='completed'，存 questions + sentences
    dbOps.updateArticleQuestions(articleId, questions, sentences);

    return {
        words: mergedWords,
        questions: questions,
        sentences: sentences
    };
}

/**
 * 重启后恢复：把数据库中状态为 'processing' 的文章重新入队
 * （pending 的不自动入队，等前端再次请求；processing 的是上次中断的）
 */
function recoverInterrupted() {
    const { db } = dbOps;
    const rows = db.prepare(`SELECT id, content, user_id FROM articles WHERE status = 'processing'`).all();
    for (const row of rows) {
        console.log(`🔄 恢复中断任务: ${row.id}`);
        enqueue({ articleId: row.id, content: row.content, userId: row.user_id, title: row.title });
    }
    return rows.length;
}

module.exports = {
    enqueue,
    getQueueStatus,
    processArticle,
    recoverInterrupted
};
