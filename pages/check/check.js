const util = require('../../utils/util.js')

Page({
  data: {
    queryType: 'order',
    orderNo: '',
    queryResult: null,
    checkRecords: []
  },

  onLoad() {
    this.loadCheckRecords()
  },

  switchQueryType(e) {
    this.setData({
      queryType: e.currentTarget.dataset.type,
      queryResult: null
    })
  },

  onInputChange(e) {
    this.setData({
      orderNo: e.detail.value
    })
  },

  scanCode() {
    wx.scanCode({
      success: (res) => {
        this.setData({
          orderNo: res.result
        })
        this.queryResult()
      },
      fail: () => {
        wx.showToast({
          title: '扫描失败',
          icon: 'none'
        })
      }
    })
  },

  queryResult() {
    if (!this.data.orderNo) {
      wx.showToast({
        title: '请输入投注单号',
        icon: 'none'
      })
      return
    }

    const betRecords = wx.getStorageSync('betRecords') || []
    const bet = betRecords.find(item => item.orderNo === this.data.orderNo)

    if (!bet) {
      wx.showToast({
        title: '未找到该订单',
        icon: 'none'
      })
      return
    }

    const results = wx.getStorageSync('lotteryResults') || []
    const latestResult = results[0]

    const winInfo = util.checkWin(bet.numbers, latestResult.numbers)
    
    const queryResult = {
      orderNo: bet.orderNo,
      numbers: bet.numbers,
      resultNumbers: latestResult.numbers,
      isWin: winInfo.level > 0,
      level: winInfo.level,
      prize: winInfo.prize * bet.multiple,
      redMatch: winInfo.redMatch,
      blueMatch: winInfo.blueMatch
    }

    this.setData({ queryResult })
    this.saveCheckRecord(queryResult)
  },

  saveCheckRecord(result) {
    const checkRecords = wx.getStorageSync('checkRecords') || []
    const newRecord = {
      id: Date.now(),
      orderNo: result.orderNo,
      isWin: result.isWin,
      prize: result.prize,
      time: new Date().toLocaleString()
    }
    checkRecords.unshift(newRecord)
    wx.setStorageSync('checkRecords', checkRecords)
    this.loadCheckRecords()
  },

  loadCheckRecords() {
    const records = wx.getStorageSync('checkRecords') || []
    this.setData({
      checkRecords: records.slice(0, 10)
    })
  }
})