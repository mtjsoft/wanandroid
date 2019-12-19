// pages/done/done.js
const app = getApp()
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
      name: '重要',
      visible: '1'
    }, {
      name: '工作',
      visible: '0'
    }, {
      name: '学习',
      visible: '0'
    }, {
      name: '生活',
      visible: '0'
    }],
    active: '重要',
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
    wx.request({
      url: app.globalData.baseUrl + '/todo/listdone',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pagernumber: that.data.pagenumber,
        username: that.data.username,
        typename: that.data.id
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
   * 切换类型
   */
  onChange(event) {
    var index = event.detail.index;
    that.setData({
      id: index + '',
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
    wx.request({
      url: app.globalData.baseUrl + '/todo/delete',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        username: that.data.username,
        id: that.data.pagerList[index].id
      },
      success: function(res) {
        if (res.data.errorCode != 0) {
          wx.showToast({
            title: res.data.errorMsg,
          })
        } else {
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
        }
      }
    })
  },

  /**
   * 还原
   */
  backtodo: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.id;
    wx.request({
      url: app.globalData.baseUrl + '/todo/done',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        status: '0',
        username: that.data.username,
        id: that.data.pagerList[index].id
      },
      success: function(res) {
        if (res.data.errorCode != 0) {
          wx.showToast({
            title: res.data.errorMsg,
          })
        } else {
          var update = that.data.pagerList;
          // 删除
          update.splice(index, 1);
          that.setData({
            pagerList: update
          })
          wx.showToast({
            title: '已还原',
            icon: 'success',
            duration: 1000
          })
        }
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