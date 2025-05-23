# 冥想小程序开发文档

## 目录
- [1. 项目概述](#1-项目概述)
- [2. 设计风格](#2-设计风格)
- [3. 页面结构](#3-页面结构)
- [4. 技术架构](#4-技术架构)
- [5. 性能优化](#5-性能优化)
- [6. 后续扩展计划](#6-后续扩展计划)
- [7. 冥想经验与等级系统](#7-冥想经验与等级系统)

## 1. 项目概述
冥想小程序是一款帮助用户进行日常冥想练习的微信小程序。程序分为工作日模式和休息日模式两种冥想方式，通过视觉和听觉引导帮助用户放松心情、清晰思绪。小程序提供个人页面记录用户冥想数据，支持底部导航栏在首页和个人页面之间切换。

### 1.1 核心功能
- 两种冥想模式：工作日模式和休息日模式
- 根据时间自动调整冥想内容（工作日模式）
- 多种自然场景选择（休息日模式）
- 个人冥想数据统计与可视化
- 冥想日历与记录查看
- 经验值与等级系统

### 1.2 用户价值
- 帮助用户在忙碌工作中寻找片刻宁静
- 提供针对不同时间段和场景的定制化冥想体验
- 通过数据记录和奖励机制培养持续冥想习惯
- 提升用户专注力和放松能力

## 2. 设计风格
### 2.1 整体风格
- 配色方案：以柔和的蓝色、绿色和白色为主
  - 主色调：#E8F4F8（淡蓝色）
  - 辅助色：#B8D8D8（淡绿色）
  - 强调色：#4A90E2（蓝色）
  - 文字颜色：#333333（深灰）
- 字体：使用无衬线字体，确保清晰易读
- 图标：使用简约线条风格，保持统一性
- 动画：使用柔和的过渡动画，避免突兀的切换

### 2.2 布局设计
- 采用卡片式设计
- 留白充足，避免视觉拥挤
- 圆角设计，营造柔和感
- 阴影效果轻微，提升层次感

### 2.3 UI细节设计
- 字体层级：建立清晰的视觉层级
  - 标题：18-20px，半粗体，深色(#333)
  - 重要数字：24-36px，粗体，主题色
  - 正文：14-16px，常规字重，中灰色(#666)
  - 次要文字：12-14px，轻量字重，浅灰色(#999)
- 图标设计：
  - 使用简约线条风格，2px线宽
  - 关键图标增加轻微描边或阴影，提高可辨识度
  - 交互图标（如箭头、关闭按钮）保持极简风格
- 阴影与层次：
  - 使用多层次阴影效果，创造微妙的"浮动"感
  - 主卡片：4px模糊距离，2px偏移，10%不透明度
  - 次级卡片：2px模糊距离，1px偏移，8%不透明度
  - 悬浮状态增强阴影效果，强化交互反馈

## 3. 页面结构

### 3.1 主页（index）
#### 主要元素
- 顶部导航栏（透明背景）
- 两个主要模式按钮（工作日/休息日）
- 底部导航栏（包含"首页"和"个人"两个选项）
- 背景：渐变效果，从顶部淡蓝色过渡到底部淡绿色

#### 按钮设计
- 工作日模式按钮
  - 图标：时钟/日历图标
  - 文字：工作日模式
  - 悬停效果：轻微放大和阴影加深
  
- 休息日模式按钮
  - 图标：自然/放松图标
  - 文字：休息日模式
  - 悬停效果：轻微放大和阴影加深

#### 功能描述
主页是用户进入应用的第一个页面，展示两个核心冥想模式的入口。用户可以根据自己的需求和当前场景选择合适的冥想模式。页面设计简洁明了，突出两个主要功能入口，通过底部导航栏可以快速切换至个人页面。

### 3.2 工作日模式页面（workday）
#### 主要元素
- 顶部导航栏：返回按钮和计时器显示
- 头部信息：标题和当前时间显示
- 引导文字区域：根据时间段显示相应的冥想引导
- 思考问题区域：展示当前时段的思考问题
- 进度条：显示冥想完成进度
- 控制按钮：音量控制、播放/暂停、重启按钮
- 完成弹窗：冥想结束后显示奖励和统计信息

#### 背景设计
根据时间段自动切换不同的渐变背景：
- 早晨：暖色调渐变 (#FDF5E6, #F0E68C)
- 上午：清新蓝调渐变 (#87CEEB, #E0FFFF)
- 下午：明亮蓝调渐变 (#87CEFA, #F0F8FF)
- 晚上：温暖橙调渐变 (#FF7F50, #FFA07A)

#### 功能流程
1. 早上场景（6:00-9:00）
   - 引导语：关于清晨的冥想引导，帮助用户唤醒感官
   - 问题示例："今天你期待什么？"

2. 上午场景（9:00-12:00）
   - 引导语：关于工作状态的引导，强调专注和效率
   - 问题示例："什么让你感到充实？"

3. 下午场景（12:00-18:00）
   - 引导语：关于下午能量的引导，帮助恢复精力
   - 问题示例："如何保持专注？"

4. 傍晚场景（18:00-21:00）
   - 引导语：关于总结和放松的引导，回顾一天
   - 问题示例："今天学到了什么？"

#### 交互功能
- 自动计时：冥想过程中自动计时10分钟
- 进度显示：实时显示冥想完成百分比
- 音频控制：可以控制背景音乐的音量或静音
- 暂停/继续：可随时暂停或继续冥想过程
- 重新开始：重置计时器重新开始冥想
- 完成奖励：冥想结束后显示获得的经验值和连续天数

### 3.3 休息日模式页面（restday）
#### 主要元素
- 场景选择区：提供三种自然场景选项
- 音频控制区：控制背景音乐的播放/暂停/音量
- 引导文字显示区：展示当前场景的引导文本
- 进度指示器：显示冥想进度和剩余时间
- 背景：根据选择的场景动态变化

#### 页面结构优化
##### 布局重组
- **场景选择区优化**
  - 位置：页面顶部，占据屏幕宽度的85%，居中显示
  - 形式：水平滑动卡片，每张卡片尺寸为120dp×80dp
  - 视觉反馈：当前选中场景卡片放大110%，并添加发光边框效果
  - 切换动画：滑动时有顺滑的缩放和透明度过渡效果
  - 指示器：卡片下方添加小点指示器，选中状态使用主题色

- **引导文字区优化**
  - 位置：场景选择区下方，占据中央区域
  - 背景：半透明卡片，圆角为12dp，背景模糊效果
  - 文字动效：引导文字使用优雅的淡入淡出切换效果
  - 滚动指示：长文本时底部显示微妙的向下提示箭头
  - 排版：左对齐，行距为1.5倍，段落间距为正文高度的0.8倍

- **控制区域设计**
  - 位置：屏幕底部，距离底部安全区域上方20dp
  - 布局：音量控制、播放/暂停按钮、场景切换按钮水平排列
  - 主控按钮：播放/暂停按钮直径为60dp，其他控制按钮直径为40dp
  - 间距：按钮间水平间距为屏幕宽度的8%
  - 视觉反馈：按钮点击时有明确的缩放和不透明度变化

##### 视觉设计增强
- **整体色彩方案**
  - 场景选择卡片：根据场景特点使用差异化的配色
  - 控制按钮：使用柔和的白色（#FFFFFF，80%不透明度），内部图标使用深色（#333333）
  - 进度条：使用渐变色，从#4A90E2到#B8D8D8，带有微妙的发光效果
  - 引导文字背景：使用#FFFFFF，15-25%不透明度，根据场景背景动态调整
  - 引导文字：使用#FFFFFF，90%不透明度，确保在任何背景下都清晰可见

- **动效设计**
  - 场景切换：背景图使用3秒的交叉淡入淡出效果
  - 控制按钮：使用精细的涟漪效果，扩散范围限制在按钮区域内
  - 进度更新：进度条增长时使用平滑过渡，不跳跃
  - 完成动画：冥想结束时有舒缓的闪光和脉动效果

- **无缝响应式设计**
  - 不同屏幕尺寸的适配策略：
    - 小屏设备：控制元素尺寸缩小10%，间距减少15%
    - 大屏设备：增加15%的留白，优化视觉平衡
  - 横竖屏切换支持：自动重排布局，保持核心元素可见性

#### 场景设计详细规范

##### 1. 海岸沙滩场景设计




  






**语音引导功能**：
- **音频引导整合**：
  - 结合文字引导与对应的语音播放，增强沉浸感
  - 支持m4a格式的高质量音频播放，保证声音清晰度
  - 语音与背景环境音完美混合，音量平衡动态调整
  
- **海岸沙滩场景语音引导流程**：
  - 引导语音分为六个阶段，按序播放：
    1. 第一段引导语（assets/audio/beach_audio/beach_1.m4a）：冥想开始20秒后播放
    2. 第二段引导语（assets/audio/beach_audio/beach_2.m4a）：上一段结束一分钟后播放
    3. 第三段引导语（assets/audio/beach_audio/beach_3.m4a）：上一段结束一分钟后播放
    4. 第四段引导语（assets/audio/beach_audio/beach_4.m4a）：上一段结束一分钟后播放
    5. 第五段引导语（assets/audio/beach_audio/beach_5.m4a）：上一段结束一分钟后播放
    6. 第六段引导语（assets/audio/beach_audio/beach_6.m4a）：上一段结束一分钟后播放
  - 语音播放的同时显示对应的引导文字
  - 最后一段引导语结束后，冥想自动完成
  
- **语音引导文本内容**：
  - 第一段：引导语输出"现在，请找到一个舒适的姿势，轻轻闭上眼睛……
想象你正站在一片开阔的海岸边，阳光温柔地洒在皮肤上，远处传来层层叠叠的海浪声……
深吸一口气，让空气充满胸腔，再缓缓吐出，仿佛将身体里紧绷的思绪随风带走……
慢慢的感受 吸气 呼气"
  - 第二段：引导语输出"望向眼前的大海——它是深邃的蓝，还是泛着银光的灰绿？
海面上跃动的光斑，是否像星星坠入水中，随着波浪轻轻摇晃？"
  - 第三段：引导语输出"听……此刻的浪声是轻柔的呢喃，还是有力的低吼？
试着分辨潮水退去时，砂砾被卷走的细碎声响……'"
  - 第四段：引导语输出"赤脚感受沙粒的温度，是温热还是微凉？
当海风掠过发丝，你的额头、手臂或脖颈，哪一处最先感知到它的流动？"
  - 第五段：引导语输出"如果这片海面是你此刻的心境，它是平静如镜，还是暗流涌动？
若有心事像礁石沉在海底，你愿意让哪一层波浪托起它，轻轻带向远方……"
  - 第六段：引导语输出"现在，想象海风穿过你的身体，带走最后一丝疲惫……
看，沙滩上你写下的一句话，正被潮水温柔抹去，化作泡沫融进大海……
慢慢将注意力拉回呼吸，感受脚底与地面的接触……
听着我的声音，从3倒数时，带着海风的余韵睁开双眼：3——身体逐渐苏醒，2——手指微微颤动，1——带着宁静，回到此刻…"

- **技术实现要点**：
  - 使用微信小程序InnerAudioContext API实现多音频协同播放
  - 设置定时器精确控制各段引导语播放时机
  - 实现音频播放状态监听，确保引导流程平滑过渡
  - 用户退出场景时自动停止所有音频播放
  - 优化音频资源加载，确保播放流畅无卡顿

- **用户控制功能**：
  - 提供语音引导开关，允许用户选择是否启用语音引导
  - 支持语音音量单独调节，与背景音乐分离控制
  - 允许用户暂停/继续完整引导流程
  - 退出冥想时优雅处理音频资源释放

##### 2. 森林场景设计





**语音引导功能**：
- **音频引导整合**：
  - 结合文字引导与对应的语音播放，增强沉浸感
  - 支持m4a格式的高质量音频播放，保证声音清晰度
  - 语音与背景环境音完美混合，音量平衡动态调整
  
- **森林场景语音引导流程**：
  - 引导语音分为六个阶段，按序播放：
    1. 第一段引导语（assets/audio/forest_audio/forest_1.m4a）：冥想开始20秒后播放
    2. 第二段引导语（assets/audio/forest_audio/forest_2.m4a）：上一段结束一分钟后播放
    3. 第三段引导语（assets/audio/forest_audio/forest_3.m4a）：上一段结束一分钟后播放
    4. 第四段引导语（assets/audio/forest_audio/forest_4.m4a）：上一段结束一分钟后播放
    5. 第五段引导语（assets/audio/forest_audio/forest_5.m4a）：上一段结束一分钟后播放
    6. 第六段引导语（assets/audio/forest_audio/forest_6.m4a）：上一段结束一分钟后播放
  - 语音播放的同时显示对应的引导文字
  - 最后一段引导语结束后，冥想自动完成
  
- **语音引导文本内容**：
  - 第一段：引导语内容"现在，请闭上双眼，想象你独自走入一片古老的森林……
阳光透过层层叠叠的枝叶，在你脚下投下斑驳的光影……
深吸一口气，潮湿的空气中混合着松针的清香、泥土的微腥，还有某种说不清的深邃气息……
每走一步，脚下松软的苔藓都轻轻回弹，仿佛大地在回应你的重量……
慢慢的感受 吸气 呼气"
  - 第二段：引导语内容"抬头看——那些高耸的树干是笔直刺向天空，还是弯成拱门般的弧度？
树皮的纹路像不像某种神秘的文字，记录着千年的故事？"
  - 第三段：引导语内容"听……远处传来一声鸟鸣，是清亮的短音，还是婉转的长调？
当风穿过枝桠时，树叶的沙沙声是从左侧，还是右侧开始蔓延？"
  - 第四段：引导语内容"伸手触摸最近的树干，粗糙的触感让你联想到什么？
如果树根是大地的手掌，此刻它是否在托起你的双脚？"
  - 第五段：引导语内容"假设一片落叶飘到肩头，你会让它停留，还是轻轻拂去？
让林间的寂静像溪水般流过身体，冲刷掉多余的杂念……"
  - 第六段：引导语内容"现在，感受最后一丝阳光从皮肤上移开，森林的阴影温柔包裹着你……
记住这片宁静，将它收进呼吸的最深处……
开始从5倒数，每一步都更贴近现实：5——手指微微蜷缩，4——肩膀自然下垂，3——听见周围的声音，2——脚掌轻压地面，1——带着森林赠与的清醒，慢慢睁开双眼……"

- **技术实现要点**：
  - 使用微信小程序InnerAudioContext API实现多音频协同播放
  - 设置定时器精确控制各段引导语播放时机
  - 实现音频播放状态监听，确保引导流程平滑过渡
  - 用户退出场景时自动停止所有音频播放
  - 优化音频资源加载，确保播放流畅无卡顿

- **用户控制功能**：
  - 提供语音引导开关，允许用户选择是否启用语音引导
  - 支持语音音量单独调节，与背景音乐分离控制
  - 允许用户暂停/继续完整引导流程
  - 退出冥想时优雅处理音频资源释放

##### 3. 草原场景设计


**语音引导功能**：
- **音频引导整合**：
  - 结合文字引导与对应的语音播放，增强沉浸感
  - 支持m4a格式的高质量音频播放，保证声音清晰度
  - 语音与背景环境音完美混合，音量平衡动态调整
  
- **草原场景语音引导流程**：
  - 引导语音分为六个阶段，按序播放：
    1. 第一段引导语（assets/audio/grassland_audio/grassland_1.m4a）：冥想开始20秒后播放
    2. 第二段引导语（assets/audio/grassland_audio/grassland_2.m4a）：上一段结束一分钟后播放
    3. 第三段引导语（assets/audio/grassland_audio/grassland_3.m4a）：上一段结束一分钟后播放
    4. 第四段引导语（assets/audio/grassland_audio/grassland_4.m4a）：上一段结束一分钟后播放
    5. 第五段引导语（assets/audio/grassland_audio/grassland_5.m4a）：上一段结束一分钟后播放
    6. 第六段引导语（assets/audio/grassland_audio/grassland_6.m4a）：上一段结束一分钟后播放
  - 语音播放的同时显示对应的引导文字
  - 最后一段引导语结束后，冥想自动完成
  
- **语音引导文本内容**：
  - 第一段：引导语输出"请调整呼吸，想象你躺在一片无垠的草原中央……
天空低垂，云朵像蓬松的羊毛毯，缓缓掠过你的视线……
青草随着风俯身又立起，如同一场无声的集体舞蹈……
你闻到混合着野花甜香与泥土腥涩的气息，那是属于草原的独特语言……"
  - 第二段：引导语输出"远方的地平线是柔和的弧线，还是被山峦切割成锯齿状？
如果云影投在草原上，像不像一群沉默的巨兽在游走？"
  - 第三段：引导语输出"听——风掠过草尖的呼啸声，是否让你想起某首遥远的歌谣？
当一只蝴蝶停在你手背时，它的翅膀是透明的白，还是沾染了花粉的金黄？'"
  - 第四段：引导语输出"假设每一株草都在传递大地的脉搏，你的心跳是否开始与它共鸣？
若将烦恼化作一颗蒲公英的种子，你会交给哪一阵风带走？"
  - 第五段：引导语输出"此刻的你是融入草原的渺小存在，还是与天地同频的无限生命？"
  - 第六段：引导语输出"让青草托起你的身体，最后一次感受风穿过指缝的流速……
从5倒数，让意识如候鸟归巢般返回：5——舌尖轻触上颚，4——眼皮微微颤动，3——听见自己的呼吸声，2——脚趾在鞋内舒展，1——带着草原赠予的轻盈，缓缓睁开眼睛……"

- **技术实现要点**：
  - 使用微信小程序InnerAudioContext API实现多音频协同播放
  - 设置定时器精确控制各段引导语播放时机
  - 实现音频播放状态监听，确保引导流程平滑过渡
  - 用户退出场景时自动停止所有音频播放
  - 优化音频资源加载，确保播放流畅无卡顿

- **用户控制功能**：
  - 提供语音引导开关，允许用户选择是否启用语音引导
  - 支持语音音量单独调节，与背景音乐分离控制
  - 允许用户暂停/继续完整引导流程
  - 退出冥想时优雅处理音频资源释放

#### 交互功能设计增强
- **场景预览功能**：
  - 在选择场景时，提供5秒快速预览，包括视觉和音效
  - 预览后自动返回选择界面，除非用户确认进入
  - 预览期间显示"继续体验"按钮，点击直接进入完整冥想

- **个性化引导节奏控制**：
  - 添加引导语速度控制选项（慢速/标准/快速）
  - 提供"暂停引导"功能，只保留环境音，用户可随时恢复
  - 记忆用户偏好，下次启动时自动应用

- **沉浸式反馈机制**：
  - 专注时长里程碑：当用户专注达到2分钟、5分钟、10分钟时，有微妙的正面反馈
  - 深呼吸指导：定时出现的呼吸引导动画，与场景融合
  - 完成奖励：设计与场景相关的成就卡片，富有艺术感

- **无干扰模式**：
  - 一键隐藏所有控制元素，进入纯净冥想状态
  - 轻触屏幕任意位置可重新显示控制元素
  - 启用时状态栏也会隐藏，实现真正全屏体验

- **环境音自定义**：
  - 提供音效混合器，可调节各层环境音的音量
  - 设置1-3个个人预设，快速切换偏好的音效组合
  - 添加白噪音选项，与环境音混合使用

#### 进阶视觉增强
- **昼夜交替效果**：
  - 根据手机实际时间，微妙调整场景中的光线效果
  - 昼夜色温自动适应，夜间使用更为温暖的光线
  - 提供手动"黄昏模式"，减少蓝光，适合睡前使用

- **天气融合系统**：
  - 可选择是否与当地天气同步（需授权位置信息）
  - 下雨天气会在场景中加入雨滴效果和雨声
  - 阴天会调整光线，减少强光对比

- **微动态细节**：
  - 海滩场景：偶尔出现贝壳或海星的近距离特写
  - 森林场景：蝴蝶或蜻蜓短暂飞过画面
  - 草原场景：野花随风摇曳的特写镜头

- **完成仪式设计**：
  - 设计优雅的结束动画，如日落或星空渐显
  - 结束反思的卡片设计与场景风格一致
  - 收藏喜欢的引导问题功能，建立个人问题库

### 3.4 个人页面（profile）
#### 主要元素
- 用户基本信息区域（顶部卡片）
- 冥想数据总览卡片（关键统计数据）
- 时间范围选择器（本周/本月/今年/全部）
- 冥想数据分析卡片（当前所选时间范围的详细数据）
- 冥想日历可视化区域
- 底部导航栏（与首页相同）
- 背景：渐变设计，从顶部淡蓝色过渡到底部淡绿色

#### 功能区块详情
1. 个人信息区域
   - 用户头像（圆形，带有细微发光效果）
   - 用户昵称和个性签名
   - 冥想等级和经验值进度条

2. 冥想数据总览卡片
   - 三个关键指标并排展示：总天数、总次数、总分钟数
   - 数字采用应用主题色(#4A90E2)
   - 动画效果：数字变化时有平滑过渡动画

3. 时间范围选择器
   - 四个选项：本周、本月、今年、全部
   - 当前选中选项使用下划线标记
   - 选项切换时有平滑滑动动画

4. 冥想数据分析卡片
   - 三个数据指标：冥想天数、冥想次数、冥想分钟数
   - 根据选择的时间范围显示相应的统计数据

5. 冥想日历可视化区域
   - 顶部月份导航：左右箭头和当前年月显示
   - 周一至周日标题行
   - 日期网格：显示当前月份日期
   - 视觉差异化：
     - 当前日期：特殊标记
     - 有冥想记录的日期：底部小圆点标记

6. 冥想记录详情
   - 点击日期显示当天的冥想记录
   - 每条记录包含时间、类型、时长
   - 无记录状态显示友好的空状态提示

#### 交互功能
- 日历交互：支持月份切换和日期点击查看详情
- 时间范围切换：切换不同时间段的统计数据
- 导航功能：通过底部导航栏切换页面
- 个人信息编辑：点击相应区域进入编辑模式

### 3.5 个人信息设置页面（settings）
#### 主要元素
- 顶部自定义导航栏（含返回按钮和页面标题）
- 个人基本信息修改区
- 应用设置区（主题、音量等全局配置）
- 账号与安全区
- 帮助与反馈区
- 背景：淡色系背景，保持与主页风格一致但更简约

#### 功能区块设计
1. 个人基本信息修改区
   - 头像修改（支持从相册选择或拍照）
   - 昵称编辑
   - 个性签名
   - 冥想目标设置

2. 应用设置区
   - 主题切换
   - 声音设置
   - 冥想提醒设置
   - 数据展示偏好

3. 账号与安全区
   - 微信账号关联状态
   - 数据同步设置
   - 隐私政策入口
   - 用户协议入口

4. 帮助与反馈区
   - 常见问题解答
   - 反馈问题入口
   - 联系客服选项
   - 关于应用（版本信息、开发者信息）

#### 交互设计
- 统一的界面元素和间距
- 编辑模式使用弹出层或独立编辑页面
- 保存修改时显示成功反馈
- 重要设置修改时二次确认

## 4. 技术架构
### 4.1 前端框架
- 使用微信小程序原生框架
- 采用组件化开发
- 使用WXSS进行样式管理
- 使用自定义导航栏配合原生tabBar

### 4.2 数据管理
- 使用本地存储保存用户偏好和冥想记录
- 音频资源本地化存储
- 场景资源按需加载
- 日历数据结构优化，支持快速查询和渲染
- 全局状态管理使用app.globalData

### 4.3 音频处理
- 使用微信小程序音频API (wx.createInnerAudioContext)
- 支持背景音乐播放控制
- 音量渐变与静音控制
- 页面切换时音频状态管理

### 4.4 数据可视化
- 使用微信小程序原生组件开发日历
- 自定义进度条实现
- 数据动态更新与动画效果

### 4.5 用户信息管理
- 用户信息本地存储
- 冥想记录与统计数据结构设计
- 等级和经验值计算逻辑

## 5. 性能优化
- 图片资源压缩和优化
- 音频文件分段加载
- 页面预加载机制
- 内存管理优化（及时清理定时器等资源）
- 日历渲染性能优化
- 大量数据懒加载处理
- 动画效果优化（使用CSS动画代替JS动画）

## 6. 后续扩展计划
- 用户数据云同步
- 冥想记录导出功能
- 社区分享功能
- 个性化推荐
- 更多场景添加
- 冥想日记功能
- 支持自定义冥想引导录音
- 多语言支持
- 夜间模式
- 数据备份与恢复
- 好友冥想进度比较
- 冥想成果分享到朋友圈
- 冥想小组/挑战功能
- 冥想效果评估（基于用户反馈）
- 与其他健康App数据互通

## 7. 冥想经验与等级系统

### 7.1 经验值机制
- **基础经验获取**：每冥想1分钟获得1点经验值
- **连续冥想奖励**：
  - 连续冥想1-2天：每天额外获得10点经验（每天仅限一次）
  - 连续冥想3-5天：每天额外获得15点经验（每天仅限一次）
  - 连续冥想6-10天：每天额外获得20点经验（每天仅限一次）
  - 连续冥想11-20天：每天额外获得25点经验（每天仅限一次）
  - 连续冥想21天及以上：每天额外获得30点经验（每天仅限一次）
- **经验值计算**：冥想完成后立即计算获得的经验值并更新用户数据
- **断签惩罚**：如果中断连续冥想（一天未冥想），连续天数会重置为1

### 7.2 等级系统
- **等级计算**：每500点经验值提升1级
- **等级显示**：在个人资料页顶部显示当前等级和进度条
- **等级特权**：更高等级将解锁更多冥想场景和背景音乐（预留扩展功能）

### 7.3 UI展示
- **等级进度条**：在用户头像旁边显示细长进度条，直观展示当前等级进度
- **经验值显示**：在进度条下方显示当前经验值和下一级所需经验值
- **等级图标**：不同等级区间使用不同图标样式，增强成就感
- **动画效果**：经验值增加时有平滑的增长动画和微妙的闪光效果

### 7.4 数据存储
- **用户资料**：将经验值、等级、连续天数保存在用户资料中
- **冥想记录**：每次冥想记录包含时长、获得经验等详细数据
- **数据同步**：支持将冥想数据备份和恢复，确保用户数据安全

### 7.5 统计与分析
- **经验来源分析**：统计经验值的主要来源（基础冥想、连续奖励等）
- **成长曲线**：展示用户经验累积的历史趋势

- **语音引导功能**：
  - 结合文字引导与对应的语音播放，增强沉浸感
  - 支持m4a格式的高质量音频播放，保证声音清晰度
  - 语音与背景环境音完美混合，音量平衡动态调整

- **实现优化方案**：
  1. **精确的时间控制机制**：
     - 使用 Promise 链式调用替代 setTimeout，确保引导语按序播放
     - 引入音频预加载机制，减少播放延迟
     - 实现精确的音频时长控制系统：
       ```javascript
       const AUDIO_TIMELINE = {
         initialDelay: 20000,  // 初始等待时间
         segmentInterval: 60000,  // 段落间隔时间
         segments: [
           { duration: 120000, fadeIn: 1000, fadeOut: 1000 },  // 第一段
           { duration: 90000, fadeIn: 1000, fadeOut: 1000 },   // 第二段
           { duration: 90000, fadeIn: 1000, fadeOut: 1000 },   // 第三段
           { duration: 90000, fadeIn: 1000, fadeOut: 1000 },   // 第四段
           { duration: 90000, fadeIn: 1000, fadeOut: 1000 },   // 第五段
           { duration: 120000, fadeIn: 1000, fadeOut: 1000 }   // 第六段
         ]
       };
       ```

  2. **音频状态管理优化**：
     - 引入音频状态机制：
       ```javascript
       const AUDIO_STATES = {
         IDLE: 'idle',         // 初始状态
         PREPARING: 'preparing', // 准备播放
         PLAYING: 'playing',    // 播放中
         PAUSED: 'paused',     // 暂停
         TRANSITIONING: 'transitioning', // 切换中
         COMPLETED: 'completed' // 完成
       };
       ```
     - 实现音频状态监控系统，确保状态转换的准确性
     - 添加错误恢复机制，处理音频加载失败等异常情况

  3. **音量控制优化**：
     - 实现精确的音量渐变控制：
       ```javascript
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
       ```
     - 添加动态音量平衡算法，根据场景自动调整各音轨音量

  4. **引导内容同步机制**：
     - 建立文本与音频的精确同步系统：
       ```javascript
       const GUIDANCE_SYNC = {
         segments: [
           {
             text: "请调整呼吸，想象你躺在一片无垠的草原中央……",
             audioPath: "grassland_1.m4a",
             duration: 120
           },
           // ... 其他段落配置
         ],
         textFadeTime: 500,  // 文字渐变时间
         syncThreshold: 100  // 同步阈值(毫秒)
       };
       ```
     - 实现文本显示的平滑过渡效果
     - 添加音频播放进度指示器

  5. **暂停/恢复机制优化**：
     - 实现精确的时间补偿机制：
       ```javascript
       const PAUSE_CONTROL = {
         timeOffset: 0,      // 暂停时间补偿
         fadeOutTime: 800,   // 暂停时渐隐时间
         fadeInTime: 1000,   // 恢复时渐入时间
         syncDelay: 200      // 同步延迟
       };
       ```
     - 确保暂停后恢复时保持原有进度
     - 添加音频同步检查机制

  6. **错误处理与恢复机制**：
     - 定义详细的错误处理策略：
       ```javascript
       const ERROR_HANDLING = {
         retryAttempts: 3,    // 重试次数
         retryDelay: 1000,    // 重试延迟
         fallbackOptions: {    // 降级选项
           useLocalAudio: true,
           textOnly: false
         }
       };
       ```
     - 实现音频加载失败的优雅降级方案
     - 添加用户提示和反馈机制