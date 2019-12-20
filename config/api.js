
const ApiRootUrl = 'https://www.mtjsoft.cn/wanandroid/api/'

module.exports = {

  PushMSG: 'https://sc.ftqq.com/', //推送消息

  Authenticate: ApiRootUrl + 'TokenAuth/Authenticate', //登录

  UserRank: ApiRootUrl + 'userrank/me', //获取个人排名
  
  ShowToDo: ApiRootUrl + 'todo/show', //是否显示TODO
};