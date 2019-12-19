var api = require('../config/api.js')

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 上传图片，返回服务器图片路径
 */
function uploadFile(uploadUrl, path, fileName = 'file', data = {}) {
  return new Promise(function(resolve, reject) {
    wx.uploadFile({
      url: uploadUrl,
      filePath: path,
      name: fileName,
      formData: data,
      header: {
        'Authorization': 'Bearer ' + getDataByKey('token'),
        'Content-Type': 'multipart/form-data',
      },
      success(res) {
        console.log("请求状态码：" + res.statusCode);
        if (res.statusCode == 200) {
          //请求正常200
          let daesData = res.data
          //正常
          resolve(daesData);
        } else {
          //请求失败
          reject("请求失败：" + res.statusCode)
        }
      },
      fail(res) {
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}

/**
 * 微信的request
 */
function request(url, data = {}, method = "GET") {
  var contentType = 'application/x-www-form-urlencoded'
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'Authorization': 'Bearer ' + getDataByKey('token')
      },
      success: function(res) {
        if (res.statusCode == 200) {
          //请求正常200
          //正常
          resolve(res.data);
        } else if (res.statusCode == 401) {
          // token失效，需要重新换取token
        } else {
          //请求失败
          reject("服务器连接异常")
        }
      },
      fail: function(err) {
        //服务器连接异常
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}

/**
 * GET请求封装
 */
function get(url, data = {}) {
  return request(url, data, 'GET')
}

/**
 * POST请求封装
 */
function post(url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * PUSH消息
 */
function pushMsg(text, desp) {
  var key = getDataByKey('sckey');
  if (key == "") {
    wx.showModal({
      title: '设置Key',
      content: '先设置有效的Server酱Key,才能推送连接',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/serverkey/serverkey',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return
  }
  wx.showLoading({})
  wx.request({
    url: api.PushMSG + key + ".send",
    data: {
      text: text,
      desp: desp
    },
    method: "POST",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      wx.hideLoading()
      if (res.statusCode == 200) {
        //请求正常200
        var data = res.data.data;
        console.log(data)
        if (data && data.errno == 0) {
          wx.showToast({
            title: '微信消息推送成功!',
          })
        } else {
          wx.showToast({
            title: '发送失败,请检查Server酱的Key',
            icon: "none"
          })
        }
      } else {
        //请求失败
        wx.showToast({
          title: '发送失败',
          icon: "none"
        })
      }
    },
    fail: function(err) {
      //服务器连接异常
      wx.hideLoading()
      wx.showToast({
        title: '发送失败',
        icon: "none"
      })
    }
  })
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log('登录获取的code===' + res.code)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        console.log(err)
        reject(err);
      }
    });
  });
}

/**
 * 获取用户信息
 */
function getUserInfo() {
  return new Promise(function(resolve, reject) {
    wx.getUserInfo({
      success: function(res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
          resolve(res);
        } else {
          reject(res)
        }
      },
      fail: function(err) {
        reject(err);
      }
    })
  });
}

/**
 * 获取本地存储的数据
 */
function getDataByKey(key) {
  try {
    return wx.getStorageSync(key)
  } catch (e) {}
  return ""
}

/**
 * 获取用户ID
 */
function getUserId() {
  return getDataByKey('userId')
}

/**
 * 获取用户绑定的手机号
 */
function getUserPhone() {
  return getDataByKey('phoneNumber')
}

/**
 * 获取用户头像
 */
function getHeadUrl() {
  return getDataByKey('headurl')
}

/**
 * 获取用户昵称
 */
function getNickName() {
  return getDataByKey('nickname')
}

/**
 * 处理javascript在两个浮点数加、减、乘、除结果会有误差
 * 
 * 加法
 */
function accAdd(arg1, arg2) {
  return (Number(arg1) * 100 + Number(arg2) * 100) / 100
}
/**
 * 处理javascript在两个浮点数加、减、乘、除结果会有误差
 * 
 * 减法
 */
function accSub(arg1, arg2) {
  return (Number(arg1) * 100 - Number(arg2) * 100) / 100
}
/**
 * 处理javascript在两个浮点数加、减、乘、除结果会有误差
 * 
 * 乘法
 */
function accMul(arg1, arg2) {
  return (Number(arg1) * 100 * Number(arg2) * 100) / 10000
}
/**
 * 处理javascript在两个浮点数加、减、乘、除结果会有误差
 * 
 * 除法
 */
function accDiv(arg1, arg2) {
  return (Number(arg1) * 100 / Number(arg2) * 100) / 10000
}

/**
 * 只允许保留两位小数
 */
function clearNoNum(number) {
  number = number.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
  number = number.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
  number = number.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  number = number.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
  if (number.indexOf(".") < 0 && number != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
    number = parseFloat(number);
  }
  return number
}


module.exports = {
  formatTime,
  uploadFile,
  request,
  get,
  post,
  login,
  getUserInfo,
  getDataByKey,
  getUserId,
  getUserPhone,
  getHeadUrl,
  getNickName,
  accAdd,
  accSub,
  accMul,
  accDiv,
  clearNoNum,
  pushMsg
}