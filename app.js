//app.js
App({
  globalData: {
    //主题颜色
    mainColor: "#1B82D1",
    //服务器地址
    baseUrl: "https://www.mtjsoft.cn/wanandroid/api",
    //baseUrl: "http://192.168.31.21:8080/",
    //搜索关键词
    key: '',
    //收藏的列表ids
    collectids: [],
    //体系的子列表
    systemtypelist:[],
    //文章详情的链接
    desclink:''
  },

  /**
   * 进入时，如果已登陆，就在登录获取已下已收藏的ids
   */
  onLaunch: function() {
    var that = this
    var islogin = wx.getStorageSync('username')
    var psw = wx.getStorageSync('password')
    if (islogin != null && islogin != "") {
      wx.request({
        url: that.globalData.baseUrl + '/login',
        method: 'POST',
        data: {
          username: islogin,
          password: psw
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          wx.hideLoading()
          if (res.data.errorCode == 0) {
            that.globalData.collectids = res.data.data.collectIds
          }
        },
        fail: function() {
          wx.hideLoading()
        }
      })
    }
  }

})