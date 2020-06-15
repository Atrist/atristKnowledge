## 01 JavaScript Drum Kit
  
## 实现效果
模拟一个打鼓的页面。用户在键盘上按下 ASDFGHJKL 这几个键时，页面上与字母对应的按钮变大变亮，对应的鼓点声音响起来。

- [在线demo](https://atrist.github.io/03webProject/js30/01-JavaScriptDrumKit/index.html)
## 关键要点
1. 键盘事件
2. 播放声音
3. 改变样式


## 事件分解
1. 添加键盘事件监听
2. 对应事件处理程序
   1. 获取键码
   2. 获取元素
   3. 获取data-key为对应键码的元素
   4. 处理元素
3. 为所有div.key添加动画事件
   1. 获取所有样式
   2. 为其添加事件监听
4. 去除样式的事件处理程序


## 学习笔记

### HTML kbd标签
- `<kbd>` 标签定义键盘文本。
- HTML键盘输入元素`<kbd>` 用于表示用户输入，它将产生一个行内元素，以浏览器的默认monospace字体显示
- 属性：仅支持全局属性
### data-* 属性

- data-*属性用来存储页面或应用程序专用的自定义数据
- 全局属性，所有HTML元素都能够使用
- 构成：
  - 属性名称不得包含任何大写字母，并且前缀“ data-”后必须至少存在一个字符
  - 属性值可以是任何字符串

### querySelectorAll()
querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象,NodeList 对象表示节点的集合。可以通过索引访问，索引值从 0 开始。