# 资料

[MDN 的手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## JS 所有处理数组的方法

- join()
- sort()
- slice()
- splice()
  - 参数 索引位置 删除元素个数
  - splice(pos,n)
  - 从索引 pos 的位置，删掉 n 个元素
- concat()
- reverse()
- push()
  - 添加元素到数组的末尾
- pop()
  - 删除数组末尾的元素
- shift()
  - 删除数组最前面（头部）的元素
- unshift()
  - 添加元素到数组的头部
- forEach()
  - 遍历数组
    ```
    var fruits = ['Apple', 'Banana'];
    fruits.forEach(function (item, index, array) {
        console.log(item, index);
        });
        // Apple 0
        // Banana 1
    ```
- map()
- some()
- every()
- filter()
- reduce()+reduceRight(),
- indexOf()
  - 找出某个元素在数组中的索引
- lastIndexOf()
