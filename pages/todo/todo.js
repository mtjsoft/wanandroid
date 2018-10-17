// pages/todo/todo.js
const app = getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 'add',
    username: '',
    dates: '2018-8-14',
    index: 0,
    objectArray: ['重要', '工作', '学习', '生活'],
    title: '',
    desc: '',
    id: '',
    status: -1,
    statusArray: ['未完成', '已完成']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    if (options.type == "add") {
      wx.setNavigationBarTitle({
        title: '添加待办事件',
      })
      that.setData({
        username: options.username,
        pageType: options.type
      })
    } else {
      wx.setNavigationBarTitle({
        title: '编辑待办事件',
      })
      that.setData({
        pageType: options.type,
        username: options.username,
        title: options.title,
        desc: options.desc,
        dates: options.dates,
        index: options.index,
        status: options.status,
        id: options.id
      })
    }
  },


  //  点击日期组件确定事件  
  bindDateChange: function(e) {
    this.setData({
      dates: e.detail.value
    })
  },
  //  点击类型组件确定事件  
  bindTypeChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  //状态选择
  bindStatusChange: function(e) {
    this.setData({
      status: e.detail.value
    })
  },

  titleinput: function(e) {
    that.setData({
      title: e.detail.value
    })
  },

  descinput: function(e) {
    that.setData({
      desc: e.detail.value
    })
  },

  /**
   * 提交
   */
  submit: function() {
    var islogin = wx.getStorageSync('username')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    if (that.data.title == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }
    if (that.data.desc == '') {
      wx.showToast({
        title: '请输入详情',
        icon: 'none'
      })
      return
    }
    if (that.data.dates == '') {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      })
      return
    }
    if (that.data.pageType == 'add') {
      wx.request({
        url: app.globalData.baseUrl + '/todo/add',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          username: islogin,
          typename: that.data.index + '',
          title: that.data.title,
          content: that.data.desc,
          date: that.data.dates
        },
        success: function(res) {
          if (res.data.errorCode != 0) {
            wx.showToast({
              title: res.data.errorMsg,
            })
          } else {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                wx.redirectTo({
                  url: '../notdo/notdo?username=' + islogin
                })
              }
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.baseUrl + '/todo/update',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          username: islogin,
          typename: that.data.index + '',
          title: that.data.title,
          content: that.data.desc,
          date: that.data.dates + '',
          id: that.data.id + '',
          status: that.data.status + ''
        },
        success: function(res) {
          if (res.data.errorCode != 0) {
            wx.showToast({
              title: res.data.errorMsg,
            })
          } else {
            wx.showToast({
              title: '编辑成功',
              icon: 'success',
              duration: 1000,
              success: function() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
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