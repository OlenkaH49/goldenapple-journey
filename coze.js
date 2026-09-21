/**
 * coze.js - Coze API 调用封装（纯函数，不含 HTTP 响应逻辑）
 *
 * 设计目的：让 server.js 的同步接口和 queue.js 的异步队列都能复用同一套 Coze 调用逻辑。
 * onProgress 为可选回调，用于 SSE 进度反馈；异步队列不传该参数。
 */

require('dotenv').config();

const dbOps = require('./db');

const COZE_API_TOKEN = process.env.COZE_API_TOKEN || '';
const COZE_BOT_ID = process.env.COZE_BOT_ID || '';
const COZE_WORKFLOW_ID = process.env.COZE_WORKFLOW_ID || '';
const COZE_QUIZ_WORKFLOW_ID = process.env.COZE_QUIZ_WORKFLOW_ID || '';
// word_meaning_generator 工作流（批量补全语境释义）
const COZE_WORD_WORKFLOW_ID = process.env.COZE_WORD_WORKFLOW_ID || '';
const COZE_USER_ID = process.env.COZE_USER_ID || 'golden-apple-user';
const COZE_API_URL = process.env.COZE_API_URL || 'https://api.coze.cn/v1/workflow/run';

// ==================== 单词工具函数 ====================

function extractWords(article) {
    const matches = article.match(/[A-Za-z]+(?:-[A-Za-z]+)*/g) || [];
    const unique = [...new Set(matches.map(w => w.toLowerCase()))];
    return unique;
}

function splitCachedUncached(words, cacheMap) {
    // cacheMap: { word: meaning } 对象（来自 word_cache 表）
    const cached = [];
    const uncached = [];
    for (const word of words) {
        if (cacheMap[word]) {
            cached.push(word);
        } else {
            uncached.push(word);
        }
    }
    return { cached, uncached };
}

function mergeWordData(cachedWords, cacheMap, newWordList) {
    const merged = {};
    for (const word of cachedWords) {
        if (cacheMap[word]) merged[word] = cacheMap[word];
    }
    if (newWordList && typeof newWordList === 'object') {
        for (const [word, meaning] of Object.entries(newWordList)) {
            merged[word.toLowerCase()] = meaning;
        }
    }
    return merged;
}

// 把释义统一转成字符串（数字/对象/数组都兜底）
function stringifyMeaning(d) {
    if (d == null) return '';
    if (typeof d === 'string') return d.trim();
    return JSON.stringify(d);
}

/**
 * 把 Coze 返回的 wordList 各种可能结构统一成 { 单词小写: 释义字符串 } 扁平对象
 * 兼容：{word: meaning} / {word: {definition, ...}} / [{word, definition}] /
 *       [["word", "释义"]] / ["word1", "word2", ...]
 */
function normalizeWordList(wordList) {
    const result = {};
    if (!wordList || typeof wordList !== 'object') return result;

    // 数组形式
    if (Array.isArray(wordList)) {
        wordList.forEach(function(item) {
            if (!item) return;
            if (typeof item === 'string') {
                result[item.toLowerCase().trim()] = '';
                return;
            }
            if (Array.isArray(item)) {
                const w = (item[0] == null ? '' : String(item[0])).trim();
                if (w) result[w.toLowerCase()] = stringifyMeaning(item[1]);
                return;
            }
            if (typeof item === 'object') {
                const w = (item.word || item.term || item.name || item.english || '').toString().trim();
                if (!w) return;
                const d = item.definition || item.meaning || item.translation || item.zh || item.chinese || item.value || item.text;
                result[w.toLowerCase()] = stringifyMeaning(d);
            }
        });
        return result;
    }

    // 对象形式：{ word: meaning } 或 { word: {definition, ...} }
    for (const [rawKey, val] of Object.entries(wordList)) {
        const key = rawKey.toLowerCase().trim();
        if (!key) continue;
        if (val == null) {
            result[key] = '';
        } else if (typeof val === 'string' || typeof val === 'number') {
            result[key] = stringifyMeaning(val);
        } else if (typeof val === 'object') {
            const d = val.definition || val.meaning || val.translation || val.zh || val.chinese || val.value || val.text;
            result[key] = stringifyMeaning(d);
        }
    }
    return result;
}

/**
 * 从 Coze 返回结果里抽取「单词 + 语境 + 释义」列表，供写入 word_context 语境库
 * 兼容：parsed.wordContextList / parsed.contextWords / parsed.context_words（数组）
 *       以及 wordList 条目里自带 sentence/context 字段的情况
 * 返回 [{word, context, definition, part_of_speech}]
 */
function extractWordContextList(parsed) {
    if (!parsed || typeof parsed !== 'object') return [];
    let source = parsed.wordContextList || parsed.contextWords || parsed.context_words || null;

    // 没有显式语境列表时，尝试从 wordList 原样数组/对象里挖带 sentence 的条目
    if (!Array.isArray(source)) {
        const wl = parsed.wordList || parsed.words || parsed.vocabulary;
        if (Array.isArray(wl)) source = wl;
        else if (wl && typeof wl === 'object') source = Object.entries(wl);
        else source = [];
    }

    const list = [];
    for (const item of source) {
        if (!item) continue;
        let word, context, definition, partOfSpeech;
        if (Array.isArray(item)) {
            // [word, definition] 或 [word, {definition, context}]
            word = item[0];
            const sec = item[1];
            if (sec && typeof sec === 'object') {
                context = sec.context || sec.sentence;
                definition = sec.definition || sec.meaning || sec.translation || sec.zh;
                partOfSpeech = sec.part_of_speech;
            } else {
                definition = sec;
            }
        } else if (typeof item === 'object') {
            word = item.word || item.term || item.english;
            context = item.context || item.sentence;
            definition = item.definition || item.meaning || item.translation || item.zh || item.chinese || item.value;
            partOfSpeech = item.part_of_speech;
        }
        if (!word) continue;
        const ctx = (context || '').toString().trim();
        if (!ctx) continue; // 没有语境的条目无法写入语境库，跳过
        const def = stringifyMeaning(definition);
        if (!def) continue;
        list.push({ word: String(word).toLowerCase(), context: ctx, definition: def, part_of_speech: partOfSpeech || null });
    }
    return list;
}

/**
 * 根据新结构 wordList（元素含 sentenceIndex）+ sentenceList 生成语境库数据
 *   wordList: [{word, meaning, isAcademic, sentenceIndex}, ...]
 *   sentenceList: [{sentence, translation}, ...]
 * 每个词的 context = sentenceList[word.sentenceIndex].sentence
 * 过滤：word + context 在 word_context 里已有释义（definition 有值）→ 跳过，不重复写入
 * 返回 [{word, context, definition, part_of_speech}]
 */
function buildWordContextFromSentenceIndex(wordList, sentenceList) {
    const result = [];
    if (!Array.isArray(wordList)) return result;
    const sentences = Array.isArray(sentenceList) ? sentenceList : [];

    const allWords = [];             // 原始 wordList 里能取到 word 的所有词
    const filteredByContext = [];    // 已在 word_context 里存在（word + context + definition 有值）→ 跳过
    const keptWords = [];

    for (const w of wordList) {
        if (!w || typeof w !== 'object') continue;
        const word = (w.word || w.term || w.english || '').toString().toLowerCase().trim();
        // definition 可能为空（meaning 未生成），仍写入 word_context，后续由 word_meaning_generator 补全
        const def = stringifyMeaning(w.definition || w.meaning || w.translation || w.zh || w.chinese || w.value);
        if (!word) continue;

        allWords.push(word);

        const idx = w.sentenceIndex;
        const sentObj = (typeof idx === 'number' && idx >= 0 && idx < sentences.length) ? sentences[idx] : null;
        const ctx = (sentObj ? (sentObj.sentence || sentObj.original || sentObj.text || sentObj.english || '') : '').toString().trim();
        if (!ctx) continue;

        // 过滤：word 一样、context 一样、definition 已有值 → 跳过
        if (dbOps.getWordContext(word, ctx)) {
            filteredByContext.push(word);
            continue;
        }

        keptWords.push(word);
        result.push({ word: word, context: ctx, definition: def, part_of_speech: w.part_of_speech || null });
    }

    console.log(`🔍 [wordList] 原始 wordList: ${allWords.length} 个词 | ${JSON.stringify(allWords)}`);
    if (filteredByContext.length > 0) {
        console.log(`🚫 [wordList] 被过滤的词: ${JSON.stringify(filteredByContext)}`);
        console.log(`🚫 [wordList] 过滤原因: 已在 word_context 里存在（word + context 匹配，definition 有值）`);
    }
    console.log(`✅ [wordList] 保留的词: ${keptWords.length} 个 | ${JSON.stringify(keptWords)}`);

    return result;
}

// ==================== Mock 数据（未配置 Coze 时使用） ====================

function generateMockWordList(article) {
    const commonWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'to', 'of', 'in', 'and'];
    const allWords = article.toLowerCase().match(/[a-zA-Z'-]+/g) || [];
    const wordList = {};
    allWords.forEach(word => {
        if (word.length >= 4 && !commonWords.includes(word) && !wordList[word]) {
            if (Object.keys(wordList).length >= 25) return;
            wordList[word] = `[${word}] 的中文释义`;
        }
    });
    return wordList;
}

function generateMockSentenceList(article) {
    const sentences = article.split(/[.!?]+/).filter(s => s.trim().length >= 10);
    return sentences.slice(0, 20).map(s => ({
        original: s.trim(),
        translation: `[模拟翻译] ${s.trim().substring(0, 30)}...`
    }));
}

function generateMockResult(article, title) {
    return {
        title: title || '用户上传文章',
        description: '用户上传的英语学习文章（模拟数据）',
        level: article.length > 3000 ? 'high' : 'middle',
        levelLabel: article.length > 3000 ? '高中' : '初中',
        article: article,
        wordList: generateMockWordList(article),
        sentenceList: generateMockSentenceList(article),
        questions: [
            { type: 'MAIN IDEA', question: 'What is the main idea of this article?',
              options: ['To introduce the topic', 'To argue a point', 'To tell a story', 'To describe something'],
              answer_index: 0 },
            { type: 'DETAIL', question: 'According to the article, which statement is true?',
              options: ['Option A', 'Option B', 'Option C', 'Option D'], answer_index: 0 },
            { type: 'INFERENCE', question: 'What can we infer from the passage?',
              options: ['Inference A', 'Inference B', 'Inference C', 'Inference D'], answer_index: 0 }
        ]
    };
}

// ==================== Coze API 调用 ====================

/**
 * 调用 Coze API 分析文章
 * @param {string} article - 文章正文
 * @param {string} title - 文章标题
 * @param {string[]} cachedWords - 已缓存单词列表（传给 Coze 避免重复分析）
 * @param {function} onProgress - 可选进度回调 (progress, message) => void
 * @returns {Promise<object>} result - { title, description, level, levelLabel, article, wordList, sentenceList, questions }
 */
async function analyzeArticleWithCoze(article, title, cachedWords, onProgress) {
    if (!COZE_API_TOKEN || !COZE_WORKFLOW_ID) {
        console.warn('⚠️  未配置 COZE_API_TOKEN 或 COZE_WORKFLOW_ID，使用模拟数据返回');
        if (onProgress) onProgress(80, '正在处理 AI 返回结果...');
        await new Promise(r => setTimeout(r, 500));
        return generateMockResult(article, title);
    }

    // workflow API 格式：workflow_id + parameters
    // parameters 放多个键名（content/article/text/title）兼容不同 workflow 的入参命名
    const truncatedContent = article.length > 8000
        ? article.substring(0, 8000) + `\n...(文章共${article.length}字符，已截断前8000)`
        : article;

    const requestBody = {
        workflow_id: COZE_WORKFLOW_ID,
        parameters: {
            Content: truncatedContent,      // ← 大写 C
            Title: title || '用户上传文章',  // ← 大写 T
            max_sentences: 0,               // ← Number
            cached_words: cachedWords || [] // ← Array（不要 join）
        }
    };

    const requestStartAt = Date.now();
    console.log(`🚀 [article_word_analyzer] 开始调用 | 请求开始时间: ${new Date(requestStartAt).toISOString()} | Content 长度: ${truncatedContent.length} | cached_words: ${Array.isArray(cachedWords) ? cachedWords.length : 0}`);

    // 进度模拟（仅当有 onProgress 时）
    let progressTimer = null;
    let progress = 30;
    if (onProgress) {
        onProgress(30, 'AI 正在阅读文章...');
        progressTimer = setInterval(() => {
            if (progress < 75) {
                progress += 5;
                onProgress(progress, progress < 50 ? 'AI 正在阅读文章...' : progress < 70 ? 'AI 正在提取词汇和翻译...' : 'AI 正在生成题目...');
            }
        }, 800);
    }

    try {
        const fetch = require('node-fetch');
        const response = await fetch(COZE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COZE_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
            timeout: 300000
        });
        const elapsed = Date.now() - requestStartAt;

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Coze API 返回 ${response.status}: ${errorText.substring(0, 200)}`);
        }

        const resp = await response.json();

        // workflow API 响应：{ code: 0, msg, data: "JSON字符串或对象" }
        if (resp.code !== 0) {
            throw new Error('Coze workflow 错误 code=' + resp.code + ': ' + (resp.msg || '未知错误'));
        }

        let answer = '';
        if (resp.data !== undefined && resp.data !== null) {
            answer = typeof resp.data === 'string' ? resp.data : JSON.stringify(resp.data);
        } else if (resp.messages && resp.messages.length > 0) {
            // 兼容 chat 格式响应
            const msg = resp.messages.find(m => m.role === 'assistant' || m.type === 'answer');
            answer = msg ? (msg.content || msg.text || '') : '';
        } else {
            answer = JSON.stringify(resp);
        }

        console.log('📄 [article_word_analyzer] Coze 原始返回数据:', answer.length > 2000 ? answer.substring(0, 2000) + `...(共${answer.length}字符，已截断)` : answer);

        const result = parseAIResponse(answer, article, title);
        const wordCount = (result && result.wordList) ? Object.keys(result.wordList).length : 0;
        console.log(`✅ [article_word_analyzer] 调用成功 | 耗时: ${elapsed}ms | code: ${resp.code} | 返回数据大小: ${answer.length} | 返回词数: ${wordCount}`);
        return result;
    } catch (err) {
        const elapsed = Date.now() - requestStartAt;
        console.error(`❌ [article_word_analyzer] 调用失败 | 耗时: ${elapsed}ms | 错误: ${err.message}`);
        throw err;
    } finally {
        if (progressTimer) clearInterval(progressTimer);
    }
}

/**
 * 调用 quiz_generator 工作流生成题目（与 article_word_analyzer 并行调用）
 * @param {string} content - 文章正文
 * @param {string} title - 文章标题
 * @param {number} questionCount - 题目数量
 * @returns {Promise<object>} { questions, total_questions, success }
 */
async function generateQuestionsWithCoze(content, title, questionCount) {
    if (!COZE_API_TOKEN || !COZE_QUIZ_WORKFLOW_ID) {
        console.warn('⚠️  未配置 COZE_QUIZ_WORKFLOW_ID，跳过 quiz_generator');
        return { questions: [], total_questions: 0, success: false };
    }

    const truncatedContent = content.length > 8000
        ? content.substring(0, 8000) + `\n...(文章共${content.length}字符，已截断前8000)`
        : content;

    const requestBody = {
        workflow_id: COZE_QUIZ_WORKFLOW_ID,
        parameters: {
            content: truncatedContent,
            title: title || '用户上传文章',
            question_count: questionCount || 4
        }
    };

    const requestStartAt = Date.now();
    console.log(`🚀 [quiz_generator] 开始调用 | 请求开始时间: ${new Date(requestStartAt).toISOString()} | Content 长度: ${truncatedContent.length} | question_count: ${questionCount || 4}`);

    try {
        const fetch = require('node-fetch');
        const response = await fetch(COZE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COZE_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
            timeout: 300000
        });
        const elapsed = Date.now() - requestStartAt;

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`quiz_generator 返回 ${response.status}: ${errorText.substring(0, 200)}`);
        }

        const resp = await response.json();

        if (resp.code !== 0) {
            throw new Error('quiz_generator 错误 code=' + resp.code + ': ' + (resp.msg || '未知错误'));
        }

        // workflow data 可能是 JSON 字符串或对象
        let data = resp.data;
        if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch (e) { /* 字符串无法解析，留作 fallback */ }
        }

        // 输出字段：questions, total_questions
        const rawQuestions = (data && typeof data === 'object') ? (data.questions || []) : [];
        const questions = normalizeQuestions(rawQuestions);

        // 打印每道题的 question 与 answer 字段，便于确认答案是否全 A
        const rawQList = Array.isArray(rawQuestions) ? rawQuestions : [];
        if (rawQList.length > 0) {
            console.log('📝 [quiz_generator] 逐题 question / answer:');
            rawQList.forEach((q, i) => {
                if (!q || typeof q !== 'object') return;
                const text = q.question || q.text || '';
                const ans = (q.answer !== undefined && q.answer !== null)
                    ? q.answer
                    : (q.answer_index !== undefined ? String.fromCharCode(65 + Number(q.answer_index)) : '(无)');
                console.log(`   ${i + 1}. ${text} → answer: ${ans}`);
            });
        }
        const totalQuestions = (data && typeof data === 'object' && data.total_questions)
            ? data.total_questions
            : questions.length;

        const dataSize = data == null ? 0 : (typeof data === 'string' ? data.length : JSON.stringify(data).length);
        console.log(`✅ [quiz_generator] 调用成功 | 耗时: ${elapsed}ms | code: ${resp.code} | 返回数据大小: ${dataSize} | 返回题数: ${questions.length}`);
        return { questions, total_questions: totalQuestions, success: true };
    } catch (err) {
        const elapsed = Date.now() - requestStartAt;
        console.error(`❌ [quiz_generator] 调用失败 | 耗时: ${elapsed}ms | 错误: ${err.message}`);
        throw err;
    }
}

/**
 * 批量调用 word_meaning_generator 工作流补全语境释义
 * @param {string[]} wordList - 单词数组
 * @param {string[]} contextList - 与 wordList 一一对应的语境句子数组
 * @returns {Promise<object[]>} [{word, context, definition, isAcademic}]；未配置或失败返回 []
 */
async function generateWordMeaningsWithCoze(wordList, contextList) {
    if (!COZE_API_TOKEN || !COZE_WORD_WORKFLOW_ID) {
        console.warn('⚠️  未配置 word_meaning_generator 工作流 ID，跳过语境释义补全');
        return [];
    }
    if (!Array.isArray(wordList) || wordList.length === 0) return [];

    const requestBody = {
        workflow_id: COZE_WORD_WORKFLOW_ID,
        parameters: {
            wordList: wordList,
            contextList: Array.isArray(contextList) ? contextList : []
        }
    };

    console.log('🔗 批量调用 word_meaning_generator:', COZE_WORD_WORKFLOW_ID, '单词数=', wordList.length);

    try {
        const fetch = require('node-fetch');
        const response = await fetch(COZE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COZE_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody),
            timeout: 120000
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`word_meaning_generator 返回 ${response.status}: ${errorText.substring(0, 200)}`);
        }

        const resp = await response.json();
        if (resp.code !== 0) {
            throw new Error('word_meaning_generator 错误 code=' + resp.code + ': ' + (resp.msg || '未知错误'));
        }

        let data = resp.data;
        if (typeof data === 'string') {
            try { data = JSON.parse(data); } catch (e) { data = null; }
        }
        if (!data || typeof data !== 'object') return [];

        const outList = data.wordList || data.wordlist || data.words || [];
        if (!Array.isArray(outList)) return [];

        const result = [];
        for (const item of outList) {
            if (!item || typeof item !== 'object') continue;
            const w = (item.word || '').toString().toLowerCase().trim();
            const ctx = (item.context || '').toString().trim();
            const def = (item.definition || item.meaning || '').toString().trim();
            if (!w || !def) continue;
            result.push({ word: w, context: ctx, definition: def, isAcademic: !!(item.isAcademic || item.is_academic) });
        }
        console.log('✅ word_meaning_generator 返回', result.length, '条释义');
        return result;
    } catch (err) {
        console.error('❌ word_meaning_generator 异常:', err.message);
        return [];
    }
}

function parseAIResponse(answer, fallbackArticle, fallbackTitle) {
    let jsonStr = answer.trim();
    const jsonMatch = answer.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];

    try {
        const parsed = JSON.parse(jsonStr);
        console.log('📄 Coze 返回顶层字段:', Object.keys(parsed).join(', '));
        const sentenceList = parsed.sentenceList || parsed.sentences || parsed.translations || [];
        const rawWordList = parsed.wordList || parsed.wordlist || parsed.words || parsed.vocabulary || null;

        let normalizedWordList, wordContextList;
        if (Array.isArray(rawWordList)) {
            // 新结构：wordList 数组（元素含 sentenceIndex），用 sentenceIndex 关联 sentenceList
            console.log('🔍 Coze 返回 wordList 数组：', rawWordList.length, '词；sentenceList ', sentenceList.length, '句；首词=', JSON.stringify(rawWordList[0]));
            normalizedWordList = normalizeWordList(rawWordList);
            wordContextList = buildWordContextFromSentenceIndex(rawWordList, sentenceList);
        } else {
            console.log('🔍 Coze 返回 wordList 原始结构:',
                rawWordList === null ? 'null'
                    : Array.isArray(rawWordList) ? `数组(${rawWordList.length}项) 首项=${JSON.stringify(rawWordList[0])}`
                    : `对象(${Object.keys(rawWordList).length}键) 样例键=${JSON.stringify(Object.keys(rawWordList).slice(0, 5))}`);
            normalizedWordList = normalizeWordList(rawWordList || {});
            wordContextList = extractWordContextList(parsed);
        }
        console.log('🔍 归一化后 wordList 前 5 条:', JSON.stringify(Object.entries(normalizedWordList).slice(0, 5)));
        console.log('🔍 wordContextList 条数:', wordContextList.length, '首条=', JSON.stringify(wordContextList[0] || null));
        return {
            title: parsed.title || fallbackTitle || '用户上传文章',
            description: parsed.description || parsed.summary || '用户上传的英语文章',
            level: parsed.level || 'middle',
            levelLabel: parsed.levelLabel || getLevelLabel(parsed.level),
            article: parsed.article || fallbackArticle,
            wordList: normalizedWordList,
            wordContextList: wordContextList,
            sentenceList: sentenceList,
            questions: normalizeQuestions(parsed.questions || parsed.quiz || [])
        };
    } catch (e) {
        console.warn('⚠️  JSON 解析失败，使用正则提取:', e.message);
        const wordList = {};
        const wordPattern = /["']?([a-zA-Z\s'-]+)["']?\s*[:：]\s*["']([^"']+)["']/g;
        let match;
        while ((match = wordPattern.exec(answer)) !== null) {
            const word = match[1].trim().toLowerCase();
            if (word.length >= 3 && word.length <= 30) wordList[word] = match[2];
        }
        return {
            title: fallbackTitle || '用户上传文章',
            description: '用户上传的英语文章',
            level: 'middle',
            levelLabel: '自定义',
            article: fallbackArticle,
            wordList: Object.keys(wordList).length > 0 ? wordList : generateMockWordList(fallbackArticle),
            wordContextList: [],
            sentenceList: generateMockSentenceList(fallbackArticle),
            questions: []
        };
    }
}

// 统一 questions 格式：options 为数组，answer_index 为数字
function normalizeQuestions(questions) {
    if (!Array.isArray(questions)) return [];
    return questions.map(q => {
        // 兼容 options 为对象 {A,B,C,D} 的情况
        let options = q.options;
        if (options && typeof options === 'object' && !Array.isArray(options)) {
            const keys = Object.keys(options).sort();
            options = keys.map(k => options[k]);
        }

        // 正确答案统一转成 0-based 下标。
        // Coze 返回的是 answer 字段（"A"/"B"/"C"/"D" 或数字），不是 answer_index，
        // 之前只在 options 为对象时才转，导致 options 为数组时 answer_index 全为 0（前端全显示 A）。
        let answerIndex = q.answer_index;
        if (typeof answerIndex !== 'number') {
            if (typeof q.answer === 'number') {
                answerIndex = q.answer;
            } else if (typeof q.answer === 'string' && q.answer.trim() !== '') {
                const s = q.answer.trim();
                const ch = s.toUpperCase().charCodeAt(0);
                if (ch >= 65 && ch <= 90) {
                    answerIndex = ch - 65; // 'A'→0, 'B'→1 ...
                } else if (/^\d+$/.test(s)) {
                    answerIndex = parseInt(s, 10);
                }
            }
        }

        return {
            type: q.type || 'DETAIL',
            question: q.question || q.text || '',
            options: Array.isArray(options) ? options : [],
            answer_index: typeof answerIndex === 'number' ? answerIndex : 0,
            explanation: q.explanation || ''
        };
    });
}

function getLevelLabel(level) {
    const labels = { 'middle': '初中', 'high': '高中', 'a2': 'A2', 'b1': 'B1', 'c1': 'C1' };
    return labels[level] || '自定义';
}

function isCozeConfigured() {
    return !!COZE_API_TOKEN && !!COZE_WORKFLOW_ID;
}

module.exports = {
    analyzeArticleWithCoze,
    generateQuestionsWithCoze,
    generateWordMeaningsWithCoze,
    parseAIResponse,
    normalizeQuestions,
    isCozeConfigured,
    // 工具函数
    extractWords,
    splitCachedUncached,
    mergeWordData,
    extractWordContextList,
    // mock
    generateMockResult,
    generateMockWordList,
    generateMockSentenceList,
    getLevelLabel,
    // 配置（只读暴露）
    config: { COZE_API_TOKEN, COZE_BOT_ID, COZE_WORKFLOW_ID, COZE_QUIZ_WORKFLOW_ID, COZE_WORD_WORKFLOW_ID, COZE_USER_ID, COZE_API_URL }
};
