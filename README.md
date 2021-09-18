## 做最漂亮的[玩Android小程序]V3.0
相较于[第二个版本](https://blog.csdn.net/qq_28779083/article/details/103632884)的更新：

 1. 整体重构了API请求。因为写这个小程序的时间比较早了，那个时候的玩安卓开放API还未支持HTTPS，导致无法上线小程序，所以为了能够顺利上线，所有用到的API都是由自己的服务器做了中转的。现在的开放API早已支持了HTTPS，就没有理由不换回来了。
 2. 网络请求二次封装。最开始学习开发小程序时，都是使用的纯原生开发，导致写了很多重复代码，难以维护。现在逐步封装之后，便于统一管理维护。
 3. **重要是解决了小程序中打开文章详情问题。** 大家都知道小程序是不允许打开外部的url链接的。所以第二版采用了第三方公众号推送消息的方式，但是这种方式的推送渠道随时都可能会被关闭，太不可靠了。

     最近又研究了一下**小程序客服会话**。利用**客服会话**的聊天界面可以打开文章详情的链接。具体方式在文章最后演示。

 ## 已实现的功能：
 - [x]  首页banner
 - [x]  首页文章
 - [x]  热搜
 - [x]  常用网站
 - [x]  文章搜索
 - [x]  体系分类
 - [x]  体系分类文章
 - [x]  公众号
 - [x]  公众号文章及搜索
 - [x]  个人中心
 - [x]  个人积分排名
 - [x]  最新项目列表
 - [x]  我的收藏
 - [x]  站内文章收藏与取消收藏
 - [x]  登录、注册、退登
 - [x]  TODO

## 界面预览
![首页](https://img-blog.csdnimg.cn/20191220150442964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)            ![热搜](https://img-blog.csdnimg.cn/2019122015051390.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
![体系](https://img-blog.csdnimg.cn/20191220150701565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)       ![公众号](https://img-blog.csdnimg.cn/20191220150743343.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)   ![我的](https://img-blog.csdnimg.cn/701604522ca540baa019e65fa899a0ce.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5biF5rCU55qE6ZOF56yU,size_9,color_FFFFFF,t_70,g_se,x_16)  ![体系文章](https://img-blog.csdnimg.cn/f135b3259de542dd916b2880da4a5916.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5biF5rCU55qE6ZOF56yU,size_9,color_FFFFFF,t_70,g_se,x_16)


## 怎么样？O(∩_∩)O 赶紧微信扫码体验吧！
![小程序码](https://img-blog.csdnimg.cn/20191220163317190.jpg)
## 客服会话打开文章详情

 1. 再点击需要查看的文章时，会弹出提示框。提示文章链接已复制到剪切板，点击“立即发送”就会跳转到**客服会话**。
 2. 进入**客服会话**后，将剪切板内容粘贴发送，就可以看到 **【文章标题】+ 【文章链接】** 此时直接点击链接即可查看文章详情。

![在这里插入图片描述](https://img-blog.csdnimg.cn/f92c21a6a3454a19bc9be8e073209012.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5biF5rCU55qE6ZOF56yU,size_9,color_FFFFFF,t_70,g_se,x_16)  ![在这里插入图片描述](https://img-blog.csdnimg.cn/1c9c9b73822e4556983c59b218a2606e.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5biF5rCU55qE6ZOF56yU,size_9,color_FFFFFF,t_70,g_se,x_16)


## 关于我们

 - 该项目是我个人基于鸿洋大神的玩android开放API开发的一款高颜值的微信小程序。这个项目拥有漂亮的界面和实用的功能。如果你有一些更好的想法或建议，可以在[GitHub](https://github.com/mtjsoft/wanandroid)里提交给我，我很欢迎大家一起维护。
 - 该项目使用了ColorUI组件库！在此非常感谢该开源库的作者‘文晓港’。同时也使用了部分有赞的开源库vant-weapp，在此表示感谢！当然也要感谢鸿洋大神提供的玩android开放API。

 - 项目是开源的，不收取任何费用，如果这个项目有帮到你，或者你觉得很赞，可以赞赏支持一下！
![赞赏](https://img-blog.csdnimg.cn/20191220171453721.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
 - 有什么问题也可以直接加我个人微信，记得备注一下！  

![微信](https://img-blog.csdnimg.cn/20191220171528845.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)

## 发现任何问题，记得过来提哦~ [issues](https://github.com/mtjsoft/wanandroid/issues)尽可能给我star

> 感谢 [ColorUi](https://www.color-ui.com/)
> 感谢 [Vant-weapp](https://youzan.github.io/vant-weapp/#/intro)
> 感谢 [玩Android](https://www.wanandroid.com/index)
