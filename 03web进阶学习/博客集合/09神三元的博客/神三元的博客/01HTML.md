## 001: HTML5 和 HTML4 究竟有哪些不同?

### 声明方面
HTML5文件类型声明(`<!DOCTYPE>`) 变成下面的形式:

    ```html
    <!DOCTYPE html>
    ```
### 标准方面
HTML5的文档解析不再基于SGML(Standard Generalized Markup Language)标准，而是形成了自己的一套标准。

### 标签方面
1. 新增语义标签, 其中包括:
    ```html
    <header>, <footer>, <section>,<article>, <nav>, <hgroup>, <aside>, <figure>
    ```
2. 废除一些网页美化方面的标签, 使样式与结构分离更加彻底, 包括:

    ```html
    <big>, <u>, <font>, <basefont>, <center>, <s>, <tt>
    ```
3. 通过增加了 `<audio>, <video>` 两个标签来实现对多媒体中的音频, 视频使用的支持

### 属性方面
1. 增加了一些表单属性, 主要使其中的 input属性的增强

    ```html
    <!-- 此类型要求输入格式正确的email地址 -->
    <input type=email >
    <!-- 要求输入格式正确的URL地址  -->
    <input type=url >
    <!-- 要求输入格式数字，默认会有上下两个按钮 -->
    <input type=number >
    <!-- 时间系列，但目前只有 Opera和Chrome支持 -->
    <input type=date >
    <input type=time >
    <input type=datetime >
    <input type=datetime-local >
    <input type=month >
    <input type=week >
    <!-- 默认占位文字 -->
    <input type=text placeholder="your message" >
    <!-- 默认聚焦属性 -->
    <input type=text autofacus="true" >
    ```
2. 其他标签新增了一些属性

    ```html
    <!-- meta标签增加charset属性 -->
    <meta charset="utf-8">
    <!-- script标签增加async属性 -->
    <script async></script>
    ```
3. 使部分属性名默认具有 boolean 属性

    ```html
    <!-- 只写属性名默认为true -->
    <input type="checkbox"  checked/>
    <!-- 属性名="属性名"也为true -->
    <input type="checkbox"  checked="checked"/>
    ```

### 存储方面
1. 新增WebStorage, 包括 localStorage 和 sessionStorage
2. 引入了 indexedDB 和 Web SQL,允许在浏览器端创建数据库表并存储数据, 两者的区别在于IndexedDB更像是一个NoSQL数据库, 而WebSQL更像是关系型数据库.  W3C已经不再支持WebSQL。
3. 引入了应用程序缓存器(application cache), 可对web进行缓存, 在没有网络的情况下使用, 通过创建cache manifest文件, 创建应用缓存, 为PWA(Progressive Web App) 提供了底层的技术支持


## meta标签属性有哪些?
> 简介: 常用于定义页面的说明, 关键字, 最后修改日期, 和其它的元数据. 这些元数据将服务于浏览器(如何布局或重载有页面), 搜索引擎和其它网络服务

### charset属性
```html
<!-- 定义网页文档的字符集 -->
<meta charset="utf-8">
```
### name + content属性
```html
<!-- 网页作者 -->
<meta name="author" content="开源技术团队"/>
<!-- 网页地址 -->
<meta name="website" content="https://sanyuan0704.github.io/frontend_daily_question/"/>
<!-- 网页版权信息 -->
 <meta name="copyright" content="2018-2019 demo.com"/>
<!-- 网页关键字, 用于SEO -->
<meta name="keywords" content="meta,html"/>
<!-- 网页描述 -->
<meta name="description" content="网页描述"/>
<!-- 搜索引擎索引方式，一般为all，不用深究 -->
<meta name="robots" content="all" />
<!-- 移动端常用视口设置 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
<!-- 
  viewport参数详解：
  width：宽度（数值 / device-width）（默认为980 像素）
  height：高度（数值 / device-height）
  initial-scale：初始的缩放比例 （范围从>0 到10）
  minimum-scale：允许用户缩放到的最小比例
  maximum-scale：允许用户缩放到的最大比例
  user-scalable：用户是否可以手动缩 (no,yes)
 -->
```

### http-equiv 属性
```html
<!-- expires指定网页的过期时间。一旦网页过期，必须从服务器上下载。 -->
<meta http-equiv="expires" content="Fri, 12 Jan 2020 18:18:18 GMT"/>
<!-- 等待一定的时间刷新或跳转到其他url。下面1表示1秒 -->
<meta http-equiv="refresh" content="1; url=https://www.baidu.com"/>
<!-- 禁止浏览器从本地缓存中读取网页，即浏览器一旦离开网页在无法连接网络的情况下就无法访问到页面。 -->
<meta http-equiv="pragma" content="no-cache"/>
<!-- 也是设置cookie的一种方式，并且可以指定过期时间 -->
<meta http-equiv="set-cookie" content="name=value expires=Fri, 12 Jan 2001 18:18:18 GMT,path=/"/>
<!-- 使用浏览器版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- 针对WebApp全屏模式，隐藏状态栏/设置状态栏颜色，content的值为default | black | black-translucent -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```
## src 和 href 的区别是什么?
### 定义
href 是 Hypertext Reference 的简写, 表示超文本引用, 指向网络资源所在位置

常见场景:
```html
<a href="http://www.baidu.com"></a>
```
src 是source 的简写, 目的是要把文件下载到html页面中去

常见场景:
```html
<img src="img/girl.jpg" />
<iframe src="top.html" />
<script src="show.js" />
```
### 作用结果
1. href 用于在当前文档和引用资源之间确立联系
2. src用于替换当前内容

### 浏览器解析方式
1. 当浏览器遇到href 会并行下载资源并且不会停止对当前文档的处理. (同时也是为什么建议使用 link 方式 加载CSS, 而不是使用 @import 方式)
2. 当浏览器解析到src, 会暂停其他资源的下载和处理, 直到将该资源加载或执行完毕. (这也是 script 标签 为什么放在底部而不是头部的原因)

## script 标签中 defer 和 async 的区别是什么?
默认情况下, 脚本的下载和执行将会按照文档的先后顺序同步进行. 当脚本下载和执行的时候, 文档解析就会被阻塞, 在脚本下载和执行完成之后文档才能往下继续进行解析.

下面是 async 和 defer 两者区别:
- 当 script中有 defer属性时, 脚本的加载过程和 文档加载是异步发送的, 等到文档解析完(DOMContentLoaded事件发生)脚本才开始执行
- 当 script 有 async 属性时, 脚本的加载过程和文档加载也是异步发送的. 但脚本下载完成后会停止HTML解析, 执行脚本, 脚本解析完继续HTML解析.
- 当 script 同时有async 和 defer属性时, 执行效果和 async 一致.
