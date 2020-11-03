## 让一个元素水平垂直居中, 到底有多少种方案?

![](./images/center.jpg)

### 水平居中
- 对于 `行内元素`: text-align:center;
- 对于确定宽度的块级元素
  - `1.` width 和 margin 实现: `margin: 0 auto`
  - `2.` 绝对定位和 `margin-left: -width/2`, 前提是父元素`position:relative`
- 对于宽度未知的块级元素
  -  `1.` table标签配合margin左右auto实现水平居中。使用table标签（或直接将块级元素设值为`display:table`），再通过给该标签添加左右margin为auto。
  -  `2.` `inline-block`实现水平居中方法。`display：inline-block`和`text-align:center`实现水平居中。
  -  `3.` 绝对定位 + left +  transform:translateX 可以移动本身元素的 50%
        ```css
        .parent {
            width: 500px;
            height: 500px;
            background-color: aquamarine;
            position: relative;
        }
        .child {
            width: 300px;
            background-color: cadetblue;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        ```
    - `4.` flex布局使用 `justify-content:center`

        ```css
        .parent {
            display: flex;
            justify-content: center;
        }
        ```
### 垂直居中
1. 利用 `line-height`实现居中, 这种方法适合纯文字类
2. 通过设置父容器`相对定位`, 子级设置`绝对定位`, 标签通过`margin`实现自适应居中

    ```css
    .parent {
        position: relative;
    }
    .child {
        position: absolute;
        top: 50%;
        margin-top: -100px;
        background-color: cadetblue;
        text-align: center;
    }
    ```
3. 弹性布局`flex`:父级设置`display: flex`; 子级设置margin为auto实现自适应居中
4. 父级设置相对定位，子级设置绝对定位，并且通过位移`transform`实现

    ```css
    .parent {
        position: relative;
    }

    .child {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    ```
5. `table`布局，父级通过转换成表格形式，然后子级设置`vertical-align`实现。（需要注意的是：`vertical-align: middle` 使用的前提条件是内联元素以及`display`值为`table-cell`的元素）。

    ```css
    .parent {
        display: table;
    }
    .child {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    ```

## 浮动布局的优点? 有什么缺点? 清除浮动有哪些方式
> 浮动布局简介:当元素浮动以后可以向左或向右移动，直到它的外边缘碰到包含它的框或者另外一个浮动元素的边框为止。元素浮动以后会脱离正常的文档流，所以文档的普通流中的框就变现的好像浮动元素不存在一样。

### 优点
这样做的优点就是在图文混排的时候可以很好的使文字环绕在图片周围。另外当元素浮动了起来之后，它有着块级元素的一些性质例如可以设置宽高等，但它与inline-block还是有一些区别的，第一个就是关于横向排序的时候，float可以设置方向而inline-block方向是固定的；还有一个就是inline-block在使用时有时会有空白间隙的问题

### 缺点
最明显的缺点就是浮动元素一旦脱离了文档流，就无法撑起父元素，会造成父级元素的高度塌陷。

### 清除浮动的方式
1. 添加额外标签

    ```html
    <div class="parent">
        <!-- 添加额外标签并且添加 clear 属性 -->
        <div style="clear:both"></div>
        <!-- 也可以 加一个 br标签 -->
    </div>
    ```
2. 父级添加 overflow 属性, 或者设置高度

    ```html
    <div class="parent" style="overflow:hidden">
    <!-- auto 也可以 -->
    <!-- 将父元素的overflow设置为hidden -->
    <div class="f"></div>
    </div>
    ```
3. 建立伪类选择器清除浮动(推荐)

    ```html
    <!-- 在 css 中 添加 : after 伪元素 -->
    <style>
        .parent:after{
            /* 设置添加子元素的内容是空 */
            content: '';  
            /* 设置添加子元素为块级元素 */
            display: block;
            /* 设置添加的子元素的高度0 */
            height: 0;
            /* 设置添加子元素看不见 */
            visibility: hidden;
            /* 设置clear：both */
            clear: both;
        }
    </style>
    <div class="parent">
        <div class="f"></div>
    </div>
    ```

##  使用display:inline-block会产生什么问题？解决方法？
### 问题复现
问题: 两个`display：inline-block`元素放到一起会产生一段空白

如代码:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      .container {
        width: 800px;
        height: 200px;
      }

      .left {
        font-size: 14px;
        background: red;
        display: inline-block;
        width: 100px;
        height: 100px;
      }

      .right {
        font-size: 14px;
        background: blue;
        display: inline-block;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">
        左
      </div>
      <div class="right">
        右
      </div>
    </div>
  </body>
</html>
```

效果如下:

![](./images/example.png)


### 产生空白的原因
元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据CSS中`white-space`属性的处理方式（默认是`normal`，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，在字体不为0的情况下，空白符占据一定宽度，所以`inline-block`的元素之间就出现了空隙。

### 解决方案
1. 将子元素标签的结束符和下一个标签的开始符写在同一行或把所有子标签写在同一行

    ```html
    <div class="container">
    <div class="left">
        左
    </div><div class="right">
        右
    </div>
    </div>
    ```
2. 父元素中设置font-size: 0，在子元素上重置正确的font-size

    ```css
    .container{
        width:800px;
        height:200px;
        font-size: 0;
    }
    ```
3. 为子元素设置  `float:left`

    ```css
    .left{  
        float:left;
        font-size:14px;
        background:red;
        display:inline-block;
        width:100px;
        height:100px;
    }
    /* right 是 同理 */
    .right{  
        float:left;
        font-size:14px;
        background:red;
        display:inline-block;
        width:100px;
        height:100px;
    }

    
    ```
    原理: 
    >If 'float' has a value other than 'none', the box is floated and 'display' is treated as 'block'


## 布局题：div垂直居中，左右10px，高度始终为宽度一半
>问题描述: 实现一个div垂直居中, 其距离屏幕左右两边各10px, 其高度始终是宽度的50%。同时div中有一个文字A，文字需要水平垂直居中。

### 思路一 利用height:0; padding-bottom: 50%;
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      *{
        margin: 0;
        padding: 0;
      }
      html, body {
        height: 100%;
        width: 100%;
      }
      .outer_wrapper {
        margin: 0 10px;
        height: 100%;
        /* flex布局让块垂直居中 */
        display: flex;
        align-items: center;
      }
      .inner_wrapper{
        background: red;
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 50%;
      }
      .box{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="outer_wrapper">
      <div class="inner_wrapper">
        <div class="box">A</div>
      </div>
    </div>
  </body>
</html>
```
强调两点:

1. padding-bottom 究竟是相对于谁的?

    答案是相对于父元素的`width`值。

    那么对于这个`out_wrapper`的用意就很好理解了。 CSS呈流式布局，div默认宽度填满，即100%大小，给out_wrapper设置margin: 0 10px;相当于让左右分别减少了10px。

2. 父元素相对定位, 那绝对定位下的子元素宽高若设为百分比，是相对谁而言的？

    相对于父元素的( content + padding ) 值,  注意不含border

    延伸：如果子元素不是绝对定位，那宽高设为百分比是相对于父元素的宽高，标准盒模型下是content, IE盒模型是content+padding+border。

### 思路二: 利用calc和vw
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        width: 100%;
        height: 100%;
      }

      .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .box {
        margin-left: 10px;
        /* vw是视口的宽度， 1vw代表1%的视口宽度 */
        width: calc(100vw - 20px);
        /* 宽度的一半 */
        height: calc(50vw - 10px);
        position: absolute;
        background: red;
        /* 下面两行让块垂直居中 */
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="box">A</div>
    </div>
  </body>
</html>
```
效果如下:

![](./images/res.gif)

## CSS如何进行品字布局？
### 第一种
```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>品字布局</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      overflow: hidden;
    }
    div {
      margin: auto 0;
      width: 100px;
      height: 100px;
      background: red;
      font-size: 40px;
      line-height: 100px;
      color: #fff;
      text-align: center;
    }

    .div1 {
      margin: 100px auto 0;
    }

    .div2 {
      margin-left: 50%;
      background: green;
      float: left;
      transform: translateX(-100%);
    }

    .div3 {
      background: blue;
      float: left;
      transform: translateX(-100%);
    }
  </style>
</head>

<body>
  <div class="div1">1</div>
  <div class="div2">2</div>
  <div class="div3">3</div>
</body>

</html>
```


解释点:
1. margin 为 三个值时, 第一个值应用于**上边**，第二个值应用于**右边和左边**，第三个则应用于**下边**的外边距。
2. `margin-left:50%`  相对最近块元素的宽度 
3. `transform: translateX(-100%);` 向 左 偏移 元素本身宽度

### 2. 第二种(全屏版) 
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>品字布局</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      div {
        width: 100%;
        height: 100px;
        background: red;
        font-size: 40px;
        line-height: 100px;
        color: #fff;
        text-align: center;
      }

      .div1 {
        margin: 0 auto 0;
      }

      .div2 {
        background: green;
        float: left;
        width: 50%;
      }

      .div3 {
        background: blue;
        float: left;
        width: 50%;
      }
    </style>
  </head>

  <body>
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
  </body>
</html>
```
1. 使用 float 布局, 使得 div 并列一起


## CSS如何进行圣杯布局

圣杯布局如图:

![](./images/show.jpg)

### 1. 利用 flex 布局
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
    *{
      margin: 0;
      padding: 0;
    }
    .header,.footer{
        height:40px;
        width:100%;
        background:red;
    }
    .container{
        display: flex;
    }
    .middle{
        flex: 1;
        background:yellow;
    }
    .left{
        width:200px;
        background:pink;
    }
    .right{
        background: aqua;
        width:300px;
    }
	</style>
</head>
<body>
    <div class="header">这里是头部</div>
    <div class="container">
        <div class="left">左边</div>
        <div class="middle">中间部分</div>
        <div class="right">右边</div>
    </div>
    <div class="footer">这里是底部</div>
</body>
</html>
```

### 2.float布局(全部float:left)
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    .header,
    .footer {
      height: 40px;
      width: 100%;
      background: red;
    }

    .footer {
      clear: both;
    }

    .container {
      padding-left: 200px;
      padding-right: 250px;
    }

    .container div {
      position: relative;
      float: left;
    }

    .middle {
      width: 100%;
      background: yellow;
    }

    .left {
      width: 200px;
      background: pink;
      margin-left: -100%;
      left: -200px;
    }

    .right {
      width: 250px;
      background: aqua;
      margin-left: -250px;
      left: 250px; 
    }
  </style>
</head>

<body>
  <div class="header">这里是头部</div>
  <div class="container">
    <div class="middle">中间部分</div>
    <div class="left">左边</div>
    <div class="right">右边</div>
  </div>
  <div class="footer">这里是底部</div>
</body>

</html>
```
这种float布局是最难理解的，主要是浮动后的负margin操作，这里重点强调一下。

设置负margin和left值之前是这样子:

![](./images/1.jpg)

左边的盒子设置margin-left: -100%是将盒子拉上去，效果:
```css
.left{
  /* ... */
  margin-left: -100%;
}
```

![](./images/2.jpg)

然后向左移动200px来填充空下来的padding-left部分
```css
.left{
  /* ... */
  margin-left: -100%;
  left: -200px;
}
```
效果呈现:

![](./images/3.jpg)

右边的盒子设置margin-left: -250px后，盒子在该行所占空间为0，因此直接到上面的middle块中,效果:
```css
.right{
  /* ... */
  margin-left: -250px;
}
```
![](./images/4.jpg)

然后向右移动250px, 填充父容器的padding-right部分:
```css
.right{
  /* ... */
  margin-left: -250px;
  left: 250px;
}
```
![](./images/show.jpg)

### 3.float布局(左边float: left, 右边float: right)
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    .header,
    .footer {
      height: 40px;
      width: 100%;
      background: red;
    }
    .container{
      overflow: hidden;
    }

    .middle {
      background: yellow;
    }

    .left {
      float: left;
      width: 200px;
      background: pink;
    }

    .right {
      float: right;
      width: 250px;
      background: aqua;
    }
  </style>
</head>

<body>
  <div class="header">这里是头部</div>
  <div class="container">
    <div class="left">左边</div>
    <div class="right">右边</div>
    <div class="middle">中间部分</div>
  </div>
  <div class="footer">这里是底部</div>
</body>

</html>
```
### 4. 绝对定位
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    .header,
    .footer {
      height: 40px;
      width: 100%;
      background: red;
    }
    .container{
      min-height: 1.2em;
      position: relative;
    }

    .container>div {
      position: absolute;
    }

    .middle {
      left: 200px;
      right: 250px;
      background: yellow;
    }

    .left {
      left: 0;
      width: 200px;
      background: pink;
    }

    .right {
      right: 0;
      width: 250px;
      background: aqua;
    }
  </style>
</head>

<body>
  <div class="header">这里是头部</div>
  <div class="container">
    <div class="left">左边</div>
    <div class="right">右边</div>
    <div class="middle">中间部分</div>
  </div>
  <div class="footer">这里是底部</div>
</body>

</html>
```
### 5.grid布局
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    body{
        display: grid;
    }
    #header{
        background: red;
        grid-row:1;
        grid-column:1/5;
    }
        
    #left{
        grid-row:2;
        grid-column:1/2;
        background: orange;
    }
    #right{
        grid-row:2;
        grid-column:4/5;
        background: cadetblue;
    }
    #middle{
        grid-row:2;
        grid-column:2/4;
        background: rebeccapurple
    }
    #footer{
        background: gold;
        grid-row:3;
        grid-column:1/5;
    }
  </style>
</head>

<body>
    <div id="header">header</div>
    <div id="left">left</div>
    <div id="middle">middle</div>
    <div id="right">right</div>     
    <div id="footer">footer</footer></div>
       
</body>

</html>
   
```
看看grid布局，其实也挺简单的吧，里面的参数应该不言而喻了。

另外说一点，到2019年为止，grid现在绝大多数浏览器已经可以兼容了，可以着手使用了。

![](./images/grid.jpg)

当然，还有table布局，年代比较久远了，而且对SEO不友好，知道就可以，这里就不浪费篇幅了。