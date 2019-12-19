// pages/project/project.js
const app = getApp()
const util = require('../../utils/util.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      url: app.globalData.baseUrl + '/project/list',
      method: 'GET',
      data: {
        pagernumber: that.data.pagenumber,
        cid: that.data.id
      },
      success: function(res) {
        console.log(res.data)
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        var list = res.data.data.datas
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
   * item点击事件
   */
  detail: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.dataset.index;
    var title = that.data.pagerList[index].title;
    var link = that.data.pagerList[index].link;
    util.pushMsg(title, "[" + link + "](" + link + ")");
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
    that = this; //不要漏了这句，很重要
    var page = that.data.pagenumber + 1;
    that.setData({
      pagenumber: page
    })
    that.getPagerData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})