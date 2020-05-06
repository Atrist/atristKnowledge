# 浏览器环境，规格

JavaScript 语言最初是为 Web 浏览器创建的。此后，它已经发展成为一种具有多种用途和平台的语言。

平台可以是一个浏览器，一个 Web 服务器，或其他 **主机（host）**，甚至是咖啡机。它们每个都提供了特定于平台的功能。JavaScript 规范将其称为 **主机环境**。

主机环境提供了自己的对象和语言核心以外的函数。Web 浏览器提供了一种控制网页的方法。Node.JS 提供了服务器端功能，等等。

下面是 JavaScript 在浏览器中运行时的鸟瞰示意图：

![](https://zh.javascript.info/article/browser-environment/windowObjects.svg)

有一个叫做 `window` 的“根”对象。它有两个角色：

1. 首先，它是 JavaScript 代码的全局对象，如 全局对象 一章所述。
2. 其次，它代表“浏览器窗口”，并提供了控制它的方法。

例如，在这里我们将它用作全局对象：

```js
function sayHi() {
  alert("Hello");
}

// 全局函数是全局对象的方法：
window.sayHi();
```

在这里，我们将它用作浏览器窗口，以查看窗口高度：

```js
alert(window.innerHeight); // 内部窗口高度
```

还有更多窗口特定的方法和属性，我们稍后会介绍它们。

## 文档对象模型（DOM）

文档对象模型（Document Object Model），简称 DOM，将所有页面内容表示为可以修改的对象。

`document` 对象是页面的主要“入口点”。我们可以使用它来更改或创建页面上的任何内容。

例如：

```js
// 将背景颜色修改为红色
document.body.style.background = "red";

// 在 1 秒后将其修改回来
setTimeout(() => (document.body.style.background = ""), 1000);
```

在这里，我们使用了`document.body.style`，但还有很多很多其他的东西。规范中有属性和方法的详细描述：

- **DOM Living Standard**：https://dom.spec.whatwg.org

> :information_source:**DOM 不仅仅用于浏览器**

DOM 规范解释了文档的结构，并提供了操作文档的对象。有的非浏览器设备也使用 DOM。

例如，下载 HTML 文件并对其进行处理的服务器端脚本也可以使用 DOM。但他们可能仅支持部分规范中的内容。

> :information_source:用于样式的 CSSOM

CSS 规则和样式表的结构与 HTML 不同。有一个单独的规范 [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/)，它解释了如何将 CSS 表示为对象，以及如何读写它们。

当我们修改文档的样式规则时，CSSOM 与 DOM 是一起使用的。但实际上，很少需要 CSSOM，因为通常 CSS 规则是静态的。我们很少需要从 JavaScript 中添加/删除 CSS 规则，但你要知道这是可行的。

## 浏览器对象模型（BOM）

浏览器对象模型（Browser Object Model），简称 BOM，表示由浏览器（主机环境）提供的用于处理文档（document）之外的所有内容的其他对象。
例如

- [navigator](https://developer.mozilla.org/zh/docs/Web/API/Window/navigator) 对象提供了有关浏览器和操作系统的背景信息。navigator 有许多属性，但是最广为人知的两个属性是：navigator.userAgent — 关于当前浏览器，navigator.platform — 关于平台（可以帮助区分 Windows/Linux/Mac 等）。
- [location](https://developer.mozilla.org/zh/docs/Web/API/Window/navigator)对象允许我们读取当前 URL，并且可以将浏览器重定向到新的 URL。

这是我们可以如何使用 location 对象的方法：

```js
alert(location.href); // 显示当前 URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // 将浏览器重定向到另一个 URL
}
```

函数 `alert/confirm/prompt` 也是 BOM 的一部分：它们与文档（document）没有直接关系，但它代表了与用户通信的纯浏览器方法。

> 规范
> BOM 是通用 [HTML 规范](https://html.spec.whatwg.org/) 的一部分。

是的，你没听错。在 https://html.spec.whatwg.org 中的 HTML 规范不仅是关于“HTML 语言”（标签，特性）的，还涵盖了一堆对象、方法和浏览器特定的 DOM 扩展。这就是“广义的 HTML”。此外，某些部分也有其他的规范，它们被列在 https://spec.whatwg.org 中。

## 总结

说到标准，我们有：

**DOM 规范**
描述文档的结构、操作和事件，详见 https://dom.spec.whatwg.org。

**CSSOM 规范**
描述样式表和样式规则，对它们进行的操作，以及它们与文档的绑定，详见 https://www.w3.org/TR/cssom-1/。

**HTML 规范**
描述 HTML 语言（例如标签）以及 BOM（浏览器对象模型）— 各种浏览器函数：`setTimeout`，`alert`，`location`等，详见 https://html.spec.whatwg.org。它采用了 DOM 规范，并使用了许多其他属性和方法对其进行了扩展。

此外，某些类被分别描述在 https://spec.whatwg.org/。

请注意这些链接，因为要学的东西太多了，所以不可能涵盖并记住所有内容。

当你想要了解某个属性或方法时，Mozilla 手册 https://developer.mozilla.org/en-US/search 是一个很好的资源，但对应的规范可能会更好：它更复杂，且阅读起来需要更长的时间，但是会使你的基本知识更加全面，更加完整。

要查找某些内容时，你通常可以使用互联网搜索 “WHATWG [term]” 或 “MDN [term]”，例如 https://google.com?q=whatwg+localstorage，https://google.com?q=mdn+localstorage。

现在，我们开始学习 DOM，因为文档在 UI 中扮演着核心角色。

# DOM 树

HTML 文档的主干是标签（tag）。

根据文档对象模型（DOM），每个 HTML 标签都是一个对象。嵌套的标签是闭合标签的“子标签（children）”。标签内的文本也是一个对象。

所有这些对象都可以通过 JavaScript 来访问，我们可以使用它们来修改页面。

例如，`document.body` 是表示 `<body>` 标签的对象。

运行这段代码会使 `<body>` 保持 3 秒红色状态:

```js
document.body.style.background = "red"; // 将背景设置为红色

setTimeout(() => (document.body.style.background = ""), 3000); // 恢复回去
```

在这，我们使用了 `style.background`来修改 `document.body` 的背景颜色，但是还有很多其他的属性，例如：

- `innerHTML` — 节点的 HTML 内容。
- `offsetWidth` — 节点宽度（以像素度量）
- ……等。

很快，我们将学习更多操作 DOM 的方法，但首先我们需要了解 DOM 的结构。

## DOM 的例子

让我们从下面这个简单的文档（document）开始：

```js
<!DOCTYPE HTML>
<html>
<head>
  <title>About elk</title>
</head>
<body>
  The truth about elk.
</body>
</html>
```

DOM 将 HTML 表示为标签的树形结构。它看起来如下所示：

<svg width="690" height="320"><g transform="translate(20,30)"><path class="link" d="M7,0L7,30L40.333333333333336,30" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M7,0L7,180L40.333333333333336,180" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M7,0L7,210L40.333333333333336,210" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,210L40.333333333333336,240L73.66666666666667,240" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,30L40.333333333333336,60L73.66666666666667,60" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,30L40.333333333333336,90L73.66666666666667,90" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,30L40.333333333333336,150L73.66666666666667,150" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M73.66666666666667,90L73.66666666666667,120L107,120" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><g class="node" transform="translate(0,0)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HTML</text></g><g class="node" transform="translate(33.33333206176758,30)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HEAD</text></g><g class="node" transform="translate(33.33333206176758,180)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣</text></g><g class="node" transform="translate(33.33333206176758,210)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">BODY</text></g><g class="node" transform="translate(66.66666412353516,240)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text
The truth about elk.</text></g><g class="node" transform="translate(66.66666412353516,60)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣␣␣</text></g><g class="node" transform="translate(66.66666412353516,90)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">TITLE</text></g><g class="node" transform="translate(100,120)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text About elk</text></g><g class="node" transform="translate(66.66666412353516,150)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣</text></g></g></svg>

每个树的节点都是一个对象。

标签被称为 **元素节点**（或者仅仅是元素），并形成了树状结构：`<html>` 在根节点，`<head>` 和 `<body>` 是其子项，等。

元素内的文本形成 **文本节点**，被标记为 `＃text`。一个文本节点只包含一个字符串。它没有子项，并且总是树的叶子。

例如，`<title>` 标签里面有文本 `"About elk"`。

请注意文本节点中的特殊字符：

- 换行符：`↵`（在 JavaScript 中为 \n）
- 空格：`␣`

空格和换行符都是完全有效的字符，就像字母和数字。它们形成文本节点并成为 DOM 的一部分。所以，例如，在上面的示例中，`<head>` 标签中的 `<title>` 标签前面包含了一些空格，并且该文本变成了一个 `#text` 节点（它只包含一个换行符和一些空格）。

只有两个顶级排除项：

1. 由于历史原因，`<head>` 之前的空格和换行符均被忽略。
2. 如果我们在 `</body>` 之后放置一些东西，那么它会被自动移动到 `body` 内，并处于 `body` 中的最下方，因为 HTML 规范要求所有内容必须位于 `<body>` 内。所以 `</body>` 之后不能有空格。

在其他情况下，一切都很简单 — 如果文档中有空格（就像任何字符一样），那么它们将成为 DOM 中的文本节点，而如果我们删除它们，则不会有任何空格。

这是没有空格的文本节点：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About elk</title>
  </head>
  <body>
    The truth about elk.
  </body>
</html>
```

<svg width="690" height="210"><g transform="translate(20,30)"><path class="link" d="M7,0L7,30L40.333333333333336,30" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M7,0L7,120L40.333333333333336,120" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,30L40.333333333333336,60L73.66666666666667,60" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M73.66666666666667,60L73.66666666666667,90L107,90" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,120L40.333333333333336,150L73.66666666666667,150" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><g class="node" transform="translate(0,0)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HTML</text></g><g class="node" transform="translate(33.33333206176758,30)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HEAD</text></g><g class="node" transform="translate(66.66666412353516,60)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">TITLE</text></g><g class="node" transform="translate(100,90)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text About elk</text></g><g class="node" transform="translate(33.33333206176758,120)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">BODY</text></g><g class="node" transform="translate(66.66666412353516,150)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text The truth about elk.</text></g></g></svg>

> :information_source:字符串开头/结尾处的空格，以及只有空格的文本节点，通常会被工具隐藏

与 DOM 一起使用的浏览器工具（即将介绍）通常不会在文本的开始/结尾显示空格，并且在标签之间也不会显示空文本节点（换行符）。

开发者工具通过这种方式节省屏幕空间。

在本教程中，如果这些空格和空文本节点无关紧要时，我们在后面出现的关于 DOM 的示意图中会忽略它们。这样的空格通常不会影响文档的显示方式。

## 自动修正

如果浏览器遇到格式不正确的 HTML，它会在形成 DOM 时自动更正它。

例如，顶级标签总是 `<html>`。即使它不存在于文档中 — 它也会出现在 DOM 中，因为浏览器会创建它。对于 `<body>` 也是一样。

例如，如果一个 HTML 文件中只有一个单词 “Hello”，浏览器则会把它包装到 `<html>` 和 `<body>` 中，并且会添加所需的 `<head>`，DOM 将会变成下面这样：

<svg width="690" height="150"><g transform="translate(20,30)"><path class="link" d="M7,0L7,30L57,30" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M7,0L7,60L57,60" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,60L57,90L107,90" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><g class="node" transform="translate(0,0)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HTML</text></g><g class="node" transform="translate(50,30)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HEAD</text></g><g class="node" transform="translate(50,60)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">BODY</text></g><g class="node" transform="translate(100,90)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text Hello</text></g></g></svg>

在生成 DOM 时，浏览器会自动处理文档中的错误，关闭标签等。

一个没有关闭标签的文档：

```html
<p>
  Hello
  <li>Mom</li>
  <li>and</li>
  <li>Dad</li>
</p>
```

……将成为一个正常的 DOM，因为浏览器在读取标签时会填补缺失的部分：
<svg width="690" height="360"><g transform="translate(20,30)"><path class="link" d="M7,0L7,30L40.333333333333336,30" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M7,0L7,60L40.333333333333336,60" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,60L40.333333333333336,90L73.66666666666667,90" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,60L40.333333333333336,150L73.66666666666667,150" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,60L40.333333333333336,210L73.66666666666667,210" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M40.333333333333336,60L40.333333333333336,270L73.66666666666667,270" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M73.66666666666667,90L73.66666666666667,120L107,120" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M73.66666666666667,150L73.66666666666667,180L107,180" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M73.66666666666667,210L73.66666666666667,240L107,240" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M73.66666666666667,270L73.66666666666667,300L107,300" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><g class="node" transform="translate(0,0)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HTML</text></g><g class="node" transform="translate(33.33333206176758,30)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HEAD</text></g><g class="node" transform="translate(33.33333206176758,60)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">BODY</text></g><g class="node" transform="translate(66.66666412353516,90)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">P</text></g><g class="node" transform="translate(100,120)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text Hello</text></g><g class="node" transform="translate(66.66666412353516,150)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">LI</text></g><g class="node" transform="translate(100,180)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text Mom</text></g><g class="node" transform="translate(66.66666412353516,210)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">LI</text></g><g class="node" transform="translate(100,240)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text and</text></g><g class="node" transform="translate(66.66666412353516,270)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">LI</text></g><g class="node" transform="translate(100,300)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text Dad</text></g></g></svg>

> :warning:**表格永远有 `<tbody>`**

表格是一个有趣的“特殊的例子”。按照 DOM 规范，它们必须具有 `<tbody>`，但 HTML 文本却（官方的）忽略了它。然后浏览器在创建 DOM 时，自动地创建了 `<tbody>`。

对于 HTML：

```html
<table id="table">
  <tr>
    <td>1</td>
  </tr>
</table>
```

DOM 结构会变成：
<svg width="600" height="200"><g transform="translate(20,30)"><path class="link" d="M7,0L7,30L32,30" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M32,30L32,60L57,60" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,60L57,90L82,90" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M82,90L82,120L107,120" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><g class="node" transform="translate(0,0)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">TABLE</text></g><g class="node" transform="translate(25,30)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">TBODY</text></g><g class="node" transform="translate(50,60)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">TR</text></g><g class="node" transform="translate(75,90)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">TD</text></g><g class="node" transform="translate(100,120)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text 1</text></g></g></svg>

看到了吗？`<tbody>` 出现了。你应该记住这一点，以免在使用表格时，对这种情况感到惊讶

## 其他节点类型

除了元素和文本节点外，还有一些其他的节点类型。

例如，注释：

```html
<!DOCTYPE html>
<html>
  <body>
    The truth about elk.
    <ol>
      <li>An elk is a smart</li>
      <!-- comment -->
      <li>...and cunning animal!</li>
    </ol>
  </body>
</html>
```

<svg width="690" height="500"><g transform="translate(20,30)"><path class="link" d="M7,0L7,30L32,30" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M7,0L7,60L32,60" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M32,60L32,90L57,90" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M32,60L32,120L57,120" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M32,60L32,420L57,420" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,120L57,150L82,150" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,120L57,180L82,180" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,120L57,240L82,240" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,120L57,270L82,270" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,120L57,300L82,300" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,120L57,330L82,330" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M57,120L57,390L82,390" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M82,180L82,210L107,210" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><path class="link" d="M82,330L82,360L107,360" style="fill: none; stroke: rgb(190, 195, 199); stroke-width: 1px;"></path><g class="node" transform="translate(0,0)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HTML</text></g><g class="node" transform="translate(25,30)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">HEAD</text></g><g class="node" transform="translate(25,60)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">BODY</text></g><g class="node" transform="translate(50,90)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text
The truth about elk.
</text></g><g class="node" transform="translate(50,120)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">OL</text></g><g class="node" transform="translate(75,150)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣␣␣␣␣</text></g><g class="node" transform="translate(75,180)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">LI</text></g><g class="node" transform="translate(100,210)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text An elk is a smart</text></g><g class="node" transform="translate(75,240)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣␣␣␣␣</text></g><g class="node" transform="translate(75,270)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(207, 206, 149); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#comment comment</text></g><g class="node" transform="translate(75,300)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣␣␣␣␣</text></g><g class="node" transform="translate(75,330)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(206, 224, 244); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;">▾ </text><text dy="4.5" dx="16.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">LI</text></g><g class="node" transform="translate(100,360)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ...and cunning animal!</text></g><g class="node" transform="translate(75,390)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣␣␣</text></g><g class="node" transform="translate(50,420)" style="opacity: 1;"><rect y="-12.5" x="-5" rx="4" ry="4" height="25" width="250" style="fill: rgb(255, 222, 153); cursor: pointer;"></rect><text dy="4.5" dx="3.5" style="fill: black; pointer-events: none;"></text><text dy="4.5" dx="5.5" style="font: 14px Consolas, &quot;Lucida Console&quot;, Menlo, Monaco, monospace; fill: rgb(51, 51, 51); pointer-events: none;">#text ↵␣␣↵</text></g></g></svg>

在这里我们可以看到一个新的树节点类型 — comment node，被标记为 `#comment`，它在两个文本节点之间

我们可能会想 — 为什么要将注释添加到 DOM 中？它不会对视觉展现产生任何影响吗。但是有一条规则 — 如果一些内容存在于 HTML 中，那么它也必须在 DOM 树中

**HTML 中的所有内容，甚至注释，都会成为 DOM 的一部分。**

甚至 HTML 开头的 `<!DOCTYPE...>` 指令也是一个 DOM 节点。它在 DOM 树中位于 `<html>` 之前。我们不会触及那个节点，出于这个原因，我们甚至不会在图表中绘制它，但它确实就在那里。

表示整个文档的 `document` 对象，在形式上也是一个 DOM 节点。

一共有 [12 种节点类型](https://dom.spec.whatwg.org/#node)。实际上，我们通常用到的是其中的 4 种：

1. `document` — DOM 的“入口点”。
2. 元素节点 — HTML 标签，树构建块。
3. 文本节点 — 包含文本。
4. 注释 — 有时我们可以将一些信息放入其中，它不会显示，但 JS 可以从 DOM 中读取它。

## 自己看看

要在实际中查看 DOM 结构，请尝试 [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/)。只需输入文档，它将立即显示为 DOM。

探索 DOM 的另一种方式是使用浏览器开发工具。实际上，这就是我们在开发中所使用的。

你可以打开这个网页 [elks.html](https://zh.javascript.info/article/dom-nodes/elks.html)，然后打开浏览器开发工具，并切换到元素（Elements）选项卡。

请注意，开发者工具中的 DOM 结构是经过简化的。文本节点仅以文本形式显示。并且根本没有“空白”（只有空格）的文本节点。这其实挺好，因为大多数情况下，我们只关心元素节点。

点击左上角的按钮可以让我们使用鼠标（或其他指针设备）从网页中选择一个节点并“检查（inspect）”它（在元素选项卡中滚动到该节点）。当我们有一个巨大的 HTML 页面（和相应的巨大 DOM），并希望查看其中的一个特定元素的位置时，这很有用。

另一种方法是在网页上右键单击，然后在上下文菜单中选择“检查（Inspect）”。

![](https://zh.javascript.info/article/dom-nodes/inspect.svg)

在工具的右侧部分有以下子选项卡：

- **Styles** — 我们可以看到按规则应用于当前元素的 CSS 规则，包括内置规则（灰色）。几乎所有内容都可以就地编辑，包括下面的方框的 dimension/margin/padding。
- **Computed** — 按属性查看应用于元素的 CSS：对于每个属性，我们可以都可以看到赋予它的规则（包括 CSS 继承等）。
- **Event Listeners** — 查看附加到 DOM 元素的事件侦听器（我们将在本教程的下一部分介绍它们）。
- ……等。

学习它们的最佳方式就是多点一点看一下。大多数值都是可以就地编辑的。

## 与控制台交互

在我们处理 DOM 时，我们可能还希望对其应用 JavaScript。例如：获取一个节点并运行一些代码来修改它，以查看结果。以下是在元素（Elements）选项卡和控制台（Console）之间切换的一些技巧。

首先：

- 在元素（Elements）选项卡中选择第一个 `<li>`。
- 按下 `Esc` — 它将在元素（Elements）选项卡下方打开控制台（Console）。

现在最后选中的元素可以通过 `$0` 来进行操作，先前选择的是 `$1`，等。

我们可以对它们执行一些命令。例如，`$0.style.background = 'red'` 使选定的列表项（list item）变成红色，像这样：

![](https://zh.javascript.info/article/dom-nodes/domconsole0.svg)

这就是在控制台（Console）中获取元素（Elements）选项卡中的节点的方法。

还有一种方式。如果存在引用 DOM 节点的变量，那么我们可以在控制台（Console）中使用命令 `inspect(node)`，来在元素（Elements）选项卡中查看它。

或者我们可以直接在控制台（Console）中输出 DOM 节点，并“就地”探索它，例如下面的 `document.body`：

![](https://zh.javascript.info/article/dom-nodes/domconsole1.svg)

当然，这是出于调试目的。从下一章开始，我们将使用 JavaScript 访问和修改 DOM。

浏览器开发者工具对于开发有很大的帮助：我们可以探索 DOM，尝试一些东西，并找出问题所在。

## 总结

HTML/XML 文档在浏览器内均被表示为 DOM 树。

- 标签（tag）成为元素节点，并形成文档结构。
- 文本（text）成为文本节点。
- ……等，HTML 中的所有东西在 DOM 中都有它的位置，甚至对注释也是如此。

我们可以使用开发者工具来检查（inspect）DOM 并手动修改它。

在这里，我们介绍了基础知识，入门最常用和最重要的行为。在 https://developers.google.cn/web/tools/chrome-devtools 上有关于 Chrome 开发者工具的详细文档说明。学习这些工具的最佳方式就是到处点一点看一看，阅读菜单：大多数选项都很明显。而后，当你大致了解它们后，请阅读文档并学习其余内容。

DOM 节点具有允许我们在它们之间移动，修改它们，在页面中移动等的属性和方法。在下一章中，我们将介绍它们。

# 遍历 DOM

DOM 让我们可以对元素和它们中的内容做任何事，但是首先我们需要获取到对应的 DOM 对象。

对 DOM 的所有操作都是以 document 对象开始。它是 DOM 的主“入口点”。从它我们可以访问任何节点。

这里是一张描述对象间链接的图片，通过这些链接我们可以在 DOM 节点之间移动。

![](https://zh.javascript.info/article/dom-navigation/dom-links.svg)

让我们更详细地讨论它们吧。

## 在最顶层：documentElement 和 body

最顶层的树节点可以直接作为 `document` 的属性来使用：
**`<html> = document.documentElement`**

最顶层的 `document` 节点是 `document.documentElement`。这是对应 `<html>` 标签的 DOM 节点。

**`<body> = document.body`**
另一个被广泛使用的 DOM 节点是 `<body>` 元素 — `document.body`。

**`<head> = document.head`**
`<head>` 标签可以通过 `document.head` 访问。

> :warning:**这里有个问题：document.body 的值可能是 null**

脚本无法访问在运行时不存在的元素。

尤其是，如果一个脚本是在 `<head>` 中，那么脚本是访问不到 document.body 元素的，因为浏览器还没有读到它

所以，下面例子中的第一个 alert 显示 null：

```js
<html>

<head>
  <script>
    alert( "From HEAD: " + document.body ); // null，这里目前还没有 <body>
  </script>
</head>

<body>

  <script>
    alert( "From BODY: " + document.body ); // HTMLBodyElement，现在存在了
  </script>

</body>
</html>
```

> :information_source:**在 DOM 的世界中，null 就意味着“不存在”**

在 DOM 中，`null` 值就意味着“不存在”或者“没有这个节点”。

## 子节点：childNodes，firstChild，lastChild

从现在开始，我们将使用下面这两个术语：

- **子节点（或者叫作子**） — 对应的是直系的子元素。换句话说，它们被完全嵌套在给定的元素中。例如，`<head>` 和 `<body>` 就是 `<html>` 元素的子元素。
- **子孙元素** — 嵌套在给定元素中的所有元素，包括子元素，以及子元素的子元素等。

例如，这里 `<body>` 有子元素`<div>` 和 `<ul>`（以及一些空白的文本节点）：

```html
<html>
  <body>
    <div>Begin</div>

    <ul>
      <li>
        <b>Information</b>
      </li>
    </ul>
  </body>
</html>
```

……`<body`> 元素的子孙元素不仅包含直接的子元素 `<div>` 和 `<ul>`，还包含像 `<li>`（`<ul>` 的子元素）和 `<b>`（`<li>` 的子元素）这样的元素 — 整个子树。

**`childNodes` 集合列出了所有子节点，包括文本节点。**

下面这个例子显示了 `document.body` 的子元素：

```html
<html>
  <body>
    <div>Begin</div>

    <ul>
      <li>Information</li>
    </ul>

    <div>End</div>

    <script>
      for (let i = 0; i < document.body.childNodes.length; i++) {
        alert(document.body.childNodes[i]); // Text, DIV, Text, UL, ..., SCRIPT
      }
    </script>
    ...more stuff...
  </body>
</html>
```

请注意这里的一个有趣的细节。如果我们运行上面这个例子，所显示的最后一个元素是 `<script>`。实际上，文档下面还有很多东西，但是在这个脚本运行的时候，浏览器还没有读到下面的内容，所以这个脚本也就看不到它们。

**`firstChild` 和 `lastChild` 属性是访问第一个和最后一个子元素的快捷方式。**

它们只是简写。如果元素存在子节点，那么下面的脚本运行结果将是 true：

```js
elem.childNodes[0] === elem.firstChild;
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;
```

这里还有一个特别的函数 `elem.hasChildNodes()` 用于检查节点是否有子节点。

## DOM 集合

正如我们看到的那样，`childNodes` 看起来就像一个数组。但实际上它并不是一个数组，而是一个 集合 — 一个类数组的可迭代对象。

这个性质会导致两个重要的结果：

1. 我们可以使用 `for..of` 来迭代它：
   ```js
   for (let node of document.body.childNodes) {
     alert(node); // 显示集合中的所有节点
   }
   ```
   这是因为集合是可迭代的（提供了所需要的 `Symbol.iterator` 属性）。
2. 无法使用数组的方法，因为它不是一个数组：
   ```js
   alert(document.body.childNodes.filter); // undefined（这里没有 filter 方法！）
   ```
   集合的性质所得到的第一个结果很不错。第二个结果也还可以忍受，因为如果我们想要使用数组的方法的话，我们可以使用`Array.from` 方法来从集合创建一个“真”数组：
   ```js
   alert(Array.from(document.body.childNodes).filter); // function
   ```

> :warning:**DOM 集合是只读的**

DOM 集合，甚至可以说本章中列出的 **所有** 导航（navigation）属性都是只读的。

我们不能通过类似 `childNodes[i] = ...`的操作来替换一个子节点。

修改子节点需要使用其它方法。我们将会在下一章中看到它们。

> :warning:**DOM 集合是实时的**

除小部分例外，几乎所有的 DOM 集合都是 **实时** 的。换句话说，它们反映了 DOM 的当前状态。

如果我们保留一个对 `elem.childNodes` 的引用，然后向 DOM 中添加/移除节点，那么这些节点的更新会自动出现在集合中。

> :warning:**不要使用 for..in 来遍历集合**

可以使用 `for..of` 对集合进行迭代。但有时候人们会尝试使用 `for..in` 来迭代集合。

请不要这么做。`for..in` 循环遍历的是所有可枚举的（enumerable）属性。集合还有一些“额外的”很少被用到的属性，通常这些属性也是我们不期望得到的：

```html
<body>
  <script>
    // 显示 0，1，length，item，values 及其他。
    for (let prop in document.body.childNodes) alert(prop);
  </script>
</body>
```

## 兄弟节点和父节点

兄弟节点（Sibling） 是指有同一个父节点的节点。

例如，`<head>` 和 `<body>` 就是兄弟节点：

```html
<html>
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

- `<body>` 可以说是 `<head>` 的“下一个”或者“右边”兄弟节点。
- `<head>` 可以说是 `<body>` 的“前一个”或者“左边”兄弟节点。

下一个兄弟节点在 `nextSibling` 属性中，上一个是在 `previousSibling` 属性中。

可以通过 `parentNode` 来访问父节点。

例如：

```js
// <body> 的父节点是 <html>
alert(document.body.parentNode === document.documentElement); // true

// <head> 的后一个是 <body>
alert(document.head.nextSibling); // HTMLBodyElement

// <body> 的前一个是 <head>
alert(document.body.previousSibling); // HTMLHeadElement
```

## 纯元素导航

上面列出的导航（navigation）属性引用 **所有** 节点。例如，在 `childNodes` 中我们可以看到文本节点，元素节点，甚至如果注释节点存在的话，也能访问到。

但是对于很多任务来说，我们并不想要文本节点或注释节点。我们希望操纵的是代表标签的和形成页面结构的元素节点。

所以，让我们看看更多只考虑 **元素节点** 的导航链接（navigation link）：

![](https://zh.javascript.info/article/dom-navigation/dom-links-elements.svg)

这些链接和我们在上面提到过的类似，只是在词中间加了 `Element`：

- `children` — 仅那些作为元素节点的子代的节点。
- `firstElementChild，lastElementChild` — 第一个和最后一个子元素。
- `previousElementSibling，nextElementSibling` — 兄弟元素。
- `parentElement` — 父元素

> :information_source:为什么是 `parentElement`? 父节点可以不是一个元素吗？

`parentElement` 属性返回的是“元素类型”的父节点，而 `parentNode` 返回的是“任何类型”的父节点。这些属性通常来说是一样的：它们都是用于获取父节点。

唯一的例外就是 `document.documentElement`：

```js
alert(document.documentElement.parentNode); // document
alert(document.documentElement.parentElement); // null
```

因为根节点 document.documentElement（`<html>`）的父节点是 `document`。但 `document` 不是一个元素节点，所以 `parentNode` 返回了 `document`，但 `parentElement` 返回的是 null。

当我们想从任意节点 `elem`到 `<html>` 而不是到 `document` 时，这个细节可能很有用：

```js
while ((elem = elem.parentElement)) {
  // 向上，直到 <html>
  alert(elem);
}
```

让我们修改上面的一个示例：用 children 来替换 childNodes。现在它只显示元素：

```html
<html>
  <body>
    <div>Begin</div>

    <ul>
      <li>Information</li>
    </ul>

    <div>End</div>

    <script>
      for (let elem of document.body.children) {
        alert(elem); // DIV, UL, DIV, SCRIPT
      }
    </script>
    ...
  </body>
</html>
```

## 更多链接：表格

到现在，我们已经描述了基本的导航（navigation）属性。

方便起见，某些类型的 DOM 元素可能会提供特定于其类型的其他属性。

表格（Table）是一个很好的例子，它代表了一个特别重要的情况：

`<table>` 元素支持 (除了上面给出的，之外) 以下这些属性:

- `table.rows` — `<tr>` 元素的集合。
- `table.caption/tHead/tFoot` — 引用元素 `<caption>`，`<thead>`，`<tfoot>`。
- `table.tBodies` — `<tbody>` 元素的集合（根据标准还有很多元素，但是这里至少会有一个 — 即使没有被写在 HTML 源文件中，浏览器也会将其放入 DOM 中）。

`<thead>`，`<tfoot>`，`<tbody>` 元素提供了 rows 属性：

- `tbody.rows` — 表格内部`<tr>` 元素的集合

`<tr>`：

- `tr.cells` — 在给定 `<tr>` 中的 `<td>` 和 `<th>` 单元格的集合。
- `tr.sectionRowIndex` — 给定的 `<tr>` 在封闭的 `<thead>/<tbody>/<tfoot>` 中的位置（索引）。
- `tr.rowIndex` — 在整个表格中 `<tr>` 的编号（包括表格的所有行）。

`<td>` 和 `<th>`：

- `td.cellIndex` — 在封闭的 `<tr>` 中单元格的编号。

用法示例：

```html
<table id="table">
  <tr>
    <td>one</td>
    <td>two</td>
  </tr>
  <tr>
    <td>three</td>
    <td>four</td>
  </tr>
</table>

<script>
  // 获取带有 "two" 的 td（第一行，第二列）
  let td = table.rows[0].cells[1];
  td.style.backgroundColor = "red"; // highlight it
</script>
```

规范：[tabular data](https://html.spec.whatwg.org/multipage/tables.html)。

## 总结

给定一个 DOM 节点，我们可以使用导航（navigation）属性访问其直接的邻居。

这些属性主要分为两组：

- 对于所有节点：`parentNode`，`childNodes`，`firstChild`，`lastChild`，`previousSibling`，`nextSibling`。
- 仅对于元素节点：`parentElement`，`children`，`firstElementChild`，`lastElementChild`，`previousElementSibling`，`nextElementSibling`。

某些类型的 DOM 元素，例如 table，提供了用于访问其内容的其他属性和集合。

# 搜索：getElement*，querySelector*

当元素彼此靠得近时，DOM 导航属性（navigation property）非常有用。如果不是，那该怎么办？如何去获取页面上的任意元素？

还有其他搜索方法。

## document.getElementById 或者只使用 id

如果一个元素有`id` 特性（attribute），那我们就可以使用 `document.getElementById(id)` 方法获取该元素，无论它在哪里。

例如：

```html
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // 获取该元素
  let elem = document.getElementById("elem");

  // 将该元素背景改为红色
  elem.style.background = "red";
</script>
```

此外，还有一个通过 `id` 命名的全局变量，它引用了元素：

```html
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // elem 是对带有 id="elem" 的 DOM 元素的引用
  elem.style.background = "red";

  // id="elem-content" 内有连字符，所以它不能成为一个变量
  // ...但是我们可以通过使用方括号 window['elem-content'] 来访问它
</script>
```

……除非我们声明一个具有相同名称的 JavaScript 变量，否则它具有优先权：

```html
<div id="elem"></div>

<script>
  let elem = 5; // 现在 elem 是 5，而不是对 <div id="elem"> 的引用

  alert(elem); // 5
</script>
```

> :warning:**请不要使用以 id 命名的全局变量来访问元素**

[在规范中](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem) 对此行为进行了描述，所以它是一种标准。但这是注意考虑到兼容性才支持的。

浏览器尝试通过混合 JavaScript 和 DOM 的命名空间来帮助我们。对于内联到 HTML 中的简单脚本来说，这还行，但是通常来说，这不是一件好事。因为这可能会造成命名冲突。另外，当人们阅读 JavaScript 代码且看不到对应的 HTML 时，变量的来源就会不明显。

在本教程中，我们只会在元素来源非常明显时，为了简洁起见，才会使用 `id` 直接引用对应的元素。

在实际开发中，`document.getElementById` 是首选方法。

> :information_source:**id 必须是唯一的**

`id` 必须是唯一的。在文档中，只能有一个元素带有给定的 `id`。

如果有多个元素都带有同一个 `id`，那么使用它的方法的行为是不可预测的，例如 `document.getElementById` 可能会随机返回其中一个元素。因此，请遵守规则，保持 `id` 的唯一性。

> :warning:**只有 document.getElementById，没有 anyElem.getElementById**

`getElementById` 方法只能被在 `document` 对象上调用。它会在整个文档中查找给定的 `id`


## querySelectorAll
到目前为止，最通用的方法是 `elem.querySelectorAll(css)`，它返回 `elem` 中与给定 `CSS 选择器`匹配的所有元素。

在这里，我们查找所有为最后一个子元素的 `<li> `元素：
```html
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```
这个方法确实功能强大，因为可以使用任何 CSS 选择器。
>:information_source:也可以使用伪类

CSS 选择器的伪类，例如 `:hover` 和 `:active` 也都是被支持的。例如，`document.querySelectorAll(':hover')` 将会返回鼠标指针现在已经结束的元素的集合（按嵌套顺序：从最外层 `<html>` 到嵌套最多的元素）。

## querySelector
`elem.querySelector(css)` 调用会返回给定 CSS 选择器的第一个元素。

换句话说，结果与 `elem.querySelectorAll(css)[0]` 相同，但是后者会查找 **所有** 元素，并从中选取一个，而 `elem.querySelector` 只会查找一个。因此它在速度上更快，并且写起来更短。

## matches
之前的方法是搜索 DOM。

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) 不会查找任何内容，它只会检查 `elem `是否与给定的 `CSS` 选择器匹配。它返回 `true` 或 `false`。

当我们遍历元素（例如数组或其他内容）并试图过滤那些我们感兴趣的元素时，这个方法会很有用。

例如：
```html
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // 不一定是 document.body.children，还可以是任何集合
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest
元素的祖先（ancestor）是：父级，父级的父级，它的父级等。祖先们一起组成了从元素到顶端的父级链。

`elem.closest(css)` 方法会查找与 CSS 选择器匹配的最近的祖先。elem 自己也会被搜索。

换句话说，方法` closest` 在元素中得到了提升，并检查每个父级。如果它与选择器匹配，则停止搜索并返回该祖先。

例如：
```html
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
</script>
```
## getElementsBy*
还有其他通过标签，类等查找节点的方法。

如今，它们大多已经成为了历史，因为 `querySelector `功能更强大，写起来更短。

因此，这里我们介绍它们只是为了完整起见，而你仍然可以在就脚本中找到这些方法。

- `elem.getElementsByTagName(tag)` 查找具有给定标签的元素，并返回它们的集合。tag 参数也可以是对于“任何标签”的星号 "*"。
- `elem.getElementsByClassName(className)` 返回具有给定CSS类的元素。
- `document.getElementsByName(name)` 返回在文档范围内具有给定 `name `特性的元素。很少使用。

例如：
```js
// 获取文档中的所有 div
let divs = document.getElementsByTagName('div');
```
让我们查找 `table` 中的所有 `input` 标签：
```html
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
  let inputs = table.getElementsByTagName('input');

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```
>:warning:**不要忘记字母 "s"！**

新手开发者有时会忘记字符 "s"。也就是说，他们会调用 `getElementByTagName` 而不是 `getElementsByTagName`。

`getElementById` 中没有字母 "s"，是因为它只返回单个元素。但是 `getElementsByTagName` 返回的是元素的集合，所以里面有 "s"。

>:warning:**它返回的是一个集合，不是一个元素！**

新手的另一个普遍的错误是写：
```js
// 行不通
document.getElementsByTagName('input').value = 5;
```

这是行不通的，因为它需要的是一个 `input` 的 集合，并将值赋（assign）给它，而不是赋值给其中的一个元素。

我们应该遍历集合或通过对应的索引来获取元素，然后赋值，如下所示：
```js
// 应该可以运行（如果有 input）
document.getElementsByTagName('input')[0].value = 5;
```
查找 `.article` 元素：
```html
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // 按 name 特性查找
  let form = document.getElementsByName('my-form')[0];

  // 在 form 中按 class 查找
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```
## 实时的集合
所有的 `"getElementsBy*"` 方法都会返回一个 **实时的（live）** 集合。这样的集合始终反映的是文档的当前状态，并且在文档发生更改时会“自动更新”。

在下面的例子中，有两个脚本。
1. 第一个创建了对 `<div>` 的集合的引用。截至目前，它的长度是 1。
2. 第二个脚本在浏览器再遇到一个 `<div>` 时运行，所以它的长度是 2。

```html
<div>First div</div>
<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 2
</script>
```
相反，`querySelectorAll` 返回的是一个 **静态的** 集合。就像元素的固定数组。

如果我们使用它，那么两个脚本都会输出 `1`：
```html
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 1
</script>
```
现在我们可以很容易地看到不同之处。在文档中出现新的 `div` 后，静态集合并没有增加。

## 总结
有 6 种主要的方法，可以在 DOM 中搜素节点：
Method	|Searches by...	|Can call on an element?	|Live?
--|--|--|--
querySelector	|CSS-selector	|✔	|-
querySelectorAll	|CSS-selector	|✔	|-
getElementById	|id	|-	|-
getElementsByName	|name	|-	|✔
getElementsByTagName	|tag or '*'	|✔	|✔
getElementsByClassName	|class	|✔	|✔

目前为止，最常用的是 `querySelector` 和 `querySelectorAll`，但是 `getElementBy*` 可能会偶尔有用，或者可以在就脚本中找到。

此外：

- `elem.matches(css)` 用于检查 elem 与给定的 CSS 选择器是否匹配。
- `elem.closest(css)` 用于查找与给定 CSS 选择器相匹配的最近的祖先。`elem` 本身也会被检查。

让我们在这里提一下另一种用来检查子级与父级之间关系的方法，因为它有时很有用：
- 如果 `elemB` 在 `elemA` 内（`elemA` 的后代）或者 `elemA==elemB`，`elemA.contains(elemB)` 将返回 true。

# 特性和属性（Attributes and properties）
当浏览器加载页面时，它会“读取”（或者称之为：“解析”）HTML 并从中生成 DOM 对象。对于元素节点，大多数标准的 HTML 特性（attributes）会自动变成 DOM 对象的属性（properties）。（译注：attribute 和 property 两词意思相近，为作区分，全文将 attribute 译为“特性”，property 译为“属性”，请读者注意区分。）

例如，如果标签是 `<body id="page">`，那么 DOM 对象就会有 `body.id="page"`。

但特性—属性映射并不是一一对应的！在本章，我们将带领你一起分清楚这两个概念，了解如何使用它们，了解它们何时相同何时不同。

## DOM 属性
我们已经见过了内建 DOM 属性。它们数量庞大。但是从技术上讲，没有人会限制我们，如果我们觉得这些 DOM 还不够，我们可以添加我们自己的。

DOM 节点是常规的 JavaScript 对象。我们可以 alert 它们。

例如，让我们在 `document.body` 中创建一个新的属性：
```js
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```
我们也可以像下面这样添加一个方法：
```js
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY（这个方法中的 "this" 的值是 document.body）
```
我们还可以修改内建属性的原型，例如修改 `Element.prototype` 为所有元素添加一个新方法：
```js
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```