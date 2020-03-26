# 09 - Dev Tools Domination
这一次的练习主要是为了熟悉和掌握常见的非常有用的Console调试小技巧。

# JS
## console
**Console** 对象可以接入浏览器控制台
Console 对象可以从任何全局对象中访问到，如 Window，WorkerGlobalScope 以及控制台属性中的特殊变量。它被定义为 Window.console，而且可直接通过 console 调用。例：
```js
console.log("Failed to open the specified link")
```
[MDN的console对象文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Console)

###  consoloe.log
向 Web 控制台输出一条消息。

[MDN的log文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Console/log)

**语法**
```js
console.log(obj1 [, obj2, ..., objN);
console.log(msg [, subst1, ..., substN);
console.log('String: %s, Int: %d,Float: %f, Object: %o', str, ints, floats, obj)
console.log(`temp的值为: ${temp}`)
```

**参数**
- obj1 ... objN
  - 一个用于输出的 JavaScript 对象列表。其中每个对象会以字符串的形式按照顺序依次输出到控制台。
- msg
  - 一个JavaScript字符串，其中包含零个或多个替代字符串。
- subst1 ... substN
  - JavaScript 对象，用来依次替换msg中的替代字符串。你可以在替代字符串中指定对象的输出格式。

### console.warn
向 Web 控制台输出一条警告信息。
>Note: 此特性在 Web Worker 中可用。

>Note: 在火狐浏览器里，警告会有一个小感叹号图标在 Web 控制台信息前面。

**语法**
```js
console.warn(obj1 [, obj2, ..., objN]);
console.warn(msg [, subst1, ..., substN]);
```

**参数**
- obj1 ... objN
  - 要输出的 Javascript 对象列表。其中每个对象会以字符串的形式按照顺序依次输出到控制台。
- msg
  - 一个 JavaScript 字符串，其中包含零个或多个替代字符串。
- subst1 ... substN
  - 零个或多个 Javascript 对象 依次替换 msg 中的替代字符串，你可以在替代字符串中指定对象的输出格式。

### console.error
向 Web 控制台输出一条错误消息。
>Note: 此特性在 Web Worker 中可用。

**语法**
```js
console.error(obj1 [, obj2, ..., objN]);
console.error(msg [, subst1, ..., substN]);
console.exception(obj1 [, obj2, ..., objN]);
console.exception(msg [, subst1, ..., substN]);
```
>注意: console.exception() 是 console.error() 的别名；它们功能相同。

**参数**
- obj1 ... objN
  - 要输出的 JavaScript 对象列表。 这些对象的字符串形式按顺序加起来然后输出。
- msg
  - 一个字符串，它包含零个或多个替代字符串。
- subst1 ... substN
  - JavaScript 对象可以用此来替换msg里的替代字符串。你可以控制输出的格式。


### console.assert
console.assert()方法在Node.js中的实现和浏览器中可用的console.assert()方法实现是不同的。在浏览器中当console.assert()方法接受到一个值为假断言的时候，会向控制台输出传入的内容，但是并不会中断代码的执行，而在Node.js v10.0.0之前，一个值为假的断言也将会导致一个AssertionError被抛出，使得代码执行被打断。

v10.0.0修复了此差异，所以现在console.assert()在Node 和浏览器中执行行为相同 。

[MDN的assert文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Console/assert)

**语法**

```js
console.assert(assertion, obj1 [, obj2, ..., objN]);
console.assert(assertion, msg [, subst1, ..., substN]); // c-like message formatting
```

**参数**
- assertion
  - 一个布尔表达式。如果assertion为假，消息将会被输出到控制台之中。
- obj1 ... objN
  - 被用来输出的Javascript对象列表，最后输出的字符串是各个对象依次拼接的结果。
- msg
  - 一个包含零个或多个子串的Javascript字符串。
- subst1 ... substN
  - 各个消息作为字串的Javascript对象。这个参数可以让你能够控制输出的格式。

### consoloe.clear()
>该特性是非标准的，请尽量不要在生产环境中使用它！

清空控制台.

**语法**
```js
console.clear();
```

控制台会打印
```js
Console was cleared
```

### consoloe.grouColllapsed()

在 Web控制台上创建一个新的分组.随后输出到控制台上的内容都会被添加一个缩进,表示该内容属于当前分组,直到调用console.groupEnd() 之后,当前分组结束.

和 console.group()方法的不同点是,新建的分组默认是折叠的.用户必须点击一个按钮才能将折叠的内容打开.

**语法**
```js
console.groupCollapsed(label);
```

**参数**
- label:可选,分组标签,折叠分组的组名

### console.count()
>Note:该特性是非标准的，请尽量不要在生产环境中使用它！

**语法**
```js
console.count(lable)
```
输出 count() 被调用的次数。此函数接受一个可选参数 label。
  - 如果有 label，此函数输出为那个指定的 label 和 count() 被调用的次数。
  - 如果 label 被忽略，此函数输出`label为default`的在其所处位置上被调用的次数。
>Note: 此特性在 Web Worker 中可用。

### console.time

你可以启动一个计时器来跟踪某一个操作的占用时长。每一个计时器必须拥有唯一的名字，页面中最多能同时运行10,000个计时器。当以此计时器名字为参数调用 console.timeEnd() 时，浏览器将以毫秒为单位，输出对应计时器所经过的时间。
>Note: 此特性在 Web Worker 中可用。

**语法**
```js
console.time(timerName);
```
**参数**
timerName
- 新计时器的名字。 用来标记这个计时器，作为参数调用 console.timeEnd()可以停止计时并将经过的时间在终端中打印出来.

### console.timeEnd 
>该特性是非标准的，请尽量不要在生产环境中使用它！

停止一个通过 console.time() 启动的计时器

**语法**
```js
console.timeEnd(label);
```

**参数**

label
  - 需要停止的计时器名字。一旦停止，计时器所经过的时间会被自动输出到控制台。






