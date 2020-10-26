## 知道哪些ES6，ES7的语法
promise，await/async，let、const、块级作用域、箭头函数

## promise和await/async的关系

都是异步编程的解决方案

## js的数据类型
字符串，数字，布尔，数组，null，Undefined，symbol，对象

## js加载过程阻塞, 解决方法
指定script标签的async属性。

如果async="async"，脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）

如果不使用async 且 defer="defer"：脚本将在页面完成解析时执行

## js对象类型，基本对象类型以及引用对象类型的区别
分为基本对象类型和引用对象类型
- 基本数据类型：按值访问，可操作保存在变量中的实际的值。基本类型值指的是简单的数据段。基本数据类型有这六种:undefined、null、string、number、boolean、symbol。

- 引用类型：当复制保存着对象的某个变量时，操作的是对象的引用，但在为对象添加属性时，操作的是实际的对象。引用类型值指那些可能为多个值构成的对象。

    引用类型有这几种：Object、Array、RegExp、Date、Function、特殊的基本包装类型(String、Number、Boolean)以及单体内置对象(Global、Math)。

##  JavaScript中的轮播实现原理？假如一个页面上有两个轮播，你会怎么实现？
图片轮播的原理就是图片排成一行，然后准备一个只有一张图片大小的容器，对这个容器设置超出部分隐藏，在控制定时器来让这些图片整体左移或右移，这样呈现出来的效果就是图片在轮播了。

如果有两个轮播，可封装一个轮播组件，供两处调用

## 怎么实现一个计算一年中有多少周？
1. 首先你得知道是不是闰年，也就是一年是365还是366.
2. 其次你得知道当年1月1号是周几。假如是周五，一年365天把1号 2号3号减去，也就是把第一个不到一周的天数减去等于362
3. 还得知道最后一天是周几，加入是周五，需要把周一到周五减去，也就是362-5=357.正常情况 357这个数计算出来是7的倍数。357/7=51 。即为周数。

## call和apply的区别
- apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.apply(A, arguments);`即A对象应用B对象的方法。
- call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.call(A, args1,args2);`即A对象调用B对象的方法。

## 箭头函数和function有什么区别
箭头函数根本就没有绑定自己的this，在箭头函数中调用 this 时，仅仅是简单的沿着作用域链向上寻找，找到最近的一个 this 拿来使用

## new操作符原理
1. 创建一个类的实例：创建一个空对象`obj`，然后把这个空对象的`__proto__`设置为构造函数的`prototype`。
2. 初始化实例：构造函数被传入参数并调用，关键字`this`被设定指向该实例`obj`。
3. 返回实例`obj`。

## bind,apply,call
- `apply`：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。
- `call`：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。
- `bind`除了返回是函数以外，它的参数和call一样。

## bind和apply的区别
- 返回不同：bind返回是函数
- 参数不同：apply(A, arguments)，bind(A, args1,args2)

## promise
```js
function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];
    this.then = function (onFulfilled, onRejected) {
        return new Promise(function (resolve, reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });
    };

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }
        ret = cb(value);
        callback.resolve(ret);
    }

    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve, reject);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        execute();
    }

    function reject(reason) {
        state = 'rejected';
        value = reason;
        execute();
    }

    function execute() {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }
    fn(resolve, reject);
}
```

## assign的深拷贝
```js
function clone(obj) {
    var copy;
    switch (typeof obj) {
        case "undefined":
            break;
        case "number":
            copy = obj - 0;
            break;
        case "string":
            copy = obj + "";
            break;
        case "boolean":
            copy = obj;
            break;
        case "object": //object分为两种情况 对象（Object）和数组（Array）

            if (obj === null) {
                copy = null;
            } else {
                if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
                    copy = [];
                    for (var i = 0; i < obj.length; i++) {
                        copy.push(clone(obj[i]));
                    }
                } else {
                    copy = {};
                    for (var j in obj) {
                        copy[j] = clone(obj[j]);
                    }
                }
            }
            break;
        default:
            copy = obj;
            break;
    }
    return copy;
}
```

## arguments
`arguments`是类数组对象，有length属性，不能调用数组方法

可用`Array.from()`转换


## Eventloop
任务队列中，在每一次事件循环中，`macrotask`只会提取一个执行，而`microtask`会一直提取，直到`microsoft`队列为空为止。

也就是说如果某个`microtask`任务被推入到执行中，那么当主线程任务执行完成后，会循环调用该队列任务中的下一个任务来执行，直到该任务队列到最后一个任务为止。而事件循环每次只会入栈一个`macrotask`,主线程执行完成该任务后又会检查`microtasks`队列并完成里面的所有任务后再执行`macrotask`的任务。

- `macrotasks`: setTimeout, setInterval, setImmediate, I/O, UI rendering
- `microtasks`: process.nextTick, Promise, MutationObserver