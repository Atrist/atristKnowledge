## vue的生命周期
vue实例有一个完整的生命周期, 也就是从开始创建, 初始化数据, 编译模板, 挂载DOM, 渲染-> 更新->渲染, 我们称这是vue的生命周期. 通俗说就是Vue实例从创建到销毁的过程,就是生命周期

每一个组件或者实例都会经历一个完整的生命周期，总共分为三个阶段：初始化、运行中、销毁。

实例、组件通过`new Vue()` 创建出来之后会初始化事件和生命周期，然后就会执行`beforeCreate`钩子函数，这个时候，数据还没有挂载呢，只是一个空壳，无法访问到数据和真实的`dom`，一般不做操作

挂载数据，绑定事件等等，然后执行`created`函数，这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发`updated`函数，在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取

接下来开始找实例或者组件对应的模板，编译模板为虚拟`dom`放入到`render`函数中准备渲染，然后执行`beforeMount`钩子函数，在这个函数中虚拟`dom`已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发`updated`，在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取

接下来开始`render`，渲染出真实`dom`，然后执行`mounted`钩子函数，此时，组件已经出现在页面中，数据、真实`dom`都已经处理好了,事件都已经挂载好了，可以在这里操作真实dom等事情...

当组件或实例的数据更改之后，会立即执行`beforeUpdate`，然后`vue`的虚拟dom机制会重新构建虚拟`dom`与上一次的虚拟`dom`树利用`diff`算法进行对比之后重新渲染，一般不做什么事儿

当更新完成后，执行`updated`，数据已经更改完成，`dom`也重新`render`完成，可以操作更新后的虚拟`dom`

当经过某种途径调用`$destroy`方法后，立即执行`beforeDestroy`，一般在这里做一些善后工作，例如清除计时器、清除非指令绑定的事件等等

组件的数据绑定、监听...去掉后只剩下`dom`空壳，这个时候，执行`destroyed`，在这里做善后工作也可以

## 简单介绍一下 symbol
Symbol是ES6的新增属性, 代表用给定名称作为唯一标识, 这种类型的值可以这样创建, `let id = Symbol("id");` 

Symbol确保唯一,即使采用相同的名称,也会产生不同的值,我们创建一个字段, 仅为知道对应symbol的人能访问, 使用symbol并不是100%隐藏, 有内置方法 Object.getOwnPropertySymbols(obj) 可以获取所有的symbol. 也有一个方法Reflect.ownKeys(obj)返回对象所有的键, 包括Symbol

所以并不是真正隐藏. 但是大多数库内置方法和语法结构遵循通用约定他们是隐藏的

## 什么是事件监听
addEventListener()方法, 用于向指定元素添加事件句柄, 它可以更简单的控制事件, 语法为
```js
element.addEventListener(event, function,useCapture)
```
第一个参数是事件的类型(如 "click" 或 "mousedown").

第二个参数是事件触发后调用的函数。

第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。

事件传递有两种方式，冒泡和捕获

事件传递定义了元素事件触发的顺序，如果你将P元素插入到div元素中，用户点击P元素，

在**冒泡**中，内部元素先被触发，然后再触发外部元素，

**捕获**中，外部元素先被触发，在触发内部元素，

## 介绍一下promise, 及其底层如何实现
Promise是一个对象,保存着未来将要结束的事件, 她有两个特征;
1. 对象的状态不受外部影响, Promise对象代表一个异步操作, 有三种状态, `pending`进行中, `fulfilled`已成功,`rejected`已失败, 只有异步操作的结果, 才可以决定当前是哪一种状态,任何其他操作都无法改变这个状态,这也是promise名字的由来
2. 一旦状态改变, 就不会再变, promise对象状态改变只有两种可能, 从pending改到`fulfilled`或者从`pending`到`rejected`,只要这两种情况发生, 状态就凝固了, 不会再改变, 这个时候就称为定型`resolved`

Promise基本用法
```js
let promise1 = new Promise(function(res,rej){
    setTimeout(function(){
        res("ok");
    },1000)
})

promise1.then(function success(val){console.log(val)})
```
最简单的代码实现promise
```js
class PromiseM{
    constructor(process){
        this.status = 'pending';
        this.msg = '';
        process(this.resolve.bind(this),this.reject.bind(this))
        return this;
    }
    resolve(val){
        this.status = 'fulfilled';
        this.msg = val;
    }
    reject(err){
        this.status = 'rejected';
        this.msg = err;
    }
    then(fulfilled,reject){
        if(this.status === 'fulfilled'){
            fulfilled(this.msg)
        }
        if(this.status === 'rejected'){
            reject(this.msg)
        }
    }
}

// 测试代码
var mm = new PromiseM(function(res,rej){
    res('123');
})
mm.then(function(success){
    console.log(success)
},function(){ console.log('fail');})

```

## js原型链，原型链的顶端是什么？Object的原型是什么？Object的原型的原型是什么？在数组原型链上实现删除数组重复数据的方法
能够把这个将清除弄明白是一件很困难的事,

首先明白原型是什么, 在ES6之前, JS没有类和继承的概念, JS是通过原型来实现继承的, 在JS中一个构造函数默认带一个`prototype`属性, 这个的属性是一个对象, 同时这个`prototype`对象自带一个`constructor`属性, 这个属性指向这个构造函数, 同时每一个实例都会有一个`__proto__`属性指向这个`prototype`对象, 我们可以把这个叫做隐式原型, 我们在使用一个实例的方法的时候, 会先检查这个实例中是否有这个方法, 没有的话就会检查这个prototype对象是否有这个方法

基于这个规则,如果让原型对象指向另一个类型的实例, 即`constructor1.prototype = instance2`, 这时候如果试图引用 `constructor1`构造的实例`instance1` 的某个属性`p1`

首先会在`instance1`内部属性中找一遍, 接着会在`instance1.__proto__(constructor1.prototype` 既是 instance2中寻找p1, 

搜寻轨迹: instance1 -> instance2 -> constructor2.prototype... -> Object.prototype


### 补充学习:

每个函数都有一个`prototype`属性,这个属性指向了一个对象, 这个对象正是调用该函数而创建的实例的原型, 那么什么是原型呢, 可以这样理解, 每一个Javascript对象在创建的时候就会预制管理另一个对象,这个对象就是我们所说的原型, 每一个对象都会从原型继承属性,如图:

![](./images/311436_1552431147224_7A94EFA1E3409049184A20DD1711F1B6.png)

那么怎么表示实例与实例原型的关系呢, 这时候就要用到第二属性 `__proto__`

这是每一个JS对象都会有的一个属性,指向这个对象的原型, 如图:

![](./images/311436_1552431218799_241BFEF25322EAB2AC14C47F68A7E31F.png)

既然实例对象和构造函数都可以指向原型, 那么原型是否有属性指向构造函数或者实例呢, 指向实例是没有的,因为一个构造函数可以生成多个实例, 但是原型有属性可以直接指向构造函数, 通过`constructor`即可


接下来讲解实例和原型的关系:

当读取实例的属性时, 如果找不到,就会查找与对象相关的原型中的属性, 如果还查不到, 就去找原型的原型,一直找到最顶层, 那么原型的原型是什么呢, 首先,原型也是一个对象, 既然是对象,我们就可以通过构造函数的方式创建它, 所以原型对象就是通过Object构造函数生成的, 如图:

![](./images/311436_1552431256187_AE645DCD4DDEE468730F9EE81F7D1983.png)


那么Object.prototype的原型呢,我们可以打印`console.log(Object.prototype.__proto__ === null)`, 返回 true

`null` 表示没有对象, 即该处不应该有值, 所以Object.prototype 没有原型, 如图:

![](./images/311436_1552431329816_BC67B14895C30FC45BA53BF8B01127BF.png)

图中这条蓝色的线即是原型链, 最后补充三点:

- `constructor`：
    ```js
    function Person(){


    }

    var person = new Person();

    console.log(Person === person.constructor);
    ```
    原本`person`中没有`construct`属性, 当不能读取到`constructor`属性时, 会从`person`的原型中读取,所以指向构造函数`Person`

- `__proto__`:
    
    绝大部分浏览器支持这个非标准的方法访问原型，然而它并不存在与`Person.prototype`中，实际上它来自`Object.prototype`，当使用`obj.__proto__`时，可以理解为返回来`Object.getPrototype(obj)`
- 继承：

    前面说到，每个对象都会从原型继承属性，但是引用《你不知道的JS》中的话，继承意味着复制操作，然而JS默认不会复制对象的属性，相反，JS只是在两个对象之间创建一个关联，这样子一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，叫委托更合适，

## 什么是js的闭包? 有什么作用, 用闭包写个单例模式
### MDN对闭包的定义
闭包是指那些能够访问自由变量的函数，自由变量是指在函数中使用的，但既不是函数参数又不是函数的局部变量的变量，由此可以看出，闭包=函数+函数能够访问的自由变量，所以从技术的角度讲，所有JS函数都是闭包，但是这是理论上的闭包，还有一个实践角度上的闭包，从实践角度上来说，只有满足1、即使创建它的上下文已经销毁，它仍然存在，2、在代码中引入了自由变量，才称为闭包
### 闭包的应用
1. 模仿块级作用域
2. 保存外部函数的变量
3. 封装私有变量

### 单例模式
```js
var Singleton = (function(){
    var instance;
    var CreateSingleton = function(name){
        this.name = name;
        if(instance){
            return instance;
        }
        // 打印实例名字
        this.getName();
            // instance = this;
            // return instance;
            return instance = this;
        }
        // 获取实实例的名字
    CreateSingleton.prototype.getName = function(){
            console.log(this.name);
    }
    return CreateSingleton;
    })();

    // 创建实例对象1 
    var a = new Singleton('a');

    // 创建实例对象2
    var a = new Singleton('b');

    console.log(a===b)
```

## promise+Generator+Async的使用
### Promise 
解决的问题: 回调地狱

### promise规范
promise有三种状态, 等待(pending), 已完成(fulfilled/resolved), 已拒绝(rejected), Promise的状态只能从 "等待" 转到 "完成" 或者 "拒绝", 不能逆向转换, 同时 "完成" 和"拒绝" 也不能相互转换

Promise必须提供一个then方法以访问其当前值, 终值和拒因. `Promise.then(resolve,reject)`, `resolve`和`reject`都是可选参数,如果resolve和reject不是函数, 其必须被忽略

then方法必须返回一个promise对象

### 使用
实例化promise对象需要传入函数(包含两个参数), `resolve`和`reject`, 内部确定状态, resolve和reject函数可以传入参数在回调函数中使用, resolve和reject都是函数, 传入的参数在then的回调函数中接受

```js
var promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('好哈哈哈哈');
    });
});
promise.then(function(val){
    console.log(val)
})
```
`then` 接受两个参数,分别对应`resolve`和`reject`状态的回调,函数中接受实例化时传入的参数
```js
promise.then(val =>{
    // resolved

}, reason=>{
    // rejected
})
```
`catch`相当于`.then(null,rejection)`

当`then`中没有传入`rejection`时, 错误会冒泡进入`catch`函数,若传入了`rejection`,则错误会被`rejection`捕获,而且不会进入`catch`
```js
new Promise((resolve,reject)=>{
    throw new Error('错误')
}).then(null,(err)=>{
    console.log(err,1); // 此处被捕获
}).catch(err=>{
    console.log(err,2);
})

// 对比
new Promise((res,rej)=>{
    throw new Error('错误')
}).then(null,null).catch(err =>{
    console.log(err,2); //此处捕获
})

// 错误示例

new Promise((res,rej)=>{
    res('正常');
}).then(val=>{
    throw new Error('回调函数中错误')
},err=>{
    console.log(err,1);
}).then(null,err=>{
    console.log(err,2); // 此处捕获,也可用catch
});
```
两者不等价的情况:

此时,catch捕获的并不是p1的错误,而是p2的错误
```js
p1()
.then(res=>return p2(); /* 返回一个promise对象*/ )
.catch(err => console.log(err))
```
一个错误捕获的错误用例:

该函数调用中即使发生了错误依然会进入`then`中的`resolve`的回调函数,因为函数`p1`中实例化`promise`对象时已经调用了`catch`,若发生错误会进入`catch`中,此时会返回一个新的`promise`,因此即使发生错误依然会进入`p1`函数的`then`链中的`resolve`回调函数.
```js
function p1(val) {
    return new Promise((res, rej) => {
        if (val) {
            var len = val.length; // 传入null会发生错误,进入catch捕获错误
            resolve(len);
        } else {
            reject();
        }
    }).catch((err) => {
        console.log(err)
    })
};

p1(null)
    .then((len) => {
        console.log(len, 'resolved');
    }, () => {
        console.log('rejected');
    })
    .catch((err) => {
        console.log(err, 'catch');
    })
```

`promise`回调链:

`promise`能够在回调函数里面使用 `return` 和 `throw`， 所以在`then`中可以`return`出一个`promise`对象或其他值，也可以`throw`出一个错误对象，但如果没有`return`，将默认返回 `undefined`，那么后面的`then`中的回调参数接收到的将是`undefined`.

```js
function p1(val) {
    return new Promise((res, rej) => {
        val == 1 ? res(1) : rej();
    })
};

function p2(val) {
    return new Promise((res, rej) => {
        val == 2 ? res(2) : rej();
    })
};

let promise = new Promise(function (res, rej) {
    res(1);
}).then(function (data1) {
    return p1(data1); // 如果去掉return, 则返回 undefined 而不是 p1的返回值, 会导致报错
}).then(function (data2) {
    return p2(data2 + 1);
}).then(res => console.log(res))
```

### Generator 函数:
1. 分段执行,可以暂停
2. 可以控制阶段和每个阶段的返回值
3. 可以知道是否执行到结尾

```js
function *g(){
    var o = 1;
    yield o++;
    yield o++;
}
var gen = g();
console.log(gen.next());  // object {value:1, done:false}
var xxx = g();
console.log(gen.next());   // object { value: 2, done: false }       
console.log(xxx.next());   // object { value: 1, done: false }     
console.log(gen.next());   // object { value: undefined, done: true }
```
### generator和异步控制:
利用`Generator`函数的暂停执行的效果, 可以把异步操作卸载`yield`语句里面, 等到调用`next`方法时再往后执行. 这实际上等同于不需要写回调函数了, 因为异步操作的后续操作可以放在`yield`语句下面, 反正要等到调用`next`方法时再执行. 所以, `Generator`函数的一个重要实际意义就是用来处理异步操作, 改写回调函数


### async 和 异步控制
用法:

async 表示这是一个async函数, await只能用在这个函数里面

await 表示在这里等待异步操作返回结果, 再继续执行

await 后一般是一个promise对象

示例: async用于定义一个异步函数,该函数返回一个promise

如果async函数返回的是一个同步的值,这个值将被包装成一个理解resolve的promise, 等同于`return promise.resolve(value)`

await 用于一个异步操作之前, 表示要 "等待" 这个异步操作的返回值, await也可以用于一个同步的值
```js
let timer = async function timer() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('500');
        }, 500);
    })
}

timer().then(res => {
    console.log(res); // 500
}).catch(err => {
    console.log(err.message);
})

// 返回一个同步的值

let sayHi = async function sayHi() {
    let hi = await 'hello world';
    return hi; // 等同于return Promise.resolve(hi);
}
sayHi().then(res => {
    console.log(res);
})
```
## 事件委托以及冒泡原理
**事件委托**是利用冒泡阶段的运行机制来实现的，就是把一个元素响应事件的函数委托到另一个元素，一般是把一组元素的事件委托到他的父元素上，委托的优点是
1. 减少内存消耗，节约效率
2. 动态绑定事件

**事件冒泡**，就是元素自身的事件被触发后，如果父元素有相同的事件，如onclick事件，那么元素本身的触发状态就会传递，也就是冒到父元素，父元素的相同事件也会一级一级根据嵌套关系向外触发，直到`document/window`，冒泡过程结束。

## 写个函数, 可以转化下划线命令到驼峰命名
```js
function UnderlineToHump(para) {
    let result = [];
    let a = para.split('_');
    for (let i of a) {
        if (result.length === 0) {
            result.push(i.toString().toLowerCase());
        } else {
            result.push(i[0].toUpperCase());
            result.push(i.slice(1).toLowerCase());
        }
    }

    return result.join('');
}
```

## 深浅拷贝的区别和实现
### 数组的浅拷贝:
如果是数组, 我们可以利用数组的一些方法, 比如slice,concat方法返回一个新数组的特性来实现拷贝, 但加入数组嵌套了对象或者数组的话, 使用concat方法克隆并不完整, 如果数组元素是基本类型, 就会拷贝一份,互不影响, 而如果是对象或数组, 就会只拷贝对象和数组的引用,这样我们无论在新旧数组进行了修改, 两者都会发生变化,我们把这种复制引用的拷贝方法称为浅拷贝


深拷贝就是指完全的拷贝一个对象,即使嵌套了对象,两者也相互分离,修改一个对象的属性, 不会影响另一个

如何深拷贝一个数组
1. 这里介绍一个技巧, 不仅适用于数组还适用于对象! 那就是:

    ```js
    var arr = ['old',1,true,['old1','old2'],{old:1}]
    var new_arr = JSON.parse(JSON.stringify(arr));
    console.log(new_arr);
    ```
    原理就是JSON对象中的stringify可以把一个js对象序列化为一个JSON字符串, parse可以把JSON字符串反序列化为一个js对象, 通过这两个方法, 也可以实行对象的深复制

     但这个方法不能拷贝函数

2. 浅拷贝的实现

    以上的三个方法 concat, slice, JSON.stringify都是技巧类, 根据实际项目情况选择使用, 我们可以思考下如何实现一个对象或数组的浅拷贝,遍历对象, 然后把属性和属性值都放在一个新的对象里即可
    ```js
    var shallowCopy = function(obj){
        // 只拷贝对象
        if(typeof obj !== 'object') return;

        // 根据obj的类型判断是 新建一个数组还是对象

        var newObj = obj instanceof Array?[]:{};

        // 遍历obj, 并且判断是obj的属性才拷贝
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                newObj[key] = obj[key]
            }
        }
        return newObj;
    }
    ```
3. 深拷贝实现

    那如何实现一个深拷贝呢? 说起来也好简单,我们在拷贝的时候判断一下属性值的类型, 如果是对象,我们递归调用深拷贝函数就好了
    ```js
    var deepCopy = function(obj){
        if(typeof obj !== 'object') return;
        var newObj = obj instanceof Array?[]:{};
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]):obj[key];
            }
        }
        return newObj;
    }
    ```

## js中的string的startsWith和indexOf两种方法的区别
- startsWith函数，`str.startsWith(searchString[, position])`，，`searchString`搜索的字符串，position，可选，从哪个位置开始搜索，如果以position开始的字符串以搜索字符串开头，则返回`true`，否则返回`false`
- indexOf函数，`indexOf`函数可返回某个指定字符串在字符串中首次出现的位置

## js字符串转数字的方法

通过函数 `parseInt()`, 可解析一个字符串，并返回一个整数，语法为`parseInt(string, radix)`

- string: 被解析的字符串
- radix：表示要解析的数字的基数，默认是十进制，如果`radix<2`或`>36`,则返回NaN

## let const var 的区别, 什么是块级作用域,如何用es5的方法实现块级作用域(立即执行函数), ES6呢?
提起这三个最明显的区别是var声明的变量是全局或者整个函数块的，而let,const声明的变量是块级的变量，var声明的变量存在变量提升，let,const不存在，let声明的变量允许重新赋值，const不允许

## ES6 箭头函数的特性
es6增加了箭头函数, 基本语法为
```js
let fun = value => value;
```
相当于
```js
let func = function(value){
    return value;
}
```
箭头函数与普通函数的区别在于:
1. 箭头函数没有this, 所以需要通过查找作用链来确定this的值, 这就意味着如果箭头函数被非箭头函数包含, this绑定的最近一层非箭头函数的this
2. 箭头函数没有自己的arguments对象, 但是可以访问外围函数的arguments对象
3. 不能通过new关键字调用, 同样也没有new.target值和原型

## setTimeOut和Promise的执行顺序
首先我们来看这样一道题:
```js
setTimeout(function(){
    console.log(1);
},0);
new Promise(function(res,reh){
    console.log(2)
    for(let i=0;i<10000;i++){
        if(i===10) console.log(10)
        i ==9999 && resolve();
    }
    console.log(3)
}).then(function(){
    console.log(4)
})
console.log(5);
```
输出答案: 2 10 3 5 4 1 

要先弄清楚`setTimeout(func,0)`何时执行, `promise`何时执行, then何时执行

`setTimeout`这种异步操作的回调，只有主线程中没有执行任何同步代码的前提下，才会执行异步回调，而`setTimeout（fun,0）`表示立刻执行，也就是用来改变任务的执行顺序，要求浏览器尽可能快的进行回调

`promise`何时执行，由上图可知`promise`新建后立即执行，所以`promise`构造函数里代码同步执行的，

`then`方法指向的回调将在当前脚本所有同步任务执行完成后执行，

那么`then`为什么比`setTimeout`执行的早呢，因为`setTimeout（fun,0）`不是真的立即执行，

经过测试得出结论：执行顺序为：`同步执行的代码-》promise.then->setTimeout`

## 有了解过事件模型吗, DOM0级和DOM2级有什么区别,DOM的分级是什么

JSDOM事件流存在如下三个阶段:
1. 事件捕获阶段
2. 处于目标阶段
3. 事件冒泡阶段

JSDOM标准事件流的触发的先后顺序为: 先捕获再冒泡,

点击DOM节点时, 事件传播顺序: 事件捕获阶段, 从上往下传播, 然后到达事件目标节点, 最后是冒泡阶段, 从下往上传播

DOM节点添加事件监听方法`addEventListener(DOM, func, capture)`中参数`capture`可以指定该监听是添加在事件捕获阶段还是事件冒泡阶段,为`false`是事件冒泡, 为true是事件捕获,并非所有的事件都支持冒泡, 比如focus, blur等等, 我们可以`event.bubbles`来判断

事件模型有三个常用方法:

- `event.stopPropagation`: 阻止捕获和冒泡阶段中,当前事件的进一步传播
- `event.stopImmediatePropagation`:  阻止调用相同事件的其他侦听器
- `event.preventDefault`: 取消该事件(假如事件是可取消的)而不停止事件的进一步传播
- `event.target`: 指向触发事件的元素,在事件冒泡过程中这个值不变
- `event.currentTarget = this`: 事件绑定的当前元素,只有被点击时目标元素的`target`才会等于`currentTarget`

最后，对于执行顺序的问题，如果`DOM`节点同时绑定了两个事件监听函数，一个用于捕获，一个用于冒泡，那么两个事件的执行顺序真的是先捕获在冒泡吗，答案是否定的，绑定在被点击元素的事件是按照代码添加顺序执行的，其他函数是先捕获再冒泡


## JS的基本数据类型有哪些，基本数据类型和引用数据类型的区别，NaN是什么的缩写，JS的作用域类型，undefined==null返回的结果是什么，undefined与null的区别在哪，写一个函数判断变量类型

JS的基本数据类型有

- string 字符串
- number 数字
- boolean 布尔
- null
- bigInt
- symbol
- undefined

基本数据类型是按值访问的，也就是说我们可以操作保存在变量中的实际的值，

引用数据类型
- object

基本数据类型和引用数据类型的区别如下：

1. 基本数据类型的值是不可变的, 任何方法都无法改变一个基本类型的值, 当这个变量重新赋值后看起来变量的值是改变了,但是这里变量名只是指向变量的一个指针, 所以改变的是指针的指向改变,该变量是不变的, 但是引用类型可以改变
2. 基本数据类型不可以添加属性和方法,但是引用类型可以
3. 基本数据类型的赋值是简单赋值, 如果从一个变量向另一个变量赋值基本类型的值, 会在变量对象上创建一个新值, 然后把该值复制到为新变量分配的位置上,引用数据类型的赋值是对象引用
4. 基本数据类型的比较是值的比较, 引用类型的比较是引用的比较, 比较对象的内存地址是否相同
5. 基本数据类是存放在栈区的,引用数据类型同时保存在栈区和堆区

NaN是js中的特殊值,表示非数字,NaN不是数字,但是它的数据类型是数字,它不等于任何值,包括自身, 在布尔运算时被当作false,NaN在任何数运算得到的结果都是NaN, 当运算失败或者运算无法返回争取正确的数值的就会返回NaN,一些数学函数的运算结果也会出现NaN

### JS的作用域类型:

一般认为的作用域是词法作用域,此外JS还提供了一些动态改变作用域的方法, 常见的作用域类型有:

- 函数作用域, 如果在函数内部我们给未定义的一个变量赋值, 这个变量会转变成为一个全局变量
- 块级作用域: 块作用域把标识符限制在`{}`中
- 改变函数作用域的方法
  - eval(), 这个方法接受一个字符串作为参数, 并将其中的内容视为好像在书写时就存在于程序中这个位置的代码
  - whit关键字: 通常被当作重复引用同一个对象的多个属性的快捷方式

### undefined 与 null
目前`null`和 `undefined` 基本是同义的, 只有一些细微的区别, `null`表示没有对象, `undefined`表示缺少值, 就是此处应该有一个值但是还没有定义,因此 `undefined == null` 应该返回 `false`, 但是在规定中: `undefined == null` 为 `true`

###  == 和 === 的区别:

在做 `==`比较时, 不同类型的数据会先转换成一致后再做比较, `===`中如果类型不一致就直接返回false, 一致的才会比较

类型判断函数,使用 typeof 即可, 首先判断是否为null, 之后用`typeof` 判定对象, 如果是`object` 的话, 再用`array.isArray`判断是否为数组, 如果是数字的话, 用isNaN判断是否是`NaN`即可

### 扩展学习
js采用的是词法作用域, 也就是静态作用域,所以函数的作用域在函数定义的时候就决定了

看如下例子:
```js
var value  =1 
function foo(){
    console.log(value)
}

function bar(){
    var value =2;
    foo();
}

bar()
```
假设JS采用静态作用域,让我们分析下执行过程:

- 执行foo函数,先从foo函数内部查找是否有局部变量value,如果没有, 就根据书写的位置,查找上面一层的代码,也就是value等1, 所以结果会打印1

假设js采用动态作用域,让我们分析下执行过程:

- 执行foo函数,依然是从foo函数内部查找是否有局部变量value, 如果没有,就从调用函数的作用,也就是bar函数内部查找value变量, 所以结果会打印2 

前面我们已经说了,js采用的是静态作用域,所以这个例子的结果是1

## setTimeout(fn,100); 100毫秒是如何权衡的

setTimeout()函数只是将事件插入了任务列表,必须等到当前代码执行完, 主线程才会去执行它指定的回调函数,有可能要等很久,所以没有办法保证回调函数一定会在setTimeout指定的时间内执行, 100毫秒是 插入队列的时间 + 等待的时间

## js的垃圾回收机制

GC(garbage collection), GC执行时, 中断代码,停止其他操作, 遍历所有对象,对于不可访问的对象进行回收, 在V8引擎中使用两种优化方法

- 回收方法:
  - 引用计次, 当对象被引用的次数为零时,进行回收,但是循环引用时,两个对象都至少被引用了一次, 因此导致内存泄漏
- 标记清楚

## 写一个newBind函数, 完成bind的功能
`bind()`,创建一个新函数,当这个新函数被调用时, bind()的第一个参数将作为它运行时的this,之后的一系列参数将会传递的实参前传入作为它的参数

```js
Function.prototype.bind2 = function(context){
    if(typeof this !== 'function'){
        throw new Error('Function.prototype.bind  -- what is trying to be bound is not callable');
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);
    var fNOP = function (){};
    var fBound =  function(){
        self.apply(this instanceof self ? this:context,args.concat(Array.slice.call(arguments)));
    }
    fNOP.prototype = this.prototype;
    fBound.prototype= new fNOP();
    return fBound;
}
```

## 怎么获得对象上的属性: 比如说通过Object.key()

从ES5开始, 有三种方法可以列出对象的属性

- `for(let i in obj)` 该方法依次访问以恶搞对象及其原型链中所有可枚举的类型
- `Object.keys`: 返回一个数组, 包括所有可枚举的属性
- `object.getOwnPropertyName`: 返回一个数组包含不可枚举的属性


## 简单讲一讲ES6的一些新特性
ES6在变量的声明和定义方面增加了 `let`, `const`声明变量,有局部变量的概念, 赋值中有比较吸引人的结构赋值, 通过es6对字符串,数组,正则,对象,函数等拓展了一些方法,如字符串方面的模板字符串, 函数方面的默认参数, 对象方面属性的简洁表达式. ES6也引入了新的数据类型symbol, 新的数据结构set和map,symbol可以通过typeof检测出来,为解决异步回调问题, 引入了promise和generator, 还有最为吸引人实现了class和模块, 通过class可以更好的面向对象编程, 使用模块加载方便模块化编程, 当然考虑到浏览器兼容性, 我们在实际开发中需要使用babel进行编译

重要特性:
- 块级作用域: ES5只有全局作用域和函数作用域,块级作用域的好处是不再需要立即执行的函数表达式,循环体中的闭包不再有问题
- rest参数: 用于获取参数的多余参数,这样就不需要使用arguments对象了
- promise: 一种异步编程的解决方案, 比传统的解决方案回调函数和事件更合理强大
- 模块话: 其模块功能主要有两个命令构成, `export` 和`import`, `export`命令用于规定模块的对外接口, `import`命令用于输入其他模块提供的功能

## call和apply是用来做什么?
call和apply的作用是一模一样的, 只是传参的形式有区别而已
1. 改变this的指向
2. 借用别的对象的方法
3. 调用函数, 因为apply, call方法会使函数立即执行

## 了解事件代理吗? 这样做有什么好处
事件代理/事件委托：利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的事件，


简而言之：事件代理就是说我们将事件添加到本来要添加的事件的父节点，将事件委托给父节点来触发处理函数，这通常会使用在大量的同级元素需要添加同一类事件的时候，比如一个动态的非常多的列表，需要为每个列表项都添加点击事件，这时就可以使用事件代理，通过判断e.target.nodeName来判断发生的具体元素，这样做的好处是减少事件绑定，同事动态的DOM结构任然可以监听，事件代理发生在冒泡阶段

## 给两个构造函数A和B，如何实现A继承B？
```js
function A(...) {}  A.prototype...
function B(...) {}  B.prototype...
A.prototype = Object.create(B.prototype);
// 再在A的构造函数里new B(props);
```

##  问能不能正常打印索引
```js
for(var i = 0; i < lis.length; i++) {
lis[i].addEventListener('click', function(e) {
alert(i);
}, false)
}
```
不能, 在click的时候，已经变成length了

## 如果已经有三个promise，A、B和C，想串行执行，该怎么写？
```js
// promise
A.then(B).then(C).catch(...)
// async/await
(async ()=>{
await a();
await b();
await c();
})()
```
## 知道private和public吗
- public：public表明该数据成员、成员函数是对所有用户开放的，所有用户都可以直接进行调用
- private：private表示私有，私有的意思就是除了class自己之外，任何人都不可以直接使用

## 基础的js
```js
Function.prototype.a = 1;
Object.prototype.b = 2;

function A() {}
var a = new A();
console.log(a.a, a.b); // undefined, 2
console.log(A.a, A.b); // 1, 2
```