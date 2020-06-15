# 27 - Click and Drag
第27天的练习是一个鼠标点击并进行拖拽的效果
# 主要思路
1. 在外层的items添加 鼠标按下,鼠标移动,鼠标松开事件
2. 当鼠标按下,将isDown置真
3. 当鼠标移动时,对isDown进行判断
   1. 如果isDown为真,则对items的scrollLeft进行设置
   2. 如果为假,则什么都不做.

## 主要代码
显示移动的css代码
```css
.items.active {
  background: rgba(255,255,255,0.3);
  cursor: grabbing;
  cursor: -webkit-grabbing;
  transform: scale(1);
}
```

鼠标移动事件
```js
slider.addEventListener('mousemove', (e) => {
if (!isDown) return;  // stop the fn from running
e.preventDefault();
const x = e.pageX - slider.offsetLeft;
const walk = (x - startX) * 3;
slider.scrollLeft = scrollLeft - walk;
});
```
# 收获
# CSS
## white-space
white-space CSS 属性是用来设置如何处理元素中的 空白。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)

### 语法
```css
/* Keyword values */
white-space: normal;
white-space: nowrap;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;

/* https://github.com/w3c/csswg-drafts/pull/2841 */
white-space: break-spaces;

/* Global values */
white-space: inherit;
white-space: initial;
white-space: unset;
```

### white-space属性被指定为从下面的值列表中选择的单个关键字。
- normal
  - 连续的空白符会被合并，换行符会被当作空白符来处理。换行在填充「行框盒子(line boxes)」时是必要。
- nowrap
  - 和 normal 一样，连续的空白符会被合并。但文本内的换行无效。
- pre
  - 连续的空白符会被保留。在遇到换行符或者`<br>`元素时才会换行。 
- pre-wrap
  - 连续的空白符会被保留。在遇到换行符或者`<br>`元素，或者需要为了填充「行框盒子(line boxes)」时才会换行。
- pre-line
  - 连续的空白符会被合并。在遇到换行符或者`<br>`元素，或者需要为了填充「行框盒子(line boxes)」时会换行。
- break-spaces
  - 与 pre-wrap的行为相同，除了：
    - 任何保留的空白序列总是占用空间，包括在行尾。
    - 每个保留的空格字符后都存在换行机会，包括空格字符之间。
    - 这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容大小和最大内容大小）。


###  下面的表格总结了各种 white-space 值的行为：

| 换行符       | 空格和制表符 | 文字转行 |
| ------------ | ------------ | -------- |
| normal       | 合并         | 合并     | 转行   |
| nowrap       | 合并         | 合并     | 不转行 |
| pre          | 保留         | 保留     | 不转行 |
| pre-wrap     | 保留         | 保留     | 转行   |
| pre-line     | 保留         | 合并     | 转行   |
| break-spaces | 保留         | 保留     | 转行   |