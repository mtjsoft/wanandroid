// pages/chapters/chapters.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: ["#009999", "#FF9900", "#4DCCF6", "#009999", "#FF9999", "#999933"],
    heightArr: [],
    pagerList: [],
    pagenumber: 1,
    isloadmore: false,
    isRefresh: false,
    id: '',
    typelist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.getPagerData()
  },

  /**
   * 获取项目列表
   */
  getPagerData: function() {
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + '/wxarticle/chapters',
      method: 'GET',
      success: function(res) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        var list = res.data.data
        if (that.data.isRefresh) {
          that.setData({
            pagerList: list,
            isRefresh: false
          })
        } else {
          var templist = that.data.pagerList
          var resultlist = templist.concat(list)
          that.setData({
            pagerList: resultlist
          })
        }
        //随机高度30~60
        let heights = []
        for (var i in that.data.pagerList) {
          heights.push(Math.floor(Math.random() * 30) + 30)
        }
        that.setData({
          heightArr: heights
        })
      },
      fail: function() {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 点击了某个公众号
   */
  chaptersClick: function(event) {
    var id = event.currentTarget.id
    wx.navigateTo({
      url: '../chapterslist/chapterslist?id=' + id,
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    that = this; //不要漏了这句，很重要
    that.setData({
      pagenumber: 1,
      isRefresh: true,
    })
    that.getPagerData()
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
