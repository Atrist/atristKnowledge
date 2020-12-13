# SVG image element

下一页 »

SVG 的`<image>`元素允许在一个 SVG 对象内部呈现光栅图像。

在这个基本示例中，一个`xlink:href` 属性引用了一个将呈现在 SVG 对象中的.jpg 图像：

```xml
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="5cm" height="4cm" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
	<image xlink:href="firefox.jpg" x="0" y="0" height="50px" width="50px"/>
</svg>
```

这里有一些重要的事情需要注意（引用自 W3 规范文档）：

- 如果你没有设置 x 属性或 y 属性，它们自动被设置为 0。
- 如果你没有设置 height 属性或 width 属性，它们自动被设置为 0。
- 如果 width 属性或 height 等于 0，将不会呈现这个图像。
