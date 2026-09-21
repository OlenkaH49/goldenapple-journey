html_content = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>金苹果之旅</title>
    <style>
        :root {
            --primary: #F59E0B; --bg: #FFFBF5; --card: #FFF; --text: #1F2937; --gray: #6B7280;
            --correct: #10B981; --wrong: #EF4444; --border: #F3F4F6; --purple: #6366F1; --blue: #3B82F6;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: "PingFang SC", "Segoe UI", sans-serif; background: var(--bg); min-height: 100vh; color: var(--text); }
        
        .screen { display: none; padding: 1.5rem; min-height: 100vh; position: relative; }
        .screen.active { display: block; animation: slideInRight 0.4s ease-out; }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .btn { padding: 0.8rem 1.5rem; border: none; border-radius: 0.75rem; font-weight: 600; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
        .btn-primary { background: linear-gradient(135deg, var(--primary), #D97706); color: white; box-shadow: 0 4px 12px rgba(245,158,11,0.3); }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(245,158,11,0.4); }
        .btn-secondary { background: var(--card); color: var(--gray); border: 2px solid var(--border); }
        .btn-secondary:hover { border-color: var(--primary); color: var(--primary); }
        
        .floating-apple { position: absolute; font-size: 6rem; animation: float 3s ease-in-out infinite; pointer-events: none; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
        .apple-1 { top: 5%; left: 5%; animation-delay: 0s; }
        .apple-2 { top: 15%; right: 10%; animation-delay: 0.5s; }
        .apple-3 { bottom: 25%; left: 15%; animation-delay: 1s; }
        .apple-4 { bottom: 15%; right: 5%; animation-delay: 1.5s; }
        
        .grid-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .grid-item { background: white; border-radius: 1rem; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.2s; cursor: pointer; }
        .grid-item:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
        .grid-item.active { border: 2px solid var(--primary); background: #FFFBEB; }
        
        .diff-badge { font-size: 0.7rem; padding: 0.25rem 0.6rem; border-radius: 12px; display: inline-block; font-weight: 600; }
        .diff-a2 { background: #D1FAE5; color: #059669; }
        .diff-b1 { background: #FEF3C7; color: #D97706; }
        .diff-c1 { background: #FEE2E2; color: #DC2626; }
        
        .back-btn { color: var(--gray); cursor: pointer; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.3rem; font-size: 0.9rem; }
        
        .progress-bar { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--correct)); transition: width 0.5s; }
        
        .status-pending { background: #FEF3C7; color: #D97706; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem; }
        .status-learning { background: #DBEAFE; color: #2563EB; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem; }
        .status-mastered { background: #D1FAE5; color: #059669; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem; }
        
        .word-tag { background: #FEF3C7; color: #D97706; padding: 0.4rem 0.8rem; border-radius: 0.5rem; font-size: 0.85rem; }
        
        .footer-bar { position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 1rem; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); }
        
        #toast { position:fixed; top:2rem; left:50%; transform:translateX(-50%); background:#1F2937; color:white; padding:0.75rem 1.5rem; border-radius:2rem; font-size:0.9rem; opacity:0; transition:opacity 0.3s; z-index:2000; }
        
        .word-card { position: fixed; background: white; padding: 1rem; border-radius: 0.75rem; box-shadow: 0 4px 20px rgba(0,0,0,0.15); min-width: 220px; max-width: 320px; z-index: 1000; animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        
        .option-card { padding: 0.8rem; border: 2px solid var(--border); border-radius: 0.6rem; cursor: pointer; margin: 0.5rem 0; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s; }
        .option-card:hover { border-color: var(--primary); }
        .option-card.selected { border-color: var(--primary); background: #FFFBEB; }
        
        .level-circle { width: 140px; height: 140px; border-radius: 50%; border: 6px solid var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto; position: relative; }
        .level-circle::before { content: ""; position: absolute; width: 120px; height: 120px; border-radius: 50%; border: 4px dashed var(--border); }
        
        .article-card { background: white; border-radius: 1rem; padding: 1.2rem; margin-bottom: 1rem; cursor: pointer; transition: all 0.2s; }
        .article-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
        .stat-item { text-align: center; padding: 0.75rem; background: white; border-radius: 0.75rem; }
    </style>
</head>
<body>
    <div id="toast"></div>

    <div class="screen active" id="welcomeScreen">
        <div class="floating-apple apple-1">🍎</div>
        <div class="floating-apple apple-2">🍏</div>
        <div class="floating-apple apple-3">🍎</div>
        <div class="floating-apple apple-4">🍏</div>
        
        <div style="text-align:center;padding:4rem 2rem;position:relative;z-index:10;">
            <div style="font-size:7rem;margin-bottom:1.5rem;animation: float 3s ease-in-out infinite;">🌟🍎</div>
            <h1 style="font-size:2.5rem;margin-bottom:0.5rem;color:var(--primary);font-weight:800;">金苹果之旅</h1>
            <p style="color:var(--gray);margin-bottom:2rem;font-size:1.1rem;">阅读 · 收集 · 学习 · 成长</p>
            <button class="btn btn-primary" onclick="startApp()" style="width:100%;max-width:240px;font-size:1.1rem;padding:1rem 2rem;">开始旅程</button>
        </div>
    </div>

    <div class="screen" id="mainScreen">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
            <div>
                <h1 id="greeting" style="font-size:1.5rem;">Good morning!</h1>
                <p id="stats" style="color:var(--gray);font-size:0.9rem;">Level A2 · 0 words</p>
            </div>
            <span id="streak" style="background:var(--primary);color:white;padding:0.3rem 0.7rem;border-radius:20px;font-size:0.8rem;font-weight:600;">0 days</span>
        </div>

        <div style="background:white;border-radius:1.5rem;overflow:hidden;margin-bottom:2rem;">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20apple%20orchard%20with%20golden%20apples%2C%20warm%20sunset%2C%20cartoon%20style&image_size=landscape_16_9" 
                 style="width:100%;height:150px;object-fit:cover;" alt="Apple Orchard">
            <div style="padding:1.2rem;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
                    <div>
                        <div style="font-size:0.85rem;color:var(--gray);">今日目标</div>
                        <div style="font-size:2rem;font-weight:800;color:var(--primary);" id="dailyProgress">0/10</div>
                    </div>
                    <button class="btn btn-primary" onclick="continueLearning()" style="padding:0.6rem 1.2rem;font-size:0.85rem;">继续学习</button>
                </div>
                <div class="progress-bar" style="margin-bottom:0.5rem;">
                    <div class="progress-fill" id="dailyProgressBar" style="width:0%;"></div>
                </div>
            </div>
        </div>

        <div style="margin-bottom:2rem;">
            <h2 style="margin-bottom:1rem;font-size:1.25rem;font-weight:700;">📖 阅读练习</h2>
            <div id="articlesList"></div>
        </div>

        <div style="margin-bottom:2rem;">
            <h2 style="margin-bottom:1rem;font-size:1.25rem;font-weight:700;">📚 我的词书</h2>
            <div class="grid-container" id="wordbooksGrid"></div>
        </div>

        <div style="background:white;padding:1.2rem;border-radius:1rem;margin-bottom:2rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
                <div>
                    <div style="font-weight:600;">每日挑战</div>
                    <div style="font-size:0.85rem;color:var(--gray);">Spelling Bee</div>
                </div>
                <span style="background:#FEF3C7;color:#D97706;padding:0.2rem 0.5rem;border-radius:10px;font-size:0.75rem;font-weight:600;">+50 XP</span>
            </div>
            <button class="btn btn-primary" onclick="toast('挑战即将推出!')" style="width:100%;margin-top:0.5rem;">参与挑战</button>
        </div>
    </div>

    <div class="screen" id="readingScreen">
        <div class="back-btn" onclick="backToMain()">← 返回</div>
        <div id="articleSelector" style="display:flex;gap:0.75rem;overflow-x:auto;padding-bottom:1rem;margin-bottom:1.5rem;"></div>
        <div style="background:white;padding:1.5rem;border-radius:1rem;line-height:1.8;margin-bottom:80px;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span id="readDiff" class="diff-badge"></span>
                <h1 id="readTitle" style="font-size:1.4rem;margin:0;font-weight:700;"></h1>
            </div>
            <div id="readContent"></div>
        </div>
        <div class="footer-bar">
            <div style="font-size:0.85rem;color:var(--gray);margin-bottom:0.5rem;">已收集: <span id="progText">0/0 生词</span></div>
            <div class="progress-bar"><div class="progress-fill" id="progBar"></div></div>
            <button class="btn btn-primary" onclick="startQuiz()" style="width:100%;margin-top:1rem;">开始测试 →</button>
        </div>
    </div>

    <div class="screen" id="quizScreen">
        <div class="back-btn" onclick="backToReading()">← 返回</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <div>
                <h1 style="font-size:1.3rem;margin-bottom:0.25rem;">阅读理解</h1>
                <p style="color:var(--gray);font-size:0.85rem;" id="quizArticleInfo"></p>
            </div>
            <span id="quizProg" style="font-size:0.85rem;color:var(--gray);">0/4</span>
        </div>
        <div class="progress-bar" style="margin-bottom:1.5rem;">
            <div class="progress-fill" id="quizProgressBar" style="width:0%;"></div>
        </div>
        <div id="quizQuestions"></div>
        <div class="footer-bar">
            <div style="font-size:0.85rem;color:var(--gray);text-align:center;margin-bottom:0.75rem;" id="quizAnswered">0/4 answered</div>
            <button class="btn btn-primary" onclick="submitQuiz()" style="width:100%;">提交答案 →</button>
        </div>
    </div>

    <div class="screen" id="assessmentScreen">
        <div style="text-align:center;margin-bottom:2rem;">
            <h1 style="font-size:1.5rem;margin-bottom:0.25rem;">评测结果</h1>
            <p style="color:var(--gray);font-size:0.9rem;">基于阅读和测试表现</p>
        </div>
        <div style="text-align:center;margin-bottom:2rem;">
            <div class="level-circle">
                <div>
                    <div style="font-size:3rem;font-weight:800;color:var(--primary);" id="assLevel">B1</div>
                    <div style="font-size:0.8rem;color:var(--gray);" id="assLevelLabel">Intermediate</div>
                </div>
            </div>
        </div>
        <div style="display:flex;gap:1rem;margin-bottom:2rem;">
            <div style="flex:1;background:white;padding:1.2rem;border-radius:1rem;">
                <div style="font-size:0.8rem;color:var(--gray);margin-bottom:0.5rem;">词汇维度</div>
                <div style="font-size:0.7rem;color:var(--gray);margin-bottom:0.5rem;">查词率</div>
                <div style="font-size:2rem;font-weight:800;color:var(--primary);margin-bottom:0.5rem;" id="vocabScore">38%</div>
                <div class="progress-bar" style="margin-bottom:0.75rem;"><div class="progress-fill" id="vocabProgress" style="width:38%;"></div></div>
                <div style="font-size:0.8rem;color:var(--gray);" id="vocabComment">继续阅读扩展词汇!</div>
            </div>
            <div style="flex:1;background:white;padding:1.2rem;border-radius:1rem;">
                <div style="font-size:0.8rem;color:var(--gray);margin-bottom:0.5rem;">理解维度</div>
                <div style="font-size:0.7rem;color:var(--gray);margin-bottom:0.5rem;">答题正确率</div>
                <div style="font-size:2rem;font-weight:800;color:var(--correct);margin-bottom:0.5rem;" id="compScore">75%</div>
                <div class="progress-bar" style="margin-bottom:0.75rem;"><div class="progress-fill" id="compProgress" style="width:75%;background:linear-gradient(90deg, var(--correct), #34D399);"></div></div>
                <div style="font-size:0.8rem;color:var(--gray);" id="compComment">理解良好!</div>
            </div>
        </div>
        <div style="background:white;padding:1.5rem;border-radius:1rem;margin-bottom:2rem;">
            <p style="font-size:0.95rem;color:var(--text);line-height:1.6;" id="assComment">你目前的水平是 B1。继续阅读，读得越多，知道的就越多!</p>
        </div>
        <div style="margin-bottom:2rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                <h3 style="font-size:1rem;">收集的生词</h3>
                <span style="font-size:0.8rem;color:var(--gray);" id="collectedCount">0 words</span>
            </div>
            <div id="collectedList" style="display:flex;flex-wrap:wrap;gap:0.5rem;"></div>
        </div>
        <div style="display:flex;gap:1rem;">
            <button class="btn btn-secondary" onclick="backToMain()" style="flex:1;">返回首页</button>
            <button class="btn btn-primary" onclick="showVocabBook()" style="flex:1;">开始学习</button>
        </div>
    </div>

    <div class="screen" id="vocabBookScreen">
        <div class="back-btn" onclick="backToMain()">← 返回</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
            <div>
                <h1 style="font-size:1.3rem;">我的生词本</h1>
                <p style="color:var(--gray);font-size:0.85rem;" id="vocabStats">0 words</p>
            </div>
        </div>
        <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;background:white;padding:0.25rem;border-radius:0.75rem;">
            <button class="btn vocab-filter" onclick="filterVocab('all')" style="flex:1;background:var(--primary);color:white;padding:0.5rem;font-size:0.85rem;border-radius:0.5rem;">全部</button>
            <button class="btn vocab-filter" onclick="filterVocab('pending')" style="flex:1;background:var(--border);color:var(--gray);padding:0.5rem;font-size:0.85rem;border-radius:0.5rem;">待学</button>
            <button class="btn vocab-filter" onclick="filterVocab('learning')" style="flex:1;background:var(--border);color:var(--gray);padding:0.5rem;font-size:0.85rem;border-radius:0.5rem;">学习中</button>
            <button class="btn vocab-filter" onclick="filterVocab('mastered')" style="flex:1;background:var(--border);color:var(--gray);padding:0.5rem;font-size:0.85rem;border-radius:0.5rem;">已掌握</button>
        </div>
        <div class="stats-grid" style="margin-bottom:1.5rem;">
            <div class="stat-item">
                <div style="font-size:1.5rem;font-weight:700;color:var(--primary);" id="vTotal">0</div>
                <div style="font-size:0.75rem;color:var(--gray);">总计</div>
            </div>
            <div class="stat-item">
                <div style="font-size:1.5rem;font-weight:700;color:var(--primary);" id="vPending">0</div>
                <div style="font-size:0.75rem;color:var(--gray);">待学</div>
            </div>
            <div class="stat-item">
                <div style="font-size:1.5rem;font-weight:700;color:var(--correct);" id="vMastered">0</div>
                <div style="font-size:0.75rem;color:var(--gray);">已掌握</div>
            </div>
        </div>
        <div id="vocabContent"></div>
    </div>

    <script>
        const ARTICLES = [
            {
                id: 'article_001',
                level: 'b1',
                levelLabel: 'Intermediate',
                title: 'The Science of Sleep',
                description: 'Why do we need sleep and what happens when we don\'t get enough?',
                article: 'The importance of sleep has been widely recognized by scientists around the world. Research shows that adults need between seven and nine hours of sleep each night to maintain optimal health. Despite this, many people consistently fail to get enough rest, leading to a growing public health concern.\n\nDuring sleep, the brain performs essential functions that cannot occur while we are awake. One of the most fascinating discoveries in recent years is that sleep helps clear toxic proteins from the brain, which may contribute to diseases like Alzheimer\'s. This breakthrough has changed how researchers think about the relationship between sleep and long-term health.\n\nStudies have also demonstrated that sleep profoundly affects our ability to learn and remember new information. Students who get adequate sleep before an exam typically perform better than those who stay up all night studying. The brain consolidates memories during deep sleep, strengthening the neural connections formed during the day.',
                words: {
                    'recognized': '认出；识别', 'consistently': '一贯地；始终如一地', 'essential': '必要的；至关重要的',
                    'fascinating': '迷人的；极有吸引力的', 'contribute': '促成；贡献', 'breakthrough': '突破',
                    'demonstrated': '证明；展示', 'profoundly': '深刻地；极大地', 'adequate': '足够的；适当的',
                    'consolidates': '巩固；强化', 'neural': '神经的', 'connections': '连接',
                    'widely recognized': '广泛认可', 'public health concern': '公共卫生问题',
                    'perform essential functions': '执行基本功能', 'contribute to': '导致；促成',
                    'affects our ability': '影响我们的能力', 'typically perform better': '通常表现更好',
                    'stay up all night': '熬夜', 'during deep sleep': '在深度睡眠期间',
                    'while': '然而', 'despite': '尽管', 'this': '这', 'one of': '其中之一',
                    'also': '也', 'than': '比', 'during': '在...期间'
                },
                questions: [
                    { type: 'MAIN IDEA', question: 'What is the main purpose of this article?', options: ['To explain why people don\'t sleep enough', 'To discuss the importance of sleep for health and learning', 'To introduce new sleeping pills', 'To compare human sleep with animal sleep'], answer_index: 1 },
                    { type: 'DETAIL', question: 'According to the article, what happens during deep sleep?', options: ['The brain produces toxic proteins', 'The body repairs damaged muscles only', 'The brain strengthens neural connections and clears toxic proteins', 'People dream about their daily activities'], answer_index: 2 },
                    { type: 'INFERENCE', question: 'What can be inferred about students who stay up all night before exams?', options: ['They usually get the highest scores', 'They might perform worse than students who sleep adequately', 'They have better memories', 'They are more intelligent'], answer_index: 1 },
                    { type: 'TRUE/FALSE', question: 'Sleep helps clear toxic proteins from the brain.', options: ['True', 'False'], answer_index: 0 }
                ]
            },
            {
                id: 'article_002',
                level: 'a2',
                levelLabel: 'Beginner',
                title: 'The Weekend Market',
                description: 'A visit to a local market on a sunny weekend.',
                article: 'Last weekend, I went to the local market with my family. The market was crowded with people buying fresh fruits, vegetables, and handmade crafts. My mom bought some delicious strawberries and a bunch of fresh flowers. I helped my dad bargain for a wooden toy for my little brother.\n\nWe walked around for hours, trying different snacks from food stalls. There were crispy fried noodles, sweet ice cream, and spicy grilled corn. My favorite was the freshly squeezed orange juice. We also listened to a street musician playing the guitar.\n\nAs the afternoon turned into evening, we decided to head home. We had bought so many things that we needed two bags to carry everything. It was a wonderful day, and I can\'t wait to go back next weekend!',
                words: {
                    'market': '市场', 'crowded': '拥挤的', 'fresh': '新鲜的', 'vegetables': '蔬菜',
                    'handmade': '手工制作的', 'crafts': '手工艺品', 'strawberries': '草莓', 'bargain': '讨价还价',
                    'wooden': '木制的', 'snacks': '小吃', 'stalls': '摊位', 'crispy': '酥脆的',
                    'fried': '油炸的', 'sweet': '甜的', 'spicy': '辣的', 'grilled': '烤的',
                    'squeezed': '榨取的', 'street': '街道', 'musician': '音乐家', 'wonderful': '精彩的',
                    'local market': '当地市场', 'buying fresh fruits': '买新鲜水果', 'a bunch of': '一束',
                    'bargain for': '讨价还价', 'walked around': '四处走动', 'food stalls': '小吃摊',
                    'fried noodles': '炒面', 'grilled corn': '烤玉米', 'freshly squeezed': '现榨的',
                    'street musician': '街头音乐家', 'turned into': '变成', 'head home': '回家',
                    'can\'t wait to': '迫不及待', 'as': '随着', 'and': '和', 'also': '也', 'so...that': '如此...以至于'
                },
                questions: [
                    { type: 'MAIN IDEA', question: 'What is the main topic of this passage?', options: ['A visit to the weekend market', 'How to bargain at markets', 'Different types of markets', 'The history of markets'], answer_index: 0 },
                    { type: 'DETAIL', question: 'What did the author\'s mom buy?', options: ['A wooden toy', 'Strawberries and flowers', 'Orange juice', 'Fried noodles'], answer_index: 1 },
                    { type: 'INFERENCE', question: 'How did the author feel about the market visit?', options: ['Bored', 'Unhappy', 'Excited and happy', 'Tired'], answer_index: 2 },
                    { type: 'TRUE/FALSE', question: 'They stayed at the market until night.', options: ['True', 'False'], answer_index: 1 }
                ]
            },
            {
                id: 'article_003',
                level: 'c1',
                levelLabel: 'Advanced',
                title: 'AI Ethics',
                description: 'Exploring the moral challenges of AI in modern society.',
                article: 'Artificial Intelligence has become an integral part of modern society, transforming industries from healthcare to finance. However, this rapid advancement brings significant ethical challenges that must be addressed. One major concern is algorithmic bias, where AI systems trained on biased data can perpetuate discrimination against certain groups.\n\nAnother critical issue is transparency. Many AI systems, particularly deep learning models, operate as "black boxes" — their decision-making processes are opaque even to their developers. This lack of transparency makes it difficult to hold AI systems accountable for their actions.\n\nPrivacy is also a pressing concern. AI systems often require vast amounts of personal data to function effectively, raising questions about who controls this data and how it is used. As AI continues to evolve, establishing robust ethical frameworks will be essential to ensure that technology serves humanity responsibly.',
                words: {
                    'artificial': '人工的', 'integral': '不可或缺的', 'transforming': '转变', 'healthcare': '医疗保健',
                    'rapid': '快速的', 'advancement': '进步', 'ethical': '伦理的', 'addressed': '解决',
                    'algorithmic': '算法的', 'bias': '偏见', 'perpetuate': '延续', 'discrimination': '歧视',
                    'transparency': '透明度', 'particularly': '尤其', 'opaque': '不透明的', 'accountable': '负责任的',
                    'privacy': '隐私', 'pressing': '紧迫的', 'vast': '大量的', 'evolve': '发展',
                    'robust': '强大的', 'frameworks': '框架', 'essential': '必要的', 'responsibly': '负责任地',
                    'integral part': '不可或缺的部分', 'rapid advancement': '快速发展', 'ethical challenges': '伦理挑战',
                    'algorithmic bias': '算法偏见', 'biased data': '有偏见的数据', 'perpetuate discrimination': '延续歧视',
                    'black boxes': '黑匣子', 'decision-making processes': '决策过程', 'lack of transparency': '缺乏透明度',
                    'hold accountable': '追究责任', 'vast amounts of': '大量的', 'ethical frameworks': '伦理框架',
                    'serve humanity': '服务人类', 'however': '然而', 'another': '另一个', 'also': '也', 'as': '随着'
                },
                questions: [
                    { type: 'MAIN IDEA', question: 'What is the main focus of this article?', options: ['The benefits of AI', 'Ethical challenges posed by AI', 'How to build AI systems', 'The history of AI'], answer_index: 1 },
                    { type: 'DETAIL', question: 'What is algorithmic bias?', options: ['AI systems that are too slow', 'AI systems trained on biased data that perpetuate discrimination', 'AI systems that are too expensive', 'AI systems that only work with images'], answer_index: 1 },
                    { type: 'INFERENCE', question: 'Why is transparency important in AI?', options: ['To make AI systems faster', 'To ensure accountability for AI decisions', 'To reduce data storage needs', 'To make AI systems more colorful'], answer_index: 1 },
                    { type: 'TRUE/FALSE', question: 'AI systems always explain their decisions clearly.', options: ['True', 'False'], answer_index: 1 }
                ]
            }
        ];

        const WORDBOOKS = [
            { id: 'wb_1', name: '初中词汇', icon: '📚', totalWords: 1500, learned: 320, mastered: 180, level: 'middle' },
            { id: 'wb_2', name: '高中词汇', icon: '📖', totalWords: 3500, learned: 120, mastered: 45, level: 'high' },
            { id: 'wb_3', name: '中考核心', icon: '🎯', totalWords: 600, learned: 450, mastered: 320, level: 'middle' },
            { id: 'wb_4', name: '高考核心', icon: '💎', totalWords: 1200, learned: 80, mastered: 25, level: 'high' },
            { id: 'wb_5', name: '日常会话', icon: '💬', totalWords: 500, learned: 200, mastered: 150, level: 'a2' },
            { id: 'wb_6', name: '商务英语', icon: '💼', totalWords: 800, learned: 50, mastered: 10, level: 'c1' }
        ];

        let currentArticle, collectedWords = [], quizAnswers = [];
        let userData = { collectedWords: [], level: 'A2', streak: 0, lastDate: null, masteredCount: 0 };
        let currentFilter = 'all';

        function loadData() {
            const saved = localStorage.getItem('gaUserData');
            if (saved) userData = JSON.parse(saved);
        }

        function saveData() {
            localStorage.setItem('gaUserData', JSON.stringify(userData));
        }

        function toast(msg) {
            const t = document.getElementById('toast');
            t.textContent = msg; t.style.opacity = 1;
            setTimeout(() => t.style.opacity = 0, 2000);
        }

        function showScreen(id) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        }

        function startApp() {
            loadData();
            const today = new Date().toDateString();
            if (userData.lastDate !== today) {
                const yest = new Date(); yest.setDate(yest.getDate() - 1);
                userData.streak = (userData.lastDate === yest.toDateString()) ? userData.streak + 1 : 1;
                userData.lastDate = today;
                saveData();
            }
            renderMain();
            showScreen('mainScreen');
        }

        function backToMain() { renderMain(); showScreen('mainScreen'); }

        function renderMain() {
            const h = new Date().getHours();
            document.getElementById('greeting').textContent = h >= 18 ? '晚上好!' : h >= 12 ? '下午好!' : '早上好!';
            document.getElementById('streak').textContent = userData.streak + ' 天';
            const total = userData.collectedWords.length;
            const pending = userData.collectedWords.filter(w