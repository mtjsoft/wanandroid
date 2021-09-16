// pages/register/register.js
// pages/login/login.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
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
      username: e.detail
    })
  },

  /**
   * 密码
   */
  loginpassword: function(e) {
    this.setData({
      password: e.detail
    })
  },

  /**
   * 点击注册
   */
  clickregister: function() {
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
        title: '正在注册...',
      })

      util.post(api.register, {
        username: that.data.username,
        password: that.data.password,
        repassword: that.data.password
      })
      .then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 200
        })
        wx.navigateBack({
          delta: 1
        })
      }).catch((errMsg) => {
        wx.hideLoading()
        wx.showToast({
          title: errMsg,
          icon: 'none',
          duration: 1000
        })
      });
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