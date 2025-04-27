// 场景配置
const SCENE_CONFIG = {
  beach: {
    audio: '/assets/audio/beach.m4a',
    background: '/assets/images/beach.jpg',
    index: 0
  },
  forest: {
    audio: '/assets/audio/forest.m4a',
    background: '/assets/images/forest.jpg',
    index: 1
  },
  grassland: {
    audio: '/assets/audio/grassland.m4a',
    background: '/assets/images/grassland.jpg',
    index: 2
  }
};

// 海滩场景引导语
const BEACH_GUIDANCE_SEGMENTS = [
  {
    text: "现在，请找到一个舒适的姿势，轻轻闭上眼睛……\n想象你正站在一片开阔的海岸边，阳光温柔地洒在皮肤上，远处传来层层叠叠的海浪声……\n深吸一口气，让空气充满胸腔，再缓缓吐出，仿佛将身体里紧绷的思绪随风带走……\n慢慢的感受 吸气 呼气",
    audioPath: "/assets/audio/beach_audio/beach_1.m4a",
    duration: 40
  },
  {
    text: "望向眼前的大海——它是深邃的蓝，还是泛着银光的灰绿？\n海面上跃动的光斑，是否像星星坠入水中，随着波浪轻轻摇晃？",
    audioPath: "/assets/audio/beach_audio/beach_2.m4a",
    duration: 20
  },
  {
    text: "听……此刻的浪声是轻柔的呢喃，还是有力的低吼？\n试着分辨潮水退去时，砂砾被卷走的细碎声响……'",
    audioPath: "/assets/audio/beach_audio/beach_3.m4a",
    duration: 20
  },
  {
    text: "赤脚感受沙粒的温度，是温热还是微凉？\n当海风掠过发丝，你的额头、手臂或脖颈，哪一处最先感知到它的流动？",
    audioPath: "/assets/audio/beach_audio/beach_4.m4a",
    duration: 20
  },
  {
    text: "如果这片海面是你此刻的心境，它是平静如镜，还是暗流涌动？\n若有心事像礁石沉在海底，你愿意让哪一层波浪托起它，轻轻带向远方……",
    audioPath: "/assets/audio/beach_audio/beach_5.m4a",
    duration: 20
  },
  {
    text: "现在，想象海风穿过你的身体，带走最后一丝疲惫……\n看，沙滩上你写下的一句话，正被潮水温柔抹去，化作泡沫融进大海……\n慢慢将注意力拉回呼吸，感受脚底与地面的接触……\n听着我的声音，从3倒数时，带着海风的余韵睁开双眼：3——身体逐渐苏醒，2——手指微微颤动，1——带着宁静，回到此刻…",
    audioPath: "/assets/audio/beach_audio/beach_6.m4a",
    duration: 40
  }
];

// 森林场景引导语
const FOREST_GUIDANCE_SEGMENTS = [
  {
    text: "现在，请闭上双眼，想象你独自走入一片古老的森林……\n阳光透过层层叠叠的枝叶，在你脚下投下斑驳的光影……\n深吸一口气，潮湿的空气中混合着松针的清香、泥土的微腥，还有某种说不清的深邃气息……\n每走一步，脚下松软的苔藓都轻轻回弹，仿佛大地在回应你的重量……\n慢慢的感受 吸气 呼气",
    audioPath: "/assets/audio/forest_audio/forest_1.m4a",
    duration: 40
  },
  {
    text: "抬头看——那些高耸的树干是笔直刺向天空，还是弯成拱门般的弧度？\n树皮的纹路像不像某种神秘的文字，记录着千年的故事？",
    audioPath: "/assets/audio/forest_audio/forest_2.m4a",
    duration: 20
  },
  {
    text: "听……远处传来一声鸟鸣，是清亮的短音，还是婉转的长调？\n当风穿过枝桠时，树叶的沙沙声是从左侧，还是右侧开始蔓延？",
    audioPath: "/assets/audio/forest_audio/forest_3.m4a",
    duration: 20
  },
  {
    text: "伸手触摸最近的树干，粗糙的触感让你联想到什么？\n如果树根是大地的手掌，此刻它是否在托起你的双脚？",
    audioPath: "/assets/audio/forest_audio/forest_4.m4a",
    duration: 20
  },
  {
    text: "假设一片落叶飘到肩头，你会让它停留，还是轻轻拂去？\n让林间的寂静像溪水般流过身体，冲刷掉多余的杂念……",
    audioPath: "/assets/audio/forest_audio/forest_5.m4a",
    duration: 20
  },
  {
    text: "现在，感受最后一丝阳光从皮肤上移开，森林的阴影温柔包裹着你……\n记住这片宁静，将它收进呼吸的最深处……\n开始从5倒数，每一步都更贴近现实：5——手指微微蜷缩，4——肩膀自然下垂，3——听见周围的声音，2——脚掌轻压地面，1——带着森林赠与的清醒，慢慢睁开双眼……",
    audioPath: "/assets/audio/forest_audio/forest_6.m4a",
    duration: 40
  }
];

// 草原场景引导语
const GRASSLAND_GUIDANCE_SEGMENTS = [
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
    text: "让青草托起你的身体，最后一次感受风穿过指缝的流速……\n从5倒数，让意识如候鸟归巢般返回：5——舌尋轻触上颚，4——眼皮微微颤动，3——听见自己的呼吸声，2——脚趾在鞋内舒展，1——带着草原赠予的轻盈，缓缓睁开眼睛……",
    audioPath: "/assets/audio/grassland_audio/grassland_6.m4a",
    duration: 40
  }
];

// 场景问题
const SCENE_QUESTIONS = {
  beach: [
    "在这片海滩上，哪种感官体验让你感到最放松？",
    "如果可以把海滩的一种特质带回日常生活，你会选择什么？",
    "海浪的韵律让你联想到生活中的什么事物或节奏？",
    "这片海滩让你想起了什么回忆或感受？"
  ],
  forest: [
    "在森林中，哪种声音或感受最能让你感到宁静？",
    "如果你是森林中的一个元素，你会选择成为什么？为什么？",
    "森林的层次感（地面、灌木、树干、树冠）给你什么启示？",
    "这片森林唤起了你什么样的情绪或回忆？"
  ],
  grassland: [
    "草原的开阔无边界感给你带来了什么样的感受或想法？",
    "这种空间感与你的日常生活环境有何不同？它给你什么启示？",
    "如果可以带走草原的一种品质到日常生活中，你会选择什么？",
    "草原的广阔让你想起了生活中的哪些时刻或感受？"
  ]
};

const app = getApp();

Page({
  data: {
    step: 'scene_selection', // scene_selection 或 meditation
    currentScene: 'beach',
    currentSceneIndex: 0,  // 当前场景索引，对应swiper的current
    currentGuidance: '',
    currentQuestion: '',
    isPlaying: false,
    progress: 0,
    totalDuration: 900, // 15分钟冥想
    elapsedTime: 0,
    guidanceIndex: 0,
    showQuestion: false,
    guidanceSpeed: 'standard', // slow, standard, fast
    hideControls: false, // 无干扰模式标志
    audioSettings: {
      masterVolume: 1.0,
      guidanceVolume: 1.0
    },
    meditationBackground: '', // 添加冥想背景图片属性
    sceneGuidances: [], // 引导文本数组
    sceneQuestions: [], // 问题数组
    currentSegments: [], // 当前场景的引导语段落
    audioState: 'idle', // 音频状态：idle, playing, paused
    currentAudioIndex: -1, // 当前播放的音频索引
    nextAudioTimeout: null // 下一个音频的定时器
  },
  
  // 音频上下文
  backgroundAudio: null,
  guidanceAudio: null,
  
  onLoad: function() {
    // 初始化音频上下文
    this.backgroundAudio = wx.createInnerAudioContext();
    this.backgroundAudio.loop = true;
    
    this.guidanceAudio = wx.createInnerAudioContext();
    this.guidanceAudio.loop = false;
    
    // 默认选中海滩场景
    this.selectScene('beach');
    
    // 预加载音频资源
    this.preloadAudios();
    
    // 初始化音频事件监听
    this.setupAudioListeners();
  },
  
  onReady: function() {
    // 延迟设置当前scene index，避免初始化问题
    setTimeout(() => {
      this.setData({
        currentSceneIndex: SCENE_CONFIG[this.data.currentScene].index
      });
    }, 300);
  },
  
  onUnload: function() {
    this.stopMeditation();
    
    // 清理音频资源
    if (this.backgroundAudio) {
      try {
        this.backgroundAudio.stop();
        this.backgroundAudio.destroy();
      } catch (error) {
        console.error('销毁背景音频失败:', error);
      }
    }
    
    if (this.guidanceAudio) {
      try {
        this.guidanceAudio.stop();
        this.guidanceAudio.destroy();
      } catch (error) {
        console.error('销毁引导音频失败:', error);
      }
    }
  },
  
  // 设置音频事件监听
  setupAudioListeners: function() {
    // 背景音乐事件
    this.backgroundAudio.onError((err) => {
      console.error('背景音乐播放错误:', err);
      wx.showToast({
        title: '背景音乐播放失败',
        icon: 'none'
      });
    });
    
    // 引导音频事件
    this.guidanceAudio.onError((err) => {
      console.error('引导音频播放错误:', err);
      wx.showToast({
        title: '引导音频播放失败',
        icon: 'none'
      });
      
      // 恢复背景音量
      this.fadeBackgroundVolume(this.data.audioSettings.masterVolume);
    });
  },
  
  // 预加载音频资源
  preloadAudios: function() {
    // 实际项目中可以在这里预加载所有音频
    console.log('预加载音频资源');
  },
  
  // 加载场景特定的引导内容
  loadSceneGuidance: function(scene) {
    let guidances = [];
    let questions = SCENE_QUESTIONS[scene] || [];
    let segments = [];
    
    switch(scene) {
      case 'beach':
        guidances = BEACH_GUIDANCE_SEGMENTS.map(segment => segment.text);
        segments = BEACH_GUIDANCE_SEGMENTS;
        break;
      case 'forest':
        guidances = FOREST_GUIDANCE_SEGMENTS.map(segment => segment.text);
        segments = FOREST_GUIDANCE_SEGMENTS;
        break;
      case 'grassland':
        guidances = GRASSLAND_GUIDANCE_SEGMENTS.map(segment => segment.text);
        segments = GRASSLAND_GUIDANCE_SEGMENTS;
        break;
    }
    
    this.setData({
      sceneGuidances: guidances,
      sceneQuestions: questions,
      currentSegments: segments
    });
  },
  
  // 选择场景
  selectScene: function(scene) {
    if (typeof scene === 'object') {
      scene = scene.currentTarget.dataset.scene;
    }

    const sceneIndex = SCENE_CONFIG[scene].index;
    
    // 预加载背景图片
    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: url,
          success: resolve,
          fail: reject
        });
      });
    };
    
    // 预加载当前场景图片
    preloadImage(SCENE_CONFIG[scene].background)
      .then(() => {
        console.log('场景图片预加载成功:', scene);
      })
      .catch(err => {
        console.error('场景图片预加载失败:', err);
      });
    
    this.setData({
      currentScene: scene,
      currentSceneIndex: sceneIndex,
      currentGuidance: '', // 清空引导语内容
      currentQuestion: '',
      showQuestion: false,
      meditationBackground: SCENE_CONFIG[scene].background
    });
    
    // 加载相应场景的引导语
    this.loadSceneGuidance(scene);
  },
  
  // 处理swiper切换事件
  handleSwiperChange: function(e) {
    const index = e.detail.current;
    let scene = 'beach';
    
    // 根据索引找出对应的场景名称
    for (const key in SCENE_CONFIG) {
      if (SCENE_CONFIG[key].index === index) {
        scene = key;
        break;
      }
    }
    
    this.selectScene(scene);
  },
  
  // 开始冥想
  startMeditation: function() {
    const scene = this.data.currentScene;
    
    // 设置主音频
    this.backgroundAudio.src = SCENE_CONFIG[scene].audio;
    this.backgroundAudio.volume = this.data.audioSettings.masterVolume;
    
    // 确保背景图片正确加载
    const backgroundImage = SCENE_CONFIG[scene].background;
    
    this.setData({
      step: 'meditation',
      isPlaying: true,
      progress: 0,
      elapsedTime: 0,
      showQuestion: false,
      hideControls: false,
      meditationBackground: backgroundImage,
      audioState: 'playing',
      currentAudioIndex: -1,
      currentGuidance: '' // 确保开始时不显示引导语框
    });
    
    this.backgroundAudio.play();
    
    // 启动计时器
    this.progressTimer = setInterval(() => {
      this.updateProgress();
    }, 1000);
    
    // 开始音频引导播放
    this.startGuidanceSequence();
  },
  
  // 开始引导语音频序列播放
  startGuidanceSequence: function() {
    // 清除可能存在的定时器
    if (this.data.nextAudioTimeout) {
      clearTimeout(this.data.nextAudioTimeout);
    }
    
    // 首先等待20秒，然后开始播放第一段引导
    const initialDelay = 20000; // 20秒
    
    this.setData({
      nextAudioTimeout: setTimeout(() => {
        this.playNextGuidance(0);
      }, initialDelay)
    });
  },
  
  // 播放下一段引导语
  playNextGuidance: function(index) {
    if (!this.data.isPlaying || this.data.audioState !== 'playing') {
      return;
    }
    
    const segments = this.data.currentSegments;
    if (!segments || segments.length === 0 || index >= segments.length) {
      // 所有引导语播放结束，显示问题
      this.showRandomQuestion();
      return;
    }
    
    const currentSegment = segments[index];
    
    // 设置当前引导语文本
    this.setData({
      currentGuidance: currentSegment.text,
      guidanceIndex: index,
      currentAudioIndex: index
    });
    
    // 播放对应的音频
    this.playGuidanceAudio(currentSegment.audioPath, index);
    
    // 根据速度因子调整间隔
    let speedFactor = 1;
    switch (this.data.guidanceSpeed) {
      case 'slow':
        speedFactor = 1.3;
        break;
      case 'fast':
        speedFactor = 0.7;
        break;
      default:
        speedFactor = 1;
    }
    
    // 计算下一段引导语的延迟时间
    // 当前段落时长 + 段落间隔时间(60秒)
    const segmentDuration = currentSegment.duration * 1000 * speedFactor;
    const intervalDuration = 60000 * speedFactor; // 60秒间隔
    const totalDelay = segmentDuration + intervalDuration;
    
    // 设置下一段引导语的定时器
    if (index < segments.length - 1) {
      this.setData({
        nextAudioTimeout: setTimeout(() => {
          this.playNextGuidance(index + 1);
        }, totalDelay)
      });
    } else {
      // 最后一段后，延迟显示问题
      this.setData({
        nextAudioTimeout: setTimeout(() => {
          this.showRandomQuestion();
        }, segmentDuration + 10000) // 最后一段结束后10秒显示问题
      });
    }
  },
  
  // 播放引导音频
  playGuidanceAudio: function(audioPath, index) {
    try {
      // 降低背景音乐音量
      this.fadeBackgroundVolume(0.3);
      
      // 设置音频源和音量
      this.guidanceAudio.src = audioPath;
      this.guidanceAudio.volume = this.data.audioSettings.guidanceVolume;
      
      // 记录当前播放的段落索引
      this.setData({
        currentAudioIndex: index
      });
      
      // 播放
      this.guidanceAudio.play();
      
      // 设置音频结束事件
      this.guidanceAudio.onEnded(() => {
        // 恢复背景音乐音量
        this.fadeBackgroundVolume(this.data.audioSettings.masterVolume);
      });
      
    } catch (error) {
      console.error('播放引导音频失败:', error);
      this.fadeBackgroundVolume(this.data.audioSettings.masterVolume);
    }
  },
  
  // 显示随机问题
  showRandomQuestion: function() {
    const questions = this.data.sceneQuestions;
    if (questions && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      
      this.setData({
        showQuestion: true,
        currentQuestion: questions[randomIndex]
      });
    }
  },
  
  // 背景音乐音量渐变
  fadeBackgroundVolume: function(targetVolume) {
    const currentVolume = this.backgroundAudio.volume;
    const steps = 10;
    const stepValue = (targetVolume - currentVolume) / steps;
    const stepDuration = 100; // 每步100毫秒，总共1秒渐变
    
    const fadeStep = (step) => {
      if (step >= steps) {
        this.backgroundAudio.volume = targetVolume;
        return;
      }
      
      const newVolume = currentVolume + stepValue * (step + 1);
      this.backgroundAudio.volume = newVolume;
      
      setTimeout(() => {
        fadeStep(step + 1);
      }, stepDuration);
    };
    
    fadeStep(0);
  },
  
  // 更新进度
  updateProgress: function() {
    let elapsed = this.data.elapsedTime + 1;
    let progress = Math.min((elapsed / this.data.totalDuration) * 100, 100);
    
    // 确保progress值有效
    if (isNaN(progress) || progress < 0) {
      progress = 0;
    } else if (progress > 100) {
      progress = 100;
    }
    
    this.setData({
      elapsedTime: elapsed,
      progress: progress
    });
    
    // 冥想完成
    if (elapsed >= this.data.totalDuration) {
      this.completeMeditation();
    } else {
      // 里程碑反馈
      if (elapsed === 120 || elapsed === 300 || elapsed === 600) {
        this.provideMilestoneFeedback(elapsed);
      }
    }
  },
  
  // 提供里程碑反馈
  provideMilestoneFeedback: function(seconds) {
    let message = '';
    
    if (seconds === 120) {
      message = '已经专注冥想2分钟，继续保持';
    } else if (seconds === 300) {
      message = '已坚持5分钟，感受内心的平静';
    } else if (seconds === 600) {
      message = '10分钟里程碑！你的专注力令人赞叹';
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
    const record = app.saveMeditationRecord('restday', this.data.totalDuration, this.data.currentScene);
    
    // 清空引导语内容
    this.setData({
      currentGuidance: '',
      showQuestion: false,
      currentQuestion: ''
    });
    
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
            step: 'scene_selection'
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
  
  // 切换引导语速度
  changeGuidanceSpeed: function(e) {
    const speed = e.currentTarget.dataset.speed;
    
    this.setData({
      guidanceSpeed: speed
    });
    
    // 如果正在冥想中，重新设置引导语播放
    if (this.data.isPlaying && this.data.step === 'meditation') {
      // 暂停当前播放的引导语
      if (this.guidanceAudio && !this.guidanceAudio.paused) {
        this.guidanceAudio.stop();
      }
      
      // 清除定时器
      if (this.data.nextAudioTimeout) {
        clearTimeout(this.data.nextAudioTimeout);
      }
      
      // 根据已经过去的时间重新安排引导语播放
      const elapsed = this.data.elapsedTime;
      const segments = this.data.currentSegments;
      
      if (segments && segments.length > 0) {
        let totalTime = 20; // 初始等待时间20秒
        let currentIndex = -1;
        
        // 根据已经过去的时间找到应该播放的引导语段落
        for (let i = 0; i < segments.length; i++) {
          const segmentDuration = segments[i].duration;
          const intervalDuration = (i < segments.length - 1) ? 60 : 0; // 段落间隔，最后一段没有间隔
          
          totalTime += segmentDuration + intervalDuration;
          
          if (elapsed < totalTime) {
            currentIndex = i;
            break;
          }
        }
        
        // 如果找到了合适的段落，开始播放
        if (currentIndex >= 0 && currentIndex < segments.length) {
          this.playNextGuidance(currentIndex);
        } else if (elapsed < this.data.totalDuration) {
          // 如果所有引导语都已播放完，但冥想还未结束，显示问题
          this.showRandomQuestion();
        }
      }
    }
  },
  
  // 切换无干扰模式
  toggleNoDisturbMode: function() {
    this.setData({
      hideControls: !this.data.hideControls
    });
  },
  
  // 调整音量
  adjustVolume: function(e) {
    const type = e.currentTarget.dataset.type;
    const value = e.detail.value;
    
    if (type === 'master') {
      this.backgroundAudio.volume = value;
      
      this.setData({
        'audioSettings.masterVolume': value
      });
    } else if (type === 'guidance') {
      // 调整引导语音量
      this.guidanceAudio.volume = value;
      
      this.setData({
        'audioSettings.guidanceVolume': value
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
    if (this.backgroundAudio && !this.backgroundAudio.paused) {
      this.backgroundAudio.pause();
    }
    
    // 暂停引导音频
    if (this.guidanceAudio && !this.guidanceAudio.paused) {
      this.guidanceAudio.pause();
    }
    
    // 清除进度计时器
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
    
    // 清除引导语定时器
    if (this.data.nextAudioTimeout) {
      clearTimeout(this.data.nextAudioTimeout);
    }
    
    this.setData({
      isPlaying: false,
      audioState: 'paused'
    });
  },
  
  // 继续冥想
  resumeMeditation: function() {
    // 确保音频实例有效
    if (this.backgroundAudio) {
      // 如果音频已经停止，重新设置src并播放
      if (this.backgroundAudio.paused) {
        const scene = this.data.currentScene;
        if (!this.backgroundAudio.src || this.backgroundAudio.src === '') {
          this.backgroundAudio.src = SCENE_CONFIG[scene].audio;
          this.backgroundAudio.volume = this.data.audioSettings.masterVolume;
        }
      }
      
      // 播放音频
      this.backgroundAudio.play();
    }
    
    // 恢复引导音频播放
    if (this.guidanceAudio && this.guidanceAudio.paused && this.data.currentAudioIndex >= 0) {
      this.guidanceAudio.play();
    }
    
    // 重启进度计时器
    this.progressTimer = setInterval(() => {
      this.updateProgress();
    }, 1000);
    
    // 如果没有正在进行的引导语播放，继续引导语队列
    if (this.data.currentAudioIndex < 0 || this.guidanceAudio.paused) {
      // 从当前进度计算应该播放的引导语
      const elapsed = this.data.elapsedTime;
      const segments = this.data.currentSegments;
      
      if (segments && segments.length > 0) {
        let totalTime = 20; // 初始等待时间20秒
        let currentIndex = -1;
        
        // 根据已经过去的时间找到应该播放的引导语段落
        for (let i = 0; i < segments.length; i++) {
          const segmentDuration = segments[i].duration;
          const intervalDuration = (i < segments.length - 1) ? 60 : 0; // 段落间隔，最后一段没有间隔
          
          totalTime += segmentDuration + intervalDuration;
          
          if (elapsed < totalTime) {
            currentIndex = i;
            break;
          }
        }
        
        // 如果找到了合适的段落，开始播放
        if (currentIndex >= 0 && currentIndex < segments.length) {
          this.playNextGuidance(currentIndex);
        } else if (elapsed < this.data.totalDuration) {
          // 如果所有引导语都已播放完，但冥想还未结束，显示问题
          this.showRandomQuestion();
        }
      }
    }
    
    this.setData({
      isPlaying: true,
      audioState: 'playing'
    });
  },
  
  // 停止冥想
  stopMeditation: function() {
    // 停止背景音乐
    this.backgroundAudio.stop();
    
    // 停止引导音频
    this.guidanceAudio.stop();
    
    // 清除定时器
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
    
    if (this.data.nextAudioTimeout) {
      clearTimeout(this.data.nextAudioTimeout);
    }
    
    this.setData({
      isPlaying: false,
      progress: 0,
      elapsedTime: 0,
      meditationBackground: '',
      audioState: 'idle',
      currentAudioIndex: -1,
      currentGuidance: '', // 清空引导语内容
      showQuestion: false,
      currentQuestion: ''
    });
  },
  
  // 重新开始
  restart: function() {
    this.stopMeditation();
    this.startMeditation();
  },
  
  // 返回主页
  navigateBack: function() {
    this.stopMeditation();
    
    // 清空引导语内容
    this.setData({
      currentGuidance: '',
      showQuestion: false,
      currentQuestion: ''
    });
    
    if (this.data.step === 'meditation') {
      this.setData({
        step: 'scene_selection'
      });
    } else {
      // 直接导航到首页而不是使用wx.navigateBack()
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
}); 