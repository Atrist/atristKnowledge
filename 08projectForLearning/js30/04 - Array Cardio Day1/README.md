# 04 - Array Cardio Day 1

熟练原生JS操作数组的方法

# JS
## filter
[MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
### 语法
```js
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```
参数
- callback:用来测试数组的每个元素的函数
  - element:数组中当前正在处理的元素
  - index(可选):正在处理的元素在数组中的索引
  - array(可选):调用了 filter 的数组本身。
  - thisArg(可选):执行 callback 时，用于 this 的值。


### 注意
- 如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。
- filter 不会改变原数组，它返回过滤后的新数组。
- filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。
## map
- [MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

### 语法
```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```
参数:
- callback:生成新数组元素的函数
  - currentValue:callback 数组中正在处理的当前元素。
  - index(可选):callback 数组中正在处理的当前元素的索引。
  - array(可选):map 方法调用的数组。
  - thisArg(可选):执行 callback 函数时值被用作this。
### 注意:
- map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）
- map 方法处理数组元素的范围是在 callback 方法第一次调用之前就已经确定了。调用map方法之后追加的数组元素不会被callback访问。如果存在的数组元素改变了，那么传给callback的值是map访问该元素时的值。在map函数调用后但在访问该元素前，该元素被删除的话，则无法被访问到

### 实例
求数组中每个元素的平方根
```js
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]
```
## sort
- [MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

### 语法
```js
arr.sort([compareFunction])
```
参数:
- compareFunction (可选): 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
    -  firstEl 第一个用于比较的元素。
    -  secondEl 第二个用于比较的元素。
### 注意
- 如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。
- 如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

    - 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
    - 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
    - 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

**比较函数格式如下：**
```js
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```
## reduce
- [MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值

### 语法
```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```
参数:
- callback:执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：
    - accumulator:累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。
    - currentValue:数组中正在处理的元素。
    - index (可选):数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
    - array(可选):调用reduce()的数组
    - initialValue可选
作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

### 注意
- 回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。
- 如果数组为空且没有提供initialValue，会抛出TypeError 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。
### 实例
数组里所有值的和
```js
var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);
// 和为 6
```