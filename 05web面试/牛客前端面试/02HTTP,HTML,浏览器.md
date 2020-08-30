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
- 409 Conflict 服务器等待客服端发送的请求时间过长,服务器处理请求时发生了冲突
- 410 Gone 客户端请求的资源已经不存在. 410不同于404, 如果资源以前有现在被永久删除了可使用410,网站设计人员可通过301代码指定资源的新位置
- 411 Length Required 服务器无法处理客户端发送的不带Content-Length的请求信息
- 412 Precondition Failed 客户端请求信息的先决条件错误
- 413  Request Entity Too Large 由于请求的实体过大,服务器无法处理,因此拒绝请求. 为防止客户端的连续请求,服务器可能会关闭连接. 如果只是服务器暂时无法处理,则会包含一个Retry-After的响应信息
- 414 Request-URI Too Large 请求的URI过长(URL通常为网址),服务器无法处理
- 415 Unsupported Media Type 服务器无法处理请求附带的媒体格式
- 416 Requested range not satisfiable 客户端请求的范围无效
- 417 Expectation Failed 服务器无法满足Expect的请求头信息
- 500 Internal Server Error   服务器内部错误,无法完成请求
- 501 Not Implemented  服务器不支持请求的功能,无法完成请
- 502 Bad Gateway  作为网关或者代理工作的服务器尝试执行请求时,从远程服务器接受到了一个无效的响应
- 503 Service Unavailable  由于超载或系统维护, 服务器暂时的无法处理客户端的请求. 延时的长度可包含在服务器的Retry-After头信息中
- 504 Gateway Time-out 充当网关或代理的服务器,未及时从远端服务器获取请求
- 505 HTTP Version not supported 服务器不支持请求的HTTP协议的版本,无法完成处理

## http常用请求头
| 协议头              | 说明                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept              | 可接受的响应内容类型(Content-type)                                                                                                                                                          |
| Accept-Charset      | 可接受的字符集                                                                                                                                                                              |
| Accept-Encoding     | 可接受的响应内容的编码方式                                                                                                                                                                  |
| Accept-Language     | 可接受的响应内容语言列表                                                                                                                                                                    |
| Accept-DateTime     | 可接受的按照时间来表示的响应内容版本                                                                                                                                                        |
| Authorization       | 用于表示HTTP协议中需要认证资源的认证信息                                                                                                                                                    |
| Cache-Control       | 用于指定当前的请求/回复中,是否使用缓存机制                                                                                                                                                  |
| Connection          | 客户端(浏览器)想要使用的连接类型                                                                                                                                                            |
| Cookie              | 由之前服务器通过Set-Cookie (见下文)设置的一个HTTP协议Cookie                                                                                                                                 |
| Content-Length      | 以8进制表示的请求体长度                                                                                                                                                                     |
| Content-MD5         | 请求体的内容的二进制MD5 散列值(数字签名),以Base64编码的结果                                                                                                                                 |
| Content-Type        | 请求体的MIME类型(用于POST和PUT请求中)                                                                                                                                                       |
| Date                | 发送该消息的日期和时间(以RFC 7231中定义的'HTTP日期"格式来发送)                                                                                                                              |
| Expect              | 表示客户端要求服务器做出特定的行为                                                                                                                                                          |
| From                | 发起此请求的用户的邮件地址                                                                                                                                                                  |
| Host                | 表示服务器的域名以及服务器监听的端口号. 如果所请求的端口时对应的服务的标准端口(80), 则端口号可以省略                                                                                        |
| If-Match            | 仅但客户端提供的实体与服务器上对应的实体相匹配时,才进行对应的操作. 主要用于像PUT这样的方法中, 仅当从用户上次个更新某个资源后,该资源未被修改的情况下,才更新该资源                            |
| If-Modified-Since   | 允许在对应的资源未被修改的情况下返回 304 未修改                                                                                                                                             |
| If-None-Match       | 允许在对应的资源未被修改的情况下返回 304 未修改(304 Not Modified), 参考 超文本传输协议的实体标记                                                                                            |
| If-Range            | 如果该实体未被修改过,则向返回缺少的那一个或多个部分,否则,返回整个新的实体                                                                                                                   |
| If-Unmodified-Since | 仅当该实体自某个特定时间以来未被修改的情况下,才发送回应                                                                                                                                     |
| Max-Forwards        | 限制该消息可被代理及网关转发的次数                                                                                                                                                          |
| Origin              | 发起一个针对 [跨域资源共赏](https://itbilu.com/javascript/js/VkiXuUcC.html)的请求                                                                                                           |
| Pragma              | 与具体的实现相关, 这些字段你可能在请求/回应链中的任何时候产生                                                                                                                               |
| Proxy-Authorization | 用于向代理进行认证的认证信息                                                                                                                                                                |
| Range               | 表示请求某个实体的一部分, 字节偏移以0开始                                                                                                                                                   |
| Referer             | 表示浏览器所访问的前一个页面,可以认为是之前访问页面的链接将浏览器带到了当前页面. Referer其实是Referrer这个单词,但RFC制作标准时给拼错了,后来也就将错就错使用Referer了                        |
| TE                  | 浏览器预期接受的传输时的编码方式;可使用回应协议头Transfer-Enconding 中的值(还可以使用 'trailers'表示数据传输时的分块方式) 用来表示浏览器希望在最后一个大小为0的块之后还接受到一些额外的字段 |
| User-Agent          | 浏览器的身份标识字符串                                                                                                                                                                      |
| Upgrade             | 要求服务器升级到一个高版本协议                                                                                                                                                              |
| Via                 | 告诉服务器,这个请求是由哪些代理发出的                                                                                                                                                       |
| Warning             | 一个一般性的警告,表示在实体内容中可能存在错误                                                                                                                                               |

## 强, 协商缓存
缓存分为两种: 强缓存和协商缓存,根据响应的header内容来决定

| <br/>    | 获取资源形式 | 状态码             | 发送请求到服务器                |
| -------- | ------------ | ------------------ |
| 强缓存   | 从缓存取     | 200(from cache)    | 否,直接从缓存取                 |
| 协商缓存 | 从缓存取     | 304 (not modified) | 是,通过服务器来告知缓存是否可用 |

强缓存相关字段由 expires, cache-control,如果 cache-control与expires同时存在的话, cache-control的优先级高于expires<br/>
协商缓存相关字段有Last-Modified/If-Modified-Since,Etag/If-None-Match



## 304 
304: 如果客户端发送了一个带条件的get 请求且请求已被允许,而文档的内容(自上次访问以来或者根据请求的条件)并没有改变,则服务器应当返回这个304状态码

## 强缓存,协商缓存什么时候用哪个
因为服务器上的资源不是一直固定不变的, 大多数情况下它会更新,这个时候如果我们还访问本地缓存,那么对用户来说,那就相当于资源没有更新,用户看大的还是旧的资源,所有我们希望服务器上的资源更新了浏览器就请求新得资源,没有更新就使用本地的缓存,以最大程度的减少因网络请求而产生的资源浪费

![](./images/311436_1552361773903_9DC69E327B4B3691E94CD9D52D10E2C1.png)

## 前端优化
- 降低请求量: 合并资源,减少http请求数,minify/gzip压缩,webP,lazyLoad
- 加快请求速度: 预解析DNS,减少域名数,并行加载,CDN分发
- 缓存: HTTP协议缓存请求,离线缓存manifest,离线数据缓存localStorage
- 渲染: JS/CSS优化, 加载顺序,服务端渲染,pipeline

## get和post的区别
- get参数通过url传递,post放在request body中
- get请求在url中传递的参数是有长度限制的,而post没有
- get比post更不安全,因为参数直接暴露在url中,所以不能用来传递敏感数据
- get请求只能进行url编码,而post支持多种编码方式
- get请求会浏览器主动cache,而post支持多种编码方式
- get请求参数会被完整保留在浏览历史记录里,而post中的参数不会被保留
- get和post本质上就是tcp链接,并无差别. 但是由于http的规定和浏览器/服务器的限制,导致他们在应用过程中体现出一些不同
- get产生一个TCP数据包;post产生两个tcp数据包

## 301 和302 的区别
- 301 Moved Permanently 被请求的资源已永久移动到新位置, 并且将来任何对此资源的引用都应该使用本响应返回的若干个URI之一. 如果可能, 拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址,除非额外指定,否则这个响应也是可缓存的.
- 302 Found 请求的资源现在临时从不同的URI响应请求. 由于这样的重定向是临时,客户端应当继续向原有地址发送以后的请求. 只有在Cache-control或Expires中进行了指定的情况下,这个响应才是可缓存的

301比较常用场景是使用域名跳转. 302用来临时跳转,比如未登录的用户访问中心重定向到登录页面

## HTTP支持的方法
get,post,put,head,options,delete,trace,connect,patch

## 如何画一个三角形
```css
div{
    width:0px;
    height:0px;
    border-top:10px solid red;
    border-right:10px solid transparent;
    border-bottom:10px solid transparent;
    border-left:10px solid transparent;
}
```

## 状态码 304 和 200 
- 状态码200: 请求已成功,请求所希望的响应头或数据体将随此响应返回,即返回的数据为全量的数据, 如果文件不通过GZIP压缩的话,文件是多大,则要有多大传输量
- 状态码304: 如果客户端发送了一个待条件的GET请求且该请求已被允许,而文档的内容(自上次访问以来或者根据请求的条件)并没有改变,则服务器应当返回这个状态码. 即客户端和服务器端只需要传输很少的数据量来做文件的检验, 如果文件没有修改过,则不需要返回全量的数据

## HTML5新增的元素
首先html5为了更好的实践web语义化, 增加了header,footer,nav,aside,section等语义化标签, 在表单方面,为了增强表单,为input增加了color,email,data,range等类型,在存储房方面,提供了sessionStorage,localStorage,和离线存储,通过这些存储方式方便数据在客户端的存储和获取,在多媒体方面规定了音频和视频元素audio和 vedio, 另外还有地理定位,canvas画布,拖放, 多线程编程的web worker 和websocket协议

## 在地址栏里输入一个URL,到这个页面呈现出来,中间会发生什么?
这是一个必考的面试题

输入url后,首先需要找到这个url域名的服务器ip,为了寻找这个ip,浏览器首先会寻找缓存,查看缓存中是否有记录,缓存的查找记录为: 浏览器缓存 -> 系统缓存-> 路由器缓存, 缓存中没有则查找系统的host文件中是否有记录,如果没有则查询DNS服务器,

得到服务器的ip地址后,浏览根据这个ip以及相应的端口号,构造一个http请求,这个请求报文会包括这次请求的信息, 主要是请求方法,请求说明和请求附带的数据, 并将这个http请求封装在一个tcp包中,这个tcp包会依次经过传输层,网络层,数据链路层,物理层,物理层到达服务器,服务器解析这个请求来作出相应,返回相应的html给浏览器, 

因为html是一个树形结构,浏览器根据这个html来构建DOM树,在DOM树的构建过程中如果遇到js脚本和外部js连接,则会停止构建DOM树来执行和下载相应的代码,这会造成阻塞,这就是为什么推荐js代码应该放在html代码的后面,之后根据外部样式,内部样式,内联样式构建一个css对象模型树cssom树,构建完成后和DOM树合并为渲染树,主力主要做的是排除非视觉节点,比如scrip,mete标签和排除display为none的节点,

之后进行布局,布局主要是确定各个元素的位置和尺寸,之后是渲染页面,因为html文件中会含有图片,视频,音频等资源,在解析DOM的过程中,遇到这些都会进行并行下载,浏览器对每个域的并行下载有一定的限制,一般是4-6个,当让在这些所有请求中我们还需要关注的就是缓存,缓存一般通过Cache-Control,Last-Modify,Expires等首部字段控制.

Cache-Control和Expires的区别在于Cache-Control使用相对实践,Expires使用的是基于服务器端的绝对时间,因为存在时差问题,一般采用Cache-Control,在请求这些有设置了缓存的数据时,会先查看是否过期,如果没有过期则直接使用本地缓存,过期则请求并在服务器校验文件是否修改,如果上一次响应色湖之了ETag值会在这次请求的时候作为If-None-Match的值交给服务器校验,如果一致,继续校验Last-Modified,没有设置ETag则直接验证Last-Modified,再决定是否返回304

## cookie和session的区别, localStorage和sessionStorage的区别

Cookie和session都可用来存储用户信息,cookie存放于客户端,session存放在服务器端,因为cookie存放于客户端有可能被窃取,所以cookie一般用来存放不敏感的信息,比如用户设置的网站主题,敏感信息用session存储,比如用户的登录信息,session可以存放于文件,数据库,内存中都可以,cookie可以服务端响应的时候设置, 也可以客户端通过js设置cookie会在请求时在http首部发送给客户端,cookie一般在客户端大小限制,一般为4k

下面从几个方向区别一下cookie,localStorage,sessionStorage的区别
1. 生命周期
    - cookie: 可设置失效时间,否则默认为关闭浏览器后失效
    - localStorage:除非被手动清除,否则永久保存
    - sessionStorage: 仅在当前网页会话下有效,关闭页面或浏览器后就会被清除
2. 存放数据
    - cookie: 4k左右
    - localStorage和sessionStorage: 可以保存5M的信息
3. http请求:
    - cookie:每次都会携带在http头中,如果使用cookie保存过多数据会带来性能问题
    - localStorage和sessionStorage: 仅在客服端即浏览器中保存,不参与和服务器的通信
4. 易用性
    - cookie: 需要程序员自己封装, 原生的cookie接口不友好
    - localStorage和sessionStorage: 即可采用原生接口,亦可再次封装
5. 应用场景

    从安全性来说,因为每次http请求都会携带cookie信息,这样子浪费了带宽,所以cookie应该尽可能地少用,此外cookie还需要指定作用域,不可以跨域调用,限制很多,但是用户识别登录来说,cookie还是比storage好用,其他情况下可以用storage,localStorage可以用来在页面传递参数,sessionStorage可以用来保存一些临时地数据,防止用户刷新页面后丢失了一些参数

## 常用地http的头部    
可以将http首部分为通用首部,请求首部,响应首部, 实体首部

- 通用首部表示一些通用信息,比如data表示报文创建时间
- 请求首部就是请求报文中独有的,如cookie,和缓存相关的如If-Modified-Since
- 响应首部就是响应报文中独有的,如set-cookie, 和重定向相关的location
- 实体首部用来描述实体部分的,如allow用来描述可执行的请求方法,content-type描述主体类型,content-Enconding 描述主体的编码方式

## http2.0的特性
htp2.0的特性如下:
1. 内容安全,因为http2.0是基于https的,天然具有安全特性,通过http2.0的特性可以避免单纯使用https的性能下降
2. 二进制格式,http1.x的解析是基于文本的,http2.0将所有的传输信息分为分割为更小的信息和帧,并对他们采用二进制格式编码,基于二进制可以让协议有更多的扩展性,比如引入了帧来传输数据和指令
3. 多路复用, 这个功能相当于是长连接的增强,每个request请求可以随机的混杂在一起,接收方可以根据request的id将request再归属到各自不同的服务端请求里面,另外多路复用中也支持了流的优先级,允许客户端告诉服务器哪些内容是更优先级的资源,可以优先传输

## cache-control的值有哪些
cache-control是一个通用消息头字段被用于http请求和响应中,通过指定指令来实现缓存机制,这个缓存指令是单向的,常见的取值有 private,no-cache,must--revalidate等,默认为private

## 浏览器在生成页面的时候,会生成那两棵树
构造两棵树,DOM树和CSSOM规则树

当浏览器接收到服务器响应来的HTML文档后,会遍历文档节点,生成DOM树

CSSOM规则树由浏览器解析CSS文件生成