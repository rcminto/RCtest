/**
 * 四类大学生人格类型
 * Bailyn, Woody, Isabella, Robert
 */

const PERSONALITY_TYPES = [
  {
    id: 'BAIL',
    name: 'Bailyn型',
    slogan: '别问，问就是在学习',
    description: '传说中的卷王本王，从不请假从不缺勤，眼里只有GPA，期末复习到凌晨是常态，一点风吹草动就能让焦虑指数飙升。',
    traits: [
      '全勤奖得主，大学四年没请过假',
      '复习到凌晨是基本操作',
      '容易一惊一乍，特别焦虑',
      '老师一提问就举手',
      '图书馆固定座位拥有者'
    ],
    suitableFor: '适合考研、考公、走学术道路',
    avoid: '千万别在TA考试前约出去玩',
    vector: {
      anxiety: 10,    // 焦虑指数拉满
      social: 3,      // 社交很少
      spending: 2,    // 不怎么消费
      sleep: 9,       // 经常熬夜
      outdoor: 1,     // 几乎不运动
      emotion: 9      // 情绪容易波动
    }
  },
  {
    id: 'WOOD',
    name: 'Woody型',
    slogan: '只要我够佛，焦虑就追不上我',
    description: '情绪极其稳定的佛系选手，天塌下来都不慌，从不内耗，说话声音小小，但电子产品样样精通。',
    traits: [
      '情绪稳定得像个机器人',
      '完全不知道焦虑是什么',
      '说话声音小，需要凑近听',
      '电子产品爱好者，设备齐全',
      '你们卷吧，我先睡了'
    ],
    suitableFor: '适合技术岗、程序员、任何需要耐心的工作',
    avoid: '不要和Bailyn型住一个宿舍',
    vector: {
      anxiety: 1,     // 完全不焦虑
      social: 4,      // 轻度社恐
      spending: 7,    // 钱都花在电子产品上
      sleep: 2,       // 作息极其规律
      outdoor: 2,     // 室内宅
      emotion: 1      // 情绪稳如狗
    }
  },
  {
    id: 'ISAB',
    name: 'Isabella型',
    slogan: '唱歌吃饭氪金，人生三大乐事',
    description: '可爱的小吃货，走到哪唱到哪，心情像过山车但快乐是常态。游戏里可以没钱但皮肤一定要有。',
    traits: [
      '走路都在哼歌，洗澡开个人演唱会',
      '可爱就是正义',
      '脑子里80%是今天吃什么',
      '游戏可以菜，但皮肤一定要好看',
      '情绪来得快去得也快'
    ],
    suitableFor: '适合文艺、创意类工作，或者做美食博主',
    avoid: '信用卡额度别设太高',
    vector: {
      anxiety: 5,     // 中度焦虑
      social: 8,      // 爱社交
      spending: 10,   // 氪金大户
      sleep: 5,       // 作息看心情
      outdoor: 4,     // 看情况出门
      emotion: 8      // 情绪波动大
    }
  },
  {
    id: 'ROBE',
    name: 'Robert型',
    slogan: '没有什么是一顿火锅解决不了的',
    description: '阳光运动型，足球场上最靓的仔，宿舍串门大使，人生信条：万物皆可配火锅。',
    traits: [
      '足球/篮球是生命的一部分',
      '每个宿舍都有TA的足迹',
      '去哪都能唠两句，社牛本牛',
      '问去哪吃？答案永远是火锅',
      '运动装备比衣服还多'
    ],
    suitableFor: '适合销售、公关、体育相关行业',
    avoid: '半夜不要约TA出去吃夜宵',
    vector: {
      anxiety: 3,     // 不怎么焦虑
      social: 10,     // 社交牛逼症
      spending: 6,    // 钱都花在吃上
      sleep: 4,       // 看第二天有没有球
      outdoor: 10,    // 户外运动达人
      emotion: 4      // 情绪比较稳定
    }
  }
];

// 移除Node.js模块导出
