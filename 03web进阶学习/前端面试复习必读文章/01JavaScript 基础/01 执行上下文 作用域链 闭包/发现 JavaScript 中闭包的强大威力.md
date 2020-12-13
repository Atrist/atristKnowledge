## [译]发现 JavaScript 中闭包的强大威力

> 原文地址： Discover the power of closures in JavaScript<br/>
> 原文作者： Cristi Salcescu<br/>
> 译者： wcflmy
> 作者：拾雪儿在海边<br/>
> 链接：https://juejin.im/post/5c4e6a90e51d4552266576d2<br/>
> 来源：掘金

闭包是一个可以访问外部作用域的内部函数，即使这个外部作用域已经执行结束。

## 作用域

作用域决定这个变量的生命周期及其可见性。当我们创建了一个函数或者 `{}` 块，就会生成一个新的作用域。需要注意的是，通过 `var` 创建的变量只有函数作用域，而通过 `let` 和 `const` 创建的变量既有函数作用域，也有块作用域。

## 嵌套作用域

在 `Javascript` 中函数里面可以嵌套函数，如下：

```js
;(function autorun() {
  let x = 1
  function log() {
    console.log(x)
  }
  log()
})()
```

`log()` 即是一个嵌套在 `autorun()` 函数里面的函数。在 `` 函数里面可以通过外部函数访问到变量 x。此时，log() 函数就是一个闭包。

闭包就是内部函数，我们可以通过在一个函数内部或者 {} 块里面定义一个函数来创建闭包。

## 外部函数作用域

内部函数可以访问外部函数中定义的变量，即使外部函数已经执行完毕。如下：

```js
;(function autorun() {
  let x = 1
  setTimeout(function log() {
    console.log(x)
  }, 10000)
})()
```

并且，内部函数还可以访问外部函数中定义的形参，如下：

```js
;(function autorun(p) {
  let x = 1
  setTimeout(function log() {
    console.log(x) //1
    console.log(p) //10
  }, 10000)
})(10)
```

## 外部块作用域

内部函数可以访问外部块中定义的变量，即使外部块已执行完毕，如下：

```js
{
  let x = 1
  setTimeout(function log() {
    console.log(x)
  }, 10000)
}
```

## 词法作用域

词法作用域是指内部函数在定义的时候就决定了其外部作用域

看如下代码：

```js
;(function autorun() {
  let x = 1
  function log() {
    console.log(x)
  }

  function run(fn) {
    let x = 100
    fn()
  }

  run(log) //1
})()
```

`log()` 函数是一个闭包，它在这里访问的是 `autorun()` 函数中的 x 变量，而不是 run 函数中的变量。

> 闭包的外部作用域是在其定义的时候已决定，而不是执行的时候。

`autorun()` 的函数作用域即是 `log()` 函数的词法作用域。

## 作用域链

每一个作用域都有对其父作用域的引用。当我们使用一个变量的时候，Javascript 引擎 会通过变量名在当前作用域查找，若没有查找到，会一直沿着作用域链一直向上查找，直到 global 全局作用域。

示例如下：

```js
let x0 = 0
;(function autorun1() {
  let x1 = 1
  ;(function autorun2() {
    let x2 = 2
    ;(function autorun3() {
      let x3 = 3

      console.log(x0 + ' ' + x1 + ' ' + x2 + ' ' + x3) //0 1 2 3
    })()
  })()
})()
```

我们可以看到，`autorun3()` 这个内部函数可以访问其自身局部变量 `x3` ，也可以访问外部作用域中的 `x1` 和 `x2` 变量，以及全局作用域中的 `x0` 变量。即：闭包可以访问其外部(父)作用域中的定义的所有变量。

## 外部作用域执行完毕后

当外部作用域执行完毕后，内部函数还存活（仍在其他地方被引用）时，闭包才真正发挥其作用。譬如以下几种情况：

- 在异步任务例如 `timer` 定时器，事件处理，`Ajax` 请求中被作为回调
- 被外部函数作为返回结果返回，或者返回结果对象中引用该内部函数

考虑如下的几个示例：

### Timer

```js
;(function autorun() {
  let x = 1
  setTimeout(function log() {
    console.log(x)
  }, 10000)
})()
```

变量 `x` 将一直存活着直到定时器的回调执行或者 `clearTimeout()` 被调用。 如果这里使用的是 `setInterval()` ，那么变量 `x` 将一直存活到 `clearInterval()` 被调用。

译者注：原文中说变量 x 一直存活到 `` 或者 `setInterval()` 被调用是错误的。

### Event

```js
;(function autorun() {
  let x = 1
  $('#btn').on('click', function log() {
    console.log(x)
  })
})()
```

当变量 `x` 在事件处理函数中被使用时，它将一直存活直到该事件处理函数被移除。

### Ajax

```js
;(function autorun() {
  let x = 1
  fetch('http://').then(function log() {
    console.log(x)
  })
})()
```

变量 x 将一直存活到接收到后端返回结果，回调函数被执行。

在已上几个示例中，我们可以看到，`log()` 函数在父函数执行完毕后还一直存活着，log() 函数就是一个闭包。

除了 `timer` 定时器，事件处理，`Ajax` 请求等比较常见的异步任务，还有其他的一些异步 API 比如 `HTML5 Geolocation，WebSockets` , `requestAnimationFrame()`也将使用到闭包的这一特性。

变量的生命周期取决于闭包的生命周期。被闭包引用的外部作用域中的变量将一直存活直到闭包函数被销毁。如果一个变量被多个闭包所引用，那么直到所有的闭包被垃圾回收后，该变量才会被销毁。

## 闭包与循环

闭包只存储外部变量的引用，而不会拷贝这些外部变量的值。 查看如下示例：

```js
function initEvents() {
  for (var i = 1; i <= 3; i++) {
    $('#btn' + i).click(function showNumber() {
      alert(i) //4
    })
  }
}
initEvents()
```

在这个示例中，我们创建了 3 个闭包，皆引用了同一个变量 `i`，且这三个闭包都是事件处理函数。由于变量 `i` 随着循环自增，因此最终输出的都是同样的值。

修复这个问题最简单的方法是在 `for` 语句块中使用 let 变量声明，这将在每次循环中为 for 语句块创建一个新的局部变量。如下：

```js
function initEvents() {
  for (let i = 1; i <= 3; i++) {
    $('#btn' + i).click(function showNumber() {
      alert(i) //1 2 3
    })
  }
}
initEvents()
```

但是，如果变量声明在 for 语句块之外的话，即使用了 `let` 变量声明，所有的闭包还是会引用同一个变量，最终输出的还是同一个值。

## 闭包与封装性

封装性意味着信息隐藏。

### 函数与私有状态

通过闭包，我们可以创建拥有私有状态的函数，闭包使得状态被封装起来。

## 工厂模式与私有原型对象

我们先来看一个通过原型创建对象的常规方式，如下：

```js
let todoPrototype = {
  toString: function () {
    return this.id + ' ' + this.userName + ': ' + this.title
  },
}
function Todo(todo) {
  let newTodo = Object.create(todoPrototype)
  Object.assign(newTodo, todo)
  return newTodo
}
```

在这个例子中，`todoPrototype` 原型对象是一个全局对象。

我们可以通过闭包，只用创建原型对象一次，也能够被所有 `Todo` 函数调用所公用，并且保证其私有性。示例如下：

```js
let Todo = (function createTodoFactory() {
  let todoPrototype = {
    toString: function () {
      return this.id + ' ' + this.userName + ': ' + this.title
    },
  }
  return function (todo) {
    let newTodo = Object.create(todoPrototype)
    Object.assign(newTodo, todo)
    return newTodo
  }
})()
let todo = Todo({
  id: 1,
  title: 'This is a title',
  userName: 'Cristi',
  completed: false,
})
```

这里，`Todo()` 就是一个拥有私有状态的函数。

## 工厂模式与私有构造函数

查看如下代码：

```js
let Todo = (function createTodoFactory() {
  function Todo(spec) {
    Object.assign(this, spec)
  }

  return function (spec) {
    let todo = new Todo(spec)
    return Object.freeze(todo)
  }
})()
```

这里，`Todo()` 工厂函数就是一个闭包。通过它，不管是否使用 `new` ，我们都可以创建不可变对象，原型对象也只用创建一次，并且它是私有的。

```js
let todo = Todo({ title: 'A description' })
todo.title = 'Another description'
// Cannot assign to read only property 'title' of object
todo.toString = function () {}
//Cannot assign to read only property 'toString' of object
```

而且，在内存快照中，我们可以通过构造函数名来识别这些示例对象。

![](https://user-gold-cdn.xitu.io/2019/1/28/16893554bf659a7f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 翻译功能与私有 map

通过闭包，我们可以创建一个 map，在所有翻译调用中被使用，且是私有的。

示例如下：

```js
let translate = (function () {
  let translations = {}
  translations['yes'] = 'oui'
  translations['no'] = 'non'

  return function (key) {
    return translations[key]
  }
})()
translate('yes') //oui
```

### 自增生成器函数

通过闭包，我们可以创建自增生成器函数。同样，内部状态是私有的。示例如下：

```js
function createAGenerate(count, increment) {
  return function () {
    count += increment
    return count
  }
}
let generateNextNumber = createAGenerate(0, 1)
console.log(generateNextNumber()) //1
console.log(generateNextNumber()) //2
console.log(generateNextNumber()) //3
let generateMultipleOfTen = createAGenerate(0, 10)
console.log(generateMultipleOfTen()) //10
console.log(generateMultipleOfTen()) //20
console.log(generateMultipleOfTen()) //30
```

> 译者注：原文中依次输出 0,1,2,0,10,20 是有误的，感谢@Round 的指正

### 对象与私有状态

以上示例中，我们可以创建一个拥有私有状态的函数。同时，我们也可以创建多个拥有同一私有状态的函数。基于此，我们还可以创建一个拥有私有状态的对象。

示例如下：

```js
function TodoStore() {
  let todos = []

  function add(todo) {
    todos.push(todo)
  }
  function get() {
    return todos.filter(isPriorityTodo).map(toTodoViewModel)
  }

  function isPriorityTodo(todo) {
    return task.type === 'RE' && !task.completed
  }

  function toTodoViewModel(todo) {
    return { id: todo.id, title: todo.title }
  }

  return Object.freeze({
    add,
    get,
  })
}
```

`TodoStore()` 函数返回了一个拥有私有状态的对象。在外部，我们无法访问私有的 `todos` 变量，并且 `add` 和 `get` 这两个闭包拥有相同的私有状态。在这里，`TodoStore()` 是一个工厂函数。

## 闭包 vs 纯函数

闭包就是那些引用了外部作用域中变量的函数。
为了更好的理解，我们将内部函数拆成闭包和纯函数两个方面：

- 闭包是那些引用了外部作用域中变量的函数。
- 纯函数是那些没有引用外部作用域中变量的函数，它们通常返回一个值并且没有副作用。

在上述例子中，`add()` 和 `get()` 函数是闭包，而 `isPriorityTodo()` 和 `toTodoViewModel()` 则是纯函数。

## 闭包在函数式编程中的应用

闭包在函数式编程中也应用广泛。譬如，`underscore` 源码中 [函数相关小节](https://underscorejs.org/#functions) 中的所有函数都利用了闭包这一特性。

> A function decorator is a higher-order function that takes one function as an argument and returns another function, and the returned function is a variation of the argument function — [Javascript Allongé](https://leanpub.com/javascript-allonge/read#decorators)

装饰器函数也使用了闭包的特性。

我们来看如下 not 这个简单的装饰器函数：

```js
function not(fn) {
  return function decorator(...args) {
    return !fn.apply(this, args)
  }
}
```

`decorator()` 函数引用了外部作用域的 fn 变量，因此它是一个闭包。

## 垃圾回收

在 `Javascript` 中，局部变量会随着函数的执行完毕而被销毁，除非还有指向他们的引用。当闭包本身也被垃圾回收之后，这些闭包中的私有状态随后也会被垃圾回收。通常我们可以通过切断闭包的引用来达到这一目的。

在这个例子中，我们首先创建了一个 `add()` 闭包。

```js
let add = (function createAddClosure() {
  let arr = []
  return function (obj) {
    arr.push(obj)
  }
})()
```

随后，我们又定义了两个函数：

- `addALotOfObjects()` 往闭包变量 arr 中加入对象。
- `clearAllObjects()` 将闭包函数置为 null 。

并且两个函数皆作为事件处理函数：

```js
function addALotOfObjects() {
  for (let i = 1; i <= 10000; i++) {
    add(new Todo(i))
  }
}
function clearAllObjects() {
  if (add) {
    add = null
  }
}
$('#add').click(addALotOfObjects)
$('#clear').click(clearAllObjects)
```

当我点击 `Add` 按钮时，将往 闭包变量 `arr` 中加入 10000 个 `todo` 对象，内存快照如下：

![](https://user-gold-cdn.xitu.io/2019/1/29/16898a684a3f3da2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

当我点击 Clear 按钮时，我们将闭包引用置为 null 。随后，闭包变量 arr 将被垃圾回收，内存快照如下：

![](https://user-gold-cdn.xitu.io/2019/1/29/16898ab59a0c75bd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 避免全局变量

在 `Javascript` 中，我们很容易创建出全局变量。任何定义在函数和 {} 块之外的变量都是全局的，定义在全局作用域中的函数也是全局的。
这里以定义创建不同对象的工厂函数为例。为了避免将所有的工厂函数都放在全局作用域下，最简单的方法就是将他们挂在 app 全局变量下。

示例如下：

```js
let app = Loader()
app.factory(function DataService(args) {
  return {}
})
app.factory(function Helper(args) {
  return {}
})
app.factory(function Mapper(args) {
  return {}
})
app.factory(function Model(args) {})
```

`app.factory()` 方法还可以将不同的工厂函数归类到不同的模块中。下面这个示例就是将 `Timer` 工厂函数归类到 `tools` 模块下。

```js
app.factory('tools')(function Timer(args) {
  return {}
})
```

我们可以在 `app` 对象上暴露一个 `start` 方法来作为应用的入口点，通过 回调函数中 `factories` 参数来访问这些工厂函数。这里 `start()` 函数只能被调用一次，如下：

```js
app.start(function startApplication(factories) {
  let helper = factories.Helper()

  let dataService = factories.DataService()
  let model = factories.Model({
    dataService: dataService,
    helper: helper,
    timer: factories.tools.Timer(),
  })
})
```
>A Composition Root is a (preferably) unique location in an application where modules are composed together.<br/>
>Mark Seemann
## `loader` 对象
让我们来将 app 完善为一个 `loader` 对象，示例如下：
```js
function Loader(){
  let modules = Object.create(null);
  let started = false;
  function getNamespaceModule(modulesText){
    let parent = modules;
    if(modulesText){
      let parts = modulesText.split('.');
      for(let i=0; i<parts.length; i++){
        let part = parts[i];
        if (typeof parent[part] === "undefined") {
          parent[part] = Object.create(null);
        }
        parent = parent[part];
      }
    }
    return parent;
  }
  
  function addFunction(namespace, fn){
    if(typeof(fn) !== "function") {
      throw "Only functions can be added";
    }
       
    let module = getNamespaceModule(namespace);
    let fnName = fn.name;    
    module[fnName] = fn;
  }
  
  function addNamespace(namespace){
    return function(fn){
      addFunction(namespace, fn)
    }
  }
  
  function factory(){
    if(typeof(arguments[0]) === "string"){
      return addNamespace(arguments[0]);
    } else {
      return addFunction(null, arguments[0]);
    }
  }
  
  function start(startApplication){
    if(started){
      throw "App can be started only once";
    }
     
    startApplication(Object.freeze(modules));
    started = true;
  }
  
  return Object.freeze({
    factory,
    start
  });
};
let app = Loader();
```
`factory()` 方法用于添加新的工厂函数到内部变量 `modules` 中。
`start()` 方法则会调用回调函数，在回调函数中访问内部变量。
通过 `factory()` 定义工厂函数，将 `start()` 作为整个应用中调用各种工厂函数生成不同对象的唯一入口点，这是如此简洁优雅的方式。
在这里，factory 和 start 都是闭包。

## 总结
闭包是一个可以访问外部作用域中变量的内部函数。

这些被引用的变量直到闭包被销毁时才会被销毁。

闭包使得 `timer` 定时器，事件处理，`AJAX` 请求等异步任务更加容易。

可以通过闭包来达到封装性。