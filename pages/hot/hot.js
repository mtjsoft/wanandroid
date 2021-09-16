// pages/hot/hot.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 随机颜色数组
    colorArr: ["#0000FF", "#008B00", "#FFC125", "#FF6A6A", "#FF1493", "#8A2BE2", "#EE1289", "#32CD32"],
    items: null,
    netaddress: null,
    key: '',
    offsetTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      offsetTop: app.globalData.CustomBar
    })
    that.gethotkey();
    that.getnetaddress();
  },

  gethotkey: function() {
    util.get(api.hotkey)
      .then((res) => {
        that.setData({
          items: res
        })
      }).catch((errMsg) => {});
  },

  getnetaddress: function() {
    util.get(api.friend)
      .then((res) => {
        that.setData({
          netaddress: res
        })
      }).catch((errMsg) => {});
  },

  /**
   * 搜索的输入框关键词
   */
  keysou: function(e) {
    this.setData({
      key: e.detail
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
      wx.navigateTo({
        url: '../search/search?key=' + that.data.key,
      })
    }
  },
  /**
   * 大家都在搜索的关键词点击
   */
  wehotkey: function(event) {
    that = this; //不要漏了这句，很重要
    var key = event.currentTarget.id
    wx.navigateTo({
      url: '../search/search?key=' + key,
    })
  },

  /**
   * 常用网站点击
   */
  net: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.dataset.index;
    var name = that.data.netaddress[index].name;
    var link = that.data.netaddress[index].link;
    util.pushMsg(name, "[" + link + "](" + link + ")");
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