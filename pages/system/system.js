// pages/tixi/tixi.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: [],
    colorCount: 1,
    list: [],
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.getListData()
  },

  getListData: function() {
    util.get(api.tree)
      .then((res) => {
        let list = res;
        for(var i = 0; i < list.length; i++){
          list[i].id = i
        }
        var colors = app.globalData.ColorList;
        that.setData({
          list: list,
          listCur: list[0],
          colorArr: colors,
          colorCount: colors.length
        })
      }).catch((errMsg) => {});
  },

  /**
   * 点击事件处理
   */
  tixiclick: function(event) {
    that = this;
    var index = event.currentTarget.dataset.index;
    var childrenindex = event.currentTarget.dataset.childrenindex;
    app.globalData.systemtypelist = that.data.list[index].children
    wx.navigateTo({
      url: '../systemlist/systemlist?title=' + that.data.list[index].name + '&childrenindex=' + childrenindex,
    })
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },

  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
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