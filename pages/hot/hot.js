// pages/hot/hot.js
//获取应用实例
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 随机颜色数组
    colorArr: ["#0000FF", "#008B00", "#FFC125", "#FF6A6A", "#FF1493", "#8A2BE2", "#EE1289", "#32CD32"],
    items: [],
    netaddress: [],
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.gethotkey();
    that.getnetaddress();
  },

  gethotkey: function() {
    wx.request({
      url: app.globalData.baseUrl + '/hotkey',
      method: 'GET',
      success: function(res) {
        that.setData({
          items: res.data.data
        })
      }
    })
  },

  getnetaddress: function() {
    wx.request({
      url: app.globalData.baseUrl + '/friend',
      method: 'GET',
      success: function(res) {
        that.setData({
          netaddress: res.data.data
        })
      }
    })
  },

  /**
   * 搜索的输入框关键词
   */
  keysou: function(e) {
    this.setData({
      key: e.detail.value
    })
  },
  /**
   * 点击搜索
   */
  keyclick: function() {
    if (that.data.key == '') {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      })
    } else {
      app.globalData.key = that.data.key
      console.log(app.globalData.key)
      wx.navigateTo({
        url: '../search/search',
      })
    }
  },
  /**
   * 大家都在搜索的关键词点击
   */
  wehotkey: function(event) {
    that = this; //不要漏了这句，很重要
    var key = event.currentTarget.id
    app.globalData.key = key
    console.log(app.globalData.key)
    wx.navigateTo({
      url: '../search/search',
    })
  },

  /**
   * 常用网站点击
   */
  net: function(event) {
    that = this; //不要漏了这句，很重要
    var link = event.currentTarget.id
    wx.setClipboardData({
      data: link,
      success: function (res) {
        wx.showToast({
          title: '已复制链接',
          icon: 'success'
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