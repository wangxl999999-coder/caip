const app = getApp()

Page({
  data: {
    isLogin: false,
    userInfo: {},
    stats: {
      totalBets: 0,
      totalAmount: 0,
      winCount: 0,
      totalPrize: 0
    }
  },

  onLoad() {
    this.checkLoginStatus()
  },

  onShow() {
    this.checkLoginStatus()
    if (app.globalData.isLogin) {
      this.loadStats()
    }
  },

  checkLoginStatus() {
    this.setData({
      isLogin: app.globalData.isLogin,
      userInfo: app.globalData.userInfo || {}
    })
  },

  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  goToBetRecord() {
    if (!app.globalData.isLogin) {
      this.showLoginTip()
      return
    }
    wx.navigateTo({
      url: '/pages/bet-record/bet-record'
    })
  },

  goToWinRecord() {
    if (!app.globalData.isLogin) {
      this.showLoginTip()
      return
    }
    wx.navigateTo({
      url: '/pages/win-record/win-record'
    })
  },

  contactService() {
    wx.showModal({
      title: '在线客服',
      content: '客服电话：400-123-4567\n工作时间：9:00-18:00',
      showCancel: false
    })
  },

  aboutUs() {
    wx.showModal({
      title: '关于我们',
      content: '彩票小程序 v1.0.0\n提供便捷的彩票信息查询服务',
      showCancel: false
    })
  },

  showLoginTip() {
    wx.showModal({
      title: '提示',
      content: '请先登录',
      success: (res) => {
        if (res.confirm) {
          this.goToLogin()
        }
      }
    })
  },

  loadStats() {
    const betRecords = wx.getStorageSync('betRecords') || []
    const checkRecords = wx.getStorageSync('checkRecords') || []
    
    const totalAmount = betRecords.reduce((sum, item) => sum + item.amount, 0)
    const winRecords = checkRecords.filter(item => item.isWin)
    const totalPrize = winRecords.reduce((sum, item) => sum + item.prize, 0)

    this.setData({
      stats: {
        totalBets: betRecords.length,
        totalAmount: '¥' + totalAmount,
        winCount: winRecords.length,
        totalPrize: '¥' + totalPrize
      }
    })
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          app.globalData.userInfo = null
          app.globalData.isLogin = false
          this.setData({
            isLogin: false,
            userInfo: {}
          })
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  }
})