// pages/webview/webview.js
/**参数说明

article：节点名称，会在 wxml 中引用

html：代表解析的是html代码，其实wxparse还可以解析markdown代码

content：代表从服务器取到取html内容

that：代表 app 实例

5：代表图片的内边距*/
var wxParse = require('../../wxParse/wxParse.js');
const app = getApp()
var that = this;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: '',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    wx.setNavigationBarTitle({
      title: '文章详情',
    })
    wx.showLoading({
      title: '加载中...',
    })
    that.setData({
      link: options.link
    })
    that.gethtml()
  },

  gethtml: function() {
    wx.request({
      url: app.globalData.baseUrl + '/html?link=' + that.data.link,
      method: 'GET',
      success: function(res) {
        wx.hideLoading()
        that.setData({
          content: wxParse.wxParse('article', 'html', res.data, that, 5)
        })
      },
      fail: function() {
        wx.hideLoading()
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
    worker.terminate()
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