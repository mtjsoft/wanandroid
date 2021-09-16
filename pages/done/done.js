// pages/done/done.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    pagerList: [],
    pagenumber: 1,
    isloadmore: false,
    isRefresh: false,
    id: '0',
    typelist: [{
      name: '全部',
      visible: '1'
    },{
      name: '工作',
      visible: '0'
    }, {
      name: '生活',
      visible: '0'
    }, {
      name: '娱乐',
      visible: '0'
    }],
    active: '全部',
    offsetTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.setData({
      offsetTop: app.globalData.CustomBar,
      username: options.username
    })
    that.getPagerData()
  },
  /**
   * 获取列表
   */
  getPagerData: function() {
    wx.showNavigationBarLoading()
    var url = api.todoList.replace("$1", that.data.pagenumber) + '?status=1&orderby=2&type=' + that.data.id
    util.get(url)
      .then((res) => {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        var list = res.datas
        if (that.data.isRefresh) {
          that.setData({
            pagerList: list,
            isRefresh: false,
            isloadmore: list.length < res.total,
            loading: false
          })
        } else {
          var templist = that.data.pagerList
          var resultlist = templist.concat(list)
          that.setData({
            pagerList: resultlist,
            isloadmore: resultlist.length < res.total,
            loading: false
          })
        }
      }).catch((errMsg) => {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      });
  },

  /**
   * 切换类型
   */
  onChange(event) {
    var index = event.detail.index;
    that.setData({
      id: (index) + '',
      active: event.detail.name,
      pagenumber: 1,
      isRefresh: true,
    })
    that.getPagerData()
  },

  /**
   * 删除
   */
  deletetodo: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.id;
    util.post(api.deleteTODO.replace("$1", that.data.pagerList[index].id))
      .then((res) => {
        var update = that.data.pagerList;
        // 删除
        update.splice(index, 1);
        that.setData({
          pagerList: update
        })
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        })
      }).catch((errMsg) => {
        wx.showToast({
          title: errMsg,
        })
      });
  },

  /**
   * 还原
   */
  backtodo: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.id;
    util.post(api.doneTODO.replace("$1", that.data.pagerList[index].id),{status: '0'})
      .then((res) => {
        var update = that.data.pagerList;
        // 删除
        update.splice(index, 1);
        that.setData({
          pagerList: update
        })
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 1000
        })
      }).catch((errMsg) => {
        wx.showToast({
          title: errMsg,
        })
      });
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
    if (that.data.isloadmore) {
      var page = that.data.pagenumber + 1;
      that.setData({
        pagenumber: page
      })
      that.getPagerData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})