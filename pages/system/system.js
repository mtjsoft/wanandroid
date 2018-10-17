// pages/tixi/tixi.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: ["#4DCCF6", "#FF9999", "#999933", "#009999", "#FF9900", "#009999"],
    tixiList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.getListData()
  },

  getListData: function() {
    wx.request({
      url: app.globalData.baseUrl + '/tree',
      method: 'GET',
      success: function(res) {
        that.setData({
          tixiList: res.data.data
        })
      }
    })
  },

  /**
   * 点击事件处理
   */
  tixiclick: function(event) {
    var index = event.currentTarget.id
    app.globalData.systemtypelist = that.data.tixiList[index].children
    wx.navigateTo({
      url: '../systemlist/systemlist?title=' + that.data.tixiList[index].name,
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