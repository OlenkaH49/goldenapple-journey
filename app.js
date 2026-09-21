const ARTICLES = [
    {
        id: 'article_001',
        level: 'middle',
        levelLabel: '初中',
        title: 'A Trip to the Beach',
        description: 'A wonderful summer vacation with family.',
        article: 'Last summer, my family and I went on a trip to the beach. We drove for three hours to get there. When we arrived, the sun was shining brightly and the sky was a beautiful blue. My little sister immediately ran towards the water, while my dad set up our tent. I helped my mom unpack the picnic basket. We spent the whole day swimming, building sandcastles, and playing beach volleyball. In the evening, we had a barbecue on the beach. The food smelled amazing! As the sun set, we sat around the campfire and told stories. It was one of the best vacations I\'ve ever had.',
        words: {
            'vacation': '假期', 'beach': '海滩', 'drove': '驾驶', 'arrived': '到达',
            'shining': '照耀', 'beautiful': '美丽的', 'immediately': '立刻', 'ran': '跑',
            'towards': '朝向', 'set up': '搭建', 'tent': '帐篷', 'unpack': '打开包裹',
            'picnic': '野餐', 'basket': '篮子', 'swimming': '游泳', 'sandcastles': '沙堡',
            'volleyball': '排球', 'evening': '傍晚', 'barbecue': '烧烤', 'campfire': '篝火',
            'stories': '故事', 'whole day': '一整天', 'as the sun set': '当太阳落下时'
        },
        questions: [
            { type: 'DETAIL', question: 'How did the family get to the beach?', options: ['By plane', 'By car', 'By train', 'By boat'], answer_index: 1 },
            { type: 'DETAIL', question: 'What did the little sister do first?', options: ['Built a sandcastle', 'Ran towards the water', 'Helped unpack', 'Played volleyball'], answer_index: 1 },
            { type: 'DETAIL', question: 'What did they do in the evening?', options: ['Swam in the ocean', 'Built more sandcastles', 'Had a barbecue', 'Went shopping'], answer_index: 2 },
            { type: 'INFERENCE', question: 'How did the author feel about the trip?', options: ['It was boring', 'It was one of the best vacations', 'It was too short', 'It was expensive'], answer_index: 1 }
        ]
    },
    {
        id: 'article_002',
        level: 'middle',
        levelLabel: '初中',
        title: 'The Power of Music',
        description: 'Music\'s effects on mood and expression.',
        article: 'Music is an important part of many people\'s lives. It can make us happy, sad, or excited. Different types of music have different effects on our mood. For example, fast music with a strong beat can make us feel energetic and want to dance. Slow, soft music can help us relax and reduce stress. Music is also a form of expression. Musicians write songs to share their feelings and experiences with others. Some people learn to play musical instruments like the piano, guitar, or violin. Others enjoy singing in choirs or bands. No matter how we enjoy music, it has the power to connect people from all over the world.',
        words: {
            'power': '力量', 'effects': '效果', 'mood': '心情', 'expression': '表达',
            'excited': '兴奋的', 'types': '类型', 'fast': '快的', 'strong': '强烈的',
            'beat': '节拍', 'energetic': '精力充沛的', 'dance': '跳舞', 'slow': '慢的',
            'soft': '柔和的', 'relax': '放松', 'reduce': '减少', 'stress': '压力',
            'musicians': '音乐家', 'songs': '歌曲', 'share': '分享', 'feelings': '感受',
            'experiences': '经历', 'instruments': '乐器', 'piano': '钢琴', 'guitar': '吉他',
            'violin': '小提琴', 'singing': '唱歌', 'choirs': '合唱团', 'bands': '乐队',
            'connect': '连接', 'all over the world': '全世界'
        },
        questions: [
            { type: 'MAIN IDEA', question: 'What can music do to our mood?', options: ['Only make us happy', 'Only make us sad', 'Have different effects', 'Have no effect'], answer_index: 2 },
            { type: 'DETAIL', question: 'What kind of music can help us relax?', options: ['Fast music with strong beat', 'Slow, soft music', 'Loud rock music', 'Heavy metal music'], answer_index: 1 },
            { type: 'DETAIL', question: 'Why do musicians write songs?', options: ['To make money', 'To share feelings and experiences', 'To become famous', 'To practice their instruments'], answer_index: 1 },
            { type: 'MAIN IDEA', question: 'What is the main idea of this passage?', options: ['Music is only for musicians', 'Music has many forms and benefits', 'Music is too loud', 'Music is a waste of time'], answer_index: 1 }
        ]
    },
    {
        id: 'article_003',
        level: 'middle',
        levelLabel: '初中',
        title: 'Man\'s Best Friend',
        description: 'The loyalty and companionship of dogs.',
        article: 'Dogs are often called "man\'s best friend" and for good reason. They are loyal, friendly, and always ready to help. Dogs have been domesticated for thousands of years and have become an important part of many families. There are hundreds of different breeds of dogs, each with their own unique characteristics. Some dogs are small and good for apartment living, while others are large and need lots of space to run. Dogs can be trained to do many things, such as fetching balls, guarding homes, and even helping people with disabilities. Taking care of a dog is a big responsibility. They need food, water, exercise, and love every day. But the joy and companionship they bring make it all worth it.',
        words: {
            'loyal': '忠诚的', 'companionship': '陪伴', 'domesticated': '驯养的', 'breeds': '品种',
            'unique': '独特的', 'characteristics': '特征', 'apartment': '公寓', 'space': '空间',
            'trained': '训练', 'fetching': '取来', 'guarding': '守卫', 'disabilities': '残疾',
            'responsibility': '责任', 'food': '食物', 'water': '水', 'exercise': '锻炼',
            'love': '爱', 'joy': '快乐', 'thousands of years': '数千年', 'for good reason': '有充分的理由',
            'take care of': '照顾', 'make it worth it': '使一切值得'
        },
        questions: [
            { type: 'DETAIL', question: 'Why are dogs called \'man\'s best friend\'?', options: ['They are expensive', 'They are loyal and friendly', 'They can bark loud', 'They eat a lot'], answer_index: 1 },
            { type: 'DETAIL', question: 'How many breeds of dogs are there?', options: ['Only a few', 'Hundreds', 'Exactly 100', 'Thousands'], answer_index: 1 },
            { type: 'DETAIL', question: 'What is one thing dogs can be trained to do?', options: ['Drive cars', 'Cook food', 'Guard homes', 'Read books'], answer_index: 2 },
            { type: 'DETAIL', question: 'What do dogs need every day?', options: ['Only food', 'Food, water, exercise, and love', 'Just sleep', 'Expensive toys'], answer_index: 1 }
        ]
    },
    {
        id: 'article_004',
        level: 'high',
        levelLabel: '高中',
        title: 'The Concept of Time',
        description: 'Philosophical and scientific perspectives on time.',
        article: 'The concept of time has fascinated philosophers and scientists for centuries. In physics, time is considered a dimension, along with space, in which events occur in a non-reversible order. Einstein\'s theory of relativity revolutionized our understanding of time, showing that it is not absolute but depends on the observer\'s frame of reference. Time dilation, for example, means that time passes more slowly for objects moving at high speeds relative to stationary observers. This has been confirmed by experiments with atomic clocks on airplanes and satellites. In psychology, the perception of time varies depending on factors such as attention, emotion, and age. When we are engaged in an interesting activity, time seems to fly by, while when we are bored, it drags on. Understanding time is crucial not only for scientific progress but also for organizing our daily lives and making sense of our experiences.',
        words: {
            'concept': '概念', 'fascinated': '使着迷', 'philosophers': '哲学家', 'scientists': '科学家',
            'centuries': '世纪', 'physics': '物理学', 'dimension': '维度', 'events': '事件',
            'non-reversible': '不可逆的', 'order': '顺序', 'Einstein': '爱因斯坦', 'relativity': '相对论',
            'revolutionized': '彻底改变', 'absolute': '绝对的', 'observer': '观察者', 'frame of reference': '参考系',
            'time dilation': '时间膨胀', 'objects': '物体', 'high speeds': '高速', 'relative to': '相对于',
            'stationary': '静止的', 'confirmed': '证实', 'atomic clocks': '原子钟', 'airplanes': '飞机',
            'satellites': '卫星', 'psychology': '心理学', 'perception': '感知', 'factors': '因素',
            'attention': '注意力', 'emotion': '情绪', 'engaged': '参与', 'activity': '活动',
            'fly by': '飞逝', 'bored': '无聊的', 'drags on': '拖延', 'crucial': '关键的',
            'scientific progress': '科学进步', 'making sense of': '理解'
        },
        questions: [
            { type: 'DETAIL', question: 'What did Einstein\'s theory of relativity show about time?', options: ['Time is absolute', 'Time depends on the observer\'s frame of reference', 'Time only exists in space', 'Time is the same for everyone'], answer_index: 1 },
            { type: 'DETAIL', question: 'What is time dilation?', options: ['Time passing more slowly for moving objects', 'Time stopping completely', 'Time moving backwards', 'Time speeding up for everyone'], answer_index: 0 },
            { type: 'DETAIL', question: 'What affects our perception of time according to the passage?', options: ['Only age', 'Attention, emotion, and age', 'Weather conditions', 'The time of day'], answer_index: 1 },
            { type: 'MAIN IDEA', question: 'Why is understanding time important?', options: ['For scientific progress and organizing daily lives', 'Only for scientists', 'For making money', 'For predicting the future'], answer_index: 0 }
        ]
    },
    {
        id: 'article_005',
        level: 'high',
        levelLabel: '高中',
        title: 'The Human Brain',
        description: 'Exploring the complexity of the brain.',
        article: 'The human brain is one of the most complex and fascinating organs in the body. It is composed of billions of neurons that communicate with each other through electrical and chemical signals. The brain can be divided into several regions, each responsible for different functions. The cerebrum, the largest part, controls conscious thought, memory, and voluntary movements. The cerebellum coordinates balance and motor skills. The brainstem regulates basic life functions like breathing and heartbeat. Recent advances in neuroscience have revealed that the brain has remarkable plasticity, meaning it can reorganize itself by forming new neural connections throughout life. This is particularly evident in cases of brain injury, where undamaged areas can sometimes take over functions of damaged regions. Understanding the brain\'s structure and function is essential for developing treatments for neurological disorders and unlocking the mysteries of consciousness.',
        words: {
            'complex': '复杂的', 'fascinating': '迷人的', 'organs': '器官', 'composed': '组成',
            'billions': '数十亿', 'neurons': '神经元', 'communicate': '交流', 'electrical': '电的',
            'chemical': '化学的', 'signals': '信号', 'regions': '区域', 'responsible': '负责的',
            'functions': '功能', 'cerebrum': '大脑', 'conscious': '有意识的', 'thought': '思考',
            'memory': '记忆', 'voluntary': '自愿的', 'movements': '运动', 'cerebellum': '小脑',
            'coordinates': '协调', 'balance': '平衡', 'motor skills': '运动技能', 'brainstem': '脑干',
            'regulates': '调节', 'basic': '基本的', 'breathing': '呼吸', 'heartbeat': '心跳',
            'neuroscience': '神经科学', 'revealed': '揭示', 'remarkable': '显著的', 'plasticity': '可塑性',
            'reorganize': '重组', 'neural connections': '神经连接', 'throughout life': '一生',
            'evident': '明显的', 'brain injury': '脑损伤', 'undamaged': '未受损的', 'take over': '接管',
            'damaged': '受损的', 'structure': '结构', 'essential': '必要的', 'treatments': '治疗',
            'neurological disorders': '神经系统疾病', 'unlocking': '解开', 'mysteries': '奥秘',
            'consciousness': '意识'
        },
        questions: [
            { type: 'DETAIL', question: 'What is the brain composed of?', options: ['Billions of neurons', 'Muscle fibers', 'Blood vessels', 'Bone cells'], answer_index: 0 },
            { type: 'DETAIL', question: 'What does the cerebrum control?', options: ['Balance and motor skills', 'Conscious thought and memory', 'Breathing and heartbeat', 'Digestion'], answer_index: 1 },
            { type: 'DETAIL', question: 'What is brain plasticity?', options: ['The brain\'s ability to reorganize itself', 'The brain\'s rigid structure', 'The brain\'s size', 'The brain\'s color'], answer_index: 0 },
            { type: 'MAIN IDEA', question: 'Why is understanding the brain important?', options: ['For growing vegetables', 'For developing treatments for neurological disorders', 'For building computers', 'For predicting weather'], answer_index: 1 }
        ]
    },
    {
        id: 'article_006',
        level: 'high',
        levelLabel: '高中',
        title: 'Globalization',
        description: 'The interconnected world and its challenges.',
        article: 'Globalization has transformed the world into an interconnected network of economies, cultures, and societies. Advances in technology, particularly the internet and transportation, have made it easier than ever for goods, services, and information to flow across borders. Multinational corporations operate in multiple countries, creating global supply chains that span continents. Cultural exchange has also increased, with people around the world having access to foreign music, movies, and cuisine. However, globalization is not without its challenges. It has led to economic inequality, as wealthy nations and corporations often benefit more than developing ones. There are also concerns about cultural homogenization, where local traditions and languages may be replaced by global influences. Environmental issues such as pollution and resource depletion have become global problems requiring international cooperation. As the world becomes more connected, finding a balance between global integration and local preservation remains a key challenge for policymakers and citizens alike.',
        words: {
            'globalization': '全球化', 'transformed': '转变', 'interconnected': '相互连接的', 'network': '网络',
            'economies': '经济', 'cultures': '文化', 'societies': '社会', 'advances': '进步',
            'technology': '技术', 'particularly': '尤其', 'internet': '互联网', 'transportation': '交通',
            'goods': '商品', 'services': '服务', 'information': '信息', 'flow': '流动',
            'borders': '边界', 'multinational': '跨国的', 'corporations': '公司', 'operate': '运作',
            'global supply chains': '全球供应链', 'span': '跨越', 'continents': '大陆', 'cultural exchange': '文化交流',
            'increased': '增加', 'access': '访问', 'foreign': '外国的', 'music': '音乐',
            'movies': '电影', 'cuisine': '美食', 'challenges': '挑战', 'economic inequality': '经济不平等',
            'wealthy': '富裕的', 'nations': '国家', 'benefit': '受益', 'developing': '发展中的',
            'concerns': '担忧', 'cultural homogenization': '文化同质化', 'local traditions': '地方传统',
            'languages': '语言', 'replaced': '取代', 'global influences': '全球影响', 'environmental issues': '环境问题',
            'pollution': '污染', 'resource depletion': '资源枯竭', 'international cooperation': '国际合作',
            'balance': '平衡', 'global integration': '全球一体化', 'local preservation': '地方保护',
            'policymakers': '政策制定者', 'citizens': '公民', 'alike': '同样地'
        },
        questions: [
            { type: 'DETAIL', question: 'What has made globalization possible?', options: ['Decline in technology', 'Advances in technology like internet and transportation', 'Isolation policies', 'Natural disasters'], answer_index: 1 },
            { type: 'DETAIL', question: 'What is one challenge of globalization mentioned?', options: ['Increased cultural diversity', 'Economic inequality', 'Decreased trade', 'Less communication'], answer_index: 1 },
            { type: 'DETAIL', question: 'What is cultural homogenization?', options: ['Preserving local traditions', 'Replacing local traditions with global influences', 'Increasing language diversity', 'Protecting local cuisine'], answer_index: 1 },
            { type: 'MAIN IDEA', question: 'What is a key challenge mentioned in the passage?', options: ['Finding balance between global integration and local preservation', 'Stopping all international trade', 'Eliminating all technology', 'Closing borders completely'], answer_index: 0 }
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
let currentWordCard = null;
let isTranslationsVisible = false;
let analysisAbortController = null;
let analyzePollToken = 0; // 轮询取消令牌：手动降级/取消时自增，使旧轮询失效

// 拖拽相关全局变量
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let currentDragData = null;  // 当前拖拽的单词数据
let sortPanelSortedWords = [];  // 分类面板中已整理的单词
let sortPanelArticleId = null;  // 分类面板当前筛选的文章ID

// ==================== 后端 API 调用层 ====================
// 数据持久化在 SQLite 数据库（user_words 表），userData.collectedWords 作为运行时镜像
const API_BASE = (window.location.protocol === 'file:') ? 'http://localhost:3000' : (window.location.origin || 'http://localhost:3000');

function getUsername() {
    return (userData && userData.userName) ? userData.userName : 'golden-apple-user';
}

async function apiGet(path) {
    const r = await fetch(API_BASE + path, { headers: { 'x-username': getUsername() } });
    if (!r.ok) throw new Error('GET ' + path + ' 失败: ' + r.status);
    return r.json();
}

async function apiPost(path, body) {
    const r = await fetch(API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-username': getUsername() },
        body: JSON.stringify(body || {})
    });
    if (!r.ok) throw new Error('POST ' + path + ' 失败: ' + r.status);
    return r.json();
}

async function apiPut(path, body) {
    const r = await fetch(API_BASE + path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-username': getUsername() },
        body: JSON.stringify(body || {})
    });
    if (!r.ok) throw new Error('PUT ' + path + ' 失败: ' + r.status);
    return r.json();
}

// 从后端同步 user_words 到本地缓存（userData.collectedWords 作为运行时镜像）
async function syncUserWordsFromServer() {
    try {
        const words = await apiGet('/api/user-words?status=all');
        userData.collectedWords = (words || []).map(function(w) {
            // 用 articleId 找到对应文章，补全 article 标题和 level（用于分组显示）
            const art = ARTICLES.find(a => a.id === w.articleId);
            return {
                id: w.id,
                word: w.word,
                meaning: w.definition,
                definition: w.definition,
                sentence: w.sentence,
                articleId: w.articleId,
                article: art ? art.title : (w.articleId || '未知文章'),
                level: art ? art.level : 'middle',
                paragraphIndex: w.paragraphIndex,
                sentenceIndex: w.sentenceIndex,
                status: w.status,
                knowledge: w.knowledge,
                collectedAt: w.collectedAt
            };
        });
        saveData();
        console.log('✅ 同步 ' + userData.collectedWords.length + ' 个收藏单词');
    } catch (e) {
        console.warn('⚠️ 同步 user-words 失败（离线模式可用本地缓存）:', e.message);
    }
}

// 启动时后端初始化：迁移本地数据 + 打卡 + 拉取收藏
async function initBackendSync() {
    try {
        // 1. 首次升级时迁移 localStorage 旧数据到数据库
        if (userData.collectedWords.length > 0 && !userData.migrated) {
            await apiPost('/api/migrate', {
                collectedWords: userData.collectedWords,
                streak: userData.streak,
                lastDate: userData.lastDate,
                level: userData.level,
                userName: userData.userName
            });
            userData.migrated = true;
            saveData();
            console.log('✅ 本地数据已迁移到数据库');
        }
        // 2. 打卡（更新 users.streak）
        const checkIn = await apiPost('/api/check-in', {});
        if (checkIn && checkIn.streak !== undefined) {
            userData.streak = checkIn.streak;
            userData.lastDate = checkIn.lastActive;
            if (checkIn.level) userData.level = checkIn.level;
            saveData();
        }
        // 3. 拉取数据库收藏单词到本地缓存
        await syncUserWordsFromServer();
        // 4. 若当前在主界面，刷新统计
        if (document.getElementById('dashboardPage') &&
            document.getElementById('dashboardPage').classList.contains('active')) {
            renderMain();
        }
        updateCollectBadge();
    } catch (e) {
        console.warn('⚠️ 后端同步失败（离线模式仍可用）:', e.message);
    }
}

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
    toggleCollectZone(id === 'readingPage' && !!(currentArticle && currentArticle.article));
}

// 控制右侧收藏区的显示：仅在阅读页且文章已加载时显示
function toggleCollectZone(show) {
    const zone = document.getElementById('collectZone');
    if (zone) zone.style.display = show ? 'flex' : 'none';
}

function getLevelLabel(level) {
    const labels = {
        'a2': 'Beginner', 'b1': 'Intermediate', 'c1': 'Advanced',
        'middle': '初中', 'high': '高中'
    };
    return labels[level] || level;
}

function extractWordsFromArticle(articleText) {
    const commonWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
                         'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
                         'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
                         'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
                         'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above',
                         'below', 'between', 'under', 'again', 'further', 'then', 'once', 'here',
                         'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few', 'more',
                         'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
                         'same', 'so', 'than', 'too', 'very', 'just', 'but', 'and', 'or', 'if',
                         'because', 'until', 'while', 'about', 'against', 'he', 'she', 'it', 'they',
                         'we', 'you', 'I', 'me', 'him', 'her', 'us', 'them', 'this', 'that',
                         'these', 'those', 'what', 'which', 'who', 'whom', 'whose'];
    
    const words = {};
    const text = articleText.toLowerCase();
    const wordMatches = text.match(/[a-zA-Z'-]+/g) || [];
    
    const interestingWords = wordMatches.filter(word => {
        return word.length >= 4 && !commonWords.includes(word);
    });
    
    const uniqueWords = [...new Set(interestingWords)].slice(0, 15);
    
    uniqueWords.forEach(word => {
        words[word] = '点击查看释义';
    });
    
    return words;
}

function startApp() {
    try {
        console.log('🎯 startApp() 开始执行...');
        
        // 重置本地数据：每次点击「开始旅程」都从全新状态开始
        localStorage.removeItem('gaUserData');
        localStorage.removeItem('gaCollectedWords');
        localStorage.removeItem('hasDroppedWord');
        userData = { collectedWords: [], level: 'A2', streak: 0, lastDate: null, masteredCount: 0 };
        collectedWords = [];
        currentArticle = null;
        console.log('✅ 本地数据已重置');
        
        const userNameInput = document.getElementById('userName');
        if (userNameInput && userNameInput.value.trim()) {
            userData.userName = userNameInput.value.trim();
            saveData();
        }
        
        const today = new Date().toDateString();
        if (userData.lastDate !== today) {
            const yest = new Date(); yest.setDate(yest.getDate() - 1);
            userData.streak = (userData.lastDate === yest.toDateString()) ? userData.streak + 1 : 1;
            userData.lastDate = today;
            saveData();
        }
        
        // 先直接切换页面，确保可见
        console.log('📝 先切换到主页面...');
        const welcomeScreen = document.getElementById('startingPage');
        const mainScreen = document.getElementById('dashboardPage');
        if (welcomeScreen) welcomeScreen.classList.remove('active');
        if (mainScreen) mainScreen.classList.add('active');
        
        // 再渲染内容
        console.log('📝 渲染主界面内容...');
        try {
            renderMain();
        } catch(e) {
            console.warn('⚠️ renderMain 出错（不影响跳转）:', e.message);
        }
        
        // 异步后端同步：迁移本地数据 + 打卡 + 拉取收藏（不阻塞页面渲染）
        initBackendSync();
        console.log('✅ 完成！');

    } catch (error) {
        console.error('❌ startApp 出错:', error);
        alert('启动失败: ' + error.message);
    }
}

function backToMain() { renderMain(); showScreen('dashboardPage'); }

function renderMain() {
    const h = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) greetingEl.textContent = h >= 18 ? '晚上好!' : h >= 12 ? '下午好!' : '早上好!';
    
    const streakEl = document.getElementById('streak');
    if (streakEl) streakEl.textContent = userData.streak + ' 天';
    
    const total = userData.collectedWords.length;
    const pending = userData.collectedWords.filter(w => w.status === 'pending').length;
    const mastered = userData.collectedWords.filter(w => w.status === 'mastered').length;
    
    const statsEl = document.getElementById('stats');
    if (statsEl) statsEl.textContent = `Level ${userData.level} · ${total} words learned · ${userData.streak}-day streak`;
    
    const vTotal = document.getElementById('vTotal');
    if (vTotal) vTotal.textContent = total;
    
    const vPending = document.getElementById('vPending');
    if (vPending) vPending.textContent = pending;
    
    const vMastered = document.getElementById('vMastered');
    if (vMastered) vMastered.textContent = mastered;
    
    const dailyProgress = Math.min(mastered, 10);
    const dailyProgressEl = document.getElementById('dailyProgress');
    if (dailyProgressEl) dailyProgressEl.textContent = `${dailyProgress}/10`;
    
    const dailyProgressBar = document.getElementById('dailyProgressBar');
    if (dailyProgressBar) dailyProgressBar.style.width = `${(dailyProgress / 10) * 100}%`;
    
    const articlesList = document.getElementById('articlesList');
    if (articlesList) {
        articlesList.innerHTML = ARTICLES.map(a => {
            return `
            <div class="article-card" onclick="openArticle('${a.id}')">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span class="diff-badge diff-${a.level}">${a.level.toUpperCase()}</span>
                    <div style="color:var(--primary);font-size:0.8rem;">★★★☆☆</div>
                </div>
                <h3 style="margin:0.5rem 0;font-size:1rem;">${a.title}</h3>
                <p style="color:var(--gray);font-size:0.85rem;">${a.description}</p>
            </div>
            `;
        }).join('');
    }
    
    const wordbooksGrid = document.getElementById('wordbooksGrid');
    if (wordbooksGrid) {
        wordbooksGrid.innerHTML = WORDBOOKS.map(wb => {
            const progress = Math.round((wb.learned / wb.totalWords) * 100);
            return `
            <div class="grid-item">
                <div style="font-size:1.5rem;margin-bottom:0.5rem;">${wb.icon}</div>
                <div style="font-weight:600;font-size:0.95rem;">${wb.name}</div>
                <div style="font-size:0.75rem;color:var(--gray);margin:0.25rem 0;">${wb.learned}/${wb.totalWords} words</div>
                <div class="progress-bar" style="height:6px;"><div class="progress-fill" style="width:${progress}%;"></div></div>
            </div>
            `;
        }).join('');
    }
    
    console.log('✅ renderMain() 完成');
}

function continueLearning() {
    if (userData.collectedWords.length > 0) {
        showVocabBook();
    } else {
        toast('还没有生词，开始阅读吧!');
        openArticle(ARTICLES[0].id);
    }
}

function openArticle(id) {
    currentArticle = ARTICLES.find(a => a.id === id);
    collectedWords = [];
    isTranslationsVisible = false;
    
    document.getElementById('articleSelector').innerHTML = ARTICLES.map(a => `
        <div onclick="openArticle('${a.id}')" style="flex-shrink:0;background:white;padding:0.8rem 1rem;border-radius:0.75rem;cursor:pointer;border:2px solid ${a.id === id ? 'var(--primary)' : 'transparent'};">
            <div style="font-size:0.7rem;color:var(--gray);margin-bottom:0.25rem;">${a.levelLabel}</div>
            <div style="font-size:0.85rem;font-weight:600;">${a.title}</div>
        </div>
    `).join('');
    
    document.getElementById('readTitle').textContent = currentArticle.title;
    document.getElementById('readDesc').textContent = currentArticle.description || '';
    document.getElementById('readDiff').textContent = currentArticle.level.toUpperCase();
    document.getElementById('readDiff').className = `diff-badge diff-${currentArticle.level}`;
    
    renderArticleWithTranslations();
    bindWordSpanEventsOnce();
    showDragGuideIfNeeded();
    updateProgress();
    
    const transBtn = document.getElementById('toggleTransBtn');
    if (transBtn) {
        transBtn.style.display = 'none';
    }

    const quizBtn = document.getElementById('startQuizBtn');
    if (quizBtn) {
        if (currentArticle.questions && currentArticle.questions.length > 0) {
            quizBtn.style.display = 'block';
            quizBtn.textContent = `开始测试 (${currentArticle.questions.length}题) →`;
        } else {
            quizBtn.style.display = 'none';
        }
    }
    
    // 预置文章：关闭降级划线区
    fallbackQuizActive = false;
    hideQuizExtras();
    updateCollectBadge();
    
    showScreen('readingPage');
}

function openArticleById(index) {
    if (index >= 0 && index < ARTICLES.length) {
        openArticle(ARTICLES[index].id);
    }
}

function showAllArticles() {
    // Scroll to the Reading Library section or show a toast
    toast('查看所有文章');
}

function getWordFromClick(e) {
    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (!range) return null;
    
    range.expand('word');
    let text = range.toString().trim();
    if (!text) return null;
    
    const words = currentArticle.words || {};
    const sentence = getSentenceFromRange(range);
    
    const currentWord = text.replace(/[^-a-zA-Z']/g, '').toLowerCase();
    if (!currentWord) return null;
    
    const connectorWords = ['however', 'therefore', 'moreover', 'furthermore', 'nevertheless', 'consequently', 'meanwhile', 'otherwise', 'although', 'though', 'while', 'when', 'as', 'if', 'because', 'since', 'so', 'but', 'and', 'or', 'for', 'yet', 'nor', 'also', 'even', 'still', 'just', 'only', 'such', 'than', 'that', 'this', 'these', 'those', 'despite', 'during'];
    
    if (connectorWords.includes(currentWord) && words[currentWord]) {
        return { word: currentWord, meaning: words[currentWord], sentence };
    }
    
    const prevWord = getPreviousWord(range, sentence);
    
    if (prevWord) {
        const twoWordPhrase = `${prevWord} ${currentWord}`;
        if (words[twoWordPhrase]) {
            return { word: twoWordPhrase, meaning: words[twoWordPhrase], sentence };
        }
        
        const threeWordPhrase = getThreeWordPhrase(range, sentence, prevWord, currentWord);
        if (threeWordPhrase && words[threeWordPhrase]) {
            return { word: threeWordPhrase, meaning: words[threeWordPhrase], sentence };
        }
    }
    
    const nextWord = getNextWord(range, sentence);
    if (nextWord) {
        const twoWordPhrase = `${currentWord} ${nextWord}`;
        if (words[twoWordPhrase]) {
            return { word: twoWordPhrase, meaning: words[twoWordPhrase], sentence };
        }
    }
    
    if (words[currentWord]) {
        return { word: currentWord, meaning: words[currentWord], sentence };
    }
    
    return null;
}

function getPreviousWord(range, sentence) {
    const offset = range.startOffset;
    const beforeText = sentence.substring(0, offset);
    const wordsBefore = beforeText.split(/\s+/).filter(w => w.trim());
    if (wordsBefore.length > 0) {
        return wordsBefore[wordsBefore.length - 1].replace(/[^-a-zA-Z']/g, '').toLowerCase();
    }
    return null;
}

function getNextWord(range, sentence) {
    const offset = range.endOffset;
    const afterText = sentence.substring(offset);
    const wordsAfter = afterText.split(/\s+/).filter(w => w.trim());
    if (wordsAfter.length > 0) {
        return wordsAfter[0].replace(/[^-a-zA-Z']/g, '').toLowerCase();
    }
    return null;
}

function getThreeWordPhrase(range, sentence, prevWord, currentWord) {
    const nextWord = getNextWord(range, sentence);
    if (nextWord) {
        return `${prevWord} ${currentWord} ${nextWord}`;
    }
    return null;
}

function getSentenceFromRange(range) {
    const container = range.commonAncestorContainer;
    let text = container.textContent || '';
    const sentences = text.split(/[.!?]+/);
    const offset = range.startOffset;
    
    let accum = 0;
    for (const s of sentences) {
        if (accum + s.length >= offset) {
            return s.trim();
        }
        accum += s.length + 1;
    }
    return sentences[0] || text.substring(0, 50);
}

// 判断单词在当前文章的当前句子中是否已收藏（word + articleId + sentence 三者组合）
function isWordCollectedInThisSentence(word, articleId, sentence) {
    const list = (userData && userData.collectedWords) ? userData.collectedWords : [];
    return list.some(function(item) {
        return item.word === word && 
               item.articleId === articleId && 
               item.sentence === sentence;
    });
}

// 浏览器语音朗读单词（speechSynthesis）
function speakText(text) {
    if (!text) return;
    if (!('speechSynthesis' in window)) {
        toast('当前浏览器不支持发音');
        return;
    }
    try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
    } catch (e) {
        toast('发音失败');
    }
}

// 把释义数组按词性分组渲染（用于单词卡片）
function buildDefinitionsHtml(definitions) {
    const groups = {};
    definitions.forEach(function(d) {
        const pos = d.part_of_speech || '其他';
        if (!groups[pos]) groups[pos] = [];
        groups[pos].push(d.definition);
    });
    const order = ['n.', 'v.', 'adj.', 'adv.'];
    const posEntries = Object.keys(groups).sort(function(a, b) {
        const ia = order.indexOf(a); const ib = order.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    let html = '<div class="wc-defs" style="margin-top:0.4rem;">';
    posEntries.forEach(function(pos) {
        html += '<div class="wc-def-group" style="display:flex;gap:0.5rem;align-items:baseline;margin-top:0.3rem;line-height:1.5;">'
            + '<span style="flex:none;font-size:0.72rem;font-weight:700;color:var(--primary);background:var(--primary-light);padding:0.05rem 0.45rem;border-radius:0.4rem;">' + escapeHtml(pos) + '</span>'
            + '<span style="font-size:1.05rem;color:var(--primary);">' + groups[pos].map(escapeHtml).join('；') + '</span>'
            + '</div>';
    });
    html += '</div>';
    return html;
}

// 无释义/空释义时的输入表单（输入释义 + 选词性 + 保存）
function buildWordFormHtml() {
    return ''
        + '<div class="wc-no-meaning" style="margin-top:0.5rem;font-size:0.95rem;color:var(--gray);">暂无释义，添加一个：</div>'
        + '<div style="margin-top:0.55rem;display:flex;flex-direction:column;gap:0.5rem;">'
        +   '<input class="wc-input" type="text" placeholder="输入释义，如：预订" style="width:100%;box-sizing:border-box;padding:0.55rem 0.7rem;border:1px solid var(--border);border-radius:0.6rem;font-size:0.95rem;outline:none;" />'
        +   '<div style="display:flex;gap:0.5rem;">'
        +     '<select class="wc-pos-select" style="flex:1;padding:0.55rem 0.5rem;border:1px solid var(--border);border-radius:0.6rem;font-size:0.9rem;background:#fff;cursor:pointer;">'
        +       '<option value="n.">n. 名词</option>'
        +       '<option value="v.">v. 动词</option>'
        +       '<option value="adj.">adj. 形容词</option>'
        +       '<option value="adv.">adv. 副词</option>'
        +       '<option value="其他">其他</option>'
        +     '</select>'
        +     '<button class="wc-save-btn" type="button" style="flex:none;padding:0.55rem 0.9rem;border:none;border-radius:0.6rem;background:var(--primary);color:#fff;font-weight:600;cursor:pointer;font-size:0.9rem;">保存</button>'
        +   '</div>'
        + '</div>';
}

// 释义数组拼成收藏用的单行文本
function definitionsToText(definitions) {
    if (!definitions || definitions.length === 0) return '';
    return definitions.map(function(d) {
        return d.definition + (d.part_of_speech ? ' (' + d.part_of_speech + ')' : '');
    }).join('；');
}

// 查询某单词的释义（带语境 context，后端 RAG 三层检索）；返回 {definitions, source}
function fetchWordDefinitions(word, context) {
    let url = '/api/words/' + encodeURIComponent(word);
    if (context) url += '?context=' + encodeURIComponent(context);
    return apiGet(url)
        .then(function(data) {
            return {
                definitions: (data && data.definitions) ? data.definitions : [],
                source: (data && data.source) ? data.source : 'cache'
            };
        })
        .catch(function() { return { definitions: [], source: 'cache' }; });
}

// 打开单词卡片：优先 RAG 检索；接口无结果时回退用当前文章的缓存释义
function openWordCard(word, sentence, selectedText, x, y) {
    fetchWordDefinitions(word, sentence).then(function(result) {
        let definitions = result.definitions || [];
        let source = result.source || 'cache';
        if (definitions.length === 0 && currentArticle && currentArticle.words) {
            const local = currentArticle.words[word] || currentArticle.words[word.toLowerCase()];
            if (local) {
                definitions = [{ definition: local, part_of_speech: null }];
                source = 'cache';
            }
        }
        showWordCard({ word: word, sentence: sentence, selectedText: selectedText, definitions: definitions, source: source }, x, y);
    });
}

// 绑定「自行输入释义」表单的保存逻辑：写入 word_cache 后刷新卡片
function wireMeaningSave(card, word, sentence, selectedText, x, y) {
    const saveBtn = card.querySelector('.wc-save-btn');
    if (!saveBtn) return;
    saveBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const input = card.querySelector('.wc-input');
        const select = card.querySelector('.wc-pos-select');
        const definition = (input && input.value || '').trim();
        if (!definition) { toast('请先输入释义'); return; }
        const part_of_speech = select ? select.value : '其他';
        saveBtn.disabled = true;
        apiPost('/api/words', { word: word, definition: definition, part_of_speech: part_of_speech, context: sentence })
            .then(function() {
                toast('释义已保存');
                fetchWordDefinitions(word, sentence).then(function(result) {
                    if (result.definitions.length > 0) {
                        showWordCard({ word: word, sentence: sentence, selectedText: selectedText, definitions: result.definitions, source: result.source }, x, y);
                    } else {
                        hideWordCard();
                    }
                });
            })
            .catch(function() {
                toast('保存失败，请重试');
                saveBtn.disabled = false;
            });
    });
}

function showWordCard(wordData, x, y) {
    hideWordCard();
    const { word, sentence, selectedText } = wordData;
    // 兼容旧调用（传 meaning 字符串）与新的多释义调用（传 definitions 数组）
    let definitions = wordData.definitions;
    if (!Array.isArray(definitions)) {
        const m = wordData.meaning;
        definitions = (m && m !== '暂无释义') ? [{ definition: m, part_of_speech: null }] : [];
    }
    
    const card = document.createElement('div');
    card.className = 'word-card';
    
    const articleId = currentArticle ? currentArticle.id : null;
    
    // 获取规范化的句子（和收藏时存储的格式一致）
    const { cleanSentence } = getWordPositionIndices(sentence);
    const normalizedSentence = cleanSentence || sentence;
    
    // 用 word + articleId + sentence 三者组合判断是否已收藏
    const isAlreadyCollected = isWordCollectedInThisSentence(word, articleId, normalizedSentence);
    
    // 顶部：大字号单词 + 发音按钮
    const wordRow = `
        <div class="wc-word-row">
            <span class="wc-word">${word}</span>
            <button class="wc-speak-btn" title="播放发音" type="button">🔊</button>
        </div>`;
    const contentHtml = definitions.length > 0
        ? buildDefinitionsHtml(definitions)
        : '<div class="wc-no-meaning" style="margin-top:0.5rem;font-size:0.95rem;color:var(--gray);">暂无释义</div>';
    // 释义来源标注（RAG 三层）
    const sourceLabels = { context: '语境释义', ai: 'AI 生成', none: '' };
    const sourceLabel = (wordData.source && sourceLabels[wordData.source] !== undefined)
        ? sourceLabels[wordData.source]
        : '通用释义';
    const sourceHtml = sourceLabel
        ? `<div class="wc-source" style="display:inline-block;margin-top:0.35rem;padding:0.15rem 0.55rem;border-radius:0.8rem;font-size:0.72rem;background:#EAF4E0;color:var(--green);">${sourceLabel}</div>`
        : '';
    const sentenceHtml = `<div class="wc-sentence">"${sentence}"</div>`;
    // 统一的「自行输入释义」入口：无论有无释义都提供，点开才注入表单
    const addMeaningHtml = `
        <button class="wc-btn wc-btn-add-meaning" type="button" style="width:100%;margin-top:0.5rem;padding:0.5rem;border:1px dashed var(--primary);border-radius:0.6rem;background:transparent;color:var(--primary);font-weight:600;cursor:pointer;font-size:0.9rem;">✎ 自行输入释义</button>
        <div class="wc-meaning-form"></div>`;
    
    if (isAlreadyCollected) {
        // 情况B：已收藏 - 简化版卡片
        card.classList.add('collected');
        card.innerHTML = `
            <button class="card-close-btn" title="关闭">✕</button>
            ${wordRow}
            ${sourceHtml}
            ${contentHtml}
            ${addMeaningHtml}
            ${sentenceHtml}
            <div class="wc-actions">
                <button class="wc-btn wc-btn-highlight" type="button">✎ 标记</button>
            </div>
            <div class="wc-footer" style="color:var(--green);">✅ 本句中已收藏</div>
        `;
    } else {
        // 情况A：未收藏 - 完整卡片（拖拽改由文章中的 word-span 触发，这里只展示释义+按钮）
        card.innerHTML = `
            <button class="card-close-btn" title="关闭">✕</button>
            ${wordRow}
            ${sourceHtml}
            ${contentHtml}
            ${addMeaningHtml}
            ${sentenceHtml}
            <div class="wc-actions">
                <button class="wc-btn wc-btn-highlight" type="button">✎ 标记</button>
                <button class="wc-btn wc-btn-collect" type="button">✨ 收藏</button>
            </div>
            <div class="wc-footer" style="color:var(--gray);">也可直接把单词拖到右侧收集区</div>
        `;
    }

    // 关闭按钮
    card.querySelector('.card-close-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        hideWordCard();
    });

    // 发音按钮
    card.querySelector('.wc-speak-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        speakText(word);
    });

    // 标记按钮
    card.querySelector('.wc-btn-highlight').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleHighlight(selectedText || word);
    });

    // 收藏按钮（仅在未收藏时存在）
    const collectBtn = card.querySelector('.wc-btn-collect');
    if (collectBtn) {
        const collectMeaning = definitionsToText(definitions);
        collectBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            doCollectWord({ word: word, meaning: collectMeaning, sentence: normalizedSentence }).then(function() {
                markCollectedSpans();
            });
            hideWordCard();
        });
    }

    // 统一的「自行输入释义」按钮：点开后注入表单并绑定保存
    const addMeaningBtn = card.querySelector('.wc-btn-add-meaning');
    if (addMeaningBtn) {
        addMeaningBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const formContainer = card.querySelector('.wc-meaning-form');
            if (formContainer && !formContainer.querySelector('.wc-input')) {
                formContainer.innerHTML = buildWordFormHtml();
                wireMeaningSave(card, word, sentence, selectedText, x, y);
            }
        });
    }
    
    document.body.appendChild(card);
    
    // 初始定位
    card.style.left = `${x}px`;
    card.style.top = `${y - card.offsetHeight - 10}px`;
    
    if (card.offsetLeft + card.offsetWidth > window.innerWidth) {
        card.style.left = `${window.innerWidth - card.offsetWidth - 10}px`;
    }
    if (card.offsetTop < 50) {
        card.style.top = `${y + 10}px`;
    }
    
    currentWordCard = card;
    document.addEventListener('click', closeWordCardHandler);
    
    // 已收藏卡片不需要拖拽；未收藏卡片的拖拽由文章中的 word-span 直接承担，卡片本身不可拖
}

// ==================== 引导气泡 ====================

function showDragGuideIfNeeded() {
    const hasDropped = localStorage.getItem('hasDroppedWord') === 'true';
    if (hasDropped) return;
    
    // 检查是否在阅读页
    const readingActive = document.getElementById('readingPage').classList.contains('active');
    if (!readingActive) return;
    
    // 延迟显示，确保 DOM 已渲染
    setTimeout(function() {
        const existingGuide = document.querySelector('.drag-guide-bubble');
        if (existingGuide) existingGuide.remove();
        
        const zone = document.getElementById('collectZone');
        if (!zone) return;
        const zoneRect = zone.getBoundingClientRect();
        
        const guide = document.createElement('div');
        guide.className = 'drag-guide-bubble';
        guide.innerHTML = `
            <button class="guide-close" title="知道了">✕</button>
            💡 按住文章中的单词，拖到右侧收集区即可收藏（也可点单词后点「收藏」按钮）
            <div class="guide-arrow"></div>
        `;
        
        document.body.appendChild(guide);
        
        const guideWidth = guide.offsetWidth;
        const guideHeight = guide.offsetHeight;
        
        // 放在收集区左侧，指向收集区
        let guideX = zoneRect.left - guideWidth - 20;
        let guideY = zoneRect.top + zoneRect.height / 2 - guideHeight / 2;
        
        // 如果空间不够，放在收集区上方
        if (guideX < 10) {
            guideX = zoneRect.left;
            guideY = zoneRect.top - guideHeight - 16;
        }
        
        // 边界检查
        if (guideY < 10) guideY = 10;
        if (guideY + guideHeight > window.innerHeight - 10) {
            guideY = window.innerHeight - guideHeight - 10;
        }
        
        guide.style.left = `${guideX}px`;
        guide.style.top = `${guideY}px`;
        
        // 关闭按钮（仅关闭气泡，不设 hasDroppedWord）
        guide.querySelector('.guide-close').addEventListener('click', function(e) {
            e.stopPropagation();
            guide.remove();
        });
    }, 500);
}

function hideDragGuide() {
    const guide = document.querySelector('.drag-guide-bubble');
    if (guide) guide.remove();
}

// ==================== 拖拽逻辑 ====================

function startDrag(e, card) {
    isDragging = true;
    currentWordCard = card;
    
    const rect = card.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    
    card.classList.add('dragging');
    card.style.position = 'fixed';
    card.style.left = `${rect.left}px`;
    card.style.top = `${rect.top}px`;
    card.style.transform = 'scale(1.08)';
    card.style.margin = '0';
    
    document.removeEventListener('click', closeWordCardHandler);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
}

function onDragMove(e) {
    if (!isDragging || !currentWordCard) return;
    
    const x = e.clientX - dragOffsetX;
    const y = e.clientY - dragOffsetY;
    
    currentWordCard.style.left = `${x}px`;
    currentWordCard.style.top = `${y}px`;
    currentWordCard.style.transform = 'scale(1.08)';
    
    checkCollectZoneHover(e.clientX, e.clientY);
}

function onTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    onDragMove({ clientX: touch.clientX, clientY: touch.clientY });
}

function checkCollectZoneHover(clientX, clientY) {
    const zone = document.getElementById('collectZone');
    if (!zone) return;
    
    const rect = zone.getBoundingClientRect();
    const isOver = clientX >= rect.left - 20 &&  // 增加一些容错
                  clientX <= rect.right + 20 &&
                  clientY >= rect.top - 20 &&
                  clientY <= rect.bottom + 20;
    
    if (isOver) {
        zone.classList.add('active');
    } else {
        zone.classList.remove('active');
    }
    return isOver;
}

function onDragEnd(e) {
    if (!isDragging || !currentWordCard) {
        cleanupDrag();
        return;
    }
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    const isOverZone = checkCollectZoneHover(clientX, clientY);
    
    if (isOverZone && currentDragData) {
        // 成功收藏：飞入动画
        flyToCollectZone(currentWordCard, currentDragData);
    } else {
        // 未到收集区：淡出消失，不收藏
        currentWordCard.classList.add('cancelling');
        setTimeout(() => {
            hideWordCard();
        }, 200);
    }
    
    const zone = document.getElementById('collectZone');
    if (zone) zone.classList.remove('active');
    cleanupDrag();
}

function onTouchEnd(e) {
    if (!isDragging) return;
    const touch = e.changedTouches[0];
    onDragEnd({ clientX: touch.clientX, clientY: touch.clientY });
}

function cleanupDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
}

function flyToCollectZone(card, dragData) {
    const zone = document.getElementById('collectZone');
    if (!zone) {
        doCollectWord(dragData);
        hideWordCard();
        return;
    }
    
    // 计算收集区中心位置
    const zoneRect = zone.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    const targetX = zoneRect.left + zoneRect.width / 2 - cardRect.width / 2;
    const targetY = zoneRect.top + zoneRect.height / 2 - cardRect.height / 2;
    
    // 设置飞入动画起点位置
    card.style.transition = 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), top 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s, opacity 0.35s';
    card.style.left = `${targetX}px`;
    card.style.top = `${targetY}px`;
    card.classList.add('flying');
    
    setTimeout(() => {
        doCollectWord(dragData);
        // 收集区微动画
        zone.animate([
            { transform: 'translateY(-50%) scale(1)' },
            { transform: 'translateY(-50%) scale(1.15)' },
            { transform: 'translateY(-50%) scale(1)' }
        ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
        
        hideWordCard();
        updateCollectBadge();
    }, 350);
}

// 执行实际收藏操作（包含paragraphIndex, sentenceIndex）
async function doCollectWord(dragData) {
    const { word, meaning, sentence } = dragData;

    // 获取段落和句子索引
    const { paragraphIndex, sentenceIndex, cleanSentence } = getWordPositionIndices(sentence);

    const finalSentence = cleanSentence || sentence;
    const articleId = currentArticle ? currentArticle.id : null;

    // 本地快速判断（基于 user_id + word + article_id + sentence 四字段）
    if (isWordCollectedInThisSentence(word, articleId, finalSentence)) {
        toast('本句中已收藏过这个词！');
        return;
    }

    // collectedWords 全局字符串数组（兼容旧逻辑）
    if (!collectedWords.includes(word)) {
        collectedWords.push(word);
    }

    // 调后端接口持久化到 user_words 表
    try {
        const result = await apiPost('/api/collect-word', {
            word: word,
            meaning: meaning,
            sentence: finalSentence,
            articleId: articleId,
            paragraphIndex: paragraphIndex,
            sentenceIndex: sentenceIndex
        });

        if (result.success) {
            userData.collectedWords.push({
                id: result.id,                   // 用后端返回的数据库 id
                word: word,
                meaning: meaning,
                sentence: finalSentence,
                paragraphIndex: paragraphIndex,
                sentenceIndex: sentenceIndex,
                article: currentArticle ? currentArticle.title : '未知文章',
                articleId: articleId,
                level: currentArticle ? currentArticle.level : null,
                status: 'pending',
                knowledge: 0,
                collectedAt: new Date().toISOString()
            });
            saveData();
            updateProgress();
            updateCollectBadge();
            localStorage.setItem('hasDroppedWord', 'true');
            hideDragGuide();
            toast('收藏成功！待分类 +1');
        } else {
            // 后端返回失败：如果是重复收藏，同步到本地（数据库已有记录，本地不应丢失状态）
            if (result.reason === 'duplicate' && !isWordCollectedInThisSentence(word, articleId, finalSentence)) {
                userData.collectedWords.push({
                    id: result.id || Date.now(),
                    word: word,
                    meaning: meaning,
                    sentence: finalSentence,
                    paragraphIndex: paragraphIndex,
                    sentenceIndex: sentenceIndex,
                    article: currentArticle ? currentArticle.title : '未知文章',
                    articleId: articleId,
                    level: currentArticle ? currentArticle.level : null,
                    status: 'pending',
                    knowledge: 0,
                    collectedAt: new Date().toISOString()
                });
                saveData();
                updateProgress();
                updateCollectBadge();
            }
            toast(result.message || '本句中已收藏过这个词');
        }
    } catch (e) {
        // 后端失败，降级本地存储（离线模式）
        console.warn('⚠️ 收藏接口失败，降级本地存储:', e.message);
        userData.collectedWords.push({
            id: Date.now(),
            word: word,
            meaning: meaning,
            sentence: finalSentence,
            paragraphIndex: paragraphIndex,
            sentenceIndex: sentenceIndex,
            article: currentArticle ? currentArticle.title : '未知文章',
            articleId: articleId,
            level: currentArticle ? currentArticle.level : null,
            status: 'pending',
            knowledge: 0,
            collectedAt: new Date().toISOString()
        });
        saveData();
        updateProgress();
        updateCollectBadge();
        localStorage.setItem('hasDroppedWord', 'true');
        hideDragGuide();
        toast('收藏成功（离线）！待分类 +1');
    }
}

// 获取单词所在的段落索引和句子索引
function getWordPositionIndices(targetSentence) {
    const result = {
        paragraphIndex: 0,
        sentenceIndex: 0,
        cleanSentence: targetSentence || ''
    };
    
    if (!currentArticle) return result;
    
    const paragraphs = currentArticle.article.split('\n\n');
    
    for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
        const paragraph = paragraphs[pIdx];
        // 按句子分割（. ! ?）
        const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
        
        for (let sIdx = 0; sIdx < sentences.length; sIdx++) {
            const sentence = sentences[sIdx].trim();
            const target = (targetSentence || '').trim();
            
            if (target && (
                sentence.includes(target) || 
                target.includes(sentence.substring(0, Math.min(sentence.length, 20)))
            )) {
                result.paragraphIndex = pIdx;
                result.sentenceIndex = sIdx;
                result.cleanSentence = sentence;
                return result;
            }
        }
    }
    
    // 如果没找到精确匹配，尝试在 readContent DOM 中查找
    const readContent = document.getElementById('readContent');
    if (readContent && targetSentence) {
        const pNodes = readContent.querySelectorAll('p');
        for (let pIdx = 0; pIdx < pNodes.length; pIdx++) {
            const pNode = pNodes[pIdx];
            const text = pNode.textContent || '';
            if (text.includes(targetSentence.trim())) {
                const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                for (let sIdx = 0; sIdx < sentences.length; sIdx++) {
                    if (sentences[sIdx].trim().includes(targetSentence.trim().substring(0, 15))) {
                        result.paragraphIndex = pIdx;
                        result.sentenceIndex = sIdx;
                        result.cleanSentence = sentences[sIdx].trim();
                        return result;
                    }
                }
                result.paragraphIndex = pIdx;
                result.sentenceIndex = 0;
                return result;
            }
        }
    }
    
    return result;
}

// 更新收集区小红点徽章（仅统计当前文章的待分类单词）
function updateCollectBadge() {
    const badge = document.getElementById('collectBadge');
    if (!badge) return;

    // 只统计「当前这篇文章」的待分类收藏，避免历史文章的收藏数累加
    const articleId = currentArticle ? currentArticle.id : null;
    const pendingCount = userData.collectedWords.filter(function(w) {
        return w.status === 'pending' && w.articleId === articleId;
    }).length;

    if (pendingCount > 0 && articleId) {
        badge.textContent = pendingCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function closeWordCardHandler(e) {
    if (!currentWordCard || !currentWordCard.contains(e.target)) {
        hideWordCard();
    }
}

function hideWordCard() {
    if (currentWordCard) {
        currentWordCard.remove();
        currentWordCard = null;
    }
    document.removeEventListener('click', closeWordCardHandler);
}

// ==================== 选中文本 & 高亮 ====================

function handleTextSelection(e) {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
        hideWordCard();
        return;
    }
    
    const selectedText = selection.toString().trim();
    if (!selectedText) {
        hideWordCard();
        return;
    }
    
    const words = currentArticle ? (currentArticle.words || {}) : {};
    const normalizedText = selectedText.toLowerCase().replace(/[^-a-zA-Z' ]/g, '');
    
    let meaning = words[normalizedText] || words[selectedText] || words[selectedText.toLowerCase()];
    let displayWord = selectedText;
    
    if (!meaning) {
        const wordParts = normalizedText.split(/\s+/).filter(w => w.length >= 3);
        for (const part of wordParts) {
            if (words[part]) {
                meaning = words[part];
                displayWord = part;
                break;
            }
        }
    }
    
    if (!meaning) {
        meaning = '暂无释义';
    }
    
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 10;
    
    const sentence = getSentenceFromSelection(selection);
    
    showWordCard({ word: displayWord, meaning: meaning, sentence: sentence, selectedText: selectedText }, x, y);
}

function getSentenceFromSelection(selection) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const selectedStr = selection.toString().trim();
    
    if (container.nodeType === 3) {
        const parent = container.parentElement;
        if (parent) {
            const text = parent.textContent || '';
            const sentences = text.split(/[.!?]+/);
            for (const s of sentences) {
                if (s.includes(selectedStr)) {
                    return s.trim();
                }
            }
        }
    }
    
    const root = document.getElementById('readContent');
    if (root) {
        const sentences = root.textContent.split(/[.!?]+/);
        for (const s of sentences) {
            if (s.includes(selectedStr)) {
                return s.trim();
            }
        }
    }
    
    return selectedStr.length > 50 ? selectedStr.substring(0, 50) + '...' : selectedStr;
}

function toggleHighlight(text) {
    if (!currentArticle) return;
    
    const highlights = getHighlights();
    const key = `${currentArticle.id}_${text}`;
    
    if (highlights[key]) {
        delete highlights[key];
        toast('已取消标记');
    } else {
        highlights[key] = {
            text: text,
            articleId: currentArticle.id,
            timestamp: Date.now()
        };
        toast('已标记高亮');
    }
    
    localStorage.setItem('gaHighlights', JSON.stringify(highlights));
    applyHighlights();
    hideWordCard();
}

function getHighlights() {
    try {
        const saved = localStorage.getItem('gaHighlights');
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        return {};
    }
}

function applyHighlights() {
    if (!currentArticle) return;
    
    const highlights = getHighlights();
    const readContent = document.getElementById('readContent');
    if (!readContent) return;
    
    // 先清除所有 word-span 的高亮标记
    readContent.querySelectorAll('.word-span.highlighted-text').forEach(function (el) {
        el.classList.remove('highlighted-text');
    });
    
    const articleHighlights = Object.values(highlights).filter(h => h.articleId === currentArticle.id);
    articleHighlights.forEach(function (h) {
        const key = (h.text || '').toLowerCase().trim();
        if (!key) return;
        // 精确匹配单个单词
        const matched = readContent.querySelector('.word-span[data-word="' + key.replace(/"/g, '\\"') + '"]');
        if (matched) {
            matched.classList.add('highlighted-text');
        } else {
            // 词组高亮：把高亮文本拆成单词，匹配到的连续 word-span 都标记
            const words = key.split(/\s+/).filter(Boolean);
            if (words.length > 1) {
                words.forEach(function (w) {
                    const el = readContent.querySelector('.word-span[data-word="' + w.replace(/"/g, '\\"') + '"]');
                    if (el) el.classList.add('highlighted-text');
                });
            }
        }
    });
}

// 兼容旧代码：点击收藏（现在调用拖拽收藏使用的同一逻辑）
function collectWord(word, meaning, sentence) {
    doCollectWord({ word, meaning, sentence });
    hideWordCard();
}

function updateProgress() {
    const collected = collectedWords.length;
    const totalWords = Object.keys(currentArticle.words || {}).length;
    document.getElementById('progText').textContent = `${collected}/${totalWords} words`;
    document.getElementById('progBar').style.width = `${(collected / Math.max(totalWords, 1)) * 100}%`;
}

function startQuiz() {
    quizAnswers = new Array(currentArticle.questions.length).fill(-1);
    document.getElementById('quizArticleInfo').textContent = `${currentArticle.title} · ${currentArticle.questions.length} Questions`;
    renderQuiz();
    showScreen('quizPage');
}

function backToReading() { showScreen('readingPage'); }

// 去掉 workflow 选项里自带的前缀（如 "A. xxx"、"B) xxx"），避免和前端加的前缀重复
function stripOptionPrefix(opt) {
    if (typeof opt !== 'string') return opt;
    return opt.replace(/^\s*[A-Da-d]\s*[.)、:：\-—]\s*/, '').trim();
}

function renderQuiz() {
    const answered = quizAnswers.filter(a => a !== -1).length;
    document.getElementById('quizProg').textContent = `${answered}/${currentArticle.questions.length}`;
    document.getElementById('quizProgressBar').style.width = `${(answered / currentArticle.questions.length) * 100}%`;
    document.getElementById('quizAnswered').textContent = `${answered}/${currentArticle.questions.length} answered`;
    
    document.getElementById('quizQuestions').innerHTML = currentArticle.questions.map((q, i) => `
        <div style="background:white;padding:1.2rem;border-radius:1rem;margin-bottom:1rem;">
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
                <div style="width:24px;height:24px;border-radius:50%;background:var(--primary);color:white;font-size:0.7rem;font-weight:600;display:flex;align-items:center;justify-content:center;">${i+1}</div>
                <div style="font-size:0.75rem;color:var(--gray);font-weight:600;">${q.type || 'QUESTION'}</div>
            </div>
            <p style="margin:0.5rem 0;font-size:0.95rem;">${q.question}</p>
            ${q.options.map((opt, j) => `
                <div onclick="selectAns(${i}, ${j})" style="padding:0.8rem;border:2px solid var(--border);border-radius:0.6rem;cursor:pointer;margin:0.5rem 0;display:flex;align-items:center;gap:0.75rem;">
                    <div style="width:20px;height:20px;border-radius:50%;border:2px solid ${quizAnswers[i] === j ? 'var(--primary)' : 'var(--border)'};background:${quizAnswers[i] === j ? 'var(--primary)' : 'white'};display:flex;align-items:center;justify-content:center;">
                        ${quizAnswers[i] === j ? '<span style="color:white;font-size:0.7rem;">✓</span>' : ''}
                    </div>
                    <span style="${quizAnswers[i] === j ? 'color:var(--primary);font-weight:600;' : ''}">${String.fromCharCode(65+j)}. ${stripOptionPrefix(opt)}</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function selectAns(i, j) {
    quizAnswers[i] = j;
    renderQuiz();
}

function submitQuiz() {
    const unanswered = quizAnswers.filter(a => a === -1).length;
    if (unanswered > 0) {
        toast(`Please answer all ${unanswered} remaining questions!`);
        return;
    }
    
    const correct = quizAnswers.reduce((acc, ans, idx) => acc + (ans === currentArticle.questions[idx].answer_index ? 1 : 0), 0);
    const accuracy = Math.round((correct / quizAnswers.length) * 100);
    
    const vocabRate = Math.round((collectedWords.length / Object.keys(currentArticle.words || {}).length) * 100);
    
    let level = 'A2';
    let levelLabel = 'Beginner';
    if (accuracy >= 80 && vocabRate <= 50) { level = 'C1'; levelLabel = 'Advanced'; }
    else if (accuracy >= 60 && vocabRate <= 70) { level = 'B2'; levelLabel = 'Upper Intermediate'; }
    else if (accuracy >= 40) { level = 'B1'; levelLabel = 'Intermediate'; }
    
    userData.level = level;
    saveData();
    
    document.getElementById('assLevel').textContent = level;
    document.getElementById('assLevelLabel').textContent = levelLabel;
    
    document.getElementById('vocabScore').textContent = `${vocabRate}%`;
    document.getElementById('vocabProgress').style.width = `${vocabRate}%`;
    document.getElementById('vocabComment').textContent = vocabRate > 70 ? 'You looked up several words — keep reading to expand your vocabulary!' : 'Good vocabulary knowledge!';
    
    document.getElementById('compScore').textContent = `${accuracy}%`;
    document.getElementById('compProgress').style.width = `${accuracy}%`;
    document.getElementById('compComment').textContent = accuracy >= 70 ? 'Good understanding! You grasped the main ideas well.' : 'Keep practicing to improve comprehension.';
    
    document.getElementById('assComment').textContent = `You're at the ${level} (${levelLabel}) level. You can understand the main points of clear standard texts. Keep reading and the more that you read, the more things you will know!`;
    
    document.getElementById('collectedCount').textContent = `${collectedWords.length} words collected from 1 article`;
    document.getElementById('collectedList').innerHTML = collectedWords.map(w => {
        return `<div class="word-tag">${w}</div>`;
    }).join('');
    
    renderQuizReview();
    showScreen('resultPage');
}

// 总结页：逐题展示用户答案、正确答案、解析、是否正确
function renderQuizReview() {
    const questions = currentArticle.questions || [];
    let container = document.getElementById('quizReview');
    if (!container) {
        container = document.createElement('div');
        container.id = 'quizReview';
        container.style.marginBottom = '1.5rem';
        const assComment = document.getElementById('assComment');
        assComment.parentNode.insertBefore(container, assComment.nextSibling);
    }

    container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
            <h3 style="font-size:1rem;font-weight:600;">答题回顾</h3>
        </div>
        ${questions.map(function(q, i) {
            const options = Array.isArray(q.options) ? q.options : [];
            const correctIdx = typeof q.answer_index === 'number' ? q.answer_index : -1;
            const userIdx = quizAnswers[i];
            const isCorrect = userIdx === correctIdx;

            const correctText = (correctIdx >= 0 && options[correctIdx] != null)
                ? String.fromCharCode(65 + correctIdx) + '. ' + stripOptionPrefix(options[correctIdx])
                : '—';
            const userText = (userIdx != null && userIdx >= 0 && options[userIdx] != null)
                ? String.fromCharCode(65 + userIdx) + '. ' + stripOptionPrefix(options[userIdx])
                : '未作答';
            const explanation = q.explanation ? q.explanation : '（无解析）';
            const statusColor = isCorrect ? '#6B9B37' : '#E5484D';
            const statusText = isCorrect ? '✓ 正确' : '✗ 错误';

            return `
                <div style="background:white;padding:1rem 1.1rem;border-radius:0.9rem;margin-bottom:0.75rem;border:1px solid var(--border);">
                    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.6rem;">
                        <div style="width:22px;height:22px;border-radius:50%;background:var(--primary);color:white;font-size:0.7rem;font-weight:600;display:flex;align-items:center;justify-content:center;flex:none;">${i + 1}</div>
                        <div style="font-size:0.95rem;font-weight:600;color:var(--text);">${escapeHtml(q.question)}</div>
                    </div>
                    <div style="font-size:0.9rem;line-height:1.9;color:var(--gray);">
                        <div>你的答案：<span style="color:${statusColor};font-weight:600;">${escapeHtml(userText)}</span></div>
                        <div>正确答案：<span style="color:#6B9B37;font-weight:600;">${escapeHtml(correctText)}</span></div>
                        <div style="margin-top:0.35rem;color:${statusColor};font-weight:600;">${statusText}</div>
                        <div style="margin-top:0.35rem;padding:0.5rem 0.7rem;background:var(--bg-light);border-radius:0.5rem;color:var(--text);">解析：${escapeHtml(explanation)}</div>
                    </div>
                </div>
            `;
        }).join('')}
    `;
}

function showVocabBook() {
    currentFilter = 'all';
    updateVocabFilterTabs();
    renderVocabBook();
    updateCollectBadge();
    showScreen('wordbookPage');
}

function filterVocab(filter) {
    currentFilter = filter;
    updateVocabFilterTabs();
    renderVocabBook();
}

function updateVocabFilterTabs() {
    // 兼容两种结构：新的filter-tab（id对应）和旧的vocab-filter
    const filterMap = {
        'all': 'filterAll',
        'pending': 'filterPending',
        'learning': 'filterLearning',
        'mastered': 'filterMastered',
        'review': 'filterReview'
    };
    
    Object.keys(filterMap).forEach(function(key) {
        const el = document.getElementById(filterMap[key]);
        if (el) {
            if (key === currentFilter) {
                el.classList.add('active');
                el.style.background = 'var(--primary)';
                el.style.color = 'white';
            } else {
                el.classList.remove('active');
                el.style.background = '';
                el.style.color = '';
            }
        }
    });
    
    document.querySelectorAll('.vocab-filter').forEach(function(b) {
        const text = b.textContent.trim();
        const textMap = {
            '全部': 'all',
            '待分类': 'pending',
            '待学': 'pending',
            '学习中': 'learning',
            '已掌握': 'mastered',
            '需复习': 'review'
        };
        const filter = textMap[text] || text.toLowerCase();
        if (filter === currentFilter) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}

function getStatusLabel(status) {
    const map = {
        'pending': '待分类',
        'learning': '学习中',
        'mastered': '已掌握',
        'review': '需复习'
    };
    return map[status] || status;
}

function renderVocabBook() {
    const total = userData.collectedWords.length;
    document.getElementById('vocabStats').textContent = `${total} collected words`;
    
    let filteredWords = userData.collectedWords;
    if (currentFilter !== 'all') {
        filteredWords = filteredWords.filter(w => w.status === currentFilter);
    }
    
    // 更新统计数字
    const vTotal = document.getElementById('vTotal');
    const vPending = document.getElementById('vPending');
    const vMastered = document.getElementById('vMastered');
    if (vTotal) vTotal.textContent = total;
    if (vPending) vPending.textContent = userData.collectedWords.filter(w => w.status === 'pending').length;
    if (vMastered) vMastered.textContent = userData.collectedWords.filter(w => w.status === 'mastered').length;
    
    const grouped = {};
    filteredWords.forEach(function(w) {
        if (!grouped[w.article]) grouped[w.article] = [];
        grouped[w.article].push(w);
    });
    
    if (Object.keys(grouped).length === 0) {
        let hintText = 'No words collected yet. Start reading to collect new words!';
        if (currentFilter === 'pending') hintText = '没有待分类的单词 🎉';
        if (currentFilter === 'learning') hintText = '没有学习中的单词';
        if (currentFilter === 'mastered') hintText = '还没有已掌握的单词，加油!';
        if (currentFilter === 'review') hintText = '没有需要复习的单词';
        
        // 待分类时显示"去分类"入口
        if (currentFilter === 'pending') {
            document.getElementById('vocabContent').innerHTML = `
                <div style="background:white;padding:2rem;border-radius:1rem;text-align:center;color:var(--gray);">
                    <div style="font-size:2rem;margin-bottom:0.5rem;">✨</div>
                    <div style="font-size:1rem;font-weight:600;color:var(--text);margin-bottom:0.5rem;">${hintText}</div>
                </div>`;
        } else {
            document.getElementById('vocabContent').innerHTML = `
                <div style="background:white;padding:2rem;border-radius:1rem;text-align:center;color:var(--gray);">
                    <div style="font-size:2rem;margin-bottom:0.5rem;">📚</div>
                    <div>${hintText}</div>
                </div>`;
        }
        return;
    }
    
    document.getElementById('vocabContent').innerHTML = Object.keys(grouped).map(function(article) {
        const wordsInGroup = grouped[article];
        return `
        <div style="background:white;border-radius:1rem;margin-bottom:1.5rem;overflow:hidden;">
            <div style="padding:1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <h3 style="font-size:0.95rem;font-weight:600;">${article}</h3>
                    <span class="diff-badge diff-${wordsInGroup[0]?.level || 'middle'}">${(wordsInGroup[0]?.level || 'middle').toUpperCase()}</span>
                </div>
                <span style="font-size:0.8rem;color:var(--gray);">${wordsInGroup.length} words</span>
            </div>
            ${wordsInGroup.map(function(w) {
                const isPending = w.status === 'pending';
                return `
                <div style="padding:1rem;border-bottom:1px solid var(--border);">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">
                        <div style="flex:1;">
                            <div style="font-weight:600;font-size:1rem;">${w.word}</div>
                            <div style="color:var(--primary);font-size:0.9rem;">${w.meaning}</div>
                            <div style="font-size:0.8rem;color:var(--gray);font-style:italic;margin-top:0.25rem;">"${w.sentence}"</div>
                            ${w.paragraphIndex !== undefined ? `<div style="font-size:0.7rem;color:var(--light-gray);margin-top:0.25rem;">📍 第${w.paragraphIndex + 1}段 · 第${w.sentenceIndex + 1}句</div>` : ''}
                        </div>
                        <span class="status-${w.status}" style="flex-shrink:0;margin-left:0.5rem;">${getStatusLabel(w.status)}</span>
                    </div>
                    <div style="display:flex;gap:0.5rem;margin-top:0.75rem;">
                        ${isPending ? `<button class="go-sort-btn" onclick="goSortFromWordbook('${w.id}')">📋 去分类</button>` : ''}
                        ${w.status !== 'mastered' ? `<button class="btn" onclick="markMastered(${w.id})" style="flex:1;background:#D1FAE5;color:#059669;padding:0.5rem;font-size:0.8rem;${isPending ? 'flex:0.6;' : ''}">✓ 已掌握</button>` : ''}
                        ${w.status !== 'learning' && !isPending ? `<button class="btn" onclick="markLearning(${w.id})" style="flex:1;background:#DBEAFE;color:#2563EB;padding:0.5rem;font-size:0.8rem;">📖 学习中</button>` : ''}
                        ${w.status !== 'review' && !isPending ? `<button class="btn" onclick="markNeedReview(${w.id})" style="flex:1;background:#FEE2E2;color:#DC2626;padding:0.5rem;font-size:0.8rem;">↻ 需复习</button>` : ''}
                        <button class="btn" onclick="deleteWord(${w.id})" style="flex:${isPending ? '0.6' : '1'};background:#FEE2E2;color:#DC2626;padding:0.5rem;font-size:0.8rem;">🗑 删除</button>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
        `;
    }).join('');
}

// 从单词本点击"去分类"按钮打开分类面板（按文章分组）
function goSortFromWordbook(wordId) {
    const targetWord = userData.collectedWords.find(w => w.id == wordId);
    if (!targetWord) return;
    // 以这个单词所在文章为范围打开分类面板
    openSortPanelForArticle(targetWord.articleId, targetWord.article);
}

// 通用：调用后端更新单词分类状态（user_words 表），失败降级本地
async function updateWordStatusOnServer(id, newStatus, knowledge) {
    const word = userData.collectedWords.find(w => w.id === id);
    if (!word) return false;
    try {
        await apiPut('/api/word-status/' + id, { status: newStatus, knowledge: knowledge });
        word.status = newStatus;
        word.knowledge = knowledge;
        saveData();
        return true;
    } catch (e) {
        console.warn('⚠️ 分类接口失败，降级本地:', e.message);
        word.status = newStatus;
        word.knowledge = knowledge;
        saveData();
        return false;
    }
}

async function markMastered(id) {
    const ok = await updateWordStatusOnServer(id, 'mastered', 1);
    renderVocabBook();
    updateCollectBadge();
    toast(ok ? '已掌握！知识度+100%' : '已掌握（离线）');
}

// 标记为"学习中"
async function markLearning(id) {
    const ok = await updateWordStatusOnServer(id, 'learning', 0.5);
    renderVocabBook();
    updateCollectBadge();
    toast(ok ? '加入学习中队列' : '加入学习中队列（离线）');
}

// 标记为"需复习"
async function markNeedReview(id) {
    const ok = await updateWordStatusOnServer(id, 'review', 0.2);
    renderVocabBook();
    updateCollectBadge();
    toast(ok ? '加入复习队列，记得回头看哦!' : '加入复习队列（离线）');
}

// 兼容旧函数名：旧的 markReview = 新的 markLearning
function markReview(id) {
    markLearning(id);
}

function deleteWord(id) {
    userData.collectedWords = userData.collectedWords.filter(w => w.id !== id);
    saveData();
    renderVocabBook();
    updateCollectBadge();
    toast('Word deleted!');
}

function showUploadScreen() {
    document.getElementById('uploadTitle').value = '';
    document.getElementById('uploadContent').value = '';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('articleLevelHint').textContent = '';
    document.getElementById('fileUpload').value = '';
    showScreen('uploadPage');
    
    setTimeout(() => {
        const textarea = document.getElementById('uploadContent');
        const fileInput = document.getElementById('fileUpload');
        
        if (textarea) {
            textarea.addEventListener('input', function() {
                const len = this.value.length;
                document.getElementById('charCount').textContent = len.toLocaleString();
                const hint = document.getElementById('articleLevelHint');
                if (len > 5000) {
                    hint.textContent = '⚠️ 文章较长，分析可能需要更长时间';
                    hint.style.color = '#D97706';
                } else if (len > 3000) {
                    hint.textContent = '📚 高中难度级别';
                    hint.style.color = '#DC2626';
                } else if (len > 500) {
                    hint.textContent = '📘 初中难度级别';
                    hint.style.color = '#D97706';
                } else if (len > 0) {
                    hint.textContent = '📗 入门级别';
                    hint.style.color = '#10B981';
                } else {
                    hint.textContent = '';
                }
            });
        }
        
        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        document.getElementById('uploadContent').value = evt.target.result;
                        document.getElementById('uploadContent').dispatchEvent(new Event('input'));
                        if (!document.getElementById('uploadTitle').value) {
                            document.getElementById('uploadTitle').value = file.name.replace('.txt', '');
                        }
                    };
                    reader.readAsText(file);
                }
            });
        }
    }, 100);
}

function analyzeArticle() {
    const title = document.getElementById('uploadTitle').value.trim();
    const content = document.getElementById('uploadContent').value.trim();
    
    if (!content || content.length < 50) {
        toast('请输入至少50字符的英语文章内容');
        return;
    }
    
    analysisAbortController = new AbortController();
    
    document.getElementById('loadingProgress').textContent = '10';
    document.getElementById('loadingProgressBar').style.width = '10%';
    document.getElementById('loadingMessage').textContent = '⏳ 正在翻译文章...';
    document.getElementById('loadingTitle').textContent = '⏳ 正在翻译文章...';
    
    const longHint = document.getElementById('longArticleHint');
    if (content.length > 5000) {
        longHint.style.display = 'block';
    } else {
        longHint.style.display = 'none';
    }
    
    showScreen('loadingPage');
    
    // 检查是否通过 file:// 协议打开（没有服务器）
    const isLocalFile = window.location.protocol === 'file:';
    
    if (isLocalFile) {
        // 直接打开文件，使用 mock 数据
        toast('本地模式：使用示例数据');
        setTimeout(() => {
            const mockResult = generateMockResult(title || '用户文章', content);
            openAnalyzedArticle(mockResult);
        }, 1500);
        return;
    }
    
    callAnalyzeAPI(title, content)
        .then(result => {
            if (!result) return;
            if (result.status === 'timeout') {
                // 30 秒超时：保持 loading 页，显示「使用基础题目」按钮（callAnalyzeAPI 内已显示）
                console.log('⏰ 分析超时，等待用户选择是否使用基础题目');
                return;
            }
            // completed 或 failed（failed 时 isFallback=true，会显示提示条）
            openAnalyzedArticle(result);
        })
        .catch(err => {
            console.error('分析失败:', err);
            toast('分析失败: ' + err.message);
            // 显示降级按钮，让用户选择是否使用基础题目
            const fb = document.getElementById('useFallbackBtn');
            if (fb) fb.classList.remove('hidden');
        });
}

function generateMockResult(title, content) {
    // 从文章中提取一些单词作为示例
    const words = extractWordsFromText(content);
    const mockWordList = words.slice(0, 20).map(w => ({
        word: w.word,
        meaning: w.meaning || '（示例释义）',
        isAcademic: w.isAcademic || false
    }));
    
    // 分割句子
    const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
    const mockSentenceList = sentences.slice(0, 10).map((s, i) => ({
        index: i,
        original: s,
        translation: `（示例翻译）${s.substring(0, 30)}...`
    }));
    
    // 生成示例问题
    const mockQuestions = [
        {
            type: 'MAIN_IDEA',
            question: 'What is the main idea of this passage?',
            options: [
                'The passage discusses a specific topic in detail',
                'The passage tells a personal story',
                'The passage argues for a specific point of view',
                'The passage describes a historical event'
            ],
            answer: 0
        },
        {
            type: 'DETAIL',
            question: 'According to the passage, what is mentioned?',
            options: [
                'A specific example or detail',
                'A historical date',
                'A scientific theory',
                'A famous person'
            ],
            answer: 0
        },
        {
            type: 'INFERENCE',
            question: 'What can be inferred from the passage?',
            options: [
                'The author holds a specific viewpoint',
                'The event happened in a specific year',
                'The technology was invented by someone',
                'The location is in Europe'
            ],
            answer: 0
        },
        {
            type: 'VOCABULARY',
            question: 'What does the underlined word mean?',
            options: [
                'A specific meaning in context',
                'A literal translation',
                'A technical term',
                'A colloquial expression'
            ],
            answer: 0
        }
    ];
    
    return {
        id: 'mock_' + Date.now(),
        title: title,
        content: content,
        wordList: mockWordList,
        sentenceList: mockSentenceList,
        questions: mockQuestions,
        level: 'A2',
        levelLabel: '初中水平',
        fromCache: false
    };
}

function extractWordsFromText(text) {
    const wordRegex = /[A-Za-z]+(?:-[A-Za-z]+)*/g;
    const matches = text.match(wordRegex) || [];
    const uniqueWords = [...new Set(matches.map(w => w.toLowerCase()))];
    
    // 常用词释义（简化版）
    const commonMeanings = {
        'the': '这个', 'a': '一个', 'an': '一个', 'is': '是', 'are': '是',
        'was': '是', 'were': '是', 'be': '是', 'been': '是', 'being': '是',
        'have': '有', 'has': '有', 'had': '有', 'do': '做', 'does': '做',
        'did': '做', 'will': '将', 'would': '将', 'could': '能', 'should': '应该',
        'may': '可能', 'might': '可能', 'must': '必须', 'shall': '将',
        'can': '能', 'need': '需要', 'dare': '敢', 'ought': '应该',
        'used': '使用', 'to': '到', 'of': '的', 'in': '在', 'for': '为了',
        'on': '在...上', 'with': '和', 'at': '在', 'by': '被', 'from': '从',
        'as': '作为', 'into': '进入', 'through': '通过', 'during': '在...期间',
        'before': '之前', 'after': '之后', 'above': '之上', 'below': '之下',
        'between': '之间', 'out': '外面', 'off': '离开', 'over': '超过',
        'under': '之下', 'again': '再次', 'further': '进一步', 'then': '然后',
        'once': '曾经', 'here': '这里', 'there': '那里', 'when': '当',
        'where': '哪里', 'why': '为什么', 'how': '如何', 'all': '所有',
        'both': '两者', 'each': '每个', 'few': '少量', 'more': '更多',
        'most': '最多', 'other': '其他', 'some': '一些', 'such': '这样的',
        'no': '不', 'nor': '也不', 'not': '不', 'only': '只有', 'own': '自己的',
        'same': '相同的', 'so': '所以', 'than': '比', 'too': '也',
        'very': '非常', 'just': '只是', 'because': '因为', 'but': '但是',
        'and': '和', 'or': '或', 'if': '如果', 'while': '当', 'although': '虽然',
        'though': '虽然', 'that': '那个', 'which': '哪个', 'who': '谁',
        'whom': '谁', 'this': '这个', 'these': '这些', 'those': '那些',
        'i': '我', 'you': '你', 'he': '他', 'she': '她', 'it': '它',
        'we': '我们', 'they': '他们', 'me': '我', 'him': '他', 'her': '她',
        'us': '我们', 'them': '他们', 'my': '我的', 'your': '你的',
        'his': '他的', 'its': '它的', 'our': '我们的', 'their': '他们的',
        'what': '什么', 'which': '哪个', 'who': '谁', 'whom': '谁',
        'am': '是', 'been': '是', 'being': '是'
    };
    
    return uniqueWords.map(word => ({
        word: word,
        meaning: commonMeanings[word] || null,
        isAcademic: word.length > 6
    })).filter(w => w.meaning); // 只返回有释义的词
}

function callAnalyzeAPI(title, content) {
    return new Promise(async (resolve, reject) => {
        try {
            const progressEl = document.getElementById('loadingProgress');
            const msgEl = document.getElementById('loadingMessage');
            const barEl = document.getElementById('loadingProgressBar');
            const fallbackBtn = document.getElementById('useFallbackBtn');

            // 新一轮分析：隐藏降级按钮
            if (fallbackBtn) fallbackBtn.classList.add('hidden');

            // 1. 异步上传（立即返回 pending，不等 AI 完成）
            if (msgEl) msgEl.textContent = '⏳ 正在翻译文章...';
            if (barEl) barEl.style.width = '20%';
            if (progressEl) progressEl.textContent = '20';

            const uploadRes = await apiPost('/api/upload-article', { content, title });
            if (!uploadRes.success) throw new Error(uploadRes.error || '上传失败');

            const articleId = uploadRes.articleId;
            if (msgEl) msgEl.textContent = '⏳ 正在翻译文章...';
            if (barEl) barEl.style.width = '40%';
            if (progressEl) progressEl.textContent = '40';

            // 2. 轮询文章状态（每 2 秒；30 秒后提示可用基础题目，最长等 120 秒对齐后端 Coze 超时）
            const pollInterval = 2000;
            let elapsed = 0;
            const hintWait = 30000;   // 30 秒后显示「使用基础题目」按钮（继续轮询，不放弃）
            const maxWait = 120000;   // 120 秒后仍未完成才停止轮询
            const pollToken = ++analyzePollToken;
            window._timeoutArticleId = null;  // 新一轮分析：清空上一轮的降级入口状态

            const poll = async () => {
                // 用户已手动降级/取消：让本轮轮询失效
                if (pollToken !== analyzePollToken) return;
                try {
                    const status = await apiGet('/api/article-status/' + articleId);
                    if (pollToken !== analyzePollToken) return;

                    if (status.status === 'completed') {
                        if (barEl) barEl.style.width = '100%';
                        if (progressEl) progressEl.textContent = '100';
                        if (msgEl) msgEl.textContent = '分析完成！';
                        if (fallbackBtn) fallbackBtn.classList.add('hidden');
                        resolve({
                            status: 'completed',
                            title: status.title,
                            description: status.title,
                            level: status.level,
                            levelLabel: status.levelLabel,
                            article: status.content,
                            words: status.words,
                            sentences: status.sentences || [],
                            questions: status.questions || [],
                            articleId: articleId,
                            isFallback: false
                        });
                        return;
                    }

                    if (status.status === 'failed') {
                        // AI 失败，立即降级到基础模式（保证用户有题可做）
                        if (msgEl) msgEl.textContent = 'AI 服务暂时不可用，已切换到基础模式';
                        if (fallbackBtn) fallbackBtn.classList.add('hidden');
                        resolve({
                            status: 'failed',
                            title: status.title,
                            description: status.title,
                            level: status.level,
                            levelLabel: status.levelLabel,
                            article: status.content,
                            words: status.words,
                            sentences: status.sentences || [],
                            questions: status.questions || [],
                            articleId: articleId,
                            isFallback: true
                        });
                        return;
                    }

                    // processing，继续等
                    elapsed += pollInterval;

                    // 30 秒后给出「使用基础题目」入口，但继续轮询（后端可能仍在处理）
                    if (elapsed >= hintWait && !window._timeoutArticleId) {
                        window._timeoutArticleId = articleId;
                        if (fallbackBtn) fallbackBtn.classList.remove('hidden');
                    }

                    // 120 秒仍未完成：停止轮询，停在加载页让用户手动选择
                    if (elapsed >= maxWait) {
                        if (msgEl) msgEl.textContent = '处理时间较长，可使用基础题目或稍后重试';
                        if (barEl) barEl.style.width = '90%';
                        if (progressEl) progressEl.textContent = '90';
                        if (fallbackBtn) fallbackBtn.classList.remove('hidden');
                        resolve({
                            status: 'timeout',
                            articleId: articleId,
                            title: title,
                            content: content
                        });
                        return;
                    }

                    const pct = Math.min(90, 40 + Math.floor(elapsed / 1000));
                    if (barEl) barEl.style.width = pct + '%';
                    if (progressEl) progressEl.textContent = String(pct);
                    if (msgEl && elapsed < hintWait) {
                        msgEl.textContent = (status.queueStatus === 'retrying')
                            ? 'AI 分析失败，正在重试...'
                            : '⏳ 正在翻译文章...';
                    }
                    setTimeout(poll, pollInterval);
                } catch (e) {
                    reject(e);
                }
            };

            setTimeout(poll, pollInterval);
        } catch (e) {
            reject(e);
        }
    });
}

// 用户点击「使用基础题目」按钮（30 秒超时后显示）
async function useFallbackNow() {
    const articleId = window._timeoutArticleId;
    if (!articleId) {
        toast('无法获取文章信息，请取消后重试');
        return;
    }
    analyzePollToken++;  // 用户手动降级：终止后台轮询，避免完成后二次渲染
    const btn = document.getElementById('useFallbackBtn');
    if (btn) { btn.textContent = '正在生成基础题目...'; btn.disabled = true; }
    try {
        const data = await apiPost('/api/article-fallback/' + articleId, {});
        openAnalyzedArticle({
            status: 'failed',
            title: data.title,
            description: data.title,
            level: data.level,
            levelLabel: data.levelLabel,
            article: data.content,
            words: data.words,
            sentences: data.sentences || [],
            questions: data.questions || [],
            articleId: data.articleId,
            isFallback: true
        });
    } catch (e) {
        toast('降级题目生成失败：' + e.message);
        if (btn) { btn.textContent = '⚠️ 处理时间较长，使用基础题目'; btn.disabled = false; }
    }
}

function cancelAnalysis() {
    analyzePollToken++;  // 取消进行中的轮询
    analysisAbortController = null;
    toast('已取消分析');
    showScreen('uploadPage');
}

function openAnalyzedArticle(articleData) {
    const newArticle = {
        id: articleData.articleId || ('custom_' + Date.now()),
        title: articleData.title || '用户上传文章',
        description: articleData.description || '用户上传的自定义文章',
        level: articleData.level || 'middle',
        levelLabel: articleData.levelLabel || '自定义',
        article: articleData.article || '',
        words: articleData.words || articleData.wordList || {},
        sentences: articleData.sentences || articleData.sentenceList || [],
        questions: articleData.questions || []
    };
    
    const existingIndex = ARTICLES.findIndex(a => a.title === newArticle.title);
    if (existingIndex >= 0) {
        ARTICLES.splice(existingIndex, 1);
    }
    ARTICLES.unshift(newArticle);
    
    currentArticle = newArticle;
    collectedWords = [];
    isTranslationsVisible = false;
    
    const articlesList = document.getElementById('articlesList');
    if (articlesList) {
        renderMain();
    }
    
    document.getElementById('articleSelector').innerHTML = ARTICLES.slice(0, 8).map(a => `
        <div onclick="openArticle('${a.id}')" style="flex-shrink:0;background:white;padding:0.8rem 1rem;border-radius:0.75rem;cursor:pointer;border:2px solid ${a.id === currentArticle.id ? 'var(--primary)' : 'transparent'};">
            <div style="font-size:0.7rem;color:var(--gray);margin-bottom:0.25rem;">${a.levelLabel}</div>
            <div style="font-size:0.85rem;font-weight:600;">${a.title.length > 15 ? a.title.substring(0, 15) + '...' : a.title}</div>
        </div>
    `).join('');
    
    document.getElementById('readTitle').textContent = currentArticle.title;
    document.getElementById('readDesc').textContent = currentArticle.description || '';
    document.getElementById('readDiff').textContent = currentArticle.level.toUpperCase();
    document.getElementById('readDiff').className = `diff-badge diff-${currentArticle.level}`;

    // AI 降级题目提示条（isFallback=true 时显示）
    const fallbackNotice = document.getElementById('fallbackNotice');
    if (fallbackNotice) {
        if (articleData.isFallback) {
            fallbackNotice.classList.remove('hidden');
        } else {
            fallbackNotice.classList.add('hidden');
        }
    }

    renderArticleWithTranslations();
    bindWordSpanEventsOnce();
    showDragGuideIfNeeded();
    updateProgress();
    
    const transBtn = document.getElementById('toggleTransBtn');
    if (transBtn) {
        transBtn.style.display = 'none';
    }
    
    // 题目区：模拟「翻译完成后，题目在后台独立生成」
    fallbackQuizActive = false;
    prepareQuizArea();
    updateCollectBadge();

    showScreen('readingPage');
}

// ==================== 降级题目：通用阅读理解题（划选作答） ====================
let fallbackQuizActive = false;      // 降级划选答题模式（true 时禁用单词拖拽，让位原生文字选区）
let fallbackAnswers = [];            // [{ text, submitted }]
let activeFallbackQuestion = 0;      // 当前正在作答的题号
let quizRevealTimer = null;          // 题目区「后台生成」的展示计时器

function hideQuizExtras() {
    const qBox = document.getElementById('quizLoadingBox');
    if (qBox) qBox.style.display = 'none';
    const fArea = document.getElementById('fallbackQuizArea');
    if (fArea) { fArea.style.display = 'none'; fArea.innerHTML = ''; }
}

// 前端本地降级题目生成器（兜底：题目为空时也能出 3 道题）
function makeLocalFallbackQuestions(content) {
    const subject = (function() {
        if (!content) return '';
        const stop = ['the','and','that','with','this','from','they','have','there','their','which','about','would','should','could','because','through','between','during','before','after','above','below','again','further','those','other','people','world','important','different'];
        const words = content.match(/[A-Za-z]{5,}/g) || [];
        const freq = {};
        words.forEach(function(w) { const k = w.toLowerCase(); freq[k] = (freq[k] || 0) + 1; });
        return Object.keys(freq).filter(function(k) { return stop.indexOf(k) === -1; }).sort(function(a, b) { return freq[b] - freq[a]; })[0] || '';
    })();
    return [
        { type: 'main-idea', question: '请用文章中的一句话概括全文主旨', options: [], answer_index: -1, explanation: '', isFallback: true, answerMode: 'selection' },
        { type: 'detail', question: '请找出文章中描述' + (subject ? '「' + subject + '」' : '核心内容') + '的句子', options: [], answer_index: -1, explanation: '', isFallback: true, answerMode: 'selection' },
        { type: 'inference', question: '请划出最能体现作者观点或态度的句子', options: [], answer_index: -1, explanation: '', isFallback: true, answerMode: 'selection' }
    ];
}

// 题目区占位 → 模拟后台独立生成 → 展示
function prepareQuizArea() {
    const qBox = document.getElementById('quizLoadingBox');
    const fArea = document.getElementById('fallbackQuizArea');
    const quizBtn = document.getElementById('startQuizBtn');
    if (fArea) { fArea.style.display = 'none'; fArea.innerHTML = ''; }
    if (quizBtn) quizBtn.style.display = 'none';
    fallbackQuizActive = false;

    if (qBox) {
        qBox.style.display = 'block';
        qBox.innerHTML = '📝 正在生成阅读理解题，请稍候...';
    }

    if (quizRevealTimer) clearTimeout(quizRevealTimer);
    quizRevealTimer = setTimeout(revealQuiz, 1500);
}

function revealQuiz() {
    const qBox = document.getElementById('quizLoadingBox');
    const quizBtn = document.getElementById('startQuizBtn');

    let questions = (currentArticle && currentArticle.questions) || [];
    if (!questions || questions.length === 0) {
        questions = makeLocalFallbackQuestions(currentArticle ? currentArticle.article : '');
        if (currentArticle) currentArticle.questions = questions;
    }
    const isFallback = questions.some(function(q) { return q && (q.answerMode === 'selection' || q.isFallback === true); });

    if (isFallback) {
        // 降级：内联显示划选答题
        fallbackQuizActive = true;
        if (qBox) qBox.style.display = 'none';
        if (quizBtn) quizBtn.style.display = 'none';
        renderFallbackQuiz(questions);
    } else {
        // 正常 AI 选择题：显示「开始测试」按钮
        fallbackQuizActive = false;
        if (qBox) {
            qBox.style.display = 'none';
            if (quizBtn) {
                quizBtn.style.display = 'block';
                quizBtn.textContent = `开始测试 (${questions.length}题) →`;
            }
        }
    }
}

async function retryQuiz() {
    const qBox = document.getElementById('quizLoadingBox');
    if (qBox) { qBox.style.display = 'block'; qBox.innerHTML = '📝 正在重新生成题目，请稍候...'; }
    const id = (currentArticle && currentArticle.id) || window._timeoutArticleId;
    if (!id) {
        currentArticle.questions = makeLocalFallbackQuestions(currentArticle ? currentArticle.article : '');
        revealQuiz();
        return;
    }
    try {
        const data = await apiPost('/api/article-fallback/' + id, {});
        currentArticle.questions = (data && data.questions && data.questions.length)
            ? data.questions
            : makeLocalFallbackQuestions(currentArticle ? currentArticle.article : '');
        revealQuiz();
    } catch (e) {
        currentArticle.questions = makeLocalFallbackQuestions(currentArticle ? currentArticle.article : '');
        revealQuiz();
    }
}

function renderFallbackQuiz(questions) {
    const area = document.getElementById('fallbackQuizArea');
    if (!area) return;

    fallbackAnswers = (questions || []).map(function() { return { text: null, submitted: false }; });
    activeFallbackQuestion = 0;

    area.style.display = 'block';
    renderFallbackQuizCards();
}

function renderFallbackQuizCards() {
    const area = document.getElementById('fallbackQuizArea');
    if (!area || !currentArticle) return;
    const questions = currentArticle.questions || [];

    area.innerHTML = `
        <div style="margin-bottom:0.75rem;font-size:0.85rem;color:var(--gray);line-height:1.5;">
            💡 请在左侧文章中用鼠标<b>划选句子</b>作为答案，选中文字会高亮为黄色，再点击「提交答案」。
        </div>
        ${questions.map(function(q, i) {
            const f = fallbackAnswers[i] || {};
            const submitted = !!f.submitted;
            const hasText = !!f.text;
            const badge = q.type === 'main-idea' ? '主旨题' : (q.type === 'detail' ? '细节题' : '推理题');
            const isActive = (i === activeFallbackQuestion && !submitted);
            return `
                <div class="fallback-q-card" data-q="${i}" style="background:white;padding:1.1rem;border-radius:1rem;margin-bottom:0.9rem;border:2px solid ${isActive ? 'var(--primary)' : 'var(--border)'};transition:border-color 0.2s;">
                    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                        <span style="background:var(--primary);color:white;font-size:0.7rem;font-weight:600;padding:2px 8px;border-radius:999px;">${badge}</span>
                        <span style="font-size:0.7rem;color:var(--gray);">第 ${i+1} 题</span>
                        ${submitted ? '<span style="margin-left:auto;font-size:0.7rem;color:var(--correct);font-weight:600;">✓ 已提交</span>' : ''}
                    </div>
                    <p style="margin:0.4rem 0;font-size:0.95rem;line-height:1.5;">${q.question}</p>
                    <div style="font-size:0.8rem;color:var(--gray);margin:0.5rem 0;min-height:1.2rem;word-break:break-word;">
                        ${submitted && hasText
                            ? '<span style="background:#FDE68A;color:#78350F;padding:2px 6px;border-radius:4px;">' + escapeHtml(f.text) + '</span>'
                            : (hasText
                                ? '<span style="background:#FEF3C7;color:#B45309;padding:2px 6px;border-radius:4px;">' + escapeHtml(f.text) + '（待提交）</span>'
                                : (isActive ? '正在作答，请在左侧文章划选文字…' : '尚未划线作答') )}
                    </div>
                    ${!submitted ? '<button onclick="submitFallbackAnswer(' + i + ')" style="width:100%;padding:0.6rem;border-radius:0.6rem;border:1px solid var(--primary);background:var(--primary-light,#FEF3C7);color:var(--primary-dark,#B45309);font-weight:600;cursor:pointer;">提交答案</button>' : ''}
                </div>
            `;
        }).join('')}
    `;

    // 点击卡片切换当前作答题（跳过按钮点击）
    area.querySelectorAll('.fallback-q-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('button')) return;
            const idx = parseInt(card.getAttribute('data-q'), 10);
            if (fallbackAnswers[idx] && !fallbackAnswers[idx].submitted) {
                activeFallbackQuestion = idx;
                renderFallbackQuizCards();
            }
        });
    });
}

function submitFallbackAnswer(i) {
    const f = fallbackAnswers[i];
    if (!f || !f.text) {
        toast('请先在文章中划选一段文字作为答案');
        return;
    }
    f.submitted = true;
    const next = fallbackAnswers.findIndex(function(x, idx) { return !x.submitted; });
    activeFallbackQuestion = next >= 0 ? next : i;
    renderFallbackQuizCards();
    toast('已保存第 ' + (i + 1) + ' 题答案');
}

// 松手后捕获文章文字选区并高亮
function onFallbackSelection() {
    if (!fallbackQuizActive) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const text = sel.toString().replace(/\s+/g, ' ').trim();
    if (!text) return;
    const readContent = document.getElementById('readContent');
    if (!readContent || !sel.anchorNode || !readContent.contains(sel.anchorNode)) return;

    // 高亮选中文字（黄色背景）
    try {
        document.execCommand('hiliteColor', false, '#FDE68A');
    } catch (e) { /* 某些环境下 execCommand 不可用，忽略，仅记录答案文本 */ }

    if (fallbackAnswers[activeFallbackQuestion]) {
        fallbackAnswers[activeFallbackQuestion].text = text;
        renderFallbackQuizCards();
    }
    sel.removeAllRanges();
}

// ==================== 单词 span 渲染 & 拖拽（方案 A） ====================

// HTML 转义，避免文章内容中的 < > & 破坏 DOM
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

/**
 * 把纯文本文章拆成一个个 <span class="word-span">，标点空格保留为文本节点
 * 每个 span 带 data-word（小写），用于查词和收藏判断
 * 不在这里设 data-sentence，渲染后由 getSentenceOfSpan 从 DOM 计算，避免正则脆弱
 */
function splitWordsToSpans(text) {
    if (!text) return '';
    const escaped = escapeHtml(text);
    // 匹配英文单词（含连字符 - 和撇号 '，如 don't, well-known）
    return escaped.replace(/([A-Za-z]+(?:['-][A-Za-z]+)*)/g, function (match) {
        const lower = match.toLowerCase();
        return '<span class="word-span" data-word="' + lower + '">' + match + '</span>';
    });
}

/**
 * 从 DOM 计算某个 word-span 所在的原文句子
 * 向上找到 <p>，按 . ! ? 分割，找到包含该 span 文本的句子
 */
function getSentenceOfSpan(spanEl) {
    const p = spanEl.closest('p');
    if (!p) return '';
    const fullText = p.textContent || '';
    const wordText = spanEl.textContent || '';
    // 按句子分割（保留标点）
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    for (const s of sentences) {
        if (s.indexOf(wordText) !== -1) {
            return s.trim();
        }
    }
    return fullText.trim();
}

/**
 * 遍历所有 word-span，标记已收藏的（加 collected 类，禁用拖拽）
 * 在渲染文章后调用
 */
function markCollectedSpans() {
    const readContent = document.getElementById('readContent');
    if (!readContent || !currentArticle) return;

    const articleId = currentArticle.id;
    const spans = readContent.querySelectorAll('.word-span');
    spans.forEach(function (span) {
        const word = span.getAttribute('data-word') || '';
        const rawSentence = getSentenceOfSpan(span);
        // 统一用 getWordPositionIndices 的 cleanSentence 判断（和 doCollectWord 存储时一致）
        const { cleanSentence } = getWordPositionIndices(rawSentence);
        const sentence = cleanSentence || rawSentence;
        if (isWordCollectedInThisSentence(word, articleId, sentence)) {
            span.classList.add('collected');
            span.setAttribute('title', '✅ 本句中已收藏');
        } else {
            span.classList.remove('collected');
            span.removeAttribute('title');
        }
    });
}

/**
 * 点击 word-span → 弹释义卡片
 * 从 currentArticle.words 取释义，复用 showWordCard
 */
function handleWordSpanClick(spanEl) {
    const word = spanEl.getAttribute('data-word') || spanEl.textContent || '';
    if (!word) return;

    const sentence = getSentenceOfSpan(spanEl);

    // 定位到 span 上方居中
    const rect = spanEl.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    // 从数据库读该词的所有释义；无释义则展示输入框
    openWordCard(word, sentence, word, x, y);
}

// ==================== span 拖拽（pointer events，桌面+移动端通用） ====================

let spanDragState = null; // { span, ghost, startX, startY, moved, word, meaning, sentence }

function onSpanPointerDown(e) {
    // 用 this 获取 span（事件委托下 e.currentTarget 是 readContent 而非 span）
    const span = this;
    // 降级划选答题模式下禁用单词拖拽，让位给原生文字选区
    if (fallbackQuizActive) return;
    // 已收藏的不可拖拽
    if (span.classList.contains('collected')) return;

    const word = span.getAttribute('data-word') || span.textContent || '';
    const sentence = getSentenceOfSpan(span);
    const words = currentArticle ? (currentArticle.words || {}) : {};
    const meaning = words[word] || words[word.toLowerCase()] || '暂无释义';

    spanDragState = {
        span: span,
        ghost: null,
        startX: e.clientX,
        startY: e.clientY,
        moved: false,
        word: word,
        meaning: meaning,
        sentence: sentence
    };

    // 在 document 上监听 move/up（不依赖 setPointerCapture，兼容合成事件）
    document.addEventListener('pointermove', onSpanPointerMove);
    document.addEventListener('pointerup', onSpanPointerUp);
    document.addEventListener('pointercancel', onSpanPointerUp);
}

function onSpanPointerMove(e) {
    if (!spanDragState) return;
    const dx = e.clientX - spanDragState.startX;
    const dy = e.clientY - spanDragState.startY;

    // 移动超过 5px 才判定为拖拽（否则当作点击）
    if (!spanDragState.moved && Math.hypot(dx, dy) < 5) return;

    if (!spanDragState.moved) {
        spanDragState.moved = true;
        // 创建拖拽幽灵（浮动副本）
        const ghost = spanDragState.span.cloneNode(true);
        ghost.classList.add('dragging-ghost');
        ghost.style.position = 'fixed';
        ghost.style.pointerEvents = 'none';
        ghost.style.zIndex = '9999';
        ghost.style.left = (spanDragState.startX - 20) + 'px';
        ghost.style.top = (spanDragState.startY - 10) + 'px';
        ghost.style.transform = 'scale(1.3)';
        ghost.style.background = 'var(--primary-light, #FEF3C7)';
        ghost.style.padding = '2px 6px';
        ghost.style.borderRadius = '4px';
        ghost.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
        ghost.style.color = 'var(--primary-dark, #D97706)';
        ghost.style.fontWeight = '600';
        document.body.appendChild(ghost);
        spanDragState.ghost = ghost;
        // 隐藏原 span 的文字（保持占位）
        spanDragState.span.style.opacity = '0.3';
    }

    if (spanDragState.ghost) {
        spanDragState.ghost.style.left = (e.clientX - 20) + 'px';
        spanDragState.ghost.style.top = (e.clientY - 10) + 'px';
    }

    checkCollectZoneHover(e.clientX, e.clientY);
}

function onSpanPointerUp(e) {
    if (!spanDragState) return;
    const span = spanDragState.span;

    document.removeEventListener('pointermove', onSpanPointerMove);
    document.removeEventListener('pointerup', onSpanPointerUp);
    document.removeEventListener('pointercancel', onSpanPointerUp);

    const wasDragging = spanDragState.moved;
    const ghost = spanDragState.ghost;
    const dragData = {
        word: spanDragState.word,
        meaning: spanDragState.meaning,
        sentence: spanDragState.sentence
    };

    // 清理状态
    spanDragState = null;

    if (!wasDragging) {
        // 没拖拽 → 当作点击，弹释义卡片（由 click 事件兜底处理，这里不重复弹）
        return;
    }

    // 拖拽过：标记 spanJustDragged，阻止随后的 click 事件弹卡片
    spanJustDragged = true;

    // 拖拽结束：判断是否在收集区上
    const isOver = checkCollectZoneHover(e.clientX, e.clientY);
    const zone = document.getElementById('collectZone');
    if (zone) zone.classList.remove('active');

    if (ghost) {
        if (isOver) {
            // 飞入收集区动画，结束后收藏
            animateGhostToZone(ghost, zone, function () {
                if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
                doCollectWord(dragData).then(function() {
                    markCollectedSpans(); // 更新已收藏标记（等 doCollectWord 完成后）
                });
            });
        } else {
            // 拖出半路松手 → 淡出消失，不收藏
            ghost.style.transition = 'opacity 0.2s';
            ghost.style.opacity = '0';
            setTimeout(function () {
                if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
            }, 200);
        }
    }

    // 恢复原 span 透明度
    span.style.opacity = '';
}

function animateGhostToZone(ghost, zone, done) {
    if (!zone) { done && done(); return; }
    const zoneRect = zone.getBoundingClientRect();
    const ghostRect = ghost.getBoundingClientRect();
    const targetX = zoneRect.left + zoneRect.width / 2 - ghostRect.width / 2;
    const targetY = zoneRect.top + zoneRect.height / 2 - ghostRect.height / 2;

    ghost.style.transition = 'left 0.3s cubic-bezier(0.4,0,0.2,1), top 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s, opacity 0.3s';
    ghost.style.left = targetX + 'px';
    ghost.style.top = targetY + 'px';
    ghost.style.transform = 'scale(0.5)';
    ghost.style.opacity = '0';
    setTimeout(done, 320);
}

/**
 * 给 readContent 绑定 word-span 的 pointerdown + click 事件委托（只绑一次）
 * - pointer 事件负责拖拽
 * - click 事件负责弹释义卡片（兜底，保证 .click() 和真实点击都能触发）
 */
let wordSpanEventsBound = false;
let spanJustDragged = false; // 拖拽结束时置 true，click 事件据此跳过，避免拖拽后误弹卡片
function bindWordSpanEventsOnce() {
    if (wordSpanEventsBound) return;
    const readContent = document.getElementById('readContent');
    if (!readContent) return;
    wordSpanEventsBound = true;

    // pointerdown：启动拖拽判定
    readContent.addEventListener('pointerdown', function (e) {
        const span = e.target.closest('.word-span');
        if (span) {
            onSpanPointerDown.call(span, e);
        }
    });

    // click：弹释义卡片（拖拽刚结束时跳过）
    readContent.addEventListener('click', function (e) {
        if (spanJustDragged) {
            spanJustDragged = false;
            return;
        }
        const span = e.target.closest('.word-span');
        if (span) {
            e.stopPropagation();
            handleWordSpanClick(span);
        }
    });

    // mouseup：降级划选答题模式下，捕获文章文字选区并高亮
    readContent.addEventListener('mouseup', function (e) {
        if (!fallbackQuizActive) return;
        if (e.target.closest('.fallback-q-card') || e.target.closest('button')) return;
        setTimeout(onFallbackSelection, 10);
    });

    // 句子翻译悬停：mouseover/mouseout 委托（innerHTML 重渲染不影响绑定）
    readContent.addEventListener('mouseover', onSentenceMouseOver);
    readContent.addEventListener('mouseout', onSentenceMouseOut);
}

// ==================== 句子翻译悬停浮层（5 秒滑出） ====================

let sentenceHoverTimer = null;
let sentenceHoverPanel = null;

// 把 currentArticle.sentences 规范化为 [{ sentence, translation }]
function buildSentenceList() {
    return ((currentArticle && currentArticle.sentences) || []).map(function(s) {
        // 兼容多种字段命名（字符串 / original·en·sentence·text·english·content / translation·zh·chinese·cn）
        if (typeof s === 'string') {
            return { sentence: '', translation: s };
        }
        return {
            sentence: (s.original || s.en || s.sentence || s.text || s.english || s.content || '').toString().trim(),
            translation: (s.translation || s.zh || s.chinese || s.cn || '').toString().trim()
        };
    });
}

function getSentenceHoverPanel() {
    if (!sentenceHoverPanel) {
        sentenceHoverPanel = document.getElementById('sentenceHoverPanel');
    }
    return sentenceHoverPanel;
}

function showSentenceHoverPanel(sentence, translation) {
    const panel = getSentenceHoverPanel();
    if (!panel) return;
    panel.querySelector('.shp-origin').textContent = sentence;
    panel.querySelector('.shp-translation').textContent = translation;
    panel.classList.add('visible');
}

function hideSentenceHoverPanel() {
    const panel = getSentenceHoverPanel();
    if (panel) panel.classList.remove('visible');
}

function clearSentenceHoverTimer() {
    if (sentenceHoverTimer) {
        clearTimeout(sentenceHoverTimer);
        sentenceHoverTimer = null;
    }
}

function startSentenceHover(el) {
    const idx = parseInt(el.getAttribute('data-sentence-idx'), 10);
    const item = buildSentenceList()[idx];
    if (!item || !item.sentence || !item.translation) return;

    clearSentenceHoverTimer();
    hideSentenceHoverPanel();
    sentenceHoverTimer = setTimeout(function() {
        showSentenceHoverPanel(item.sentence, item.translation);
    }, 5000);
}

function onSentenceMouseOver(e) {
    const el = e.target.closest('.article-sentence');
    if (!el) return;
    if (el.contains(e.relatedTarget)) return; // 在句子内部移动，忽略
    startSentenceHover(el);
}

function onSentenceMouseOut(e) {
    const el = e.target.closest('.article-sentence');
    if (!el) return;
    if (el.contains(e.relatedTarget)) return; // 仍在句子内部，忽略
    clearSentenceHoverTimer();
    hideSentenceHoverPanel();
}

function renderArticleWithTranslations() {
    const readContent = document.getElementById('readContent');
    if (!currentArticle) return;

    let html = '';
    // 英文正文始终来自 currentArticle.article（上传时已入库，不依赖 Coze 返回）
    const articleText = (currentArticle.article || '').trim();
    const sentences = buildSentenceList();
    const paragraphs = articleText.split(/\n\n+/).filter(p => p.trim().length > 0);

    if (sentences.length > 0) {
        // 逐句渲染英文（来自 articleText），按文本匹配关联译文用于悬停浮层；
        // data-sentence-idx 指向 buildSentenceList 索引，供右侧浮层按索引取译文
        html = paragraphs.map(function (p) {
            const parts = p.match(/[^.!?]+[.!?]+/g) || [p];
            return parts.map(function (part) {
                const t = part.trim();
                const key = t.toLowerCase();
                const idx = sentences.findIndex(function (s) {
                    return s.sentence && (
                        key.indexOf(s.sentence.toLowerCase()) !== -1 ||
                        s.sentence.toLowerCase().indexOf(key) !== -1
                    );
                });
                if (idx >= 0) {
                    return '<p class="article-sentence" data-sentence-idx="' + idx + '" style="margin-bottom:0.75rem;line-height:1.8;">' + splitWordsToSpans(t) + '</p>';
                }
                return '<p style="margin-bottom:0.75rem;line-height:1.8;">' + splitWordsToSpans(t) + '</p>';
            }).join('');
        }).join('');
    } else {
        html = paragraphs.map(function (p) {
            return '<p style="margin-bottom:1rem;line-height:1.8;">' + splitWordsToSpans(p) + '</p>';
        }).join('');
    }

    readContent.innerHTML = html;
    hideSentenceHoverPanel();
    applyHighlights();
    markCollectedSpans();
}

function toggleTranslations() {
    isTranslationsVisible = !isTranslationsVisible;
    const btn = document.getElementById('toggleTransBtn');
    if (btn) {
        btn.textContent = isTranslationsVisible ? '🔒 隐藏译文' : '🌐 显示译文';
    }
    renderArticleWithTranslations();
}

// ==================== 完成阅读 & 分类整理面板 ====================

// 点击"完成阅读"按钮触发
function finishReading() {
    // 如果有当前文章，优先用文章ID筛选
    if (currentArticle) {
        // 看看本文有多少pending的词
        const pendingInArticle = userData.collectedWords.filter(function(w) {
            return w.articleId === currentArticle.id && w.status === 'pending';
        });
        
        if (pendingInArticle.length === 0) {
            // 文章没有待分类单词
            const totalCollectedInArticle = userData.collectedWords.filter(function(w) {
                return w.articleId === currentArticle.id;
            });
            
            if (totalCollectedInArticle.length === 0) {
                toast('还没有收藏任何单词哦！先拖动单词卡片到右侧收集区吧 📥');
                return;
            } else {
                // 没有待分类单词，提示并跳转测试页
                toast('本文没有待分类的单词，直接开始测试吧！');
                setTimeout(function() {
                    startQuiz();
                }, 1000);
                return;
            }
        }
        
        openSortPanelForArticle(currentArticle.id, currentArticle.title);
    } else {
        // 没有当前文章，显示所有pending的单词
        openSortPanelAllPending();
    }
}

// 打开分类面板：按文章ID筛选（用于从单词本"去分类"和完成阅读）
function openSortPanelForArticle(articleId, articleTitle) {
    const words = userData.collectedWords.filter(function(w) {
        return w.status === 'pending' && w.articleId === articleId;
    });
    
    if (words.length === 0) {
        toast('这篇文章已整理完毕 🎉');
        return;
    }
    
    sortPanelSortedWords = [];
    sortPanelArticleId = articleId;  // 记录当前面板筛选的文章ID
    showSortPanel(words, articleTitle || '文章单词整理');
}

// 打开分类面板：所有待分类（用于没有当前文章时）
function openSortPanelAllPending() {
    const words = userData.collectedWords.filter(function(w) {
        return w.status === 'pending';
    });
    sortPanelSortedWords = [];
    sortPanelArticleId = null;  // 不限定文章
    showSortPanel(words, '所有待分类单词');
}

// 显示分类面板（核心入口）
function showSortPanel(pendingWords, title) {
    const mask = document.getElementById('sortPanelMask');
    if (!mask) return;
    
    if (!pendingWords || pendingWords.length === 0) {
        toast('没有待分类的单词 🎉');
        return;
    }
    
    document.getElementById('sortPanelTitle').textContent = title || '整理待分类单词';
    
    mask.classList.add('show');
    document.body.style.overflow = 'hidden';  // 锁定背景滚动
    
    renderSortPanelContent(pendingWords);
}

// 关闭面板
function closeSortPanel() {
    const mask = document.getElementById('sortPanelMask');
    if (!mask) return;
    
    mask.classList.remove('show');
    document.body.style.overflow = '';
    
    // 清理浮动标签（如果有）
    const floatingTag = document.querySelector('.sort-floating-tag');
    if (floatingTag) floatingTag.remove();
    
    // 清理
    sortPanelSortedWords = [];
    sortPanelArticleId = null;
    
    // 如果在单词本页面，重新渲染
    const wordbookActive = document.getElementById('wordbookPage').classList.contains('active');
    if (wordbookActive) {
        renderVocabBook();
    }
    updateCollectBadge();
}

// 渲染分类面板内容
function renderSortPanelContent(pendingWords) {
    const contentEl = document.getElementById('sortPanelContent');
    const progressTextEl = document.getElementById('sortProgressText');
    const footerEl = document.getElementById('sortPanelFooter');
    
    if (!contentEl) return;
    
    const total = pendingWords.length + sortPanelSortedWords.length;
    const sortedCount = sortPanelSortedWords.length;
    
    // 更新进度（显示百分比）
    if (progressTextEl) {
        const percent = total > 0 ? Math.round((sortedCount / total) * 100) : 0;
        progressTextEl.textContent = `${sortedCount}/${total} 已整理 · ${percent}%`;
    }
    
    // 如果全部整理完成
    if (pendingWords.length === 0) {
        contentEl.innerHTML = `
            <div class="sort-done-tip">
                <div class="sort-done-emoji">🎉</div>
                <div class="sort-done-text">整理完成！</div>
                <div class="sort-done-sub">本次共整理 ${total} 个单词，太棒了！</div>
            </div>
        `;
        if (footerEl) {
            footerEl.innerHTML = `
                <button class="sort-footer-btn sort-footer-finish" onclick="closeSortPanel()" style="flex:1;">✓ 完成整理</button>
            `;
        }
        return;
    }
    
    // 底部按钮
    if (footerEl) {
        footerEl.innerHTML = `
            <button class="sort-footer-btn sort-footer-later" onclick="closeSortPanel()">稍后整理</button>
            <button class="sort-footer-btn sort-footer-finish" onclick="closeSortPanel()">完成整理 (${sortedCount}/${total})</button>
        `;
    }
    
    // 列表内容
    contentEl.innerHTML = pendingWords.map(function(w) {
        const paraText = (w.paragraphIndex !== undefined && w.paragraphIndex !== null) 
            ? `第${w.paragraphIndex + 1}段` 
            : '';
        return `
        <div class="sort-word-item" id="sort-word-${w.id}">
            <div class="sort-word-row">
                <div>
                    <div class="sort-word-text">${escapeHtml(w.word)}</div>
                    <div class="sort-word-meaning">${escapeHtml(w.meaning || '')}</div>
                </div>
            </div>
            ${w.sentence ? `
                <div class="sort-word-sentence" onclick="jumpToParagraphInReading(${w.id})" title="点击跳回阅读页对应段落">
                    ${paraText ? `<span class="sort-sentence-label">📍 ${paraText}</span><br>` : ''}
                    "${escapeHtml(w.sentence)}"
                </div>
            ` : ''}
            <div class="sort-buttons">
                <button class="sort-btn sort-btn-mastered" onclick="sortWordAction(${w.id}, 'mastered')">
                    ✓ 已掌握
                </button>
                <button class="sort-btn sort-btn-learning" onclick="sortWordAction(${w.id}, 'learning')">
                    📖 学习中
                </button>
                <button class="sort-btn sort-btn-review" onclick="sortWordAction(${w.id}, 'review')">
                    ↻ 需复习
                </button>
            </div>
        </div>
        `;
    }).join('') + renderSortedSection();
}

// 已整理单词的chip区域
function renderSortedSection() {
    if (sortPanelSortedWords.length === 0) return '';
    const mastered = sortPanelSortedWords.filter(w => w.status === 'mastered');
    const learning = sortPanelSortedWords.filter(w => w.status === 'learning');
    const review = sortPanelSortedWords.filter(w => w.status === 'review');
    
    return `
    <div class="sorted-section">
        <div class="sorted-title">已整理 (${sortPanelSortedWords.length})</div>
        <div class="sorted-list">
            ${mastered.map(w => `<span class="sorted-chip mastered">✓ ${escapeHtml(w.word)}</span>`).join('')}
            ${learning.map(w => `<span class="sorted-chip learning">📖 ${escapeHtml(w.word)}</span>`).join('')}
            ${review.map(w => `<span class="sorted-chip review">↻ ${escapeHtml(w.word)}</span>`).join('')}
        </div>
    </div>
    `;
}

// HTML转义防XSS
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}

// 单词分类动作
async function sortWordAction(wordId, newStatus) {
    const word = userData.collectedWords.find(w => w.id === wordId);
    if (!word) return;

    const knowledgeMap = {
        'mastered': 1,
        'learning': 0.5,
        'review': 0.2
    };
    const knowledge = knowledgeMap[newStatus] || 0;

    // 本地乐观更新（保证动画流畅）
    word.status = newStatus;
    word.knowledge = knowledge;
    saveData();

    // 后台同步到后端 user_words 表（不阻塞动画）
    apiPut('/api/word-status/' + wordId, { status: newStatus, knowledge: knowledge })
        .catch(function(e) { console.warn('⚠️ 分类同步后端失败:', e.message); });

    // 记录到已整理列表
    sortPanelSortedWords.push({
        word: word.word,
        status: newStatus
    });

    // 播放收缩动画
    const itemEl = document.getElementById('sort-word-' + wordId);
    if (itemEl) {
        itemEl.classList.add('collapsing');
        setTimeout(function() {
            // 重新获取 pending 列表：优先用面板保存的 articleId，否则用 word 的 articleId
            const filterArticleId = sortPanelArticleId || word.articleId;
            let pendingList;
            if (filterArticleId) {
                pendingList = userData.collectedWords.filter(function(w) {
                    return w.status === 'pending' && w.articleId === filterArticleId;
                });
            } else {
                pendingList = userData.collectedWords.filter(function(w) {
                    return w.status === 'pending';
                });
            }
            renderSortPanelContent(pendingList);
        }, 300);
    }

    const msgMap = {
        'mastered': '✓ 已掌握！',
        'learning': '📖 加入学习中',
        'review': '↻ 加入复习队列'
    };
    toast(msgMap[newStatus] || '分类完成');
}

// 点击句子跳转回阅读页对应段落（面板缩小为浮动标签）
function jumpToParagraphInReading(wordId) {
    const word = userData.collectedWords.find(w => w.id === wordId);
    if (!word) return;
    
    // 面板缩小为浮动标签（不关闭）
    minimizeSortPanel();
    
    // 如果有文章ID，打开对应文章
    if (word.articleId) {
        // 找到文章
        let article = ARTICLES.find(a => a.id === word.articleId);
        if (!article && currentArticle && currentArticle.id === word.articleId) {
            article = currentArticle;
        }
        
        if (article) {
            // 如果当前不在阅读页或文章不同，先打开文章
            const readingActive = document.getElementById('readingPage').classList.contains('active');
            if (!readingActive || !currentArticle || currentArticle.id !== word.articleId) {
                openArticle(article.id);
            }
            
            // 滚动到对应段落并高亮闪烁
            setTimeout(function() {
                const readContent = document.getElementById('readContent');
                if (readContent) {
                    const pNodes = readContent.querySelectorAll('p');
                    const pIdx = word.paragraphIndex || 0;
                    if (pNodes[pIdx]) {
                        pNodes[pIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // 橙色高亮闪烁2次后保持柔和底色
                        pNodes[pIdx].classList.add('paragraph-highlighted');
                        
                        // 闪烁动画结束后保持柔和底色
                        setTimeout(function() {
                            if (pNodes[pIdx]) {
                                pNodes[pIdx].style.background = 'var(--primary-light)';
                                pNodes[pIdx].style.borderRadius = '0.5rem';
                                pNodes[pIdx].style.padding = '0.5rem';
                            }
                        }, 1200);
                        
                        // 5秒后完全清除高亮
                        setTimeout(function() {
                            if (pNodes[pIdx]) {
                                pNodes[pIdx].classList.remove('paragraph-highlighted');
                                pNodes[pIdx].style.background = '';
                                pNodes[pIdx].style.borderRadius = '';
                                pNodes[pIdx].style.padding = '';
                            }
                        }, 5000);
                    }
                }
            }, 300);
        } else {
            toast('无法找到对应文章');
        }
    }
}

// 面板缩小为浮动标签
function minimizeSortPanel() {
    const mask = document.getElementById('sortPanelMask');
    if (!mask) return;
    
    // 隐藏面板（保留数据，不清理）
    mask.classList.remove('show');
    document.body.style.overflow = '';
    
    // 显示浮动标签
    const existingTag = document.querySelector('.sort-floating-tag');
    if (existingTag) existingTag.remove();
    
    const tag = document.createElement('div');
    tag.className = 'sort-floating-tag';
    tag.innerHTML = '📚 继续分类';
    tag.onclick = restoreSortPanel;
    document.body.appendChild(tag);
}

// 恢复面板
function restoreSortPanel() {
    const tag = document.querySelector('.sort-floating-tag');
    if (tag) tag.remove();
    
    const mask = document.getElementById('sortPanelMask');
    if (!mask) return;
    
    mask.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // 重新渲染当前pending列表（使用面板保存的 articleId 筛选）
    let pendingList;
    if (sortPanelArticleId) {
        pendingList = userData.collectedWords.filter(function(w) {
            return w.status === 'pending' && w.articleId === sortPanelArticleId;
        });
    } else {
        pendingList = userData.collectedWords.filter(function(w) {
            return w.status === 'pending';
        });
    }
    renderSortPanelContent(pendingList);
}

// ==================== 初始化 ====================

window.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM 加载完成');
    
    // 初始化收集区徽章（尚未进入主界面，保持隐藏）
    setTimeout(updateCollectBadge, 100);
    
    // 始终先显示欢迎页，点击「开始旅程」后才进入主界面
    showScreen('startingPage');
});