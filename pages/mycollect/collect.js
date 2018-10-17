// pages/mycollect/collect.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagerList: [],
    pagenumber: 0,
    isloadmore: false,
    isRefresh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    wx.setNavigationBarTitle({
      title: '我的收藏',
    })
    that.getPagerData()
  },

  getPagerData: function() {
    wx.showNavigationBarLoading()
    var islogin = wx.getStorageSync('username')
    wx.request({
      url: app.globalData.baseUrl + '/collect/list',
      method: 'GET',
      data: {
        pagernumber: that.data.pagenumber,
        username: islogin
      },
      success: function(res) {
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
      fail: function () {
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
    var link = event.currentTarget.id
    wx.setClipboardData({
      data: link,
      success: function(res) {
        wx.showToast({
          title: '已复制链接',
          icon: 'success'
        })
      }
    })
  },

  /**
   * 类别点击
   */
  chapter: function(event) {
    that = this; //不要漏了这句，很重要
    var link = event.currentTarget.id
  },

  /**
   * 取消收藏
   */
  collect: function(event) {
    that = this; //不要漏了这句，很重要
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      var postion = event.currentTarget.id
      var collectid = that.data.pagerList[postion].id
      var oId = that.data.pagerList[postion].originId
      if (oId == null){
        oId = -1
      }
      wx.showLoading({
        title: '正在加载...',
      })
      //取消收藏
      wx.request({
        url: app.globalData.baseUrl + '/uncollect',
        method: 'POST',
        data: {
          id: collectid,
          username: islogin,
          originId: oId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.errorCode != 0) {
            wx.showToast({
              title: res.data.errorMsg,
              icon: 'none'
            })
          } else {
            //将选择的从列表移除，赋值给新的数组，再用新数组去赋值渲染页面
            let update = []
            for (var i in that.data.pagerList) {
              if (i != postion) {
                update.push(that.data.pagerList[i])
              }
            }
            that.setData({
              pagerList: update
            })
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success',
              duration: 1000
            })
            //取消收藏，从我的收藏ids中移除
            let appcollect = []
            for (var i in app.globalData.collectids) {
              if (oId != app.globalData.collectids[i]) {
                appcollect.push(app.globalData.collectids[i])
              }
            }
            app.globalData.collectids = appcollect
          }
        },
        fail: function() {
          wx.hideLoading()
        }
      })
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    that = this; //不要漏了这句，很重要
    that.setData({
      pagenumber: 0,
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