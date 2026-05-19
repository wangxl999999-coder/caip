const util = require('../../utils/util.js')

Page({
  data: {
    latestResult: null,
    nearbyStations: []
  },

  onLoad() {
    this.loadLatestResult()
    this.loadNearbyStations()
  },

  onShow() {
    this.loadLatestResult()
  },

  loadLatestResult() {
    const results = wx.getStorageSync('lotteryResults') || []
    if (results.length > 0) {
      this.setData({
        latestResult: results[0]
      })
    }
  },

  loadNearbyStations() {
    const stations = wx.getStorageSync('stations') || []
    this.setData({
      nearbyStations: stations.slice(0, 3)
    })
  },

  goToResult() {
    wx.switchTab({
      url: '/pages/result/result'
    })
  },

  goToBet() {
    wx.switchTab({
      url: '/pages/bet/bet'
    })
  },

  goToCheck() {
    wx.navigateTo({
      url: '/pages/check/check'
    })
  },

  goToTrend() {
    wx.switchTab({
      url: '/pages/trend/trend'
    })
  },

  goToStation() {
    wx.navigateTo({
      url: '/pages/station/station'
    })
  },

  viewStationDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/station/station?id=${id}`
    })
  }
})