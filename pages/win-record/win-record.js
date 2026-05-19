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
    const checkRecords = wx.getStorageSync('checkRecords') || []
    const winRecords = checkRecords.filter(item => item.isWin)
    this.setData({ records: winRecords })
  },

  goToBet() {
    wx.switchTab({
      url: '/pages/bet/bet'
    })
  }
})