
const ApiRootUrl = 'https://www.wanandroid.com/'

module.exports = {

  login: ApiRootUrl + 'user/login', //登录
  register: ApiRootUrl + 'user/register', //注册
  logout: ApiRootUrl + 'user/logout/json', //退出

  // 首页
  banner: ApiRootUrl + 'banner/json', //banner
  articleList: ApiRootUrl + 'article/list/$1/json', //首页文章列表 

  collect: ApiRootUrl + 'lg/collect/$1/json', //收藏站内文章
  uncollect_originId: ApiRootUrl + 'lg/uncollect_originId/$1/json', //取消收藏 文章列表 
  uncollect: ApiRootUrl + 'lg/uncollect/$1/json', //取消收藏 我的收藏页面

  // 热搜
  hotkey: ApiRootUrl + 'hotkey/json', //搜索热词
  friend: ApiRootUrl + 'friend/json', //常用网站

  query: ApiRootUrl + 'article/query/$1/json', //搜索

  // 体系
  tree: ApiRootUrl + 'tree/json', //体系数据
  treeList: ApiRootUrl + 'article/list/$1/json?cid=$2', //知识体系下的文章

  // 公众号
  chapters: ApiRootUrl + 'wxarticle/chapters/json  ', //获取公众号列表
  chaptersList: ApiRootUrl + 'wxarticle/list/$1/$2/json', //查看某个公众号历史数据

  // 我的
  UserRank: ApiRootUrl + 'lg/coin/userinfo/json', //获取个人排名
  ShowToDo: ApiRootUrl + 'todo/show', //是否显示TODO
  selfCollect: ApiRootUrl + 'lg/collect/list/$1/json', //自己收藏

  projectList: ApiRootUrl + 'project/list/$1/json?cid=$2', //项目列表数据  分类
  projectList2: ApiRootUrl + 'project/list/$1/json', //项目列表数据

  // TODO
  addTODO: ApiRootUrl + 'lg/todo/add/json', //新增一个 TODO
  updateTODO: ApiRootUrl + 'lg/todo/update/$1/json', //更新一个 Todo
  todoList: ApiRootUrl + 'lg/todo/v2/list/$1/json', //TODO 列表
  deleteTODO: ApiRootUrl + 'lg/todo/delete/$1/json', //TODO 删除
  doneTODO: ApiRootUrl + 'lg/todo/done/$1/json', //TODO 完成
};