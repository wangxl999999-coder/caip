const util = require('../../utils/util.js')

Page({
  data: {
    latestResult: {},
    historyList: []
  },

  onLoad() {
    this.loadResults()
  },

  onShow() {
    this.loadResults()
  },

  loadResults() {
    const results = wx.getStorageSync('lotteryResults') || []
    
    if (results.length > 0) {
      const latest = results[0]
      latest.sum = util.calculateSum(latest.numbers.red)
      latest.span = util.calculateSpan(latest.numbers.red)
      latest.oddEven = util.calculateOddEven(latest.numbers.red)
      
      const history = results.slice(1, 11).map(item => ({
        ...item,
        sum: util.calculateSum(item.numbers.red),
        span: util.calculateSpan(item.numbers.red),
        oddEven: util.calculateOddEven(item.numbers.red)
      }))
      
      this.setData({
        latestResult: latest,
        historyList: history
      })
    }
  }
})