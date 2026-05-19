const app = getApp()

Page({
  data: {
    phone: '',
    code: '',
    codeCountdown: 0
  },

  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  onCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },

  sendCode() {
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!/^1\d{10}$/.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }

    this.setData({
      codeCountdown: 60
    })

    const timer = setInterval(() => {
      if (this.data.codeCountdown > 0) {
        this.setData({
          codeCountdown: this.data.codeCountdown - 1
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
  },

  login() {
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!this.data.code) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }

    this.doLogin()
  },

  wechatLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = {
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          phone: '138****8888'
        }
        this.saveUserInfo(userInfo)
      },
      fail: () => {
        wx.showToast({
          title: '授权失败',
          icon: 'none'
        })
      }
    })
  },

  doLogin() {
    const userInfo = {
      nickName: '彩票用户' + this.data.phone.slice(-4),
      avatarUrl: '',
      phone: this.data.phone
    }
    this.saveUserInfo(userInfo)
  },

  saveUserInfo(userInfo) {
    wx.setStorageSync('userInfo', userInfo)
    app.globalData.userInfo = userInfo
    app.globalData.isLogin = true

    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})