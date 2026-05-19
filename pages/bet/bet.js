const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    redBalls: Array.from({ length: 33 }, (_, i) => i + 1),
    blueBalls: Array.from({ length: 16 }, (_, i) => i + 1),
    selectedRed: [],
    selectedBlue: null,
    multiple: 1,
    betCount: 0,
    totalAmount: 0,
    canBet: false
  },

  onLoad() {
    this.calculateBet()
  },

  toggleRedBall(e) {
    const num = e.currentTarget.dataset.num
    const selectedRed = [...this.data.selectedRed]
    const index = selectedRed.indexOf(num)
    
    if (index > -1) {
      selectedRed.splice(index, 1)
    } else if (selectedRed.length < 6) {
      selectedRed.push(num)
      selectedRed.sort((a, b) => a - b)
    } else {
      wx.showToast({
        title: '最多选6个红球',
        icon: 'none'
      })
      return
    }
    
    this.setData({ selectedRed })
    this.calculateBet()
  },

  toggleBlueBall(e) {
    const num = e.currentTarget.dataset.num
    this.setData({
      selectedBlue: this.data.selectedBlue === num ? null : num
    })
    this.calculateBet()
  },

  increaseMultiple() {
    if (this.data.multiple < 99) {
      this.setData({
        multiple: this.data.multiple + 1
      })
      this.calculateBet()
    }
  },

  decreaseMultiple() {
    if (this.data.multiple > 1) {
      this.setData({
        multiple: this.data.multiple - 1
      })
      this.calculateBet()
    }
  },

  calculateBet() {
    const betCount = (this.data.selectedRed.length === 6 && this.data.selectedBlue) ? 1 : 0
    const totalAmount = betCount * this.data.multiple * 2
    const canBet = betCount > 0
    
    this.setData({
      betCount,
      totalAmount,
      canBet
    })
  },

  randomSelect() {
    const red = []
    while (red.length < 6) {
      const num = Math.floor(Math.random() * 33 + 1)
      if (!red.includes(num)) {
        red.push(num)
      }
    }
    red.sort((a, b) => a - b)
    const blue = Math.floor(Math.random() * 16 + 1)
    
    this.setData({
      selectedRed: red,
      selectedBlue: blue
    })
    this.calculateBet()
    
    wx.showToast({
      title: '机选完成',
      icon: 'success'
    })
  },

  confirmBet() {
    if (!app.globalData.isLogin) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return
    }

    wx.showModal({
      title: '确认投注',
      content: `共${this.data.betCount}注，${this.data.multiple}倍，金额¥${this.data.totalAmount}`,
      success: (res) => {
        if (res.confirm) {
          this.doBet()
        }
      }
    })
  },

  doBet() {
    const orderNo = util.generateOrderNo()
    const betRecord = {
      id: Date.now(),
      orderNo: orderNo,
      numbers: {
        red: [...this.data.selectedRed],
        blue: this.data.selectedBlue
      },
      multiple: this.data.multiple,
      amount: this.data.totalAmount,
      betCount: this.data.betCount,
      time: new Date().getTime(),
      status: 'pending',
      prize: 0
    }

    const betRecords = wx.getStorageSync('betRecords') || []
    betRecords.unshift(betRecord)
    wx.setStorageSync('betRecords', betRecords)

    wx.showModal({
      title: '投注成功',
      content: `投注单号：${orderNo}`,
      showCancel: false,
      success: () => {
        this.setData({
          selectedRed: [],
          selectedBlue: null,
          multiple: 1,
          betCount: 0,
          totalAmount: 0,
          canBet: false
        })
      }
    })
  }
})