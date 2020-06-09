# SVG 字体
当规定SVG时，在浏览器支持web字体并不流行。因为访问正确的字体文件对于正确呈现字体是有确定性的，SVG中添加了一个字体描述技术，以提供这个能力。它并不是为了和别的格式比如说PostScript或OTF兼容，而是为了将字形信息嵌入SVG呈现的一个简单的方法。

>:warning: SVG字体当前只在Safari和Android浏览器中受支持。
Internet Explorer还没有考虑实现它，Chrome 38（和Opera25）移除了这个功能，Firefox已经无限期推迟实施它以专心实现WOFF。别的工具比如说Adobe SVG Viewer插件、Batik和部分Inkscape支持SVG字体嵌入。

定义一个SVG字体的基础是`<font>`元素。
## 定义一个字体
在SVG中嵌入一个字体，有一些原料要求。让我们用一个示例演示它（来自规范文档的示例），并详细解释。
```xml
<font id="Font1" horiz-adv-x="1000">
  <font-face font-family="Super Sans" font-weight="bold" font-style="normal"
      units-per-em="1000" cap-height="600" x-height="400"
      ascent="700" descent="300"
      alphabetic="0" mathematical="350" ideographic="400" hanging="500">
    <font-face-src>
      <font-face-name name="Super Sans Bold"/>
    </font-face-src>
  </font-face>
  <missing-glyph><path d="M0,0h200v200h-200z"/></missing-glyph>
  <glyph unicode="!" horiz-adv-x="300"><!-- Outline of exclam. pt. glyph --></glyph>
  <glyph unicode="@"><!-- Outline of @ glyph --></glyph>
  <!-- more glyphs -->
</font>
```
我们从`<font>`元素开始。这个携带了一个ID属性，使它能够通过一个URI被引用（如下所示）。属性horiz-adv-x定义了相比之单一字形的路径定义，一个字符的平均宽度。值1000设置了一个起作用的合理值。有一些陪同的属性，帮助进一步定义基本的字形盒布局。

`<font-face>`元素在SVG中等同于CSS的 @font-face 声明。它定义了最终字体的基本属性，比如说weight、style，等等。在上面这个示例中，最重要的是定义font-family，后面的CSS和SVG font-family属性可以引用它的值。属性font-weight和font-style跟CSS中的描述符有同样的目的。所有后面的属性都是字体布局引擎的呈现指令，举个例子，字形的全部高度可以提升多少。

它的子元素，`<font-face-src>`元素，相对于CSS的@font-face描述符中的src描述符。你可以利用它的子元素 `<font-face-name>`和`<font-face-uri>`把字体声明指向外源。以上示例表达了如果渲染器有一个名为“Super Sans Bold”的本地字体可用，它将使用这个本地字体。

紧跟着`<font-face-src>`元素的是一个`<missing-glyph>`元素。它定义了如果一个特定的字形在字体中找不到，而且也没有回调机制的话，该如何显示。它同时还显示了如何创建字形：在里面简单添加任一个图形化SVG内容。你可以在这里使用任何其它的SVG元素，甚至是 `<filter>`元素、`<a>`元素或者` <script>`元素。然而，为了简化字形，你可以简单添加一个属性d——它精确定义了字形的形状，就像标准SVG路径所做的那样。

真正的字形是用`<glyph>`元素定义的。它最重要的属性是unicode。它定义了表达这个字形的unicode代码点。如果你还在一个字形上指定了lang属性，你可以更进一步专门限定它为特定的语言（由目标上的xml:lang属性表达）。而且，你可以使用任意的SVG来定义这个字形，它允许用户代理所支持的很多效果。

有两个进一步的元素，可以定义在font元素里面：`<hkern>`元素和`<vkern>`元素。这两个元素每个引用到至少两个字符（属性u1和属性u2）以及一个属性k。属性k决定了那些字符之间的距离应该减少多少。下面的示例指示用户代理把“A”和“V”字符放得比标准的字符间距更靠近一些。
```xml
<hkern u1="A" u2="V" k="20" />
```
## 引用一个字体
如果你已经把你的字体声明如上放在一起，你可以使用一个单一的font-family属性以实现在SVG文本上应用字体：
```xml
<font>
  <font-face font-family="Super Sans" />
  <!-- and so on -->
</font>

<text font-family="Super Sans">My text uses Super Sans</text>
```
然而，你可以自由组合一些方法，在如何定义字体方面有极大的自由度。
### 选项：使用CSS @font-face
你可以使用`@font-face`以引用远程（或者非远程）字体：
```xml
<font id="Super_Sans">
  <!-- and so on -->
</font>

<style type="text/css">
@font-face {
  font-family: "Super Sans";
  src: url(#Super_Sans);
}
</style>

<text font-family="Super Sans">My text uses Super Sans</text>
```
### 选项：引用一个远程字体
上面提到的font-face-uri元素允许你引用一个外来字体，因此可以有很大的可重用性：
```xml
<font>
  <font-face font-family="Super Sans">
    <font-face-src>
      <font-face-uri xlink:href="fonts.svg#Super_Sans" />
    </font-face-src>
  </font-face>
</font> 
```