const util = require('../../utils/util.js')

Page({
  data: {
    currentTab: 0,
    trendData: [],
    redStats: [],
    blueStats: []
  },

  onLoad() {
    this.loadTrendData()
  },

  onShow() {
    this.loadTrendData()
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentTab: index
    })
  },

  loadTrendData() {
    let results = wx.getStorageSync('lotteryResults') || []
    
    if (results.length === 0) {
      const app = getApp()
      app.generateMockResults()
      results = wx.getStorageSync('lotteryResults') || []
    }

    const trendData = results.slice(0, 10).map(item => ({
      ...item,
      sum: util.calculateSum(item.numbers.red),
      span: util.calculateSpan(item.numbers.red),
      oddEven: util.calculateOddEven(item.numbers.red)
    }))

    const redCounts = {}
    const blueCounts = {}
    
    for (let i = 1; i <= 33; i++) {
      redCounts[i] = 0
    }
    for (let i = 1; i <= 16; i++) {
      blueCounts[i] = 0
    }

    results.slice(0, 10).forEach(item => {
      item.numbers.red.forEach(num => {
        redCounts[num]++
      })
      blueCounts[item.numbers.blue]++
    })

    const redStats = Object.entries(redCounts)
      .map(([num, count]) => ({
        num: parseInt(num),
        count
      }))
      .sort((a, b) => b.count - a.count)

    const blueStats = Object.entries(blueCounts)
      .map(([num, count]) => ({
        num: parseInt(num),
        count
      }))
      .sort((a, b) => b.count - a.count)

    this.setData({
      trendData,
      redStats,
      blueStats
    })
  }
})