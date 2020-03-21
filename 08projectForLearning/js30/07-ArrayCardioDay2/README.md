# 07 - Array Cardio Day 2
掌握js操作数组

## js
### some
some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值,详情见 [mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

**语法**
```js
arr.some(callback(element[,index[,array]]),[,thisArg]);
```
**参数**

callback
    - 用来测试每个元素的函数,接受三个函数
    - element
      - 数组中正在处理的函数
    - index(可选)
      - 数组中正在处理元素的索引值
    - array(可选)
      - some()被调用的数组。
    - thisArg(可选)
      - 执行 callback 时使用的 this 值。

**描述**

some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some() 将会立即返回 true。否则，some() 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。

callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。

如果一个thisArg参数提供给some()，它将被用作调用的 callback的 this 值。否则， 它的 this value将是 undefined。this的值最终通过callback来观察，根据` the usual rules for determining the this seen by a function`的this判定规则来确定。

**some() 被调用时不会改变数组。**

some() 遍历的元素的范围在第一次调用 callback. 前就已经确定了。在调用 some() 后被添加到数组中的值不会被 callback 访问到。如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some() 访问到它那一刻的值。已经被删除的元素不会被访问到。
### every
every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

**语法**
```js
arr.every(callback[, thisArg])
```
**参数**
callback
- 用来测试每个元素的函数，它可以接收三个参数：
    - element
      - 用于测试的当前值。
    - index可选
      - 用于测试的当前值的索引。
    - array可选
        - 调用 every 的当前数组。
    - thisArg
        - 执行 callback 时使用的 this 值。

**返回值**

如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。

**描述**
- every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个会使 callback 返回 falsy 的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。

- callback 在被调用时可传入三个参数：元素值，元素的索引，原数组。

- 如果为 every 提供一个 thisArg 参数，则该参数为调用 callback 时的 this 值。如果省略该参数，则 callback 被调用时的 this 值，在非严格模式下为全局对象，在严格模式下传入 undefined。详见 this 条目。

- **every 不会改变原数组**。

- every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到。如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

- every 和数学中的"所有"类似，当所有的元素都符合条件才会返回true。正因如此，若传入一个空数组，无论如何都会返回 true。（这种情况属于无条件正确：正因为一个空集合没有元素，所以它其中的所有元素都符合给定的条件。)


### find
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

**语法**
```js
arr.find(callback[, thisArg])
```

**参数**

callback
  - 在数组每一项上执行的函数,接受3个参数
  - element
    - 当前遍历到的元素
  - index(可选)
    - 当前遍历到的索引
  - array(可选)
    - 调用数组本身
  - thisArg(可选)
    - 执行回调函数用作this的对象

**返回值**

数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。

**描述**
- find方法对数组中的每一项元素执行一次 callback 函数，直至有一个 callback 返回 true。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。注意 callback 函数会为数组中的每个索引调用即从 0 到 length - 1，而不仅仅是那些被赋值的索引，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法。
- callback函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。
- 如果提供了 thisArg参数，那么它将作为每次 callback函数执行时的this ，如果未提供，则使用 undefined。
- **find方法不会改变数组。**
- 在第一次调用 callback函数时会确定元素的索引范围，因此在 find方法开始执行之后添加到数组的新元素将不会被 callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍旧会被访问到，但是其值已经是undefined了。

### splice
splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

**语法**
```js
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

**参数**

- start 
  - 指定修改的开始位置（从0计数）。
  - 如果超出了数组的长度，则从数组末尾开始添加内容；
  - 如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；
  - 如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
- deleteCount(可选)
  - 整数，表示要移除的数组元素的个数。
  - 如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
  - 如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
  - 如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
- item1, item2, ... 可选
  - 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素

**返回值**
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。


由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

**注意**
如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

### findIndex
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

**语法**
```js
arr.findIndex(callback[, thisArg])
```

**参数**
callback
  - 针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
  - element
    - 当前元素。
  - index
    - 当前元素的索引。
  - array
    - 调用findIndex的数组。
  - thisArg
    - 可选。执行callback时作为this对象的值.

**返回值**
数组中通过提供测试函数的第一个元素的索引。否则，返回-1

**描述**
- findIndex方法对数组中的每个数组索引0..length-1（包括）执行一次callback函数，直到找到一个callback函数返回真实值（强制为true）的值。如果找到这样的元素，findIndex会立即返回该元素的索引。如果回调从不返回真值，或者数组的length为0，则findIndex返回-1。 与某些其他数组方法（如Array#some）不同，在稀疏数组中，即使对于数组中不存在的条目的索引也会调用回调函数。

- 回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。

- 如果一个 thisArg 参数被提供给 findIndex, 它将会被当作this使用在每次回调函数被调用的时候。如果没有被提供，将会使用undefined。

- **findIndex不会修改所调用的数组。**

- 在第一次调用callback函数时会确定元素的索引范围，因此在findIndex方法开始执行之后添加到数组的新元素将不会被callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍然会被访问到。

### slice
slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

**语法**
```js
arr.slice([begin[, end]])
```

**参数**
- begin 可选
  - 提取起始处的索引（从 0 开始），从该索引开始提取原数组元素。
如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
  - 如果省略 begin，则 slice 从索引 0 开始。
  - 如果 begin 大于原数组的长度，则会返回空数组。
- end 可选
  - 提取终止处的索引（从 0 开始），在该索引处结束提取原数组元素。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
  - slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
  - 如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
  - 如果 end 被省略，则 slice 会一直提取到原数组末尾。
  - 如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。

**返回值**

一个含有被提取元素的新数组。

**描述**
slice 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：
  - 如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
  - 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
如果向两个数组任一中添加了新元素，则另一个不会受到影响。