# 1、小程序名称：玩androids
 基于鸿洋大神的玩android开放API完成的《玩android》微信小程序版本，一起来学习小程序开发吧。
# 2、小程序码：❤ 小程序已审核通过，上线了！！！扫码立即体验了。
![小程序码](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/gh_de1f6e6fea7e_258.jpg)
# 3、小程序完成情况说明：
 目前文章详情，使用的是复制链接到剪切板。因为个人小程序不支持打开外部链接。本人也是很无奈啊。没办法，个人的小程序限制太多，如果可以的话，还是尽量搞一个企业账号玩玩吧！
# 4、版本信息
 1、因为个人小程序不支持打开外部链接，目前文章详情使用的是复制链接到剪切板。
 2、修复因wanAndroid网站升级https域名接口无法访问到数据的问题。
# 5、小程序界面
![首页](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/%E9%A6%96%E9%A1%B5.png)     ![热搜](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/%E7%83%AD%E6%90%9C.png)
![体系](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/%E4%BD%93%E7%B3%BB.png)     ![公众号](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/%E5%85%AC%E4%BC%97%E5%8F%B7.png) 
![我的](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/%E6%88%91%E7%9A%84.png)     ![文章列表](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8.png)     
![登录](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/%E7%99%BB%E5%BD%95.png)

## 建了一个公众号，大家一起交流一下吧。
![公众号](https://github.com/mtjsoft/wanandroid/blob/master/img-folder/wx.jpg)

# 6、小程序上线接口(wanAndroid网站已全面升级https，所以可以直接使用其接口，用下面的接口也可以)：
由于小程序上线必须要求服务器域名只支持https协议，所以我将玩android的api数据在我本人的服务器上转发了一下。
```
/**========================================1.首页相关

=================================================================**/
    /**
     * 首页文章列表
     * Get
     * https://www.mtjsoft.cn/wanandroid/api/article/list
     * @param pagernumber 方法：GET
     *                    参数：页码，从0开始。
     * 
     */


    /**
     * 首页banner
     * Get
     * https://www.mtjsoft.cn/wanandroid/api/banner
     * 
     * 
     */
    

    /**
     * 常用网站
     * Get
     * https://www.mtjsoft.cn/wanandroid/api/friend
     * 
     */

    /**
     * 搜索热词
     * Get
     * https://www.mtjsoft.cn/wanandroid/api/hotkey
     * 
     * 
     */

    /**========================================2.体系

=================================================================**/

    /**
     * 体系数据 
     * Get
     * https://www.mtjsoft.cn/wanandroid/api/tree
     * 
     * 
     */

    /**
     * 知识体系下的文章
     * GET
     * https://www.mtjsoft.cn/wanandroid/api/tree/list
     * @param pagernumber 方法：GET
     *                    页码：从0开始。
     * @param cid  分类的id，上述二级目录的id
     * 
     */

    /**========================================3.导航

=================================================================**/
    /**
     * 导航数据
     * Get
     * https://www.mtjsoft.cn/wanandroid/api/navi
     * 
     */

    /**========================================4.项目

=================================================================**/
    /**
     * 项目分类  GET
     * https://www.mtjsoft.cn/wanandroid/api/project
     * 
     */

    /**
     * 项目列表数据 GET
     * https://www.mtjsoft.cn/wanandroid/api/project/list
     * @param pagernumber 方法：GET
     *                    页码：从1开始。
     * @param cid  分类的id，上面项目分类接口
     */

    /**========================================5. 登录与注册

=================================================================**/

    /**
     * 登录 POST
     * https://www.mtjsoft.cn/wanandroid/api/login
     * @param username 用户名
     * @param password 密码
     */
    

    /**
     * 退出登录 Get
     * https://www.mtjsoft.cn/wanandroid/api/loginout
     * @param username 用户名
     */


    /**
     * 注册 POST
     * https://www.mtjsoft.cn/wanandroid/api/register
     * @param username   
     * @param password
     * @param repassword
     */

    /**========================================6. 收藏

=================================================================**/
    /**
     * 收藏的文章列表 GET
     * https://www.mtjsoft.cn/wanandroid/api/collect/list
     * @param pagernumber 方法：GET
     *                    参数： 页码：从0开始。
     * @param username 用户名
     */

    /**
     * 收藏站内文章 POST
     * https://www.mtjsoft.cn/wanandroid/api/collect
     * @param id 文章id，为需要收藏的id.
     * @param username 用户名
     */

    /**
     * 从文章列表取消收藏 POST 
     * https://www.mtjsoft.cn/wanandroid/api/uncollectoriginId
     * @param id 
     * @param username 用户名
     */


    /**
     * 从我的收藏页面取消收藏 POST
     * https://www.mtjsoft.cn/wanandroid/api/uncollect
     * @param username 用户名
     * @param id 
     * @param originId:列表页下发，无则为-1
     *        originId 代表的是你收藏之前的那篇文章本身的id； 但是收藏支持主动添加，这种情况下，没有

originId则为-1
     */

    /**========================================7.搜索

=================================================================**/
    /**
     * 搜索 POST
     * https://www.mtjsoft.cn/wanandroid/api/query
     * @param key         key： 搜索关键词
     *                    注意：支持多个关键词，用空格隔开
     * @param pagernumber 页码：从0开始。
     */
    

    

/**========================================8.HTML=========================================================

========**/
    /**
     * 获取html Get
     * https://www.mtjsoft.cn/wanandroid/api/html
     * @param link 链接
     */


    /**========================================9.TODO工具

=================================================================**/
    /**
     * TODO列表 Get
     * https://www.mtjsoft.cn/wanandroid/api/todo/list
     * @param typename 目前支持0,1,2,3
     * @param username 用户名
     */


    /** 
     * 新增一条Todo  POST
     * https://www.mtjsoft.cn/wanandroid/api/todo/add
     * @param typename 方法：POST
     *                 参数：
     *                 title: 新增标题
     *                 content: 新增详情
     *                 date: 2018-08-01
     *                 typename: 目前支持0,1,2,3
     * @param title
     * @param content
     * @param date
     * @param username
     */
    

    /**
     * 更新一条Todo内容 POST
     * https://www.mtjsoft.cn/wanandroid/api/todo/update
     * @param id
     * @param typename
     * @param title
     * @param content
     * @param date
     * @param status
     * @param username 方法：POST
     *                 参数：
     *                 id: 拼接在链接上，为唯一标识
     *                 title: 更新标题
     *                 content: 新增详情
     *                 date: 2018-08-01
     *                 status: 0 // 0为未完成，1为完成
     *                 typename: 目前支持0,1,2,3
     */
    

    /**
     * 删除一条Todo  POST
     * https://www.mtjsoft.cn/wanandroid/api/todo/delete
     * @param id
     * @param username 方法：POST
     *                 参数：
     *                 id: 为唯一标识
     */


    /**
     * 仅更新完成状态Todo POST
     * https://www.mtjsoft.cn/wanandroid/api/todo/done
     * @param id
     * @param status
     * @param username 方法：POST
     *                 参数：
     *                 id: 拼接在链接上，为唯一标识
     *                 status: 0或1，传1代表未完成到已完成，反之则反之。
     */
    

    /**
     * 未完成Todo列表 POST
     * https://www.mtjsoft.cn/wanandroid/api/todo/listnotdo
     * @param typename
     * @param pagernumber
     * @param username    方法：POST
     *                    参数：
     *                    typename：目前支持0,1,2,3
     *                    pagernumber页码: 从1开始；
     */


    /**
     * 已完成Todo列表 POST
     * https://www.mtjsoft.cn/wanandroid/api/todo/listdone
     * @param typename
     * @param pagernumber
     * @param username    方法：POST
     *                    参数：
     *                    typename：目前支持0,1,2,3
     *                    pagernumber: 从1开始；
     * 
     */
   

    /**
     * 获取公众号列表 GET
     * https://www.mtjsoft.cn/wanandroid/api/wxarticle/chapters
     * @param username
     */
    

    /**
     * 查看某个公众号历史数据 GET
     * https://www.mtjsoft.cn/wanandroid/api/wxarticle/list
     * @param username
     * @param id
     * @param pager    方法：GET 参数：
     *                 公众号 id：eg:405
     *                 公众号页码pager：eg:1
     */
    

    /**
     * 在某个公众号中搜索历史文章 GET
     * https://www.mtjsoft.cn/wanandroid/api/wxarticle/list/key
     * @param username
     * @param id
     * @param pager
     * @param k        方法：GET
     *                 参数：
     *                 公众号 id：eg:405
     *                 公众号页码pager：eg:1
     *                 k:关键词
     */
}
```
