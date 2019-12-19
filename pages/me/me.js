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
   * 最新项目
   */
  itemClick: function(e) {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      var type = parseInt(e.currentTarget.dataset.type);
      var url = '';
      switch (type) {
        case 0:
          url = '../serverkey/serverkey'
          break
        case 1:
          url = '../project/project'
          break
        case 2:
          url = '../mycollect/collect'
          break
        case 3:
          url = '../todo/todo?type=add&username' + islogin
          break
        case 4:
          url = '../notdo/notdo?username=' + islogin
          break
        case 5:
          url = '../done/done?username=' + islogin
          break
      }
      if (url != '') {
        wx.navigateTo({
          url: url
        })
      }
    }
  },

  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  
  /**
   * 赞赏支持
   */
  showQrcode() {
    wx.previewImage({
      urls: ['https://www.mtjsoft.cn/media/mtj/wx_zs.png'],
      current: 'https://www.mtjsoft.cn/media/mtj/wx_zs.png' // 当前显示图片的http链接      
    })
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
   * 获取等级，积分
   */

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