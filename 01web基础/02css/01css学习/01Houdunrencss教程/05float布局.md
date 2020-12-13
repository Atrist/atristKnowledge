# 浮动布局
float属性定义元素在哪个方向浮动。以往这个属性总应用于图像，使文本围绕在图象周围，不过在css中，任何元素都可以浮动。浮动元素会生成一个块级框，而不论它本身是何种元素

## FLOAT
使用浮动可以控制相邻元素间的排列关系
选项	|说明
--|--
left|	向左浮动
right|	向右浮动
none|	不浮动
## 文档流
没有设置浮动的块元素是独占一行的。
```html
<div style="margin-bottom:4px;border:solid 3px red;width:200px;height:200px">
    <div></div>
</div>
<div style="background-color:green;width:200px;height:200px">
    <div></div>
</div>
<br/>
```

浮动是对后面元素影响，下图中第二个元素设置浮动对第一个元素没有影响
```css
div:first-of-type {
    border: solid 2px red;
}

div:last-of-type {
 		float: right;
    background: green;
}
```

```html
<div style="margin-bottom:4px;border:solid 3px red;width:200px;height:200px">
    <div></div>
</div>
<div style="background-color:green;width:200px;height:200px;float:right">
    <div></div>
</div>
<div style="Visibility:hidden;background-color:green;width:200px;height:200px;"></div>
<br/>
```

## 丢失空间
如果只给第一个元素设置浮动，第二个元素不设置，后面的元素会占用第一个元素空间。

```html
<div style="margin-bottom:4px;border:solid 3px red;width:200px;height:200px;float:left;">
    <div></div>
</div>
<div style="background-color:green;width:200px;height:200px;">
    <div></div>
</div>
<br/>
```
## 使用浮动
两个元素都设置浮动后，会并排显示
```css
div:first-of-type {
    float: left;
    border: solid 2px red;
}

div:last-of-type {
    float: left;
    background: green;
}
```

```html
<div style="margin-bottom:4px;border:solid 3px red;width:200px;height:200px;float:left;">
</div>
<div style="float:left;background-color:green;width:200px;height:200px;">
</div>
<br/>


<div style="clear:left;"></div>
<br/>
```

**为第二个元素设置浮动**
```css
div:first-of-type {
    float: left;
    border: solid 2px red;
}

div:last-of-type {
    float: right;
    background: green;
```

```html
<div style="float:left;border:solid 2px red;width:200px;height:200px;"></div>
<div style="float:right;background-color:green;width:200px;height:200px;"></div>

<div style="clear:left;"></div>
```
## 浮动边界
浮动元素边界不能超过父元素的`padding`
```css
main {
    width: 400px;
    border: solid 2px black;
    overflow: auto;
    padding: 50px;
    background-color: antiquewhite;
    background-clip: content-box;
}

div {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
}

div:first-of-type {
    float: left;
    border: solid 2px red;
}

div:last-of-type {
    float: right;
    background: green;
}
```
```html
<main style=" width: 400px;
    border: solid 2px black;
    overflow: auto;
    padding: 50px;
    background-color: antiquewhite;
    background-clip: content-box;">
    <div style=" width: 100px;
    height: 100px;
    box-sizing: border-box; float: left;
    border: solid 2px red;"></div>
    <div style=" width: 100px;
    height: 100px;
    box-sizing: border-box;  float: right;
    background: green;"></div>
</main>
```
## 浮动转块 
元素浮动后会变为块元素包括行元素如 span，所以浮动后的元素可以设置宽高
```css
a{
    float:left;
    width:300px;
}
```
## 清除浮动
不希望元素受浮动元素影响时，可以清除浮动。
### CLEAR
css提供了`clear`规则用于清除元素浮动影响。
选项	|说明
--|--
left	|左边远离浮动元素
right	|右连远离浮动元素
both	|左右都远离浮动元素

使用清除浮动
```html
<style>
	div {
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
  }

  div.green {
      border: solid 2px green;
      float: left;
  }

  div.red {
      border: solid 2px red;
      float: right;
  }

  div.blue {
      background: blue;
      clear: both;
  }
</style>
<div class="green"></div>
<div class="red"></div>
<div class="blue"></div>
```
```html
<div style="width: 200px;
    height: 200px;
    margin-bottom: 10px;border:solid 2px green;float:left;"></div>
    <div style="width: 200px;
    height: 200px;
    margin-bottom: 10px;border:solid 2px red;float:right;"></div>
    <div style="width: 200px;
    height: 200px;
    margin-bottom: 10px;background-color:blue;clear:both;"></div>

<br/>
```
**在父元素内部最后面添加一个没有高度的了元素，并使用`clear:both`。**
```html
<style>
	.clearfix {
      clear: both;
      height: 0;
  }

  div {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
  }


  div.green {
      border: solid 2px green;
      float: left;
  }

  div.red {
      border: solid 2px red;
      height: 200px;
      float: left;
  }

  div.blue {
      background: blue;
  }
</style>

<article>
        <div class="green"></div>
        <div class="red"></div>
        <div class="clear"></div>
    </article>
   <div class="blue"></div>
```
```html
<article>
        <div style=" width: 200px;
      height: 200px;
      margin-bottom: 10px; border: solid 2px green;
      float: left;"></div>
              <div style=" width: 200px;
      height: 200px;
      margin-bottom: 10px; border: solid 2px red;
      float: right;"></div>
      <div style="clear:both;height:0;"></div>
    </article>
    <div style=" width: 200px;
      height: 200px;
      margin-bottom: 10px;background:blue;"></div>

<br/>
```
## AFTER
使用 ::after 伪类为父元素添加后标签，实现清除浮动影响。
```css
.clearfix::after {
     content: "";
    display: block;
    clear: both;
}
```
## OVERFLOW
子元素使用浮动后将不占用空间，这时父元素高度为将为零。通过添加父元素并设置 `overflow` 属性可以清除浮动。

将会使用父元素产生 `BFC 机制`，即父元素的高度计算会包括浮动元素的高度。
```css
  article {
      overflow: hidden;
  }
```

## 形状浮动
通过形状浮动可以让内容围绕图片，类似于我们在word 中的环绕排版。要求图片是有透明度的PNG格式。

**距离控制**
选项	|说明
--|--
margin-box	|外边距环绕
padding-box	|内边距环绕
border-box	|边线环绕
content-box	|内容环绕