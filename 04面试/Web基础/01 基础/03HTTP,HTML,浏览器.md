## csrf和xss的网络攻击及防范

CSRF: 跨站请求伪造, 可以理解为攻击者调用了用户的身份,以用户的名义发送了恶意请求,比如用户登录了一个网站后,立刻在另一个tab页面访问了攻击者用来制造攻击的网站,这个网站要求访问刚刚登录的网站,并发送了一个恶意请求,这时候CSRF就产生了,比如这个制造攻击的网站使用一张图片,但是这种图片的链接确实可以修改数据库的, 这时候攻击者就可以以用户的名义操作这个数据库,防御方式的话: 使用验证码, 检查https头部的refer,使用token

XSS: 跨站脚本攻击,是说攻击者通过注入恶意的脚本,在用户浏览器页的时候进行攻击,比如获取cookie,或者其他用户身份信息,可以分为存储型和反射型,存储型是攻击者输入一些数据并且存储到了数据库中,其他浏览者看到的时候进行攻击,反射型的话不存储在数据库中,往往表现为将攻击代码放在url地址的请求参数中,防御的话为cookie设置httpOnly属性,对用户的输入进行检查,进行特殊字符过滤

## 怎么看网站的性能

检测页面加载时间一般有两种方式:
-  一种是被动检测: 就是在检测的页面置入脚本或探针,当用户访问网页时,探针自动采集数据并传回数据库进行分析
-  另一种是主动检测的方式: 即主动的搭建分布式受控环境,模拟用户发起页面访问请求,主要采集性能数据并分析,在检测的精度上,专业的第三工具效果最佳,比如说性能极客

## 介绍http协议(特征)
http是一个基于TCP/IP通信协议来传递数据(html文件,图片文件,查询结果等)http是一个属于应用层的面向对象的协议,由于其简捷,快速的方式,适用于分布式超媒体信息系统. 它于1990年提出, 经过几年的使用于发展,得到不断地完善和扩展,目前在www中使用的是http/1.0的第六版, http/1.1的规范化功能工作正在进行之中,而且HTTP-NG(Next Generation of HTTP)的建议以及提出. http协议工作于客户端-服务端架构为上,浏览器作为http客户端通过URL向HTTP服务端发送所有请求, web服务器根据接受到的请求后, 向客户端发送响应信息


## 说一下对Cookie和Session的认知,cookie有哪些
1. cookie数据存放在客户的浏览器上, session数据放在服务器上
2. cookie不是很安全,别人可以分析存放在本地的cookie并进行cookie欺骗
3. session会在一定时间内保存在服务器上,当访问增多,会比较占用你服务器的性能,考虑到减轻服务器性能方面, 应当使用cookie
4. 单个cookie保存的数据不能超过4k,很多浏览器都限制一个站点最多保存20个cookie

## cookie有哪些字段可以设置
- name字段为一个cookie的名称,value字段为一个cookie的值
- domain字段为可以访问此cookie的域名
- 非顶级域名, 如二级域名或者三级域名,设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身,不能设置其他二级域名的cookie,否则cookie无法生成
- 二级域名能读取设置了domain为顶级域名或者自身的cookie,不能读取其他二级域名domain的cookie,所以想要cookie在多个二级域名中共赏,需要设置domain为顶级域名,这样就可以在所有二级域名里面或者到这个cookie的值了
- path字段为可以访问此cookie的页面路径,比如domain是abc.com,path是/test,那么只有/test路径下面的页面可以读取此cookie
- expires/Max-Age 字段为此cookie超时时间, 若设置其值为一个时间,那么到达此时间后,此cookie失效,不设置的话默认值是Session, 意思是cookie会和session一起失效. 当浏览器关闭(不是浏览器标签页,而是真整个浏览器)后,此cookie失效
- size字段,此cookie大小
- http字段 cookie的httpOnly属性, 若此属性为true,则只有在http请求头中会带有此cookie的信息,而不能通过document.cookie来访问此cookie
- secure字段,设置是否只能通过https来传递此条cookie

## HTML5和CSS3用的多吗?你了解他们的新属性吗?
### html5
1. 标签增删

    - 8个语义化元素: header, section, footer, aside, nav, main, article, figure
    - 内容元素  mark高亮, progress进度
    - 新的表单控件 date time email url search
    - 新的input类型 color date datetime datetime-local email
    - 移除过时标签big  font  frame  frameset
2. canvas绘图
3. 多媒体audio video source  embed track
4. 本地离线存储, 把需要离线存储在本地的文件列在一个manifest配置文件
5. web存储, localStorage, SessionStorage

### css3
- css3边框 如: border-radius, box-shadow等,
- css3背景 如: background-size, background-origin等
- css3 2D,3D转换如: transform等
- css3 动画如`animation`等, 参考 https://www.cnblogs.com/xkweb/p/5862612.html

## get 和post的区别
- get  从指定的资源请求数据
- post 向指定的资源提交要被处理的数据
- get  不同的浏览器和服务器不同,一般限制在2~8k之间,更加常见的是1k以内
- get和post的底层也是tcp/ip,get/post都是tcp链接
- get产生一个tcp数据包, post产生两个tcp数据包
- 对于get方式的请求, 浏览器会把http header 和 data一并发送出来,服务器响应200(返回数据)
- 对于post,浏览器先发送header, 服务器响应100 continue,  浏览器再发送data, 服务器响应200 ok(返回数据)

