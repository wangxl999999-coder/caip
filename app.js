App({
  globalData: {
    userInfo: null,
    isLogin: false
  },

  onLaunch() {
    this.checkLoginStatus();
    this.initMockData();
  },

  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLogin = true;
    }
  },

  initMockData() {
    if (!wx.getStorageSync('lotteryResults')) {
      this.generateMockResults();
    }
    if (!wx.getStorageSync('betRecords')) {
      wx.setStorageSync('betRecords', []);
    }
    if (!wx.getStorageSync('checkRecords')) {
      wx.setStorageSync('checkRecords', []);
    }
    if (!wx.getStorageSync('stations')) {
      this.generateMockStations();
    }
  },

  generateMockResults() {
    const results = [];
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const issue = this.formatDate(date) + String(100 + i).slice(-3);
      results.push({
        id: i + 1,
        issue: issue,
        date: this.formatDate(date),
        numbers: this.generateNumbers(),
        type: '双色球',
        sales: Math.floor(Math.random() * 300000000 + 100000000),
        pool: Math.floor(Math.random() * 1000000000 + 500000000)
      });
    }
    wx.setStorageSync('lotteryResults', results);
  },

  generateMockStations() {
    const stations = [
      { id: 1, name: '第001号投注站', address: '北京市朝阳区建国路88号', phone: '010-12345678', distance: '0.5km' },
      { id: 2, name: '第002号投注站', address: '北京市海淀区中关村大街1号', phone: '010-23456789', distance: '1.2km' },
      { id: 3, name: '第003号投注站', address: '北京市西城区西单北大街120号', phone: '010-34567890', distance: '2.1km' },
      { id: 4, name: '第004号投注站', address: '北京市东城区王府井大街255号', phone: '010-45678901', distance: '3.0km' },
      { id: 5, name: '第005号投注站', address: '北京市丰台区南三环西路16号', phone: '010-56789012', distance: '4.5km' }
    ];
    wx.setStorageSync('stations', stations);
  },

  generateNumbers() {
    const red = [];
    while (red.length < 6) {
      const num = Math.floor(Math.random() * 33 + 1);
      if (!red.includes(num)) {
        red.push(num);
      }
    }
    red.sort((a, b) => a - b);
    const blue = Math.floor(Math.random() * 16 + 1);
    return { red, blue };
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
})