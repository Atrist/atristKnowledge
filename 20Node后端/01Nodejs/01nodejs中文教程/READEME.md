## 资料地址

http://nodejs.cn/learn/introduction-to-nodejs

## nodejs 简介

Node.js 是一个开源与跨平台的 JavaScript 运行时环境。 它是一个可用于几乎任何项目的流行工具！

Node.js 在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核）。 这使 Node.js 表现得非常出色。

Node.js 应用程序运行于单个进程中，无需为每个请求创建新的线程。 Node.js 在其标准库中提供了一组异步的 I/O 原生功能（用以防止 JavaScript 代码被阻塞），并且 Node.js 中的库通常是使用非阻塞的范式编写的（从而使阻塞行为成为例外而不是规范）。

当 Node.js 执行 I/O 操作时（例如从网络读取、访问数据库或文件系统），Node.js 会在响应返回时恢复操作，而不是阻塞线程并浪费 CPU 循环等待。

这使 Node.js 可以在一台服务器上处理数千个并发连接，而无需引入管理线程并发的负担（这可能是重大 bug 的来源）。

Node.js 具有独特的优势，因为为浏览器编写 JavaScript 的数百万前端开发者现在除了客户端代码之外还可以编写服务器端代码，而无需学习完全不同的语言。

在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为不必等待所有用户更新其浏览器，你可以通过更改 Node.js 版本来决定要使用的 ECMAScript 版本，并且还可以通过运行带有标志的 Node.js 来启用特定的实验中的特性。

## 大量的库

npm 的简单结构有助于 Node.js 生态系统的激增，现在 npm 仓库托管了超过 1,000,000 个可以自由使用的开源库包。

## Node.js 应用程序的示例

Node.js 最常见的 Hello World 示例是 Web 服务器：

```js
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('你好世界\n')
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})
```

此代码首先引入了 Node.js [http 模块](http://nodejs.cn/api/http.html)。

Node.js 具有出色的[标准库](http://nodejs.cn/api/)，包括对网络的一流支持。

`http` 的 `createServer()` 方法会创建新的 HTTP 服务器并返回它。

服务器被设置为监听指定的端口和主机名。 当服务器就绪后，回调函数会被调用，在此示例中会通知我们服务器正在运行

每当接收到新的请求时，[request 事件](http://nodejs.cn/api/http.html#http_event_request)会被调用，并提供两个对象：[一个请求（http.IncomingMessage 对象）](http://nodejs.cn/api/http.html#http_class_http_incomingmessage)和一个响应（[http.ServerResponse 对象](http://nodejs.cn/api/http.html#http_class_http_serverresponse)）。

这两个对象对于处理 HTTP 调用至关重要。

第一个对象提供了请求的详细信息。 在这个简单的示例中没有使用它，但是你可以访问请求头和请求数据。

第二个对象用于返回数据给调用方。

在此示例中：

```js
res.statusCode = 200
```

设置 statusCode 属性为 200，以表明响应成功。

设置 Content-Type 响应头：

```js
res.setHeader('Content-Type', 'text/plain')
```

关闭响应，添加内容作为 `end()` 的参数：

```js
res.end('你好世界\n')
```

## Node.js 框架和工具

Node.js 是一个底层的平台。 为了使开发者做事变得容易又来劲，社区在 Node.js 上构建了数千个库。

久而久之，其中许多已成为受欢迎的选择。 以下是一些值得学习的清单：

- [AdonisJs](https://adonisjs.com/): 一个全栈框架，高度专注于开发者的效率、稳定和信任。 Adonis 是最快的 Node.js Web 框架之一。
- [Express](https://expressjs.com/): 提供了创建 Web 服务器的最简单但功能最强大的方法之一。 它的极简主义方法，专注于服务器的核心功能，是其成功的关键。
- [Fastify](https://fastify.io/): 一个 Web 框架，高度专注于提供最佳的开发者体验（以最少的开销和强大的插件架构）。 Fastify 是最快的 Node.js Web 框架之一。
- [hapi](https://hapijs.com/): 一个富框架，用于构建应用程序和服务，使开发者可以专注于编写可重用的应用程序逻辑，而不必花费时间来搭建基础架构。
- [koa](http://koajs.com/): 由 Express 背后的同一个团队构建，旨在变得更简单更轻巧。 新项目的诞生是为了满足创建不兼容的更改而又不破坏现有社区。
- [Loopback.io](https://loopback.io/): 使构建需要复杂集成的现代应用程序变得容易。
- [Meteor](https://meteor.com/): 一个强大的全栈框架，以同构的方式使用 JavaScript 构建应用（在客户端和服务器上共享代码）。 曾经是提供所有功能的现成工具，现在可以与前端库 React，Vue 和 Angular 集成。 也可以用于创建移动应用。
- [Micro](https://github.com/zeit/micro): 提供了一个非常轻量级的服务器，用于创建异步的 HTTP 微服务。
- [NestJS](https://nestjs.com/): 一个基于 TypeScript 的渐进式 Node.js 框架，用于构建企业级的高效、可靠和可扩展的服务器端应用程序。
- [Next.js](https://nextjs.org/): 用于渲染服务器端渲染的 React 应用程序的框架。
- [Nx](https://nx.dev/): 使用 NestJS、Express、React、Angular 等进行全栈开发的工具包！ Nx 有助于将开发工作从一个团队（构建一个应用程序）扩展到多个团队（在多个应用程序上进行协作）！
- [Socket.io](https://socket.io/): 一个实时通信引擎，用于构建网络应用程序。

## Node.js 简史

Node.js 诞生只有十年。

相比之下，JavaScript 已存在 [24 年](https://en.wikipedia.org/wiki/JavaScript#Beginnings_at_Netscape)，而 Web 则是 [30 年](https://howoldistheinter.net/)。

十年在技术领域并不是很长的时间，但是 Node.js 似乎已存在很久。

在这篇文章中，我们绘制了 Node.js 的历史概况。

## 一点历史

JavaScript 是一门被创建于 Netscape（作为用于在其浏览器 [Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator) 中操纵网页的脚本工具）中的编程语言。

Netscape 的商业模式的其中一部分是出售 Web 服务器，其中包括一个被称为 Netscape LiveWire 的环境，该环境可以使用服务器端 JavaScript 创建动态页面。 不幸的是，Netscape LiveWire 并不十分成功，并且服务器端 JavaScript 也没有普及，直到引入了 Node.js。

引领 Node.js 兴起的一个关键因素是时机。 仅仅几年前，多亏 "Web 2.0" 应用程序（例如 Flickr、Gmail 等）向世界展示了 Web 上的现代体验，JavaScript 开始被视为一种更为严肃的语言。

随着许多浏览器竞相为用户提供最佳的性能，JavaScript 引擎也变得更好。 主流浏览器背后的开发团队都在努力为 JavaScript 提供更好的支持，并找出使 JavaScript 运行更快的方法。 多亏这场竞争，Node.js 使用的 V8 引擎（也称为 Chrome V8，是 Chromium 项目开源的 JavaScript 引擎）获得了显着的改进。

Node.js 恰巧构建于正确的地点和时间，但是运气并不是其今天流行的唯一原因。 它为 JavaScript 服务器端开发引入了许多创新思维和方法，这已经对许多开发者带来了帮助。

## 2009

- Node.js 诞生
- 创建了 [npm](https://www.npmjs.com/) 的第一版

## 2010

- [Express](https://expressjs.com/) 诞生
- [Socket.io](https://socket.io/) 诞生

## 2011

- npm 发布 1.0 版本
- 大公司（LinkedIn、Uber 等）开始采用 Node.js
- [hapi](https://hapijs.com/) 诞生

## 2012
- 普及非常迅速
## 2013
- 第一个使用 Node.js 的大型博客平台：[Ghost](https://ghost.org/)
- [Koa](https://koajs.com/) 诞生

## 2014
- 大分支：[io.js](https://iojs.org/) 是 Node.js 的一个重要分支，目的是引入 ES6 的支持并加快推进速度

## 2015
- [Node.js 基金会](https://foundation.nodejs.org/)诞生
- IO.js 被合并回 Node.js
- npm 引入了私有模块
- Node.js 4（版本 1、2 和 3 之前从未发布）

## 2016
- [leftpad 事件](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)
- [Yarn](https://yarnpkg.com/en/) 诞生
- Node.js 6

## 2017
- npm 更加注重安全性
- Node.js 8
- HTTP/2
- V8 在其测试套件中引入了 Node.js，除了 Chrome 之外，Node.js 正式成为 JS 引擎的目标
- 每周 30 亿次 npm 下载

## 2018
- Node.js 10
- 实验支持 [ES 模块](http://nodejs.cn/api/esm.html) .mjs

## 如何安装 Node.js
Node.js 可以通过多种方式进行安装。 这篇文章重点介绍了最常见、最方便的几种。

用于所有主流平台的官方软件包，可访问 http://nodejs.cn/download/。

安装 Node.js 的其中一种非常便捷的方式是通过软件包管理器。 对于这种情况，每种操作系统都有其自身的软件包管理器。

在 macOS 上，[Homebrew](https://brew.sh/) 是业界的标准，在安装之后可以非常轻松地安装 Node.js（通过在 CLI 中运行以下命令）：
```bash
brew install node
```
其他适用于 Linux 和 Windows 的软件包管理器列出在 https://nodejs.org/en/download/package-manager/。

`nvm` 是一种流行的运行 Node.js 的方式。 例如，它可以轻松地切换 Node.js 版本，也可以安装新版本用以尝试并且当出现问题时轻松地回滚。

这对于使用旧版本的 Node.js 来测试代码非常有用。

详见 https://github.com/creationix/nvm。

建议，如果刚入门并且还没有用过 Homebrew，则使用官方的安装程序，否则，Homebrew 是更好的解决方案。

无论如何，当安装 Node.js 之后，就可以在命令行中访问 node 可执行程序。

## 使用 Node.js 需要了解多少 JavaScript
作为初学者，很难达到对编程能力有足够自信的地步。

在学习编码的同时，可能还会对 JavaScript 和 Node.js 的边界感到困惑。

建议在深入研究 Node.js 之前，对 JavaScript 的主要概念有所了解：
- 词汇结构
- 表达式
- 数据类型
- 变量
- 函数
- this
- 箭头函数
- 循环
- 作用域
- 数组
- 模板字面量
- 分号
- 严格模式
- ECMAScript 6、2016、2017

具备这些概念，无论是在浏览器还是在 Node.js 中，都会成为一名熟练的 JavaScript 开发者。

以下概念也是理解异步编程的关键，异步编程是 Node.js 的基本组成部分
- 异步编程与回调
- 定时器
- Promise
- Async 与 Await
- 闭包
- 事件循环

## Node.js 与浏览器的区别
浏览器和 Node.js 均使用 JavaScript 作为其编程语言。

构建运行于浏览器中的应用程序与构建 Node.js 应用程序完全不同。

尽管都是 JavaScript，但一些关键的差异使体验相当不同。

从广泛使用 JavaScript 的前端开发者的角度来看，Node.js 应用程序具有巨大的优势：使用单一语言轻松编程所有一切（前端和后端）。

你会拥有巨大的机会，因为全面、深入地学习一门编程语言并通过使用同一语言完成 web（无论是在客户端还是在服务器）上的所有工作是非常困难的，你会处于独特的优势地位。

不同的还有生态系统。

在浏览器中，大多数时候做的是与 DOM 或其​​他 Web 平台 API（例如 Cookies）进行交互。 当然，那些在 Node.js 中是不存在的。 没有浏览器提供的 document、window、以及所有其他的对象。

而且在浏览器中，不存在 Node.js 通过其模块提供的所有不错的 API，例如文件系统访问功能。

另一个很大的不同是，在 Node.js 中，可以控制运行环境。 除非构建的是任何人都可以在任何地方部署的开源应用程序，否则你能知道会在哪个版本的 Node.js 上运行该应用程序。 与浏览器环境（你无法选择访客会使用的浏览器）相比起来，这非常方便。

这意味着可以编写 Node.js 版本支持的所有现代的 ES6-7-8-9 JavaScript。

由于 JavaScript 发展的速度非常快，但是浏览器发展得慢一些，并且用户的升级速度也慢一些，因此有时在 web 上，不得不使用较旧的 JavaScript / ECMAScript 版本。

可以使用 Babel 将代码转换为与 ES5 兼容的代码，再交付给浏览器，但是在 Node.js 中，则不需要这样做。

另一个区别是 Node.js 使用 CommonJS 模块系统，而在浏览器中，则还正在实现 ES 模块标准。

在实践中，这意味着在 Node.js 中使用 `require()`，而在浏览器中则使用 import。