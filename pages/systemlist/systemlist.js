// pages/systemlist/systemlist.js
const app = getApp()
const util = require('../../utils/util.js');
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
  onLoad: function(options) {
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

  getPagerData: function() {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/tree/list',
      method: 'GET',
      data: {
        pagernumber: that.data.pagenumber,
        cid: that.data.id
      },
      success: function(res) {
        wx.hideLoading()
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
        wx.hideLoading()
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
  detail: function(event) {
    that = this;
    var index = event.currentTarget.dataset.index;
    var title = that.data.pagerList[index].title;
    var link = that.data.pagerList[index].link;
    util.pushMsg(title, "[" + link + "](" + link + ")");
  },

  /**
   * 类别点击
   */
  chapter: function(event) {
    that = this; //不要漏了这句，很重要
    var link = event.currentTarget.id
  },

  /**
   * 收藏/取消收藏
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
      wx.showLoading({
        title: '正在加载...',
      })
      //如果已收藏，就取消收藏
      if (that.data.pagerList[postion].collect) {
        wx.request({
          url: app.globalData.baseUrl + '/uncollectoriginId',
          method: 'POST',
          data: {
            id: collectid,
            username: islogin
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
              //取消收藏，从我的收藏ids中移除
              let appcollect = []
              for (var i in app.globalData.collectids) {
                if (collectid != app.globalData.collectids[i]) {
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
      } else {
        //未收藏，添加收藏
        wx.request({
          url: app.globalData.baseUrl + '/collect',
          method: 'POST',
          data: {
            id: collectid,
            username: islogin
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
              //收藏成功，将id加入到收藏的ids
              app.globalData.collectids.push(collectid)
            }
          },
          fail: function() {
            wx.hideLoading()
          }
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
    //再次回到页面时，根据收藏的ids刷新一下收藏的状态
    that = this;
    var collectids = app.globalData.collectids
    var list = that.data.pagerList
    for (var i in list) {
      for (var j in collectids) {
        if (list[i].id == collectids[j]) {
          //状态为收藏时，跳出一层循环
          list[i].collect = true
          break
        } else {
          list[i].collect = false
        }
      }
    }
    that.setData({
      pagerList: list
    })
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