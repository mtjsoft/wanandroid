## 玩Android小程序v2.0，做最漂亮的应用
相较第一个版本，做了两个非常重要的更新：

 1. 界面的优化，使用了[ColorUi](https://www.color-ui.com/)、[Vant-weapp](https://youzan.github.io/vant-weapp/#/intro)框架，使界面更美观、漂亮。力争做最好用、最漂亮的玩Android小程序。
 2. 使用“[Server酱](http://sc.ftqq.com/3.version)”进行微信绑定消息推送，实现了文章详情的查看。Server酱的key需要配置，后面会说明。

## 先睹为快
![首页](https://img-blog.csdnimg.cn/20191220150442964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)            ![热搜](https://img-blog.csdnimg.cn/2019122015051390.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
![体系](https://img-blog.csdnimg.cn/20191220150701565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)       ![公众号](https://img-blog.csdnimg.cn/20191220150743343.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
![我的](https://img-blog.csdnimg.cn/20191220150809750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70) ![绑定key](https://img-blog.csdnimg.cn/2019122015083426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
怎么样？是不是有累味了？O(∩_∩)O 赶紧扫码使用吧！
![小程序码](https://img-blog.csdnimg.cn/20191220163317190.jpg)
## Server酱配置

 1. 点击打开[Server酱 http://sc.ftqq.com/3.version](http://sc.ftqq.com/3.version)官网
 2. 点击右上角的“登入”，GitHub账号一键登入（作为开发者，千万别说你没有GitHub账号！手动滑稽~~）
 3. 点击“微信推送”选项卡，微信扫码二维码即可完成微信绑定
 4. 点击“发送信息”选项卡，即可看到您的SCKEY
 5. 将您获取到的SCKEY复制到小程序绑定界面输入框内，点击保存即可。
 
 *SCKEY是非常重要的，所以请妥善保存，不要随便告诉别人。另外**同样内容的消息一分钟只能发送一次**，服务器只保留一周的消息记录。*

配置好以后，就可以愉快的查看文章详情啦！

 ***玩Android小程序只在本地缓存中保存SCKEY，所以请放心使用。***


## 关于

 - 该项目是我个人基于鸿洋大神的玩android开放API开发的一款高颜值的微信小程序。这个项目拥有漂亮的界面和实用的功能。如果你有一些更好的想法或建议，可以在[GitHub](https://github.com/mtjsoft/wanandroid)里提交给我，我很欢迎大家一起维护。
 - 该项目使用了ColorUI组件库！在此非常感谢该开源库的作者‘文晓港’。同时也使用了部分有赞的开源库vant-weapp，在此表示感谢！当然也要感谢鸿洋大神提供的玩android开放API。

 - 项目是开源的，不收取任何费用，如果这个项目有帮到你，或者你觉得很赞，可以赞赏支持一下！
![赞赏](https://img-blog.csdnimg.cn/20191220171453721.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
 - 有什么问题也可以直接加我个人微信，记得备注一下！  

![微信](https://img-blog.csdnimg.cn/20191220171528845.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)

## 发现任何问题，记得过来提哦~ [issues](https://github.com/mtjsoft/wanandroid/issues)尽可能给我star,好让我ZB ~

## [swagger接口文档点击这里查看](https://www.mtjsoft.cn/swagger-ui.html#/%E7%8E%A9android%E5%BC%80%E6%94%BEapi)
![swagger接口](https://img-blog.csdnimg.cn/20191220173443486.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)

> 感谢 [ColorUi](https://www.color-ui.com/)
> 感谢 [Vant-weapp](https://youzan.github.io/vant-weapp/#/intro)
> 感谢 [玩Android](https://www.wanandroid.com/index)
