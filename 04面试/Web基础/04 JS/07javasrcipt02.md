## js判断类型
判断方法: typeof(), instanceof, Object.prototype.toString.call()等

## 数组常用方法
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
- map()
- 等等

## 数组去重
1. indexOf循环去重
2. ES6 set去重, Array.from(new Set(array))
3. Object 键值对去重; 把数组的值存成Object的key值, 比如 Object[value1] = true, 在判断另一个值的时候, 如果Object[value2]存在的话,就说明该值是重复的

## 闭包有什么用
1. 什么是闭包
   
   闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在。闭包就是就是函数的“堆栈”在函数返回后并不释放，我们也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配。当在一个函数内定义另外一个函数就会产生闭包。

2. 为什么要用：

- **匿名自执行函数**：我们知道所有的变量，如果不加上var关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如：别的函数可能误用这些变量；造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)。除了每次使用变量都是用var关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护，可以用闭包。

- **结果缓存**：我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。

- **封装**：实现类和继承等。

## 事件代理在捕获阶段的实际引用
可以在父元素层面阻止事件向子元素传播, 也可以代替子元素执行某些操作

## 去掉字符串首尾空格
使用正则 `(^\s*)|(\s*$)` 即可

## 性能优化
1. 减少HTTP请求
2. 使用内容发布网络（CDN）
3. 添加本地缓存
4. 压缩资源文件
5. 将CSS样式表放在顶部，把javascript放在底部（浏览器的运行机制决定）
6. 避免使用CSS表达式
7. 减少DNS查询
8. 使用外部javascript和CSS
9. 避免重定向
10. 图片`lazyLoad`

## 来讲讲JS的闭包吧
### 概念
闭包是指有权访问另外一个函数作用域中的变量的函数。

闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在。闭包就是就是函数的“堆栈”在函数返回后并不释放，我们也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配。当在一个函数内定义另外一个函数就会产生闭包。

### 为什么要用：

- **匿名自执行函数**：我们知道所有的变量，如果不加上var关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如：别的函数可能误用这些变量；造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)。除了每次使用变量都是用var关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护，可以用闭包。

- **结果缓存**：我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。

## 能来讲讲JS的语言特性吗
- 运行在客户端浏览器上；
- 不用预编译，直接解析执行代码；
- 是弱类型语言，较为灵活；
- 与操作系统无关，跨平台的语言；
- 脚本语言、解释性语言

## 如何判定一个数组
```js
Object.prototype.call.toString()

instanceof
```

## 你说到typeof，能不能加一个限制条件达到判断条件
typeof只能判断是object,可以判断一下是否拥有数组的方法

##  JS实现跨域
- **`JSONP`**：通过动态创建script，再请求一个带参网址实现跨域通信。
- **`document.domain + iframe`跨域**：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
- **`location.hash + iframe`跨域**：a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。

- **`window.name + iframe`跨域**：通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。

- **`postMessage`跨域**：可以跨域操作的window属性之一。

- **`CORS`**：服务端设置`Access-Control-Allow-Origin`即可，前端无须设置，若要带`cookie`请求，前后端都需要设置。
- **代理跨域**：启一个代理服务器，实现数据的转发

参考: [前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)

## Js基本数据类型
基本数据类型：undefined、null、number、boolean、string、symbol,bigInt

- Boolean
- Null
- Undefined
- Number
- BigInt
- String
- Symbol

## js深度拷贝一个元素的具体实现
```js
var deepCopy = function(obj) {
   if (typeof obj !== 'object') return;
   var newObj = obj instanceof Array ? [] : {};
   for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
         newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
   }
   return newObj;
}
```
## 之前说了ES6set可以数组去重，是否还有数组去重的方法
1. indexOf循环去重
2. Object 键值对去重；把数组的值存成 `Object` 的 `key` 值，比如 `Object[value1] = true`，在判断另一个值的时候，如果 `Object[value2]`存在的话，就说明该值是重复的。

## 重排和重绘，讲讲看
**重绘（repaint或redraw）**：当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。

触发重绘的条件：改变元素外观属性。如：color，background-color等。

注意：table及其内部元素可能需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多花两倍时间，这就是我们尽量避免使用table布局页面的原因之一。

**重排（重构/回流/reflow）**：当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。

**重绘和重排的关系**：在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为重绘。所以，重排必定会引发重绘，但重绘不一定会引发重排。

## JS的全排列
给定一个字符串，输出该字符串所有排列的可能。如输入“abc”，输出“abc,acb,bca,bac,cab,cba”。
```js
function permutate(str) {
      var result = [];
      if(str.length > 1) {
         var left = str[0];
         var rest = str.slice(1, str.length);
         var preResult = permutate(rest);
      for(var i=0; i<preResult.length; i++) {
         for(var j=0; j<preResult[i].length; j++) {
               var tmp = preResult[i],slice(0, j) + left + preResult[i].slice(j, preResult[i].length);
         result.push(tmp);
         }
      }
      } else if (str.length == 1) {
      return [str];
   }
   return result;
}
```
## 不同数据类型的值的比较, 是怎么转换的, 有什么规则

![](./images/311436_1552428573113_1325658F6CAFABD8492C05155F5B8281.png)

## null == undefined 为什么

要比较相等性之前,不能将null 和undefined转换成其他任何值, 但null == undefined 会返回 true,. ECMAScript规范中是这样定义的

## this的指向 哪几种
1. 默认绑定: 全局环境中, this默认绑定到window
2. 隐私绑定: 一般地,被直接对象所包含的函数调用时,也成为方法嗲用,this隐式绑定到该直接对象
3. 隐式丢失: 隐式丢失是指被隐式绑定的函数丢失绑定对象, 从而默认绑定到window.
4. 显示绑定: 通过call(),apply(),bind()方法把对象绑定到this上
5. new绑定:如果函数或者方法调用之前带有关键字new,它就构成构造函数调用.对于this绑定来说,称为new绑定
   1. 构造函数通常不使用`return`关键字, 他们通常初始化新对象, 当构造函数的函数体执行完毕时, 它会显示返回. 在这种情况下,构造函数调用表达式的计算结果就是这个新对象的值
   2. 如果构造函数使用return语句,但没有指定返回值, 或者返回一个原始值, 那么这时将忽略返回值, 同时使用这个新对象作为调用结果
   3. 如果构造函数显示地使用return语句返回一个对象,那么调用表达式的值就是这个对象

## 暂停死区
在代码块内, 使用let, const命令声明变量之前,该变量都是不可用的. 这在语法上,称为"暂时性死区"

## 写一个深度拷贝
```js
function clone( obj ) {
      var copy;
      switch( typeof obj ) {
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
      case "object": // object 分为两种情况 对象(Object) 和 数组(Array)
      if(obj === null){
         copy = null;
      }else if(Object.prototype.toString.call(obj).slice(8,-1) === "Array"){
            // Array.isArray(obj) 
            copy = [];
            for(let i=0;i<obj.length;i++){
               copy.push(clone(obj[i]))
            }
      }
      else{
         copy = {};
         for(let j in obj){
            copy[j] = clone(obj[j])
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
## 有一个游戏叫做Flappy Bird，就是一只小鸟在飞，前面是无尽的沙漠，上下不断有钢管生成，你要躲避钢管。然后小明在玩这个游戏时候老是卡顿甚至崩溃，说出原因（3-5个）以及解决办法（3-5个）

原因可能是:
1. 内存溢出问题
2. 资源过大问题
3. 资源加载问题
4. canvas绘制频率问题

解决办法:

1. 针对内存溢出问题，我们应该在钢管离开可视区域后，销毁钢管，让垃圾收集器回收钢管，因为不断生成的钢管不及时清理容易导致内存溢出游戏崩溃。
2. 针对资源过大问题，我们应该选择图片文件大小更小的图片格式，比如使用webp、png格式的图片，因为绘制图片需要较大计算量。
3. 针对资源加载问题，我们应该在可视区域之前就预加载好资源，如果在可视区域生成钢管的话，用户的体验就认为钢管是卡顿后才生成的，不流畅。
4. 针对canvas绘制频率问题，我们应该需要知道大部分显示器刷新频率为60次/s,因此游戏的每一帧绘制间隔时间需要小于`1000/60=16.7ms`，才能让用户觉得不卡顿。 

## 编写代码，满足以下条件： （1）Hero("37er");执行结果为 Hi! This is 37er （2）Hero("37er").kill(1).recover(30);执行结果为 Hi! This is 37er Kill 1 bug Recover 30 bloods （3）Hero("37er").sleep(10).kill(2)执行结果为 Hi! This is 37er //等待10s后 Kill 2 bugs  //注意为bugs （双斜线后的为提示信息，不需要打印）
```js
function Hero(name){
   let o = new Object();
   o.name = name;
   o.time = 0;
   console.log("Hi!This is "+ o.name);
   o.kill = function(bugs){
      if(bugs === 1){
         console.log("Kill "+ bugs + " bug");
      }else{
         setTimeout(function(){
            console.log("Kill " + bugs + " bugs");
         },1000*this.time);
      }
      return o;
   }
   o.recover = function(bloods){
      console.log("Recover " + bloods + " bloods");
      return o;
   }
   o.sleep = function(sleepTime){
      o.time = sleepTime;
      return o;
   }
   return o;
}
```

## 什么是按需加载
当用户触发了动作时才加载对应的功能。触发的动作，是要看具体的业务场景而言，包括但不限于以下几个情况：鼠标点击、输入文字、拉动滚动条，鼠标移动、窗口大小更改等。加载的文件，可以是JS、图片、CSS、HTML等。

## 说一下什么是 virtual dom
用JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异 把所记录的差异应用到所构建的真正的DOM树上，视图就更新了。Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。

## webpack用来干什么的
`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器(module bundler)。当 `webpack` 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。

## ant-design优点和缺点
- 优点：组件非常全面，样式效果也都比较不错。
- 缺点：框架自定义程度低，默认UI风格修改困难。

##  JS中继承实现的几种方式，
1. 原型链继承，将父类的实例作为子类的原型，他的特点是实例是子类的实例也是父类的实例，父类新增的原型方法/属性，子类都能够访问，并且原型链继承简单易于实现，缺点是来自原型对象的所有属性被所有实例共享，无法实现多继承，无法向父类构造函数传参。
2. 构造继承，使用父类的构造函数来增强子类实例，即复制父类的实例属性给子类，

   构造继承可以向父类传递参数，可以实现多继承，通过call多个父类对象。但是构造继承只能继承父类的实例属性和方法，不能继承原型属性和方法，无法实现函数服用，每个子类都有父类实例函数的副本，影响性能
3. 实例继承，为父类实例添加新特性，作为子类实例返回，实例继承的特点是不限制调用方法，不管是new 子类（）还是子类（）返回的对象具有相同的效果，缺点是实例是父类的实例，不是子类的实例，不支持多继承
4. 拷贝继承：特点：支持多继承，缺点：效率较低，内存占用高（因为要拷贝父类的属性）无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）
5. 组合继承：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
6. 寄生组合继承：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

## 写一个函数,第一秒打印1, 第二秒打印2
1. 使用let块级作用域

   ```js
   for(let i =0;i<=5;i++){
      setTimeout(()=>console.log(i),1000*i);
   }
   ```
2. 闭包

   ```js
   for(var i =0 ;i<5;i++){
      (function(i){
         setTimeout(()=>console.log(i),1000*i)
      })(i);
   }
   ```