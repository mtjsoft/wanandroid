//app.js
App({
  globalData: {
    versionCode: 300,
    versionName: '3.0.0',
    //主题颜色
    mainColor: "#1B82D1",
    //搜索关键词
    key: '',
    //收藏的列表ids
    collectids: [],
    //体系的子列表
    systemtypelist: [],
    //文章详情的链接
    desclink: '',
    userInfo: null,
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
  onLaunch: function () {
    var that = this
    wx.cloud.init({
      env: "cloud1-2g008j0a01934888",
      traceUser: true
    })
    // 获取openID
    wx.cloud.callFunction({
      // 云函数名称
      name: "openId",
      // 传给云函数的参数
      data: {},
      success: function (res) {
        console.log(res)
        wx.setStorage({
          key: "openId",
          data: res.result.openid
        })
      },
      fail: function (error) {
        console.log(error)
      }
    })
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})