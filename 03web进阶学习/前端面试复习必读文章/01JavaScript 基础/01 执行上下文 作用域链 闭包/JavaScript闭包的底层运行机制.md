## 原文章地址
[JavaScript闭包的底层运行机制 回田园](http://blog.leapoahead.com/2015/09/15/js-closure/)


## JavaScript闭包的底层运行机制
我研究JavaScript闭包（closure）已经有一段时间了。我之前只是学会了如何使用它们，而没有透彻地了解它们具体是如何运作的。那么，究竟什么是闭包？

[Wikipedia](https://en.wikipedia.org/wiki/Closure_%28computer_programming%29)给出的解释并没有太大的帮助。闭包是什么时候被创建的，什么时候被销毁的？具体的实现又是怎么样的？
```js
"use strict";

var myClosure = (function outerFunction() {

  var hidden = 1;

  return {
    inc: function innerFunction() {
      return hidden++;
    }
  };

}());

myClosure.inc();  // 返回 1
myClosure.inc();  // 返回 2
myClosure.inc();  // 返回 3

// 相信对JS熟悉的朋友都能很快理解这段代码
// 那么在这段代码运行的背后究竟发生了怎样的事情呢？
```
现在，我终于知道了答案，我感到很兴奋并且决定向大家解释这个答案。至少，我一定是不会忘记这个答案的。
>Tell me and I forget. Teach me and I remember. Involve me and I learn.
© Benjamin Franklin

并且，在我阅读与闭包相关的现存的资料时，我很努力地尝试着去在脑海中想想每个事物之间的联系：对象之间是如何引用的，对象之间的继承关系是什么，等等。我找不到关于这些负责关系的很好的图表，于是我决定自己画一些。

我将假设读者对JavaScript已经比较熟悉了，知道什么是全局对象，知道函数在JavaScript当中是“first-class objects”，等等。

## 作用域链（Scope Chain）
当JavaScript在运行的时候，它需要一些空间让它来存储本地变量（local variables）。我们将这些空间称为作用域对象（Scope object），有时候也称作LexicalEnvironment。例如，当你调用函数时，函数定义了一些本地变量，这些变量就被存储在一个作用域对象中。你可以将作用域函数想象成一个普通的JavaScript对象，但是有一个很大的区别就是你不能够直接在JavaScript当中直接获取这个对象。你只可以修改这个对象的属性，但是你不能够获取这个对象的引用。

作用域对象的概念使得JavaScript和C、C++非常不同。在C、C++中，本地变量被保存在栈（stack）中。**在JavaScript中，作用域对象是在堆中被创建的（至少表现出来的行为是这样的），所以在函数返回后它们也还是能够被访问到而不被销毁。**

正如你做想的，作用域对象是可以有父作用域对象（parent scope object）的。当代码试图访问一个变量的时候，解释器将在当前的作用域对象中查找这个属性。如果这个属性不存在，那么解释器就会在父作用域对象中查找这个属性。就这样，一直向父作用域对象查找，直到找到该属性或者再也没有父作用域对象。我们将这个查找变量的过程中所经过的作用域对象乘坐作用域链（Scope chain）。

在作用域链中查找变量的过程和原型继承（prototypal inheritance）有着非常相似之处。但是，非常不一样的地方在于，当你在原型链（prototype chain）中找不到一个属性的时候，并不会引发一个错误，而是会得到undefined。但是如果你试图访问一个作用域链中不存在的属性的话，你就会得到一个ReferenceError。

在作用域链的最顶层的元素就是全局对象（Global Object）了。运行在全局环境的JavaScript代码中，作用域链始终只含有一个元素，那就是全局对象。所以，当你在全局环境中定义变量的时候，它们就会被定义到全局对象中。当函数被调用的时候，作用域链就会包含多个作用域对象。

## 全局环境中运行的代码
好了，理论就说到这里。接下来我们来从实际的代码入手。
```js
// my_script.js
"use strict";

var foo = 1;
var bar = 2;
```
我们在全局环境中创建了两个变量。正如我刚才所说，此时的作用域对象就是全局对象。

![](http://blog.leapoahead.com/2015/09/15/js-closure/js_closure_1.png)

在上面的代码中，我们有一个执行的上下文（myscript.js自身的代码），以及它所引用的作用域对象。全局对象里面还含有很多不同的属性，在这里我们就忽略掉了。

## 没有被嵌套的函数（Non-nested functions）
接下来，我们看这段代码
```js
"use strict";
var foo = 1;
var bar = 2;

function myFunc() {
  //-- define local-to-function variables
  var a = 1;
  var b = 2;
  var foo = 3;

  console.log("inside myFunc");
}
console.log("outside");
//-- and then, call it:
myFunc();
```
当`myFunc`被定义的时候，`myFunc`的标识符（identifier）就被加到了当前的作用域对象中（在这里就是全局对象），并且这个标识符所引用的是一个函数对象（function object）。函数对象中所包含的是函数的源代码以及其他的属性。其中一个我们所关心的属性就是内部属性`[[scope]]`。`[[scope]]`所指向的就是当前的作用域对象。也就是指的就是函数的标识符被创建的时候，我们所能够直接访问的那个作用域对象（在这里就是全局对象）。

>“直接访问”的意思就是，在当前作用域链中，该作用域对象处于最底层，没有子作用域对象。

所以，在`console.log("outside")`被运行之前，对象之间的关系是如下图所示。

![](http://blog.leapoahead.com/2015/09/15/js-closure/js_closure_2.png)

温习一下。myFunc所引用的函数对象其本身不仅仅含有函数的代码，并且还含有指向其**被创建的时候的作用域对象**。这一点**非常重要**！

当myFunc函数被调用的时候，一个新的作用域对象被创建了。新的作用域对象中包含myFunc函数所定义的本地变量，以及其参数（arguments）。这个新的作用域对象的父作用域对象就是在运行myFunc时我们所能直接访问的那个作用域对象。

所以，当myFunc被执行的时候，对象之间的关系如下图所示。

![](http://blog.leapoahead.com/2015/09/15/js-closure/js_closure_3.png)

现在我们就拥有了一个作用域链。当我们试图在myFunc当中访问某些变量的时候，JavaScript会先在其能直接访问的作用域对象（这里就是myFunc() scope）当中查找这个属性。如果找不到，那么就在它的父作用域对象当中查找（在这里就是Global Object）。如果一直往上找，找到没有父作用域对象为止还没有找到的话，那么就会抛出一个ReferenceError。

例如，如果我们在myFunc中要访问a这个变量，那么在`myFunc scope`当中就可以找到它，得到值为1。

如果我们尝试访问foo，我们就会在`myFunc() scope`中得到3。只有在`myFunc() scope`里面找不到foo的时候，JavaScript才会往Global Object去查找。所以，这里我们不会访问到Global Object里面的foo。

如果我们尝试访问bar，我们在myFunc() scope当中找不到它，于是就会在Global Object当中查找，因此查找到2。

很重要的是，只要这些作用域对象依然被引用，它们就不会被垃圾回收器（garbage collector）销毁，我们就一直能访问它们。当然，**当引用一个作用域对象的最后一个引用被解除的时候，并不代表垃圾回收器会立刻回收它，只是它现在可以被回收了**。

所以，当myFunc()返回的时候，再也没有人引用myFunc() scope了。当垃圾回收结束后，对象之间的关系变成回了调用前的关系。

![](http://blog.leapoahead.com/2015/09/15/js-closure/js_closure_2.png)

接下来，为了图表直观起见，我将不再将函数对象画出来。但是，请永远记着，函数对象里面的`[[scope]]`属性，保存着该函数被定义的时候所能够直接访问的作用域对象。
## 嵌套的函数（Nested functions）
正如前面所说，当一个函数返回后，没有其他对象会保存对其的引用。所以，它就可能被垃圾回收器回收。但是如果我们在函数当中定义嵌套的函数并且返回，被调用函数的一方所存储呢？（如下面的代码）
```js
function myFunc() {
  return innerFunc() {
    // ...
  }
}

var innerFunc = myFunc();
```
你已经知道的是，函数对象中总是有一个`[[scope]]`属性，保存着该函数被定义的时候所能够直接访问的作用域对象。所以，当我们在定义嵌套的函数的时候，这个嵌套的函数的`[[scope]]`就会引用外围函数（Outer function）的当前作用域对象。

如果我们将这个嵌套函数返回，并被另外一个地方的标识符所引用的话，那么这个嵌套函数及其`[[scope]]`所引用的作用域对象就不会被垃圾回收所销毁。
```js
"use strict";

function createCounter(initial) {
  var counter = initial;

  function increment(value) {
    counter += value;
  }

  function get() {
    return counter;
  }

  return {
    increment: increment,
    get: get
  };
}

var myCounter = createCounter(100);

console.log(myCounter.get());   // 返回 100
myCounter.increment(5);
console.log(myCounter.get());   // 返回 105
```
当我们调用`createCounter(100)`的那一瞬间，对象之间的关系如下图
![](http://blog.leapoahead.com/2015/09/15/js-closure/js_closure_4.png)

注意`increment`和`get`函数都存有指向`createCounter(100) scope`的引用。如果`createCounter(100)`没有任何返回值，那么`createCounter(100) scope`不再被引用，于是就可以被垃圾回收。但是因为`createCounter(100)`实际上是有返回值的，并且返回值被存储在了`myCounter`中，所以对象之间的引用关系变成了如下图所示

![](http://blog.leapoahead.com/2015/09/15/js-closure/js_closure_5.png)