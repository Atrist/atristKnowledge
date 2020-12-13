# SVG工具
现在我们已经讲解了SVG内部的基础。我们将看一看哪些工具可以制作或呈现SVG文件。
## 浏览器支持
随着IE9面世，最终所有的主流浏览器将支持SVG：Internet Explorer 9、Mozilla Firefox、Safari、Google Chrome和Opera。基于Webkit的移动设备浏览器（主要是指iOS和Android），都支持SVG。在较老或者较小的设备上，一般支持SVG Tiny。

## Inkscape
URL: www.inkscape.org

图形格式最重要的工具之一，是一个相当好的绘图程序。Inkscape提供了最先进的矢量绘图功能，而且它是开源的。

此外它使用SVG作为它的原生文件格式。为了存储Inkcape特有的数据，它扩展了SVG文件，添加了自定义命名空间的元素和属性，但是你依然可以选择导出纯SVG文件。
## Adobe Illustrator
URL: www.adobe.com/products/illustrator/

在Adobe收购Macromedia之前，它已经是最著名的SVG的推动者。长期以来，Illustrator对SVG支持得很好。然而，它输出的SVG经常显出一些怪癖，导致有必要为普适性而进行后续处理。

## Apache Batik
URL: xmlgraphics.apache.org/batik/

Batik是Apache软件基金会支持下的一个开源工具集。这个工具包是用Java写的，提供了相当完整的SVG 1.1支持，而且还有很多源自于SVG 1.2计划的功能。

除了查看器（Squiggle）以及输出为PNG的光栅化输出，Batik还提供了一个SVG完美打印机以格式化SVG文件，以及一个TrueType字体到SVG字体的转换器。

与Apache FOP联用，Batki还可以把SVG转换成PDF。
## 其它呈现器
要想从一个SVG源创建一个光栅图像，存在很多个项目。ImageMagick是最著名的命名行图象处理工具之一。Wikipedia所用到的Gnome库rsvg能把它们的SVG图形光栅化。
## Raphael JS
URL: raphaeljs.com

这是一个JavaScript库，表现为浏览器编译器之间的一个抽像层。特别老的Internet Explorer版本可以用生成的VML支持。VML，一种矢量标记语言，它是SVG的两个祖先之一，从IE 5.5以来就存在了。
## Google Docs
URL: www.google.com/google-d-s/drawings/

从Google Docs绘制，可以被输出为SVG。
## Science
这两个名声很响的策划工具xfig和gnuplot都支持导出为SVG。为了在web上呈现图像， JSXGraph支持VML、SVG和canvas，基于浏览器的功能，自动决定使用哪种技术。

在GIS（地理图形信息系统）应用中，SVG是常用的存储和呈现格式。请阅读carto.net以了解详情。
## 更多工具
W3C提供了一个支持SVG的[程序列表]。