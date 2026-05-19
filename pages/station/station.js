Page({
  data: {
    stations: []
  },

  onLoad() {
    this.loadStations()
  },

  loadStations() {
    const stations = wx.getStorageSync('stations') || []
    this.setData({ stations })
  },

  callPhone(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
      fail: () => {
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        })
      }
    })
  },

  navigateTo(e) {
    const address = e.currentTarget.dataset.address
    wx.openLocation({
      latitude: 39.9042,
      longitude: 116.4074,
      name: address,
      address: address,
      fail: () => {
        wx.showToast({
          title: '打开地图失败',
          icon: 'none'
        })
      }
    })
  }
})