// pages/todo/todo.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTitle: '',
    pageType: 'add',
    username: '',
    dates: '2019-12-12',
    index: 0,
    objectArray: ['工作', '生活', '娱乐'],
    title: '',
    desc: '',
    id: '',
    status: -1,
    statusArray: ['未完成', '已完成']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (options.type == "add") {
      that.setData({
        topTitle: '添加待办事件',
        username: options.username,
        pageType: options.type
      })
    } else {
      that.setData({
        topTitle: '编辑待办事件',
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
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  //  点击类型组件确定事件  
  bindTypeChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  //状态选择
  bindStatusChange: function (e) {
    this.setData({
      status: e.detail.value
    })
  },

  titleinput: function (e) {
    that.setData({
      title: e.detail
    })
  },

  descinput: function (e) {
    that.setData({
      desc: e.detail
    })
  },

  /**
   * 提交
   */
  submit: function () {
    var islogin = util.getNickName()
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
      wx.showLoading()
      util.post(api.addTODO, {
          title: that.data.title,
          content: that.data.desc,
          date: that.data.dates,
          type: that.data.index + 1
        })
        .then((res) => {
          wx.hideLoading()
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
        }).catch((errMsg) => {
          wx.hideLoading()
          wx.showToast({
            title: errMsg,
          })
        });
    } else {
      wx.showLoading()
      util.post(api.updateTODO.replace("$1", that.data.id), {
          title: that.data.title,
          content: that.data.desc,
          date: that.data.dates,
          type: that.data.index + 1,
          status: that.data.status
        })
        .then((res) => {
          wx.hideLoading()
          wx.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 1000,
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }).catch((errMsg) => {
          wx.hideLoading()
          wx.showToast({
            title: errMsg,
          })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})