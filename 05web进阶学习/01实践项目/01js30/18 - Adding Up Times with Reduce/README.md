# 18 - Adding Up Times with Reduce
第十八天也是一组数组操作，目的是将一个元素是时长的数组，算出其中的总时长，为多少小时，分钟，秒。

# 收获
## JS

### Array.from
Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

**语法**
```js
Array.from(arrayLike[, mapFn[, thisArg]])
```
**参数**
- arrayLike
  - 想要转换成数组的伪数组对象或可迭代对象。
- mapFn 可选
  - 如果指定了该参数，新数组中的每个元素会执行该回调函数。
- thisArg 可选
  - 可选参数，执行回调函数 mapFn 时 this 对象。

**返回值**

一个新的数组实例。


### 主要思路:
1. 总和统一单位之后的数据
2. 换算成时,分,秒
```js
 const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
      const [mins, secs] = timeCode.split(':').map(parseFloat);
      return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds);
    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;
    const mins = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;
```
