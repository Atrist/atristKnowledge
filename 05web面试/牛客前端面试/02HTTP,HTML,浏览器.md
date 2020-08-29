## cookie sessionStorage localStorage区别

cookie数据始终在同源的http请求中携带(即使不需要),即cookie在浏览器和服务器间来回传递,cookie数据还有路径(path)的概念,可以限制,cookie只属于某个路径下

存储大小限制也不同,cookie数据不能超过4k,同时因为每次http请求都会携带cookie,所以cookie只适合保存很小的数据,如回话标识

webStorage虽然也有大小限制,但是比cookie大得多,可以达到5M或更大

数据的有效期不同sessionStorage: 仅在当前的浏览器窗口关闭有效;localStorage:始终有效,窗口或浏览器关闭也一直保存,因此作用持久数据;cookie:只在设置的cookie过期时间之间一直有效,即使窗口和浏览器关闭

作用域不同: sessionStorage: 不在不同的浏览器窗口中共享,即使是同一个页面:localStorage:在所有同源窗口都是共享的;cookie:也是在所有同源窗口中共享的

## cookie session区别
1. cookie数据存放在客户的浏览器上,session数据放在服务器上
2. cookie不是很安全,别人可以分析存放在本地的cookie并进行cookie欺骗
3. session会在一定时间内保存在服务器上. 当访问增多,会比较占用你的服务器的性能
4. 单个cookie保存的数据不能超过4k,很多浏览器都限制一个站点最多保存20个cookie

## 介绍直到的http返回状态码
- 100 Continue 继续, 客户端应继续其请求
- 101 Switching Protocols. 切换协议, 服务器根据客户端的请求切换协议,之只能切换到更高级的协议, 例如 切换到http的新版本协议
- 200 ok 请求成功, 一般用于get与post请求
- 201 Created 已创建. 成功请求并创建了新的资源
- 202 Accepted 已接受. 已经接受请求,但未处理完成
- 203 Non-Authoritative Information 非授权信息,请求成功,但返回的meta信息不在原始的服务器,而是一个副本
- 204 No Content 无内容 服务器成功处理,但未返回内容,在未更新网页的情况下,可确保浏览器继续显示当前文档
- 205 Reset Content 重置内容. 服务器处理内容,用户终端(例如:浏览器)应重置文档视图. 可通过此返回码清楚浏览器的表单域
- 206 Partial Content 部分内容. 服务器成功处理了部分get请求
- 300 Multiple Choices 多种选择. 请求的资源可包括多个位置, 相应可返回一个资源特征与地址的列表用于用户终端(例如:浏览器)选择
- 301 Moved Permanently 永久移动. 请求的资源已被永久的移动到新URL,返回信息会包括新的URL,浏览器会自动定向到新URL, 今后任何新的请求都应使用新的URL代替
- 302 Found 临时移动 与301类似, 但资源只是临时被移动,客户端应继续使用原有URL
- 303 See Other 查看其他地址, 与301类似,使用get和post请求查看
- 304 Not Modified 未修改,所请求的资源未修改,服务器返回此状态码时,不会返回任何资源. 客户端通常会缓存访问过的资源,通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
- 305 Use Proxy 使用代理. 所请求的资源必须通过代理访问
- 306 Unused 已经被废弃的HTTP状态码
- 307 Temporary Redirect  临时重定向, 与302 类似,使用get请求重定向
- 400 Bad Request 客户端请求的语法错误,服务器无法理解
- 401 Unauthorized  请求要求用户的身份认证
- 402 Payment Required 保留,将来使用
- 403 Forbidden 服务器理解请求客户端的请求, 但是拒绝执行此请求
- 404 Not Found 服务器无法根客服端的请求找到资源(网页).通过此代码,网站设计人员可设置"您所请求的资源无法找到"的个性页面
- 405 Method Not Allowed 客户端请求中的方法被禁止
- 406 Not Acceptable 服务器无法根据客户端请求的内容特性完成请求
- 407 Proxy Authentication Required 请求要求代理的身份认证,与401类似,但请求者应当使用代理进行授权
- 408 Request Time-out 服务器等待客户端发送的请求时间延长,超时
