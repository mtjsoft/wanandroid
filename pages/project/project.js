// pages/project/project.js
const app = getApp()
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
    //that.projectType()
    that.getPagerData()
  },

  /**
   * 获取项目分类
   */
  projectType: function() {
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + '/project',
      method: 'GET',
      success: function(res) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        var list = res.data.data
        for (var i in list) {
          if (i == 0) {
            list[0].visible = 1
          } else {
            list[i].visible = 0
          }
          list[i].name = list[i].name.replace(/&amp;/g, "、")
        }
        that.setData({
          typelist: list,
          id: list[0].id
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
   * 切换类型
   */
  choosetype: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.id;
    var listtitle = that.data.typelist;
    for (var i in listtitle) {
      if (i == index) {
        listtitle[i].visible = 1
      } else {
        listtitle[i].visible = 0
      }
    }
    that.setData({
      typelist: listtitle,
      pagenumber: 1,
      isRefresh: true,
      id: listtitle[index].id
    })
    wx.setNavigationBarTitle({
      title: that.data.typelist[index].name,
    })

    that.getPagerData()
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