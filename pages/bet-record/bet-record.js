Page({
  data: {
    records: []
  },

  onLoad() {
    this.loadRecords()
  },

  onShow() {
    this.loadRecords()
  },

  loadRecords() {
    const records = wx.getStorageSync('betRecords') || []
    records.forEach(item => {
      item.time = new Date(item.time).toLocaleString()
    })
    this.setData({ records })
  },

  goToBet() {
    wx.switchTab({
      url: '/pages/bet/bet'
    })
  }
})