# 15 - LocalStorage
第十五天主要是练习LocalStorage（本地存储）以及时间委托的使用，使用场景是一个简单的todo list的应用，实现基本的添加item，切换完成状态，将所有todo项存储在localstorage中，保证刷新浏览器后数据不丢失

# 收获
## HTML
### HTML5-localstorage
只读的localStorage 属性允许你访问一个Document 源（origin）的对象 Storage；存储的数据将保存在浏览器会话中。localStorage 类似 sessionStorage，但其区别在于：存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除 。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)

应注意，无论数据存储在 localStorage 还是 sessionStorage ，它们都特定于页面的协议。

另外，localStorage 中的键值对总是以字符串的形式存储。 (需要注意, 和js对象相比, 键值对总是以字符串的形式存储意味着数值类型会自动转化为字符串类型).

**语法**
```js
// 增加一个项目
localStorage.setItem('myCat', 'Tom');
// 读取一个项目
let cat = localStorage.getItem('myCat');
// 该语法用于移除 localStorage 项
localStorage.removeItem('myCat');
// 该语法用于移除所有的 localStorage 项
localStorage.clear();
```

## JS
### 存储在本地数据的对象
```js
const item = {
    text,
    done:false;
}
```
### 添加列表函数
```js
function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}
```

-  e.preventDefault()
   - Event 接口的 preventDefault()方法，告诉user agent：如果此事件没有被显式处理，它默认的动作也不应该照常执行。此事件还是继续传播，除非碰到事件侦听器调用stopPropagation() 或stopImmediatePropagation()，才停止传播。
- this.reset()
  - [mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/reset)
  - reset 方法可以重置一个表单内的所有表单控件的值到初始状态.

### 列表显示函数
```js
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
}
```
这里在处返回的选项框是否被点击,使用到了三元运算符
```js
plate.done ? 'checked' : ''
```

### 当列表被点击,更改样式,并写入内存当中
```js
  function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }
```

### 存在的问题
可以从代码中看出,无论是添加列表,还是某一个列表被点击,对localStorage的数据刷新都是将所有内容重新录入.

但数据量一旦过大,就很显得很吃内存.

