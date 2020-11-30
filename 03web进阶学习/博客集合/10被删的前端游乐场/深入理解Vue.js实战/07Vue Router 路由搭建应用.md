# Vue Router 路由搭建应用
页面的跳转、局部内容的刷新是 web 应用中使用最多的场景。想象一下，如果我们只刷新了页面的内容，但是 URL 并没有改变，当用户刷新当前页面的时候，原先的内容会丢失，需要重新操作进入到对应的页面中，这是比较糟糕的一种体验。所以我们可以把页面的内容匹配到对应的路由信息中，即使是 ctrl+F5 这样的强制刷新，URL 信息也不会丢，用户依然可以快速恢复原先的页面浏览信息，这也是我们要设计和使用路由的很重要的原因。

本章主要介绍如何使用 Vue Router 来管理路由，包括路由的安装和配置、跳转、路由鉴权等。了解一个工具如何使用的同时，更应该了解工具的实现、为什么需要这样来使用。关于 Vue Router 的实现，其实可以从前端路由的出现和常见的实现方式来说起。

## 1. 前端路由
在过去，服务端处理来自浏览器的请求时，要根据不同的 URL 路由拼接出对应的视图页面，通过 Http 返回给浏览器进行解析渲染。使用这种方式加载页面，整个页面都需要重新加载，导致体验不够友好。随着几年前 AngularJS、React、Ember 等这些框架的出现，Web 应用也随之出现。第1章中我们讲了页面的局部刷新，Web 应用则是使用了这种局部刷新的能力，在路由信息变更的时候进行局部页面内容的刷新（而不是重新加载一个完整的页面），从而获取更好的体验。

### 1. 路由实现
路由相关的功能，大多数都是基于基本的 History API、Location API 这些浏览器提供的 API 能力封装的，所以这里我们先介绍和路由有关的一些 API。前端路由的实现，一般包括两种模式：History 模式和 Hash 模式。
#### History 模式
History 的路由模式，依赖了一个关键的属性**window.history**

`window.history`是一个只读属性，用来获取 `History` 对象的引用。History 对象提供了操作浏览器会话历史（浏览器地址栏中访问的页面，以及当前页面中通过框架加载的页面）的接口，使用`window.history`我们可以实现以下与路由相关的重要能力：

1. 在 `history` 中跳转。
    
    使用`window.history.back()`、`window.history.forward()`和`window.history.go()`方法来完成在用户历史记录中向后和向前的跳转。
2. 添加和修改历史记录中的条目。

    HTML5 引入了`history.pushState()`和`history.replaceState()`方法，它们分别可以添加和修改历史记录条目。这两个 API 都会操作浏览器的历史栈，而不会引起页面的刷新。区别在于，`pushState()`会增加一条新的历史记录，而`replaceState()`则会替换当前的历史记录：

    ```js
    /**
     * parameters
     * @state {object} 状态对象 state 是一个 JavaScript 对象，一般是JSON格式的对象字面量
     * @title {string} 可以理解为 document.title，在这里是作为新页面传入参数的
     * @url {string} 该参数定义了增加或改变的历史 URL 记录，可以是相对路径或者绝对路径，url的具体格式可以自定
     */
    history.pushState(state, title, url); // 向浏览器历史栈中增加一条记录
    history.replaceState(state, title, url); // 替换历史栈中的当前记录
    ```
3. 监听 popstate 事件。

    当同一个页面在历史记录间切换时，就会产生`popstate`事件，`popstate`事件会被传递给`window`对象，所以页面路由切换通常会与`window.onpopstate`配合使用。

上面介绍的`history.pushState()`或者`history.replaceState()`调用不会触发`popstate`事件，`popstate`事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在 JavaScript 中调用`history.back()`、`history.forward()`、`history.go()`方法)。所以我们可以结合`popstate`事件、`pushState()`和`replaceState()`来完成完整的路由监听和修改能力。

如果当前处于激活状态的历史记录条目是由`history.pushState()`方法创建，或者由`history.replaceState()`方法修改过的, 则`popstate`事件对象的`state`属性包含了这个历史记录条目的`state`对象的一个拷贝。我们来看看示例：
```js
// 假如当前网页地址为http://example.com/example.html
window.onpopstate = function(event) {
  alert(
    "location: " + document.location + ", state: " + JSON.stringify(event.state)
  );
};
//绑定事件处理函数
//添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({ page: 1 }, "title 1", "?page=1");
//添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.pushState({ page: 2 }, "title 2", "?page=2");
//修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.replaceState({ page: 3 }, "title 3", "?page=3");

history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2); // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```

#### Hash 模式
History 模式需要依赖 HTML5 History API（IE10 以上），以及服务器的配置来支持，所以也有不少的开发者会使用 Hash 模式来管理 Web 应用的路由。而 Hash 模式主要依赖 `Location` 对象的 `hash` 属性（l`ocation.hash`）和`hashchange`事件，我们来分别看一下。
1. Location 对象。

    `window.location`用来获取 `Location` 对象的引用。`Location` 对象存储在 `Window` 对象的 `Location` 属性中，表示当前 Web 地址。Location 对象提供的属性如表 7-1：

    表 7-1 Location 属性

    Location 属性|	描述|	示例，`https://www.test.com/en-US/search?q=URL#search-results`
    ---|---|---
    `hash`|	设置或返回从井号(#)开始的 URL（锚）|	#search-results
    `host`	|设置或返回主机名和当前 URL 的端口号|	`www.test.com`
    `hostname`|	设置或返回当前 URL 的主机名	|`www.test.com`
    `href`	|设置或返回完整的 URL	|`https://www.test.com/en-US/search?q=URL#search-results`
    `pathname`|	设置或返回当前 URL 的路径部分	|`/en-US/search`
    `port`	|设置或返回当前 URL 的端口号	|默认 80 端口
    `protocol`|	设置或返回当前 URL 的协议	|`https:`
    `search`|	设置或返回从问号(?)开始的 URL（查询部分）	|`?q=URL`

    `location.hash`的设置和获取，并不会造成页面重新加载，利用这一点，我们可以记录页面关键信息的同时，提升页面体验。

2. hashchange 事件。

    当一个窗口的 `hash` 改变时就会触发`hashchange`事件。`hashchange`事件对象有两个属性，`newURL`为当前页面新的 URL，`oldURL`为当前页面旧的 URL。

    `Hash` 模式通过`window.onhashchange`监听基于 `hash` 的路由变化，来进行页面更新处理的。部分浏览器不支持`onhashchange`事件，我们可以自行使用定时器检测和触发的方式来进行兼容：
    ```js
    (function(window) {
    // 如果浏览器原生支持该事件,则退出
    if ("onhashchange" in window.document.body) {
        return;
    }
    var location = window.location,
        oldURL = location.href,
        oldHash = location.hash;
    // 每隔100ms检测一下location.hash是否发生变化
    setInterval(function() {
        var newURL = location.href,
        newHash = location.hash;
        // 如果hash发生了变化,且绑定了处理函数...
        if (newHash != oldHash && typeof window.onhashchange === "function") {
        // 执行事件触发
        window.onhashchange({
            type: "hashchange",
            oldURL: oldURL,
            newURL: newURL
        });
        oldURL = newURL;
        oldHash = newHash;
        }
    }, 100);
    })(window);
    ```