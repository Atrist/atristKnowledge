# map
Map是一组键值对的结构，用于解决以往不能用对象做为键的问题
- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值
## 声明定义
可以接受一个数组作为参数，该数组的成员是一个表示键值对的数组。
```js
let m = new Map([
  ['houdunren', '后盾人'],
  ['hdcms', '开源系统']
]);

console.log(m.get('houdunren')); //后盾人

```
使用`set` 方法添加元素，支持链式操作
```js
let map = new Map();
let obj = {
  name: "后盾人"
};
map.set(obj, "houdunren.com").set("name", "hdcms");
console.log(map.entries()); //MapIterator (( … ) => "houdunren.com", "name" => "hdcms")
```

使用构造函数`new Map`创建的原理如下
```js
const hd = new Map();
const arr = [["houdunren", "后盾人"], ["hdcms", "开源系统"]];

arr.forEach(([key, value]) => {
  hd.set(key, value);
});
console.log(hd);
```
对于键是对象的`Map`， 键保存的是内存地址，值相同但内存地址不同的视为两个键。
```js
let arr = ["后盾人"];
const hd = new Map();
hd.set(arr, "houdunren.com");
console.log(hd.get(arr)); //houdunren.com
console.log(hd.get(["后盾人"])); //undefined
```
## 获取数量
获取数据数量
```js
console.log(map.size);
```
## 元素检测
检测元素是否存在
```js
console.log(map.has(obj1));
```
## 读取元素
```js
let map = new Map();

let obj = {
	name: '后盾人'
}

map.set(obj, 'houdunren.com');
console.log(map.get(obj));
```
## 删除元素
使用 delete() 方法删除单个元素
```js
let map = new Map();
let obj = {
	name: '后盾人'
}

map.set(obj, 'houdunren.com');
console.log(map.get(obj));

map.delete(obj);
console.log(map.get(obj));
```
使用`clear`方法清除Map所有元素
```js
let map = new Map();
let obj1 = {
	name: 'hdcms.com'
}

let obj2 = {
	name: 'houdunren.com'
}

map.set(obj1, {
	title: '内容管理系统'
});

map.set(obj2, {
	title: '后盾人'
});

console.log(map.size);
console.log(map.clear());
console.log(map.size);

```

## 遍历数据
使用 `keys()/values()/entries()` 都可以返回可遍历的迭代对象。
```js
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
console.log(hd.keys()); //MapIterator {"houdunren", "hdcms"}
console.log(hd.values()); //MapIterator {"后盾人", "开源系统"}
console.log(hd.entries()); //MapIterator {"houdunren" => "后盾人", "hdcms" => "开源系统"}
```
可以使用`keys/values` 函数遍历键与值
```js
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
for (const key of hd.keys()) {
  console.log(key);
}
for (const value of hd.values()) {
  console.log(value);
}
```
使用`for/of`遍历操作，直接遍历Map 等同于使用entries() 函数
```js
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
for (const [key, value] of hd) {
  console.log(`${key}=>${value}`);
}
```
使用`forEach`遍历操作
```js
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
hd.forEach((value, key) => {
  console.log(`${key}=>${value}`);
});
```
## 数组转换
可以使用`展开语法` 或 `Array.form` 静态方法将Set类型转为数组，这样就可以使用数组处理函数了
```js
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);

console.log(...hd); //(2) ["houdunren", "后盾人"] (2) ["hdcms", "开源系统"]
console.log(...hd.entries()); //(2) ["houdunren", "后盾人"] (2) ["hdcms", "开源系统"]
console.log(...hd.values()); //后盾人 开源系统
console.log(...hd.keys()); //houdunren hdcms
```
检索包含`后盾人`的值组成新Map
```js
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);

let newArr = [...hd].filter(function(item) {
  return item[1].includes("后盾人");
});

hd = new Map(newArr);
console.log(...hd.keys());
```
## 节点集合
map的key可以为任意类型，下面使用DOM节点做为键来记录数据。
```js
<body>
  <div desc="后盾人">houdunren</div>
  <div desc="开源系统">hdcms</div>
</body>

<script>
  const divMap = new Map();
  const divs = document.querySelectorAll("div");

  divs.forEach(div => {
    divMap.set(div, {
      content: div.getAttribute("desc")
    });
  });
  divMap.forEach((config, elem) => {
    elem.addEventListener("click", function() {
      alert(divMap.get(this).content);
    });
  });
</script>
```
# WeakMap
WeakMap 对象是一组键/值对的集
- 键名必须是对象
- WeaMap对键名是弱引用的，键值是正常引用
- 垃圾回收不考虑WeaMap的键名，不会改变引用计数器，键在其他地方不被引用时即删除
- 因为WeakMap 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行forEach( )遍历等操作
- 也是因为弱引用，WeaMap 结构没有keys( )，values( )，entries( )等方法和 size 属性
- 当键的外部引用删除时，希望自动删除数据时使用 WeakMap
## 声明定义
以下操作由于键不是对象类型将产生错误
```js
new WeakSet("hdcms"); //TypeError: Invalid value used in weak set
```
将DOM节点保存到WeakSet
```HTML
<body>
  <div>houdunren</div>
  <div>hdcms</div>
</body>
<script>
  const hd = new WeakMap();
  document.querySelectorAll("div").forEach(item => hd.set(item, item.innerHTML));
  console.log(hd); //WeakMap {div => "hdcms", div => "houdunren"}
</script>

```
## 基本操作
下面是WeakMap 的常用指令
```js
const hd = new WeakMap();
const arr = ["hdcms"];
//添加操作
hd.set(arr, "houdunren");
console.log(hd.has(arr)); //true

//删除操作
hd.delete(arr);
//检索判断
console.log(hd.has(arr)); //false
```
## 垃圾回收
WakeMap的键名对象不会增加引用计数器，如果一个对象不被引用了会自动删除。
- 下例当hd删除时内存即清除，因为WeakMap是弱引用不会产生引用计数
- 当垃圾回收时因为对象被删除，这时WakeMap也就没有记录了
```js
let map = new WeakMap();
let hd = {};
map.set(hd, "hdcms");
hd = null;
console.log(map);

setTimeout(() => {
  console.log(map);
}, 1000);
```