// 工作日冥想数据
const MEDITATION_DATA = {
  morning: {
    title: "晨间冥想",
    audio: 'meditation_background.m4a',
    guidance: [
      "深呼吸，感受新的一天开始了。",
      "每一次呼吸，都是新的开始。",
      "感受你的身体，从头顶到脚尖。",
      "接纳这一刻的感受，无论是愉悦还是困倦。",
      "想象阳光温暖地照在你的身上。",
      "设定今天的意图，你想如何度过这一天？"
    ],
    questions: [
      "今天，我最想完成的一件事是什么？",
      "我希望今天保持怎样的心态？",
      "今天我可以为自己做些什么？"
    ]
  },
  forenoon: {
    title: "上午冥想",
    audio: 'meditation_background.m4a',
    guidance: [
      "注意你此刻的呼吸，深而平稳。",
      "感受气息流经你的身体，带来清新的能量。",
      "放下所有任务和压力，只留在当下。",
      "感受你的心跳，稳定而有力。",
      "释放任何紧张或焦虑，让身心回归平静。",
      "每一次呼吸，都让你更加清醒和专注。"
    ],
    questions: [
      "上午的工作中，我做得最好的是什么？",
      "有什么任务让我感到特别有成就感？",
      "我如何保持剩余工作时间的专注和效率？"
    ]
  },
  afternoon: {
    title: "午后冥想",
    audio: 'meditation_background.m4a',
    guidance: [
      "让我们暂时放下工作的思绪。",
      "深呼吸，感受午后的平静。",
      "放松你的肩膀，放松你的面部肌肉。",
      "觉察身体有没有任何不适，并温柔地接纳它。",
      "想象温暖的阳光照在你身上，带来放松和舒适。",
      "每一次呼吸，都带走疲惫，带来新的能量。"
    ],
    questions: [
      "我的身体现在需要什么？是休息、伸展还是活动？",
      "下午的工作中，我想要重点关注什么？",
      "有什么小习惯可以帮助我保持下午的能量？"
    ]
  },
  evening: {
    title: "傍晚冥想",
    audio: 'meditation_background.m4a',
    guidance: [
      "今天的工作即将结束，让我们回顾这一天。",
      "深呼吸，感受一天的经历在体内沉淀。",
      "接纳今天所有的情绪和感受，无论是满足还是挫折。",
      "放下工作中的思绪，准备回归自己的生活。",
      "感谢自己今天所做的一切努力。",
      "想象你正在释放一天的疲惫，准备迎接宁静的夜晚。"
    ],
    questions: [
      "今天有什么值得感恩的事情？",
      "我从今天的工作中学到了什么？",
      "明天，我想要做出哪些改变或坚持什么？"
    ]
  }
};

// 冥想音频管理
const backgroundAudio = wx.createInnerAudioContext();
backgroundAudio.loop = true;

const app = getApp();

Page({
  data: {
    step: 'time_selection', // time_selection, meditation
    timeOptions: [
      { id: 'morning', label: '晨间冥想', time: '06:00-09:00', icon: 'meditation' },
      { id: 'forenoon', label: '上午专注冥想', time: '09:00-12:00', icon: 'meditation' },
      { id: 'afternoon', label: '午后恢复冥想', time: '13:00-17:00', icon: 'meditation' },
      { id: 'evening', label: '傍晚放松冥想', time: '18:00-22:00', icon: 'meditation' }
    ],
    currentTime: 'morning',
    currentGuidance: '',
    currentQuestion: '',
    isPlaying: false,
    progress: 0,
    totalDuration: 300, // 5分钟冥想
    elapsedTime: 0,
    guidanceIndex: 0,
    showQuestion: false,
    timerMode: 'countdown', // countdown, stopwatch
    audioSettings: {
      backgroundVolume: 0.5
    },
    hideControls: false, // 无干扰模式标志
    isMuted: false, // 添加静音状态标志
    playButtonImage: '/assets/icons/play.png', // 默认显示播放图标
    currentPeriod: '',
    title: '',
    currentGuidanceIndex: 0,
    currentQuestionIndex: 0,
    totalTime: 600, // 默认10分钟
    timeDisplay: '00:00',
    completedModal: false,
    timerDisplay: '00:00'
  },
  
  onLoad: function() {
    // 根据当前时间自动选择适合的冥想
    this.selectTimeBasedOnCurrent();
    
    // 预加载音频资源
    this.preloadAudios();
    
    // 初始化音频事件监听
    this.initAudioListeners();
  },
  
  onUnload: function() {
    this.stopMeditation();
    // 移除音频事件监听
    this.removeAudioListeners();
  },
  
  // 初始化音频事件监听
  initAudioListeners: function() {
    backgroundAudio.onError((res) => {
      console.error('音频播放错误:', res);
      wx.showToast({
        title: '音频加载失败，请重试',
        icon: 'none'
      });
      
      // 重置播放状态但不重置冥想进度
      this.setData({
        isPlaying: false,
        playButtonImage: '/assets/icons/play.png'
      });
    });
    
    backgroundAudio.onEnded(() => {
      // 循环播放失效时的处理
      if (!backgroundAudio.loop) {
        backgroundAudio.play();
      }
    });
  },
  
  // 移除音频事件监听
  removeAudioListeners: function() {
    backgroundAudio.offError();
    backgroundAudio.offEnded();
    backgroundAudio.offCanplay();
  },
  
  // 预加载音频资源
  preloadAudios: function() {
    console.log('预加载音频资源');
    
    // 验证音频文件是否存在
    wx.getFileSystemManager().access({
      path: '/assets/audio/meditation_background.m4a',
      success: () => {
        console.log('音频文件存在');
      },
      fail: (err) => {
        console.error('音频文件不存在或无法访问:', err);
      }
    });
  },
  
  // 根据当前时间选择冥想时段
  selectTimeBasedOnCurrent: function() {
    const now = new Date();
    const hour = now.getHours();
    
    let timeOfDay = 'morning';
    
    if (hour >= 6 && hour < 9) {
      timeOfDay = 'morning';
    } else if (hour >= 9 && hour < 13) {
      timeOfDay = 'forenoon';
    } else if (hour >= 13 && hour < 18) {
      timeOfDay = 'afternoon';
    } else {
      timeOfDay = 'evening';
    }
    
    this.setData({
      currentTime: timeOfDay
    });
  },
  
  // 选择冥想时段
  selectTime: function(e) {
    const time = e.currentTarget.dataset.time;
    
    // 如果正在冥想，需要先停止
    if (this.data.isPlaying) {
      this.stopMeditation();
    }
    
    this.setData({
      currentTime: time
    });
  },
  
  // 开始冥想
  startMeditation: function() {
    const timeOfDay = this.data.currentTime;
    const meditationData = MEDITATION_DATA[timeOfDay];
    
    // 设置背景音频
    backgroundAudio.src = '/assets/audio/meditation_background.m4a';
    backgroundAudio.volume = this.data.audioSettings.backgroundVolume;
    
    this.setData({
      step: 'meditation',
      currentGuidance: meditationData.guidance[0],
      guidanceIndex: 0,
      isPlaying: true,
      progress: 0,
      elapsedTime: 0,
      showQuestion: false,
      currentPeriod: timeOfDay,
      title: meditationData.title
    });
    
    // 开始播放音频
    backgroundAudio.play();
    
    // 开始更新进度
    this.startProgressUpdate();
  },
  
  // 设置引导语切换定时器
  setupGuidanceTimer: function() {
    // 清除可能存在的定时器
    if (this.guidanceTimer) clearTimeout(this.guidanceTimer);
    
    const timeOfDay = this.data.currentTime;
    const guidance = MEDITATION_DATA[timeOfDay].guidance;
    const totalMeditationTime = this.data.totalDuration * 1000; // 转为毫秒
    
    const guidanceInterval = totalMeditationTime / (guidance.length + 1);
    
    // 递归函数切换引导语
    const switchGuidance = (index) => {
      if (index >= guidance.length) {
        // 所有引导语播放完毕，显示问题
        const questions = MEDITATION_DATA[timeOfDay].questions;
        const randomIndex = Math.floor(Math.random() * questions.length);
        
        this.setData({
          showQuestion: true,
          currentQuestion: questions[randomIndex]
        });
        return;
      }
      
      this.setData({
        currentGuidance: guidance[index],
        guidanceIndex: index
      });
      
      this.guidanceTimer = setTimeout(() => {
        switchGuidance(index + 1);
      }, guidanceInterval);
    };
    
    // 开始切换，从索引1开始，因为0已经在startMeditation中设置了
    this.guidanceTimer = setTimeout(() => {
      switchGuidance(1);
    }, guidanceInterval);
  },
  
  // 更新进度
  updateProgress: function() {
    let elapsed = this.data.elapsedTime + 1;
    let progress = Math.min((elapsed / this.data.totalDuration) * 100, 100).toFixed(2);
    
    // 更新计时器显示
    this.updateTimerDisplay(elapsed);
    
    this.setData({
      elapsedTime: elapsed,
      progress: parseFloat(progress)
    });
    
    // 冥想完成
    if (elapsed >= this.data.totalDuration) {
      this.completeMeditation();
    } else {
      // 里程碑反馈
      if (elapsed === 60 || elapsed === 180) {
        this.provideMilestoneFeedback(elapsed);
      }
    }
  },
  
  // 更新计时器显示
  updateTimerDisplay: function(elapsed) {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const formattedTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    
    this.setData({
      timerDisplay: formattedTime
    });
  },
  
  // 提供里程碑反馈
  provideMilestoneFeedback: function(seconds) {
    let message = '';
    
    if (seconds === 60) {
      message = '已经专注冥想1分钟，继续保持';
    } else if (seconds === 180) {
      message = '已坚持3分钟，感受内心的平静';
    }
    
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  },
  
  // 冥想完成
  completeMeditation: function() {
    this.stopMeditation();
    
    // 保存冥想记录
    const record = app.saveMeditationRecord('workday', this.data.totalDuration, this.data.currentTime);
    
    // 展示完成动画和反馈
    this.showCompletionAnimation(record);
  },
  
  // 显示完成动画
  showCompletionAnimation: function(record) {
    // 在实际项目中实现完成动画
    // 这里使用简单的对话框代替
    wx.showModal({
      title: '冥想完成',
      content: '希望这次冥想让你感到放松和平静。你获得了' + this.data.totalDuration + '点经验值。',
      confirmText: '返回',
      cancelText: '记录感受',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            step: 'time_selection'
          });
        } else {
          // 跳转到冥想日记页面记录感受
          wx.navigateTo({
            url: `/pages/meditation_diary/meditation_diary?date=${app.formatDate(new Date(record.timestamp))}`
          });
        }
      }
    });
  },
  
  // 切换无干扰模式
  toggleNoDisturbMode: function() {
    this.setData({
      hideControls: !this.data.hideControls
    });
  },
  
  // 切换计时器模式
  toggleTimerMode: function() {
    const mode = this.data.timerMode === 'countdown' ? 'stopwatch' : 'countdown';
    
    this.setData({
      timerMode: mode
    });
  },
  
  // 切换静音状态
  toggleVolume: function() {
    const newMuted = !this.data.isMuted;
    const previousVolume = this.data.audioSettings.backgroundVolume;
    
    this.setData({
      isMuted: newMuted
    });
    
    if (newMuted) {
      // 保存当前音量并设置为0
      this.setData({
        'audioSettings.previousVolume': previousVolume || 0.5,
        'audioSettings.backgroundVolume': 0
      });
      
      if (backgroundAudio) {
        backgroundAudio.volume = 0;
      }
    } else {
      // 恢复之前的音量
      const volumeToRestore = this.data.audioSettings.previousVolume || 0.5;
      this.setData({
        'audioSettings.backgroundVolume': volumeToRestore
      });
      
      if (backgroundAudio) {
        backgroundAudio.volume = volumeToRestore;
      }
    }
  },
  
  // 调整音量
  adjustVolume: function(e) {
    const type = e.currentTarget.dataset.type;
    const value = e.detail.value;
    
    if (type === 'background') {
      if (backgroundAudio) {
        backgroundAudio.volume = value;
      }
      
      // 更新静音状态
      this.setData({
        'audioSettings.backgroundVolume': value,
        'isMuted': value <= 0
      });
    }
  },
  
  // 开始或暂停冥想
  togglePlay: function() {
    if (this.data.isPlaying) {
      this.pauseMeditation();
    } else {
      this.resumeMeditation();
    }
  },
  
  // 暂停冥想
  pauseMeditation: function() {
    // 确保音频实例有效并且正在播放
    if (backgroundAudio && !backgroundAudio.paused) {
      backgroundAudio.pause();
    }
    
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
    
    if (this.guidanceTimer) {
      clearTimeout(this.guidanceTimer);
    }
    
    this.setData({
      isPlaying: false,
      playButtonImage: '/assets/icons/play.png'
    });
  },
  
  // 继续冥想
  resumeMeditation: function() {
    // 确保音频实例有效
    if (backgroundAudio) {
      // 如果音频已经停止，重新设置src并播放
      if (!backgroundAudio.src || backgroundAudio.src === '') {
        backgroundAudio.src = '/assets/audio/meditation_background.m4a';
        backgroundAudio.volume = this.data.audioSettings.backgroundVolume;
      }
      
      // 播放音频
      backgroundAudio.play();
    }
    
    this.progressTimer = setInterval(() => {
      this.updateProgress();
    }, 1000);
    
    // 根据当前进度重新设置引导语
    this.setupGuidanceTimer();
    
    this.setData({
      isPlaying: true,
      playButtonImage: '/assets/icons/pause.png'
    });
  },
  
  // 停止冥想
  stopMeditation: function() {
    // 确保音频实例有效
    if (backgroundAudio) {
      backgroundAudio.stop();
    }
    
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
    
    if (this.guidanceTimer) {
      clearTimeout(this.guidanceTimer);
    }
    
    this.setData({
      isPlaying: false,
      progress: 0,
      elapsedTime: 0,
      playButtonImage: '/assets/icons/play.png'
    });
  },
  
  // 重新开始
  restart: function() {
    // 先停止当前冥想
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
    
    if (this.guidanceTimer) {
      clearTimeout(this.guidanceTimer);
    }
    
    // 重置状态但不停止音频
    this.setData({
      progress: 0,
      elapsedTime: 0,
      isPlaying: true,
      playButtonImage: '/assets/icons/pause.png'
    });
    
    // 重新开始进度更新和引导语切换
    this.progressTimer = setInterval(() => {
      this.updateProgress();
    }, 1000);
    
    // 重新设置引导语
    const timeOfDay = this.data.currentTime;
    const meditationData = MEDITATION_DATA[timeOfDay];
    this.setData({
      currentGuidance: meditationData.guidance[0],
      guidanceIndex: 0,
      showQuestion: false
    });
    
    // 重新设置引导语切换定时器
    this.setupGuidanceTimer();
  },
  
  // 返回主页
  navigateBack: function() {
    this.stopMeditation();
    
    if (this.data.step === 'meditation') {
      this.setData({
        step: 'time_selection'
      });
    } else {
      // 直接导航到首页而不是使用wx.navigateBack()
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
}); 