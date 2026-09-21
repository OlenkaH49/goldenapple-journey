/**
 * seed.js - 初中英语核心词汇灌库脚本
 *
 * 运行方式：node seed.js
 *
 * 说明：
 * - 复用 db.js 的 saveWordsToCache（内部已是 INSERT OR IGNORE + 小写规范化），
 *   与 server.js 查词/写缓存逻辑完全一致，数据库连接也相同（读取 .env 的 DATABASE_PATH）。
 * - 查词逻辑无需改动：server.js 本就会先查 word_cache，命中即直接返回释义。
 */

const db = require('./db');

// 800 个初中常用词：word -> 中文释义
const WORDS = {
    // ===== A =====
    'a': '一个', 'able': '能够', 'about': '关于；大约', 'above': '在…上方',
    'abroad': '在国外', 'accept': '接受', 'accident': '事故；意外', 'across': '穿过；横过',
    'act': '行动；表演', 'active': '积极的；活跃的', 'activity': '活动', 'add': '添加；增加',
    'address': '地址', 'adult': '成年人', 'advice': '建议', 'afraid': '害怕的',
    'after': '在…之后', 'afternoon': '下午', 'again': '再一次；又', 'age': '年龄；时代',
    'ago': '以前', 'agree': '同意', 'air': '空气', 'airport': '机场',
    'all': '所有的；全部', 'allow': '允许', 'almost': '几乎', 'alone': '独自的',
    'along': '沿着', 'already': '已经', 'also': '也', 'although': '虽然',
    'always': '总是', 'amazing': '令人惊奇的', 'among': '在…之中', 'and': '和；并且',
    'angry': '生气的', 'animal': '动物', 'another': '另一个', 'answer': '回答；答案',
    'any': '任何的', 'anyone': '任何人', 'anything': '任何事物', 'appear': '出现',
    'apple': '苹果', 'area': '地区；面积', 'arm': '手臂', 'army': '军队',
    'around': '在…周围', 'arrive': '到达', 'art': '艺术', 'article': '文章',
    'as': '作为；像', 'ask': '询问', 'at': '在；向', 'attention': '注意',
    'aunt': '阿姨；姑妈', 'autumn': '秋天', 'away': '离开；远离',

    // ===== B =====
    'baby': '婴儿', 'back': '后面；背部；回来', 'bad': '坏的', 'bag': '包；袋子',
    'ball': '球', 'banana': '香蕉', 'bank': '银行；河岸', 'baseball': '棒球',
    'basket': '篮子', 'basketball': '篮球', 'bathroom': '浴室；卫生间', 'be': '是；成为',
    'beach': '海滩', 'bear': '熊', 'beautiful': '美丽的', 'because': '因为',
    'become': '变成；成为', 'bed': '床', 'bedroom': '卧室', 'before': '在…之前',
    'begin': '开始', 'behind': '在…后面', 'believe': '相信', 'bell': '铃；钟',
    'below': '在…下方', 'beside': '在…旁边', 'best': '最好的', 'better': '更好的',
    'between': '在…之间', 'big': '大的', 'bike': '自行车', 'bird': '鸟',
    'birthday': '生日', 'bit': '一点；少量', 'black': '黑色的', 'blackboard': '黑板',
    'blue': '蓝色的', 'boat': '船', 'body': '身体', 'book': '书；预订',
    'boring': '无聊的', 'born': '出生', 'borrow': '借入', 'boss': '老板',
    'both': '两者都', 'bottle': '瓶子', 'box': '盒子', 'boy': '男孩',
    'bread': '面包', 'break': '打破；休息', 'breakfast': '早餐', 'bridge': '桥',
    'bright': '明亮的；聪明的', 'bring': '带来', 'brother': '兄弟', 'brown': '棕色的',
    'build': '建造', 'building': '建筑物', 'bus': '公共汽车', 'busy': '忙碌的',
    'but': '但是', 'buy': '买', 'by': '通过；在…旁',

    // ===== C =====
    'cake': '蛋糕', 'call': '打电话；称呼', 'camera': '照相机', 'can': '能；罐头',
    'candle': '蜡烛', 'cap': '帽子', 'car': '汽车', 'card': '卡片',
    'care': '关心；照顾', 'careful': '仔细的；小心的', 'carry': '携带；搬运', 'cat': '猫',
    'catch': '抓住；赶上', 'center': '中心', 'chair': '椅子', 'chance': '机会',
    'change': '改变；零钱', 'cheap': '便宜的', 'check': '检查', 'cheese': '奶酪',
    'chicken': '鸡肉；鸡', 'child': '孩子', 'china': '中国', 'chinese': '中文；中国的',
    'chocolate': '巧克力', 'choose': '选择', 'cinema': '电影院', 'city': '城市',
    'class': '班级；课', 'classmate': '同学', 'classroom': '教室', 'clean': '打扫；干净的',
    'clear': '清楚的', 'clever': '聪明的', 'climb': '爬', 'clock': '钟',
    'close': '关闭；靠近的', 'clothes': '衣服', 'cloud': '云', 'cloudy': '多云的',
    'club': '俱乐部', 'coat': '外套', 'coffee': '咖啡', 'cold': '冷的；感冒',
    'collect': '收集', 'college': '大学；学院', 'color': '颜色', 'come': '来',
    'comfortable': '舒服的', 'common': '普通的；共同的', 'computer': '电脑', 'concert': '音乐会',
    'cook': '烹饪；厨师', 'cool': '凉爽的；酷的', 'copy': '复制；抄写', 'corn': '玉米',
    'corner': '角落', 'cost': '花费', 'count': '数；计算', 'country': '国家；乡村',
    'course': '课程', 'cousin': '堂（表）兄弟姐妹', 'cover': '覆盖', 'cow': '奶牛',
    'cross': '穿过；十字', 'cry': '哭；喊叫', 'culture': '文化', 'cup': '杯子',
    'cut': '切；剪', 'cute': '可爱的',

    // ===== D =====
    'dad': '爸爸', 'dance': '跳舞', 'dangerous': '危险的', 'dark': '黑暗的',
    'date': '日期；约会', 'daughter': '女儿', 'day': '天；白天', 'dear': '亲爱的；昂贵的',
    'decide': '决定', 'deep': '深的', 'delicious': '美味的', 'desk': '书桌',
    'dictionary': '词典', 'die': '死亡', 'different': '不同的', 'difficult': '困难的',
    'dinner': '晚餐；正餐', 'dirty': '脏的', 'discuss': '讨论', 'dish': '盘子；菜肴',
    'do': '做', 'doctor': '医生', 'dog': '狗', 'dollar': '美元',
    'door': '门', 'down': '向下', 'draw': '画画；拉', 'dream': '梦；梦想',
    'dress': '连衣裙；穿衣', 'drink': '喝；饮料', 'drive': '开车；驾驶', 'driver': '司机',
    'drop': '掉落；滴', 'dry': '干的；弄干', 'duck': '鸭子', 'during': '在…期间',

    // ===== E =====
    'each': '每个', 'ear': '耳朵', 'early': '早的', 'earth': '地球；泥土',
    'east': '东方', 'easy': '容易的', 'eat': '吃', 'egg': '鸡蛋',
    'eight': '八', 'eighth': '第八', 'either': '两者之一', 'elephant': '大象',
    'eleven': '十一', 'else': '其他；另外', 'email': '电子邮件', 'empty': '空的',
    'end': '结束；末端', 'english': '英语；英国的', 'enjoy': '享受；喜欢', 'enough': '足够的',
    'eraser': '橡皮', 'even': '甚至', 'evening': '傍晚；晚上', 'ever': '曾经',
    'every': '每一个', 'everyone': '每个人', 'everything': '一切', 'exam': '考试',
    'example': '例子', 'excited': '兴奋的', 'excuse': '原谅；借口', 'exercise': '锻炼；练习',
    'expensive': '昂贵的', 'eye': '眼睛',

    // ===== F =====
    'face': '脸；面对', 'fact': '事实', 'factory': '工厂', 'fail': '失败',
    'fall': '落下；秋天', 'family': '家庭', 'famous': '著名的', 'far': '远的',
    'farm': '农场', 'farmer': '农民', 'fast': '快的', 'fat': '胖的；脂肪',
    'father': '父亲', 'favorite': '最喜欢的', 'feel': '感觉', 'festival': '节日',
    'few': '少数的', 'fifteen': '十五', 'fifth': '第五', 'fifty': '五十',
    'fight': '打架；战斗', 'fill': '装满', 'film': '电影；胶卷', 'find': '找到；发现',
    'fine': '好的；晴朗的', 'finger': '手指', 'finish': '完成', 'fire': '火；火灾',
    'first': '第一', 'fish': '鱼；钓鱼', 'five': '五', 'flag': '旗子',
    'floor': '地板；楼层', 'flower': '花', 'fly': '飞；苍蝇', 'food': '食物',
    'foot': '脚', 'football': '足球', 'for': '为了；对于', 'foreign': '外国的',
    'forest': '森林', 'forget': '忘记', 'fork': '叉子', 'forty': '四十',
    'four': '四', 'fourth': '第四', 'free': '自由的；免费的', 'fresh': '新鲜的',
    'friday': '星期五', 'friend': '朋友', 'friendly': '友好的', 'from': '从；来自',
    'front': '前面', 'fruit': '水果', 'full': '满的；饱的', 'fun': '乐趣',
    'funny': '有趣的；好笑的', 'future': '未来',

    // ===== G =====
    'game': '游戏；比赛', 'garden': '花园', 'gate': '大门', 'get': '得到；变得',
    'gift': '礼物', 'girl': '女孩', 'give': '给', 'glad': '高兴的',
    'glass': '玻璃；玻璃杯', 'go': '去', 'gold': '金子；金色的', 'good': '好的',
    'goodbye': '再见', 'grade': '年级；成绩', 'grandfather': '祖父；外祖父', 'grandmother': '祖母；外祖母',
    'grass': '草', 'great': '伟大的；极好的', 'green': '绿色的', 'ground': '地面',
    'group': '小组；群', 'grow': '生长；种植', 'guess': '猜', 'guitar': '吉他',
    'gun': '枪',

    // ===== H =====
    'hair': '头发', 'half': '一半', 'hall': '大厅', 'hamburger': '汉堡包',
    'hand': '手', 'happy': '快乐的', 'hard': '困难的；努力地', 'hat': '帽子',
    'hate': '讨厌', 'have': '有', 'he': '他', 'head': '头；头脑',
    'health': '健康', 'healthy': '健康的', 'hear': '听见', 'heart': '心脏；心',
    'heavy': '重的', 'hello': '你好', 'help': '帮助', 'her': '她的；她',
    'here': '这里', 'hers': '她的', 'herself': '她自己', 'hi': '嗨',
    'high': '高的', 'hill': '小山', 'him': '他', 'himself': '他自己',
    'his': '他的', 'history': '历史', 'hit': '打；撞击', 'hobby': '爱好',
    'holiday': '假日', 'home': '家', 'homework': '家庭作业', 'hope': '希望',
    'horse': '马', 'hospital': '医院', 'hot': '热的', 'hotel': '旅馆',
    'hour': '小时', 'house': '房子', 'how': '怎样；多么', 'however': '然而',
    'hundred': '百', 'hungry': '饥饿的', 'hurry': '匆忙', 'hurt': '伤害；疼痛',

    // ===== I =====
    'i': '我', 'ice': '冰', 'idea': '主意；想法', 'if': '如果',
    'ill': '生病的', 'important': '重要的', 'in': '在…里', 'interesting': '有趣的',
    'internet': '互联网', 'into': '进入', 'island': '岛屿', 'it': '它',
    'its': '它的',

    // ===== J =====
    'jacket': '夹克', 'job': '工作', 'join': '加入', 'juice': '果汁',
    'jump': '跳', 'just': '刚刚；只是',

    // ===== K =====
    'keep': '保持；保管', 'key': '钥匙；关键', 'kid': '小孩', 'kind': '种类；友善的',
    'kiss': '亲吻', 'kitchen': '厨房', 'knife': '刀', 'know': '知道',

    // ===== L =====
    'lake': '湖', 'land': '陆地；降落', 'language': '语言', 'large': '大的',
    'last': '最后的；持续', 'late': '迟的', 'laugh': '笑', 'lazy': '懒惰的',
    'learn': '学习', 'leave': '离开；留下', 'left': '左边', 'leg': '腿',
    'lesson': '课；教训', 'let': '让', 'letter': '信；字母', 'library': '图书馆',
    'lie': '躺；撒谎', 'life': '生活；生命', 'light': '光；轻的', 'like': '喜欢；像',
    'line': '线；行', 'lion': '狮子', 'list': '清单', 'listen': '听',
    'little': '小的；少量', 'live': '居住；活的', 'long': '长的', 'look': '看',
    'lose': '丢失；输', 'lot': '许多', 'love': '爱', 'lovely': '可爱的',
    'low': '低的', 'lucky': '幸运的', 'lunch': '午餐',

    // ===== M =====
    'make': '制作；使得', 'man': '男人', 'many': '许多', 'map': '地图',
    'market': '市场', 'math': '数学', 'me': '我', 'meal': '一餐',
    'mean': '意思是；刻薄的', 'meat': '肉', 'meet': '遇见', 'meeting': '会议',
    'member': '成员', 'menu': '菜单', 'message': '消息；信息', 'middle': '中间的；中部',
    'milk': '牛奶', 'mind': '介意；头脑', 'mine': '我的；矿', 'minute': '分钟',
    'miss': '想念；错过；小姐', 'mistake': '错误', 'model': '模型', 'mom': '妈妈',
    'moment': '片刻', 'monday': '星期一', 'money': '钱', 'monkey': '猴子',
    'month': '月', 'moon': '月亮', 'more': '更多', 'morning': '早晨',
    'most': '最多的', 'mother': '母亲', 'mountain': '山', 'mouse': '老鼠；鼠标',
    'mouth': '嘴', 'move': '移动；搬家', 'movie': '电影', 'much': '许多；非常',
    'museum': '博物馆', 'music': '音乐', 'must': '必须', 'my': '我的',
    'myself': '我自己',

    // ===== N =====
    'name': '名字', 'near': '在…附近', 'need': '需要', 'never': '从不',
    'new': '新的', 'news': '新闻', 'next': '下一个', 'nice': '好的；友好的',
    'night': '夜晚', 'nine': '九', 'ninth': '第九', 'no': '不；没有',
    'nobody': '没有人', 'noise': '噪音', 'noodle': '面条', 'noon': '中午',
    'north': '北方', 'nose': '鼻子', 'not': '不', 'note': '笔记；注意',
    'nothing': '没有什么', 'now': '现在', 'number': '数字；号码', 'nurse': '护士',

    // ===== O =====
    'officer': '官员；警官', 'often': '经常', 'old': '老的；旧的', 'on': '在…上',
    'once': '一次；曾经', 'one': '一', 'only': '只有', 'open': '打开；开着的',
    'or': '或者', 'orange': '橙子；橙色的', 'other': '其他的', 'our': '我们的',
    'ours': '我们的', 'out': '出去；在外', 'outside': '在外面', 'over': '在…上方；结束',

    // ===== P =====
    'page': '页', 'pair': '一双；一对', 'panda': '熊猫', 'paper': '纸；论文',
    'parent': '父母', 'park': '公园；停车', 'part': '部分', 'party': '聚会；派对',
    'pass': '通过；传递', 'past': '过去', 'pay': '支付', 'pear': '梨',
    'pen': '钢笔', 'pencil': '铅笔', 'people': '人们', 'person': '人',
    'photo': '照片', 'piano': '钢琴', 'picture': '图片；照片', 'pig': '猪',
    'place': '地方；放置', 'plane': '飞机', 'plant': '植物；种植', 'play': '玩；播放；戏剧',
    'please': '请', 'police': '警察', 'poor': '贫穷的；差的', 'popular': '受欢迎的',
    'potato': '土豆', 'practice': '练习', 'present': '礼物；现在的', 'pretty': '漂亮的；相当',
    'price': '价格', 'problem': '问题', 'program': '节目；程序', 'pupil': '小学生',
    'put': '放；放置',

    // ===== Q =====
    'quarter': '四分之一；一刻钟', 'question': '问题', 'quick': '快的', 'quiet': '安静的',
    'quite': '相当；十分',

    // ===== R =====
    'rabbit': '兔子', 'radio': '收音机', 'rain': '雨；下雨', 'rainy': '下雨的',
    'read': '阅读', 'ready': '准备好的', 'real': '真实的', 'really': '真正地',
    'reason': '原因', 'red': '红色的', 'remember': '记住', 'rest': '休息；其余',
    'restaurant': '餐馆', 'rice': '米饭；大米', 'rich': '富有的', 'ride': '骑；乘',
    'right': '正确的；右边', 'river': '河流', 'road': '道路', 'room': '房间',
    'round': '圆的；环绕', 'rule': '规则', 'run': '跑；经营',

    // ===== S =====
    'sad': '难过的', 'safe': '安全的', 'same': '相同的', 'saturday': '星期六',
    'say': '说', 'school': '学校', 'science': '科学', 'sea': '海',
    'season': '季节', 'seat': '座位', 'second': '第二；秒', 'see': '看见',
    'sell': '卖', 'send': '发送', 'seven': '七', 'several': '几个',
    'she': '她', 'sheep': '绵羊', 'ship': '船', 'shirt': '衬衫',
    'shoe': '鞋', 'shop': '商店；购物', 'short': '短的；矮的', 'should': '应该',
    'show': '展示；节目', 'sick': '生病的', 'sing': '唱歌', 'sister': '姐妹',
    'sit': '坐', 'six': '六', 'sixth': '第六', 'sixty': '六十',
    'size': '尺寸', 'skirt': '裙子', 'sleep': '睡觉', 'slow': '慢的',
    'small': '小的', 'smell': '闻；气味', 'smile': '微笑', 'snake': '蛇',
    'snow': '雪；下雪', 'so': '所以；如此', 'soccer': '足球', 'some': '一些',
    'someone': '某人', 'something': '某事；某物', 'sometimes': '有时', 'son': '儿子',
    'song': '歌曲', 'soon': '很快', 'sorry': '抱歉的', 'south': '南方',
    'speak': '说；讲', 'spell': '拼写', 'spend': '花费；度过', 'sport': '运动',
    'spring': '春天', 'stand': '站立', 'star': '星星；明星', 'start': '开始',
    'station': '车站', 'stay': '停留；保持', 'still': '仍然；静止的', 'stop': '停止；车站',
    'story': '故事', 'street': '街道', 'strong': '强壮的', 'student': '学生',
    'study': '学习；研究', 'subject': '科目；主题', 'such': '这样的', 'summer': '夏天',
    'sun': '太阳', 'sunday': '星期日', 'sunny': '晴朗的', 'supermarket': '超市',
    'supper': '晚餐', 'sure': '确信的', 'sweater': '毛衣', 'sweet': '甜的',
    'swim': '游泳',

    // ===== T =====
    'table': '桌子；表格', 'take': '拿；带走；花费', 'talk': '谈话', 'tall': '高的',
    'taxi': '出租车', 'tea': '茶', 'teach': '教', 'teacher': '老师',
    'team': '队', 'tell': '告诉', 'ten': '十', 'tenth': '第十',
    'test': '测试', 'than': '比', 'thank': '感谢', 'that': '那；那个',
    'the': '这；那', 'their': '他们的', 'theirs': '他们的', 'them': '他们',
    'themselves': '他们自己', 'then': '然后；那时', 'there': '那里', 'these': '这些',
    'they': '他们', 'thin': '瘦的；薄的', 'thing': '东西；事情', 'think': '想；认为',
    'third': '第三', 'thirteen': '十三', 'thirty': '三十', 'this': '这；这个',
    'those': '那些', 'three': '三', 'through': '通过；穿过', 'thursday': '星期四',
    'ticket': '票', 'tiger': '老虎', 'time': '时间；次数', 'tired': '疲倦的',
    'to': '到；向', 'today': '今天', 'together': '一起', 'tomato': '西红柿',
    'tomorrow': '明天', 'tonight': '今晚', 'too': '也；太', 'tooth': '牙齿',
    'town': '城镇', 'toy': '玩具', 'train': '火车；训练', 'travel': '旅行',
    'tree': '树', 'trip': '旅行；旅程', 'trousers': '裤子', 'tuesday': '星期二',
    'turn': '转动；轮流', 'turtle': '海龟', 'twelve': '十二', 'twenty': '二十',
    'two': '二',

    // ===== U =====
    'uncle': '叔叔；舅舅', 'under': '在…下面', 'understand': '理解', 'up': '向上',
    'us': '我们', 'use': '使用', 'useful': '有用的',

    // ===== V =====
    'vegetable': '蔬菜', 'very': '非常', 'visit': '参观；拜访', 'voice': '声音',

    // ===== W =====
    'wait': '等待', 'walk': '走路；散步', 'wall': '墙', 'want': '想要',
    'warm': '温暖的', 'wash': '洗', 'watch': '观看；手表', 'water': '水',
    'way': '方法；道路', 'we': '我们', 'wear': '穿；戴', 'weather': '天气',
    'wednesday': '星期三', 'week': '星期', 'weekend': '周末', 'welcome': '欢迎',
    'well': '好；健康的；井', 'west': '西方', 'what': '什么', 'when': '什么时候',
    'where': '哪里', 'which': '哪一个', 'white': '白色的', 'who': '谁',
    'whose': '谁的', 'why': '为什么', 'win': '赢', 'wind': '风',
    'window': '窗户', 'windy': '有风的', 'winter': '冬天', 'wish': '希望；祝愿',
    'with': '和…一起；用', 'woman': '女人', 'wonderful': '精彩的', 'word': '单词；话语',
    'work': '工作', 'worker': '工人', 'world': '世界', 'worry': '担心',
    'write': '写', 'wrong': '错误的',

    // ===== Y =====
    'year': '年', 'yellow': '黄色的', 'yes': '是的', 'yesterday': '昨天',
    'you': '你；你们', 'young': '年轻的', 'your': '你的；你们的', 'yours': '你的；你们的'
};

function run() {
    // 确保表已建好（db.bootstrap 会建表 + 迁移 + 统计）
    db.bootstrap();

    const before = db.db.prepare('SELECT COUNT(*) AS c FROM word_cache').get().c;
    const total = Object.keys(WORDS).length;
    const added = db.saveWordsToCache(WORDS);
    const after = db.db.prepare('SELECT COUNT(*) AS c FROM word_cache').get().c;

    console.log(`\n✅ 灌库完成：共 ${total} 个词，本次新增 ${added} 个`);
    console.log(`📊 word_cache 表当前总计 ${after} 个词（灌库前 ${before} 个）`);
    console.log('💡 查词逻辑无需改动，server.js 会先查 word_cache，命中即直接返回释义。');
}

run();