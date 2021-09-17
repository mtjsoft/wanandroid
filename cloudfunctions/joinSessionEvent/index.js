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
          "content": '您好！请将剪切板的内容粘贴并发送，点击内容链接即可查看详情。'
        }
      })
    return result
  } catch (err) {
    return err
  }
}