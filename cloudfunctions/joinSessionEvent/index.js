// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.customerServiceMessage.send({
      "touser": wxContext.OPENID,
      "msgtype": 'text',
      "text": {
        "content": '请将剪切板的内容粘贴并发送给我哦。'
      }
    })
    return result
  } catch (err) {
    return err
  }
}