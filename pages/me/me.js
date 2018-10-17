// pages/me/me.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '未登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
  },

  /**
   * 关于我们
   */
  about: function() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  /**
   * 最新项目
   */
  newproject: function () {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../project/project'
      })
    }
  },
  /**
   * 我的收藏页面
   */
  mycollect: function() {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../mycollect/collect',
      })
    }
  },
  /**
   * 添加待办
   */
  addtodo: function () {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../todo/todo?type=add&username' + islogin,
      })
    }
  },
  /**
   * 待办清单
   */
  notdo: function() {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../notdo/notdo?username=' + islogin,
      })
    }
  },
  /**
   * 已完成清单
   */
  done: function() {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../done/done?username=' + islogin,
      })
    }
  },

  /**
   * 是否登录，未登录跳转登录
   */
  login: function() {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == '') {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      wx.showToast({
        title: '已登录',
        icon: 'none'
      })
    }
  },

  /**
   * 退出登陆
   */
  loginout: function() {
    wx.request({
      url: app.globalData.baseUrl + '/loginout?username=' + that.data.username,
      method: 'GET',
      success: function(res) {
        that.setData({
          username: '未登录'
        })
        wx.setStorage({
          key: "username",
          data: ''
        })
        wx.setStorage({
          key: "password",
          data: ''
        })
        wx.setStorage({
          key: "userid",
          data: ''
        })
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 200
        })
      }
    })
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
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == '') {
      that.setData({
        username: '未登录'
      })
    } else {
      that.setData({
        username: islogin
      })
    }
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