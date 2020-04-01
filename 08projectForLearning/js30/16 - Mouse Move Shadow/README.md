# 16 - Mouse Move Shadow
第十六天主要是练习是一个较常用的效果：鼠标移动时，元素的字体阴影随着鼠标移动的方向发生改变，达到字体阴影随着鼠标一起走的效果。

# 收获
## HTML
### contentditable
全局属性 contenteditable  是一个枚举属性，表示元素是否可被用户编辑。 如果可以，浏览器会修改元素的部件以允许编辑。

## CSS
### text-shadow
text-shadow为文字添加阴影。可以为文字与  text-decorations  添加多个阴影，阴影值之间用逗号隔开。每个阴影值由元素在X和Y方向的偏移量、模糊半径和颜色值组成。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)

**语法**
```css
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black; 

/* color | offset-x | offset-y | blur-radius */
text-shadow: #fc0 1px 0 10px; 

/* offset-x | offset-y | color */
text-shadow: 5px 5px #558abb;

/* color | offset-x | offset-y */
text-shadow: white 2px 5px;

/* offset-x | offset-y
/* Use defaults for color and blur-radius */
text-shadow: 5px 10px;

/* Global values */
text-shadow: inherit;
text-shadow: initial;
text-shadow: unset;
```

**当阴影大于一个时要用逗号区别开阴影之间的参数**

每个阴影都有两到三个`<length>`参数 ， 以及一个与阴影颜色相关的`<color>`参数 。 前两个`<length`>参数，是以“文字中心”为原点的坐标轴，分别为x轴 `<offset-x>` 和y轴` <offset-y>` 的值； 如果有第三个`<length>`参数，则第三个数值为形成阴影效果的半径的数值` <blur-radius>` 。

当所给的阴影大于一个时，阴影应用的顺序为从前到后, 第一个指定的阴影在顶部.

- `<color>`
  - 可选。可以在偏移量之前或之后指定。如果没有指定颜色，则使用UA（用户代理）自行选择的颜色。
  - Note: 如果想确保跨浏览器的一致性，请明确地指定一种颜色
- `<offset-x> <offset-y>`
  - 必选。这些长度值指定阴影相对文字的偏移量。  `<offset-x>`   指定水平偏移量，若是负值则阴影位于文字左边。 `<offset-y>` 指定垂直偏移量，若是负值则阴影位于文字上面。如果两者均为0，则阴影位于文字正后方（如果设置了`<blur-radius> `则会产生模糊效果)。
可用单位请查看 `<length>`。
- `<blur-radius>`
  - 可选。这是 `<length>` 值。如果没有指定，则默认为0。值越大，模糊半径越大，阴影也就越大越淡（wider and lighter）

## JS
### 解构赋值
```js
const { offsetWidth: width, offsetHeight: height } = hero;
let { offsetX: x, offsetY: y } = e;
```

解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### offsetX
- **offsetTop**
  - HTMLElement.offsetTop 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
- **offsetHeight**
  -  HTMLElement.offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)
  -  通常，元素的offsetHeight是一种元素CSS高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before或:after等伪类元素的高度。
  - 对于文档的body对象，它包括代替元素的CSS高度线性总含量高。浮动元素的向下延伸内容高度是被忽略的。 
  - 如果元素被隐藏（例如 元素或者元素的祖先之一的元素的style.display被设置为none），则返回0
- **offsetLeft**
  - HTMLElement.offsetLeft 是一个只读属性，返回当前元素左上角相对于  HTMLElement.offsetParent 节点的左边界偏移的像素值。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetLeft)
  - 对块级元素来说，offsetTop、offsetLeft、offsetWidth 及 offsetHeight 描述了元素相对于 offsetParent 的边界框。
  - 对于可被截断到下一行的行内元素（如 span），offsetTop 和 offsetLeft 描述的是第一个边界框的位置（使用 Element.getClientRects() 来获取其宽度和高度），而 offsetWidth 和 offsetHeight 描述的是边界框的尺寸（使用 Element.getBoundingClientRect 来获取其位置）。因此，使用 offsetLeft、offsetTop、offsetWidth、offsetHeight 来对应 left、top、width 和 height 的一个盒子将不会是文本容器 span 的盒子边界。
- **offsetParent**
  - 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent)
  - 当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的。
- **offsetWidth**
  - HTMLElement.offsetWidth 是一个只读属性，返回一个元素的布局宽度。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)
  - 一个典型的（译者注：各浏览器的offsetWidth可能有所不同）offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。


