## 原文章地址

[一道 js 面试题引发的思考](https://github.com/kuitos/kuitos.github.io/issues/18)

前阵子帮部门面试一前端，看了下面试题(年轻的时候写后端 java 所以没做过前端试题)，其中有一道题是这样的

比较下面两段代码，试述两段代码的不同之处

```js
// A--------------------------
var scope = 'global scope'
function checkscope() {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f()
}
checkscope()

// B---------------------------
var scope = 'global scope'
function checkscope() {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f
}
checkscope()()
```

首先 A、B 两段代码输出返回的都是 "local scope"，如果对这一点还有疑问的同学请自觉回去温习一下 js 作用域的相关知识。。

那么既然输出一样那这两段代码具体的差异在哪呢？大部分人会说执行环境和作用域不一样，但根本上是哪里不一样就不是人人都能说清楚了。前阵子就这个问题重新翻了下 js 基础跟 ecmascript 标准，如果我们想要刨根问底给出标准答案，那么我们需要先理解下面几个概念：

## 变量对象(variable object)

> 原文：Every execution context has associated with it a variable object. Variables and functions declared in the source text are added as properties of the variable object. For function code, parameters are added as properties of the variable object.

简言之就是：**每一个执行上下文都会分配一个变量对象(variable object)，变量对象的属性由 变量(variable) 和 函数声明(function declaration) 构成。在函数上下文情况下，参数列表(parameter list)也会被加入到变量对象(variable object)中作为属性。变量对象与当前作用域息息相关。不同作用域的变量对象互不相同，它保存了当前作用域的所有函数和变量。**

这里有一点特殊就是只有 **函数声明(function declaration)** 会被加入到变量对象中，而 **函数表达式(function expression)** 则不会。看代码：

```js
// 函数声明
function a() {}
console.log(typeof a) // "function"

// 函数表达式
var a = function _a() {}
console.log(typeof a) // "function"
console.log(typeof _a) // "undefined"
```

函数声明的方式下，a 会被加入到变量对象中，故当前作用域能打印出 a。
函数表达式情况下，a 作为变量会加入到变量对象中，\_a 作为函数表达式则不会加入，故 a 在当前作用域能被正确找到，\_a 则不会。
另外，关于变量如何初始化，看这里

![](https://github.com/kuitos/kuitos.github.io/blob/assets/images/image2015-3-10%2013-20-41.png?raw=true)

### 关于 Global Object

当 js 编译器开始执行的时候会初始化一个 Global Object 用于关联全局的作用域。对于全局环境而言，global object 就是变量对象(variable object)。变量对象对于程序而言是不可读的，只有编译器才有权访问变量对象。在浏览器端，global object 被具象成 window 对象，也就是说 global object === window === 全局环境的 variable object。因此 global object 对于程序而言也是唯一可读的 variable object。

## 活动对象(activation object)

> 原文：When control enters an execution context for function code, an object called the activation object is created and associated with the execution context. The activation object is initialised with a property with name arguments and attributes { DontDelete }. The initial value of this property is the arguments object described below.
> The activation object is then used as the variable object for the purposes of variable instantiation.

简言之：当**函数被激活，那么一个活动对象(activation object)就会被创建并且分配给执行上下文。活动对象由特殊对象 arguments 初始化而成。随后，他被当做变量对象(variable object)用于变量初始化。**

用代码来说明就是：

```js
function a(name, age){
    var gender = "male";
    function b(){}
}
a(“k”,10);
```

a 被调用时，在 a 的执行上下文会创建一个活动对象 AO，并且被初始化为 `AO = [arguments]`。随后 AO 又被当做变量对象(variable object)VO 进行变量初始化,此时 `VO = [arguments].concat([name,age,gender,b])`。

## 执行环境和作用域链(execution context and scope chain)

- execution context

  顾名思义 执行环境/执行上下文。在 javascript 中，执行环境可以抽象的理解为一个 object，它由以下几个属性构成：

  ```js
  executionContext：{
  variable object：vars,functions,arguments,
  scope chain: variable object + all parents scopes
  thisValue: context object
  }
  ```

  此外在 js 解释器运行阶段还会维护一个环境栈，当执行流进入一个函数时，函数的环境就会被压入环境栈，当函数执行完后会将其环境弹出，并将控制权返回前一个执行环境。环境栈的顶端始终是当前正在执行的环境。

- scope chain

  作用域链，它在解释器进入到一个执行环境时初始化完成并将其分配给当前执行环境。每个执行环境的作用域链由当前环境的变量对象及父级环境的作用域链构成。

  作用域链具体是如何构建起来的呢，先上代码

  ```js
  function test(num) {
    var a = '2'
    return a + num
  }
  test(1)
  ```

  1. 执行流开始 初始化 `function test`，test 函数会维护一个私有属性 `[[scope]]`,并使用当前环境的作用域链初始化，在这里就是 `test.[[Scope]]=global scope`.
  2. `test` 函数执行，这时候会为 `test` 函数创建一个执行环境，然后通过复制函数的`[[Scope]]`属性构建起 `test` 函数的作用域链。此时 `test.scopeChain = [test.[[Scope]]]`
  3. `test` 函数的活动对象被初始化，随后活动对象被当做变量对象用于初始化。即 `test.variableObject = test.activationObject.contact[num,a] = [arguments].contact[num,a]`
  4. `test` 函数的变量对象被压入其作用域链，此时 `test.scopeChain = [ test.variableObject, test.[[scope]]]`;

  至此 `test` 的作用域链构建完成。

说了这么多概念，回到面试题上，返回结果相同那么 A、B 两段代码究竟不同在哪里，个人觉得标准答案在这里：

**答案来了**

首先是 A：

1. 进入全局环境上下文，全局环境被压入环境栈，`contextStack = [globalContext]`

2. 全局上下文环境初始化,

   ```js
   globalContext={
         variable object:[scope, checkscope],
         scope chain: variable object // 全局作用域链
     }
   ```

   同时`checkscope`函数被创建，此时 `checkscope.[[Scope]] = globalContext.scopeChain`

3. 执行 `checkscope` 函数，进入 `checkscope` 函数上下文，`checkscope` 被压入环境栈，`contextStack=[checkscopeContext, globalContext]`。随后 `checkscope` 上下文被初始化,它会复制 `checkscope` 函数的`[[Scope]]`变量构建作用域，即 `checkscopeContext={ scopeChain : [checkscope.[[Scope]]] }`
4. `checkscope` 的活动对象被创建 此时 `checkscope.activationObject = [arguments]`, 随后活动对象被当做变量对象用于初始化，`checkscope.variableObject = checkscope.activationObject = [arguments, scope, f]`，随后变量对象被压入 `checkscope` 作用域链前端，`(checckscope.scopeChain = [checkscope.variableObject, checkscope.[[Scope]] ]) == [[arguments, scope, f], globalContext.scopeChain]`
5. 函数 f 被初始化，`f.[[Scope]] = checkscope.scopeChain`。
6. `checkscope` 执行流继续往下走到 `return f()`，进入函数 f 执行上下文。函数 f 执行上下文被压入环境栈，`contextStack = [fContext, checkscopeContext, globalContext]`。函数 f 重复 第 4 步 动作。最后 `f.scopeChain = [f.variableObject,checkscope.scopeChain]`
7. 函数 f 执行完毕，f 的上下文从环境栈中弹出，此时 `contextStack = [checkscopeContext, globalContext]`。同时返回 `scope`, 解释器根据`f.scopeChain` 查找变量 `scope`,在 `checkscope.scopeChain` 中找到 `scope(local scope)`。
8. `checkscope` 函数执行完毕，其上下文从环境栈中弹出，`contextStack = [globalContext]`

如果你理解了 A 的执行流程，那么 B 的流程在细节上一致，唯一的区别在于 B 的环境栈变化不一样，

A: contextStack = [globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [fContext, checkscopeContext, globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [globalContext] <br/>
B: contextStack = [globalContext] ---> contextStack = [checkscopeContext, globalContext] ---> contextStack = [fContext, globalContext] ---> contextStack = [globalContext]

也就是说，真要说这两段代码有啥不同，那就是他们执行过程中环境栈的变化不一样，其他的两种方式都一样。

其实对于理解这两段代码而言最根本的一点在于，javascript 是使用静态作用域的语言，他的作用域在函数创建的时候便已经确定(不含 arguments)。

说了这么一大坨偏理论的东西，能坚持看下来的同学估计都要睡着了...是的，这么一套理论性的东西纠结有什么用呢，我只要知道函数作用域在创建时便已经生成不就好了么。没有实践价值的理论往往得不到重视。那我们来看看，当我们了解到这一套理论之后我们的世界到底会发生了什么变化：

这样一段代码

```js
function setFirstName(firstName) {
  return function (lastName) {
    return firstName + ' ' + lastName
  }
}

var setLastName = setFirstName('kuitos')
var name = setLastName('lau')

// 乍看之下这段代码没有任何问题，但是世界就是这样，大部分东西都禁不起考究(我认真起来连自己都害怕哈哈哈哈)。。
// 调用setFirstName函数时返回一个匿名函数，该匿名函数会持有setFirstName函数作用域的变量对象(里面包含arguments和firstName)，不管匿名函数是否会使用该变量对象里的信息，这个持有逻辑均不会改变。
// 也就是当setFirstName函数执行完之后其执行环境被销毁，但是他的变量对象会一直保存在内存中不被销毁(因为被匿名函数hold)。同样的，垃圾回收机制会因为变量对象被一直hold而不做回收处理。这个时候内存泄露就发生了。这时候我们需要做手动释放内存的处理。like this:
setLastName = null
// 由于匿名函数的引用被置为null，那么其hold的setFirstName的活动对象就能被安全回收了。
// 当然，现代浏览器引擎(以V8为首)都会尝试回收闭包所占用的内存，所以这一点我们也不必过多处理。
```
