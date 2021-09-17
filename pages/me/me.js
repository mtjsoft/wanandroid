// pages/me/me.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '未登录',
    myRank: null,
    isShowToDo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  /**
   * 最新项目
   */
  itemClick: function (e) {
    var islogin = util.getNickName()
    if (islogin == null || islogin == "") {
      wx.showModal({
        title: '提示',
        content: '请先登录！',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var type = parseInt(e.currentTarget.dataset.type);
      var url = '';
      switch (type) {
        case 1:
          url = '../project/project'
          break
        case 2:
          url = '../mycollect/collect'
          break
        case 3:
          url = '../todo/todo?type=add&username' + islogin
          break
        case 4:
          url = '../notdo/notdo?username=' + islogin
          break
        case 5:
          url = '../done/done?username=' + islogin
          break
      }
      if (url != '') {
        wx.navigateTo({
          url: url
        })
      }
    }
  },

  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },

  /**
   * 赞赏支持
   */
  showQrcode() {
    wx.previewImage({
      urls: ['https://www.mtjsoft.cn/media/mtj/wx_zs.png'],
      current: 'https://www.mtjsoft.cn/media/mtj/wx_zs.png' // 当前显示图片的http链接      
    })
  },

  /**
   * 是否登录，未登录跳转登录
   */
  login: function () {
    var islogin = util.getNickName()
    if (islogin == null || islogin == '') {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      wx.showToast({
        title: '已登录',
        icon: 'none'
      })
    }
  },

  /**
   * 退出登陆
   */
  loginout: function () {
    util.get(api.logout)
      .then((res) => {
        that.setData({
          username: '未登录',
          myRank: null
        })
        util.clearLogin()
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 200
        })
      }).catch((errMsg) => {
        wx.showToast({
          title: errMsg,
          icon: 'none',
          duration: 200
        })
      });
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
    var islogin = util.getNickName()
    if (islogin == null || islogin == '') {
      that.setData({
        username: '未登录'
      })
    } else {
      that.setData({
        username: islogin
      })
      that.getRankInfo()
    }
    that.getIsShowToDo();
  },

  /**
   * 获取等级，积分
   */
  getRankInfo: function () {
    util.get(api.UserRank).then((res) => {
      that.setData({
        myRank: res
      })
    }).catch((errMsg) => {
      if (errMsg == "-1001") {
        that.setData({
          username: '未登录',
          myRank: null
        })
      }
    });
  },


  /**
   * 是否显示TODO
   */
  getIsShowToDo: function () {
    if (!that.data.isShowToDo) {
      util.wxCloud("versionPass", {
          versionCode: app.globalData.versionCode
        })
        .then((res) => {
          console.log(res);
          that.setData({
            isShowToDo: res.versionPass
          })
        }).catch((errMsg) => {
          console.log(errMsg);
          that.setData({
            isShowToDo: false
          })
        });
    }
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