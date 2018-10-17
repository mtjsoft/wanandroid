// pages/login/login.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
  },


  /**
   * 用户名
   */
  loginusername: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  /**
   * 密码
   */
  loginpassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  register:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  /**
   * 点击登录
   */
  clicklogin: function() {
    if (that.data.username == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
    } else if (that.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '正在加载...',
      })
      wx.request({
        url: app.globalData.baseUrl + '/login',
        method: 'POST',
        data: {
          username: that.data.username,
          password: that.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          wx.hideLoading()
          console.log(res)
          if (res.data.errorCode != 0){
            wx.showToast({
              title: res.data.errorMsg,
              icon: 'none'
            })
          }else{
            app.globalData.collectids = res.data.data.collectIds
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 200
            })
            wx.setStorage({
              key: "username",
              data: res.data.data.username
            })
            wx.setStorage({
              key: "password",
              data: res.data.data.password
            })
            wx.setStorage({
              key: "userid",
              data: res.data.data.id
            })
            wx.navigateBack({
              delta: 1
            })
          }
        },
        fail:function(){
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})