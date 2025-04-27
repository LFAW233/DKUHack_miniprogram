// app.js
App({
  globalData: {
    userInfo: null,
    systemInfo: null,
    meditationSettings: {
      defaultDuration: 15, // 默认冥想时长（分钟）
      reminderEnabled: true, // 冥想提醒开关
      reminderTime: '08:00', // 提醒时间
      theme: 'light', // 主题色
      soundEnabled: true, // 音效开关
      vibrationEnabled: true // 震动开关
    },
    meditationHistory: [],
    userSettings: {
      theme: 'default',
      mainVolume: 0.8,
      envVolume: 0.8,
      reminder: {
        enabled: false,
        time: '20:00',
        days: [0, 1, 2, 3, 4, 5, 6] // 周日到周六
      },
      dataDisplayMode: 'week',
      language: 'zh_CN'
    },
    userProfile: {
      avatar: '',
      nickname: '冥想者',
      signature: '每天冥想，提升专注力',
      gender: 0, // 0-未知, 1-男, 2-女
      birthdate: '',
      meditationGoal: {
        weeklyCount: 5,
        weeklyDuration: 75 // 分钟
      },
      meditationExp: 0,
      meditationLevel: 1,
      streakDays: 0,
      lastMeditationDate: '',
      todayExpGained: false
    }
  },
  
  onLaunch: function() {
    // 初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({
        env: 'development-xxx', // 替换为实际的云环境ID
        traceUser: true
      });
    }
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 获取用户信息
    this.getUserInfo();
    
    // 初始化示例冥想记录数据
    this.initExampleMeditationRecords();
    
    // 获取本地存储的冥想记录
    this.loadMeditationHistory();
    this.loadUserSettings();
    this.loadUserProfile();
    
    // 重置每日奖励状态
    this.resetDailyExpStatus();
  },
  
  // 获取系统信息
  getSystemInfo: function() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      this.globalData.systemInfo = systemInfo;
    } catch (e) {
      console.error('获取系统信息失败:', e);
    }
  },
  
  // 获取用户信息
  getUserInfo: function() {
    // 尝试从本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  
  // 初始化示例冥想记录数据
  initExampleMeditationRecords: function() {
    // 检查是否已有冥想记录
    const existingRecords = wx.getStorageSync('meditationRecords');
    if (existingRecords && existingRecords.length > 0) {
      return; // 如果已有记录，不创建示例数据
    }
    
    // 创建过去30天的随机冥想记录
    const now = new Date();
    const records = [];
    
    const meditationTypes = ['专注冥想', '慈悲冥想', '呼吸冥想', '行走冥想', '身体扫描'];
    const scenes = ['森林', '海岸', '草原', '雨声', '河流'];
    
    // 示例日记内容
    const diaryContents = [
      '今天的冥想特别顺利，感觉全身都很放松，思绪也变得清晰。',
      '刚开始有些分心，但慢慢找到了节奏，最后感觉很平静。',
      '冥想中突然意识到最近一直困扰我的问题其实可以这样解决...',
      '今天特别容易走神，需要继续练习。',
      '冥想时感受到了内心深处的平静，像湖面一样宁静。',
      '呼吸变得特别均匀，仿佛与自然融为一体。',
      '今天的冥想帮我释放了很多工作压力，感觉轻松了很多。',
      '意识到自己常常被未来的担忧所困扰，但冥想帮助我回到当下。',
      '发现专注于呼吸是让自己平静下来的最好方式。',
      ''  // 有些记录没有日记
    ];
    
    // 生成过去30天的随机记录
    for (let i = 0; i < 30; i++) {
      // 随机确定这一天是否有冥想记录
      if (Math.random() > 0.3) { // 70%的概率有记录
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        date.setHours(Math.floor(Math.random() * 12) + 6, Math.floor(Math.random() * 60), 0, 0);
        
        const typeIndex = Math.floor(Math.random() * meditationTypes.length);
        const sceneIndex = Math.floor(Math.random() * scenes.length);
        const duration = [5, 10, 15, 20, 30][Math.floor(Math.random() * 5)];
        const diaryIndex = Math.floor(Math.random() * diaryContents.length);
        
        records.push({
          id: `med_${Date.now()}_${i}`,
          type: meditationTypes[typeIndex],
          scene: scenes[sceneIndex],
          duration: duration,
          timestamp: date.getTime(),
          completed: true,
          notes: '',
          diary: diaryContents[diaryIndex] // 添加随机日记内容
        });
        
        // 有20%的概率同一天有多次冥想
        if (Math.random() > 0.8) {
          const secondDate = new Date(date);
          secondDate.setHours(secondDate.getHours() + 6);
          
          const secondTypeIndex = Math.floor(Math.random() * meditationTypes.length);
          const secondSceneIndex = Math.floor(Math.random() * scenes.length);
          const secondDuration = [5, 10, 15, 20, 30][Math.floor(Math.random() * 5)];
          const secondDiaryIndex = Math.floor(Math.random() * diaryContents.length);
          
          records.push({
            id: `med_${Date.now()}_${i}_2`,
            type: meditationTypes[secondTypeIndex],
            scene: scenes[secondSceneIndex],
            duration: secondDuration,
            timestamp: secondDate.getTime(),
            completed: true,
            notes: '',
            diary: diaryContents[secondDiaryIndex] // 添加随机日记内容
          });
        }
      }
    }
    
    // 存储示例记录
    wx.setStorageSync('meditationRecords', records);
  },
  
  // 保存冥想记录
  saveMeditationRecord: function(type, duration, scene) {
    const now = new Date();
    const today = this.formatDate(now);
    
    // 创建新的冥想记录
    const record = {
      id: `med_${Date.now()}`,
      type: type, // 'workday' 或 'restday'
      duration: duration, // 分钟
      scene: scene || null,
      timestamp: now.getTime(),
      completed: true,
      notes: '',
      diary: '' // 添加冥想日记字段
    };
    
    // 添加到冥想历史记录
    this.globalData.meditationHistory.push(record);
    
    // 只保留最近30条记录
    if (this.globalData.meditationHistory.length > 30) {
      this.globalData.meditationHistory.shift();
    }
    
    // 保存到本地存储
    wx.setStorageSync('meditationHistory', this.globalData.meditationHistory);
    
    // 更新冥想经验和等级
    this.updateMeditationExpAndLevel(today, duration);
    
    // 返回新创建的记录
    return record;
  },
  
  // 更新冥想经验和等级
  updateMeditationExpAndLevel: function(today, duration) {
    const userProfile = this.globalData.userProfile;
    let expGained = 0;
    
    // 基础经验值：每分钟1点经验
    expGained += duration;
    
    // 检查是否是连续冥想，并计算连续天数奖励
    const lastDate = userProfile.lastMeditationDate;
    const yesterday = this.getYesterdayDate();
    
    // 更新连续天数
    if (lastDate === yesterday) {
      // 昨天冥想过，连续天数+1
      userProfile.streakDays += 1;
    } else if (lastDate !== today) {
      // 不是连续的，重置为1
      userProfile.streakDays = 1;
    }
    
    // 如果今天还没获取过连续冥想奖励，则根据连续天数获取奖励
    if (!userProfile.todayExpGained && lastDate !== today) {
      const streakDays = userProfile.streakDays;
      
      // 根据连续天数给予额外经验值
      if (streakDays >= 1 && streakDays <= 2) {
        expGained += 10;
      } else if (streakDays >= 3 && streakDays <= 5) {
        expGained += 15;
      } else if (streakDays >= 6 && streakDays <= 10) {
        expGained += 20;
      } else if (streakDays >= 11 && streakDays <= 20) {
        expGained += 25;
      } else if (streakDays >= 21) {
        expGained += 30;
      }
      
      // 标记今天已获取奖励
      userProfile.todayExpGained = true;
    }
    
    // 更新最后冥想日期
    userProfile.lastMeditationDate = today;
    
    // 更新总经验值
    userProfile.meditationExp += expGained;
    
    // 计算冥想等级（每500经验升一级）
    userProfile.meditationLevel = Math.floor(userProfile.meditationExp / 500) + 1;
    
    // 保存更新后的用户信息
    this.globalData.userProfile = userProfile;
    this.saveUserProfile(userProfile);
    
    // 返回获得的经验值，用于显示提示
    return expGained;
  },
  
  // 格式化日期为 YYYY-MM-DD
  formatDate: function(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 获取昨天的日期字符串 YYYY-MM-DD
  getYesterdayDate: function() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.formatDate(yesterday);
  },
  
  // 重置每日奖励状态（在每天第一次打开应用时调用）
  resetDailyExpStatus: function() {
    const today = this.formatDate(new Date());
    const lastDate = this.globalData.userProfile.lastMeditationDate;
    
    // 如果最后冥想日期不是今天，重置今日奖励获取状态
    if (lastDate !== today) {
      this.globalData.userProfile.todayExpGained = false;
      this.saveUserProfile(this.globalData.userProfile);
    }
  },
  
  // 加载冥想记录
  loadMeditationHistory: function() {
    const history = wx.getStorageSync('meditationHistory');
    if (history) {
      this.globalData.meditationHistory = history;
    }
  },
  
  // 保存用户设置
  saveUserSettings: function(settings) {
    this.globalData.userSettings = settings;
    wx.setStorageSync('userSettings', settings);
  },
  
  // 加载用户设置
  loadUserSettings: function() {
    const settings = wx.getStorageSync('userSettings');
    if (settings) {
      this.globalData.userSettings = settings;
    }
  },
  
  // 保存用户个人资料
  saveUserProfile: function(profile) {
    this.globalData.userProfile = profile;
    wx.setStorageSync('userProfile', profile);
  },
  
  // 加载用户个人资料
  loadUserProfile: function() {
    const profile = wx.getStorageSync('userProfile');
    if (profile) {
      this.globalData.userProfile = profile;
    }
  },
  
  // 设置全局主题
  setGlobalTheme: function(theme) {
    this.globalData.userSettings.theme = theme;
    
    // 更新所有页面的主题
    const pages = getCurrentPages();
    for (let i = 0; i < pages.length; i++) {
      const pageInstance = pages[i];
      if (pageInstance && typeof pageInstance.onThemeChange === 'function') {
        pageInstance.onThemeChange(theme);
      }
    }
    
    // 保存主题设置
    wx.setStorageSync('userSettings', this.globalData.userSettings);
  },
  
  // 设置全局音量
  setGlobalVolume: function(mainVolume, envVolume) {
    this.globalData.userSettings.mainVolume = mainVolume;
    this.globalData.userSettings.envVolume = envVolume;
    
    // 更新所有页面的音量设置
    const pages = getCurrentPages();
    for (let i = 0; i < pages.length; i++) {
      const pageInstance = pages[i];
      if (pageInstance && typeof pageInstance.onVolumeChange === 'function') {
        pageInstance.onVolumeChange(mainVolume, envVolume);
      }
    }
    
    // 保存音量设置
    wx.setStorageSync('userSettings', this.globalData.userSettings);
  },
  
  // 获取冥想统计数据
  getMeditationStats: function() {
    const history = this.globalData.meditationHistory;
    const userProfile = this.globalData.userProfile;
    
    if (!history || history.length === 0) {
      return {
        totalCount: 0,
        totalDuration: 0,
        weeklyCount: 0,
        weeklyDuration: 0,
        monthlyCount: 0,
        monthlyDuration: 0,
        streakDays: userProfile.streakDays || 0,
        favoriteType: null,
        meditationExp: userProfile.meditationExp || 0,
        meditationLevel: userProfile.meditationLevel || 1,
        // 添加等级进度信息
        nextLevelExp: (userProfile.meditationLevel || 1) * 500,
        currentLevelExp: userProfile.meditationExp || 0,
        levelProgress: ((userProfile.meditationExp || 0) % 500) / 500
      };
    }
    
    // 当前日期
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayTime = today.getTime();
    
    // 一周前
    const weekAgo = new Date(todayTime - 7 * 24 * 60 * 60 * 1000);
    // 一月前
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
    // 总计
    let totalCount = history.length;
    let totalDuration = 0;
    
    // 周数据
    let weeklyCount = 0;
    let weeklyDuration = 0;
    
    // 月数据
    let monthlyCount = 0;
    let monthlyDuration = 0;
    
    // 类型统计
    const typeCount = {
      workday: 0,
      restday: 0
    };
    
    // 日期映射，用于计算连续天数
    const dateMap = {};
    
    history.forEach(record => {
      // 总时长
      totalDuration += record.duration;
      
      // 记录类型
      if (record.type in typeCount) {
        typeCount[record.type]++;
      }
      
      // 计算日期
      const recordDate = new Date(record.timestamp);
      const dateStr = this.formatDate(recordDate);
      
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = true;
      }
      
      // 周数据
      if (recordDate >= weekAgo) {
        weeklyCount++;
        weeklyDuration += record.duration;
      }
      
      // 月数据
      if (recordDate >= monthAgo) {
        monthlyCount++;
        monthlyDuration += record.duration;
      }
    });
    
    // 计算最喜欢的类型
    let favoriteType = null;
    if (typeCount.workday > typeCount.restday) {
      favoriteType = 'workday';
    } else if (typeCount.restday > typeCount.workday) {
      favoriteType = 'restday';
    } else if (typeCount.workday > 0) {
      // 如果两种类型的次数相同，则选择最近一次使用的类型
      favoriteType = history[history.length - 1].type;
    }
    
    // 获取等级信息
    const meditationExp = userProfile.meditationExp || 0;
    const meditationLevel = userProfile.meditationLevel || 1;
    const nextLevelExp = meditationLevel * 500;
    const levelProgress = (meditationExp % 500) / 500;
    
    return {
      totalCount,
      totalDuration,
      weeklyCount,
      weeklyDuration,
      monthlyCount,
      monthlyDuration,
      streakDays: userProfile.streakDays || 0,
      favoriteType,
      meditationExp,
      meditationLevel,
      nextLevelExp,
      currentLevelExp: meditationExp,
      levelProgress
    };
  }
});
