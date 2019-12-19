// pages/serverkey/serverkey.js
const app = getApp()
const util = require('../../utils/util.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sckey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      sckey: util.getDataByKey('sckey')
    })
  },

  onChange(event) {
    // event.detail 为当前输入的值
    that = this;
    that.setData({
      sckey: event.detail
    })
  },

  saveKey: function() {
    // 保存
    that = this;
    var sckey = that.data.sckey;
    if (sckey == '') {
      wx.showToast({
        title: '请输入sckey',
        icon: 'none'
      })
    } else {
      try {
        wx.setStorageSync('sckey', sckey)
        wx.showToast({
          title: '保存成功'
        })
      } catch (e) {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
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