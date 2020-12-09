# BFC IFC GFC FFC

CSS2.1中只有BFC 和 IFC,CSS3中才有GFC和FFC

## What's FC?
FC的全称是: Formatting Contexts, 是W3C CSS2.1 规范中的一个概念. 它是页面中的一块渲染区域,并且有一套渲染规则,它决定了其子元素将如何定位,以及和其他元素的关系和相互作用.

## BFC
BFC(Block Formatting Contexts)直译为"块级格式化上下文". Block Formatting Contexts就是页面上的一个隔离的渲染区域,容器里面的子元素不会在布局上影响到外面的元素,反之,也是如此.

### 如何产生BFC
- 根元素（`<html>`）
- 浮动元素（元素的 `float` 不是 none）
- 绝对定位元素（元素的 `position` 为 absolute 或 fixed）
- 行内块元素（元素的 `display` 为 inline-block）
- 表格单元格（元素的 `display` 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 `display` 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 `display` 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- `overflow` 值不为 `visible` 的块元素
- `display` 值为 `flow-root` 的元素
- `contain` 值为 layout、content 或 paint 的元素
- 弹性元素（`display` 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（`display` 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 `column-count` 或 `column-width` 不为 auto，包括 column-count 为 1）
- `column-span` 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，Chrome bug）。

### BFC作用
比如常见的多栏布局,结合块级元素浮动,里面的元素则是在一个相对隔离的环境里运行.

外边距折叠（[Margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)）也只会发生在属于同一BFC的块级元素之间。

## IFC
IFC(Inline Formatting Contexts)直译为"内联格式化上下文", IFC的ine box(线框)高度由其包含行内元素中最高的实际高度计算而来(不受到竖直方向的padding/margin影响)

IFC的line box 一般左右都贴紧整个IFC,但是会因为float元素而扰乱. float元素会位于IFC于line box 之间, 使得line box宽度缩短. 同时ICF下的多个line box高度会不同. IFC中是不可能有块级元素的,当插入块级元素时(如p中插入div)会产生两个匿名块与div分隔开,即产生两个IFC,每个IFC对外表现为块级元素,与div垂直排列

## IFC的作用
- 水平居中: 当一个块要在环境中水平居中时,设置其为inline-block则会在外层产生IFC,通过`text-align:center`则可以使其水平居中
- 垂直居中: 创建一个IFC,用其中一个元素撑开父元素的高度,然后设置其`vertical-align:middle`,其他行内元素则可以在此元素下垂直居中

## GFC
GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。 
### GFC的作用
那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

## FFC
FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为`flex`或者`inline-flex`的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。

Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 `display` 属性为 `flex` 或 `inline-flex `可以得到一个伸缩容器。设置为 `flex` 的容器被渲染为一个块级元素，而设置为 `inline-flex` 的容器则渲染为一个行内元素。


伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，`Flexbox` 定义了伸缩容器内伸缩项目该如何布局。

