# Generator
常规函数只会返回一个单一值（或者不返回任何值）。

而 Generator 可以按需一个接一个地返回（“yield”）多个值。它们可与 iterable 完美配合使用，从而可以轻松地创建数据流。

## Generator 函数
要创建一个 generator，我们需要一个特殊的语法结构：function*，即所谓的 “generator function”。

它看起来像这样：
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```
Generator 函数与常规函数的行为不同。在此类函数被调用时，它不会运行其代码。而是返回一个被称为 “generator object” 的特殊对象，来管理执行流程。

我们来看一个例子：
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" 创建了一个 "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]
```
到目前为止，上面这段代码中的 **函数体** 代码还没有开始执行：

![](https://zh.javascript.info//article/generators/generateSequence-1.svg)

一个 generator 的主要方法就是 `next()`。当被调用时（译注：指 next() 方法），它会恢复上图所示的运行，执行直到最近的` yield <value>` 语句（value 可以被省略，默认为 undefined）。然后函数执行暂停，并将产出的（yielded）值返回到外部代码。

`next()` 的结果始终是一个具有两个属性的对象：

- `value`: 产出的（yielded）的值。
- `done`: 如果 generator 函数已执行完成则为 true，否则为 false。

例如，我们可以创建一个 generator 并获取其第一个产出的（yielded）值：
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}
```
截至目前，我们只获得了第一个值，现在函数执行处在第二行：

![](https://zh.javascript.info//article/generators/generateSequence-2.svg)

让我们再次调用 `generator.next()`。代码恢复执行并返回下一个 yield 的值：
```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false
```

![](https://zh.javascript.info//article/generators/generateSequence-3.svg)

如果我们第三次调用 `generator.next()`，代码将会执行到 return 语句，此时就完成这个函数的执行
```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}
```

![](https://zh.javascript.info//article/generators/generateSequence-4.svg)

现在 `generator` 执行完成。我们通过 `done:true` 可以看出来这一点，并且将 value:3 处理为最终结果

再对 `generator.next()` 进行新的调用不再有任何意义。如果我们这样做，它将返回相同的对象：`{done: true}`。

>:information_source: function* f(…) 或 function *f(…)？

这两种语法都是对的。

但是通常更倾向于第一种语法，因为星号 * 表示它是一个 generator 函数，它描述的是函数种类而不是名称，因此 * 应该和 function 关键字紧贴一起。

## Generator 是可迭代的
当你看到 `next()` 方法，或许你已经猜到了 generator 是 可迭代（iterable）的。（译注：`next()` 是 iterator 的必要方法）

我们可以使用 `for..of` 循环遍历它所有的值：
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1，然后是 2
}
```
`for..of` 写法是不是看起来比 `.next().value` 优雅多了？

……但是请注意：上面这个例子会先显示 1，然后是 2，然后就没了。它不会显示 3！

这是因为当 `done: true` 时，for..of 循环会忽略最后一个 value。因此，如果我们想要通过 `for..of` 循环显示所有的结果，我们必须使用 yield 返回它们：
```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1，然后是 2，然后是 3
}
```
因为 generator 是可迭代的，我们可以使用 iterator 的所有相关功能，例如：spread 语法 `...`：
```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```
在上面这段代码中，`...generateSequence()` 将可迭代的 generator 对象转换为了一个数组

## 使用 generator 进行迭代
在前面的 `Iterable object`（可迭代对象） 一章中，我们创建了一个可迭代的 range 对象，它返回 from..to 的值。

现在，我们回忆一下代码：
```js
let range = {
  from: 1,
  to: 5,

  // for..of range 在一开始就调用一次这个方法
  [Symbol.iterator]() {
    // ...它返回 iterator object：
    // 后续的操作中，for..of 将只针对这个对象，并使用 next() 向它请求下一个值
    return {
      current: this.from,
      last: this.to,

      // for..of 循环在每次迭代时都会调用 next()
      next() {
        // 它应该以对象 {done:.., value :...} 的形式返回值
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// 迭代整个 range 对象，返回从 `range.from` 到 `range.to` 范围的所有数字
alert([...range]); // 1,2,3,4,5
```
我们可以通过提供一个 `generator` 函数作为 `Symbol.iterator`，来使用 `generator` 进行迭代：

下面是一个相同的 range，但紧凑得多：
```js
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```
之所以代码正常工作，是因为` range[Symbol.iterator]()` 现在返回一个 `generator`，而 generator 方法正是 for..of 所期望的：

- 它具有 `.next()` 方法
- 它以 `{value: ..., done: true/false}` 的形式返回值

当然，这不是巧合。Generator 被添加到 JavaScript 语言中是有对 iterator 的考量的，以便更容易地实现 iterator。

带有 `generator` 的变体比原来的 `range` 迭代代码简洁得多，并且保持了相同的功能。

>:information_source:Generator 可以永远产出（yield）值

在上面的示例中，我们生成了有限序列，但是我们也可以创建一个生成无限序列的 generator，它可以一直产出（yield）值。例如，无序的伪随机数序列。

这种情况下肯定需要在 `generator` 的 `for..of` 循环中添加一个 break（或者 return）。否则循环将永远重复下去并挂起。

## Generator 组合
Generator 组合（composition）是 generator 的一个特殊功能，它允许透明地（transparently）将 generator 彼此“嵌入（embed）”到一起。

例如，我们有一个生成数字序列的函数：
```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

现在，我们想重用它来生成一个更复杂的序列：

- 首先是数字 `0..9`（字符代码为 48…57），
- 接下来是大写字母 `A..Z`（字符代码为 65…90）
- 接下来是小写字母 `a...z`（字符代码为 97…122）

我们可以对这个序列进行应用，例如，我们可以从这个序列中选择字符来创建密码（也可以添加语法字符），但让我们先生成它。

在常规函数中，要合并其他多个函数的结果，我们需要调用它们，存储它们的结果，最后再将它们合并到一起。

对于 generator 而言，我们可以使用 yield* 这个特殊的语法来将一个 generator “嵌入”（组合）到另一个 generator 中：

组合的 generator 的例子：
```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```
`yield*` 指令将执行 **委托** 给另一个 `generator`。这个术语意味着 yield* gen 在 generator gen 上进行迭代，并将其产出（yield）的值透明地（transparently）转发到外部。就好像这些值就是由外部的 generator yield 的一样。

执行结果与我们内联嵌套 generator 中的代码获得的结果相同：
```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```
Generator 组合（composition）是将一个 generator 流插入到另一个 generator 流的自然的方式。它不需要使用额外的内存来存储中间结果。

## “yield” 是一条双向路
目前看来，generator 和可迭代对象类似，都具有用来生成值的特殊语法。但实际上，generator 更加强大且灵活。

这是因为 yield 是一条双向路（two-way street）：它不仅可以向外返回结果，而且还可以将外部的值传递到 generator 内。

调用 `generator.next(arg)`，我们就能将参数 arg 传递到 generator 内部。这个 arg 参数会变成 yield 的结果。

我们来看一个例子：
```js
function* gen() {
  // 向外部代码传递一个问题并等待答案
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield 返回的 value

generator.next(4); // --> 将结果传递到 generator 中
```

![](https://zh.javascript.info/article/generators/genYield2.svg)

1. 第一次调用 `generator.next()` 应该是不带参数的（如果带参数，那么该参数会被忽略）。它开始执行并返回第一个 yield "2 + 2 = ?" 的结果。此时，generator 执行暂停，而停留在 (*) 行上。
2. 然后，正如上面图片中显示的那样，yield 的结果进入调用代码中的 question 变量。
3. 在 `generator.next(4)`，generator 恢复执行，并获得了 4 作为结果：let result = 4。

请注意，外部代码不必立即调用 `next(4)`。外部代码可能需要一些时间。这没问题：generator 将等待它。

例如：
```js
// 一段时间后恢复 generator
setTimeout(() => generator.next(4), 1000);
```
我们可以看到，与常规函数不同，generator 和调用 generator 的代码可以通过在 `next/yield` 中传递值来交换结果。

为了讲得更浅显易懂，我们来看另一个例子，其中包含了许多调用：
```js
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true
```
执行图：
![](https://zh.javascript.info/article/generators/genYield2-2.svg)


1. 第一个 `.next()` 启动了 generator 的执行……执行到达第一个 yield。
结果被返回到外部代码中。
2. 第二个 `.next(4)` 将 4 作为第一个 yield 的结果传递回 generator 并恢复 generator 的执行。
3. ……执行到达第二个 yield，它变成了 generator 调用的结果。
4. 第三个 `next(9)` 将 9 作为第二个 yield 的结果传入 generator 并恢复 generator 的执行，执行现在到达了函数的最底部，所以返回 done: true。

这个过程就像“乒乓球”游戏。每个 `next(value)`（除了第一个）传递一个值到 `generator` 中，该值变成了当前` yield` 的结果，然后获取下一个 `yield` 的结果。

## generator.throw
正如我们在上面的例子中观察到的那样，外部代码可能会将一个值传递到 `generator`，作为 yield 的结果

……但是它也可以在那里发起（抛出）一个 error。这很自然，因为 error 本身也是一种结果。

要向 yield 传递一个 `error`，我们应该调用 generator.throw(err)。在这种情况下，err 将被抛到对应的 yield 所在的那一行。

例如，"2 + 2?" 的 yield 导致了一个 error
```js
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // 显示这个 error
  }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error("The answer is not found in my database")); // (2)
```
在 (2) 行引入到 `generator` 的 error 导致了在 (1) 行中的 yield 出现了一个异常。在上面这个例子中，try..catch 捕获并显示了这个 error。

如果我们没有捕获它，那么就会像其他的异常一样，它将从 generator “掉出”到调用代码中。

调用代码的当前行是 generator.throw 所在的那一行，标记为 (2)。所以我们可以在这里捕获它，就像这样：
```js
function* generate() {
  let result = yield "2 + 2 = ?"; // 这行出现 error
}

let generator = generate();

let question = generator.next().value;

try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // 显示这个 error
}
```
如果我们没有在那里捕获这个 error，那么，通常，它会掉入外部调用代码（如果有），如果在外部也没有被捕获，则会杀死脚本。

## 总结
- Generator 是通过 generator 函数 `function* f(…) {…}` 创建的。
- 在 generator（仅在）内部，存在 yield 操作。
- 外部代码和 generator 可能会通过 next/yield 调用交换结果。

在现代 JavaScript 中，generator 很少被使用。但有时它们会派上用场，因为函数在执行过程中与调用代码交换数据的能力是非常独特的。而且，当然，它们非常适合创建可迭代对象。

并且，在下一章我们将会学习 async generator，它们被用于在` for await ... of` 循环中读取异步生成的数据流（例如，通过网络分页提取 (paginated fetches over a network)）。

在 Web 编程中，我们经常使用数据流，因此这是另一个非常重要的使用场景。

# Async iterator 和 generator
异步迭代器（iterator）允许我们对按需通过异步请求而得到的数据进行迭代。例如，我们通过网络分段（chunk-by-chunk）下载数据时。异步生成器（generator）使这一步骤更加方便。

首先，让我们来看一个简单的示例以掌握语法，然后再看一个实际用例。

## Async iterator
异步迭代器（async iterator）与常规的迭代器类似，不过语法上有一点区别。

一个“常规的”可迭代对象，即我们在 Iterable object（可迭代对象） 一章中提到的，看起来像这样：
```js
let range = {
  from: 1,
  to: 5,

  // 在刚使用 for..of 循环时，for..of 就会调用一次这个方法
  [Symbol.iterator]() {
    // ...它返回 iterator object：
    // 后续的操作中，for..of 将只针对这个对象
    // 并使用 next() 向它请求下一个值
    return {
      current: this.from,
      last: this.to,

      // for..of 循环在每次迭代时都会调用 next()
      next() { // (2)
        // 它应该以对象 {done:.., value :...} 的形式返回值
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
```
有需要的话，你可以返回 Iterable object（可迭代对象） 一章学习关于常规迭代器（iterator）的详细内容。

为了使对象可以异步迭代：
1. 我们需要使用 Symbol.asyncIterator 取代 Symbol.iterator。
2. next() 方法应该返回一个 promise。
3. 我们应该使用` for await (let item of iterable)` 循环来迭代这样的对象

接下来，让我们创建一个类似于之前的，可迭代的 range 对象，不过现在它会按照每秒一个的速度，异步地返回值：
```js
let range = {
  from: 1,
  to: 5,

  // 在刚使用 for await..of 循环时，for await..of 就会调用一次这个方法
  [Symbol.asyncIterator]() { // (1)
    // ...它返回 iterator object：
    // 后续的操作中，for await..of 将只针对这个对象
    // 并使用 next() 向它请求下一个值
    return {
      current: this.from,
      last: this.to,

      // for await..of 循环在每次迭代时都会调用 next()
      async next() { // (2)
        // 它应该以对象 {done:.., value :...} 的形式返回值
        // (会被 async 自动包装成一个 promise)

        // 可以在内部使用 await，执行异步任务：
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }

})()
```
正如我们所看到的，其结构与常规的 iterator 类似:

1. 为了使一个对象可以异步迭代，它必须具有方法 `Symbol.asyncIterator (1)`。
2. 这个方法必须返回一个带有` next()` 方法的对象，`next()` 方法会返回一个 promise (2)。
3. 这个 `next()` 方法可以不是 async 的，它可以是一个返回值是一个 promise 的常规的方法，但是使用 async 关键字可以允许我们在方法内部使用 await，所以会更加方便。这里我们只是用于延迟 1 秒的操作 (3)。
4. 我们使用 `for await(let value of range) (4)` 来进行迭代，也就是在 for 后面添加 await。它会调用一次 `range[Symbol.asyncIterator]()` 方法一次，然后调用它的 `next(`) 方法获取值。

这是一个小备忘单：


<br/>|Iterator	|Async iterator
--|--|--
提供 iterator 的对象方法	|Symbol.iterator	|Symbol.asyncIterator
next() 返回的值是	|任意值	|Promise
要进行循环，使用	|for..of	for |await..of

>:warning: Spread 语法 ... 无法异步工作

需要常规的同步 iterator 的功能，无法与异步 iterator 一起使用。

例如，spread 语法无法工作：
```js
alert( [...range] ); // Error, no Symbol.iterator
```
这很正常，因为它期望找到 `Symbol.iterator`，跟 `for..of` 没有 await 一样。并非 `Symbol.asyncIterator`。

## Async generator
正如我们所知，JavaScript 也支持生成器（generator），并且它们也是可迭代的。

让我们回顾一下 Generator 一章的序列生成器（generator）。它生成从 start 到 end 的一系列值：
```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
```
在常规的 `generator` 中，我们无法使用 await。所有的值都必须同步获得：`for..of` 中没有延时的地方，它是一个同步结构。

但是，如果我们需要在 `generator` 内使用 await 该怎么办呢？我们以执行网络请求为例子。

没问题，只需要在它前面加上 `async` 即可，就像这样：
```js
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // 耶，可以使用 await 了！
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5
  }

})();
```
现在，我们有了 `async generator`，可以使用 `for await...of` 进行迭代。

这确实非常简单。我们加了 `async` 关键字，然后我们就能在 `generator` 内部使用 `await` 了，依赖于 promise 和其他异步函数。

从技术上来讲，async generator 的另一个不同之处在于，它的 `generatr.next()` 方法现在也是异步的，它返回 promise。

在一个常规的 generator 中，我们使用 result = generator.next() 来获得值。但在一个 async generator 中，我们应该添加 await 关键字，像这样：
```js
result = await generator.next(); // result = {value: ..., done: true/false}

```
## Async iterable
正如我们所知道的，要使一个对象可迭代，我们需要给它添加 `Symbol.iterator`。
```js
let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
}
```
对于 `Symbol.iterator` 来说，一个通常的做法是返回一个 generator，而不是像前面的例子中那样返回一个带有 `next()` 方法的普通对象。

让我们回顾一下来自之前 `Generator` 一章中的一个示例：
```js
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
```
这有一个自定义的对象 range，它是可迭代的，并且它的 `generator *[Symbol.iterator]` 实现了列出值的逻辑。

如果们想要给 generator 加上异步行为，那么我们应该将 Symbol.iterator 替换成异步的 `Symbol.asyncIterator`：
```js
let range = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() { // 等价于 [Symbol.asyncIterator]: async function*()
    for(let value = this.from; value <= this.to; value++) {

      // 在 value 之间暂停一会儿，等待一些东西
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for await (let value of range) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5
  }

})();
```
现在，value 之间的延迟为 1 秒。

## 实际的例子
到目前为止，我们为了获得基础的了解，看到的都是简单的例子。接下来，我们来看一个实际的用例。

目前，有很多在线服务都是发送的分页数据（paginated data）。例如，当我们需要一个用户列表时，一个请求只返回一个预定义数量的用户（例如 100 个用户）— “一页”，并提供了指向下一页的 URL。

这种模式非常常见。不仅可用于获取用户列表，这种模式还可以用于任意东西。例如，GitHub 允许使用相同的分页提交（paginated fashion）的方式找回 commit：
- 我们应该提交一个请求到这种格式的 `URL：https://api.github.com/repos/<repo>/commits`。
- 它返回一个包含 30 条 commit 的 JSON，并在返回的 Link header 中提供了指向下一页的链接。
- 然后我们可以将该链接用于下一个请求，以获取更多 commit，以此类推。

但是我们希望有一个更简单的 API：具有 commit 的可迭代对象，然后我们就可以像这样来遍历它们：
```js
let repo = 'javascript-tutorial/en.javascript.info'; // 用于获取 commit 的 GitHub 仓库

for await (let commit of fetchCommits(repo)) {
  // 处理 commit
}
```
我们想创建一个函数 `fetchCommits(repo)`，用来在任何我们有需要的时候发出请求，来为我们获取 commit。并且让它关注于所有分页的数据。对于我们来说，它就是一个简单的 for await..of。

通过使用 async generator，我们可以很容易地实现它：
```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github 要求 user-agent header
    });

    const body = await response.json(); // (2) 响应的是 JSON（array of commits）

    // (3) 前往下一页的 URL 在 header 中，提取它
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) 一个接一个地 yield commit，直到最后一页
      yield commit;
    }
  }
}
```
1. 我们使用浏览器的 fetch 方法从远程 URL 下载数据。它允许我们提供授权和其他 header，如果需要 — 这里 GitHub 需要的是 User-Agent。
2. `fetch` 的结果被解析为 JSON。这又是 fetch 特定的方法。
3. 我们应该从响应（response）的 Link header 中获取前往下一页的 URL。它有一个特殊的格式，所以我们对它使用正则表达式（regexp）。前往下一页的 URL 看起来就像这样 `https://api.github.com/repositories/93253246/commits?page=2`。这是由 GitHub 自己生成的。
4. 然后我们将接收到的所有 commit 都 yield 出来，当它 yield 完成时，将触发下一个 while(url) 迭代，并发出下一个请求。

这是一个使用示例（在控制台中显示 commit 的作者）
```js
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // 让我们在获取了 100 个 commit 时停止
      break;
    }
  }

})();
```
这就是我们想要的。从外部看不到分页请求（paginated requests）的内部机制。对我们来说，它只是一个返回 commit 的 async generator。

## 总结
常规的 iterator 和 generator 可以很好地处理那些不需要花费时间来生成的的数据。

当我们期望异步地，有延迟地获取数据时，可以使用它们的 async counterpart，并且使用 `for await..of` 替代 `for..of`。

Async iterator 与常规 iterator 在语法上的区别：


<br/>|Iterable	|Async Iterable
--|--|--
提供 iterator 的对象方法	|Symbol.iterator	|Symbol.asyncIterator
next() 返回的值是	|{value:…, done: true/false}	|resolve 成 {value:…, done: true/false} 的 Promise

Async generator 与常规 generator 在语法上的区别：

<br/>|Generator	|Async generator
--|--|--
声明方式	|function*	|async function*
next() 返回的值是	|{value:…, done: true/false}	|resolve 成 {value:…, done: true/false} 的 Promise

在 Web 开发中，我们经常会遇到数据流，它们分段流动（flows chunk-by-chunk）。例如，下载或上传大文件。

我们可以使用 `async generator` 来处理此类数据。值得注意的是，在一些环境，例如浏览器环境下，还有另一个被称为 `Streams` 的 API，它提供了特殊的接口来处理此类数据流，转换数据并将数据从一个数据流传递到另一个数据流（例如，从一个地方下载并立即发送到其他地方）。