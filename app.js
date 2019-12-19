//app.js
App({
  globalData: {
    //主题颜色
    mainColor: "#1B82D1",
    //服务器地址
    baseUrl: "https://www.mtjsoft.cn/wanandroid/api",
    // baseUrl: "http://10.10.40.94:8080/wanandroid/api",
    //搜索关键词
    key: '',
    //收藏的列表ids
    collectids: [],
    //体系的子列表
    systemtypelist: [],
    //文章详情的链接
    desclink: '',
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      }
    ]
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

    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  }

})