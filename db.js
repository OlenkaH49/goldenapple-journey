/**
 * db.js - SQLite 数据库连接与操作
 *
 * 架构说明：
 * - 用 SQLite 替代 PostgreSQL（零安装，单文件），表结构与 PG 版本对齐，日后可平滑迁移。
 * - articles.id 用 TEXT PRIMARY KEY（兼容前端 'article_001' 等字符串 id），
 *   而非自增整数——否则前端 openArticle('article_001') 会失效。
 * - 其余表（users/learning_records/user_words.id）用 INTEGER 自增主键。
 * - JSONB 在 SQLite 中用 TEXT 存 JSON 字符串，读写时 JSON.parse/stringify。
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// 解析数据库路径（支持相对路径，相对于项目根目录）
let DB_PATH = process.env.DATABASE_PATH || './data/app.db';
if (!path.isAbsolute(DB_PATH)) {
    DB_PATH = path.join(__dirname, DB_PATH);
}

// 确保目录存在
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// 创建连接
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');      // 提升并发读写性能
db.pragma('foreign_keys = ON');        // 开启外键约束

// ==================== 建表 ====================

function initDB() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            level TEXT DEFAULT 'A2',
            streak INTEGER DEFAULT 0,
            last_active TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS articles (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            title TEXT,
            description TEXT,
            content TEXT,
            source TEXT DEFAULT 'upload',
            level TEXT,
            level_label TEXT,
            word_count INTEGER DEFAULT 0,
            status TEXT DEFAULT 'pending',
            questions TEXT,
            sentences TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS user_words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            word TEXT NOT NULL,
            definition TEXT,
            sentence TEXT,
            article_id TEXT,
            paragraph_index INTEGER DEFAULT 0,
            sentence_index INTEGER DEFAULT 0,
            status TEXT DEFAULT 'pending',
            knowledge REAL DEFAULT 0,
            collected_at TEXT,
            next_review_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (article_id) REFERENCES articles(id),
            UNIQUE (user_id, word, article_id, sentence)
        );

        CREATE TABLE IF NOT EXISTS learning_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            date TEXT,
            words_learned INTEGER DEFAULT 0,
            quiz_score INTEGER,
            time_spent INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS word_cache (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT NOT NULL,
            definition TEXT,
            part_of_speech TEXT,
            is_academic INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS word_context (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT NOT NULL,
            context TEXT,
            definition TEXT,
            part_of_speech TEXT,
            article_id TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE INDEX IF NOT EXISTS idx_word_cache_word ON word_cache(word);
        CREATE INDEX IF NOT EXISTS idx_word_context_word ON word_context(word);
        CREATE INDEX IF NOT EXISTS idx_word_context_article ON word_context(article_id);
        CREATE INDEX IF NOT EXISTS idx_user_words_user ON user_words(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_words_status ON user_words(status);
        CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
        CREATE INDEX IF NOT EXISTS idx_learning_user_date ON learning_records(user_id, date);
    `);
    migrateWordCacheSchema();
    migrateWordContextSchema();
    console.log(`🗄️  数据库初始化完成: ${DB_PATH}`);
}

/**
 * 迁移 word_cache 表结构（支持同一单词多条释义）
 * 旧结构：word TEXT PRIMARY KEY, meaning TEXT
 * 新结构：id 自增主键 + word/definition/part_of_speech，word 可重复
 * 迁移时把旧 meaning 当作 definition 保留，part_of_speech 置空
 */
function migrateWordCacheSchema() {
    const cols = db.prepare('PRAGMA table_info(word_cache)').all();
    const names = cols.map(c => c.name);
    // 已为新结构（有 definition、无 meaning）则无需迁移
    if (names.includes('definition') && !names.includes('meaning')) return;

    const oldRows = db.prepare('SELECT word, meaning, is_academic FROM word_cache').all();

    db.exec('DROP TABLE word_cache;');
    db.exec(`
        CREATE TABLE word_cache (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT NOT NULL,
            definition TEXT,
            part_of_speech TEXT,
            is_academic INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now'))
        );
        CREATE INDEX IF NOT EXISTS idx_word_cache_word ON word_cache(word);
    `);

    const ins = db.prepare('INSERT INTO word_cache (word, definition, part_of_speech, is_academic) VALUES (?, ?, ?, ?)');
    const tx = db.transaction((rows) => {
        for (const r of rows) {
            ins.run(r.word, r.meaning, null, r.is_academic || 0);
        }
    });
    tx(oldRows);
    if (oldRows.length > 0) console.log(`🔧 迁移 word_cache 表结构（支持多释义），保留 ${oldRows.length} 条词条`);
}

/**
 * 迁移 word_context 表结构：新增 article_id 列（用于按文章扫描空释义）
 */
function migrateWordContextSchema() {
    const cols = db.prepare('PRAGMA table_info(word_context)').all();
    const names = cols.map(c => c.name);
    if (names.includes('article_id')) return;
    db.exec('ALTER TABLE word_context ADD COLUMN article_id TEXT;');
    console.log('🔧 迁移 word_context 表结构（新增 article_id 列）');
}

// ==================== 用户相关 ====================

function getOrCreateUser(username) {
    if (!username) username = process.env.DEFAULT_USERNAME || 'golden-apple-user';
    const existing = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (existing) return existing;

    const info = db.prepare('INSERT INTO users (username) VALUES (?)').run(username);
    console.log(`👤 创建用户: ${username} (id=${info.lastInsertRowid})`);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
}

function updateUserStreak(userId, streak, lastActive) {
    db.prepare(`UPDATE users SET streak = ?, last_active = ? WHERE id = ?`)
      .run(streak, lastActive, userId);
}

function updateUserLevel(userId, level) {
    db.prepare('UPDATE users SET level = ? WHERE id = ?').run(level, userId);
}

// ==================== 文章相关 ====================

function insertArticle(article) {
    // article: { id, user_id, title, description, content, source, level, level_label, status, questions, sentences }
    db.prepare(`
        INSERT OR IGNORE INTO articles
        (id, user_id, title, description, content, source, level, level_label, word_count, status, questions, sentences)
        VALUES (@id, @user_id, @title, @description, @content, @source, @level, @level_label, @word_count, @status, @questions, @sentences)
    `).run({
        id: article.id,
        user_id: article.user_id || null,
        title: article.title || '',
        description: article.description || '',
        content: article.content || '',
        source: article.source || 'upload',
        level: article.level || null,
        level_label: article.level_label || null,
        word_count: article.word_count || countWords(article.content),
        status: article.status || 'pending',
        questions: article.questions ? JSON.stringify(article.questions) : null,
        sentences: article.sentences ? JSON.stringify(article.sentences) : null
    });
}

function getArticleById(id) {
    const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    if (!row) return null;
    return deserializeArticle(row);
}

function updateArticleStatus(id, status) {
    db.prepare(`UPDATE articles SET status = ?, updated_at = datetime('now') WHERE id = ?`)
      .run(status, id);
}

function updateArticleQuestions(id, questions, sentences) {
    db.prepare(`UPDATE articles SET questions = ?, sentences = ?, status = 'completed', updated_at = datetime('now') WHERE id = ?`)
      .run(
          questions ? JSON.stringify(questions) : null,
          sentences ? JSON.stringify(sentences) : null,
          id
      );
}

function listArticles() {
    const rows = db.prepare('SELECT * FROM articles ORDER BY created_at ASC').all();
    return rows.map(deserializeArticle);
}

function deserializeArticle(row) {
    return {
        ...row,
        questions: row.questions ? JSON.parse(row.questions) : [],
        sentences: row.sentences ? JSON.parse(row.sentences) : []
    };
}

function countWords(text) {
    if (!text) return 0;
    const matches = text.match(/[A-Za-z]+(?:-[A-Za-z]+)*/g);
    return matches ? matches.length : 0;
}

// ==================== user_words 相关 ====================

function insertUserWord(w) {
    // w: { user_id, word, definition, sentence, article_id, paragraph_index, sentence_index, status, knowledge, collected_at, next_review_at }
    try {
        const info = db.prepare(`
            INSERT INTO user_words
            (user_id, word, definition, sentence, article_id, paragraph_index, sentence_index, status, knowledge, collected_at, next_review_at)
            VALUES (@user_id, @word, @definition, @sentence, @article_id, @paragraph_index, @sentence_index, @status, @knowledge, @collected_at, @next_review_at)
        `).run({
            user_id: w.user_id,
            word: w.word,
            definition: w.definition || null,
            sentence: w.sentence || null,
            article_id: w.article_id || null,
            paragraph_index: w.paragraph_index || 0,
            sentence_index: w.sentence_index || 0,
            status: w.status || 'pending',
            knowledge: w.knowledge !== undefined ? w.knowledge : 0,
            collected_at: w.collected_at || new Date().toISOString(),
            next_review_at: w.next_review_at || null
        });
        return { success: true, id: info.lastInsertRowid };
    } catch (e) {
        // 唯一约束冲突说明已收藏
        if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return { success: false, reason: 'duplicate' };
        }
        throw e;
    }
}

function isWordCollectedInSentence(userId, word, articleId, sentence) {
    const row = db.prepare(`
        SELECT 1 FROM user_words
        WHERE user_id = ? AND word = ? AND article_id = ? AND sentence = ? LIMIT 1
    `).get(userId, word, articleId, sentence);
    return !!row;
}

function getUserWords(userId, status) {
    if (status && status !== 'all') {
        return db.prepare('SELECT * FROM user_words WHERE user_id = ? AND status = ? ORDER BY collected_at DESC')
                 .all(userId, status);
    }
    return db.prepare('SELECT * FROM user_words WHERE user_id = ? ORDER BY collected_at DESC').all(userId);
}

function updateUserWordStatus(id, status, knowledge) {
    const nextReview = computeNextReview(status);
    db.prepare(`UPDATE user_words SET status = ?, knowledge = ?, next_review_at = ? WHERE id = ?`)
      .run(status, knowledge !== undefined ? knowledge : knowledgeByStatus(status), nextReview, id);
}

function knowledgeByStatus(status) {
    return { 'mastered': 1, 'learning': 0.5, 'review': 0.2, 'pending': 0 }[status] || 0;
}

function computeNextReview(status) {
    // 艾宾浩斯复习间隔（简化）：需复习=1天，学习中=3天，已掌握=7天
    if (status === 'review') {
        const d = new Date(); d.setDate(d.getDate() + 1);
        return d.toISOString();
    }
    if (status === 'learning') {
        const d = new Date(); d.setDate(d.getDate() + 3);
        return d.toISOString();
    }
    if (status === 'mastered') {
        const d = new Date(); d.setDate(d.getDate() + 7);
        return d.toISOString();
    }
    return null;
}

// ==================== word_cache 相关 ====================

function getWordFromCache(word) {
    const row = db.prepare('SELECT * FROM word_cache WHERE word = ?').get(word.toLowerCase());
    return row || null;
}

function getCachedWordsList(words) {
    if (!words || words.length === 0) return [];
    const placeholders = words.map(() => '?').join(',');
    return db.prepare(`SELECT word, definition FROM word_cache WHERE word IN (${placeholders})`).all(...words);
}

function saveWordsToCache(wordList) {
    // wordList: { word: meaning } 对象；同一单词同释义去重后插入
    if (!wordList || typeof wordList !== 'object') return 0;
    let added = 0;
    const existsStmt = db.prepare('SELECT 1 FROM word_cache WHERE word = ? AND definition = ? LIMIT 1');
    const stmt = db.prepare('INSERT INTO word_cache (word, definition, part_of_speech, is_academic) VALUES (?, ?, ?, 0)');
    const tx = db.transaction((entries) => {
        for (const [word, meaning] of entries) {
            const key = word.toLowerCase();
            const val = typeof meaning === 'string' ? meaning : JSON.stringify(meaning);
            if (existsStmt.get(key, val)) continue;
            stmt.run(key, val, null);
            added++;
        }
    });
    tx(Object.entries(wordList));
    return added;
}

function getWordMeaningFromCache(words) {
    // 返回 { word: definition } 对象（取第一条释义，兼容文章单词展示）
    const rows = getCachedWordsList(words);
    const result = {};
    for (const r of rows) result[r.word] = r.definition;
    return result;
}

function getWordDefinitions(word) {
    // 返回该单词的所有释义 [{ definition, part_of_speech }]
    return db.prepare('SELECT definition, part_of_speech FROM word_cache WHERE word = ? ORDER BY id').all(word.toLowerCase());
}

function addWordDefinition(word, definition, partOfSpeech) {
    const key = word.toLowerCase();
    const info = db.prepare('INSERT INTO word_cache (word, definition, part_of_speech, is_academic) VALUES (?, ?, ?, 0)')
        .run(key, definition, partOfSpeech || null);
    return { id: info.lastInsertRowid, word: key, definition: definition, part_of_speech: partOfSpeech || null };
}

// ==================== word_context 相关（RAG 语境库） ====================

// 检索：word + 当前句子（语境）命中则返回该语境下的释义（跳过 definition 为空的占位行）
function getWordContext(word, context) {
    if (!context) return null;
    const key = word.toLowerCase().trim();
    const ctx = String(context).trim();
    if (!key || !ctx) return null;
    return db.prepare('SELECT * FROM word_context WHERE word = ? AND context = ? AND definition IS NOT NULL AND definition <> \'\' ORDER BY id DESC LIMIT 1')
        .get(key, ctx) || null;
}

// 保存一条语境释义（同一 word + context + definition + article_id 去重；definition 允许为空占位，后续补全）
function saveWordContext(word, context, definition, partOfSpeech, articleId) {
    const key = word.toLowerCase().trim();
    const ctx = String(context || '').trim();
    const def = (definition == null ? '' : String(definition)).trim();
    const aid = articleId ? String(articleId) : null;
    if (!key || !ctx) return null;
    const exists = db.prepare('SELECT 1 FROM word_context WHERE word = ? AND context = ? AND definition = ? AND IFNULL(article_id, \'\') = ? LIMIT 1')
        .get(key, ctx, def, aid || '');
    if (exists) return null;
    const info = db.prepare('INSERT INTO word_context (word, context, definition, part_of_speech, article_id) VALUES (?, ?, ?, ?, ?)')
        .run(key, ctx, def, partOfSpeech || null, aid);
    return { id: info.lastInsertRowid, word: key, context: ctx, definition: def, part_of_speech: partOfSpeech || null, article_id: aid };
}

// 扫描 word_context 中 definition 为空的词（去重），返回 [{word, context}]；传 articleId 则只扫该文章
function getWordContextEmptyDefinitions(articleId) {
    if (articleId) {
        return db.prepare(`
            SELECT DISTINCT word, context FROM word_context
            WHERE (definition IS NULL OR definition = '') AND article_id = ?
            ORDER BY id
        `).all(String(articleId));
    }
    return db.prepare(`
        SELECT DISTINCT word, context FROM word_context
        WHERE definition IS NULL OR definition = ''
        ORDER BY id
    `).all();
}

// 按 word + context（+ 文章）补全空释义：同一词在不同语境下释义不同，需一并匹配，避免混淆
function updateWordContextDefinitionByWordAndContext(word, context, articleId, definition, partOfSpeech) {
    const key = word.toLowerCase().trim();
    const ctx = String(context || '').trim();
    const def = (definition == null ? '' : String(definition)).trim();
    if (!key || !ctx || !def) return 0;
    let info;
    if (articleId) {
        info = db.prepare(`
            UPDATE word_context SET definition = ?, part_of_speech = ?
            WHERE word = ? AND context = ? AND article_id = ? AND (definition IS NULL OR definition = '')
        `).run(def, partOfSpeech || null, key, ctx, String(articleId));
    } else {
        info = db.prepare(`
            UPDATE word_context SET definition = ?, part_of_speech = ?
            WHERE word = ? AND context = ? AND article_id IS NULL AND (definition IS NULL OR definition = '')
        `).run(def, partOfSpeech || null, key, ctx);
    }
    return info.changes;
}

// 批量保存语境释义（list: [{word, context, definition, part_of_speech}]）
function saveWordContextList(list, articleId) {
    if (!Array.isArray(list) || list.length === 0) return 0;
    let added = 0;
    const tx = db.transaction((items) => {
        for (const item of items) {
            if (!item || !item.word) continue;
            if (saveWordContext(item.word, item.context, item.definition, item.part_of_speech, articleId)) added++;
        }
    });
    tx(list);
    return added;
}

// ==================== learning_records 相关 ====================

function recordLearning(userId, date, wordsLearned, quizScore, timeSpent) {
    db.prepare(`
        INSERT INTO learning_records (user_id, date, words_learned, quiz_score, time_spent)
        VALUES (?, ?, ?, ?, ?)
    `).run(userId, date, wordsLearned || 0, quizScore || null, timeSpent || 0);
}

// ==================== 迁移逻辑 ====================

function migratePresetArticles() {
    const presetPath = path.join(__dirname, 'data', 'reading_materials.json');
    if (!fs.existsSync(presetPath)) {
        console.warn('⚠️  预置文章文件不存在，跳过迁移:', presetPath);
        return;
    }
    const articles = JSON.parse(fs.readFileSync(presetPath, 'utf-8'));
    const defaultUser = getOrCreateUser(null);
    let inserted = 0;
    for (const a of articles) {
        const exists = getArticleById(a.id);
        if (exists) continue;
        insertArticle({
            id: a.id,
            user_id: defaultUser.id,
            title: a.title,
            description: a.description || '',
            content: a.article,
            source: 'preset',
            level: a.level,
            level_label: a.levelLabel,
            status: 'completed',
            questions: a.questions || [],
            sentences: a.sentences || a.sentenceList || []
        });
        inserted++;
    }
    if (inserted > 0) console.log(`📚 迁移 ${inserted} 篇预置文章到 articles 表`);
}

function migrateWordCacheJson() {
    const jsonPath = path.join(__dirname, 'word_cache.json');
    if (!fs.existsSync(jsonPath)) return;  // 旧 JSON 不存在，跳过
    try {
        const cache = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        let added = 0;
        for (const [word, val] of Object.entries(cache)) {
            const meaning = typeof val === 'string' ? val : (val.meaning || JSON.stringify(val));
            const isAcademic = typeof val === 'object' ? (val.isAcademic ? 1 : 0) : 0;
            const info = db.prepare('INSERT OR IGNORE INTO word_cache (word, definition, part_of_speech, is_academic) VALUES (?, ?, ?, ?)')
                           .run(word.toLowerCase(), meaning, null, isAcademic);
            if (info.changes > 0) added++;
        }
        if (added > 0) console.log(`💾 迁移 ${added} 个单词从 word_cache.json 到 word_cache 表`);
    } catch (e) {
        console.warn('⚠️  迁移 word_cache.json 失败:', e.message);
    }
}

/**
 * 迁移前端的 localStorage 数据（由前端通过 /api/migrate 接口上传）
 * 入参：collectedWords 数组（对象），username
 */
function migrateLocalCollectedWords(userId, collectedWords) {
    if (!collectedWords || collectedWords.length === 0) return 0;
    let added = 0;
    for (const w of collectedWords) {
        const result = insertUserWord({
            user_id: userId,
            word: w.word,
            definition: w.meaning || w.definition || null,
            sentence: w.sentence || null,
            article_id: w.articleId || null,
            paragraph_index: w.paragraphIndex || 0,
            sentence_index: w.sentenceIndex || 0,
            status: w.status || 'pending',
            knowledge: w.knowledge !== undefined ? w.knowledge : 0,
            collected_at: w.collectedAt || new Date().toISOString()
        });
        if (result.success) added++;
    }
    console.log(`📥 迁移 ${added} 个本地收藏单词到 user_words 表`);
    return added;
}

// ==================== 启动初始化 ====================

function bootstrap() {
    initDB();
    migrateWordCacheJson();
    migratePresetArticles();
    // 确保默认用户存在
    getOrCreateUser(null);
    console.log(`📊 当前数据: 文章 ${listArticles().length} 篇, 单词缓存 ${db.prepare('SELECT COUNT(*) as c FROM word_cache').get().c} 个`);
}

module.exports = {
    db,
    bootstrap,
    // 用户
    getOrCreateUser,
    updateUserStreak,
    updateUserLevel,
    // 文章
    insertArticle,
    getArticleById,
    updateArticleStatus,
    updateArticleQuestions,
    listArticles,
    countWords,
    // user_words
    insertUserWord,
    isWordCollectedInSentence,
    getUserWords,
    updateUserWordStatus,
    knowledgeByStatus,
    // word_cache
    getWordFromCache,
    getCachedWordsList,
    saveWordsToCache,
    getWordMeaningFromCache,
    getWordDefinitions,
    addWordDefinition,
    // word_context（RAG 语境库）
    getWordContext,
    saveWordContext,
    saveWordContextList,
    getWordContextEmptyDefinitions,
    updateWordContextDefinitionByWordAndContext,
    // learning_records
    recordLearning,
    // 迁移
    migratePresetArticles,
    migrateWordCacheJson,
    migrateLocalCollectedWords
};
