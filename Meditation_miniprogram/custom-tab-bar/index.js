Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#4A90E2",
    list: [{
      pagePath: "/pages/index/index",
      text: "主页",
      iconPath: "/assets/icons/home.png",
      selectedIconPath: "/assets/icons/home.png"
    }, {
      pagePath: "/pages/profile/profile",
      text: "我的",
      iconPath: "/assets/icons/profile.png",
      selectedIconPath: "/assets/icons/profile.png"
    }]
  },
  attached() {
    // 获取当前页面路径
    const pages = getCurrentPages();
    if (!pages || pages.length === 0) {
      console.log('No pages available yet');
      return;
    }
    
    const currentPage = pages[pages.length - 1];
    if (!currentPage) {
      console.log('Current page is undefined');
      return;
    }
    
    const route = '/' + (currentPage.route || '');
    
    // 设置选中的tabBar项
    const list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      if (route === list[i].pagePath) {
        this.setData({
          selected: i
        });
        break;
      }
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({url});
      this.setData({
        selected: data.index
      });
    }
  }
}) 