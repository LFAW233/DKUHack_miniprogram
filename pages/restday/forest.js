// 森林场景冥想页面
const app = getApp();

// 创建背景音频上下文
const backgroundAudio = wx.createInnerAudioContext();
backgroundAudio.loop = true; // 背景音乐循环播放

// 创建语音引导音频上下文数组
const voiceGuidanceAudios = [
  wx.createInnerAudioContext(),
  wx.createInnerAudioContext(),
  wx.createInnerAudioContext(),
  wx.createInnerAudioContext(),
  wx.createInnerAudioContext(),
  wx.createInnerAudioContext()
];

// 语音引导文本内容
const GUIDANCE_TEXTS = [
  "现在，请闭上双眼，想象你独自走入一片古老的森林……\n阳光透过层层叠叠的枝叶，在你脚下投下斑驳的光影……\n深吸一口气，潮湿的空气中混合着松针的清香、泥土的微腥，还有某种说不清的深邃气息……\n每走一步，脚下松软的苔藓都轻轻回弹，仿佛大地在回应你的重量……\n慢慢的感受 吸气 呼气",
  "抬头看——那些高耸的树干是笔直刺向天空，还是弯成拱门般的弧度？\n树皮的纹路像不像某种神秘的文字，记录着千年的故事？",
  "听……远处传来一声鸟鸣，是清亮的短音，还是婉转的长调？\n当风穿过枝桠时，树叶的沙沙声是从左侧，还是右侧开始蔓延？",
  "伸手触摸最近的树干，粗糙的触感让你联想到什么？\n如果树根是大地的手掌，此刻它是否在托起你的双脚？",
  "假设一片落叶飘到肩头，你会让它停留，还是轻轻拂去？\n让林间的寂静像溪水般流过身体，冲刷掉多余的杂念……",
  "现在，感受最后一丝阳光从皮肤上移开，森林的阴影温柔包裹着你……\n记住这片宁静，将它收进呼吸的最深处……\n开始从5倒数，每一步都更贴近现实：5——手指微微蜷缩，4——肩膀自然下垂，3——听见周围的声音，2——脚掌轻压地面，1——带着森林赠与的清醒，慢慢睁开双眼……"
];

// 语音引导音频文件路径
const GUIDANCE_AUDIO_PATHS = [
  '/assets/audio/forest_audio/forest_1.m4a',
  '/assets/audio/forest_audio/forest_2.m4a',
  '/assets/audio/forest_audio/forest_3.m4a',
  '/assets/audio/forest_audio/forest_4.m4a',
  '/assets/audio/forest_audio/forest_5.m4a',
  '/assets/audio/forest_audio/forest_6.m4a'
];

// 音频持续时间（秒）
const GUIDANCE_DURATIONS = [120, 90, 90, 90, 90, 120];

// 背景音乐音量调整配置
const BACKGROUND_VOLUME = {
  normal: 0.5, // 正常播放音量
  reduced: 0.3, // 语音引导播放时的降低音量
  fadeTime: 1000 // 音量渐变时间(毫秒)
};

Page({
  data: {
    isPlaying: false,
    isMuted: false,
    progress: 0,
    currentGuideIndex: -1,
    currentGuideText: "",
    guidanceEnabled: true,
    elapsedTime: 0,
    totalDuration: 0,
    voiceVolume: 0.8,
    backgroundVolume: BACKGROUND_VOLUME.normal,
    timerDisplay: "00:00",
    formattedTime: '00:00',
    progressPercent: 0,
    progressText: '0%',
    showGuidance: false,
    currentGuidance: '',
    enableVoiceGuidance: true,
    showVolumeControls: false,
    bgVolume: BACKGROUND_VOLUME.normal,
    nextGuidanceTimeout: null,
    guidanceStartTimeout: null
  },

  onLoad: function () {
    // 设置背景音频
    try {
      backgroundAudio.src = '/assets/audio/forest_background.m4a';
      backgroundAudio.volume = this.data.backgroundVolume;
      
      // 设置背景音乐错误监听
      backgroundAudio.onError((res) => {
        console.error('背景音乐加载失败:', res);
        wx.showToast({
          title: '背景音乐加载失败，请重试',
          icon: 'none'
        });
      });
    } catch (error) {
      console.error('设置背景音频失败:', error);
    }

    // 初始化语音引导音频
    this.initGuidanceAudios();
    
    // 计算总时长（包括间隔时间）
    let totalDuration = 20; // 初始等待时间
    GUIDANCE_DURATIONS.forEach((duration, index) => {
      totalDuration += duration;
      if (index < GUIDANCE_DURATIONS.length - 1) {
        totalDuration += 60; // 每段之间的1分钟间隔
      }
    });
    
    this.setData({
      totalDuration: totalDuration
    });
  },

  onUnload: function () {
    this.stopMeditation();
    this.clearAllTimeouts();
  },

  // 初始化语音引导音频
  initGuidanceAudios: function () {
    voiceGuidanceAudios.forEach((audio, index) => {
      try {
        audio.src = GUIDANCE_AUDIO_PATHS[index];
        audio.volume = this.data.voiceVolume;
        
        // 添加调试日志
        console.log(`初始化语音引导 ${index + 1}, 路径: ${GUIDANCE_AUDIO_PATHS[index]}`);
        
        // 为每个音频设置canplay事件
        audio.onCanplay(() => {
          console.log(`语音引导 ${index + 1} 已加载完成，可以播放`);
        });
        
        // 设置音频结束事件监听
        audio.onEnded(() => {
          console.log(`语音引导 ${index + 1} 播放结束`);
          this.handleGuidanceEnd(index);
        });
        
        // 设置错误监听
        audio.onError((res) => {
          console.error(`语音引导 ${index + 1} 加载失败:`, res);
          wx.showToast({
            title: `语音引导加载失败`,
            icon: 'none'
          });
        });
      } catch (error) {
        console.error(`初始化语音引导 ${index + 1} 出错:`, error);
      }
    });
  },

  // 开始冥想
  startMeditation: function () {
    if (this.data.isPlaying) return;
    
    // 播放背景音乐
    try {
      backgroundAudio.play();
      console.log('背景音乐开始播放');
    } catch (error) {
      console.error('播放背景音乐失败:', error);
      wx.showToast({
        title: '播放背景音乐失败，请重试',
        icon: 'none'
      });
    }
    
    this.setData({
      isPlaying: true,
      startTime: Date.now(),
      elapsedTime: 0
    });

    // 启动进度更新定时器
    this.startProgressTimer();

    // 如果启用了语音引导，20秒后开始第一段引导
    if (this.data.guidanceEnabled) {
      console.log('设置引导语音延迟播放(20秒)');
      this.data.guidanceStartTimeout = setTimeout(() => {
        this.playGuidanceAudio(0);
      }, 20000);
    }
  },

  // 处理语音引导结束
  handleGuidanceEnd: function (index) {
    console.log(`第 ${index + 1} 段引导结束`);
    
    // 恢复背景音乐音量
    this.fadeBackgroundVolume(BACKGROUND_VOLUME.normal);
    
    // 如果不是最后一段，设置下一段的播放
    if (index < voiceGuidanceAudios.length - 1 && this.data.isPlaying) {
      console.log(`设置下一段引导(${index + 2})延迟播放(60秒)`);
      this.data.nextGuidanceTimeout = setTimeout(() => {
        if (this.data.isPlaying && this.data.guidanceEnabled) {
          this.playGuidanceAudio(index + 1);
        }
      }, 60000); // 1分钟后播放下一段
    } else if (index === voiceGuidanceAudios.length - 1) {
      // 最后一段结束，完成冥想
      this.completeMeditation();
    }
  },

  // 播放指定引导音频
  playGuidanceAudio: function (index) {
    if (!this.data.isPlaying || !this.data.guidanceEnabled) return;
    
    // 降低背景音乐音量
    this.fadeBackgroundVolume(BACKGROUND_VOLUME.reduced);
    
    // 更新引导文本
    this.setData({
      currentGuideIndex: index,
      currentGuideText: GUIDANCE_TEXTS[index],
      currentGuidance: GUIDANCE_TEXTS[index],
      showGuidance: true
    });
    
    // 尝试播放语音引导
    try {
      console.log(`开始播放第 ${index + 1} 段引导语音`);
      voiceGuidanceAudios[index].play();
    } catch (error) {
      console.error(`播放第 ${index + 1} 段引导语音失败:`, error);
      // 即使语音失败，也继续显示文本并设置下一段的定时
      this.handleGuidanceEnd(index);
    }
  },

  // 渐变调整背景音量
  fadeBackgroundVolume: function (targetVolume) {
    const startVolume = backgroundAudio.volume;
    const startTime = Date.now();
    
    const fadeInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / BACKGROUND_VOLUME.fadeTime, 1);
      
      if (progress === 1) {
        clearInterval(fadeInterval);
        backgroundAudio.volume = targetVolume;
      } else {
        backgroundAudio.volume = startVolume + (targetVolume - startVolume) * progress;
      }
    }, 50);
  },

  // 暂停冥想
  pauseMeditation: function () {
    if (!this.data.isPlaying) return;
    
    backgroundAudio.pause();
    
    // 暂停当前语音引导
    if (this.data.currentGuideIndex >= 0) {
      voiceGuidanceAudios[this.data.currentGuideIndex].pause();
    }
    
    this.clearAllTimeouts();
    
    this.setData({
      isPlaying: false
    });
  },

  // 继续冥想
  resumeMeditation: function () {
    if (this.data.isPlaying) return;
    
    backgroundAudio.play();
    
    // 继续当前语音引导
    if (this.data.currentGuideIndex >= 0 && this.data.guidanceEnabled) {
      voiceGuidanceAudios[this.data.currentGuideIndex].play();
    }
    
    this.setData({
      isPlaying: true
    });
    
    this.startProgressTimer();
  },

  // 停止冥想
  stopMeditation: function () {
    backgroundAudio.stop();
    
    // 停止所有语音引导
    voiceGuidanceAudios.forEach(audio => audio.stop());
    
    this.clearAllTimeouts();
    
    this.setData({
      isPlaying: false,
      progress: 0,
      elapsedTime: 0,
      currentGuideIndex: -1,
      currentGuideText: "",
      currentGuidance: "",
      progressPercent: 0,
      formattedTime: "00:00",
      progressText: "0%"
    });
  },

  // 清除所有定时器
  clearAllTimeouts: function () {
    if (this.data.guidanceStartTimeout) {
      clearTimeout(this.data.guidanceStartTimeout);
    }
    if (this.data.nextGuidanceTimeout) {
      clearTimeout(this.data.nextGuidanceTimeout);
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  },

  // 开始进度计时器
  startProgressTimer: function () {
    this.progressTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.data.startTime) / 1000);
      const progress = Math.min((elapsed / this.data.totalDuration) * 100, 100);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      
      this.setData({
        elapsedTime: elapsed,
        progressPercent: progress,
        formattedTime: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        progressText: `${Math.floor(elapsed/60)}/${Math.floor(this.data.totalDuration/60)}分钟`
      });
    }, 1000);
  },

  // 切换播放/暂停
  togglePlayPause: function () {
    if (this.data.isPlaying) {
      this.pauseMeditation();
    } else {
      if (this.data.elapsedTime === 0) {
        this.startMeditation();
      } else {
        this.resumeMeditation();
      }
    }
  },

  // 切换语音引导
  toggleVoiceGuidance: function () {
    const newState = !this.data.guidanceEnabled;
    
    this.setData({
      guidanceEnabled: newState,
      enableVoiceGuidance: newState
    });
    
    if (!newState) {
      // 关闭引导时停止当前语音
      if (this.data.currentGuideIndex >= 0) {
        voiceGuidanceAudios[this.data.currentGuideIndex].stop();
        this.fadeBackgroundVolume(BACKGROUND_VOLUME.normal);
      }
      this.clearAllTimeouts();
    }
    
    wx.showToast({
      title: newState ? '语音引导已开启' : '语音引导已关闭',
      icon: 'none'
    });
  },

  // 切换音量控制面板
  toggleVolumeControls: function () {
    this.setData({
      showVolumeControls: !this.data.showVolumeControls
    });
  },

  // 设置背景音量
  setBgVolume: function (e) {
    const volume = e.detail.value;
    this.fadeBackgroundVolume(volume);
    
    this.setData({
      bgVolume: volume,
      backgroundVolume: volume
    });
  },

  // 设置语音引导音量
  setVoiceVolume: function (e) {
    const volume = e.detail.value;
    
    voiceGuidanceAudios.forEach(audio => {
      audio.volume = volume;
    });
    
    this.setData({
      voiceVolume: volume
    });
  },

  // 完成冥想
  completeMeditation: function () {
    this.stopMeditation();
    
    // 保存冥想记录
    const record = app.saveMeditationRecord('forest', this.data.elapsedTime);
    
    wx.showModal({
      title: '冥想完成',
      content: '恭喜你完成了森林冥想之旅',
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

  // 返回上一页
  goBack: function () {
    this.stopMeditation();
    wx.navigateBack();
  }
}); 