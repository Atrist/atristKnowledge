# 22 - Follow Along Link Highlighter
第22天的练习是一个动画练习，当鼠标移动到锚点处，会有一个白色的色块移动到当前锚点所在的位置。


# 主要思路
1. 为所有的a标签添加事件
2. 获取到当前a标签的位置
3. 给`span`设置为刚才获取得到的位置

## 关键代码
span标签的css属性
```css
.highlight {
  transition: all 0.2s;
  border-bottom: 2px solid white;
  position: absolute;
  top: 0;
  background: white;
  left: 0;
  z-index: -1;
  border-radius: 20px;
  display: block;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
```

```js
function highlightLink() {
const linkCoords = this.getBoundingClientRect();
console.log(linkCoords);
const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
};
highlight.style.width = `${coords.width}px`;
highlight.style.height = `${coords.height}px`;
highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
```

# 收获

# CSS
## box-sizing
CSS 中的 box-sizing 属性定义了 浏览器应该如何计算一个元素的总宽度和总高度。 [MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)

在 CSS 盒子模型的默认定义里，你对一个元素所设置的 width 与 height 只会应用到这个元素的内容区。如果这个元素有任何的 border 或 padding ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

box-sizing 属性可以被用来调整这些表现:
- content-box  是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。
  - border-box不包含margin
# JS

## getBoundingClientRect()
Range.getBoundingClientRect() 返回一个 DOMRect 对象，该对象限定了选定的文档对象的内容，该方法返回了一个矩形，这个矩形包围了该文档对象中所有元素的边界矩形集合, [MDn](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/getBoundingClientRect)

### DOMRect对象
一个 DOMRect 代表一个矩形。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)

**属性**
- DOMRect.x  Readonly
  - DOMRect 原点的 x 坐标.
- DOMRect.y ReadOnly
  - DOMRect 原点的 y 坐标。
- DOMRect.width ReadOnly
  - DOMRect 的宽度。
- DOMRect.height ReadOnly
  - DOMRect 的高度。
- DOMRect.top ReadOnly
  - 返回 DOMRect 的顶坐标值（与 y 具有相同的值，如果 height 为负值，则为 y + height 的值）。
- DOMRect.right ReadOnly
  - 返回 DOMRect 的右坐标值（与 x + width 具有相同的值，如果width 为负值，则为 x 的值）。
- DOMRect.bottom ReadOnly
  - 返回 DOMRect 的底坐标值（与 y + height 具有相同的值，如果 height 为负值，则为 y 的值）。
- DOMRect.left ReadOnly
  - 返回 DOMRect 的左坐标值（与 x 具有相同的值，如果 widht 为负值，则为 x + width 的值）。

## mouseenter
当定点设备（通常指鼠标）移动到元素上时就会触发 `mouseenter` 事件

类似 mouseover，它们两者之间的差别是 mouseenter 不会冒泡（bubble），也就是说当指针从它的子层物理空间移到它的物理空间上时不会触发

[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseenter_event)


