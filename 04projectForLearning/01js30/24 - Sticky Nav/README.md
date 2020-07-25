# Sticky Nav
第24天的训练是做一个下滑到导航栏，使之固定的样式。


# 主要思路
1. 获取导航栏到document的顶部的距离
2. 监听window的滚动事件
3. 当滚动的距离大于导航栏到document的距离,就给nav添加类`fixed-nav`
4. 当滚动的距离小于导航栏到document的距离,就给nav移除类`fixed-nav`
## 主要代码
**nav定位的css代码**
```css
body.fixed-nav nav {
  position: fixed;
  box-shadow: 0 5px 0 rgba(0,0,0,0.1);
}
```

**逻辑实现的主要代码**
```js
function fixNav() {
    if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
    } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
    }
}
```
# 收获
# CSS
## position
CSS position属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

### 取值
- **static**
  - 该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- **relative**
  - 该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。
- **absolute**
  - 元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
**fixed**
  - 元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。
- **sticky**
  - 元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。

