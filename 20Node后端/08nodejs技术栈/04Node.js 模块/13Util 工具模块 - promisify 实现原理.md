# Node.js 源码解析 util.promisify 如何将 Callback 转为 Promise

Nodejs util 模块提供了很多工具函数。为了解决回调地狱问题，Nodejs v8.0.0 提供了 promisify 方法可以将 Callback 转为 Promise 对象。

工作中对于一些老项目，有 callback 的通常也会使用 util.promisify 进行转换，之前更多是知其然不知其所以然，本文会从基本使用和对源码的理解实现一个类似的函数功能。

## 1. Promisify 简单版本实现
在介绍 `util.promisify` 的基础使用之后，实现一个自定义的 `util.promisify` 函数的简单版本。

### 1. util promisify 基本使用
将 callback 转为 promise 对象，首先要确保这个 callback 为一个错误优先的回调函数，即 (err, value) => ... err 指定一个错误参数，value 为返回值。

以下将以 fs.readFile 为例进行介绍。

#### 创建一个 text.txt 文件

创建一个 text.txt 文件，写入一些自定义内容，下面的 Demo 中我们会使用 fs.readFile 来读取这个文件进行测试。
```bash
// text.txt
Nodejs Callback 转 Promise 对象测试
```
#### 传统的 Callback 写法
```js
const util = require('util');

fs.readFile('text.txt', 'utf8', function(err, result) {
  console.error('Error: ', err); 
  console.log('Result: ', result); // Nodejs Callback 转 Promise 对象测试
});
```
#### Promise 写法

这里我们使用 `util.promisify` 将 `fs.readFile` 转为 `Promise` 对象，之后我们可以进行 `.then`、`.catch` 获取相应结果
```js
const { promisify } = require('util');
const readFilePromisify = util.promisify(fs.readFile); // 转化为 promise

readFilePromisify('text.txt', 'utf8')
  .then(result => console.log(result)) // Nodejs Callback 转 Promise 对象测试
  .catch(err => console.log(err));
```

### 2. 自定义 mayJunPromisify 函数实现
自定义 mayJunPromisify 函数实现 callback 转换为 promise，核心实现如下：

- 行 {1} 校验传入的参数 original 是否为 Function，不是则抛错
- `promisify(fs.readFile)` 执行之后会返回一个函数 fn，行 {2} 定义待返回的 fn 函数，行 {3} 处返回
- fn 返回的是一个 `Promise` 对象，在返回的 `Promise` 对象里执行 `callback` 函数

```js
function mayJunPromisify(original) {
  if (typeof original !== 'function') { // {1} 校验
    throw new Error('The "original" argument must be of type Function. Received type undefined')
  }

  function fn(...args) { // {2} 
    return new Promise((resolve, reject) => {
      try {
        // original 例如，fs.readFile.call(this, 'filename', 'utf8', (err, result) => ...)
        original.call(this, ...args, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch(err) {
        reject(err);
      }
    });
  }

  return fn; // {3}
}
```
现在使用我们自定义的 `mayJunPromisify` 函数做一个测试
```js
const readFilePromisify = mayJunPromisify(fs.readFile);

readFilePromisify('text.txt', 'utf8')
  .then(result => console.log(result)) // Nodejs Callback 转 Promise 对象测试
  .catch(err => console.log(err));
```
## 2. Promisify 自定义 Promise 函数版本实现
另一个功能是可以使用 `util.promisify.custom` 符号重写 `util.promisify` 返回值。
### 1. util.promisify.custom 基本使用
在 fs.readFile 上定义 `util.promisify.custom` 符号，其功能为禁止读取文件。

注意顺序要在 `util.promisify` 之前。
```js
fs.readFile[util.promisify.custom] = () => {
  return Promise.reject('该文件暂时禁止读取');
}

const readFilePromisify = util.promisify(fs.readFile);

readFilePromisify('text.txt', 'utf8')
  .then(result => console.log(result))
  .catch(err => console.log(err)); // 该文件暂时禁止读取
```
### 2. 自定义 mayJunPromisify.custom 实现
- 定义一个 Symbol 变量 `kCustomPromisifiedSymbol` 赋予 `mayJunPromisify.custom`
- 行 {1} 校验是否有自定义的 `promise` 化函数
- 行 {2} 自定义的 `mayJunPromisify.custom` 也要保证是一个函数，否则抛错
- 行 {3} 直接返回自定义的 `mayJunPromisify.custom` 函数，后续的 fn 函数就不会执行了，因此在这块也就重写了 `util.promisify` 返回值

```js
// 所以说 util.promisify.custom 是一个符号
const kCustomPromisifiedSymbol = Symbol('util.promisify.custom');
mayJunPromisify.custom = kCustomPromisifiedSymbol;

function mayJunPromisify(original) {
  if (typeof original !== 'function') {
    throw new Error('The "original" argument must be of type Function. Received type undefined')
  }

  // 变动之处 -> start
  if (original[kCustomPromisifiedSymbol]) { // {1}
    const fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') { // {2}
      throw new Error('The "mayJunPromisify.custom" property must be of type Function. Received type number');
    }

    // {3}
    return Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
  }
  // end <- 变动之处

  function fn(...args) {
    ...
  }

  return fn;
}
```
同样测试下我们自定义的 `mayJunPromisify.custom` 函数。
```js
fs.readFile[mayJunPromisify.custom] = () => {
  return Promise.reject('该文件暂时禁止读取');
}

const readFilePromisify = mayJunPromisify(fs.readFile);

readFilePromisify('text.txt', 'utf8')
  .then(result => console.log(result))
  .catch(err => console.log(err)); // 该文件暂时禁止读取
```
## 3. Promisify 回调函数的多参转换
通常情况下我们是 `(err, value) => ...` 这种方式实现的，结果只有 value 一个参数，但是呢有些例外情况，例如 dns.lookup 它的回调形式是 `(err, address, family) => ...` 拥有三个参数，同样我们也要对这种情况做兼容。