## get请求传参长度的误区

误区: 我们经常说get请求参数的大小存在限制, 而post请求的参数大小是无限制的, 实际上http协议从未归档 get/post的请求胀肚限制是多少. 对get请求参数的限制是来源与浏览器或web服务器的, 浏览器或web浏览器限制了url的长度, 为了明确这个概念,我们必须再次强调下面几点:
- http协议未规定 get和post长度限制
- get的最长长度显示是因为 浏览器和web服务器限制了url的长度
- 不同的浏览器和web服务器,限制的最大长度不一样
- 要支持IE,则最大胀肚未2083byte,若只支持chrome,则最大长度8182byte

## 说一下闭包
一句话可以概括: 闭包就是能够读取其他函数内部变量的函数, 或者子函数在外调用, 子函数所在的父函数的作用域不会被释放

## 说一下类的创建和继承
1. 类的创建(es5): new 一个function, 在这个function的prototype里面增加属性和方法

    下面来创建一个Animal类:
    ```js
    // 定义一个动物类
    function Animal(name){
        // 属性
        this.name = name || 'Animal';
        // 实例方法
        this.sleep = function(){
            console.log(this.name + '正在睡觉!');
        }
    }
    // 原型方法
    Animal.prototype.eat = function(food){
        console.log(this.name + '正在吃' + food);
    }
    ```
    这样就生成了一个Animal类, 实例化生成对象后, 有方法和属性


2. 类的继承 -- 原型链继承

    ```js
    function Cat(){
        Cat.prototype = new Animal();
        Cat.prototype.name = 'cat';
        // Test Code
        var cat = new Cat();
        console.log(this.name);
        console.log(cat.eat('fish'));
        console.log(cat.sleep());
        console.log(cat instanceof Animal );  // true
        console.log(cat instanceof  Cat); // true
    }
    ```
    介绍: 在这里我们可以看到 `new` 了一个空对象, 这个空对象指向 `Animal` 并且Cat.prototype 指向了这个空对象,这种就是基于原型链的继承

    特点: 基于原型链, 既是父类的实例,也是子类的实例

    缺点:无法实现多继承

3. 构造继承: 使用父类的构造函数来增强子类实例, 等于是复制父类的实例属性给子类(没用到原型)

    ```js
    function Cat(name){
        Animal.call(this);
        this.name = name || 'Tom';
    }
    // Test Code
    var cat = new Cat();
    console.log(cat.name)
    console.log(cat.sleep());
    console.log(cat instanceof Animal );  // false
    console.log(cat instanceof  Cat); // true
    ```
    特点: 可以实现多继承

    缺点: 只能继承父类实例的属性和方法, 不能继承原型上的属性和方法


4. 实例继承和拷贝继承

    实例继承: 为父类实例添加新特性, 作为子类实例返回

    拷贝继承: 拷贝父类元素上的属性和方法

    上述两个实用性不强, 不一一列举

5. 组合继承: 相当于构造继承和原型继承的组合体, 通过调用父类构造, 继承父类的属性并保留传参的优点,然后通过将父类实例作为子类原型, 实现函数复用

    ```js
    function Cat(name){
        Animal.call(this);
        this.name = name || 'Tom';
    }
    Cat.prototype = new Animal();
    Cat.prototype.constructor = Cat;

    // Test Code
    var cat = new Cat();

    console.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal); // true
    console.log(cat instanceof Cat);   // true
    ```
    特点: 可以继承实例属性/方法, 也可以继承原型属性/方法

    缺点: 调用了两次父类构造函数, 生成了两份实例

6. 寄生组合继承: 通过寄生方式,砍掉父类的实例属性, 这样, 在调用两次父类的构造的时候, 就不会初始化两次实例方法/属性

    ```js
    function Cat(name){
        Animal.call(this);
        this.name = name || 'Tom';
    }
    (function(){
        // 创建一个没有实例方法的类
        var Super = function(){};
        Super.prototype = Animal.prototype;
        // 将实例作为子类的原型
        Cat.prototype = new Super();
    })();


    // Test Code
    var cat = new Cat();
    console.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal);   // true
    console.log(cat instanceof Cat); // true
    ```
    较为推荐

## 如何解决异步回调地狱
promise, generator, async/await

## 说说前端中的事件流
HTML中与javascript交互是通过事件驱动来实现的, 例如鼠标点击事件onclick, 页面的滚动事件onscroll等等, 可以向文档或者文档中的元素添加事件侦听器来预定事件, 想要知道这些事件是在什么时候进行调用的, 就需要了解一下" 事件流" 的概念


什么是事件流: 事件流秒速的是从页面中接受事件的顺序, DOM2级事件流包括下面几个阶段:
- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

addEventListener: addEventListener是DOM2级事件新增的指定事件处理程序的操作, 这个方法接受3个参数: 要处理的事件名, 作为事件处理程序的函数和一个布尔值. 最后这个布尔值参数如如果是true, 表示在捕获阶段调用事件处理程序; 如果是false, 表示在冒泡阶段调用事件处理程序

IE只支持事件冒泡

## 如何让事件先冒泡后捕获

在DOM标准事件模型中,是先捕获后冒泡, 但是如果要实现先冒泡后捕获的效果, 对于同一个事件, 监听捕获和冒泡, 分别对应相应的处理函数, 监听函数,先暂缓执行, 直到冒泡事件被捕获后再执行捕获之间.

## 说一下事件委托
简介: 事件委托指的是, 不在事件的发生地(直接dom)上设置监听函数, 而是再其父元素山设置监听函数, 通过事件冒泡,父元素可以监听到子元素上事件的触发,通过判断事件发送元素DOM的类型, 来做出不同的响应

举例: 最经典的就是url和li标签的事件监听,比如我们在添加事件时候,采用事件委托机制, 不会在li标签上直接添加, 而是在ul父元素上添加

好处: 比较合适动态元素的绑定, 新添加的子元素也会有监听函数, 也可以有事件触发机制


## 说一下图片的懒加载和预加载
预加载: 提前加载图片, 当用户需要查看时可直接从本地缓存中渲染

懒加载: 懒加载的主要目的是作为服务器前端的优化, 减少请求数或延迟请请求树

两种技术的本质: 两者的行为是相反的, 一个是提前加载, 一个是迟缓甚至不加载, 懒加载对服务器前端有一定的缓解压力作用,预加载则会增加服务器前端压力

## mouseover 和 mouseenter 的区别
mouseover: 当鼠标移入元素或其子元素都会触发事件, 所以有一个重复触发,冒泡的过程. 对应的移除事件是mouseout

mouseenter: 当鼠标移除元素本身(不包含元素的子元素)会触发事件, 也就是不会冒泡, 对应的移除事件是mouseleave

## js的new操作符做了哪些事情
new操作符新建了一个空对象, 这个对象原型执行钩爪函数的prototype, 执行构建函数后返回这个对象

## 改变函数内部this指针的指向函数(bind, apply,call的区别)
通过apply和call改变函数的this指向,他们两个函数的第一个参数都是一样的 表示要改变指向的那个对象, 第二参数,apply是数组,而call是arg1,arg2...这种形式.

通过bind改变this作用域会返回一个新的函数, 这个函数不会马上执行.

## js的各种位置,比如clientHeight, scrollHeight, offsetHeight,以及 scrollTop,offsetTop,clientTop的区别?

- clientHeight: 表示的是可视化区域的高度,不包括border和滚动条
- offsetHeight: 表示可视化的高度, 包含了border和滚动条
- scrollHeight: 表示了所有区域的高度, 包含了因为滚动被隐藏部分
- clientTop: 表示边框border的宽度, 在未指定的情况下一般为0
- scrollTop: 滚动后被隐藏的高度, 获取对象相对于offsetParent属性指定的夫坐标(css定位的元素或body元素) 距离顶端的高度

## js拖拽功能的实现
首先是三个事情, 分别是mousedown, mousemove,mouseup

当鼠标点击按下的时候,需要一个tag标识此时已经按下,可以执行 mousemove里面的具体方法

- clientX,clientY 标识的是鼠标的坐标, 分别标识横坐标和纵坐标, 并且我们用offsetX 和offsetY 来表示元素的元素的初始坐标,移动的举例应该是:

- 鼠标移动时候的坐标- 鼠标按下去时候的坐标, 
- 也就是说定位信息为:
  - 鼠标移动时候的坐标 - 鼠标按下去时候的坐标  + 元素初始情况下的 offsetLeft
  - 还有一点也是原理性的东西,也就是拖拽的同时是绝对定位,我们改变的是绝地定位条件下的left以及top等等值

- 补充: 也可以通过h5的拖放(Drag 和 drop)来实现

## 异步加载js的方法
- defer: 支持IE, 如果您的脚本不会改变文档的内容,可将defer属性加入到 `<script>`标签中, 以便加快处理文档的速度. 因为浏览器直到它能够安全地读取文档地剩余部分而不用执行脚本, 它将推迟脚本的解释, 直到文档已经显示给用户，触发 `DOMContentLoaded` 事件前执行, 有defer 属性的脚本会阻止 `DOMContentLoaded` 事件，直到脚本被加载并且解析完成。

- async: html5属性仅适用于外部脚本, 并且如果在IE中,同时存在defer和async, 那么`defer`的优先级比较高, 脚本将在页面完成时执行


## Ajax解决浏览器缓存问题
在ajax发送请求前加上: anyAjaxObj.setRequestHeader("If-Modified-Since","0")

在ajax发送请求前加上: anyAjaxObj.setRequestHeader("Cache-Control","no-cache")

在URL后面加上一个随机数: "fresh=" + Math.random()

在URL后面加上时间戳: "nowtime=" + new Date().getTime()

## js的节流和防抖

### 防抖（Debouncing）
防抖技术即是可以把多个顺序地调用合并成一次，也就是在一定时间内，规定事件被触发的次数
```js
// 简单的防抖动函数
function debounce(func, wait, immediate) {
    // 定时器变量
    var timeout;
    return function() {
        // 每次触发 scroll handler 时先清除定时器
        clearTimeout(timeout);
        // 指定 xx ms 后触发真正想进行的操作 handler
        timeout = setTimeout(func, wait);
    };
};
 
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
 
// 采用了防抖动
window.addEventListener('scroll',debounce(realFunc,500));
// 没采用防抖动
window.addEventListener('scroll',realFunc);
```
### 节流（Throttling）
节流函数，只允许一个函数在 X 毫秒内执行一次
```js
// 简单的节流函数
function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();
 
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
 
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
        // 没达到触发间隔，重新设定定时器
        }else{
            timeout = setTimeout(func, wait);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc(){
    console.log("Success");
}
// 采用了节流函数
window.addEventListener('scroll',throttle(realFunc,500,1000));
```

## js中的垃圾回收机制
必要性: 由于字符串,对象和数组没有固定大小,所有当他们的大小已知时, 才能对他们进行动态的存储分配. js程序每次创建字符串,数组会或对象时, 解释器都必须分配内存来存储那个实体. 只要像这样动态地分配了内存, 最终都要释放这些内存以便他们能够被再用,否则,js的解析器将会消耗完系统中所有可用的内存,造成系统崩溃

这段话解释了为什么需要系统需要垃圾回收, js不像c/c++,他有自己的一套垃圾回收机制(Garbage Collection). JavaScript的解释器可以检测何时程序不再使用一个对象,当他确定了一个对象是无用的时候,他就直到不再需要这个对象,可以把它所占用的内存释放掉了. 例如:
```js
var a = " hello world";
var b = "world";
var a = b;
// 这时, 会释放掉 "hello world", 释放内存以便再应用
```
垃圾回收的方法: 标记清楚, 计数引用

### 标记清除
这是最常见的垃圾回收方式, 当变量进入环境时,就标记这个变量为"进入环境", 从逻辑上讲, 永远不能释放进入环境的变量所占的内存,永远不能释放进入环境变量所占用的内存,只要执行流程进入相应的环境, 就可能用到他们. 当离开环境时,就标记为离开环境

垃圾回收器在运行的时候会给存储在内存中的变量都加上标记(所有相加), 然后去掉环境变量中的变量, 以及被环境变量中所引用的变量(条件性去除标记), 删除所有被标记的变量, 删除的变量无法在环境变量中被访问所以会被删除, 最后垃圾回收器, 完成了内存的清除工作,并回收他们所占用的内存

### 引用计数法
另一种不太常见的方法就是引用计数法, 引用计数法的意思就是每个值没引用的次数,当声明了一个变量,并用一个引用类型的值赋值给变量,则这个值的引用次数为1; 相反的,如果包含了对这个值引用的变量又取得了另外一个值,则原先的引用值引用次数就减1, 当这个值的引用次数为0的时候,说明没有办法再访问这个值了,因此就把所占的内存给回收进来,这样垃圾收集器再次运行的时候, 就会释放引用次数为0 的这些值

用引用计数法会存在内存泄露,下面来看原因:
```js
function problem(){
    var objA = new Object();
    var objB = new Object();
    objA.someOtherObject = objB;
    objB.anotherObject= objA;
}
```
在这个例子里面,objA和objB通过各自属性相互引用, 这样的话,两个对象的引用次数都为2, 在采用引用计数的策略中, 由于函数执行之后, 这两个对象都离开了作用域,函数执行完成之后,因为计数不为0,这样的相互引用如果大量存在就会导致内存泄漏

特别是在DOM对象中,也容易存在这种问题:
```js
var element = document.getElementById(' ');
var myObj = new Object();
myObj.element = element;
element.someObject = myObj;
```
这样就不会有垃圾回收的过程

## eval是做什么的
它的功能是将对应的字符串解析成js并执行, 应该避免使用js,因为非常消耗性能(2次, 一次解析成js,一次执行)

## 如何理解前端模块化
前端模块化就是复杂的文件变成一个一个独立的模块,比如js等等, 分成独立的模块有利于重用(复用性)和维护(版本迭代),这样会引来模块之间相互依赖的问题,所以有了commonJs规范,AMD,CMD规范等等,以及用于js打包(编译等处理)的工具webpack

## 说一下commonjs,AMD和CMD
一个模块是能实现特定功能的文件, 有了模块就可以方便的使用别人的代码,想要什么功能就能加载什么模块

Commonjs:开始于服务端的模块化, 同步定义的模块化,每个模块都是一个单独的作用域,模块输出,modules.exports,模块加载require()引入模块

AMD:中文名异步模块定义的意思

requireJs实现了AMD规范,主要用于解决下述两个问题

1. 多个文件有依赖关系,被依赖的文件需要早于依赖它的文件加载到浏览器

2. 加载的时候浏览器会停止页面渲染,加载文件越多,页面失去响应的时间越长

    语法:requireJs定义了一个函数define,它是全局变量,用来定于模块

    requireJS的例子:
    ```js
    // 定义模块
    define(['dependency'], function(){
        var name = ' Byron'
        function printName(){
            console.log(name);
        }
        return {
            printName:printName
        };
    });
    // 加载模块
    require(['myModule'], function(my){
        my.printName();
    })
    ```
requirejs定义了一个函数define,它是全局变量, 用来定义模块
```js
define(id? dependencies?,factory)
```
在页面上使用模块加载函数
```js
require([dependencies],factory);
```
总结AMD规范: require()函数在加载依赖函数的时候是异步加载的,这样浏览器不会失去响应,它指定的回调函数,只要前面的模块加载成功,才会去执行. 因为网页在加载js的时候会停止渲染, 因此我们可以通过异步的方式去加载js,而如果需要依赖某些,也是异步去依赖,依赖后再执行某些方法

## 对象深度克隆的简单实现
```js
function deepClone(obj){
    var newObj = obj instanceof Array ? []:{};
    for(var item in obj){
        var temple = typeof obj[item] =='object' ? deepClone(obj[item]):obj[item];
        newObj[item] = temple;
    }
    return newObj;
}
```
ES5常用的对象克隆的一种方式,注意数组是对象, 但是跟对象又有一定区别,所以我们一开始判断了一些类型, 决定newObj是对象还是数组.

## 实现一个once函数,传入函数参数只执行一次
```js
function once(func){
    var tag = true;
    return function(){
        if(tag){   
            func.apply(null,arguments);
            tag = false;
        }
    }
}
```
## 将原生的ajax封装成promise
```js
var myNewAjax = function(url){
    return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open('get',url);
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if(xhr.status === 200 && readyState == 4){
                var json = JSON.parse(xhr.responseText);
                resolve(json);
            }
        }else if(xhr.readyState == 4 && xhr.state !== 200){
            reject('error');
        }
    })
}
```
## js监听对象属性的改变
我们假设这里有一个user对象
1. 在es5中可以通过`Object.defineProperty` 来实现已有属性的监听

    ```JS
    Object.defineProperty(user,'name',{
        set: function(key,value){

        }
    })
    ```
    缺点: 如果id不在user对象中,则不能监听id的变化

2. 在es6中可以通过proxy来实现

    ```js
    var user = new Proxy({},{
        set:function(target,key,value,receiver){

        }
    })
    ```
    这样即使有属性在user中不存在,通过user.id来定义同样可以这样监听这个属性的变化

## 如果实现一个私有变量,用getName方法可以访问,不能直接访问
1. 通过`defineProperty`来实现

    ```js
    obj = {
        name: atrist,
        getName:function(){
            return this.name
        }
    }
    Object.defineProperty(obj,"name",{
        // 不可枚举 不可直接访问配置
    });
    ```
2. 通过函数的创建形式

    ```js
    function product(){
        var name="Atrist";
        this.getName = function(){
            return name;
        }
    }
    var obj = new product();
    ```


## == 和 ===, 以及`Object.is` 的区别
1. `==`
    主要存在: 强制转换成 number, 
    ```js
    " " == 0 // true
    "0" == 0 // true
    " " != "0" // true
    123 == "123" //true
    null == undefined // true
    +0 == -0 // true
    NaN == NaN  // false
    ```
2. `===`

    ```js
    +0 === -0 //true
    NaN === NaN // false

    ```
3. `Object.is`
    ```js
    Object.is(+0,-0);  // false
    Object.is(NaN,NaN) // true
    ```

## setTimeout,setInterval和requestAnimationFrame之间的区别

这里有一篇文章讲的是 `requestAnimationFrame`: https://www.cnblogs.com/xiaohuochai/p/5777186.html

于setTimeout和setInterval不同,`requestAnimationFrame`不需要设置时间间隔

大多数电脑显示器的刷新频率是60hz,大概相当于每秒钟重绘60次. 大多数浏览器都会对重绘操作加以限制, 不超过显示器的重绘频率,因为即使超过那个频率用户体验也不会提升, 因此,最平滑动画的最佳循坏间隔是 1000ms/60,约等于 16.6ms.

RAF采用的是系统时间间隔,不会因为前面的任务,不会影响RAF,但是如果前面的任务多的话,会响应setTimeout和setInterval真正运行时的时间间隔

特点:
1. requestAnimationFrame会把每一帧中的所有DOM操作集中起来,在一次重绘或回流中就完成,并且重绘或回流的时间间隔仅仅跟随浏览器的刷新频率
2. 在隐藏或不可见的元素中,`requestAnimationFrame`将不会进行重绘或回流, 这当然就意味着更少的CPU,GPU和内存使用量
3. `requestAnimationFrame`是浏览器专门为动画提供的API,在运行时浏览器回自动优化方法的调用,并且如果页面不是激活状态下的话,动画会自动暂停,有效节省了CPU开销

## 实现了一个两列等高布局, 讲讲思路
为了实现两列登高,可以给每列加上 `padding-bottom:9999px;margin-bottom:-9999px;`同时父元素设置`overflow:hidden;`

## 自己实现一个bind函数
原理: 通过apply或者call方式实现
1. 初始版本

    ```js
    Function.prototype.bind = function(obj,arg){
        var arg = Array.prototype.slice.call(arguments,1);
        var context = this;
        return function(newArg){
            arg = arg.concat(Array.prototype.slice.call(newArg));
            return context.apply(obj,arg);
        }
    }
    ```
2. 考虑到原型链

    为什么要考虑?因为在`new`一个`bind` 过生成的新函数的时候,必须的条件是要继承原函数的原型
    ```js
    Function.prototype.bind = function(obj,arg){
        var arg = Array.prototype.slice.call(arguments,1);
        var context = this;
        var bound = function(newArg){
            arg = arg.concat(Array.prototype.slice.call(newArg));
            return context.apply(obj,arg);
        }
        var F = function(){
            // 这里需要一个寄生组合继承
            F.prototype = context.prototype;
            bound.prototype = new F();
            return bound;
        }
    }
    ```

## 用setTimeout来实现setInterval
1. 用setTimeout()方法来模拟setInterval() 与 setInterval() 之间的什么区别?

    首先来看`setInterval`的缺陷,使用`setInterval()`创建的定时器确保了定时器代码规则地插入队列中. 这个问题在于: 如果定时器在代码再次添加到队列之前还没有完成执行, 结果就会导致定时器代码连续运行好几次,而之间没有间隔. 不过幸运的是: js引擎足够聪明,能够避免这个问题. 当使用 `setInterval()`时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。

    这种重复定时器的规则有两个问题: **1. 某些间隔会被跳过 2. 多个定时器的代码执行时间可能会比预期小**

    下面举列子说明:

    假设,某个`onclick`事件处理程序使用了 `setInterval()`来设置了一个200ms的重复定时器. 如果事件处理程序花了300ms多一点的时间完成

    ```html
    <img width="626" alt="2018-07-10 11 36 43" src="https://user-images.githubusercontent.com/17233651/42487876-92656f2c-8435-11e8-8a5f-0a97918039da.png">
    ```
    这个例子中的第一个定时器是在205ms处添加队列中,但是要过300ms才能执行. 在405ms又添加了一个副本, 在一个间隔,605ms处,第一个定时器代码还在执行中,而且队列中已经有一个定时器实例,结果是605ms的定时器代码不会添加到队列中, 结果是在5ms处添加的定时器代码执行结束后,405处的代码立即执行

    为了避免 `setInterval()`的重复定时器的这 2 个缺点，你可以用如下模式使用链式 `setTimeout()` 调用。
    ```js
    setTimeout(function(){
    //处理中
    setTimeout(arguments.callee, interval);
    }, interval);
    ```
    这个模式**链式调用了 setTimeout()**，每次函数执行的时候都会创建一个新的定时器。第二个`setTimeout()`调用使用了 `arguments.callee` 来获取对当前执行的函数的引用，并为其设置另外一个定时器。这样做的好处是，在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔。而且，它可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行。这个模式主要用于重复定时器，如下例所示。
    ```js
    setTimeout(function(){
    var div = document.getElementById("myDiv");
    left = parseInt(div.style.left) + 5;
    div.style.left = left + "px";
    if (left < 200){
    setTimeout(arguments.callee, 50);
    }
    }, 50);
    ```
    这段定时器代码每次执行的时候将一个`<div>`元素向右移动，当左坐标在 200 像素的时候停止。

    `JavaScript` 动画中使用这个模式很常见。

## js怎么控制一次加载一张图片, 加载完后在加载下一张
1. 方法1

    ```html
    <script type="text/javascript">
        var  obj = new Image();
        obj.src = "https://www.phpernote.com/uploadfiles/editor/201107240502201179.jpg"
        obj.onload = function(){
            alert('图片的宽度:' + obj.width +';图片的高度为:'+ obj.height);
            document.getElementById('mypic').innerHTML="<img src='"+ this.src = "' />";

        }
    </script>
    <div id="mypic"> onload....</div>
    ```

2. 方法2

    ```html
    <script type="text/javascript">
        var  obj = new Image();
        obj.src = "https://www.phpernote.com/uploadfiles/editor/201107240502201179.jpg"
        obj.onreadystatechange =function(){
            if(this.readyState == "complete"){
                alert('图片的宽度:' + obj.width +';图片的高度为:'+ obj.height);
                document.getElementById('mypic').innerHTML="<img src='"+ this.src = "' />";
            }

        }
    </script>
    <div id="mypic"> onload....</div>
    ```


## 代码的执行顺序
```js
setTimeout(function(){console.log(1)},0);
new Promise(function(res,rej){
    console.log(2);
    res();
}).then(function(){console.log(3)
}).then(function(){console.log(4)});

process.nextTick(function(){console.log(5)});

console.log(6);

// 输出  2, 6, 5, 3, 4, 1
```

代码执行顺序:
`script`(主程序代码)—>`process.nextTick`—>`Promises...`——>`setTimeout`——>`setInterval`——>`setImmediate`——> `I/O`——>`UI rendering`


## 如何实现sleep的效果(es5或者es6)
1. while循环的方式

    ```JS
    function sleep(ms){
        var start = Date.now(), expire = start +ms;
        while(Date.now() < expire);
        console.log('111');
        return;
    }
    ```
    执行`sleep(1000)`之后, 休眠了1000ms之后输出了1111. 上述循环的方式缺点很明显,容易造成死循环

2. 通过promise来实现

    ```js
    function sleep(ms){
        var temple = new Promise((resolve)=>{
            console.log(111);
            setTimeout(resolve,ms)
        });
        return temple;
    }
    sleep(500).then(function(){
        console.log(222)
    })

    // 先输出了1111, 延迟500ms后输出222
    ```
3. 通过async 封装

    ```js
    function sleep(ms){
        return new Promise((res)=>setTimeout(res,ms));
    }
    async function test(){
        var temple = await sleep(1000);
        console.log(111);
        return temple;
    }
    test();

    // 延迟 1000ms 输出111
    ```
4. 通过 `generate` 来实现

    ```js
    function *sleep(ms){
        yield new Promise(function(res,rej){
            console.log(111);
            setTimeout(res,ms);
        })
    }
    sleep(500).next().value.then(function(){console.log(2222)});
    ```


## 简单的实现一个promise

首先明确什么是promiseA+规范, 参考规范的地址: [promise](https://promisesaplus.com/)

如何实现一个promise, 参考我的文章

[实现一个完美符合promise/A+ 规范](https://github.com/forthealllight/blog/issues/4)
### A+规范
#### 1. 术语
1. promise是一个对象或者函数, 该对象或函数有一个`then`方法
2. "thenable"是一个对象或者函数，用来定义then方法
3. "value"是promise状态成功时的值
4. "reason"是promise状态失败时的值

明确 明确术语的目的，是为了在自己实现promise时，保持代码的规范性（也可以跳过此小节）

#### 2. 要求
1. 一个promise必须有3个状态，`pending`，`fulfilled(resolved)`，`rejected`当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态。当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。

    `promise`英文译为承诺，也就是说`promise`的状态一旦发生改变，就永远是不可逆的。

2. 一个`promise`必须有一个`then`方法，then方法接受两个参数：
    
    ```js
    promise.then(onFulfilled,onRejected)
    ```
    其中`onFulfilled`方法表示状态从`pending——>fulfilled(resolved)`时所执行的方法，而`onRejected`表示状态从`pending——>rejected`所执行的方法。

3. 为了实现链式调用，then方法必须返回一个`promise`

    ```js
    promise2=promise1.then(onFulfilled,onRejected)
    ```

### 实现一个符合Promise/A+ 规范的 Promise
```js
function myPromise(constructor){
    let self = this;
    self.status = "pending";   // 定义状态改变前的初始状态
    self.value = undefined;   // 定义状态为resolved的时候的状态
    self.reason = undefined; // 定义状态为rejected的时候的状态

    function resolve(value){
        //  两个 === "pending", 保证了状态的改变时不可逆的
        if(self.status === "pending"){
            self.value = value;
            self.status = "resolved";
        }
    }
    function reject(reason){
        //  两个 === "pending", 保证了状态的改变时不可逆的
        if(self.status === "pending"){
            self.value = value;
            self.status = "rejected";
        }

    }

    // 捕获构造异常
    try{
        constructor(resolve,reject);
    }catch(e){
        reject(e);
    }
}
```
同时,需要在myPromise的原型上定义链式调用的then方法
```js
myPromise.prototype.then = function(onFullfilled,onRejected){
    let self = this;
    switch(self.status){
        case 'resolved' : onFullfilled(self.value);
        break;
        case 'rejected' : onRejected(self.reason);
        break;
        default:
    }
}
```
上述就是一个初始版本的`myPromise`，在`myPromise`里发生状态改变，然后在相应的`then`方法里面根据不同的状态可以执行不同的操作。
```js
var p=new myPromise(function(resolve,reject){resolve(1)});
p.then(function(x){console.log(x)})
//输出1
```
但是这里`myPromise`无法处理异步的`resolve.`比如：
```js
var p=new myPromise(function(resolve,reject){setTimeout(function(){resolve(1)},1000)});

p.then(function(x){console.log(x)})
//无输出
```


## `Function.__proto__(getPrototypeOf)` 是什么?

获取一个对象的原型, 在chrome中可以通过`__proto__`的形式,或者在ES6中可以通过Object.getPrototypeOf的形式

那么 Function.proto 是什么?也就是说Function由什么对象继承而来
```js
Function.__proto__ == Object.prototype // false
Function.__proto__ == Function.prototype // true
```
我们发现 Function的原型也是Function

我们用图可以来明确这个关系

![](./images/42493275-f55d0860-844e-11e8-983f-e04189a4f3d8.png)

## 实现js中所有对象的深度克隆(包装对象, Date对象, 正则对象)
通过递归可以简单实现对象的深度克隆, 但是这种方法不管是ES5还是ES6实现,都有同样的缺陷, 就是只能实现特定的object的深度复制(比如数组和函数),不能实现包装对象Number, String, Boolean, 以及Date对象, RegExp对象的复制
1. 前文的方法

    ```js
    function deepClone(obj){
        var nameObj = obj instanceof Array ? []:{};
        for(var i in obj){
            newObj[i] = typeof obj[i] == 'object' ? deepClone(obj[i]):obj[i];
        }
        return  newObj;
    }
    ```
    这种方法可以实现一般对象和数组对象的克隆,比如:
    ```js
    var arr = [1,2,3];
    var newArr = deepClone(arr);
    // newArr -> [1,2,3]
    var obj ={
        x:1,
        y:2
    }
    var newObj = deepClone(obj);
    // newObj = {x:1,y:2}
    ```
    但是不能实现例如包装对象Number,String,Boolean,以及正则对象RegExp和Date对象的克隆,比如:
    ```js

    // Number 包装对象
    var num = new Number();
    typeof num // "object"
    var newNum = deepClone(num);
    // newNum -> {} 空对象

    // String 包装对象
    var str = new String('hello');
    typeof str //"object"
    var newStr = deepClone(str);
    // newStr -> {0:'h',1:'e',2:'l',3:'l',4:'o'};

    // Boolean 包装对象
    var bol = new Boolean(true);
    typeof bol; // "object"
    var newBol = deepClone(bol);
    // nweBol -> {} 空对象
    ```
2. `valueOf()`函数

    所有对象都有`valueOf`方法, `valueOf` 方法对于: 如果存在任意原始值, 它就默认将对象转换为表示它的原始值, 对像是复合值, 而且大多数对象无法真正表示为一个原始值, 因此默认的`valueOf()`方法简单地返回对象本身, 而不是返回一个原始值. 数组, 函数和正则表达式简单地继承了这个默认方法, 调用这些类型的实例的`valueOf()` 方法只是简单返回这个对象本身


    对于原始值或者包装类
    ```js
    function baseClone(base){
        return base.valueOf();
    }
    // Number 
    var num = new Number(1);
    var newNum  = baseClone(num);
    // newNum -> 1

    // String 
    var str = new String('hello');
    var newStr = baseClone(str);
    // newStr -> 'hello'

    //Boolean
    var bol = New Boolean(true);
    var newBol = baseClone(bol);
    // newBol -> true
    ```
    其实对于包装类, 完全可以用 `=` 号来进行克隆, 其实没有深度克隆一说,这里用valueOf实现,语法上比较符合规范

    对于Date类型:

    因为valueOf方法,日期类定义的valueOf()方法会返回它的一个内部表示: 1970年1月1日以来的毫秒数. 因为我们可以在Date的原型上定义克隆的方法

    ```js
    Date.prototype.clone = function(){
        return new Date(this.valueOf());
    }
    var data = new Date('2010');
    var newDate = date.clone();

    // newDate -> Fri Jan 01 2010 08:00:00 GMT+0800
    ```
    对于正则对象RagExp:
    ```js
    RegExp.prototype.clone = function(){
        var pattern = this.valueOf();
        var flags  = '';
        flags += pattern.global ? 'g':'';
        flags += pattern.ignoreCase ? 'i':'';
        flags += pattern.multiline ? 'm':'';

        return new RegExp(pattern.source,flags);
    };
    var reg = new RegExp('/111/');
    var newReg = reg.clone();
    // newReg -> /\/111\//
    ```
## 简单实现Node的Events模块
简介: 观察者模式或者说订阅模式, 它定义了对象间的一种一对多的关系,让多个观察者对象同时监听某一个主题对象,当一个对象发生改变时,所有依赖于它的对象都得到通知

node中的Events模块就是通过观察者模式来实现的:
```js
var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('say',function(name){
    console.log('Hello',name);
})
eventEmitter.emit('say','Jony yu');
```

这样,eventEmitter发出say事件,通过on接受, 并且输出结果, 这就是一个订阅模式的实现, 下面我们来简单的实现一个Events模块的EventEmitter
1. 实现简单的Event模块的emit和on方法

    ```js
    function Events(){
        this.on = function(eventName, callBack){
            if(!this.handles){
                this.handles = {};
            }
            if(!hits.handles[eventName]){
                this.handles[eventName] = [];
            }
            this.handle[eventName].push(callBack);
        }
        this.emit = function(eventName,obj){
            if(this.handle[eventName]){
                for(var i=0;i<this.handle[eventName].length;i++){
                    this.handles[eventName][i](obj);
                }
            }
        }
    return this;
    }
    ```
    这样我们就定义了Events, 现在我们可以开始来调用:
    ```js
    var  events = new Events();
    events.on('say',function(name){
        console.log('Hello',name)
    });
    events.emit('say','Jony yu');
    // 结果就是通过emit 调用之后,输出 Jony yu
    ```
2. 每个对象是独立的

    因为是通过new的方式,每次生成的对象都是不相同的,因此:
    ```js
    var event1 = new Events();
    var event2 = new Events();
    event1.on('say',function(){
        console.log('Jony event1')
    })
    event2.on('say',function(){
        console.log('Jony event2')
    })
    event1.emit('say');
    event2.emit('say');

    // event1 , event2 之间的事件监听相互不影响
    // 输出结果为 'Jony event1', 'Jony event2'
    ```
## 箭头函数中this指向举例
```js
var a=11;
function test2(){
    this.a = 22;
    let b=()=>{ console.log(this.a)}
    b();
}
var x = new test2();

// 输出 22
```
定义时绑定