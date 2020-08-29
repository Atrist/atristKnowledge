# 基础知识
定位的基本思想很简单，它允许你定义元素框相对于其正常位置应该出现的问址，或者相对于父元素，另一个元素甚至浏览器窗口本身的位置。

## 定位类型
选项	|说明
--|--
static	|默认形为，参考文档流
relative	|相对定位
absolute	|绝对定位
fixed	|固定定位
sticky	|粘性定位

```css
div{
position:absolute;
}
```

# 位置偏移
可以为部分类型的定位元素设置`上、下、左、右`的位置偏移
选项	|说明
--|--
top	|距离顶边
bottom	|距离下边
left	|距离左部
right	|距离右边

## 相对定位
相对定位是相对于元素原来的位置控制，当元素发生位置偏移时，原位置留白。
<br/><br/>

```html
<style>
  body {
    padding: 50px;
  }
  article {
    width: 400px;
    height: 200px;
    border: solid 10px blueviolet;
    font-size: 14px;
    padding: 30px;
  }
  article img {
    width: 50px;
    position: relative;
    top: -20px;
  }
</style>
<article>
        <img src="xj.png" alt="">
        后盾人自2010年创立至今，免费发布了大量高质量视频教程，视频在优酷、土豆、酷六等视频网站均有收录，很多技术爱好者受益其中。除了免费视频外，后盾人还为大家提供了面授班、远程班、公益公开课、VIP系列课程等众多形式的学习途径。后盾人有一群认真执着的老师，他们一心为同学着想，将真正的知识传授给大家是后盾人永远不变的追求。
</article>
```


## 绝对定位
绝对定位不受文档流影响，就像漂浮在页面中的精灵，绝对定位元素拥有行内块特性。


**参照元素**

如果父级元素设置了 `relative | fixed | sticky` ，绝对定位子元素将参数此父元素进行定位。

```html
<style>
	body {
    padding: 50px;
  }

  article {
      width: 400px;
      height: 100px;
      border: solid 6px blueviolet;
      position: relative;
  }

  div {
      font-size: 25px;
      background: #f2a67d;
      padding: 10px;
      position: absolute;
      top: 0;
      left: 0px;
  }
</style>

<article>
	<div>houdunren.com</div>
</article>
```

## 默认位置

如果没有为定位元素设置偏移，将受父元素的padding等属性影响。但使用定位一般都会设置偏移位置。

```css
body {
    padding: 50px;
}

article {
    width: 400px;
    height: 100px;
    border: solid 6px blueviolet;
    position: relative;
    padding: 20px;
}

div {
    background: #f2a67d;
    padding: 5px;
    position: absolute;
    top: 50px;
    left: 50px;
}
```

## 设置尺寸
可以通过定位的偏移值设置元素的尺寸。
```html
<style>
	body {
    padding: 50px;
  }
  article {
    width: 400px;
    height: 100px;
    border: solid 6px blueviolet;
    position: relative;
  }
  div {
    font-size: 25px;
    background: #f2a67d;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    bottom: 0;
  }
</style>
```

## 居中定位

通过将`left`设置为50%，并向左偏移子元素宽度一半可以实现水平居中

```html
<style>
  body {
    padding: 50px;
  }
  article {
    width: 400px;
    height: 400px;
    border: solid 6px blueviolet;
    position: relative;
  }
  div {
    width: 200px;
    height: 200px;
    background: #f2a67d;
    position: absolute;
    left: 50%;
    margin-left: -100px;
    top: 50%;
    margin-top: -100px;
  }
</style>
<article>
        <div></div>
</article>
```

## 滚动行为
固定定位元素会随滚动条发生滚动

```html
<style>
  body {
    padding: 50px;
  }
  main {
    width: 300px;
    height: 200px;
    border: solid 10px blueviolet;
    position: relative;
    overflow: scroll;
  }
  main article {
    height: 600px;
  }
  main article div {
    width: 200px;
    height: 200px;
    position: absolute;
  }
  main article div:nth-of-type(1) {
    background: red;
    left: 0px;
    z-index: 2;
  }
</style>
...
<main>
	<article>
		<div></div>
	</article>
</main>
```

## 图标定位

有了绝对定位可以很方便的控制
```html
<style>
* {
  padding: 0;
  margin: 0;
}
main {
  height: 3000px;
  padding: 100px;
}
main div {
  width: 300px;
  border: solid 6px blueviolet;
  padding: 0;
  overflow: hidden;
  position: relative;
}
main div img {
  max-width: 300px;
  float: left;
}
main div span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  color: white;
  line-height: 2em;
  border-radius: 50%;
  background: blueviolet;
  position: absolute;
  top: 10px;
  left: 10px;
  box-shadow: 0 0 5px rgba(100, 100, 100, 0.8);
}
</style>
<main>
    <div>
        <span>热</span>
        <img src="houdunren.jpg" alt="">
    </div>
</main>
```

## 纵向重叠
如果元素重叠在一起,可以使用`z-index`控制元素的上下层级，数值越大越在上面。

父级子元素设置 `z-index` 没有意义，子元素永远在父元素上面的。

### 层级改变


```html
<style>
	body {
    padding: 50px;
  }

  article {
    width: 200px;
    height: 200px;
    border: solid 10px blueviolet;
    position: relative;
    cursor: pointer;
  }

  article:hover div:nth-of-type(2) {
    z-index: 2;
  }

  article div {
    width: 200px;
    height: 200px;
    position: absolute;
  }

  article div:nth-of-type(1) {
    background: red;
    left: 0px;
    z-index: 2;
  }

  article div:nth-of-type(2) {
    background: green;
    left: 50px;
    top: 50px;
  }
</style>
...

<article>
	<div></div>
	<div></div>
</article>
```

## 购物车
因为`事件捕获特性`,所要以把父级的 z-index 放在最下面。

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  main {
    width: 600px;
    padding: 100px;
    margin: 0 auto;
  }
  main article {
    width: 150px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    color: #555;
  }
  main article:hover div:nth-of-type(1) {
    border-bottom: none;
  }
  main article:hover div:nth-of-type(2) {
    display: block;
  }
  main article div {
    box-sizing: border-box;
    height: 50px;
    line-height: 3.5em;
    text-align: center;
    border: solid 2px blueviolet;
    background: white;
  }
  main article div:nth-of-type(1) {
    position: relative;
    z-index: 2;
  }
  main article div:nth-of-type(2) {
    display: none;
    position: absolute;
    right: 0;
    top: 48px;
    left: -150px;
    z-index: 1;
  }
</style>
...

<main>
    <article>
        <div>我的购物车</div>
        <div>购物车中暂无产品</div>
    </article>
</main>
```

## 固定定位


元素相对于页面固定定位在某个位置，固定定位元素不会在滚动时改变位置 ，使用`position: fixed` 产生固定定位
```html
<style>
  header {
    height: 60px;
    border-bottom: solid 5px #7f35c9;
    box-shadow: 0 5px 8px rgba(100, 100, 100, 0.6);
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  article {
    height: 3000px;
    margin-top: 80px;
    background: #f3f3f3;
    border: solid 5px #ddd;
  }
</style>
...

<header></header>
<article></article>
```
## 粘性定位
### 同级定位
```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  main {
    padding: 30px;
    font-size: 14px;
  }
  main article {
    width: 400px;
    height: 100px;
    border: solid 5px blueviolet;
    overflow: scroll;
  }
  main article h2 {
    background: #db1f77;
    color: white;
    text-indent: 20px;
    position: sticky;
    top: 0;
  }
  main article h2:nth-of-type(1) {
    background: blueviolet;
  }
  main article section {
    height: 300px;
  }
</style>
...

<main>
    <article>
        <section></section>
        <h2>后盾人</h2>
        <section></section>
        <h2>HOUDUNREN</h2>
        <section></section>
    </article>
</main>
```


## 非同级定位
不属于同一个父元素设置粘性定位时，后面的元素挤掉原来位置的元素。
如下列：
```html
<style>
  *{
    padding:0;
    margin:0;
  }
</style>
<main style="padding: 30px;
    font-size: 14px;">
    <article style="width: 400px;
    border: solid 5px blueviolet;
    height: 200px;
    overflow: scroll;">
        <section>
            <h2 style="background: blueviolet; 
    color: white;
    text-indent: 20px;
    position: sticky;
    top: 0;">hdcms.com</h2>
            <p style="padding: 20px;">
                后盾人自2010年创立至今，免费发布了大量高质量视频教程，视频在优酷、土豆、酷六等视频网站均有收录，很多技术爱好者受益其中。除了免费视频外，后盾人还为大家提供了面授班、远程班、公益公开课、VIP系列课程等众多形式的学习途径。后盾人有一群认真执着的老师，他们一心为同学着想，将真正的知识传授给大家是后盾人永远不变的追求。
            </p>
        </section>
        <section>
            <h2 style="background: #db1f77;
    color: white;
    text-indent: 20px;
    position: sticky;
    top: 0;">后盾人</h2>
            <p style=" padding: 20px;">
                后盾人隶属于北京后盾计算机技术培训有限责任公司，是专注于培养中国互联网精英PHP程序语言专业人才的专业型培训机构，拥有七年培训行业经验。后盾人拥有国内一线的讲师和技术团队，团队成员项目经验均在8年以上，团队曾多次为国内外上市集团、政府机关的大型项目提供技术支持，其中包括新浪、搜狐、腾讯、宝洁公司、联想、丰田、工商银行、中国一汽等众多大众所熟知的知名企业。
            </p>
        </section>
        <section>
            <h2 style=" background: #db1f77;
    color: white;
    text-indent: 20px;
    position: sticky;
    top: 0;">houdunwang.com</h2>
            <p style="padding:20px;">
                后盾人自2010年创立至今，免费发布了大量高质量视频教程，视频在优酷、土豆、酷六等视频网站均有收录，很多技术爱好者受益其中。除了免费视频外，后盾人还为大家提供了面授班、远程班、公益公开课、VIP系列课程等众多形式的学习途径。后盾人有一群认真执着的老师，他们一心为同学着想，将真正的知识传授给大家是后盾人永远不变的追求。
            </p>
        </section>
    </article>
</main>
```