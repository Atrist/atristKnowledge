<!-- TOC -->

- [1. 简介：回调](#1-%e7%ae%80%e4%bb%8b%e5%9b%9e%e8%b0%83)
  - [1.1. 在回调中回调](#11-%e5%9c%a8%e5%9b%9e%e8%b0%83%e4%b8%ad%e5%9b%9e%e8%b0%83)
  - [1.2. 处理 Error](#12-%e5%a4%84%e7%90%86-error)
  - [1.3. 厄运金字塔](#13-%e5%8e%84%e8%bf%90%e9%87%91%e5%ad%97%e5%a1%94)
- [2. Promise](#2-promise)
  - [2.1. 消费者：then，catch，finally](#21-%e6%b6%88%e8%b4%b9%e8%80%85thencatchfinally)
    - [2.1.1. then](#211-then)
    - [2.1.2. catch](#212-catch)
    - [2.1.3. finally](#213-finally)
  - [2.2. 示例：loadScript](#22-%e7%a4%ba%e4%be%8bloadscript)
- [3. Promise 链](#3-promise-%e9%93%be)
  - [3.1. 返回 promise](#31-%e8%bf%94%e5%9b%9e-promise)
  - [3.2. 示例：loadScript](#32-%e7%a4%ba%e4%be%8bloadscript)
  - [3.3. 更复杂的示例：fetch](#33-%e6%9b%b4%e5%a4%8d%e6%9d%82%e7%9a%84%e7%a4%ba%e4%be%8bfetch)
  - [3.4. 总结](#34-%e6%80%bb%e7%bb%93)
- [4. 使用 promise 进行错误处理](#4-%e4%bd%bf%e7%94%a8-promise-%e8%bf%9b%e8%a1%8c%e9%94%99%e8%af%af%e5%a4%84%e7%90%86)
  - [4.1. 隐式 try…catch](#41-%e9%9a%90%e5%bc%8f-trycatch)
  - [4.2. 再次抛出（Rethrowing）](#42-%e5%86%8d%e6%ac%a1%e6%8a%9b%e5%87%barethrowing)
  - [4.3. 未处理的 rejection](#43-%e6%9c%aa%e5%a4%84%e7%90%86%e7%9a%84-rejection)
  - [4.4. 总结](#44-%e6%80%bb%e7%bb%93)
  - [4.5. 补充内容](#45-%e8%a1%a5%e5%85%85%e5%86%85%e5%ae%b9)
    - [4.5.1. Fetch 错误处理示例](#451-fetch-%e9%94%99%e8%af%af%e5%a4%84%e7%90%86%e7%a4%ba%e4%be%8b)
    - [4.5.2. 其他](#452-%e5%85%b6%e4%bb%96)
- [5. Promise API](#5-promise-api)
  - [5.1. Promise.all](#51-promiseall)
  - [5.2. Promise.allSettled](#52-promiseallsettled)
    - [5.2.1. Polyfill](#521-polyfill)
  - [5.3. Promise.race](#53-promiserace)
  - [5.4. Promise.resolve/reject](#54-promiseresolvereject)
    - [5.4.1. Promise.resolve](#541-promiseresolve)
    - [5.4.2. Promise.reject](#542-promisereject)
  - [5.5. 总结](#55-%e6%80%bb%e7%bb%93)
- [6. Promisification](#6-promisification)
- [7. 微任务（Microtask）](#7-%e5%be%ae%e4%bb%bb%e5%8a%a1microtask)
  - [7.1. 微任务队列（Microtask queue）](#71-%e5%be%ae%e4%bb%bb%e5%8a%a1%e9%98%9f%e5%88%97microtask-queue)
  - [7.2. 未处理的 rejection](#72-%e6%9c%aa%e5%a4%84%e7%90%86%e7%9a%84-rejection)
  - [7.3. 总结](#73-%e6%80%bb%e7%bb%93)
- [8. Async/await](#8-asyncawait)
  - [8.1. Async function](#81-async-function)
  - [8.2. Await](#82-await)
  - [8.3. Error 处理](#83-error-%e5%a4%84%e7%90%86)
  - [8.4. 总结](#84-%e6%80%bb%e7%bb%93)

<!-- /TOC -->

# 1. 简介：回调

> :warning:我们在这里的示例中使用了浏览器方法

为了演示回调、promise 和其他抽象概念的使用，我们将使用一些浏览器方法：具体地说，是加载脚本和执行简单的文档操作的方法。

如果你不熟悉这些方法，并且对它们在这些示例中的用法感到疑惑，那么你可能需要阅读本教程 下一部分 中的几章。

但是，我们会尽全力使讲解变得更加清晰。在这儿不会有浏览器方面的真正复杂的东西。

JavaScipt 主机（host）环境提供了许多函数，这些函数允许我们计划 **异步** 行为（action）。换句话说，我们现在开始执行的行为，但它们会在稍后完成。

例如，`setTimeout` 函数就是一个这样的函数。

这儿有一些实际中的异步行为的示例，例如加载脚本和模块（我们将在后面的章节中介绍）。

让我们看一下函数 `loadScript(src)`，该函数使用给定的 src 加载脚本：

```js
function loadScript(src) {
  // 创建一个 <script> 标签，并将其附加到页面
  // 这将使得具有给定 src 的脚本开始加载，并在加载完成后运行
  let script = document.createElement("script");
  script.src = src;
  document.head.append(script);
}
```

它将带有给定 src 的新动态创建的标签 `<script src="…">` 附加到文档中。浏览器将自动开始加载它，并在加载完成后执行。

我们可以像这样使用这个函数：

```js
// 在给定路径下加载并执行脚本
loadScript("/my/script.js");
```

脚本是“异步”调用的，因为它从现在开始加载，但是在这个加载函数执行完成后才运行。

如果在 `loadScript(…)` 下面有任何其他代码，它们不会等到脚本加载完成才执行。

```js
loadScript("/my/script.js");
// loadScript 下面的代码
// 不会等到脚本加载完成才执行
// ...
```

假设我们需要在新脚本加载后立即使用它。它声明了新函数，我们想运行它们。

但如果我们在 loadScript(…) 调用后立即执行此操作，这将不会有效。

```js
loadScript("/my/script.js"); // 这个脚本有 "function newFunction() {…}"

newFunction(); // 没有这个函数！
```

自然情况下，浏览器可能没有时间加载脚本。到目前为止，loadScript 函数并没有提供跟踪加载完成的方法。脚本加载并最终运行，仅此而已。但我们希望了解脚本何时加载完成，以使用其中的新函数和变量。

让我们添加一个 callback 函数作为 loadScript 的第二个参数，该函数应在脚本加载完成时执行：

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```

现在，如果我们想调用该脚本中的新函数，我们应该将其写在回调函数中：

```js
loadScript('/my/script.js', function() {
  // 在脚本加载完成后，回调函数才会执行
  newFunction(); // 现在它工作了
  ...
});
```

这是我们的想法：第二个参数是一个函数（通常是匿名函数），该函数会在行为（action）完成时运行。

这是一个带有真实脚本的可运行的示例：

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
  (script) => {
    alert(`Cool, the script ${script.src} is loaded`);
    alert(_); // 所加载的脚本中声明的函数
  }
);
```

这被称为“基于回调”的异步编程风格。异步执行某项功能的函数应该提供一个 callback 参数用于在相应事件完成时调用。（译注：上面这个例子中的相应事件是指脚本加载）

这里我们在 loadScript 中就是这么做的，但当然这是一种通用方法。

## 1.1. 在回调中回调

我们如何依次加载两个脚本：第一个，然后是第二个？

自然的解决方案是将第二个 loadScript 调用放入回调中，如下所示：

```js
loadScript("/my/script.js", function (script) {
  alert(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript("/my/script2.js", function (script) {
    alert(`Cool, the second script is loaded`);
  });
});
```

在外部 loadScript 执行完成时，内部回调就会被回调。

如果我们还想要一个脚本呢？

```js
loadScript("/my/script.js", function (script) {
  loadScript("/my/script2.js", function (script) {
    loadScript("/my/script3.js", function (script) {
      // ...加载完所有脚本后继续
    });
  });
});
```

因此，每一个新行为（action）都在回调内部。这对于几个行为来说还好，但对于许多行为来说就不好了，所以我们很快就会看到其他变体。

## 1.2. 处理 Error

在上述示例中，我们并没有考虑出现 error 的情况。如果脚本加载失败怎么办？我们的回调应该能够对此作出反应。

这是 `loadScript` 的改进版本，可以跟踪加载错误：

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

加载成功时，它会调用 `callback(null, script)`，否则调用 `callback(error)`。

用法：

```js
loadScript("/my/script.js", function (error, script) {
  if (error) {
    // 处理 error
  } else {
    // 脚本加载成功
  }
});
```

再次强调，我们在 `loadScript` 中所使用的方案其实很普遍。它被称为“Error 优先回调（error-first callback）”风格

约定是：

- `callback` 的第一个参数是为 error 而保留的。一旦出现 error，callback(err) 就会被调用。
- 第二个参数（和下一个参数，如果需要的话）用于成功的结果。此时 callback(null, result1, result2…) 就会被调用。

因此，单一的 callback 函数可以同时具有报告 error 和传递返回结果的作用。

## 1.3. 厄运金字塔

乍一看，这是一种可行的异步编程方式。的确如此，对于一个或两个嵌套的调用看起来还不错。

但对于一个接一个的多个异步行为，代码将会变成这样：

```js
loadScript("1.js", function (error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", function (error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript("3.js", function (error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...加载完所有脚本后继续 (*)
          }
        });
      }
    });
  }
});
```

在上面这段代码中：

1. 我们加载 1.js，如果没有发生错误。
2. 我们加载 2.js，如果没有发生错误。
3. 我们加载 3.js，如果没有发生错误 — 做其他操作 (\*)。

如果调用嵌套的增加，代码层次变得更深，维护难度也随之增加，尤其是我们使用的是可能包含了很多循环和条件语句的真实代码，而不是例子中的 ...。

有时这些被称为“回调地狱”或“厄运金字塔”。

![](https://zh.javascript.info/article/callbacks/callback-hell.svg)

嵌套调用的“金字塔”随着每个异步行为会向右增长。很快它就失控了。

所以这种编码方式不是很好。

我们可以通过使每个行为都成为一个独立的函数来尝试减轻这种问题，如下所示：

```js
loadScript("1.js", step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("3.js", step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...加载完所有脚本后继续 (*)
  }
}
```

看到了吗？它的作用相同，但是没有深层的嵌套了，因为我们将每个行为都编写成了一个独立的顶层函数。

它可以工作，但是代码看起来就像是一个被撕裂的表格。你可能已经注意到了，它的可读性很差，在阅读时你需要在各个代码块之间跳转。这很不方便，特别是如果读者对代码不熟悉，他们甚至不知道应该跳转到什么地方。

此外，名为 step\* 的函数都是一次性使用的，创建它们就是为了避免“厄运金字塔”。没有人会在行为链之外重用它们。因此，这里的命名空间有点混乱。

我们希望还有更好的方法。

幸运的是，有其他方法可以避免此类金字塔。最好的方法之一就是 “promise”，我们将在下一章中介绍它。

# 2. Promise

想象一下，你是一位顶尖歌手，粉丝没日没夜地询问你下个单曲什么时候发。

为了从中解放，你承诺（promise）会在单曲发布的第一时间发给他们。你给了粉丝们一个列表。他们可以在上面填写他们的电子邮件地址，以便当歌曲发布后，让所有订阅了的人能够立即收到。即便遇到不测，例如录音室发生了火灾，以致你无法发布新歌，他们也能及时收到相关通知。

每个人都很开心：你不会被任何人催促，粉丝们也不用担心错过单曲发行。

这是我们在编程中经常遇到的事儿与真实生活的类比：

1. 生产者代码（producing code）”会做一些事儿，并且会需要一些时间。例如，通过网络加载数据的代码。它就像一位“歌手”。
2. “消费者代码（consuming code）”想要在“生产者代码”完成工作的第一时间就能获得其工作成果。许多函数可能都需要这个结果。这些就是“粉丝”。
3. **Promise** 是将“生产者代码”和“消费者代码”连接在一起的一个特殊的 JavaScript 对象。用我们的类比来说：这就是就像是“订阅列表”。“生产者代码”花费它所需的任意长度时间来产出所承诺的结果，而 “promise” 将在它（译注：指的是“生产者代码”，也就是下文所说的 executor）准备好时，将结果向所有订阅了的代码开放。

这种类比并不十分准确，因为 JavaScipt 的 promise 比简单的订阅列表更加复杂：它们还拥有其他的功能和局限性。但以此开始挺好的。

Promise 对象的构造器（constructor）语法如下：

```js
let promise = new Promise(function (resolve, reject) {
  // executor（生产者代码，“歌手”）
});
```

传递给`new Promise` 的函数被称为 **executor**。当 `new Promise` 被创建，executor 会自动运行。它包含最终应产出结果的生产者代码。按照上面的类比：executor 就是“歌手”。

它的参数 `resolve` 和 `reject` 是由 JavaScript 自身提供的回调。我们的代码仅在 executor 的内部。

当 executor 获得了结果，无论是早还是晚都没关系，它应该调用以下回调之一：

- `resolve(value)` — 如果任务成功完成并带有结果 value。
- `reject(error)` — 如果出现了 error，error 即为 error 对象。

所以总结一下就是：`executor` 会自动运行并尝试执行一项工作。尝试结束后，如果成功则调用 `resolve`，如果出现 error 则调用 reject。

由 `new Promise` 构造器返回的 promise 对象具有以下内部属性：

- `state` — 最初是 "pending"，然后在 resolve 被调用时变为 "fulfilled"，或者在 reject 被调用时变为 "rejected"。
- `result` — 最初是 undefined，然后在 resolve(value) 被调用时变为 value，或者在 reject(error) 被调用时变为 error。

所以，executor 最终将 `promise` 移至以下状态之一：

![](https://zh.javascript.info/article/promise-basics/promise-resolve-reject.svg)

稍后我们将看到“粉丝”如何订阅这些更改。

下面是一个 `promise` 构造器和一个简单的 executor 函数，该 executor 函数具有包含时间（即 setTimeout）的“生产者代码”：

```js
let promise = new Promise(function (resolve, reject) {
  // 当 promise 被构造完成时，自动执行此函数

  // 1 秒后发出工作已经被完成的信号，并带有结果 "done"
  setTimeout(() => resolve("done"), 1000);
});
```

通过运行上面的代码，我们可以看到两件事儿：

1. executor 被自动且立即调用（通过 new Promise）。

2. executor 接受两个参数：`resolve` 和 `reject`。这些函数由 `JavaScipt` 引擎预先定义，因此我们不需要创建它们。我们只需要在准备好（译注：指的是 executor 准备好）时调用其中之一即可。

经过 1 秒的“处理”后，`executor` 调用 resolve("done") 来产生结果。这将改变 promise 对象的状态：

![](https://zh.javascript.info/article/promise-basics/promise-resolve-1.svg)

这是一个成功完成任务的例子，一个“成功实现了的诺言”。

现在的则是一个 executor 以 error 拒绝 promise 的示例：

```js
let promise = new Promise(function (resolve, reject) {
  // 1 秒后发出工作已经被完成的信号，并带有 error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
```

对 `reject(...)` 的调用将 promise 对象的状态移至 "rejected"：

![](https://zh.javascript.info//article/promise-basics/promise-reject-1.svg)

总而言之，`executor` 应该执行一项工作（通常是需要花费一些时间的事儿），然后调用 `resolve` 或 `reject` 来改变对应的 promise 对象的状态。

与最初的 “pending” promise 相反，一个 `resolved` 或 `rejected` 的 promise 都会被称为 “settled”。

> :information_source:这儿只能有一个结果或一个 error

executor 只能调用一个 resolve 或一个 reject。任何状态的更改都是最终的。

所有其他的再对 `resolve` 和 reject 的调用都会被忽略：

```js
let promise = new Promise(function (resolve, reject) {
  resolve("done");

  reject(new Error("…")); // 被忽略
  setTimeout(() => resolve("…")); // 被忽略
});
```

这儿的宗旨是，一个被 `executor` 完成的工作只能有一个结果或一个 error。

并且，`resolve/reject` 只需要一个参数（或不包含任何参数），并且将忽略额外的参数。

> :information_source:以 Error 对象 reject

如果什么东西出了问题， `executor` 应该调用 reject。这可以使用任何类型的参数来完成（就像 resolve 一样）。但是建议使用 Error 对象（或继承自 Error 的对象）。这样做的理由很快就会显而易见。

> :information_source:Resolve/reject 可以立即进行

实际上，executor 通常是异步执行某些操作，并在一段时间后调用 resolve/reject，但这不是必须的。我们还可以立即调用 resolve 或 reject，就像这样：

```js
let promise = new Promise(function (resolve, reject) {
  // 不花时间去做这项工作
  resolve(123); // 立即给出结果：123
});
```

例如，当我们开始做一个任务时，但随后看到一切都已经完成并已被缓存时，可能就会发生这种情况。

这挺好。我们立即就有了一个 resolved 的 promise。

> :information_source:state 和 result 都是内部的

Promise 对象的 state 和 result 属性都是内部的。我们无法直接访问它们。但我们可以对它们使用 `.then/.catch/.finally`方法。我们在下面对这些方法进行了描述。

## 2.1. 消费者：then，catch，finally

Promise 对象充当的是 executor（“生产者代码”或“歌手”）和消费函数（“粉丝”）之间的连接，后者将接收结果或 error。可以通过使用 `.then、.catch 和 .finally` 方法为消费函数进行注册。

### 2.1.1. then

最重要最基础的一个就是 `.then`。

语法如下：

```js
promise.then(
  function (result) {
    /* handle a successful result */
  },
  function (error) {
    /* handle an error */
  }
);
```

`.then` 的第一个参数是一个函数，该函数将在 promise resolved 后运行并接收结果。

`.then` 的第二个参数也是一个函数，该函数将在 promise rejected 后运行并接收 error。

例如，以下是对成功 resolved 的 promise 做出的反应

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve 运行 .then 中的第一个函数
promise.then(
  (result) => alert(result), // 1 秒后显示 "done!"
  (error) => alert(error) // 不运行
);
```

第一个函数被运行了。

在 reject 的情况下，运行第二个：

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject 运行 .then 中的第二个函数
promise.then(
  (result) => alert(result), // 不运行
  (error) => alert(error) // 1 秒后显示 "Error: Whoops!"
);
```

如果我们只对成功完成的情况感兴趣，那么我们可以只为 `.then` 提供一个函数参数：

```js
let promise = new Promise((resolve) => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // 1 秒后显示 "done!"
```

### 2.1.2. catch

如果我们只对 `error` 感兴趣，那么我们可以使用 null 作为第一个参数：`.then(null, errorHandlingFunction)`。或者我们也可以使用 .`catch(errorHandlingFunction)`，其实是一样的：

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) 与 promise.then(null, f) 一样
promise.catch(alert); // 1 秒后显示 "Error: Whoops!"
```

`.catch(f)` 调用是 `.then(null, f)` 的完全的模拟，它只是一个简写形式。

### 2.1.3. finally

就像常规 `try {...} catch {...}` 中的 finally 子句一样，promise 中也有 finally。

`.finally(f)` 调用与 `.then(f, f)` 类似，在某种意义上，f 总是在 promise 被 settled 时运行：即 promise 被 resolve 或 reject。

finally 是执行清理（cleanup）的很好的处理程序（handler），例如无论结果如何，都停止使用不再需要的加载指示符（indicator）。

像这样：

```js
new Promise((resolve, reject) => {
  /* 做一些需要时间的事儿，然后调用 resolve/reject */
})
  // 在 promise 被 settled 时运行，无论成功与否
  .finally(() => stop loading indicator)
  .then(result => show result, err => show error)
```

不过，它并不是 `then(f,f)` 的别名。它们之间有几个重要的区别：

1. `finally` 处理程序（handler）没有参数。在 `finally` 中，我们不知道 `promise` 是否成功。没关系，因为我们的任务通常是执行“常规”的定稿程序（finalizing procedures）。

2. `finally` 处理程序将结果和 `error` 传递给下一个处理程序。

   例如，在这儿结果被从 `finally` 传递给了 `then`：

   ```js
   new Promise((resolve, reject) => {
     setTimeout(() => resolve("result"), 2000);
   })
     .finally(() => alert("Promise ready"))
     .then((result) => alert(result)); // <-- .then 对结果进行处理
   ```

   在这儿，promise 中有一个 error，这个 error 被从 `finally` 传递给了 `catch`

   ```js
   new Promise((resolve, reject) => {
     throw new Error("error");
   })
     .finally(() => alert("Promise ready"))
     .catch((err) => alert(err)); // <-- .catch 对 error 对象进行处理
   ```

   这非常方便，因为 finally 并不是意味着要处理 promise 的结果。所以它将结果传递了下去。

   在下一章中，我们将详细讨论 promise 链以及处理程序`（handler）`之间的结果传递。

3. 最后，但并非最不重要的一点是，.finally(f) 是比 .then(f, f) 更为方便的语法：无需重复函数 f。

> :information_source:在 `settled` 的 `promise` 上，`then` 会立即运行

如果 `promise` 为 `pending` 状态，`.then/catch/finally` 处理程序（handler）将等待它。否则，如果`promise` 已经是 settled 状态，它们就会立即执行

```js
// the promise becomes resolved immediately upon creation
let promise = new Promise((resolve) => resolve("done!"));

promise.then(alert); // done!（现在显示）
```

请注意，这和现实生活中的类比是不同的，并且比现实生活中的“订阅列表”方案强大得多。如果歌手已经发布了他们的单曲，然后某个人在订阅列表上进行了注册，则他们很可能不会收到该单曲。实际生活中的订阅必须在活动开始之前进行。

Promise 则更加灵活。我们可以随时添加处理程序（handler）：如果结果已经在了，我们的处理程序便会立即获得这个结果。

接下来，让我们看一下关于 promise 如何帮助我们编写异步代码的更多实际示例。

## 2.2. 示例：loadScript

我们从上一章获得了用于加载脚本的 `loadScript` 函数。

这是基于回调函数的变体，记住它：

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

让我们用 promise 重写它。

新函数 `loadScript` 将不需要回调。取而代之的是，它将创建并返回一个在加载完成时解析（resolve）的 promise 对象。外部代码可以使用 `.then` 向其添加处理程序（订阅函数）：

```js
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
```

用法：

```js
let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);

promise.then(
  (script) => alert(`${script.src} is loaded!`),
  (error) => alert(`Error: ${error.message}`)
);

promise.then((script) => alert("Another handler..."));
```

我们立刻就能发现 promise 相较于基于回调的模式的一些好处：

| Promises                                                                                                                                                            | Callbacks                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promises 允许我们按照自然顺序进行编码。首先，我们运行 loadScript 和 .then 来处理结果。                                                                              | 在调用 loadScript(script, callback) 时，在我们处理的地方（disposal）必须有一个 callback 函数。换句话说，在调用 loadScript 之前，我们必须知道如何处理结果。 |
| 我们可以根据需要，在 promise 上多次调用 .then。每次调用，我们都会在“订阅列表”中添加一个新的“分析”，一个新的订阅函数。在下一章将对此内容进行详细介绍：`Promise 链`。 | 只能有一个回调。                                                                                                                                           |

因此，promise 为我们提供了更好的代码流和灵活性。但其实还有更多相关内容。我们将在下一章看到。

# 3. Promise 链

我们回顾一下 简介：回调 一章中提到的问题：我们有一系列的异步任务要一个接一个地执行 — 例如，加载脚本。我们如何写出更好的代码呢？

Promise 提供了一些方案来做到这一点。

在本章中，我们将一起学习 promise 链。

它看起来就像这样：

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    // (**)

    alert(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)

    alert(result); // 2
    return result * 2;
  })
  .then(function (result) {
    alert(result); // 4
    return result * 2;
  });
```

它的理念是将 result 通过 .then 处理程序（handler）链进行传递。

运行流程如下：

1. 初始 promise 在 1 秒后进行 resolve `(*)`，
2. 然后 .then 处理程序（handler）被调用 `(**)`。
3. 它返回的值被传入下一个 .then 处理程序（handler）`(***)`
4. ……依此类推。

随着 result 在处理程序（handler）链中传递，我们可以看到一系列的 alert 调用：`1 → 2 → 4`。

![](https://zh.javascript.info//article/promise-chaining/promise-then-chain.svg)

之所以这么运行，是因为对`promise.then` 的调用会返回了一个 promise，所以我们可以在其之上调用下一个 `.then`。

当处理程序（handler）返回一个值时，它将成为该 promise 的 result，所以将使用它调用下一个 `.then`。

**新手常犯的一个经典错误：从技术上讲，我们也可以将多个 .then 添加到一个 promise 上。但这并不是 promise 链（chaining）。**

例如：

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});
```

我们在这里所做的只是一个 promise 的几个处理程序（handler）。他们不会相互传递 result；相反，它们之间彼此独立运行处理任务。

这里它的一张示意图（你可以将其与上面的链式调用做一下比较）：

![](https://zh.javascript.info//article/promise-chaining/promise-then-many.svg)

在同一个 promise 上的所有 `.then`获得的结果都相同 — 该 promise 的结果。所以，在上面的代码中，所有 alert 都显示相同的内容：1。

实际上我们极少遇到一个 `promise`需要多处理程序（handler）的情况。使用链式调用的频率更高。

## 3.1. 返回 promise

`.then(handler)` 中所使用的处理程序（handler）可以创建并返回一个 promise。

在这种情况下，其他的处理程序（handler）将等待它 settled 后再获得其结果（result）。

例如：

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    alert(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)

    alert(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 4
  });
```

这里第一个 `.then` 显示 1 并在 `(*)` 行返回 `new Promise(…)`。1 秒后它会进行 `resolve`，然后 result（resolve 的参数，在这里它是 result\*2）被传递给第二个 `.then` 的处理程序（handler）。这个处理程序（handler）位于 (\*\*) 行，它显示 2，并执行相同的动作（`action`）。

所以输出与前面的示例相同：`1 → 2 → 4`，但是现在在每次 alert 调用之间会有 1 秒钟的延迟。

返回 `promise` 使我们能够构建异步行为链。

## 3.2. 示例：loadScript

让我们将本章所讲的这个特性与在 上一章 中定义的 promise 化的 loadScript 结合使用，按顺序依次加载脚本：

```js
loadScript("/article/promise-chaining/one.js")
  .then(function (script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function (script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function (script) {
    // 使用在脚本中声明的函数
    // 以证明脚本确实被加载完成了
    one();
    two();
    three();
  });
```

我们可以用箭头函数来重写代码，让其变得简短一些：

```js
loadScript("/article/promise-chaining/one.js")
  .then((script) => loadScript("/article/promise-chaining/two.js"))
  .then((script) => loadScript("/article/promise-chaining/three.js"))
  .then((script) => {
    // 脚本加载完成，我们可以在这儿使用脚本中声明的函数
    one();
    two();
    three();
  });
```

在这儿，每个 `loadScript` 调用都返回一个 `promise`，并且在它 resolve 时下一个 `.then` 开始运行。然后，它启动下一个脚本的加载。所以，脚本是一个接一个地加载的。

我们可以向链中添加更多的异步行为（action）。请注意，代码仍然是“扁平”的 — 它向下增长，而不是向右。这里没有“厄运金字塔”的迹象。

从技术上讲，我们可以向每个 loadScript 直接添加 `.then`，就像这样：

```js
loadScript("/article/promise-chaining/one.js").then((script1) => {
  loadScript("/article/promise-chaining/two.js").then((script2) => {
    loadScript("/article/promise-chaining/three.js").then((script3) => {
      // 此函数可以访问变量 script1，script2 和 script3
      one();
      two();
      three();
    });
  });
});
```

这段代码做了相同的事儿：按顺序加载 3 个脚本。但它是“向右增长”的。所以会有和使用回调函数一样的问题。

刚开始使用 promise 的人可能不知道 promise 链，所以他们就这样写了。通常，链式是首选。

有时候直接写 `.then` 也是可以的，因为嵌套的函数可以访问外部作用域。在上面的例子中，嵌套在最深层的那个回调（callback）可以访问所有变量 script1，script2 和 script3。但这是一个例外，而不是一条规则。

> :information_source: Thenables
> 确切地说，处理程序（handler）返回的不完全是一个 `promise`，而是返回的被称为 `“thenable”` 对象 — 一个具有方法 `.then` 的任意对象。它会被当做一个 promise 来对待。

这个想法是，第三方库可以实现自己的“`promise` 兼容（promise-compatible）”对象。它们可以具有扩展的方法集，但也与原生的`promise` 兼容，因为它们实现了`.then` 方法

这是一个 thenable 对象的示例：

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // 1 秒后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000ms 后显示 2
```

JavaScript 检查在 `(*)` 行中由 .then 处理程序（handler）返回的对象：如果它具有名为 `then` 的可调用方法，那么它将调用该方法并提供原生的函数 `resolve` 和 `reject` 作为参数（类似于 executor），并等待直到其中一个函数被调用。在上面的示例中，resolve(2) 在 1 秒后被调用 (\*\*)。然后，`result`会被进一步沿着链向下传递。

这个特性允许我们将自定义的对象与 `promise` 链集成在一起，而不必继承自 `Promise`。

## 3.3. 更复杂的示例：fetch

在前端编程中，promise 通常被用于网络请求。那么，让我们一起来看一个相关的扩展示例吧。

我们将使用 `fetch` 方法从远程服务器加载用户信息。它有很多可选的参数，我们在 单独的一章 中对其进行了详细介绍，但是基本语法很简单

```js
let promise = fetch(url);
```

执行这条语句，向 url 发出网络请求并返回一个 promise。当远程服务器返回 header（是在 **全部响应加载完成前**）时，该 promise 用使用一个 `response` 对象来进行 `resolve`。

为了读取完整的响应，我们应该调用 `response.text()` 方法：当全部文字`（full text）`内容从远程服务器下载完成后，它会返回一个 `promise`，该 `promise` 以刚刚下载完成的这个文本作为 `result` 进行 `resolve`。

下面这段代码向 `user.json` 发送请求，并从服务器加载该文本：

```js
fetch("/article/promise-chaining/user.json")
  // 当远程服务器响应时，下面的 .then 开始执行
  .then(function (response) {
    // 当 user.json 加载完成时，response.text() 会返回一个新的 promise
    // 该 promise 以加载的 user.json 为 result 进行 resolve
    return response.text();
  })
  .then(function (text) {
    // ...这是远程文件的内容
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

从 `fetch` 返回的 `response` 对象还包括 `response.json()` 方法，该方法读取远程数据并将其解析为 `JSON`。在我们的例子中，这更加方便，所以让我们切换到这个方法。

为了简洁，我们还将使用箭头函数：

```js
// 同上，但是使用 response.json() 将远程内容解析为 JSON
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => alert(user.name)); // iliakan, got user name
```

现在，让我们用加载好的用户信息搞点事情。

例如，我们可以多发一个到 GitHub 的请求，加载用户个人资料并显示头像：

```js
// 发送一个对 user.json 的请求
fetch("/article/promise-chaining/user.json")
  // 将其加载为 JSON
  .then((response) => response.json())
  // 发送一个到 GitHub 的请求
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // 将响应加载为 JSON
  .then((response) => response.json())
  // 显示头像图片（githubUser.avatar_url）3 秒（也可以加上动画效果）
  .then((githubUser) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

这段代码可以工作，具体细节请看注释。但是，这儿有一个潜在的问题，一个新手使用 promise 的典型问题。

请看 `(*)` 行：我们如何能在头像显示结束并被移除 之后 做点什么？例如，我们想显示一个用于编辑该用户或者其他内容的表单。就目前而言，是做不到的。

为了使链可扩展，我们需要返回一个在头像显示结束时进行 resolve 的 promise。

就像这样

```js
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise(function (resolve, reject) {
        // (*)
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser); // (**)
        }, 3000);
      })
  )
  // 3 秒后触发
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
```

也就是说，第 `(*)` 行的 `.then` 处理程序（handler）现在返回一个 new Promise，只有在 setTimeout 中的 resolve(githubUser) (\*\*) 被调用后才会变为 settled。链中的下一个 `.then` 将一直等待这一时刻的到来。

作为一个好的做法，异步行为应该始终返回一个 `promise`。这样就可以使得之后我们计划后续的行为成为可能。即使我们现在不打算对链进行扩展，但我们之后可能会需要。

最后，我们可以将代码拆分为可重用的函数：

```js
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 使用它们：
loadJson("/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
// ...
```

## 3.4. 总结

如果 `.then`（或`catch/finally` 都可以）处理程序（handler）返回一个 promise，那么链的其余部分将会等待，直到它状态变为 settled。当它被 settled 后，其 result（或 error）将被进一步传递下去。

这是一个完整的流程图：
![](https://zh.javascript.info//article/promise-chaining/promise-handler-variants.svg)

# 4. 使用 promise 进行错误处理

`Promise` 链在错误（error）处理中十分强大。当一个 `promise` 被 `reject` 时，控制权将移交至最近的 rejection 处理程序（handler）。这在实际开发中非常方便。

例如，下面代码中所 fetch 的 URL 是错的（没有这个网站），`.catch` 对这个 error 进行了处理：

```js
fetch("https://no-such-server.blabla") // rejects
  .then((response) => response.json())
  .catch((err) => alert(err)); // TypeError: failed to fetch（这里的文字可能有所不同）
```

正如你所看到的，`.catch` 不必是立即的。它可能在一个或多个 .then 之后出现。

或者，可能该网站一切正常，但响应不是有效的 JSON。捕获所有 error 的最简单的方法是，将 `.catch` 附加到链的末尾

```js
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  .catch((error) => alert(error.message));
```

通常情况下，这样的 `.catch` 根本不会被触发。但是如果上述任意一个 promise 被 `reject`（网络问题或者无效的 json 或其他），`.catch` 就会捕获它。

## 4.1. 隐式 try…catch

Promise 的执行者（executor）和 promise 的处理程序（handler）周围有一个“隐式的 try..catch”。如果发生异常，它（译注：指异常）就会被捕获，并被视为 rejection 进行处理。

例如，下面这段代码：

```js
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!
```

……与下面这段代码工作上完全相同：

```js
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
```

在 `executor` 周围的“隐式 `try..catch`”自动捕获了 `error`，并将其变为 rejected promise。

这不仅仅发生在 executor 函数中，同样也发生在其 handler 中。如果我们在 .then 处理程序（handler）中 throw，这意味着 promise 被 rejected，因此控制权移交至最近的 error 处理程序（handler）。

这是一个例子：

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    throw new Error("Whoops!"); // reject 这个 promise
  })
  .catch(alert); // Error: Whoops!
```

对于所有的 error 都会发生这种情况，而不仅仅是由 throw 语句导致的这些 error。例如，一个编程错误：

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    blabla(); // 没有这个函数
  })
  .catch(alert); // ReferenceError: blabla is not defined
```

最后的 `.catch` 不仅会捕获显式的 rejection，还会捕获它上面的处理程序（handler）中意外出现的 error。

## 4.2. 再次抛出（Rethrowing）

正如我们已经注意到的，链尾端的 `.catch` 的表现有点像 `try..catch`。我们可能有许多个 .then 处理程序（handler），然后在尾端使用一个 .catch 处理上面的所有 `error`。

在常规的 `try..catch` 中，我们可以分析错误（error），如果我们无法处理它，可以将其再次抛出。对于 `promise` 来说，这也是可以的。

如果我们在 `.catch` 中 throw，那么控制权就会被移交到下一个最近的 error 处理程序（handler）。如果我们处理该 error 并正常完成，那么它将继续到最近的成功的 `.then` 处理程序（handler）。

在下面这个例子中，`.catch` 成功处理了 `error`：

```js
// 执行流：catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    alert("The error is handled, continue normally");
  })
  .then(() => alert("Next successful handler runs"));
```

这里 `.catch` 块正常完成。所以下一个成功的 .then 处理程序（handler）就会被调用。

在下面的例子中，我们可以看到 `.catch` 的另一种情况。(\*) 行的处理程序（handler)`捕获了 error，但无法处理它（例如，它只知道如何处理 URIError），所以它将其再次抛出：

```js
// 执行流：catch -> catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    // (*)

    if (error instanceof URIError) {
      // 处理它
    } else {
      alert("Can't handle such error");

      throw error; // 再次抛出此 error 或另外一个 error，执行将跳转至下一个 catch
    }
  })
  .then(function () {
    /* 不在这里运行 */
  })
  .catch((error) => {
    // (**)

    alert(`The unknown error has occurred: ${error}`);
    // 不会返回任何内容 => 执行正常进行
  });
```

执行从第一个 `.catch (*)` 沿着链跳转至下一个 `(**)`。

## 4.3. 未处理的 rejection

当一个 error 没有被处理会发生什么？例如，我们忘了在链的尾端附加 `.catch`，像这样：

```js
new Promise(function () {
  noSuchFunction(); // 这里出现 error（没有这个函数）
}).then(() => {
  // 一个或多个成功的 promise 处理程序（handler）
}); // 尾端没有 .catch！
```

如果出现 error，promise 的状态将变为 “rejected”，然后执行应该跳转至最近的 rejection 处理程序（handler）。但是上面这个例子中并没有这样的处理程序（handler）。因此 error 会“卡住（stuck）”。没有代码来处理它。

在实际开发中，就像代码中常规的未处理的 error 一样，这意味着某些东西出了问题。

当发生一个常规的错误（error）并且未被 `try..catch` 捕获时会发生什么？脚本死了，并在控制台（console）中留下了一个信息。对于在 promise 中未被处理的 rejection，也会发生类似的事儿。

JavaScript 引擎会跟踪此类 rejection，在这种情况下会生成一个全局的 error。如果你运行上面这个代码，你可以在控制台（console）中看到。

在浏览器中，我们可以使用 `unhandledrejection` 事件来捕获这类 error：

```js
window.addEventListener("unhandledrejection", function (event) {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] - 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! - 未处理的 error 对象
});

new Promise(function () {
  throw new Error("Whoops!");
}); // 没有用来处理 error 的 catch
```

这个事件是 [HTML 标准](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) 的一部分。

如果出现了一个 error，并且在这儿没有 .catch，那么 `unhandledrejection` 处理程序（handler）就会被触发，并获取具有 error 相关信息的 event 对象，所以我们就能做一些后续处理了。

通常此类 error 是无法恢复的，所以我们最好的解决方案是将问题告知用户，并且可以将事件报告给服务器。

在 Node.js 等非浏览器环境中，有其他用于跟踪未处理的 error 的方法。

## 4.4. 总结

- `.catch` 处理 promise 中的各种 error：在 reject() 调用中的，或者在处理程序（handler）中抛出的（thrown）error。
- 我们应该将 `.catch` 准确地放到我们想要处理 error，并知道如何处理这些 error 的地方。处理程序应该分析 error（可以自定义 error 类来帮助分析）并再次抛出未知的 error（可能它们是编程错误）。
- 如果没有办法从 error 中恢复的话，不使用 `.catch` 也可以。
- 在任何情况下我们都应该有`unhandledrejection`事件处理程序（用于浏览器，以及其他环境的模拟），以跟踪未处理的 error 并告知用户（可能还有我们的服务器）有关信息，以使我们的应用程序永远不会“死掉”。

## 4.5. 补充内容

### 4.5.1. Fetch 错误处理示例

让我们改进用户加载（user-loading）示例的错误处理。

当请求无法发出时，[fetch](https://developer.mozilla.org/zh/docs/Web/API/WindowOrWorkerGlobalScope/fetch) reject 会返回 promise。例如，远程服务器无法访问，或者 URL 异常。但是如果远程服务器返回响应错误 404，甚至是错误 500，这些都被认为是合法的响应。

如果在 `(*)` 行，服务器返回一个错误 500 的非 JSON（non-JSON）页面该怎么办？如果没有这个用户，GitHub 返回错误 404 的页面又该怎么办呢？

```js
fetch("no-such-user.json") // (*)
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then((response) => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
// ...
```

到目前为止，代码试图以 JSON 格式加载响应数据，但无论如何都会因为语法错误而失败。你可以通过执行上述例子来查看相关信息，因为文件 `no-such-user.json` 不存在。

这有点糟糕，因为错误只是落在链上，并没有相关细节信息：什么失败了，在哪里失败的。

因此我们多添加一步：我们应该检查具有 HTTP 状态的 `response.status` 属性，如果不是 200 就抛出错误。

```js
class HttpError extends Error {
  // (1)
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

function loadJson(url) {
  // (2)
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
}

loadJson("no-such-user.json") // (3)
  .catch(alert); // HttpError: 404 for .../no-such-user.json
```

1. 我们为 HTTP 错误创建一个自定义类用于区分 HTTP 错误和其他类型错误。此外，新的类有一个 constructor，它接受 `response` 对象，并将其保存到 error 中。因此，错误处理（error-handling）代码就能够获得响应数据了。
2. 然后我们将请求（requesting）和错误处理代码包装进一个函数，它能够 fetch url **并** 将所有状态码不是 200 视为错误。这很方便，因为我们通常需要这样的逻辑。
3. 现在 `alert` 显示更多有用的描述信息。

拥有我们自己的错误处理类的好处是我们可以使用 `instanceof` 很容易地在错误处理代码中检查错误。

例如，我们可以创建请求，如果我们得到 404 就可以告知用户修改信息。

下面的代码从 GitHub 加载给定名称的用户。如果没有这个用户，它将告知用户填写正确的名称：

```js
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then((user) => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err; // (*)
      }
    });
}

demoGithubUser();
```

请注意：这里的 `.catch` 会捕获所有错误，但是它仅仅“知道如何处理” HttpError 404。在那种特殊情况下，它意味着没有这样的用户，而 .catch 仅仅在这种情况下重试。

对于其他错误，它不知道会出现什么问题。可能是编程错误或者其他错误。所以它仅仅是在 (\*) 行再次抛出。

### 4.5.2. 其他

如果我们有加载指示（load-indication），`.finally` 是一个很好的处理程序（handler），在 fetch 完成时停止它：

```js
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  document.body.style.opacity = 0.3; // (1) 开始指示（indication）

  return loadJson(`https://api.github.com/users/${name}`)
    .finally(() => {
      // (2) 停止指示（indication）
      document.body.style.opacity = "";
      return new Promise((resolve) => setTimeout(resolve)); // (*)
    })
    .then((user) => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

此处的 `(1)` 行，我们通过调暗文档来指示加载。指示方法没有什么问题，可以使用任何类型的指示来代替。

当 promise 得以解决，fetch 可以是成功或者错误，`finally` 在 `(2)` 行触发并终止加载指示。

有一个浏览器技巧，`(*)`是从 `finally` 返回零延时（zero-timeout）的 promise。这是因为一些浏览器（比如 Chrome）需要“一点时间”外的 promise 处理程序来绘制文档的更改。因此它确保在进入链下一步之前，指示在视觉上是停止的。

# 5. Promise API

在 `Promise` 类中，有 5 种静态方法。我们在这里简单介绍下它们的使用场景。

## 5.1. Promise.all

假设我们希望并行执行多个 promise，并等待所有 promise 都准备就绪。

例如，并行下载几个 URL，并等到所有内容都下载完毕后再对它们进行处理。

这就是 Promise.all 的用途。

语法：

```js
let promise = Promise.all([...promises...]);
```

`Promise.all` 接受一个 promise 数组作为参数（从技术上将，它可以是任何可迭代的，但通常是一个数组）并返回一个新的 promise。

当所有给定的 promise 都被 settled 时，新的 promise 才会 resolve，并且其结果数组将成为新的 promise 的结果。

例如，下面的 `Promise.all` 在 3 秒之后被 settled，然后它的结果就是一个 `[1, 2, 3]` 数组：

```js
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 1,2,3 当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
```

请注意，结果数组中元素的顺序与其在源 promise 中的顺序相同。即使第一个 promise 花费了最长的时间才 resolve，但它仍是结果数组中的第一个。

一个常见的技巧是，将一个任务数据数组映射（map）到一个 promise 数组，然后将其包装到 `Promise.all`。

例如，如果我们有一个存储 URL 的数组，我们可以像这样 fetch 它们：

```js
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// 将每个 url 映射（map）到 fetch 的 promise 中
let requests = urls.map((url) => fetch(url));

// Promise.all 等待所有任务都 resolved
Promise.all(requests).then((responses) =>
  responses.forEach((response) => alert(`${response.url}: ${response.status}`))
);
```

一个更真实的示例，通过 GitHub 用户名来获取一个 GitHub 用户数组中用户的信息（我们也可以通过商品 id 来获取商品数组中的商品信息，逻辑都是一样的）：

```js
let names = ["iliakan", "remy", "jeresig"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // 所有响应都被成功 resolved
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
    }

    return responses;
  })
  // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // 所有 JSON 结果都被解析："users" 是它们的数组
  .then((users) => users.forEach((user) => alert(user.name)));
```

**如果任意一个 promise 被 `reject`，由 Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error。**

例如：

```js
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert); // Error: Whoops!
```

这里的第二个 promise 在两秒后 reject。这立即导致了 Promise.all 的 reject，因此 `.catch` 执行了：被 `reject` 的 error 成为了整个 `Promise.all` 的结果

> :warning:如果出现 error，其他 promise 将被忽略

如果其中一个 promise 被 reject，Promise.all 就会立即被 reject，完全忽略列表中其他的 promise。它们的结果也被忽略。

例如，像上面那个例子，如果有多个同时进行的 `fetch` 调用，其中一个失败，其他的 fetch 操作仍然会继续执行，但是 `Promise.all` 将不会再关心（watch）它们。它们可能会 settle，但是它们的结果将被忽略。

`Promise.all` 没有采取任何措施来取消它们，因为 promise 中没有“取消”的概念。在 另一个章节 中，我们将介绍可以帮助我们解决这个问题（译注：指的是“取消” promise）的 `AbortController`，但它不是 Promise API 的一部分。

> :information_source:promise.all(iterable) 允许在 iterable 中使用 non-promise 的“常规”值

通常，`Promise.all(...)` 接受可迭代对象（iterable）的 promise（大多数情况下是数组）。但是，如果这些对象中的任意一个都不是`promise`，那么它将被“按原样”传递给结果数组。

例如，这里的结果是 [1, 2, 3]：

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  }),
  2,
  3,
]).then(alert); // 1, 2, 3
```

所以我们可以在方便的地方将准备好的值传递给 `Promise.all`。

## 5.2. Promise.allSettled

> :warning: 最近的补充 <br/>
> 这是该语言的最新功能。旧的浏览器可能需要使用 polyfill。

如果任意的 promise reject，则 `Promise.all` 整个将会 reject。当我们需要 **所有** 结果都成功时，它对这种“全有或全无”的情况很有用：

```js
Promise.all([
  fetch("/template.html"),
  fetch("/style.css"),
  fetch("/data.json"),
]).then(render); // render 方法需要所有 fetch 的数据
```

`Promise.allSettled` 等待所有的 `promise` 都被 `settle`，无论结果如何。结果数组具有：

- `{status:"fulfilled", value:result}` 对于成功的响应，
- `{status:"rejected", reason:error}` 对于 error。

例如，我们想要获取（fetch）多个用户的信息。即使其中一个请求失败，我们仍然对其他的感兴趣。

让我们使用 `Promise.allSettled`：

```js
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      alert(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      alert(`${urls[num]}: ${result.reason}`);
    }
  });
});
```

上面的 `(*)` 行中的 results 将会是：

```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

所以，对于每个 promise，我们都得到了其状态（status）和`value/reason`。

### 5.2.1. Polyfill

如果浏览器不支持 `Promise.allSettled`，很容易进行 polyfill：

```js
if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(
      promises.map((p) =>
        Promise.resolve(p).then(
          (value) => ({
            state: "fulfilled",
            value,
          }),
          (reason) => ({
            state: "rejected",
            reason,
          })
        )
      )
    );
  };
}
```

在这段代码中，promises.map 获取输入值，并通过 `p => Promise.resolve(p)` 将输入值转换为 promise（以防传递了 non-promise），然后向每一个 promise 都添加 `.then` 处理程序（handler）。

这个处理程序（handler）将成功的结果 value 转换为 `{state:'fulfilled', value}`，将 error reason 转换为 `{state:'rejected', reason}`。这正是 Promise.allSettled 的格式。

然后我们就可以使用 `Promise.allSettled` 来获取 **所有** 给定的 promise 的结果，即使其中一些被 reject。

## 5.3. Promise.race

与 `Promise.all` 类似，但只等待第一个 `settled` 的 promise 并获取其结果（或 error）。

语法

```js
let promise = Promise.race(iterable);
```

例如，这里的结果将是 `1`：

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
```

这里第一个 promise 最快，所以它变成了结果。第一个 settled 的 promise “赢得了比赛”之后，所有进一步的 result/error 都会被忽略。

## 5.4. Promise.resolve/reject

在现代的代码中，很少需要使用 `Promise.resolve` 和 `Promise.reject` 方法，因为 `async/await` 语法（我们会在 稍后 讲到）使它们变得有些过时了。

完整起见，以及考虑到那些出于某些原因而无法使用 async/await 的人，我们在这里对它们进行介绍。

### 5.4.1. Promise.resolve

Promise.resolve(value) 用结果 `value` 创建一个 resolved 的 promise

如同：

```js
let promise = new Promise((resolve) => resolve(value));
```

当一个函数被期望返回一个 `promis`e 时，这个方法用于兼容性。（译注：这里的兼容性是指，我们直接从缓存中获取了当前操作的结果 value，但是期望返回的是一个 `promise`，所以可以使用 `Promise.resolve(value)` 将 value “封装”进 promise，以满足期望返回一个 promise 的这个需求。）

例如，下面的 `loadCached` 函数获取（`fetch`）一个`URL` 并记住其内容。以便将来对使用相同 URL 的调用，它能立即从缓存中获取先前的内容，但使用 `Promise.resolve` 创建了一个该内容的 promise，所以返回的值始终是一个 `promise`。

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}
```

我们可以使用 `loadCached(url).then(…)`，因为该函数保证了会返回一个 `promise`。我们就可以放心地在 `loadCached` 后面使用 `.then`。这就是 (\*) 行中 `Promise.resolve` 的目的。

### 5.4.2. Promise.reject

`Promise.reject(error)` 用 error 创建一个 rejected 的 promise。

如同：

```js
let promise = new Promise((resolve, reject) => reject(error));
```

实际上，这个方法几乎从未被使用过。

## 5.5. 总结

`Promise`类有 5 种静态方法：

1. `Promise.all(promises)` —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 Promise.all 的 error，所有其他 promise 的结果都会被忽略。
2. `Promise.allSettled(promises)`（ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：
   - state: "fulfilled" 或 "rejected"
   - value（如果 fulfilled）或 reason（如果 rejected）。
3. `Promise.race(promises)` —— 等待第一个 settle 的 promise，并将其 result/error 作为结果。
4. `Promise.resolve(value)` —— 使用给定 value 创建一个 resolved 的 promise。
5. `Promise.reject(error)` —— 使用给定 error 创建一个 rejected 的 promise。

这五个方法中，`Promise.all` 可能是在实战中使用最多的。

# 6. Promisification

“Promisification” 是用于一个简单转换的一个长单词。它指将一个接受回调的函数转换为一个返回 promise 的函数。

由于许多函数和库都是基于回调的，因此，在实际开发中经常会需要进行这种转换。因为使用 promise 更加方便，所以将基于回调的函数和库 `promisify` 是有意义的。（译注：promisify 即指 promise 化）

例如，在 简介：回调 一章中我们有 loadScript(src, callback)。

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 用法：
// loadScript('path/script.js', (err, script) => {...})
```

让我们将其`promisify` 吧。新的 loadScriptPromise(src) 将会达到同样的结果，但它只接受 src（没有回调）并返回 promise。

```js
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// 用法：
// loadScriptPromise('path/script.js').then(...)
```

现在，`loadScriptPromise` 非常适合基于 promise 的代码。

正如我们所看到的，它将所有工作都委托给原始的 loadScript，并提供了转换成 `promise resolve/reject` 的自己的回调。

在实际开发中，我们可能需要 promisify 很多函数，所以使用一个 helper 很有意义。我们将其称为 `promisify(f)`：它接受一个需要被 `promisify` 的函数 f，并返回一个包装（`wrapper`）函数。

该包装（wrapper）函数的功能和上面的代码相同：返回一个 `promise`，将调用传递给原始的函数 `f`，并在自定义的回调中跟踪结果：

```js
function promisify(f) {
  return function (...args) { // 返回一个包装函数（wrapper-function）
    return new Promise((resolve, reject) => {
      function callback(err, result) { // 我们对 f 的自定义的回调
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      f.call(this, ...args); // 调用原始的函数
    });
  };
};

// 用法：
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

这里我们假设，原始的函数期望一个带有两个参数 `(err, result)` 的回调。这就是我们最常遇到的形式。那么我们的自定义回调的格式完全正确，并且 promisify 在这种情况下非常有用。

但是如果原始的 `f` 期望一个带有更多参数的回调 `callback(err, res1, res2, ...)`，该怎么办呢？

下面是 `promisify` 的更高级的版本：如果像这样进行调用 `promisify(f, true)`，那么 promise 的结果将是回调结果的数组 `[res1, res2, ...]`：

```js
// promisify(f, true) 来获取结果数组
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // 我们自定义的 f 的回调
        if (err) {
          reject(err);
        } else {
          // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// 用法：
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

对于一些更奇特的回调格式，例如根本没有 err 的格式：`callback(result)`，我们可以手动 promisify 这样的函数，而不使用 helper。

也有一些具有更灵活一点的 promisification 函数的模块（module），例如 [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify)。在 Node.js 中，有一个内建的 promisify 函数 util.promisify。

> :information_source:请注意：

Promisification 是一种很好的方法，特别是在你使用 `async/await` 的时候（请看下一章），但不是回调的完全替代。

请记住，一个 promise 可能只有一个结果，但从技术上讲，一个回调可能被调用很多次。

因此，`promisification` 仅适用于调用一次回调的函数。进一步的调用将被忽略。

# 7. 微任务（Microtask）

Promise 的处理程序（handlers）`.then`、`.catch` 和 `.finally` 都是异步的。

即便一个 promise 立即被 `resolve`，`.then`、`.catch` 和 `.finally` **下面** 的代码也会在这些处理程序（handler）之前被执行。

示例代码如下：

```js
let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // 这个 alert 先显示
```

如果你运行它，你会首先看到 `code finished`，然后才是 `promise done`。

这很奇怪，因为这个 `promise` 肯定是一开始就完成的。

为什么 `.then` 会在之后才被触发？这是怎么回事？

## 7.1. 微任务队列（Microtask queue）

异步任务需要适当的管理。为此，ECMA 标准规定了一个内部队列 PromiseJobs，通常被称为“微任务队列（microtask queue）”（ES8 术语）。

如 [规范](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues) 中所述：

- 队列（queue）是先进先出的：首先进入队列的任务会首先运行。
- 只有在 JavaScript 引擎中没有其它任务在运行时，才开始执行任务队列中的任务。

或者，简单地说，当一个 promise 准备就绪时，它的 `.then/catch/finally` 处理程序（handler）就会被放入队列中：但是它们不会立即被执行。当 JavaScript 引擎执行完当前的代码，它会从队列中获取任务并执行它。

这就是为什么在上面那个示例中 “code finished” 会先显示。

![](https://zh.javascript.info//article/microtask-queue/promiseQueue.svg)

Promise 的处理程序（handler）总是会经过这个内部队列。

如果有一个包含多个 `.then/catch/finally` 的链，那么它们中的每一个都是异步执行的。也就是说，它会首先进入队列，然后在当前代码执行完成并且先前排队的处理程序（handler）都完成时才会被执行。

**如果执行顺序对我们很重要该怎么办？我们怎么才能让 code finished 在 promise done 之后运行呢？**

很简单，只需要像下面这样使用 `.then` 将其放入队列：

```js
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

现在代码就是按照预期执行的。

## 7.2. 未处理的 rejection

还记得 使用 promise 进行错误处理 一章中的 `unhandledrejection` 事件吗？

现在，我们可以确切地看到 `JavaScript` 是如何发现未处理的 rejection 的。

**如果一个 promise 的 error 未被在微任务队列的末尾进行处理，则会出现“未处理的 rejection”。**

正常来说，如果我们预期可能会发生错误，我们会在 promise 链上添加 .catch 来处理 error：

```js
let promise = Promise.reject(new Error("Promise Failed!"));
promise.catch((err) => alert("caught"));

// 不会运行：error 已经被处理
window.addEventListener("unhandledrejection", (event) => alert(event.reason));
```

但是如果我们忘记添加 `.catch`，那么，微任务队列清空后，JavaScript 引擎会触发下面这事件：

```js
let promise = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener("unhandledrejection", (event) => alert(event.reason));
```

如果我们迟一点再处理这个 error 会怎样？例如：

```js
let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch((err) => alert("caught")), 1000);

// Error: Promise Failed!
window.addEventListener("unhandledrejection", (event) => alert(event.reason));
```

现在，如果我们运行上面这段代码，我们会先看到 `Promise Failed!`，然后才是 `caught`。

如果我们并不了解微任务队列，我们可能会想：“为什么 unhandledrejection 处理程序（handler）会运行？我们已经捕获（catch）并处理了 error！”

但是现在我们知道了，当微任务队列中的任务都完成时，才会生成 `unhandledrejection`：引擎会检查 promise，如果 promise 中的任意一个出现 “rejected” 状态，unhandledrejection 事件就会被触发。

在上面这个例子中，被添加到 `setTimeout` 中的 `.catch` 也会被触发。只是会在 unhandledrejection 事件出现之后才会被触发，所以它并没有改变什么（没有发挥作用）。

## 7.3. 总结

Promise 处理始终是异步的，因为所有 promise 行为都会通过内部的 “promise jobs” 队列，也被称为“微任务队列”（ES8 术语）。

因此，.then/catch/finally 处理程序（handler）总是在当前代码完成后才会被调用。\*\*

如果我们需要确保一段代码在 .then/catch/finally 之后被执行，我们可以将它添加到链式调用的 .then 中。

在大多数 JavaScript 引擎中（包括浏览器和 Node.js），微任务（microtask）的概念与“事件循环（event loop）”和“宏任务（macrotasks）”紧密相关。由于这些概念跟 promise 没有直接关系，所以我们将在本教程另外一部分的 [事件循环：微任务和宏任务](https://zh.javascript.info/event-loop) 一章中对它们进行介绍。

# 8. Async/await

Async/await 是以更舒适的方式使用 promise 的一种特殊语法，同时它也非常易于理解和使用。

## 8.1. Async function

让我们以 `async` 这个关键字开始。它可以被放置在一个函数前面，如下所示：

```js
async function f() {
  return 1;
}
```

在函数前面的 “async” 这个单词表达了一个简单的事情：即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。

例如，下面这个函数返回一个结果为 1 的 `resolved promise`，让我们测试一下：

```js
async function f() {
  return 1;
}

f().then(alert); // 1
```

……我们也可以显式地返回一个 promise，结果是一样的：

```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

所以说，`async` 确保了函数返回一个 `promise`，也会将非 `promise` 的值包装进去。很简单，对吧？但不仅仅这些。还有另外一个叫 `await` 的关键词，它只在 `async` 函数内工作，也非常酷。

## 8.2. Await

语法如下：

```js
// 只在 async 函数内工作
let value = await promise;
```

关键字 `await` 让 `JavaScript` 引擎等待直到 promise 完成（settle）并返回结果。

这里的例子就是一个 1 秒后 resolve 的 promise：

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise; // 等待，直到 promise resolve (*)

  alert(result); // "done!"
}

f();
```

这个函数在执行的时候，“暂停”在了 `(*)` 那一行，并在 `promise settle` 时，拿到 `resul`t 作为结果继续往下执行。所以上面这段代码在一秒后显示 “done!”。

让我们强调一下：`await` 字面的意思就是让 JavaScript 引擎等待直到 `promise settle`，然后以 `promise` 的结果继续执行。这个行为不会耗费任何 CPU 资源，因为引擎可以同时处理其他任务：执行其他脚本，处理事件等。

相比于 `promise.then`，它只是获取 `promise` 的结果的一个更优雅的语法，同时也更易于读写。

> :warning:不能在普通函数中使用 `await`

如果我们尝试在非 async 函数中使用 await 的话，就会报语法错误：

```js
function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
```

如果函数前面没有 `async` 关键字，我们就会得到一个语法错误。就像前面说的，await 只在 async 函数 中有效。

让我们拿 Promise 链 那一章的 `showAvatar()` 例子，并将其改写成 async/await 的形式：

1. 我们需要用 `await` 替换掉 .then 的调用。
2. 另外，我们需要在函数前面加上 async 关键字，以使它们能工作。

```js
async function showAvatar() {
  // 读取我们的 JSON
  let response = await fetch("/article/promise-chaining/user.json");
  let user = await response.json();

  // 读取 github 用户信息
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 显示头像
  let img = document.createElement("img");
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 等待 3 秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

简洁明了，是吧？比之前可强多了。

> :information_source: `await` 不能在顶层代码运行

刚开始使用 `await` 的人常常会忘记 `await` 不能用在顶层代码中。例如，下面这样就不行：

```js
// 用在顶层代码中会报语法错误
let response = await fetch("/article/promise-chaining/user.json");
let user = await response.json();
```

但我们可以将其包裹在一个匿名 `async` 函数中，如下所示：

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

> :information_source: `await` 接受 “thenables”

像 `promise.then` 那样，await 允许我们使用 `thenable` 对象（那些具有可调用的 then 方法的对象）。这里的想法是，第三方对象可能不是一个 promise，但却是 promise 兼容的：如果这些对象支持 .then，那么就可以对它们使用 await。

这有一个用于演示的 `Thenable` 类，下面的 await 接受了该类的实例：

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000ms 后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // 等待 1 秒，之后 result 变为 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

如果`await` 接收了一个非 promise 的但是提供了 `.then` 方法的对象，它就会调用这个 `.then` 方法，并将内建的函数 `resolve` 和 `reject` 作为参数传入（就像它对待一个常规的 Promise executor 时一样）。然后 `await` 等待直到这两个函数中的某个被调用（在上面这个例子中发生在 `(*)` 行），然后使用得到的结果继续执行后续任务。

> :information_source: Class 中的 async 方法

要声明一个 class 中的 async 方法，只需在对应方法前面加上 `async` 即可：

```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter().wait().then(alert); // 1
```

这里的含义是一样的：它确保了方法的返回值是一个 `promise` 并且可以在方法中使用 await。

## 8.3. Error 处理

如果一个 promise 正常 resolve，await promise 返回的就是其结果。但是如果 promise 被 reject，它将 throw 这个 error，就像在这一行有一个 throw 语句那样。

这个代码：

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

……和下面是一样的：

```js
async function f() {
  throw new Error("Whoops!");
}
```

在真实开发中，promise 可能需要一点时间后才 reject。在这种情况下，在 await 抛出（throw）一个 error 之前会有一个延时。

我们可以用 try..catch 来捕获上面提到的那个 error，与常规的 throw 使用的是一样的方式：

```js
async function f() {
  try {
    let response = await fetch("http://no-such-url");
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

如果有 `error` 发生，执行控制权马上就会被移交至 `catch` 块。我们也可以用 `try` 包装多行 `await` 代码：

```js
async function f() {
  try {
    let response = await fetch("/no-user-here");
    let user = await response.json();
  } catch (err) {
    // 捕获到 fetch 和 response.json 中的错误
    alert(err);
  }
}

f();
```

如果我们没有 `try..catch`，那么由异步函数 `f()` 的调用生成的 `promise`将变为 `rejected`。我们可以在函数调用后面添加 .catch 来处理这个 `error`：

```js
async function f() {
  let response = await fetch("http://no-such-url");
}

// f() 变成了一个 rejected 的 promise
f().catch(alert); // TypeError: failed to fetch // (*)
```

如果我们忘了在这添加 .catch，那么我们就会得到一个未处理的 promise error（可以在控制台中查看）。我们可以使用在 [使用 promise 进行错误处理](https://zh.javascript.info/promise-error-handling) 一章中所讲的全局事件处理程序 unhandledrejection 来捕获这类 error。

> :information_source:async/await 和 promise.then/catch

当我们使用 `async/await` 时，几乎就不会用到 `.then` 了，因为 `await` 为我们处理了等待。并且我们使用常规的 `try..catch` 而不是 .catch。这通常（但不总是）更加方便。

但是当我们在代码的顶层时，也就是在所有 `async` 函数之外，我们在语法上就不能使用 `await` 了，所以这时候通常的做法是添加 `.then/catch` 来处理最终的结果（result）或掉出来的（falling-through）error，例如像上面那个例子中的 (\*) 行那样。

> :information_source: async/await 可以和 Promise.all 一起使用

当我们需要同时等待多个 promise 时，我们可以用 Promise.all 把它们包装起来，然后使用 await：

```js
// 等待结果数组
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

如果出现 error，也会正常传递，从失败了的 `promise` 传到 `Promise.all`，然后变成我们能通过使用 `try..catch` 在调用周围捕获到的异常（exception）。

## 8.4. 总结

函数前面的关键字 `async` 有两个作用：

1. 让这个函数总是返回一个 promise。
2. 允许在该函数内使用 `await`。

Promise 前的关键字 `await` 使 JavaScript 引擎等待该 `promise settle`，然后：

1. 如果有 `error`，就会抛出异常 — 就像那里调用了 throw error 一样。
2. 否则，就返回结果。

这两个关键字一起提供了一个很好的用来编写异步代码的框架，这种代码易于阅读也易于编写。

有了 async/await 之后，我们就几乎不需要使用 [promise.then/catch](http://promise.then/catch)，但是不要忘了它们是基于 promise 的，因为有些时候（例如在最外层作用域）我们不得不使用这些方法。并且，当我们需要同时等待需要任务时，`Promise.all` 是很好用的。
