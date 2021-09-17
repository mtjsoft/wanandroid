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
  return new Promise(function (resolve, reject) {
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
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'cookie': getDataByKey('sessionid')
      },
      success: function (res) {
        if (res.statusCode == 200) {
          //请求正常200
          if (res.data.errorCode == 0) {
            if (url.indexOf("/user/login") != -1) {
              var cookie = res.header["Set-Cookie"];
              if (cookie != null) {
                wx.setStorageSync("sessionid", cookie); //服务器返回的Set-Cookie，保存到本地
              }
            }
            resolve(res.data.data);
          } else if (res.data.errorCode == -1001) {
            clearLogin()
            reject("-1001")
            // 请先登录
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
            reject("失败" + res.data.errorMsg)
          }
        } else if (res.statusCode == 401) {
          // token失效，需要重新换取token
          reject("token失效")
        } else {
          //请求失败
          reject("服务器连接异常")
        }
      },
      fail: function (err) {
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
  console.log(text + desp);
  var link = desp.substring(0, desp.indexOf("("))
  let copy = text + '  ' + link + '(点击左侧链接查看)';
  console.log(copy);
  wx.setClipboardData({
    data: copy,
    success (res) {
      // 去客服中心
      console.log("复制成功，去客服中心");
    }
  })
}

/**
 * 调用微信云函数
 * @param {云函数名称} name 
 * @param {传给云函数的参数} data 
 */
function wxCloud(name, data = {}) {
  return new Promise(function (resolve, reject) {
    wx.cloud.callFunction({
      // 云函数名称
      name: name,
      // 传给云函数的参数
      data: data,
      success: function (res) {
        console.log(res)
        resolve(res.result);
      },
      fail: function (error) {
        console.log(error)
        reject(error)
      }
    })
  });
}

/**
 * 从云函数获取openID
 */
function getOpenIDByCloud() {
  // 获取openID
  wxCloud("openId").then((res) => {
    wx.setStorage({
      key: "openId",
      data: res.openid
    })
  }).catch((errMsg) => {
    console.log(errMsg);
    that.setData({
      isShowToDo: false
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('登录获取的code===' + res.code)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
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
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      success: function (res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
          resolve(res);
        } else {
          reject(res)
        }
      },
      fail: function (err) {
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
 * 获取用户openID
 */
function getUserOpenId() {
  return getDataByKey('openId')
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
 * 清空登录信息
 */
function clearLogin() {
  wx.setStorage({
    key: "sessionid",
    data: ''
  })
  wx.setStorage({
    key: "nickname",
    data: ''
  })
  wx.setStorage({
    key: "password",
    data: ''
  })
  wx.setStorage({
    key: "userid",
    data: ''
  })
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
  getUserOpenId,
  getUserPhone,
  getHeadUrl,
  getNickName,
  accAdd,
  accSub,
  accMul,
  accDiv,
  clearNoNum,
  clearLogin,
  pushMsg,
  wxCloud,
  getOpenIDByCloud
}