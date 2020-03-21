# 08-FunWithHTML5Canvas
第八天的练习是制作一个Canvas画板，可以用鼠标随意书写作画，颜色呈彩虹色渐变，画笔的大小呈大小渐变循环。这部分内容不涉及HTML和CSS相关内容，由纯JS实现。

# 收获
## HTML5 Canvas
- [canvas菜鸟教程](https://www.w3school.com.cn/html5/html_5_canvas.asp)
- [canvasMDN教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

`<canvas>`是一个可以使用脚本(通常为JavaScript)来绘制图形的 HTML 元素.例如,
它可以用于绘制图表、制作图片构图或者制作简单的(以及不那么简单的)动画.

Canvas 的默认大小为300像素×150像素（宽×高，像素的单位是px）。但是，可以使用HTML的高度和宽度属性来自定义Canvas 的尺寸。为了在 Canvas 上绘制图形，我们使用一个JavaScript上下文对象，它能动态创建图像（ creates graphics on the fly）。

**语法**
```js
<canvas id="tutorial" width="150" height="150"></canvas>
```
`<canvas>` 看起来和 `<img>` 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。实际上，`<canvas>` 标签只有两个属性—— width和height。些都是可选的，并且同样利用 DOM properties 来设置。当没有设置宽度和高度的时候，canvas会初始化宽度为300像素和高度为150像素。该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。
>注意: 如果你绘制出来的图像是扭曲的, 尝试用width和height属性为`<canvas>`明确规定宽高，而不是使用CSS。


## JS 鼠标事件
[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)

在此练习中,运用到如下属性和方法:
- MouseEvent.offsetX (只读)
  - 鼠标指针相对于目标节点内边位置的X坐标
- MouseEvent.offsetY (只读)
  - 鼠标指针相对于目标节点内边位置的Y坐标
## JS window对象
### 属性
- innerheight
  - 返回窗口的文档显示区的高度
- innerwidth 
  - 返回窗口的文档显示区的宽度
### 方法
- mouseup   某鼠标按键被按下
- mousedown 某鼠标按键被松开
- mouseout 鼠标从某元素移开
- mousemove 鼠标被移动

## 简单事务逻辑
- 鼠标按下,将draw置真
- 鼠标移动,检查draw是否为真
  - 为真开始作画
  - 为假,退出作画函数
- 鼠标松开,将draw置假