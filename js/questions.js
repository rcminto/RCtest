/**
 * 大学生人格测试题库
 * 精准匹配四类人：Bailyn, Woody, Isabella, Robert
 */

const QUESTIONS = [
  {
    id: 1,
    text: '期末考试前一周，你的状态是？',
    options: [
      {
        text: '已经复习三轮了，每晚学到凌晨',
        dimensions: { anxiety: 3, sleep: 3, outdoor: -2 }
      },
      {
        text: '不急，还有一周呢，先开把游戏',
        dimensions: { anxiety: -2, spending: 2, sleep: -1 }
      },
      {
        text: '先约朋友吃顿好的，吃饱了才有力气复习',
        dimensions: { social: 2, spending: 2, outdoor: 1 }
      },
      {
        text: '正常作息，按计划复习，慌什么？',
        dimensions: { anxiety: -2, emotion: -2, sleep: -2 }
      }
    ]
  },
  {
    id: 2,
    text: '老师突然说要点名，你的第一反应？',
    options: [
      {
        text: '什么？！我人已经在路上了！',
        dimensions: { anxiety: 3, emotion: 2, sleep: 1 }
      },
      {
        text: '哦，知道了',
        dimensions: { anxiety: -2, emotion: -2 }
      },
      {
        text: '有没有同学帮我答个到？',
        dimensions: { social: 2, outdoor: 1 }
      },
      {
        text: '还好我本来就要去上课',
        dimensions: { anxiety: 1, sleep: 1 }
      }
    ]
  },
  {
    id: 3,
    text: '这个月生活费还剩不少，你会？',
    options: [
      {
        text: '买最新出的游戏皮肤/耳机/键盘！',
        dimensions: { spending: 3, outdoor: -1 }
      },
      {
        text: '必须搓顿好的，火锅/烤肉安排上',
        dimensions: { spending: 2, social: 2, outdoor: 1 }
      },
      {
        text: '存起来，万一要买什么复习资料呢',
        dimensions: { spending: -2, anxiety: 1 }
      },
      {
        text: '放着呗，反正也花不完',
        dimensions: { spending: -1, emotion: -1 }
      }
    ]
  },
  {
    id: 4,
    text: '周末没课，你通常在干嘛？',
    options: [
      {
        text: '图书馆从早待到闭馆',
        dimensions: { anxiety: 2, outdoor: -3, social: -2 }
      },
      {
        text: '宿舍躺平，听歌打游戏看剧',
        dimensions: { outdoor: -2, spending: 1, emotion: 0 }
      },
      {
        text: '球场/操场挥洒汗水',
        dimensions: { outdoor: 3, social: 2, anxiety: -1 }
      },
      {
        text: '挨个串宿舍，哪里有人哪里凑',
        dimensions: { social: 3, outdoor: 1, spending: 1 }
      }
    ]
  },
  {
    id: 5,
    text: '洗澡的时候，你会？',
    options: [
      {
        text: '脑子里在复盘今天学的知识点',
        dimensions: { anxiety: 2, sleep: 1 }
      },
      {
        text: '开个人演唱会，从流行唱到经典',
        dimensions: { emotion: 2, social: 1, outdoor: 0 }
      },
      {
        text: '安安静静快速洗完',
        dimensions: { emotion: -2, social: -1 }
      },
      {
        text: '和隔壁洗澡的同学唠两句',
        dimensions: { social: 2, emotion: 1 }
      }
    ]
  },
  {
    id: 6,
    text: '小组作业要交了，队友还没动静，你会？',
    options: [
      {
        text: '疯狂@所有人！完了完了要来不及了！',
        dimensions: { anxiety: 3, emotion: 2, social: 1 }
      },
      {
        text: '没事，截止日期前总会有人做的',
        dimensions: { anxiety: -3, emotion: -2 }
      },
      {
        text: '私戳每个人问问进度，实在不行我来兜底',
        dimensions: { social: 2, anxiety: 1, sleep: 1 }
      },
      {
        text: '先约大家吃个饭，边吃边聊进度',
        dimensions: { social: 3, spending: 2, anxiety: -1 }
      }
    ]
  },
  {
    id: 7,
    text: '遇到不开心的事，你怎么排解？',
    options: [
      {
        text: '化悲愤为食欲，吃顿好的就好了',
        dimensions: { spending: 2, emotion: 2, social: 1 }
      },
      {
        text: '去球场/操场发泄一通',
        dimensions: { outdoor: 3, emotion: 1, anxiety: -1 }
      },
      {
        text: '更努力学习！把悲伤化为动力',
        dimensions: { anxiety: 2, sleep: 2, outdoor: -2 }
      },
      {
        text: '睡一觉就好了，天塌下来有高个子顶着',
        dimensions: { anxiety: -2, emotion: -2, sleep: -1 }
      }
    ]
  },
  {
    id: 8,
    text: '你的微信聊天界面，最多的是？',
    options: [
      {
        text: '各种课程群、学习交流群',
        dimensions: { anxiety: 2, social: 0, sleep: 1 }
      },
      {
        text: '游戏开黑群、技术交流群',
        dimensions: { spending: 2, outdoor: -1, social: 1 }
      },
      {
        text: '班级群、社团群、几十个好友私聊',
        dimensions: { social: 3, outdoor: 2, emotion: 1 }
      },
      {
        text: '不多，就几个常聊的，安安静静',
        dimensions: { social: -2, emotion: -2, spending: -1 }
      }
    ]
  },
  {
    id: 9,
    text: '凌晨12点，你还没睡的原因通常是？',
    options: [
      {
        text: '这章知识点还没看完，再学半小时',
        dimensions: { sleep: 3, anxiety: 2, outdoor: -1 }
      },
      {
        text: '打游戏/刷视频，不知不觉就这点了',
        dimensions: { sleep: 2, spending: 1, outdoor: -1 }
      },
      {
        text: '刚和朋友从外面嗨完回来',
        dimensions: { social: 3, outdoor: 2, spending: 1 }
      },
      {
        text: '我作息规律，12点前已经睡了',
        dimensions: { sleep: -3, anxiety: -1, emotion: -1 }
      }
    ]
  },
  {
    id: 10,
    text: '朋友叫你出去吃饭，第一反应？',
    options: [
      {
        text: '等等，我先看看今天的学习计划完没完成',
        dimensions: { anxiety: 2, social: -1, sleep: 1 }
      },
      {
        text: '可以啊，去哪吃？火锅吗？',
        dimensions: { social: 2, spending: 2, outdoor: 1 }
      },
      {
        text: '行，但我得先把这局打完',
        dimensions: { spending: 2, social: 1, outdoor: -1 }
      },
      {
        text: '嗯...也行吧',
        dimensions: { social: 0, emotion: -1, spending: 0 }
      }
    ]
  },
  {
    id: 11,
    text: '考试成绩出来了，比预期低一点，你会？',
    options: [
      {
        text: '天呐我要挂科了！完了完了GPA要掉了！',
        dimensions: { anxiety: 3, emotion: 3, sleep: 2 }
      },
      {
        text: '没事，还有下次，及格就行',
        dimensions: { anxiety: -3, emotion: -2, sleep: -2 }
      },
      {
        text: '走，吃顿好的压压惊',
        dimensions: { social: 2, spending: 2, anxiety: -1 }
      },
      {
        text: '先找老师求求情，然后约球发泄一下',
        dimensions: { outdoor: 2, social: 2, anxiety: 0 }
      }
    ]
  },
  {
    id: 12,
    text: '你觉得大学四年最重要的是什么？',
    options: [
      {
        text: '当然是学习！GPA、奖学金、保研！',
        dimensions: { anxiety: 2, sleep: 2, outdoor: -2 }
      },
      {
        text: '开心最重要，怎么舒服怎么来',
        dimensions: { anxiety: -2, emotion: 0, spending: 1 }
      },
      {
        text: '多认识朋友，多出去看看世界',
        dimensions: { social: 3, outdoor: 2, anxiety: -1 }
      },
      {
        text: '升级装备，玩遍想玩的游戏',
        dimensions: { spending: 3, outdoor: -2, social: 1 }
      }
    ]
  }
];

// 移除Node.js模块导出
