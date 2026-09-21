/**
 * fallback.js - 降级题目生成器（通用阅读理解题）
 *
 * 与 Coze 工作流是主备关系（不是替代关系）：
 * - Coze 的 quiz_generator 正常时不调用本文件
 * - 仅当 quiz_generator 失败、超时或文章状态变为 'failed' 时作为兜底
 * - 保证用户在任何情况下都有题可做
 *
 * 输出为 3 道通用阅读理解题（主旨题 / 细节题 / 推理题），
 * 答案由用户在文章原文中划选文字（前端处理高亮与提交），不再是随机抽词选择题。
 * 每题结构：
 * { type, question, options: [], answer_index: -1, explanation: '', isFallback: true, answerMode: 'selection' }
 */

// 常见停用词（避免细节题的关键词落在虚词/高频词上）
const FALLBACK_STOPWORDS = [
    'the', 'and', 'that', 'with', 'this', 'from', 'they', 'have', 'there',
    'their', 'which', 'about', 'would', 'should', 'could', 'because',
    'through', 'between', 'during', 'before', 'after', 'above', 'below',
    'again', 'further', 'those', 'other', 'people', 'world', 'important',
    'different', 'could', 'would', 'about'
];

function generateFallbackQuestions(content) {
    return [
        {
            type: 'main-idea',
            question: '请用文章中的一句话概括全文主旨',
            options: [],
            answer_index: -1,
            explanation: '',
            isFallback: true,
            answerMode: 'selection'
        },
        {
            type: 'detail',
            question: '请找出文章中描述' + (extractSubject(content) ? '「' + extractSubject(content) + '」' : '核心内容') + '的句子',
            options: [],
            answer_index: -1,
            explanation: '',
            isFallback: true,
            answerMode: 'selection'
        },
        {
            type: 'inference',
            question: '请划出最能体现作者观点或态度的句子',
            options: [],
            answer_index: -1,
            explanation: '',
            isFallback: true,
            answerMode: 'selection'
        }
    ];
}

// 从原文提取一个较长的关键词（按词频，去停用词），用于细节题
function extractSubject(content) {
    if (!content || !content.trim()) return '';
    const matches = content.match(/[A-Za-z]{5,}/g) || [];
    const freq = {};
    matches.forEach(function (w) {
        const k = w.toLowerCase();
        freq[k] = (freq[k] || 0) + 1;
    });
    const keys = Object.keys(freq)
        .filter(function (k) { return FALLBACK_STOPWORDS.indexOf(k) === -1; })
        .sort(function (a, b) { return freq[b] - freq[a]; });
    return keys[0] || '';
}

// 完全无内容时的占位题目（复用同样的 3 道题）
function generatePlaceholderQuestions() {
    return generateFallbackQuestions('');
}

module.exports = { generateFallbackQuestions, generatePlaceholderQuestions };