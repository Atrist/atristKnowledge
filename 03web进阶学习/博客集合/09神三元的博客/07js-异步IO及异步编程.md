## 1: nodejs中的异步、非阻塞I/O是如何实现的？
在听到 nodejs 相关的特性时，经常会对 `异步I/O`、`非阻塞I/O`有所耳闻，听起来好像是差不多的意思，但其实是两码事，下面我们就以原理的角度来剖析一下对 nodejs 来说，这两种技术底层是如何实现的？

### 什么是I/O？
首先，我想有必要把 I/O 的概念解释一下。I/O 即`Input/Output`, 输入和输出的意思。在浏览器端，只有一种 I/O，那就是利用 Ajax 发送网络请求，然后读取返回的内容，这属于网络I/O。回到 nodejs 中，其实这种的 I/O 的场景就更加广泛了，主要分为两种:
- 文件 I/O。比如用 fs 模块对文件进行读写操作。
- 网络 I/O。比如 http 模块发起网络请求。

### 阻塞和非阻塞I/O
**阻塞**和**非阻塞** I/O 其实是针对操作系统内核而言的，而不是 nodejs 本身。阻塞 I/O 的特点就是一定要**等到操作系统完成所有操作后才表示调用结束**，而非阻塞 I/O 是调用后立马返回，不用等操作系统内核完成操作。

对前者而言，在操作系统进行 I/O 的操作的过程中，我们的应用程序其实是一直处于等待状态的，什么都做不了。那如果换成非阻塞I/O，调用返回后我们的 nodejs 应用程序可以完成其他的事情，而操作系统同时也在进行 I/O。这样就把等待的时间充分利用了起来，提高了执行效率，但是同时又会产生一个问题，nodejs 应用程序怎么知道操作系统已经完成了 I/O 操作呢？

为了让 `nodejs` 知道操作系统已经做完 I/O 操作，需要重复地去操作系统那里判断一下是否完成，这种重复判断的方式就是**轮询**。对于轮询而言，有以下这么几种方案:
1. 一直轮询检查I/O状态，直到 I/O 完成。这是最原始的方式，也是性能最低的，会让 CPU 一直耗用在等待上面。其实跟阻塞 I/O 的效果是一样的。
2. 遍历文件描述符(即 文件I/O 时操作系统和 nodejs 之间的文件凭证)的方式来确定 I/O 是否完成，I/O完成则文件描述符的状态改变。但 CPU 轮询消耗还是很大。
3. epoll模式。即在进入轮询的时候如果I/O未完成CPU就休眠，完成之后唤醒CPU。

总之，CPU要么重复检查I/O，要么重复检查文件描述符，要么休眠，都得不到很好的利用，我们希望的是:

>nodejs 应用程序发起 I/O 调用后可以直接去执行别的逻辑，操作系统默默地做完 I/O 之后给 nodejs 发一个完成信号，nodejs 执行回调操作。

这是理想的情况，也是异步 I/O 的效果，那如何实现这样的效果呢？

### 异步 I/O 的本质
Linux 原生存在这样的一种方式，即(AIO), 但两个致命的缺陷:

1. 只有 Linux 下存在，在其他系统中没有异步 I/O 支持。
2. 无法利用系统缓存。
#### nodejs中的异步 I/O 方案
是不是没有办法了呢？在单线程的情况下确实是这样，但是如果把思路放开一点，利用多线程来考虑这个问题，就变得轻松多了。我们可以让一个进程进行计算操作，另外一些进行 I/O 调用，I/O 完成后把信号传给计算的线程，进而执行回调，这不就好了吗？没错，异**步 I/O 就是使用这样的线程池来实现的**。

只不过在不同的系统下面表现会有所差异，在 Linux 下可以直接使用线程池来完成，在Window系统下则采用 IOCP 这个系统API(其内部还是用线程池完成的)。

有了操作系统的支持，那 nodejs 如何来对接这些操作系统从而实现异步 I/O 呢？

以文件为 I/O 我们以一段代码为例:
```js
let fs = require('fs');

fs.readFile('/test.txt', function (err, data) {
    console.log(data); 
});
```
### 执行流程
执行代码的过程中大概发生了这些事情:
1. 首先，`fs.readFile`调用Node的核心模块fs.js ；
2. 接下来，Node的核心模块调用内建模块node_file.cc，创建对应的文件I/O观察者对象(这个对象后面有大用！) ；
3. 最后，根据不同平台（Linux或者window），内建模块通过libuv中间层进行系统调用

![](./images/js异步1.jpg)

### libuv调用过程拆解
重点来了！libuv 中是如何来进行进行系统调用的呢？也就是 uv_fs_open() 中做了些什么？

#### 1. 创建请求对象

以Windows系统为例来说，在这个函数的调用过程中，我们创建了一个文件I/O的**请求对象**，并往里面注入了回调函数。
```js
req_wrap->object_->Set(oncomplete_sym, callback);
```
req_wrap 便是这个请求对象，req_wrap 中 object_ 的 oncomplete_sym 属性对应的值便是我们 nodejs 应用程序代码中传入的回调函数。

#### 2. 推入线程池，调用返回
在这个对象包装完成后，`QueueUserWorkItem()` 方法将这个对象推进线程池中等待执行。

好，至此现在js的调用就直接返回了，我们的 js 应用程序代码可以**继续往下执行**，当然，当前的 **I/O** 操作同时也在线程池中将被执行，这不就完成了异步么：）

等等，别高兴太早，回调都还没执行呢！接下来便是执行回调通知的环节。

#### 3. 回调通知
事实上现在线程池中的 I/O 无论是阻塞还是非阻塞都已经无所谓了，因为异步的目的已经达成。重要的是 I/O 完成后会发生什么。

在介绍后续的故事之前，给大家介绍两个重要的方法: `GetQueuedCompletionStatus` 和 `PostQueuedCompletionStatus`。
1. 还记得之前讲过的 `eventLoop` 吗？在每一个Tick当中会调用`GetQueuedCompletionStatus`检查线程池中是否有执行完的请求，如果有则表示时机已经成熟，可以执行回调了。
2.` PostQueuedCompletionStatus`方法则是向 IOCP 提交状态，告诉它当前I/O完成了。

名字比较长，先介绍是为了让大家混个脸熟，至少后面出来不会感到太突兀：）

我们言归正传，把后面的过程串联起来。

当对应线程中的 I/O 完成后，会将获得的结果**存储**起来，保存到**相应的请求对象**中，然后调用`PostQueuedCompletionStatus()`向 IOCP 提交执行完成的状态，并且将线程还给操作系统。一旦 EventLoop 的轮询操作中，调用`GetQueuedCompletionStatus`检测到了完成的状态，就会把**请求对象**塞给I/O观察者(之前埋下伏笔，如今终于闪亮登场)。

I/O 观察者现在的行为就是取出**请求对象**的**存储结果**，同时也取出它的`oncomplete_sym`属性，即回调函数(不懂这个属性的回看第1步的操作)。将前者作为函数参数传入后者，并执行后者。 这里，回调函数就成功执行啦！

### 总结 :
1. 阻塞和非阻塞 I/O 其实是针对操作系统内核而言的。阻塞 I/O 的特点就是一定要**等到操作系统完成所有操作后才表示调用结束**，而非阻塞 I/O 是调用后立马返回，不用等操作系统内核完成操作。
2. nodejs中的异步 I/O 采用多线程的方式，由 `EventLoop`、`I/O 观察者`，`请求对象`、`线程池`四大要素相互配合，共同实现。

## 2：JS异步编程有哪些方案？为什么会出现这些方案？
关于 JS `单线程`、`EventLoop` 以及`异步 I/O` 这些底层的特性，我们之前做过了详细的拆解，不在赘述。在探究了底层机制之后，我们还需要对代码的组织方式有所理解，这是离我们最日常开发最接近的部分，异步代码的组织方式直接决定了`开发`和`维护`的`效率`，其重要性也不可小觑。尽管**底层机制**没变，但异步代码的组织方式却随着 ES 标准的发展，一步步发生了巨大的**变革**。接着让我们来一探究竟吧！

### 回调函数时代
相信很多 nodejs 的初学者都或多或少踩过这样的坑，node 中很多原生的 api 就是诸如这样的:
```js
fs.readFile('xxx', (err, data) => {

});
```
典型的高阶函数，将回调函数作为函数参数传给了readFile。但久而久之，就会发现，这种传入回调的方式也存在大坑, 比如下面这样:
```js
fs.readFile('1.json', (err, data) => {
    fs.readFile('2.json', (err, data) => {
        fs.readFile('3.json', (err, data) => {
            fs.readFile('4.json', (err, data) => {

            });
        });
    });
});
```
回调当中嵌套回调，也称**回调地狱**。这种代码的可读性和可维护性都是非常差的，因为嵌套的层级太多。而且还有一个严重的问题，就是每次任务可能会失败，需要在回调里面对每个任务的失败情况进行处理，增加了代码的混乱程度。

### Promise 时代
ES6 中新增的 Promise 就很好了解决了`回调地狱`的问题，同时了合并了错误处理。写出来的代码类似于下面这样:
```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json')
}).then(data => {
    return readFilePromise('3.json')
}).then(data => {
    return readFilePromise('4.json')
});
```
以链式调用的方式避免了大量的嵌套，也符合人的线性思维方式，大大方便了异步编程。

### co + Generator 方式
利用协程完成 Generator 函数，用 co 库让代码依次执行完，同时以同步的方式书写，也让异步操作按顺序执行。
```js
co(function* () {
  const r1 = yield readFilePromise('1.json');
  const r2 = yield readFilePromise('2.json');
  const r3 = yield readFilePromise('3.json');
  const r4 = yield readFilePromise('4.json');
})
```
### async + await方式
这是 ES7 中新增的关键字，凡是加上 async 的函数都默认返回一个 Promise 对象，而更重要的是 async + await 也能让异步代码以同步的方式来书写，而不需要借助第三方库的支持。
```js
const readFileAsync = async function () {
  const f1 = await readFilePromise('1.json')
  const f2 = await readFilePromise('2.json')
  const f3 = await readFilePromise('3.json')
  const f4 = await readFilePromise('4.json')
}
```
这四种经典的异步编程方式就简单回顾完了，由于是鸟瞰大局，我觉得**知道是什么**比**了解细节**要重要, 因此也没有展开。不过没关系，接下来，让我们针对这些具体的解决方案，一步步深入异步编程，理解其中的本质

## 3：能不能简单实现一下 node 中回调函数的机制？
**回调函数**的方式其实内部利用了**发布-订阅**模式，在这里我们以模拟实现 node 中的 Event 模块为例来写实现回调函数的机制。
```js
function EventEmitter() {
  this.events = new Map();
}
```
这个 `EventEmitter` 一共需要实现这些方法: `addListener`, `removeListener`, `once`, `removeAllListener`, `emit`。

首先是addListener：
```js
// once 参数表示是否只是触发一次
const wrapCallback = (fn, once = false) => ({ callback: fn, once });

EventEmitter.prototype.addListener = function (type, fn, once = false) {
  let handler = this.events.get(type);
  if (!handler) {
    // 为 type 事件绑定回调
    this.events.set(type, wrapCallback(fn, once));
  } else if (handler && typeof handler.callback === 'function') {
    // 目前 type 事件只有一个回调
    this.events.set(type, [handler, wrapCallback(fn, once)]);
  } else {
    // 目前 type 事件回调数 >= 2
    handler.push(wrapCallback(fn, once));
  }
}
```
`removeLisener` 的实现如下:
```js
EventEmitter.prototype.removeListener = function (type, listener) {
  let handler = this.events.get(type);
  if (!handler) return;
  if (!Array.isArray(handler)) {
    if (handler.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for (let i = 0; i < handler.length; i++) {
    let item = handler[i];
    if (item.callback === listener.callback) {
      // 删除该回调，注意数组塌陷的问题，即后面的元素会往前挪一位。i 要 -- 
      handler.splice(i, 1);
      i--;
      if (handler.length === 1) {
        // 长度为 1 就不用数组存了
        this.events.set(type, handler[0]);
      }
    }
  }
}
```
once 实现思路很简单，先调用 addListener 添加上了once标记的回调对象, 然后在 emit 的时候遍历回调列表，将标记了`once: true`的项remove掉即可。
```js
EventEmitter.prototype.once = function (type, fn) {
  this.addListener(type, fn, true);
}

EventEmitter.prototype.emit = function (type, ...args) {
  let handler = this.events.get(type);
  if (!handler) return;
  if (Array.isArray(handler)) {
    // 遍历列表，执行回调
    handler.map(item => {
      item.callback.apply(this, args);
      // 标记的 once: true 的项直接移除
      if (item.once) this.removeListener(type, item);
    })
  } else {
    // 只有一个回调则直接执行
    handler.callback.apply(this, args);
  }
  return true;
}
```
最后是 `removeAllListener`：
```js
EventEmitter.prototype.removeAllListener = function (type) {
  let handler = this.events.get(type);
  if (!handler) return;
  else this.events.delete(type);
}
```
现在我们测试一下:
```js
let e = new EventEmitter();
e.addListener('type', () => {
  console.log("type事件触发！");
})
e.addListener('type', () => {
  console.log("WOW!type事件又触发了！");
})

function f() { 
  console.log("type事件我只触发一次"); 
}
e.once('type', f)
e.emit('type');
e.emit('type');
e.removeAllListener('type');
e.emit('type');

// type事件触发！
// WOW!type事件又触发了！
// type事件我只触发一次
// type事件触发！
// WOW!type事件又触发了！
```
OK，一个简易的 Event 就这样实现完成了，为什么说它简易呢？因为还有很多细节的部分没有考虑:
1. 在**参数少**的情况下，call 的性能优于 apply，反之 apply 的性能更好。因此在执行回调时候可以根据情况调用 call 或者 apply。
2. 考虑到内存容量，应该设置**回调列表的最大值**，当超过最大值的时候，应该选择部分回调进行删除操作。
3. **鲁棒性**有待提高。对于**参数的校验**很多地方直接忽略掉了。

不过，这个案例的目的只是带大家掌握核心的原理，如果在这里洋洋洒洒写三四百行意义也不大，有兴趣的可以去看看Node中 [Event 模块](https://github.com/Gozala/events/blob/master/events.js) 的源码，里面对各种细节和边界情况做了详细的处理。

## 4: Promise之问(一)——Promise 凭借什么消灭了回调地狱？
### 问题
首先，什么是回调地狱:
1. 多层嵌套的问题。
2. 每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性。

这两种问题在回调函数时代尤为突出. Promise 的诞生就是为了解决这两个问题。

### 解决方法
Promise 利用了三大技术手段来解决**回调地狱**:
- 回调函数延迟绑定。
- 返回值穿透。
- 错误冒泡。

首先来举个例子:
```js
let readFilePromise = (filename) => {
  fs.readFile(filename, (err, data) => {
    if(err) {
      reject(err);
    }else {
      resolve(data);
    }
  })
}
readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')
});
```
看到没有，回调函数不是直接声明的，而是在通过后面的 then 方法传入的，即延迟传入。这就是**回调函数延迟绑定**。

然后我们做以下微调:
```js
let x = readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')//这是返回的Promise
});
x.then(/* 内部逻辑省略 */)
```
我们会根据 then 中回调函数的传入值创建不同类型的Promise, 然后把返回的 Promise 穿透到外层, 以供后续的调用。这里的 x 指的就是内部返回的 Promise，然后在 x 后面可以依次完成链式调用。

这便是**返回值穿透**的效果。

这两种技术一起作用便可以将深层的嵌套回调写成下面的形式:
```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
});
```
这样就显得清爽了许多，更重要的是，它更符合人的线性思维模式，开发体验也更好。

两种技术结合产生了**链式调用**的效果。

这解决的是多层嵌套的问题，那另一个问题，即每次任务执行结束后分别**处理成功和失败**的情况怎么解决的呢？

Promise 采用了**错误冒泡**的方式。其实很简单理解，我们来看看效果:
```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
}).catch(err => {
  // xxx
})
```
这样前面产生的错误会一直向后传递，被 catch 接收到，就不用频繁地检查错误了。

### 解决效果
1. 实现链式调用，解决多层嵌套问题
2. 实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度的问题

## 5: Promise之问(二)——为什么Promise要引入微任务？
在这里，如果你还没有接触过 Promise, 务必去看看 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，了解使用方式，不然后面很会懵。

Promise 中的执行函数是同步进行的，但是里面存在着异步操作，在异步操作结束后会调用 resolve 方法，或者中途遇到错误调用 reject 方法，这两者都是作为微任务进入到 EventLoop 中。但是你有没有想过，Promise 为什么要引入微任务的方式来进行回调操作？

### 解决方式
回到问题本身, 其实就是如何处理回调的问题. 总结起来有三种方式:
1. 使用同步回调, 直到异步任务进行完，再进行后面的任务。
2. 使用异步回调，将回调函数放在进行**宏任务队列**的队尾。
3. 使用异步回调，将回调函数放到**当前宏任务中**的最后面。
### 优劣
第一种方式显然不可取，因为同步的问题非常明显，会让整个脚本阻塞住，当前任务等待，后面的任务都无法得到执行，而这部分等待的时间是可以拿来完成其他事情的，导致 CPU 的利用率非常低，而且还有另外一个致命的问题，就是无法实现延迟绑定的效果。

如果采用第二种方式，那么执行回调(resolve/reject)的时机应该是在前面**所有的宏任务**完成之后，倘若现在的任务队列非常长，那么回调迟迟得不到执行，造成**应用卡顿**。

为了解决上述方案的问题，另外也考虑到延迟绑定的需求，Promise 采取第三种方式, 即引入微任务, 即把 resolve(reject) 回调的执行放在当前宏任务的末尾。

这样，利用**微任务**解决了两大痛点:
1. 采用**异步回调**替代同步回调解决了浪费 CPU 性能的问题。
2. 放到**当前宏任务最后**执行，解决了回调执行的实时性问题。

好，Promise 的基本实现思想已经讲清楚了，相信大家已经知道了它**为什么这么设计**，接下来就让我们一步步弄清楚它内部到底是**怎么设计的**。

## 6: Promise之问(三)——Promise 如何实现链式调用？
从现在开始，我们就来动手实现一个功能完整的Promise，一步步深挖其中的细节。我们先从链式调用开始。

### 简易版实现
首先写出第一版的代码:
```js
//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  let self = this; // 缓存当前promise实例
  self.value = null;
  self.error = null; 
  self.status = PENDING;
  self.onFulfilled = null; //成功的回调函数
  self.onRejected = null; //失败的回调函数

  const resolve = (value) => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled(self.value);//resolve时执行成功回调
    });
  };

  const reject = (error) => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = REJECTED;
      self.error = error;
      self.onRejected(self.error);//resolve时执行成功回调
    });
  };
  executor(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  } else if (this.status === FULFILLED) {
    //如果状态是fulfilled，直接执行成功回调，并将成功值传入
    onFulfilled(this.value)
  } else {
    //如果状态是rejected，直接执行失败回调，并将失败原因传入
    onRejected(this.error)
  }
  return this;
}
```
可以看到，Promise 的本质是一个**有限状态机**，存在三种状态:
- PENDING(等待)
- FULFILLED(成功)
- REJECTED(失败)

![](./images/js异步21.jpg)

对于 Promise 而言，状态的改变**不可逆**，即由等待态变为其他的状态后，就无法再改变了。

不过，回到目前这一版的 Promise, 还是存在一些问题的。

### 设置回调数组
首先只能执行一个回调函数，对于多个回调的绑定就无能为力，比如下面这样:
```js
let promise1 = new MyPromise((resolve, reject) => {
  fs.readFile('./001.txt', (err, data) => {
    if(!err){
      resolve(data);
    }else {
      reject(err);
    }
  })
});

let x1 = promise1.then(data => {
  console.log("第一次展示", data.toString());    
});

let x2 = promise1.then(data => {
  console.log("第二次展示", data.toString());    
});

let x3 = promise1.then(data => {
  console.log("第三次展示", data.toString());    
});
```
这里我绑定了三个回调，想要在 `resolve()` 之后一起执行，那怎么办呢？

需要将 `onFulfilled` 和 `onRejected` 改为数组，调用 `resolve` 时将其中的方法拿出来一一执行即可。
```js
self.onFulfilledCallback = [];
self.onRejectedCallback = [];
```
```js
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value);
  } else {
    onRejected(this.error);
  }
  return this;
}
```
接下来将 resolve 和 reject 方法中执行回调的部分进行修改：
```js
// resolve 中
self.onFulfilledCallback.forEach((callback) => callback(self.value));
//reject 中
self.onRejectedCallback.forEach((callback) => callback(self.error));
```
### 链式调用完成
我们采用目前的代码来进行测试:
```js
let fs = require('fs');
let readFilePromise = (filename) => {
  return new MyPromise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(!err){
        resolve(data);
      }else {
        reject(err);
      }
    })
  })
}
readFilePromise('./001.txt').then(data => {
  console.log(data.toString());    
  return readFilePromise('./002.txt');
}).then(data => {
  console.log(data.toString());
})
// 001.txt的内容
// 001.txt的内容
```
咦？怎么打印了两个 `001`，第二次不是读的 `002` 文件吗？

问题出在这里:
```js
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  //...
  return this;
}
```
这么写每次返回的都是第一个 Promise。then 函数当中返回的第二个 Promise 直接被无视了！

说明 then 当中的实现还需要改进, 我们现在需要对 then 中返回值重视起来。
```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let bridgePromise;
  let self = this;
  if (self.status === PENDING) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          // 看到了吗？要拿到 then 中回调返回的结果。
          let x = onFulfilled(value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  //...
}
```
假若当前状态为 PENDING，将回调数组中添加如上的函数，当 Promise 状态变化后，会遍历相应回调数组并执行回调。

但是这段程度还是存在一些问题:
1. 首先 then 中的两个参数不传的情况并没有处理，
2. 假如 then 中的回调执行后返回的结果(也就是上面的x)是一个 Promise, 直接给 resolve 了，这是我们不希望看到的

怎么来解决这两个问题呢？

先对参数不传的情况做判断:
```js
// 成功回调不传给它一个默认函数
onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
// 对于失败回调直接抛错
onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
```
然后对`返回Promise`的情况进行处理:
```js
function resolvePromise(bridgePromise, x, resolve, reject) {
  //如果x是一个promise
  if (x instanceof MyPromise) {
    // 拆解这个 promise ，直到返回值不为 promise 为止
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject);
      }, error => {
        reject(error);
      });
    } else {
      x.then(resolve, reject);
    }
  } else {
    // 非 Promise 的话直接 resolve 即可
    resolve(x);
  }
}
```
然后在 then 的方法实现中作如下修改:
```js
resolve(x)  ->  resolvePromise(bridgePromise, x, resolve, reject);
```
在这里大家好好体会一下拆解 Promise 的过程，其实不难理解，我要强调的是其中的递归调用始终传入的`resolve`和`reject`这两个参数是什么含义，其实他们控制的是最开始传入的`bridgePromise`的状态，这一点非常重要。

紧接着，我们实现一下当 `Promise` 状态不为 `PENDING` 时的逻辑。

成功状态下调用`then`：
```js
if (self.status === FULFILLED) {
  return bridgePromise = new MyPromise((resolve, reject) => {
    try {
      // 状态变为成功，会有相应的 self.value
      let x = onFulfilled(self.value);
      // 暂时可以理解为 resolve(x)，后面具体实现中有拆解的过程
      resolvePromise(bridgePromise, x, resolve, reject);
    } catch (e) {
      reject(e);
    }
  })
}
```
Promise A+中规定成功和失败的回调都是微任务，由于浏览器中 JS 触碰不到底层微任务的分配，可以直接拿 `setTimeout`(属于**宏任务**的范畴) 来模拟，用 `setTimeout`将需要执行的任务包裹 ，当然，上面的 `resolve` 实现也是同理, 大家注意一下即可，其实并不是真正的微任务。
```js
if (self.status === FULFILLED) {
  return bridgePromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      //...
    })
}
```
```js
if (self.status === REJECTED) {
  return bridgePromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      //...
    })
}
```
好了，到这里, 我们基本实现了 then 方法，现在我们拿刚刚的测试代码做一下测试, 依次打印如下:
```js
001.txt的内容
002.txt的内容
```
可以看到，已经可以顺利地完成链式调用。

### 错误捕获及冒泡机制分析
现在来实现 catch 方法:
```js
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}
```
对，就是这么几行，catch 原本就是 then 方法的语法糖。

相比于实现来讲，更重要的是理解其中错误冒泡的机制，即中途一旦发生错误，可以在最后用 catch 捕获错误。

我们回顾一下 Promise 的运作流程也不难理解，贴上一行关键的代码:
```js
// then 的实现中
onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };
```
一旦其中有一个`PENDING状态`的 Promise 出现错误后状态必然会变为`失败`, 然后执行 `onRejected`函数，而这个 `onRejected` 执行又会抛错，把新的 `Promise` 状态变为失败，新的 `Promise` 状态变为失败后又会执行`onRejected......`就这样一直抛下去，直到用`catch` 捕获到这个错误，才停止往下抛。

这就是 Promise 的**错误冒泡机制**。

至此，Promise 三大法宝: **回调函数延迟绑定**、**回调返回值穿透**和**错误冒泡**。

## 7: Promise 之问(四)——实现Promise的 resolve、reject 和 finally
### 实现 Promise.resolve
实现resolve静态方法有三个要点:
1. 传参为一个 Promise, 则直接返回它。
2. 传参为一个 `thenable` 对象，返回的 `Promise` 会跟随这个对象，采用它的最终状态作为自己的状态。
3. 其他情况，直接返回以该值为成功状态的promise对象。

具体实现如下:
```js
Promise.resolve = (param) => {
  if(param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if(param && param.then && typeof param.then === 'function') {
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject);
    }else {
      resolve(param);
    }
  })
}
```
### 实现Promise.reject
`Promise.reject`中传入的参数会作为一个`reason`原封不动地往下传, 实现如下:
```js
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
```
### 实现 Promise.prototype.finally
无论当前 Promise 是成功还是失败，调用finally之后都会执行 finally 中传入的函数，并且将值原封不动的往下传。
```js
Promise.prototype.finally = function(callback) {
  this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value;
    })
  }, error => {
    return Promise.resolve(callback()).then(() => {
      throw error;
    })
  })
}
```
## 8: Promise 之问(五)——实现Promise的 all 和 race

### 实现 Promise.all
对于 all 方法而言，需要完成下面的核心功能:

1. 传入参数为一个空的可迭代对象，则`直接进行resolve`。
2. 如果参数中`有一个`promise失败，那么Promise.all返回的promise对象失败。
3. 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个`数组`

具体实现如下:
```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let len = promises.length;
    if(len === 0) {
      resolve(result);
      return;
    }
    const handleData = (data, index) => {
      result[index] = data;
      // 最后一个 promise 执行完
      if(index == len - 1) resolve(result);
    }
    for(let i = 0; i < len; i++) {
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(promise[i]).then(data => {
        handleData(data, i);
      }).catch(err => {
        reject(err);
      })
    }
  })
}
```

### 实现 Promise.race
race 的实现相比之下就简单一些，只要有一个 promise 执行完，直接 resolve 并停止执行。
```js
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if(len === 0) return;
    for(let i = 0; i < len; i++) {
      Promise.resolve(promise[i]).then(data => {
        resolve(data);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}
```
到此为止，一个完整的 Promise 就被我们实现完啦。从原理到细节，我们一步步拆解和实现，希望大家在知道 Promise 设计上的几大亮点之后，也能自己手动实现一个Promise，让自己的思维层次和动手能力更上一层楼！

## 9: 谈谈你对生成器以及协程的理解。
生成器(Generator)是 ES6 中的新语法，相对于之前的异步语法，上手的难度还是比较大的。因此这里我们先来好好熟悉一下 Generator 语法。
### 生成器执行流程
上面是生成器函数？

生成器是一个带**星号**的"函数"(注意：它并不是真正的函数)，可以通过`yield`关键字**暂停执行**和**恢复执行**的

举个例子:
```js
function* gen() {
  console.log("enter");
  let a = yield 1;
  let b = yield (function () {return 2})();
  return 3;
}
var g = gen() // 阻塞住，不会执行任何语句
console.log(typeof g)  // object  看到了吗？不是"function"

console.log(g.next())  
console.log(g.next())  
console.log(g.next())  
console.log(g.next()) 


// enter
// { value: 1, done: false }

// { value: 2, done: false }
// { value: 3, done: true }
// { value: undefined, done: true }
```
由此可以看到，生成器的执行有这样几个关键点:
1. 调用 gen() 后，程序会阻塞住，不会执行任何语句。
2. 调用 g.next() 后，程序继续执行，直到遇到 yield 程序暂停。
3. `next` 方法返回一个对象， 有两个属性: `value` 和 `done`。`value` 为当前 `yield` 后面的结果，`done` 表示是否执行完，遇到了 `return` 后，`done` 会由 `false` 变为`true`。
### yield*
当一个生成器要调用另一个生成器时，使用 `yield*` 就变得十分方便。比如下面的例子:
```js
function* gen1() {
    yield 1;
    yield 4;
}
function* gen2() {
    yield 2;
    yield 3;
}
```
我们想要按照`1234`的顺序执行，如何来做呢？

在 `gen1` 中，修改如下:
```js
function* gen1() {
    yield 1;
    yield* gen2();
    yield 4;
}
```
这样修改之后，之后依次调用`next`即可。

### 生成器实现机制——协程
可能你会比较好奇，生成器究竟是如何让函数暂停, 又会如何恢复的呢？接下来我们就来对其中的执行机制——**协程**一探究竟。

#### 什么是协程
协程是一种比线程更加轻量级的存在，协程处在线程的环境中，**一个线程可以存在多个协程**，可以将协程理解为线程中的一个个任务。不像进程和线程，协程并不受操作系统的管理，而是被具体的应用程序代码所控制。

#### 协程的运作过程
那你可能要问了，JS 不是单线程执行的吗，开这么多协程难道可以一起执行吗？

答案是：并不能。一个线程一次只能执行一个协程。比如当前执行 A 协程，另外还有一个 B 协程，如果想要执行 B 的任务，就必须在 A 协程中将JS 线程的控制权转交给 B协程，那么现在 B 执行，A 就相当于处于暂停的状态。

举个具体的例子:
```js
function* A() {
  console.log("我是A");
  yield B(); // A停住，在这里转交线程执行权给B
  console.log("结束了");
}
function B() {
  console.log("我是B");
  return 100;// 返回，并且将线程执行权还给A
}
let gen = A();
gen.next();
gen.next();

// 我是A
// 我是B
// 结束了
```
在这个过程中，A 将执行权交给 B，也就是 `A 启动 B`，我们也称 A 是 B 的**父协程**。因此 B 当中最后`return 100`其实是将 100 传给了父协程。

需要强调的是，对于协程来说，它并不受操作系统的控制，完全由用户自定义切换，因此并没有进程/线程**上下文切换**的开销，这是**高性能**的重要原因。

OK, 原理就说到这里。可能你还会有疑问: 这个生成器不就暂停-恢复、暂停-恢复这样执行的吗？它和异步有什么关系？而且，每次执行都要调用next，能不能让它一次性执行完毕呢？下一节我们就来仔细拆解这些问题。
## 10: 如何让 Generator 的异步代码按顺序执行完毕？
这里面其实有两个问题:

1. `Generator` 如何跟异步产生关系？
2. 怎么把 `Generator` 按顺序执行完毕？

### thunk 函数
要想知道 `Generator` 跟异步的关系，首先带大家搞清楚一个概念——thunk函数(即**偏函数**)，虽然这只是实现两者关系的方式之一。(另一种方式是`Promise`, 后面会讲到)

举个例子，比如我们现在要判断数据类型。可以写如下的判断逻辑:
```js
let isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]';
};
let isFunction = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Function]';
};
let isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
let isSet = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Set]';
};
// ...
```
可以看到，出现了非常多重复的逻辑。我们将它们做一下封装:
```js
let isType = (type) => {
  return (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}
```
现在我们这样做即可:
```js
let isString = isType('String');
let isFunction = isType('Function');
//...
```
相应的 `isString`和`isFunction`是由isType生产出来的函数，但它们依然可以判断出参数是否为String（Function），而且代码简洁了不少。

```js
isString("123");
isFunction(val => val);
```
`isType`这样的函数我们称为**thunk 函数**。它的核心逻辑是接收一定的参数，生产出定制化的函数，然后使用定制化的函数去完成功能。`thunk`函数的实现会比单个的判断函数复杂一点点，但就是这一点点的复杂，大大方便了后续的操作。

### Generator 和 异步
#### thunk 版本
以文件操作为例，我们来看看 **异步操作** 如何应用于`Generator`。
```js
const readFileThunk = (filename) => {
  return (callback) => {
    fs.readFile(filename, callback);
  }
}
```
`readFileThunk`就是一个thunk函数。异步操作核心的一环就是绑定回调函数，而`thunk函数`可以帮我们做到。首先传入文件名，然后生成一个针对某个文件的定制化函数。这个函数中传入回调，这个回调就会成为异步操作的回调。这样就让 `Generator` 和`异步`关联起来了。

紧接着我们做如下的操作:
```js
const gen = function* () {
  const data1 = yield readFileThunk('001.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('002.txt')
  console.log(data2.toString)
}
```
接着我们让它执行完:
```js
let g = gen();
// 第一步: 由于进场是暂停的，我们调用next，让它开始执行。
// next返回值中有一个value值，这个value是yield后面的结果，放在这里也就是是thunk函数生成的定制化函数，里面需要传一个回调函数作为参数
g.next().value((err, data1) => {
  // 第二步: 拿到上一次得到的结果，调用next, 将结果作为参数传入，程序继续执行。
  // 同理，value传入回调
  g.next(data1).value((err, data2) => {
    g.next(data2);
  })
})
```
打印结果如下:
```js
001.txt的内容
002.txt的内容
```
上面嵌套的情况还算简单，如果任务多起来，就会产生很多层的嵌套，可操作性不强，有必要把执行的代码封装一下:
```js
function run(gen){
  const next = (err, data) => {
    let res = gen.next(data);
    if(res.done) return;
    res.value(next);
  }
  next();
}
run(g);
```
Ok,再次执行，依然打印正确的结果。代码虽然就这么几行，但包含了递归的过程，好好体会一下。

这是通过`thunk`完成异步操作的情况。

#### Promise 版本
还是拿上面的例子，用`Promise`来实现就轻松一些:
```js
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  }).then(res => res);
}
const gen = function* () {
  const data1 = yield readFilePromise('001.txt')
  console.log(data1.toString())
  const data2 = yield readFilePromise('002.txt')
  console.log(data2.toString)
}
```
执行的代码如下:
```js
let g = gen();
function getGenPromise(gen, data) { 
  return gen.next(data).value;
}
getGenPromise(g).then(data1 => {
  return getGenPromise(g, data1);
}).then(data2 => {
  return getGenPromise(g, data2)
})
```
同样，我们可以对执行`Generator`的代码加以封装:
```js
function run(g) {
  const next = (data) => {
    let res = g.next();
    if(res.done) return;
    res.value.then(data => {
      next(data);
    })
  }
  next();
}
```
同样能输出正确的结果。代码非常精炼，希望能参照刚刚链式调用的例子，仔细体会一下递归调用的过程。

### 采用 co 库
以上我们针对 `thunk` 函数和Promise两种Generator异步操作的一次性执行完毕做了封装，但实际场景中已经存在成熟的工具包了，如果大名鼎鼎的co库, 其实核心原理就是我们已经手写过了（就是刚刚封装的`Promise`情况下的执行代码），只不过源码会各种边界情况做了处理。使用起来非常简单:
```js
const co = require('co');
let g = gen();
co(g).then(res =>{
  console.log(res);
})
```
打印结果如下:
```js
001.txt的内容
002.txt的内容
100
```
简单几行代码就完成了`Generator`所有的操作，真不愧`co`和`Generator`天生一对啊！

## 11: 解释一下async/await的运行机制。
`async/await`被称为 JS 中异步终极解决方案。它既能够像 `co + Generator` 一样用同步的方式来书写异步代码，又得到底层的语法支持，无需借助任何第三方库。接下来，我们从原理的角度来重新审视这个语法糖背后究竟做了些什么。

### async
什么是 async ?

>MDN 的定义: async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。

注意重点: **返回结果**为Promise。

举个例子:
```js
async function func() {
  return 100;
}
console.log(func());
// Promise {<resolved>: 100}
```
这就是隐式返回 Promise 的效果。

### await
我们来看看 `await`做了些什么事情。

以一段代码为例:
```js
async function test() {
  console.log(100)
  let x = await 200
  console.log(x)
  console.log(200)
}
console.log(0)
test()
console.log(300)
```
我们来分析一下这段程序。首先代码同步执行，打印出0，然后将`test`压入执行栈，打印出`100`, 下面注意了，遇到了关键角色**await**。

放个慢镜头:
```js
await 100;
```
被 JS 引擎转换成一个 `Promise` :
```js
let promise = new Promise((resolve,reject) => {
   resolve(100);
})
```
这里调用了 `resolve`，`resolve`的任务进入微任务队列。

然后，JS 引擎将暂停当前协程的运行，把线程的执行权交给**父协程**(父协程不懂是什么的，上上篇才讲，回去补课)。

回到父协程中，父协程的第一件事情就是对`await`返回的`Promise`调用`then`, 来监听这个 `Promise` 的状态改变 。
```js
promise.then(value => {
  // 相关逻辑，在resolve 执行之后来调用
})
```
然后往下执行，打印出`300`。

根据`EventLoop`机制，当前主线程的宏任务完成，现在检查微任务队列, 发现还有一个`Promise`的 `resolve`，执行，现在父协程在then中传入的回调执行。我们来看看这个回调具体做的是什么。
```js
promise.then(value => {
  // 1. 将线程的执行权交给test协程
  // 2. 把 value 值传递给 test 协程
})
```
Ok, 现在执行权到了`test`协程手上，`test` 接收到父协程传来的200, 赋值给 a ,然后依次执行后面的语句，打印200、200。

最后的输出为:
```js
0
100
300
200
200
```
总结一下，`async/await`利用协程和`Promise`实现了同步方式编写异步代码的效果，其中`Generator`是对协程的一种实现，虽然语法简单，但引擎在背后做了大量的工作，我们也对这些工作做了一一的拆解。用`async/await`写出的代码也更加优雅、美观，相比于之前的`Promise`不断调用then的方式，语义化更加明显，相比于`co + Generator`性能更高，上手成本也更低，不愧是JS异步终极解决方案！

## 12: forEach 中用 await 会产生什么问题?怎么解决这个问题？
问题:**对于异步代码，forEach 并不能保证按顺序执行**。

举个例子:
```js
async function test() {
	let arr = [4, 2, 1]
	arr.forEach(async item => {
		const res = await handle(item)
		console.log(res)
	})
	console.log('结束')
}

function handle(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(x)
		}, 1000 * x)
	})
}

test()
```
我们期望的结果是:
```js
4 
2 
1
结束
```
但是实际上会输出:
```js
结束
1
2
4
```
### 问题原因
这是为什么呢？我想我们有必要看看`forEach`底层怎么实现的。
```js
// 核心逻辑
for (var i = 0; i < length; i++) {
  if (i in array) {
    var element = array[i];
    callback(element, i, array);
  }
}
```
可以看到，`forEach` 拿过来直接执行了，这就导致它无法保证异步任务的执行顺序。比如后面的任务用时短，那么就又可能抢在前面的任务之前执行。

### 解决方案
如何来解决这个问题呢？

其实也很简单, 我们利用`for...of`就能轻松解决。
```js
async function test() {
  let arr = [4, 2, 1]
  for(const item of arr) {
		const res = await handle(item)
		console.log(res)
  }
	console.log('结束')
}
```
### 解决原理——Iterator
好了，这个问题看起来好像很简单就能搞定，你有想过这么做为什么可以成功吗？

其实，`for...of`并不像`forEach`那么简单粗暴的方式去遍历执行，而是采用一种特别的手段——迭代器去遍历。

首先，对于数组来讲，它是一种可迭代数据类型。那什么是可迭代数据类型呢？

>原生具有[Symbol.iterator]属性数据类型为可迭代数据类型。如数组、类数组（如arguments、NodeList）、Set和Map。

可迭代对象可以通过迭代器进行遍历。
```js
let arr = [4, 2, 1];
// 这就是迭代器
let iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


// {value: 4, done: false}
// {value: 2, done: false}
// {value: 1, done: false}
// {value: undefined, done: true}
```
因此，我们的代码可以这样来组织:
```js
async function test() {
  let arr = [4, 2, 1]
  let iterator = arr[Symbol.iterator]();
  let res = iterator.next();
  while(!res.done) {
    let value = res.value;
    console.log(value);
    await handle(value);
    res = iterater.next();
  }
	console.log('结束')
}
// 4
// 2
// 1
// 结束
```
多个任务成功地按顺序执行！其实刚刚的for...of循环代码就是这段代码的语法糖。

### 重新认识生成器
回头再看看用iterator遍历`[4,2,1]`这个数组的代码。
```js
let arr = [4, 2, 1];
// 迭代器
let iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


// {value: 4, done: false}
// {value: 2, done: false}
// {value: 1, done: false}
// {value: undefined, done: true}
```
咦？返回值有value和done属性，生成器也可以调用 next,返回的也是这样的数据结构，这么巧?!

没错，**生成器**本身就是一个。**迭代器**

既然属于迭代器，那它就可以用`for...of`遍历了吧？

当然没错，不信来写一个简单的斐波那契数列(50以内)：
```js
function* fibonacci(){
  let [prev, cur] = [0, 1];
  console.log(cur);
  while(true) {
    [prev, cur] = [cur, prev + cur];
    yield cur;
  }
}

for(let item of fibonacci()) {
  if(item > 50) break;
  console.log(item);
}
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34
```
是不是非常酷炫？这就是迭代器的魅力：）同时又对生成器有了更深入`的理解，没想到我们的老熟人`Generator还有这样的身份。

以上便是本文的全部内容，希望对你有所启发。