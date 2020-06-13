## 前言

举个例子：

```js
console.log(1 + '1')
```

在 JavaScript 中，这是完全可以运行的，不过你有没有好奇，为什么 1 和 '1' 分属不同的数据类型，为什么就可以进行运算呢？

这其实是因为 JavaScript 自动的将数据类型进行了转换，我们通常称为隐式类型转换。但是我们都知道，+运算符既可以用于数字加法，也能用于字符串拼接，那在这个例子中，是将数字 1 转成字符串 '1'，进行拼接运算？还是将字符串 '1' 转成数字 1，进行加法运算呢？

先卖个关子，虽然估计你也知道答案。今天，我们就常见的隐式类型转化的场景进行介绍。

## 一元操作符 +

```js
console.log(+'1')
```

当 + 运算符作为一元操作符的时候，查看 [ES5 规范 1.4.6](http://es5.github.io/#x11.4.6)，会调用 ToNumber 处理该值，相当于 Number('1')，最终结果返回数字 1。

那么下面的这些结果呢？

```js
console.log(+[])
console.log(+['1'])
console.log(+['1', '2', '3'])
console.log(+{})
```

既然是调用 ToNumber 方法，回想[《JavaScript 深入之头疼的类型转换(上)》](https://github.com/mqyqingfeng/Blog/issues/159)中的内容，当输入的值是对象的时候，先调用 ToPrimitive(input, Number) 方法，执行的步骤是：

1. 如果 `obj` 为基本类型，直接返回
2. 否则，调用 `valueOf` 方法，如果返回一个原始值，则 `JavaScript` 将其返回。
3. 否则，调用 `toString` 方法，如果返回一个原始值，则 `JavaScript` 将其返回。
4. 否则，JavaScript 抛出一个类型错误异常。

以 `+[]` 为例，`[]` 调用 valueOf 方法，返回一个空数组，因为不是原始值，调用 toString 方法，返回 ""。

得到返回值后，然后再调用 ToNumber 方法，"" 对应的返回值是 0，所以最终返回 0。

剩下的例子以此类推。结果是：

```js
console.log(+['1']) // 1
console.log(+['1', '2', '3']) // NaN
console.log(+{}) // NaN
```

## 二元操作符 +

### 规范

现在 + 运算符又变成了二元操作符，毕竟它也是加减乘除中的加号

1 + '1' 我们知道答案是 '11'，那 `null + 1`、`[] + []`、`[] + {}`、`{} + {}` 呢？

如果要了解这些运算的结果，不可避免的我们要从规范下手。

规范地址：http://es5.github.io/#x11.6.1

不过这次就不直接大段大段的引用规范了，直接给大家讲简化后的内容。

到底当执行 + 运算的时候，会执行怎样的步骤呢？让我们根据规范 11.6.1 来捋一捋：

当计算 value1 + value2 时：

1. lprim = ToPrimitive(value1)
2. rprim = ToPrimitive(value2)
3. 如果 lprim 是字符串或者 rprim 是字符串，那么返回 ToString(lprim) 和 ToString(rprim)的拼接结果
4. 返回 ToNumber(lprim) 和 ToNumber(rprim)的运算结果

规范的内容就这样结束了。没有什么新的内容，ToString、ToNumber、ToPrimitive 都是在[《JavaScript 深入之头疼的类型转换(上)》](https://github.com/mqyqingfeng/Blog/issues/159)中讲到过的内容，所以我们直接进分析阶段：

让我们来举几个例子：

### 1.Null 与数字

```js
console.log(null + 1)
```

按照规范的步骤进行分析：

1. lprim = ToPrimitive(null) 因为 null 是基本类型，直接返回，所以 lprim = null
2. rprim = ToPrimitive(1) 因为 1 是基本类型，直接返回，所以 rprim = null
3. lprim 和 rprim 都不是字符串
4. 返回 ToNumber(null) 和 ToNumber(1) 的运算结果

接下来：

`ToNumber(null)` 的结果为 0，(回想上篇 `Number(null)`)，ToNumber(1) 的结果为 1

所以，null + 1 相当于 0 + 1，最终的结果为数字 1。

这个还算简单，看些稍微复杂的：

### 2.数组与数组

```js
console.log([] + [])
```
