const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userProfile: {
      avatar: '',
      nickname: '冥想者',
      signature: '每天冥想，提升专注力',
      gender: 0 // 0-未知, 1-男, 2-女
    },
    genderText: '未设置',
    themes: ['默认主题', '柔和主题', '深色主题'],
    themeIndex: 0,
    mainVolume: 80,
    envVolume: 80,
    reminderEnabled: false,
    reminderTime: '20:00',
    weeklyCountOptions: ['1次', '2次', '3次', '4次', '5次', '6次', '7次'],
    weeklyCountIndex: 4,
    weeklyDurationOptions: ['30分钟', '60分钟', '90分钟', '120分钟', '150分钟', '180分钟'],
    weeklyDurationIndex: 1,
    showNicknameModal: false,
    showSignatureModal: false,
    tempNickname: '',
    tempSignature: '',
    statusBarHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取状态栏高度设置自定义导航栏
    this.getStatusBarHeight();
    
    // 加载用户设置
    this.loadUserSettings();
    
    // 应用当前主题
    const theme = app.globalData.userSettings.theme;
    this.applyTheme(theme);
    
    // 应用当前音量设置
    const mainVolume = app.globalData.userSettings.mainVolume;
    const envVolume = app.globalData.userSettings.envVolume;
    this.applyVolumeSettings(mainVolume, envVolume);
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
   * 加载用户设置
   */
  loadUserSettings: function () {
    const userSettings = app.globalData.userSettings;
    const userProfile = app.globalData.userProfile;
    
    // 设置性别文本
    let genderText = '未设置';
    if (userProfile.gender === 1) {
      genderText = '男';
    } else if (userProfile.gender === 2) {
      genderText = '女';
    }
    
    // 设置主题索引
    let themeIndex = 0;
    if (userSettings.theme === 'soft') {
      themeIndex = 1;
    } else if (userSettings.theme === 'dark') {
      themeIndex = 2;
    }
    
    // 设置音量
    const mainVolume = userSettings.mainVolume * 100;
    const envVolume = userSettings.envVolume * 100;
    
    // 设置提醒
    const reminderEnabled = userSettings.reminder.enabled;
    const reminderTime = userSettings.reminder.time;
    
    // 设置冥想目标
    const weeklyCountIndex = userProfile.meditationGoal.weeklyCount - 1;
    const weeklyDurationIndex = Math.floor(userProfile.meditationGoal.weeklyDuration / 30) - 1;
    
    this.setData({
      userProfile,
      genderText,
      themeIndex,
      mainVolume,
      envVolume,
      reminderEnabled,
      reminderTime,
      weeklyCountIndex,
      weeklyDurationIndex
    });
  },

  /**
   * 返回上一页
   */
  goBack: function () {
    // 使用switchTab直接跳转到个人页面
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },

  /**
   * 修改头像
   */
  modifyAvatar: function () {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePath = res.tempFilePaths[0];
        const userProfile = that.data.userProfile;
        userProfile.avatar = tempFilePath;
        
        that.setData({
          userProfile: userProfile
        });
        
        // 保存用户信息
        app.globalData.userProfile = userProfile;
        app.saveUserProfile(userProfile);
        
        wx.showToast({
          title: '头像已更新',
          icon: 'success'
        });
      }
    });
  },

  /**
   * 修改昵称
   */
  modifyNickname: function () {
    this.setData({
      showNicknameModal: true,
      tempNickname: this.data.userProfile.nickname
    });
  },

  /**
   * 昵称输入处理
   */
  onNicknameInput: function (e) {
    this.setData({
      tempNickname: e.detail.value
    });
  },

  /**
   * 保存昵称
   */
  saveNickname: function () {
    const nickname = this.data.tempNickname.trim();
    
    if (nickname.length < 2) {
      wx.showToast({
        title: '昵称至少2个字符',
        icon: 'none'
      });
      return;
    }
    
    const userProfile = this.data.userProfile;
    userProfile.nickname = nickname;
    
    this.setData({
      userProfile: userProfile,
      showNicknameModal: false
    });
    
    // 保存用户信息
    app.globalData.userProfile = userProfile;
    app.saveUserProfile(userProfile);
    
    wx.showToast({
      title: '昵称已更新',
      icon: 'success'
    });
  },

  /**
   * 修改个性签名
   */
  modifySignature: function () {
    this.setData({
      showSignatureModal: true,
      tempSignature: this.data.userProfile.signature
    });
  },

  /**
   * 签名输入处理
   */
  onSignatureInput: function (e) {
    this.setData({
      tempSignature: e.detail.value
    });
  },

  /**
   * 保存个性签名
   */
  saveSignature: function () {
    const signature = this.data.tempSignature.trim();
    const userProfile = this.data.userProfile;
    userProfile.signature = signature;
    
    this.setData({
      userProfile: userProfile,
      showSignatureModal: false
    });
    
    // 保存用户信息
    app.globalData.userProfile = userProfile;
    app.saveUserProfile(userProfile);
    
    wx.showToast({
      title: '签名已更新',
      icon: 'success'
    });
  },

  /**
   * 修改性别
   */
  modifyGender: function () {
    const that = this;
    wx.showActionSheet({
      itemList: ['男', '女', '不设置'],
      success: function (res) {
        let gender = 0;
        let genderText = '未设置';
        
        if (res.tapIndex === 0) {
          gender = 1;
          genderText = '男';
        } else if (res.tapIndex === 1) {
          gender = 2;
          genderText = '女';
        }
        
        const userProfile = that.data.userProfile;
        userProfile.gender = gender;
        
        that.setData({
          userProfile: userProfile,
          genderText: genderText
        });
        
        // 保存用户信息
        app.globalData.userProfile = userProfile;
        app.saveUserProfile(userProfile);
      }
    });
  },

  /**
   * 切换主题
   */
  changeTheme: function (e) {
    const index = parseInt(e.detail.value);
    const themeMap = ['default', 'soft', 'dark'];
    const theme = themeMap[index];
    
    this.setData({
      themeIndex: index
    });
    
    // 保存主题设置
    const userSettings = app.globalData.userSettings;
    userSettings.theme = theme;
    app.globalData.userSettings = userSettings;
    app.saveUserSettings(userSettings);
    
    // 应用主题到全局
    this.applyTheme(theme);
    
    wx.showToast({
      title: '主题已更新',
      icon: 'success'
    });
  },

  /**
   * 应用主题到全局
   */
  applyTheme: function(theme) {
    // 将主题应用到全局样式变量
    if (theme === 'default') {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#FFFFFF'
      });
    } else if (theme === 'soft') {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#E8F4F8'
      });
    } else if (theme === 'dark') {
      wx.setNavigationBarColor({
        frontColor: '#FFFFFF',
        backgroundColor: '#333333'
      });
    }

    // 设置页面主题类（如果实现了动态主题切换）
    app.setGlobalTheme(theme);
  },

  /**
   * 调整主音量
   */
  changeMainVolume: function (e) {
    const volume = e.detail.value;
    
    this.setData({
      mainVolume: volume
    });
    
    // 保存音量设置
    const userSettings = app.globalData.userSettings;
    userSettings.mainVolume = volume / 100;
    app.globalData.userSettings = userSettings;
    app.saveUserSettings(userSettings);
    
    // 立即应用音量设置到全局
    this.applyVolumeSettings(userSettings.mainVolume, userSettings.envVolume);
  },

  /**
   * 调整环境音量
   */
  changeEnvVolume: function (e) {
    const volume = e.detail.value;
    
    this.setData({
      envVolume: volume
    });
    
    // 保存音量设置
    const userSettings = app.globalData.userSettings;
    userSettings.envVolume = volume / 100;
    app.globalData.userSettings = userSettings;
    app.saveUserSettings(userSettings);
    
    // 立即应用音量设置到全局
    this.applyVolumeSettings(userSettings.mainVolume, userSettings.envVolume);
  },

  /**
   * 应用音量设置到全局
   */
  applyVolumeSettings: function(mainVolume, envVolume) {
    // 如果当前有音频在播放，应用新的音量设置
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    if (backgroundAudioManager) {
      backgroundAudioManager.volume = mainVolume;
    }
    
    // 通知其他页面更新音量设置
    app.setGlobalVolume(mainVolume, envVolume);
  },

  /**
   * 切换提醒开关
   */
  toggleReminder: function (e) {
    const enabled = e.detail.value;
    
    this.setData({
      reminderEnabled: enabled
    });
    
    // 保存提醒设置
    const userSettings = app.globalData.userSettings;
    userSettings.reminder.enabled = enabled;
    app.globalData.userSettings = userSettings;
    app.saveUserSettings(userSettings);
    
    if (enabled) {
      // 请求通知权限
      wx.requestSubscribeMessage({
        tmplIds: ['YOUR_TEMPLATE_ID'], // 替换为你的模板ID
        success: (res) => {
          console.log('订阅消息结果', res);
        }
      });
    }
  },

  /**
   * 设置提醒时间
   */
  setReminderTime: function () {
    if (!this.data.reminderEnabled) return;
    
    const that = this;
    wx.showTimePickerView({
      value: that.data.reminderTime,
      success: function (res) {
        const time = res.value;
        
        that.setData({
          reminderTime: time
        });
        
        // 保存提醒时间设置
        const userSettings = app.globalData.userSettings;
        userSettings.reminder.time = time;
        app.globalData.userSettings = userSettings;
        app.saveUserSettings(userSettings);
        
        wx.showToast({
          title: '提醒时间已更新',
          icon: 'success'
        });
      }
    });
  },

  /**
   * 修改每周冥想次数
   */
  changeWeeklyCount: function (e) {
    const index = parseInt(e.detail.value);
    const count = index + 1;
    
    this.setData({
      weeklyCountIndex: index
    });
    
    // 保存冥想目标设置
    const userProfile = app.globalData.userProfile;
    userProfile.meditationGoal.weeklyCount = count;
    app.globalData.userProfile = userProfile;
    app.saveUserProfile(userProfile);
  },

  /**
   * 修改每周冥想时长
   */
  changeWeeklyDuration: function (e) {
    const index = parseInt(e.detail.value);
    const duration = (index + 1) * 30;
    
    this.setData({
      weeklyDurationIndex: index
    });
    
    // 保存冥想目标设置
    const userProfile = app.globalData.userProfile;
    userProfile.meditationGoal.weeklyDuration = duration;
    app.globalData.userProfile = userProfile;
    app.saveUserProfile(userProfile);
  },

  /**
   * 关闭所有弹窗
   */
  closeModal: function () {
    this.setData({
      showNicknameModal: false,
      showSignatureModal: false
    });
  },

  /**
   * 显示关于信息
   */
  showAbout: function () {
    wx.showModal({
      title: '关于冥想空间',
      content: '冥想空间是一款帮助用户放松身心、提升专注力的冥想应用。\n\n版本：1.0.0\n开发者：XXX团队',
      showCancel: false
    });
  },

  /**
   * 显示用户协议
   */
  showUserAgreement: function () {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    });
  },

  /**
   * 显示隐私政策
   */
  showPrivacyPolicy: function () {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    });
  },

  /**
   * 联系我们
   */
  contactUs: function () {
    wx.showModal({
      title: '联系我们',
      content: '如有任何问题或建议，请发送邮件至：\nsupport@example.com',
      showCancel: false
    });
  }
}) 