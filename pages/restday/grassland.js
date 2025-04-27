// 草原场景冥想页面
const app = getApp();

// 音频时间线配置
const AUDIO_TIMELINE = {
  initialDelay: 20000,  // 初始等待时间
  segmentInterval: 60000,  // 段落间隔时间
  segments: [
    { duration: 40000, fadeIn: 1000, fadeOut: 1000 },  // 第一段
    { duration: 20000, fadeIn: 1000, fadeOut: 1000 },   // 第二段
    { duration: 20000, fadeIn: 1000, fadeOut: 1000 },   // 第三段
    { duration: 20000, fadeIn: 1000, fadeOut: 1000 },   // 第四段
    { duration: 20000, fadeIn: 1000, fadeOut: 1000 },   // 第五段
    { duration: 40000, fadeIn: 1000, fadeOut: 1000 }   // 第六段
  ]
};

// 音频状态定义
const AUDIO_STATES = {
  IDLE: 'idle',         // 初始状态
  PREPARING: 'preparing', // 准备播放
  PLAYING: 'playing',    // 播放中
  PAUSED: 'paused',     // 暂停
  TRANSITIONING: 'transitioning', // 切换中
  COMPLETED: 'completed' // 完成
};

// 音量控制配置
const VOLUME_CONTROL = {
  background: {
    normal: 0.5,    // 正常播放音量
    reduced: 0.2,   // 语音引导时的背景音量
    fadeTime: 1000  // 渐变时间(毫秒)
  },
  guidance: {
    normal: 0.8,    // 语音引导正常音量
    fadeTime: 800   // 渐变时间(毫秒)
  }
};

// 引导内容同步配置
const GUIDANCE_SYNC = {
  segments: [
    {
      text: "请调整呼吸，想象你躺在一片无垠的草原中央……\n天空低垂，云朵像蓬松的羊毛毯，缓缓掠过你的视线……\n青草随着风俯身又立起，如同一场无声的集体舞蹈……\n你闻到混合着野花甜香与泥土腥涩的气息，那是属于草原的独特语言……",
      audioPath: "/assets/audio/grassland_audio/grassland_1.m4a",
      duration: 40
    },
    {
      text: "远方的地平线是柔和的弧线，还是被山峦切割成锯齿状？\n如果云影投在草原上，像不像一群沉默的巨兽在游走？",
      audioPath: "/assets/audio/grassland_audio/grassland_2.m4a",
      duration: 20
    },
    {
      text: "听——风掠过草尖的呼啸声，是否让你想起某首遥远的歌谣？\n当一只蝴蝶停在你手背时，它的翅膀是透明的白，还是沾染了花粉的金黄？",
      audioPath: "/assets/audio/grassland_audio/grassland_3.m4a",
      duration: 20
    },
    {
      text: "假设每一株草都在传递大地的脉搏，你的心跳是否开始与它共鸣？\n若将烦恼化作一颗蒲公英的种子，你会交给哪一阵风带走？",
      audioPath: "/assets/audio/grassland_audio/grassland_4.m4a",
      duration: 20
    },
    {
      text: "此刻的你是融入草原的渺小存在，还是与天地同频的无限生命？",
      audioPath: "/assets/audio/grassland_audio/grassland_5.m4a",
      duration: 20
    },
    {
      text: "让青草托起你的身体，最后一次感受风穿过指缝的流速……\n从5倒数，让意识如候鸟归巢般返回：5——舌尖轻触上颚，4——眼皮微微颤动，3——听见自己的呼吸声，2——脚趾在鞋内舒展，1——带着草原赠予的轻盈，缓缓睁开眼睛……",
      audioPath: "/assets/audio/grassland_audio/grassland_6.m4a",
      duration: 40
    }
  ],
  textFadeTime: 500,  // 文字渐变时间
  syncThreshold: 100  // 同步阈值(毫秒)
};

// 暂停控制配置
const PAUSE_CONTROL = {
  timeOffset: 0,      // 暂停时间补偿
  fadeOutTime: 800,   // 暂停时渐隐时间
  fadeInTime: 1000,   // 恢复时渐入时间
  syncDelay: 200      // 同步延迟
};

// 错误处理配置
const ERROR_HANDLING = {
  retryAttempts: 3,    // 重试次数
  retryDelay: 1000,    // 重试延迟
  fallbackOptions: {    // 降级选项
    useLocalAudio: true,
    textOnly: false
  }
};

// 音频管理器类
class AudioManager {
  constructor() {
    this.backgroundAudio = null;
    this.guidanceAudio = null;
    this.isInitialized = false;
    this.currentSegmentIndex = -1;
    this.audioQueue = [];
    this.state = AUDIO_STATES.IDLE;
  }

  // 初始化音频系统
  async initialize() {
    if (this.isInitialized) return;

    // 创建背景音频上下文
    this.backgroundAudio = wx.createInnerAudioContext();
    this.backgroundAudio.loop = true;
    this.backgroundAudio.src = '/assets/audio/grassland_background.m4a';

    // 创建引导音频上下文（复用同一个实例）
    this.guidanceAudio = wx.createInnerAudioContext();
    
    // 设置音频事件监听
    this.setupAudioListeners();
    
    console.log('音频管理器初始化完成');
    this.isInitialized = true;
  }

  // 设置音频事件监听
  setupAudioListeners() {
    // 背景音乐事件
    this.backgroundAudio.onCanplay(() => {
      console.log('背景音乐加载完成，可以播放');
    });
    
    this.backgroundAudio.onPlay(() => {
      console.log('背景音乐开始播放');
    });
    
    this.backgroundAudio.onError((err) => {
      console.error('背景音乐播放错误:', err);
      this.handleAudioError('background', err);
    });

    // 引导音频事件
    this.guidanceAudio.onCanplay(() => {
      console.log(`引导音频 ${this.currentSegmentIndex + 1} 加载完成，可以播放`);
    });
    
    this.guidanceAudio.onPlay(() => {
      console.log(`引导音频 ${this.currentSegmentIndex + 1} 开始播放`);
    });
    
    this.guidanceAudio.onEnded(() => {
      console.log(`引导音频 ${this.currentSegmentIndex + 1} 播放结束`);
      this.handleGuidanceEnd();
    });

    this.guidanceAudio.onError((err) => {
      console.error(`引导音频 ${this.currentSegmentIndex + 1} 播放错误:`, err);
      this.handleAudioError('guidance', err);
    });
  }

  // 预加载下一段引导音频
  async preloadNextGuidance(index) {
    if (index >= 0 && index < GUIDANCE_SYNC.segments.length) {
      console.log(`预加载引导音频 ${index + 1}: ${GUIDANCE_SYNC.segments[index].audioPath}`);
      
      try {
        this.guidanceAudio.src = GUIDANCE_SYNC.segments[index].audioPath;
        return new Promise((resolve, reject) => {
          const onCanplay = () => {
            this.guidanceAudio.offCanplay(onCanplay);
            console.log(`引导音频 ${index + 1} 预加载成功`);
            resolve();
          };
          
          const onError = (err) => {
            this.guidanceAudio.offError(onError);
            console.error(`引导音频 ${index + 1} 预加载失败:`, err);
            
            // 尝试使用备用音频
            try {
              const fallbackPath = `/assets/audio/forest_audio/forest_${index + 1}.m4a`;
              console.log(`尝试加载备用音频: ${fallbackPath}`);
              this.guidanceAudio.src = fallbackPath;
              
              // 为备用音频设置事件
              this.guidanceAudio.onCanplay(() => {
                this.guidanceAudio.offCanplay();
                console.log(`备用音频加载成功`);
                resolve();
              });
              
              this.guidanceAudio.onError((fallbackErr) => {
                this.guidanceAudio.offError();
                console.error(`备用音频也加载失败:`, fallbackErr);
                // 即使备用音频失败，也继续流程
                resolve();
              });
            } catch (fallbackError) {
              console.error(`设置备用音频失败:`, fallbackError);
              resolve(); // 继续流程
            }
          };
          
          this.guidanceAudio.onCanplay(onCanplay);
          this.guidanceAudio.onError(onError);
        });
      } catch (error) {
        console.error(`设置音频源失败:`, error);
        return Promise.resolve(); // 继续流程
      }
    }
    return Promise.resolve();
  }

  // 播放背景音乐
  async playBackground(volume = VOLUME_CONTROL.background.normal) {
    this.backgroundAudio.volume = volume;
    await this.fadeVolume(this.backgroundAudio, 0, volume, VOLUME_CONTROL.background.fadeTime);
    this.backgroundAudio.play();
  }

  // 播放引导音频
  async playGuidance(index) {
    if (this.state !== AUDIO_STATES.PLAYING) return;

    try {
      // 预加载当前段落
      await this.preloadNextGuidance(index);

      // 降低背景音乐音量
      await this.fadeVolume(
        this.backgroundAudio,
        VOLUME_CONTROL.background.normal,
        VOLUME_CONTROL.background.reduced,
        VOLUME_CONTROL.background.fadeTime
      );

      // 播放引导音频
      this.guidanceAudio.volume = VOLUME_CONTROL.guidance.normal;
      this.guidanceAudio.play();

      this.currentSegmentIndex = index;
      
      // 预加载下一段
      if (index + 1 < GUIDANCE_SYNC.segments.length) {
        this.preloadNextGuidance(index + 1);
      }
    } catch (error) {
      console.error('播放引导音频失败:', error);
      this.handleAudioError('guidance', error);
    }
  }

  // 音量渐变
  async fadeVolume(audioContext, fromVolume, toVolume, duration) {
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = (toVolume - fromVolume) / steps;

    for (let i = 0; i <= steps; i++) {
      if (this.state === AUDIO_STATES.PAUSED) break;
      audioContext.volume = fromVolume + (volumeStep * i);
      await new Promise(resolve => setTimeout(resolve, stepTime));
    }
  }

  // 处理引导音频结束
  async handleGuidanceEnd() {
    // 恢复背景音乐音量
    await this.fadeVolume(
      this.backgroundAudio,
      VOLUME_CONTROL.background.reduced,
      VOLUME_CONTROL.background.normal,
      VOLUME_CONTROL.background.fadeTime
    );

    this.currentSegmentIndex = -1;
  }

  // 暂停所有音频
  async pause() {
    this.state = AUDIO_STATES.PAUSED;
    
    // 同时淡出所有音频
    await Promise.all([
      this.fadeVolume(this.backgroundAudio, this.backgroundAudio.volume, 0, PAUSE_CONTROL.fadeOutTime),
      this.guidanceAudio.volume > 0 ? 
        this.fadeVolume(this.guidanceAudio, this.guidanceAudio.volume, 0, PAUSE_CONTROL.fadeOutTime) : 
        Promise.resolve()
    ]);

    this.backgroundAudio.pause();
    this.guidanceAudio.pause();
  }

  // 恢复播放
  async resume() {
    this.state = AUDIO_STATES.PLAYING;
    
    // 恢复背景音乐
    this.backgroundAudio.play();
    await this.fadeVolume(
      this.backgroundAudio,
      0,
      VOLUME_CONTROL.background.normal,
      PAUSE_CONTROL.fadeInTime
    );

    // 如果有引导音频在播放，也恢复它
    if (this.currentSegmentIndex >= 0) {
      this.guidanceAudio.play();
      await this.fadeVolume(
        this.guidanceAudio,
        0,
        VOLUME_CONTROL.guidance.normal,
        PAUSE_CONTROL.fadeInTime
      );
    }
  }

  // 停止所有音频
  stop() {
    this.state = AUDIO_STATES.IDLE;
    this.backgroundAudio.stop();
    this.guidanceAudio.stop();
    this.currentSegmentIndex = -1;
  }

  // 清理资源
  destroy() {
    if (this.backgroundAudio) {
      this.backgroundAudio.destroy();
    }
    if (this.guidanceAudio) {
      this.guidanceAudio.destroy();
    }
    this.isInitialized = false;
  }

  // 处理音频错误
  handleAudioError(type, error) {
    console.error(`音频错误 (${type}):`, error);
    
    if (type === 'background') {
      // 背景音乐错误处理
      wx.showToast({
        title: '背景音乐加载失败，尝试替代方案',
        icon: 'none'
      });
      
      // 尝试使用不同的背景音乐
      try {
        this.backgroundAudio.src = '/assets/audio/forest_background.m4a';
        this.backgroundAudio.play();
        console.log('使用替代背景音乐');
      } catch (fallbackError) {
        console.error('替代背景音乐也失败:', fallbackError);
      }
    } else if (type === 'guidance') {
      // 引导音频错误处理
      wx.showToast({
        title: '语音引导加载失败',
        icon: 'none'
      });
      
      if (this.currentSegmentIndex >= 0) {
        // 尝试使用森林场景的语音引导代替
        try {
          const fallbackPath = `/assets/audio/forest_audio/forest_${this.currentSegmentIndex + 1}.m4a`;
          this.guidanceAudio.src = fallbackPath;
          this.guidanceAudio.play();
          console.log(`使用替代语音引导: ${fallbackPath}`);
        } catch (fallbackError) {
          console.error('替代语音引导也失败:', fallbackError);
          
          // 如果语音引导失败，只显示文本并继续下一段
          // 通知页面层继续进度
          this.handleGuidanceEnd();
        }
      }
    }
  }
}

// 创建音频管理器实例
const audioManager = new AudioManager();

Page({
  data: {
    audioState: AUDIO_STATES.IDLE,
    isPlaying: false,
    progress: 0,
    elapsedTime: 0,
    totalDuration: 0,
    currentGuideText: "",
    guidanceEnabled: true,
    showVolumeControls: false,
    pauseStartTime: 0,
    totalPauseTime: 0
  },

  onLoad: async function() {
    // 初始化音频管理器
    await audioManager.initialize();
    this.calculateTotalDuration();
  },

  onUnload: function() {
    audioManager.destroy();
  },

  // 计算总时长
  calculateTotalDuration: function() {
    let total = AUDIO_TIMELINE.initialDelay;
    AUDIO_TIMELINE.segments.forEach((segment, index) => {
      total += segment.duration;
      if (index < AUDIO_TIMELINE.segments.length - 1) {
        total += AUDIO_TIMELINE.segmentInterval;
      }
    });
    this.setData({ totalDuration: total });
  },

  // 开始冥想
  startMeditation: async function() {
    if (this.data.audioState !== AUDIO_STATES.IDLE) return;

    try {
      this.setData({
        audioState: AUDIO_STATES.PREPARING,
        isPlaying: true,
        startTime: Date.now()
      });

      // 开始播放背景音乐
      await audioManager.playBackground();
      
      // 启动引导流程
      if (this.data.guidanceEnabled) {
        this.scheduleGuidance();
      }

      this.startProgressTimer();
      
      audioManager.state = AUDIO_STATES.PLAYING;
    } catch (error) {
      console.error('启动冥想失败:', error);
      this.handleStartError();
    }
  },

  // 安排引导播放
  scheduleGuidance: async function() {
    // 等待初始延迟
    await this.delay(AUDIO_TIMELINE.initialDelay);
    
    // 按序播放每段引导
    for (let i = 0; i < GUIDANCE_SYNC.segments.length; i++) {
      if (this.data.audioState !== AUDIO_STATES.PLAYING) break;
      
      // 播放当前段落
      await audioManager.playGuidance(i);
      this.setData({
        currentGuideText: GUIDANCE_SYNC.segments[i].text
      });
      
      // 等待当前段落播放完成
      await this.delay(GUIDANCE_SYNC.segments[i].duration);
      
      // 如果不是最后一段，等待间隔时间
      if (i < GUIDANCE_SYNC.segments.length - 1) {
        await this.delay(AUDIO_TIMELINE.segmentInterval);
      }
    }
  },

  // 暂停冥想
  pauseMeditation: async function() {
    if (this.data.audioState !== AUDIO_STATES.PLAYING) return;

    this.setData({
      audioState: AUDIO_STATES.PAUSED,
      isPlaying: false,
      pauseStartTime: Date.now()
    });

    await audioManager.pause();
  },

  // 继续冥想
  resumeMeditation: async function() {
    if (this.data.audioState !== AUDIO_STATES.PAUSED) return;

    const pauseDuration = Date.now() - this.data.pauseStartTime;
    this.setData({
      totalPauseTime: this.data.totalPauseTime + pauseDuration,
      audioState: AUDIO_STATES.PLAYING,
      isPlaying: true
    });

    await audioManager.resume();
  },

  // 停止冥想
  stopMeditation: function() {
    audioManager.stop();
    this.setData({
      audioState: AUDIO_STATES.IDLE,
      isPlaying: false,
      progress: 0,
      currentGuideText: "",
      elapsedTime: 0
    });
  },

  // 工具函数：延时
  delay: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // 更新进度
  startProgressTimer: function() {
    this.progressTimer = setInterval(() => {
      if (this.data.audioState === AUDIO_STATES.PLAYING) {
        const now = Date.now();
        const elapsed = now - this.data.startTime - this.data.totalPauseTime;
        const progress = Math.min((elapsed / this.data.totalDuration) * 100, 100);
        
        this.setData({
          elapsedTime: elapsed,
          progress: progress
        });

        if (progress >= 100) {
          this.completeMeditation();
        }
      }
    }, 1000);
  },

  // 完成冥想
  completeMeditation: function() {
    this.stopMeditation();
    const record = app.saveMeditationRecord('grassland', this.data.elapsedTime);
    
    wx.showModal({
      title: '冥想完成',
      content: '恭喜你完成了草原冥想之旅',
      confirmText: '返回',
      cancelText: '记录感受',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        } else {
          // 跳转到冥想日记页面记录感受
          wx.navigateTo({
            url: `/pages/meditation_diary/meditation_diary?date=${app.formatDate(new Date(record.timestamp))}`
          });
        }
      }
    });
  },

  // 切换语音引导
  toggleVoiceGuidance: function() {
    this.setData({
      guidanceEnabled: !this.data.guidanceEnabled
    });
  },

  // 切换音量控制面板
  toggleVolumeControls: function() {
    this.setData({
      showVolumeControls: !this.data.showVolumeControls
    });
  },

  // 设置背景音量
  setBackgroundVolume: function(e) {
    const volume = e.detail.value;
    audioManager.playBackground(volume);
  },

  // 设置语音引导音量
  setVoiceVolume: function(e) {
    const volume = e.detail.value;
    audioManager.guidanceAudio.volume = volume;
  }
}); 