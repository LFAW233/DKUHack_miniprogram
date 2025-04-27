// 获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: 0,
    weekdays: ['日', '一', '二', '三', '四', '五', '六'], // 星期显示
    daysArray: [], // 日历网格
    currentYear: 0, // 当前显示的年
    currentMonth: 0, // 当前显示的月
    selectedDate: '', // 选中的日期 YYYY-MM-DD
    selectedDateFormatted: '', // 格式化后的选中日期显示
    dayRecords: [], // 选中日期的冥想记录
    showModal: false, // 是否显示编辑弹窗
    currentRecord: {}, // 当前编辑的记录
    currentRecordIndex: -1, // 当前编辑记录的索引
    diaryContent: '', // 日记内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取状态栏高度
    this.getStatusBarHeight();
    
    // 初始化日历
    this.initCalendar();
    
    // 如果有日期参数，则选择该日期
    if (options.date) {
      this.selectDate({
        currentTarget: {
          dataset: {
            date: options.date
          }
        }
      });
    }
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
   * 初始化日历
   */
  initCalendar: function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    this.setData({
      currentYear: year,
      currentMonth: month
    });
    
    this.generateCalendarDays(year, month);
    
    // 选择当前日期
    const today = app.formatDate(now);
    this.selectDate({
      currentTarget: {
        dataset: {
          date: today
        }
      }
    });
  },

  /**
   * 生成日历网格
   */
  generateCalendarDays: function(year, month) {
    // 获取当月第一天是星期几
    const firstDay = new Date(year, month, 1).getDay();
    
    // 获取当月天数
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 获取上个月天数
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // 计算需要显示的上个月天数
    const prevMonthDays = firstDay === 0 ? 0 : firstDay;
    
    // 获取所有冥想记录，用于标记
    const allRecords = app.globalData.meditationHistory;
    const recordsMap = {};
    const diaryMap = {};
    
    // 建立日期-记录映射
    allRecords.forEach(record => {
      const dateStr = app.formatDate(new Date(record.timestamp));
      if (!recordsMap[dateStr]) {
        recordsMap[dateStr] = [];
      }
      recordsMap[dateStr].push(record);
      
      // 检查是否有日记
      if (record.diary) {
        diaryMap[dateStr] = true;
      }
    });
    
    const days = [];
    
    // 添加上个月的日期
    for (let i = 0; i < prevMonthDays; i++) {
      const day = daysInPrevMonth - prevMonthDays + i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = this.formatDateStr(prevYear, prevMonth, day);
      
      days.push({
        day,
        date: dateStr,
        currentMonth: false,
        hasRecord: !!recordsMap[dateStr],
        hasDiary: !!diaryMap[dateStr]
      });
    }
    
    // 添加当月日期
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = this.formatDateStr(year, month, i);
      
      days.push({
        day: i,
        date: dateStr,
        currentMonth: true,
        hasRecord: !!recordsMap[dateStr],
        hasDiary: !!diaryMap[dateStr]
      });
    }
    
    // 计算需要显示的下个月天数
    const totalDays = 42; // 6行7列
    const nextMonthDays = totalDays - prevMonthDays - daysInMonth;
    
    // 添加下个月的日期
    for (let i = 1; i <= nextMonthDays; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = this.formatDateStr(nextYear, nextMonth, i);
      
      days.push({
        day: i,
        date: dateStr,
        currentMonth: false,
        hasRecord: !!recordsMap[dateStr],
        hasDiary: !!diaryMap[dateStr]
      });
    }
    
    this.setData({
      daysArray: days
    });
  },

  /**
   * 格式化日期字符串 YYYY-MM-DD
   */
  formatDateStr: function(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  },

  /**
   * 格式化日期为可读字符串 (年月日 星期几)
   */
  formatReadableDate: function(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const weekDay = this.data.weekdays[date.getDay()];
    
    return `${year}年${month}月${day}日 星期${weekDay}`;
  },

  /**
   * 格式化时间为 HH:MM
   */
  formatTime: function(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
  },

  /**
   * 切换到上个月
   */
  prevMonth: function() {
    let { currentYear, currentMonth } = this.data;
    
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear -= 1;
    } else {
      currentMonth -= 1;
    }
    
    this.setData({
      currentYear,
      currentMonth
    });
    
    this.generateCalendarDays(currentYear, currentMonth);
  },

  /**
   * 切换到下个月
   */
  nextMonth: function() {
    let { currentYear, currentMonth } = this.data;
    
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }
    
    this.setData({
      currentYear,
      currentMonth
    });
    
    this.generateCalendarDays(currentYear, currentMonth);
  },

  /**
   * 选择日期
   */
  selectDate: function(e) {
    const date = e.currentTarget.dataset.date;
    const formattedDate = this.formatReadableDate(date);
    
    this.setData({
      selectedDate: date,
      selectedDateFormatted: formattedDate,
    });
    
    this.loadDayRecords(date);
  },

  /**
   * 加载选中日期的冥想记录
   */
  loadDayRecords: function(date) {
    const records = app.globalData.meditationHistory.filter(record => {
      const recordDate = app.formatDate(new Date(record.timestamp));
      return recordDate === date;
    });
    
    // 添加格式化后的时间和调整顺序
    const processedRecords = records.map(record => {
      return {
        ...record,
        formattedTime: this.formatTime(record.timestamp)
      };
    }).sort((a, b) => a.timestamp - b.timestamp);
    
    this.setData({
      dayRecords: processedRecords
    });
  },

  /**
   * 编辑日记
   */
  editDiary: function(e) {
    const index = e.currentTarget.dataset.index;
    const record = this.data.dayRecords[index];
    
    this.setData({
      showModal: true,
      currentRecord: record,
      currentRecordIndex: index,
      diaryContent: record.diary || ''
    });
  },

  /**
   * 监听日记输入
   */
  onDiaryInput: function(e) {
    this.setData({
      diaryContent: e.detail.value
    });
  },

  /**
   * 保存日记
   */
  saveDiary: function() {
    const { currentRecordIndex, diaryContent } = this.data;
    
    if (currentRecordIndex >= 0) {
      // 更新本地数据
      const dayRecords = this.data.dayRecords;
      dayRecords[currentRecordIndex].diary = diaryContent;
      
      // 更新全局数据
      const allRecords = app.globalData.meditationHistory;
      const recordId = dayRecords[currentRecordIndex].id;
      
      const globalIndex = allRecords.findIndex(r => r.id === recordId);
      if (globalIndex >= 0) {
        allRecords[globalIndex].diary = diaryContent;
        
        // 保存到本地存储
        wx.setStorageSync('meditationHistory', allRecords);
        
        // 更新页面状态
        this.setData({
          dayRecords,
          showModal: false
        });
        
        // 刷新日历中的日记标记
        this.generateCalendarDays(this.data.currentYear, this.data.currentMonth);
        
        wx.showToast({
          title: '日记保存成功',
          icon: 'success',
          duration: 1500
        });
      }
    }
  },

  /**
   * 关闭弹窗
   */
  closeModal: function() {
    this.setData({
      showModal: false,
      currentRecord: {},
      currentRecordIndex: -1,
      diaryContent: ''
    });
  },

  /**
   * 返回上一页
   */
  navigateBack: function() {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 刷新日历数据
    this.generateCalendarDays(this.data.currentYear, this.data.currentMonth);
    
    // 刷新选中日期的记录
    if (this.data.selectedDate) {
      this.loadDayRecords(this.data.selectedDate);
    }
  }
}); 