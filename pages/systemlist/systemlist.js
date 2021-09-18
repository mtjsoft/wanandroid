// pages/systemlist/systemlist.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '体系',
    pagerList: [],
    pagenumber: 0,
    isloadmore: false,
    isRefresh: false,
    id: '',
    typelist: [],
    active: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var listtitle = app.globalData.systemtypelist;
    // 选中的index
    let index = parseInt(options.childrenindex);
    that.setData({
      title: options.title,
      typelist: listtitle,
      id: listtitle[index].id,
      active: listtitle[index].name
    })
    that.getPagerData()
  },

  getPagerData: function () {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中...',
    })
    util.get(api.treeList.replace("$1", that.data.pagenumber).replace("$2", that.data.id))
      .then((res) => {
        wx.hideLoading()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        var list = res.datas
        if (that.data.isRefresh) {
          that.setData({
            pagerList: list,
            isloadmore: list.length < res.total,
            isRefresh: false
          })
        } else {
          var templist = that.data.pagerList
          var resultlist = templist.concat(list)
          that.setData({
            isloadmore: resultlist.length < res.total,
            pagerList: resultlist
          })
        }
      }).catch((errMsg) => {
        wx.hideLoading()
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
      id: that.data.typelist[index].id,
      active: event.detail.name,
      pagenumber: 0,
      isRefresh: true,
    })
    that.getPagerData()
  },

  /**
   * item点击事件
   */
  detail: function (event) {
    that = this;
    var index = event.currentTarget.dataset.index;
    var title = that.data.pagerList[index].title;
    var link = that.data.pagerList[index].link;
    util.pushMsg(title, "[" + link + "](" + link + ")");
    that.setData({
      showDetail: true
    })
  },

  onClose: function () {
    that.setData({
      showDetail: false
    })
  },

  /**
   * 类别点击
   */
  chapter: function (event) {
    that = this; //不要漏了这句，很重要
    var link = event.currentTarget.id
  },

  /**
   * 收藏/取消收藏
   */
  collect: function (event) {
    that = this; //不要漏了这句，很重要
    var postion = event.currentTarget.id
    var collectid = that.data.pagerList[postion].id
    wx.showLoading({
      title: '正在加载...',
    })
    //如果已收藏，就取消收藏
    if (that.data.pagerList[postion].collect) {
      util.post(api.uncollect_originId.replace("$1", collectid))
        .then((res) => {
          wx.hideLoading()
          var update = that.data.pagerList
          update[postion].collect = false
          that.setData({
            pagerList: update
          })
          wx.showToast({
            title: '取消收藏成功',
            icon: 'success',
            duration: 1000
          })
        }).catch((errMsg) => {
          wx.hideLoading()
        });
    } else {
      //未收藏，添加收藏
      util.post(api.collect.replace("$1", collectid))
        .then((res) => {
          wx.hideLoading()
          var update = that.data.pagerList
          update[postion].collect = true
          that.setData({
            pagerList: update
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1000
          })
        }).catch((errMsg) => {
          wx.hideLoading()
        });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //再次回到页面时，根据收藏的ids刷新一下收藏的状态
    that = this;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    that = this; //不要漏了这句，很重要
    that.setData({
      pagenumber: 0,
      isRefresh: true,
      isloadmore: false
    })
    that.getPagerData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
  onShareAppMessage: function () {

  }
})