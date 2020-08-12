# 栅格介绍
## 名词解释
CSS 网格布局(Grid Layout) 是CSS中最强大的布局系统。 这是一个二维系统，这意味着它可以同时处理列和行。

栅格系统与FLEX弹性布局有相似之处理，都是由父容器包含多个项目元素的使用

**兼容性**

![image.png](https://i.loli.net/2020/02/14/It6JMkNwbeLOhjr.png)

# 声明容器

## 块级容器
后盾人
<article style="width:400px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:50% 50%;grid-template-columns:25% 25% 25% 25%">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
</article>
<br/>

```html
<style>
    * {
       e padding: 0;
        margin: 0;
    }

    body {
        padding: 200px;
    }

    article {
        width: 400px;
        height: 200px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: 50% 50%;
        grid-template-columns: 25% 25% 25% 25%;
    }

    article div {
        background: blueviolet;
        background-clip: content-box;
       e padding: 10px;
        border: solid 1px #ddd;
    }
</style>

后盾人
<article>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</article>

```

## 行级容器
后盾人
<iframe>
<article style="width:400px;height:200px;border:solid 5px silver;display:inline-grid;grid-template-rows:50% 50%;grid-template-columns:25% 25% 25% 25%">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd"></div>
</article>
<br/>
</iframe>

## 划分行列
栅格有点类似表格，也 `行` 和 `列`。使用 `grid-template-columns` 规则可划分列数，使用 `grid-template-rows` 划分行数。

## 固定宽度
下面是使用固定宽度划分两行三列的的示例，当容器宽度过大时将漏白。
<iframe>
<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:100px 100px;grid-template-columns:100px 100px 100px;overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article>
<br/>
</iframe>

```html
<style>
	* {
    padeding: 0;
    margin: 0;
  }
  body {
    padeding: 200px;
  }
  article {
    width: 300px;
    height: 200px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: 100px 100px;
    grid-template-columns: 100px 100px 100px;
  }
  article div {
    background: blueviolet;
    background-clip: content-box;
    padeding: 10px;
    border: solid 1px #ddd;
  }

</style>
<article>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</article>
```

**百分比**
可以使用使用百分比自动适就容器。
<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:50% 50%;grid-template-columns:25% 25% 25% 25%;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article>
<br/>
```css
display: grid;
grid-template-rows: 50% 50%;
grid-template-columns: 25% 25% 25% 25%;
```

**重复设置**
使用 `repeat` 统一设置值，第一个参数为重复数量，第二个参数是重复值

<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:repeat(2,50%);grid-template-columns:repeat(2,50%);overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>

```css
grid-template-rows: repeat(2, 50%);
grid-template-columns: repeat(2, 50%);
```
**可以设置多个值来定义重复，下面定义了四列，以 100%、20px 重复排列。**

<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:repeat(2,50%);grid-template-columns:repeat(2,100px 50px);overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>


```css
display: grid;
grid-template-rows: repeat(2, 50%);
grid-template-columns: repeat(2, 100px 50px);
```

## 自动填充
自动填充是根据容器尺寸，自动设置元素尺寸。

<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:repeat(auto-fill,100px);grid-template-columns:repeat(auto-fill,100px);overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>


```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(auto-fill, 100px);
grid-template-columns: repeat(auto-fill, 100px);
```

## 比例划分
使用 `fr` 单位设置元素在空间中所占的比例，下面按1份-2份 分成两组共四列。

**单位组合**
<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:1fr 2fr;grid-template-columns:100px  1fr 2fr;overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: 1fr 2fr;
grid-template-columns: 100px 1fr 2fr;
```

**重复定义**
<article style="width:300px;height:100px;border:solid 5px silver;display:grid;grid-template-rows:repeat(1fr 2fr);grid-template-columns:repeat(2,1fr 2fr);overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
     <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
<div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>

```css
width: 300px;
height: 100px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(2, 1fr 2fr);
```

**组合定义**
`grid-tempalte` 是 `grid-template-rows、grid-template-columns、grid-template-areas` 的三个属性的简写。

下面是使用 `grid-template` 同时声明 `grid-template-rows、grid-template-columns`。
```css
grid-template: 100px 1fr / 50px 1fr;
```
**minmax**
使用 minmax 方法可以设置取值范围，下列在行高在 最小100px ~ 最大1fr 间取值。
<article style="width:300px;height:300px;border:solid 5px silver;display:grid;grid-template-rows:100px minmax(100px,1fr);grid-template-columns:100px 1fr;overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>

```CSS
width: 300px;
height: 300px;
display: grid;
grid-template-rows: 100px minmax(100px, 1fr);
grid-template-columns: 100px 1fr;
```

## 间距定义
### 行间距
使用 `row-gap` 设置行间距。
<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:repeat(2,1fr);grid-template-columns:repeat(3,1fr);row-gap:30px;overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(3, 1fr);
row-gap: 30px;
```

### 列间距
使用 `column-gap` 定义列间距。
<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:repeat(2,1fr);grid-template-columns:repeat(3,1fr);column-gap:20px;overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(3, 1fr);
column-gap: 20px;
```

### 组合定义
使用 `gap` 规则可以一次定义行、列间距，如果间距一样可以只设置一个值。

**设置行列间距为20px与10px**
<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:repeat(2,1fr);grid-template-columns:repeat(3,1fr);gap:20px 10px;overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>


```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(3, 1fr);
gap: 20px 10px;
```

**统一设置行列间距为20px**
<article style="width:300px;height:200px;border:solid 5px silver;display:grid;grid-template-rows:repeat(2,1fr);grid-template-columns:repeat(3,1fr);gap:20px;overflow:hidden;">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px #ddd;"></div>
</article> <br/>
<br/>
```css
gap: 20px;
```

# 栅格命名
栅格线可以使用命名与编号找到，方便控制指定栅格，或将内容添加到指定栅格中。

![image.png](https://i.loli.net/2020/02/14/RJlAoc49BP3WmQv.png)

## 独立命名
可以为每个栅格独立命名来进行调用。


<article style="margin:0 auto;width:300px;height:300px;border:solid 5px silver;display:grid; grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-start c3-start] 100px [c3-end];;">
	<div style="background:blueviolet;background-clip:content-box;border:solid 1px blueviolet;padding:10px;box-sizing:border-box;color:white;grid-row-start:r2-start;grid-column-start:c1-end;grid-row-end:r2-end;grid-column-end:c3-start;">后盾人</div>
</article>
<br/>

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        padding-top: 50px;
    }

    article {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];

        grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-start c3-start] 100px [c3-end];
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
    }

    div:first-child {
        grid-row-start: r2-start;
        grid-column-start: c1-end;
        grid-row-end: r2-end;
        grid-column-end: c3-start;
    }
</style>
...

<article>
	<div>后盾人</div>
</article>

```
## 自动命名
对于重复设置的栅格系统会自动命名，使用时使用 `c 1、c 2` 的方式定位栅格。
<article style="margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: repeat(3, [r-start] 100px [r-end]);
        grid-template-columns: repeat(3, [c-start] 100px [c-end]);">
	<div style="grid-row-start: r-start 2;
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
        grid-column-start: c-start 2;
        grid-row-end: r-start 2;
        grid-column-end: c-end 2;
    ">houdunren</div>
</article>
<br/>

```html
<style>
    article {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: repeat(3, [r-start] 100px [r-end]);
        grid-template-columns: repeat(3, [c-start] 100px [c-end]);
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
    }

    div:first-child {
        grid-row-start: r-start 2;
        grid-column-start: c-start 2;
        grid-row-end: r-start 2;
        grid-column-end: c-end 2;
    }
</style>
...

<article>
	<div>houdunren</div>
</article>

```

## 元素定位
选项 |	说明
--|--
grid-row-start	|行开始栅格线
grid-row-end	|行结束栅格线
grid-column-start	|列开始栅格线
grid-column-end	|列结束栅格线

### 根据栅格线
通过设置具体的第几条栅格线来设置区域位置，设置的数值可以是正数和负数。

<article style="border:solid 5px blueviolet;width:400px;height:400px;display:grid;grid-template-rows:repeat(4,1fr);grid-template-columns:repeat(4,1fr);">
    <div style="background:blueviolet;grid-row-start: 2;   grid-row-end: 4; grid-column-start: 2;grid-column-end: 4;display:flex;justify-content:center;border:solid 5px blueviolet;align-items:center;font-size:35px;color:white;">后盾人</div>
</article>

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        padding-left: 200px;
        padding-top: 200px;
    }

    article {
        border: solid 5px blueviolet;
        width: 400px;
        height: 400px;
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(4, 1fr);
    }

    article div {
        background: blueviolet;
        grid-row-start: 2;
        grid-row-end: 4;
        grid-column-start: 2;
        grid-column-end: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;
        color: white;
    }
</style>
...

<article>
    <div>后盾人</div>
</article>

```
### 根据栅格命名


<article style="margin:0 auto;width:300px;height:300px;border:solid 5px silver;display:grid;grid-template-rows:[r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];  grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-start c3-start] 100px [c3-end];">
	<div style="grid-row-start;grid-column-start:c2-start;grid-row-end:r3-start;grid-column-end:c3-start;background:blueviolet;background-clip:content-box;border:solid 1px blueviolet;padding:10px;box-sizing:border-box;">houdunren</div>
</article>
<br/>




```html
<style>
    article {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];
        grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-start c3-start] 100px [c3-end];

    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
    }

    div:first-child {
        grid-row-start: r1-end;
        grid-column-start: c2-start;
        grid-row-end: r3-start;
        grid-column-end: c3-start;
    }
</style>
...

<article>
	<div>houdunren</div>
</article>

```


### 根据自动命名
对于重复设置的栅格系统会自动命名，使用时使用 c 1、c 2 的方式定位栅格。

<article style="margin:0 auto;width:300px;height:300px;border:solid 5px silver;display:grid;grid-template-rows:repeat(3,[r-start] 100px [r-end]);grid-template-columns:repeat(3,[c-start] 100px [c-end]);">
	<div style="grid-row-start:r-start 2;grid-column-start:c-start 2;grid-row-end:r-start 2;grid-column-end:c-end 2;background:blueviolet;background-clip:content-box;border:solid 1px blueviolet;padding:10px;box-sizing:border-box;color:white;">houdunren</div>
</article>

```html
<style>
    article {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: repeat(3, [r-start] 100px [r-end]);
        grid-template-columns: repeat(3, [c-start] 100px [c-end]);
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
    }

    div:first-child {
        grid-row-start: r-start 2;
        grid-column-start: c-start 2;
        grid-row-end: r-start 2;
        grid-column-end: c-end 2;
    }
</style>
...

<article>
	<div>houdunren</div>
</article>

```

### 根据偏移量
使用 `span` 可以设置移动单元格数量，数值只能为正数。
- \[ ] 设置在 grid-\*-end 表示 grid-\*-end 栅格线是从 grid-\*-start 移动几个单元格
- \[ ] 设置在 grid-\*-start 表示 grid-\*-start 栅格线是从 grid-\*-end 移动几个单元格

为 grid-*-end 设置栅格线

<article style="margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);">
	<div style="grid-row-start:2;grid-column-start:2;grid-row-end: span 1;grid-column-end: span 1;background:blueviolet;background-clip:content-box;border:solid 1px blueviolet;padding:10px;box-sizing:border-box;color:white;font-size:25px;"></div>
</article>
<br/><br/>
```html
<style>
    article {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
        font-size: 25px;
    }

    div:first-child {
        grid-row-start: 2;
        grid-column-start: 2;
        grid-row-end: span 1;
        grid-column-end: span 1;
    }
</style>
...

<article>
	<div></div>
</article>
```

### 简写模式
可以使用 `grid-row` 设置行开始栅格线，使用 `grid-column` 设置结束栅格线。


上例中的居中对齐元素，可以使用以下简写的方式声明（推荐）。
```css
grid-row: 2/4;
grid-column: 2/4;
```

### grid-area
grid-area更加简洁是同时对 grid-row 与 grid-column 属性的组合声明。

语法结构如下：
```css
grid-row-start/grid-column-start/grid-row-end/grid-column-end
```

下面是将元素定位在中间的示例。

<article style="width:200px;height:200px;display:grid;border:solid 5px blueviolet;grid-template:repeat(3,1fr)/repeat(3,3fr);">
    <div style="grid-area:2/2/3/3;background:#e67e22;"></div>
</article>
<br/>
```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template: repeat(3, 1fr)/repeat(3, 1fr);
    }

    header {
        grid-area: 2/2/3/3;
        background: #e67e22;
    }
</style>

<body>
    <header></header>
</body>
```

## 元素附加
通过 `grid-area` 属性可以将元素放在指定区域中。`grid-area`由`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end` 的简写模式。

###  编号附加

下例中将元素放在容器的中心位置中的栅格中。
<article style="margin:0 auto;width:400px;height:400px;border:solid 5px silver;display:grid;grid-template-rows:repeat(4,100px);grid-template-columns:repeat(4,100px);">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px blueviolet;font-size:30px;color:white;grid-area:2/2/4/4;">1</div>
</article>

<br/>

```html
<style>
    article {
        margin: 0 auto;
        width: 400px;
        height: 400px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: repeat(4, 100px);
        grid-template-columns: repeat(4, 100px);
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        padding: 10px;
        border: solid 1px blueviolet;
        font-size: 30px;
        color: white;
    }

    article div:first-child {
        grid-area: 2/2/4/4;
    }
</style>
...

<article class="container">
    <div>1</div>
</article>
```

### 命名附加
同样是上面的例子可以使用栅格线命名来附加元素
<article style="margin:0 auto;width:400px;height:400px;border:solid 5px silver;display:grid;grid-template-rows:repeat(auto-fill,[r] 100px);grid-template-columns:repeat(auto-fill,[l] 100px);">
    <div style="background:blueviolet;background-clip:content-box;padding:10px;border:solid 1px blueviolet;font-size:30px;color:white;grid-area:r 2/l 2/r 4/l 4;">1</div>
</article>
<br/>

```css
article {
    margin: 0 auto;
    width: 400px;
    height: 400px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: repeat(auto-fill, [r] 100px);
    grid-template-columns: repeat(auto-fill, [l] 100px);
}

article div {
    background: blueviolet;
    background-clip: content-box;
    padding: 10px;
    border: solid 1px blueviolet;
    font-size: 30px;
    color: white;
}
article div:first-child {
		grid-area: r 2/l 2/r 4/l 4;
}
```

## 区域声明
区域是由多个单元格构成，使用 `grid-template-areas`可以定义栅格区域，并且栅格区域必须是矩形的。

### 区域布局
下面是使用栅格区域布局移动端页面结构
<style>
    #divGrid{
        width: 90vw;
        height: 100vh;
        display: grid;
        border:solid 5px silver;
        grid-template-rows: 80px 1fr 50px;
        grid-template-columns: 100px 1fr 50px 60px;
        grid-template-areas: "header header header header"
            "nav main main aside"
            "footer footer footer footer";
    }
</style>
<div id="divGrid">
    <header style="background:#2EC56C;grid-area:header;"></header>
    <nav style="background:#E1732C;grid-area:nav;"></nav>
    <main style="grid-area:main;background:#E9EEEF"></main>
    <aside style="grid-area:aside;background:#EEBC31;"></aside>
    <footer style="grid-area:footer;background:#904FA9;"></footer>
</div>
<br/>
```html
<style>
    body {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-rows: 80px 1fr 50px;
        grid-template-columns: 100px 1fr 50px 60px;
        grid-template-areas: "header header header header"
            "nav main main aside"
            "footer footer footer footer";
    }

    main {
    		/* 完整的写法，推荐使用下面的简写方式*/
				/* grid-area: main-start/main-start/main-end/main-end; */
        grid-area: main;
        background: #E9EEEF;
    }

    header {
        background: #2EC56C;
        grid-area: header;
    }

    nav {
        background: #E1732C;
        grid-area: nav;
    }

    aside {
        grid-area: aside;
        background: #EEBC31;
    }

    footer {
        grid-area: footer;
        background: #904FA9;
    }
</style>
...

<body>
    <header></header>
    <nav></nav>
    <main></main>
    <aside></aside>
    <footer></footer>
</body>
```


### 区域命名
系统会为区域自动命名，上例中的会产生 `header-start` 水平与垂直同名的起始区域与 `header-end`水平与垂直同名的区域终止。

![image.png](https://i.loli.net/2020/02/16/cBqnIFN6Py9wrZV.png)

**下面使用区域命名部署的效果**
<style>
    #articleGrid1{
          width: 90vw;
        height: 100vh;
        display: grid;
        grid-template-rows: 80px 1fr 50px;
        grid-template-columns: 80 1fr;
        grid-template-areas: "header header header"
            "nav main main"
            "footer footer footer";
    }
</style>

<article id="articleGrid1" >
	<div style=" background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
        font-size: 25px;grid-area:header-start/nav-start/main-end/mian-end;"></div>
	<div style=" background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
        font-size: 25px; grid-area: footer-start/footer-start/footer-end/footer-en;"></div>
</article>
<br/>

```html
<style>
    article {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-rows: 80px 1fr 50px;
        grid-template-columns: 80 1fr;
        grid-template-areas: "header header header"
            "nav main main"
            "footer footer footer";
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
        font-size: 25px;
    }

    div:nth-child(1) {
        grid-area: header-start/nav-start/main-end/main-end;
    }

    div:nth-child(2) {
        grid-area: footer-start/footer-start/footer-end/footer-end;
    }
</style>
...

<article>
	<div></div>
	<div></div>
</article>

```

### 区域占位
使用一个或多个 `.` 定义区域占位。

<style>
    #articleGrid2 {
        width: 90vw;
        height: 50vh;
        display: grid;
        border:solid 5px silver;
        grid-template-rows: repeat(3, 33.3%);
        grid-template-columns: repeat(3, 33.3%);
        grid-template-areas: "top . ."
            "top . ."
            "bottom bottom bottom";
    }

</style>

<article id="articleGrid2">
    <div style=" background: blueviolet;
        grid-area: top;
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;">
        houdunren.com
    </div>
    <div style=" background: orange;
        grid-area: bottom;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;">
        后盾人
    </div>
</article>
<br/>
```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    article {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-rows: repeat(3, 33.3%);
        grid-template-columns: repeat(3, 33.3%);
        grid-template-areas: "top . ."
            "top . ."
            "bottom bottom bottom";
    }

    .top {
        background: blueviolet;
        grid-area: top;
        font-size: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .bottom {
        background: orange;
        grid-area: bottom;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;
    }
</style>
...

<article>
    <div class="top">
        houdunren.com
    </div>
    <div class="bottom">
        后盾人
    </div>
</article>
```

## 栅格流动
在容器中设置`grid-auto-flow` 属性可以改变单元流动方式。
选项	|说明
--|--
column	|按列排序
row	|按行排列

### 基本使用
下例将单元按列排序流动


<article style="width:400px;height:400px;display:grid;grid-template-rows:repeat(2,1fr);grid-template-columns:repeat(2,1fr);border:solid 5px silver;grid-auto-flow:column;">
    <div style=" background: blueviolet;
      background-clip: content-box;
      border:solid 1px blueviolet;
      padding: 10px;
      font-size: 35px;
      color: white;">1</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">2</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">3</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">4</div>
</article>



```html
<style>
  article {
      width: 400px;
      height: 400px;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(2, 1fr);
      border: solid 5px silver;
      grid-auto-flow: column;
  }

  div {
      background: blueviolet;
      background-clip: content-box;
      padding: 10px;
      font-size: 35px;
      color: white;
  }
</style>
...

<article>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
</article>

```

### 强制填充
当元素在栅格中放不下时，将会发生换行产生留白，使用`grid-auto-flow: row dense;` 可以执行填充空白区域操作。
<article style=" width: 400px;
        height: 400px;
        display: grid;
        grid-template-rows: repeat(3, 100px);
        grid-template-columns: repeat(3, 100px);
        border: solid 5px silver;
        grid-auto-flow: row dense;">
    <div style="background: blueviolet;
        background-clip: content-box;
        grid-column: 1/span 2;
        background: #000;
        padding: 10px;
        font-size: 35px;
        color: white;">1</div>
    <div style="background: blueviolet;
        background-clip: content-box;
        padding: 10px;
        grid-column: 2/span 1;
        font-size: 35px;
        color: white;">2</div>
    <div style="background: blueviolet;
        background-clip: content-box;
        padding: 10px;
        font-size: 35px;
        color: white;">3</div>
    <div style="background: blueviolet;
        background-clip: content-box;
        padding: 10px;
        font-size: 35px;
        color: white;">4</div>
</article>
<br/>

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        padding-left: 200px;
        padding-top: 200px;
    }

    article {
        width: 600px;
        height: 600px;
        display: grid;
        grid-template-rows: repeat(3, 200px);
        grid-template-columns: repeat(3, 200px);
        border: solid 5px silver;
        grid-auto-flow: row dense;
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        padding: 10px;
        font-size: 35px;
        color: white;
    }

    article div:nth-child(1) {
        grid-column: 1/span 2;
        background: #000;
    }

    article div:nth-child(2) {
        grid-column: 2/span 1;
    }
</style>
...

<article>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
</article>

```

## 栅格对齐
可以通过属性方便的定义栅格的对齐方式，可用值包括 `start | end | center | stretch | space-between | space-evenly | space-around`。

选项	|说明|	对象
--|--|--
align-items|	栅格内所有元素的垂直排列方式	|栅格容器
justify-items|	栅格内所有元素的横向排列方式	|栅格容器
justify-content|	所有栅格在容器中的水平对齐方式，容器有额外空间时	|栅格容器
align-content	|所有栅格在容器中的垂直对齐方式，容器有额外空间时	|栅格容器
align-self	|元素在栅格中垂直对齐方式	|栅格元素
justify-self|	元素在栅格中水平对齐方式	|栅格元素

### 平均分布

<article style="border: solid 5px silver;
width: 400px;
height: 400px;
display: grid;
grid-template-columns:100px 100px;
grid-template-rows: 100px 100px;
justify-content: space-between;
align-content: space-evenly;">
    <div style=" background: blueviolet;
      background-clip: content-box;
      border:solid 1px blueviolet;
      padding: 10px;
      font-size: 35px;
      color: white;">1</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">2</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">3</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">4</div>
</article>
<br/><br/>

```css
border: solid 5px silver;
width: 600px;
height: 600px;
display: grid;
grid-template-columns: 200px 200px;
grid-template-rows: 200px 200px;
justify-content: space-between;
align-content: space-evenly;
```

### 元素对齐
用于控制所有元素的对齐方式

<article style="margin: 0 auto;
border: solid 1px silver;
width: 400px;
height: 100px;
display: grid;
grid-template-columns: repeat(4, 100px);
justify-items: center;
align-items: center;
">
    <div style=" background: blueviolet;
      background-clip: content-box;
      border:solid 1px blueviolet;
      padding: 10px;
      font-size: 35px;
      color: white;">1</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">2</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">3</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">4</div>
</article>
<br/><br/>

```css
margin: 0 auto;
border: solid 1px silver;
width: 400px;
height: 100px;
display: grid;
grid-template-columns: repeat(4, 100px);
justify-items: center;
align-items: center;
```
### 元素独立控制
控制单个元素的对齐方式


<article style="margin: 0 auto;
border: solid 1px silver;
width: 400px;
height: 100px;
display: grid;
grid-template-columns: repeat(4, 100px);
justify-items: center;
align-items: center;
">
    <div style=" background: blueviolet;
      background-clip: content-box;
      border:solid 1px blueviolet;
      padding: 10px;
      justify-self:end;
      align-self:center;
      font-size: 35px;
      color: white;">1</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">2</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
      color: white;">3</div>
    <div style=" background: blueviolet;
      background-clip: content-box;
      padding: 10px; border:solid 1px blueviolet;
      font-size: 35px;
       justify-self: start;
       align-self: center;
      color: white;">4</div>
</article>
<br/><br/>

### 组合简写

**pace-content**
用于控制栅格的对齐方式，语法如下：
```css
place-content: <align-content> <justify-content>
```
**place-items**
控制所有元素的对齐方式，语法结构如下：
```css
place-items: <align-items> <justify-items>
```

**place-self**
控制单个元素的对齐方式:
```css
place-self: <align-self> <justify-self>
```