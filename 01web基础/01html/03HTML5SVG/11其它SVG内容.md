# 其它 SVG 内容

除了图形化原件，如矩形和圆形之外，SVG 还提供了一些元素用来在图片中嵌入别的类型的内容。

## 嵌入光栅图像

很像在 HTML 中的 img 元素，SVG 有一个 image 元素，用于同样的目的。你可以利用它嵌入任意光栅（以及矢量）图像。它的规格要求应用至少支持 PNG、JPG 和 SVG 格式文件。

嵌入的图像变成一个普通的 SVG 元素。这意味着，你可以在其内容上用剪切、遮罩、滤镜、旋转以及其它 SVG 工具：

```xml
<svg version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="200" height="200">
  <image x="90" y="-65" width="128" height="146" transform="rotate(45)"
     xlink:href="https://developer.mozilla.org/static/img/favicon144.png"/>
</svg>
```
![](https://developer.mozilla.org/files/16567/rotate-image-demo.png)

## 嵌入任意XML
因为SVG是一个XML应用，所以你总是可以在SVG文档的任何位置嵌入任意XML。但是你没有必要定义周围的SVG需要怎样反作用于这个内容。实际上，在一个遵从的浏览者中，根本没有反作用的方法，数据将简单被忽略。因此特地在SVG中添加了`<foreignObject>` 元素。它的唯一的目的是作为其它标记的容器和SVG样式属性的载体（更突出的width和height用来定义该对象占用的空间。）。

`foreignObject`元素是一个好办法，用来在SVG中嵌入XHTML。如果你有更长的文本，该HTML布局比SVG text元素更适合。另一个经常被引用的用例是用MathML写的方程式。对于SVG的科学应用，它是连接两个世界的一个很好的办法。

>:warning: 注意：请记住，`foreignObject`元素的内容是能被浏览器加工的。一个独立的SVG浏览器不太可能呈现HTML或MathML。


因为`foreignObject`是一个SVG元素，所以你可以像用图像那样，使用任何SVG的精华，它将被应用到它的内容。