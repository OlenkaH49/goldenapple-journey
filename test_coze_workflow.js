/**
 * test_coze_workflow.js - 测试 Coze workflow 调用是否成功
 * 上传文章 → 轮询状态 → 看 Coze 是否真正跑通（不再 401/格式错误）
 */
const fetch = require('node-fetch');
const BASE = 'http://localhost:3000';
const USERNAME = 'coze-test-' + Date.now();

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
    console.log('🤖 Coze workflow 测试开始\n');
    const content = 'The sun rises in the east and sets in the west. A young boy named Tom loved to watch the sunset every evening. One day, he decided to climb the small hill near his home to see the sunset more clearly. The sky turned into beautiful colors of orange and pink. Tom felt very peaceful and happy. He promised himself he would come back again the next day.';

    // 上传
    const upload = await (await fetch(BASE + '/api/upload-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-username': USERNAME },
        body: JSON.stringify({ content, title: 'Coze 测试文章' })
    })).json();
    console.log('上传:', JSON.stringify(upload));
    const aid = upload.articleId;

    // 轮询
    for (let i = 0; i < 20; i++) {
        await sleep(2000);
        const st = await (await fetch(BASE + '/api/article-status/' + aid, {
            headers: { 'x-username': USERNAME }
        })).json();
        console.log(`第${i + 1}次轮询: status=${st.status}${st.queueStatus ? ' (queue=' + st.queueStatus + ', retries=' + st.retries + ')' : ''}`);
        if (st.status === 'completed') {
            console.log('\n✅ Coze workflow 成功！');
            console.log('题目数:', (st.questions || []).length);
            console.log('单词数:', Object.keys(st.words || {}).length);
            if (st.questions && st.questions[0]) {
                console.log('示例题:', st.questions[0].question);
                console.log('选项:', st.questions[0].options);
            }
            return;
        }
        if (st.status === 'failed') {
            console.log('\n❌ Coze workflow 失败:', st.error || '');
            console.log('降级题目数:', (st.questions || []).length, '(isFallback=' + st.isFallback + ')');
            return;
        }
    }
    console.log('\n⏰ 40 秒未完成（仍在重试中）');
}

main().catch(e => console.error('测试异常:', e.message));
