// 获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '/assets/images/default-avatar.jpg',
      nickName: '点击登录',
      level: 1
    },
    currentTimeRange: 'week',  // 'week', 'month', 'year', 'all'
    currentStats: {
      totalSessions: 0,
      totalMinutes: 0,
      streakDays: 0,
      totalDays: 0
    },
    totalStats: {
      meditationExp: 0,
      meditationLevel: 1,
      levelProgress: 0,
      nextLevelExp: 500,
      totalMeditationDays: 0
    },
    statusBarHeight: 0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取状态栏高度
    this.getStatusBarHeight();
    
    this.loadUserInfo();
    this.loadUserStats('week');
  },
  
  /**
   * 获取状态栏高度
   */
  getStatusBarHeight: function() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    });
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 每次页面显示时更新数据
    this.loadUserInfo();
    this.loadUserStats(this.data.currentTimeRange);
  },
  
  /**
   * 加载用户信息
   */
  loadUserInfo: function() {
    // 获取用户信息和冥想统计数据
    const app = getApp();
    const userProfile = app.globalData.userProfile;
    const stats = app.getMeditationStats();
    
    // 构建用户信息
    const userInfo = {
      avatarUrl: userProfile.avatar || '/assets/images/default-avatar.jpg',
      nickName: userProfile.nickname || '冥想用户',
      level: userProfile.meditationLevel || 1
    };
    
    // 构建总体统计数据
    const totalStats = {
      meditationExp: stats.meditationExp,
      meditationLevel: stats.meditationLevel,
      levelProgress: stats.levelProgress,
      nextLevelExp: stats.nextLevelExp,
      totalMeditationDays: stats.totalDays
    };
    
    this.setData({
      userInfo,
      totalStats
    });
  },
  
  /**
   * 切换时间范围统计数据
   */
  switchTimeRange: function(e) {
    const range = e.currentTarget.dataset.range;
    this.setData({
      currentTimeRange: range
    });
    
    this.loadUserStats(range);
  },
  
  /**
   * 加载用户统计数据
   */
  loadUserStats: function(range) {
    const app = getApp();
    const history = app.globalData.meditationHistory;
    
    // 计算不同时间范围的统计数据
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // 根据范围计算起始日期
    let startDate;
    switch(range) {
      case 'week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'all':
      default:
        startDate = new Date(0); // 从1970年开始
        break;
    }
    
    // 筛选时间范围内的冥想记录
    const filteredHistory = history.filter(record => {
      const recordDate = new Date(record.timestamp);
      return recordDate >= startDate;
    });
    
    // 计算总冥想次数
    const totalSessions = filteredHistory.length;
    
    // 计算总冥想时长（分钟）
    const totalMinutes = filteredHistory.reduce((sum, record) => {
      return sum + (record.duration || 0);
    }, 0);
    
    // 获取冥想日期集合
    const daysMap = this.countDaysInRange(history, range);
    
    // 计算冥想天数
    const totalDays = Object.keys(daysMap).length;
    
    // 计算连续冥想天数
    const stats = app.getMeditationStats();
    const streakDays = stats.streakDays;
    
    this.setData({
      currentStats: {
        totalSessions,
        totalMinutes,
        streakDays,
        totalDays
      }
    });
  },
  
  /**
   * 统计指定时间范围内的冥想天数
   */
  countDaysInRange: function(history, range) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // 根据范围计算起始日期
    let startDate;
    switch(range) {
      case 'week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'all':
      default:
        startDate = new Date(0); // 从1970年开始
        break;
    }
    
    // 统计天数
    const daysMap = {};
    history.forEach(record => {
      const recordDate = new Date(record.timestamp);
      if (recordDate >= startDate) {
        const dateStr = this.formatDate(recordDate);
        daysMap[dateStr] = true;
      }
    });
    
    return daysMap;
  },
  
  /**
   * 格式化日期为 YYYY-MM-DD
   */
  formatDate: function(date) {
    const app = getApp();
    return app.formatDate(date);
  },
  
  /**
   * 查看用户设置
   */
  viewUserInfo: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  /**
   * 导航到首页
   */
  goToIndex: function() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  /**
   * 导航到个人中心页面
   */
  goToProfile: function() {
    // 已经在个人中心页面，不需要导航
  },

  /**
   * 导航到工作日冥想页面
   */
  goToWorkday: function() {
    wx.navigateTo({
      url: '/pages/workday/workday'
    });
  },

  /**
   * 导航到休息日冥想页面
   */
  goToRestday: function() {
    wx.navigateTo({
      url: '/pages/restday/restday'
    });
  },

  /**
   * 导航到冥想日记页面
   */
  goToMeditationDiary: function() {
    wx.navigateTo({
      url: '/pages/meditation_diary/meditation_diary'
    });
  }
}); 