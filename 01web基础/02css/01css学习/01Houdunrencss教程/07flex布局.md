# 弹性盒子
## 声明定义
容器盒子里面包含着容器元素，使用`display:flex;`或`display:inline-flex`声明为弹性盒子。

**声明块级弹性盒子**
```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  div {
    height: 150px;
    margin-left: 100px;
    margin-top: 100px;
    outline: solid 5px silver;
    display: flex;
    padding: 20px;
  }
  div div {
    outline: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
    line-height: 5em;
    width: 300px;
  }
</style>
...

<div>
  <div>1</div>
	<div>2</div>
	<div>3</div>
</div>
```

**声明内联级弹性盒子**

```html
<style>
  ...
  div {
   	...
    display: inline-flex;
    ...
  }
  ...
</style>
```

## flex-direction
用于控制盒子元素排列的方向

值	|描述
--|--     
row	|从左到右水平排列元素（默认值）
row-reverse	|从右向左排列元素
column	|从上到下垂直排列元素
column-reverse	|从下到上垂直排列元素

**row-reverse**
```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  body {
    margin: 100px;
    font-size: 14px;
    color: #555;
  }
  div {
    width: 500px;
    border: solid 5px silver;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    flex-direction: row-reverse;
  }
  div * {
    border: solid 5px blueviolet;
    padding: 10px;
    margin: 10px;
  }
</style>
...

<div>
	<h4>后盾人</h4>
	<span>hdcms.com</span>
	<p>houdunren.com</p>
</div>
```

**column-reverse**
```css
div {
	...
	flex-direction: column-reverse;
	...
}
```

## flex-wrap
flex-wrap属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。

选项|	说明
--|--
nowrap	|元素不拆行或不拆列（默认值）
wrap	|容器元素在必要的时候拆行或拆列(拆行与拆列跟父元素的宽高有关)。
wrap-reverse	|容器元素在必要的时候拆行或拆列，但是以相反的顺序

**行元素换行**

```html
<style>
	* {
    padding: 0;
    margin: 0;
    outline: solid 1px silver;
    padding: 10px;
    margin: 10px;
  }
  head {
    display: block;
  }
  body {
    font-size: 14px;
    color: #555;
  }
  div {
    width: 500px;
    border: solid 5px silver;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  div div {
    border: solid 5px blueviolet;
    padding: 30px 80px;
    margin: 10px;
    text-align: center;
    font-size: 28px;
  }
</style>
...

<div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

**水平排列反向换行**

```css
...
flex-direction: row;
flex-wrap: wrap-reverse;
...
```

**垂直元素换行**

```css
flex-direction: column;
flex-wrap: wrap;
```

**垂直元素反向换行**

```css
flex-direction: column;
flex-wrap: wrap-reverse;
```

## flex-flow
`flex-flow` 是 `flex-direction` 与 `flex-wrap` 的组合简写模式。
下面是从右向左排列，换行向上拆分行。

```css
flex-flow: row-reverse wrap-reverse;
```

## 轴说明
**水平排列**
下面是使用 `flex-flow: row wrap` 的主轴与交叉轴说明。

![image.png](https://i.loli.net/2020/02/13/lXQi8dknE2fr1Do.png)

下面是使用 `flex-flow: row-reverse wrap-reverse` 的主轴与交叉轴说明。

![image.png](https://i.loli.net/2020/02/13/PfFAycvGL4kdRwM.png)

**垂直排列**
下面是使用 `flex-flow: column wrap` 的主轴与交叉轴说明。

![image.png](https://i.loli.net/2020/02/13/QNxPuCSiXIs7VOY.png)

## justify-content
用于控制元素在**主轴**上的排列方式，再次强调是**主轴**的排列方式。

选项	|说明
--|--
flex-start	|元素紧靠主轴起点
flex-end	|元素紧靠主轴终点
center	|元素从弹性容器中心开始
space-between	|第一个元素靠起点，最后一个元素靠终点，余下元素平均分配空间
space-around	|每个元素两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
space-evenly	|元素间距离平均分配



**水平排列元素，并使用 `justify-content: flex-end` 对齐到主轴终点**

```html
<style>
  * {
    padding: 0;
    margin: 0;
    padding: 10px;
    margin: 10px;
  }
  body {
    font-size: 14px;
    color: #555;
  }
  div {
    border: solid 5px silver;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }
  div div {
    width: 80px;
    border: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
  }
</style>
...

<div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

**使用 `space-evenly` 平均分配容器元素**

```css
...
div {
  border: solid 5px silver;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
...
```


**垂直排列时对齐到主轴终点**



```css
...
div {
  height: 400px;
  border: solid 5px silver;
  box-sizing: border-box;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
}
...
```

## align-items
用于控制容器元素在交叉轴上的排列方式。

选项	|说明
--|--
stretch	|元素被拉伸以适应容器（默认值）
center	|元素位于容器的中心
flex-start	|元素位于容器的交叉轴开头
flex-end	|元素位于容器的交叉轴结尾



**拉伸适应交叉轴** 
```html
<style>
  * {
    padding: 0;
    margin: 0;
    padding: 10px;
    margin: 5px;
  }
  head {
    display: block;
  }
  body {
    font-size: 14px;
    color: #555;
  }
  div {
    height: 200px;
    border: solid 5px silver;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  div div {
    width: 80px;
    border: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
  }
</style>
...

<div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```
**对齐到交叉轴的顶部**
```css
...
flex-direction: row;
align-items: flex-start;
...
```

**对齐到交叉轴底部**

```css
flex-direction: row;
align-items: flex-end;
```

**对齐到交叉轴中心**
```css
flex-direction: row;
align-items: center;
```

**纵向排列时交叉轴排列**

```html
<style>
  * {
    padding: 0;
    margin: 0;
    padding: 10px;
    margin: 5px;
  }
  div {
    height: 400px;
    border: solid 5px silver;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div div {
    height: 50px;
    min-width: 100px;
    border: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
  }
</style>
...

<div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

## align-content
只适用于多行显示的弹性容器，它的作用是当flex容器在交叉轴上有多余的空间时，对元素的对齐处理。
选项	|说明
--|--
stretch	|将空间平均分配给元素
flex-start	|元素紧靠主轴起点
flex-end	|元素紧靠主轴终点
center	|元素从弹性容器中心开始
space-between	|第一个元素靠起点，最后一个元素靠终点，余下元素平均分配空间
space-around	|每个元素两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
space-evenly	|元素间距离平均分配


**水平排列在交叉轴中居中排列**

```html
<style>
  * {
    padding: 0;
    margin: 0;
    padding: 10px;
    margin: 5px;
  }
  div {
    height: 500px;
    border: solid 5px silver;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: center;
  }
  div div {
    width: 90px;
    border: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
  }
</style>
...

<div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

**垂直排列时交叉轴的排列**

```html
<style>
  * {
    padding: 0;
    margin: 0;
    padding: 10px;
    margin: 5px;
  }
  div {
   
  }
  div div {
    min-width: 50px;
    min-height: 80px;
    border: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
  }
</style>
...

<div style="">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

```

## 弹性元素
放在容器盒子中的元素即为容器元素。
- 不能使用float与clear规则
- 弹性元素均为块元素
- 绝对定位的弹性元素不参与弹性布局
## align-self
用于控制单个元素在交叉轴上的排列方式，`align-items` 用于控制容器中所有元素的排列，而 `align-self` 用于控制一个弹性元素的交叉轴排列。

选项	|说明
--|--
stretch	|将空间平均分配给元素
flex-start	|元素紧靠主轴起点
flex-end	|元素紧靠主轴终点
center	|元素从弹性容器中心开始

## flex-grow
用于将弹性盒子的可用空间，分配给弹性元素。可以使用整数或小数声明。

下例中为三个DIV 弹性元素设置了`1、3、6` ，即宽度分成10等份，第三个元素所占宽度为`(宽度/(1+3+6)) X 6`。

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        padding-left: 50px;
        padding-top: 15px;
    }

    div {
        border: solid 5px silver;
        width: 550px;
        height: 100px;
        display: flex;
        flex-direction: row;
    }

    div * {
        flex-grow: 1;
        width: 100px;
        height: 100px;
        background: blueviolet;
        background-clip: content-box;
        padding: 10px;
        box-sizing: border-box;
        font-size: 35px;
        color: white;
    }
</style>
...

<div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

```

如果弹性元素设置了宽度，将把（弹性盒子-弹性元素宽度和）后按照 `flex-grow` 进行分配 。

```html
<style>
  * {
    padding: 0;
    margin: 0;
    padding: 10px;
    margin: 5px;
  }
  div {
    width: 600px;
    position: relative;
    height: 200px;
    border: solid 5px silver;
    display: flex;
  }
  div div {
    min-height: 80px;
    border: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
  }
  div div:nth-of-type(1) {
    width: 100px;
    flex-grow: 1;
  }
  div div:nth-of-type(2) {
    width: 100px;
    flex-grow: 3;
  }
  div div:nth-of-type(3) {
    width: 300px;
    flex-grow: 6;
  }
</style>
```

## flex-shrink
与 `flex-grow` 相反 `flex-shrink` 是在弹性盒子装不下元素时定义的缩小值。

下例在600宽的弹性盒子中放了 1000 宽的弹性元素。并为最后两个元素设置了缩放，最后一个元素的缩放比例为 `500 -( ( (1000-600) / (100X1+400x3+500X6) ) x 3 ) X 500 = 220.9`，计算公式说明如下：

```js
缩小比例 = 不足的空间 / (元素 1 宽度 x 缩小比例) + (元素 2 宽度 x 缩小比例) ...
最终尺寸 = 元素三宽度 - (缩小比例 x  元素 3 的宽度) X 元素宽度
```



```html
<style>
    * {
        padding: 0;
        margin: 0;
    }
    body {
        padding-left: 50px;
        padding-top: 15px;
    }
    div {
        border: solid 5px silver;
        width: 400px;
        height: 120px;
        display: flex;
        padding: 10px;
        box-sizing: content-box;
    }
    div div:nth-child(1) {
        flex-shrink: 0;
    }
    div div:nth-child(2) {
        flex-shrink: 1;
    }
    div div:nth-child(3) {
        flex-shrink: 3;
    }
    div * {
        width: 200px;
        height: 100px;
        overflow: hidden;
        background: blueviolet;
        background-clip: content-box;
        padding: 10px;
        border: solid 1px blueviolet;
        box-sizing: border-box;
        font-size: 30px;
        color: white;
    }
</style>

<div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

```

## flex-basis
flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。

可以是长度单位，也可以是百分比。

**优先级**

flex-basis 优先级大于 width、height。

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  div {
    width: 600px;
    position: relative;
    height: 150px;
    margin-left: 100px;
    margin-top: 100px;
    outline: solid 5px silver;
    display: flex;
    padding: 20px;
  }
  div div {
    outline: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
    line-height: 5em;
  }
  div div:nth-of-type(1) {
    flex-basis: 100px;
    width: 200px;
  }
  div div:nth-of-type(2) {
    flex-basis: 200px;
  }
  div div:nth-of-type(3) {
    flex-basis: 200px;
  }
</style>
...

<div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

## flex
`flex`是`flex-grow、flex-shrink 、flex-basis`缩写组合。
>建议使用 flex 面不要单独使用 flex-grow / flew-shrink / flex-basis 。

下例定义平均分配剩余空间，并不进行尺寸缩小，基础尺寸为200px。

```html
<style>
* {
  padding: 0;
  margin: 0;
}
div {
  width: 600px;
  position: relative;
  height: 150px;
  margin-left: 100px;
  margin-top: 100px;
  outline: solid 5px silver;
  display: flex;
  padding: 20px;
}
div div {
  outline: solid 5px blueviolet;
  text-align: center;
  font-size: 28px;
  line-height: 5em;
  flex: 1 0 100px;
}

</style>
<div>
<div></div>
</div>
```

## order
用于控制弹性元素的位置，默认为 `order:0` 数值越小越在前面，可以负数或整数。

可以通过JS改变`order`数值的大小，来达到动态移动元素的目的。

## 弹性文本
文本节点也在弹性布局操作范围内。
```html
<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100vh;
        align-items: center;
        font-size: 14px;
    }
</style>

<div>
    后盾人
    <span>houdunren</span>
    后盾人
</div>
```

## 绝对定位
绝对定位的弹性元素不参与弹性布局

```html
<style>
  * {
    padding: 0;
    margin: 0;
    padding: 10px;
    margin: 5px;
  }
  div {
    position: relative;
    height: 400px;
    border: solid 5px silver;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
  }
  div div {
    min-width: 50px;
    min-height: 80px;
    border: solid 5px blueviolet;
    text-align: center;
    font-size: 28px;
  }
  div div:nth-of-type(1) {
    position: absolute;
    top: 0;
  }j
</style>
...

<div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
 
```

## 自动空间
在弹性布局中对元素使用`margin-right:auto` 等形式可以自动撑满空间。

下例为第一个ul设置 `margin-right:auto` 表示右侧空间自动撑满，第二个ul靠近父元素右边界。

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .container {
            width: 1200px;
            margin: 0 auto;
        }

        nav {
            display: flex;
            border: solid 1px green;
            margin-top: 20px;
            align-items: center;
            height: 60px;
            box-shadow: 0 0 5px rgba(0, 0, 0, .2);
            background: #f3f3f3;
        }

        ul {
            list-style: none;
        }

        ul:nth-child(1) {
            display: flex;
            align-items: center;
            margin-right: auto;
        }

        ul:nth-child(1)>li {
            margin: 0 10px;
        }

        ul:nth-child(2)>li {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #9b59b6;
        }
    </style>
</head>

<body>
    <div class="container">
        <nav>
            <ul>
                <li>houdunren</li>
                <li>视频教程</li>
                <li>每晚直播</li>
                <li>在线文档</li>
            </ul>
            <ul>
                <li>
                </li>
            </ul>
        </nav>
    </div>
</body>
```