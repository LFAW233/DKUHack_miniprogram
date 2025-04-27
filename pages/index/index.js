// index.js
const app = getApp()

// 冥想名言库
const meditationQuotes = [
  { text: "冥想不是逃避，而是与自己相遇", author: "乔恩·卡巴特-津恩" },
  { text: "冥想是内在宁静的艺术", author: "达赖喇嘛" },
  { text: "呼吸是连接身体与心灵的桥梁", author: "提奇·纳特·汉" },
  { text: "静坐中发现真正的自己", author: "埃克哈特·托尔" },
  { text: "正念是活在当下的艺术", author: "乔恩·卡巴特-津恩" },
  { text: "内心的平静来自于接受而非抗拒", author: "埃克哈特·托尔" },
  { text: "存在的最大礼物就是当下的时刻", author: "埃克哈特·托尔" },
  { text: "在意识的深处发现宁静", author: "拉玛纳·马哈希" },
  { text: "冥想是心灵回家的旅程", author: "奥修" },
  { text: "每一次呼吸都是新的开始", author: "提奇·纳特·汉" },
  { text: "通过静坐，你可以在混乱中发现平静", author: "巴巴·拉姆·达斯" },
  { text: "我们所寻找的宝藏就在内心深处", author: "鲁米" },
  { text: "心灵就像水，当它平静时，能够映照一切", author: "老子" },
  { text: "冥想不是控制思想，而是不被思想控制", author: "佛陀" },
  { text: "当内心平静，外界的纷扰无法扰乱你", author: "孔子" },
  { text: "你不是你的思想，你是观察思想的意识", author: "埃克哈特·托尔" },
  { text: "每一刻都是开始冥想的完美时刻", author: "莎伦·萨尔兹伯格" },
  { text: "冥想让你清晰地看到思想与情绪的真相", author: "杰克·康菲尔德" },
  { text: "真正的宁静来自内心而非外界", author: "达摩" },
  { text: "当你学会观察而非参与你的思想，你就找到了自由", author: "克里希那穆提" },
  { text: "保持正念，你将发现内心的宝藏", author: "提奇·纳特·汉" },
  { text: "通过冥想我们可以培养自我接纳和慈悲", author: "帕玛·丘卓" },
  { text: "冥想不是逃避现实，而是直面现实的勇气", author: "奥修" },
  { text: "正念是充分感受生命的方式", author: "乔恩·卡巴特-津恩" },
  { text: "坐禅时，只需坐禅", author: "铃木俊隆" },
  { text: "冥想的本质是超越思想回归本我", author: "佛陀" },
  { text: "把注意力放在呼吸上，你将找到平静", author: "提奇·纳特·汉" },
  { text: "每日冥想是内心的沐浴", author: "莫妮卡·德拉可斯" },
  { text: "观察而不评判，是通往内在自由的钥匙", author: "杰克·康菲尔德" },
  { text: "通过专注于现在，你可以发现无尽的力量", author: "埃克哈特·托尔" },
  { text: "在冥想中，我们学会与自己和解", author: "佩玛·丘卓" },
  { text: "当下的平静是我们最大的财富", author: "提奇·纳特·汉" },
  { text: "思想如云，冥想者如天空", author: "奥修" },
  { text: "内在的寂静蕴含无尽的智慧", author: "老子" },
  { text: "正念不是思考，而是觉知", author: "乔恩·卡巴特-津恩" },
  { text: "冥想教会我们如何与生命本身共舞", author: "鲁米" },
  { text: "安住当下，活在此刻", author: "提奇·纳特·汉" },
  { text: "最大的觉醒来自于静默", author: "埃克哈特·托尔" },
  { text: "冥想是一种无为的行动", author: "老子" },
  { text: "不是让思想停止，而是停止追逐思想", author: "佛陀" },
  { text: "内在的平静是无法从外界获得的", author: "拉玛纳·马哈希" },
  { text: "放下所有的概念，直接体验生命", author: "克里希那穆提" },
  { text: "冥想是回归本源的旅程", author: "奥修" },
  { text: "通过冥想，我们能看到自己思想的真相", author: "帕玛·丘卓" },
  { text: "真正的宁静是内心的自然状态", author: "拉玛纳·马哈希" },
  { text: "冥想是一种回归家园的感觉", author: "沙龙·萨尔兹伯格" },
  { text: "觉知的力量超越了思想的力量", author: "埃克哈特·托尔" },
  { text: "在冥想中，找到内在的宁静中心", author: "杰克·康菲尔德" },
  { text: "在沉默中，我们发现真正的自己", author: "鲁米" },
  { text: "每一次呼吸都是与当下连接的桥梁", author: "提奇·纳特·汉" },
  { text: "通过关注呼吸，我们能安住于当下", author: "乔恩·卡巴特-津恩" }
];

Page({
  data: {
    stats: {
      days: 0,
      minutes: 0,
      sessions: 0
    },
    quote: {
      text: "冥想不是逃避，而是与自己相遇",
      author: "乔恩·卡巴特-津恩"
    },
    needRefreshQuote: false
  },
  
  onLoad: function() {
    this.updatePageData();
  },
  
  onShow: function() {
    this.updatePageData();
  },
  
  onHide: function() {
    this.setData({
      needRefreshQuote: true
    });
  },
  
  onTabItemTap: function(item) {
    if(this.data.needRefreshQuote) {
      this.getDailyQuote();
      this.setData({
        needRefreshQuote: false
      });
    }
  },
  
  // 更新页面所有数据
  updatePageData: function() {
    this.updateStats();
    this.getDailyQuote();
  },
  
  // 更新统计数据
  updateStats: function() {
    const app = getApp();
    const history = app.globalData.meditationHistory;
    
    if (!history) {
      console.error('无法获取冥想历史记录');
      return;
    }
    
    // 初始化统计数据
    let stats = {
      days: 0,
      minutes: 0,
      sessions: history.length
    };
    
    // 使用Set存储不重复的日期
    const uniqueDays = new Set();
    
    // 遍历历史记录计算统计数据
    history.forEach(record => {
      if (record) {
        // 累加冥想时长
        if (record.duration) {
          stats.minutes += record.duration;
        }
        
        // 记录冥想日期
        if (record.timestamp) {
          const dateStr = this.formatDate(new Date(record.timestamp));
          uniqueDays.add(dateStr);
        }
      }
    });
    
    // 更新冥想天数
    stats.days = uniqueDays.size;
    
    // 更新页面数据
    this.setData({ stats });
    
    // 同步更新全局数据
    if (app.globalData.userProfile) {
      app.globalData.userProfile.totalMeditationDays = stats.days;
      app.globalData.userProfile.totalMeditationMinutes = stats.minutes;
      app.globalData.userProfile.totalMeditationSessions = stats.sessions;
    }
  },
  
  // 格式化日期为 YYYY-MM-DD
  formatDate: function(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 跳转到工作日冥想页面
  navigateToWorkday: function() {
    wx.navigateTo({
      url: '../workday/workday'
    })
  },
  
  // 跳转到休息日冥想页面
  navigateToRestday: function() {
    wx.navigateTo({
      url: '../restday/restday'
    })
  },
  
  // 获取每日名言
  getDailyQuote: function() {
    const randomIndex = Math.floor(Math.random() * meditationQuotes.length);
    const randomQuote = meditationQuotes[randomIndex];
    
    this.setData({
      quote: randomQuote
    });
  }
})
