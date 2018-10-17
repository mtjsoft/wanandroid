// pages/notdo/notdo.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishide: false,
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.data.username = options.username
    wx.setNavigationBarTitle({
      title: '待办清单',
    })
    that.getPagerData()
  },
  /**
   * 获取列表
   */
  getPagerData: function() {
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.baseUrl + '/todo/listnotdo',
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
      id: index,
      pagenumber: 1,
      isRefresh: true,
    })
    wx.setNavigationBarTitle({
      title: that.data.typelist[index].name,
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
          let update = []
          for (var i in that.data.pagerList) {
            if (i != index) {
              update.push(that.data.pagerList[i])
            }
          }
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
   * 完成
   */
  overtodo: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.id;
    wx.request({
      url: app.globalData.baseUrl + '/todo/done',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        status: '1',
        username: that.data.username,
        id: that.data.pagerList[index].id
      },
      success: function(res) {
        if (res.data.errorCode != 0) {
          wx.showToast({
            title: res.data.errorMsg,
          })
        } else {
          let update = []
          for (var i in that.data.pagerList) {
            if (i != index) {
              update.push(that.data.pagerList[i])
            }
          }
          that.setData({
            pagerList: update
          })
          wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * 编辑
   */
  edittodo: function(event) {
    that = this; //不要漏了这句，很重要
    var index = event.currentTarget.id;
    var model = that.data.pagerList[index]
    wx.navigateTo({
      url: '../todo/todo?type=edit&username' + that.data.username + '&title=' + model.title + '&desc=' + model.content + '&dates=' + model.dateStr + '&index=' + model.type + '&status=' + model.status + '&id=' + model.id,
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
    if(that.data.ishide){
      that.setData({
        ishide: false
      })
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      that = this; //不要漏了这句，很重要
      that.setData({
        pagenumber: 1,
        isRefresh: true,
      })
      that.getPagerData()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    that.setData({
      ishide: true
    })
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