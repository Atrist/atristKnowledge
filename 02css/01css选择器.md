# 选择器
- [网址](https://www.w3school.com.cn/cssref/css_selectors.asp)

# css选择的分类
## 基本选择器

选择器 | 例子  |  例子描述 
--- | --- | ---|---
`.class` | .intro | 选择 class="intro" 的所有元素。
`#id` | #firstname |	选择 id="firstname" 的所有元素。	
`*`|	*|	选择所有元素。	
`element` |	p	|选择所有 p 元素。	 
`element,element` | div,p | 选择所有div元素和所有p元素
`element element` | div p | 选择div元素内部的所有p元素
`element>element` | div>p | 选择父元素为div的所有p元素
`element+element` | div+p | 选择紧接在div元素之后的所有元素


### 标签选择器
使用 *  可为所有元素设置样式
```css
*{
    text-decoration：none;
    color:#6c757d;
}
```
根据标签为元素设置样式
```css
h1{
    color:red;
}
```
同时设置多个元素组合
```css
h1,h2{
    color:red;
}
```
元素在多个组件中存在
```css
h1,h2{
    color:red;
}
h1,h3{
    backgroud:#dcdcdc;
}
```

### 类选择器
类选择器是为了一类状态规则声明样式规则,下面是把文本居中定义为类样式
```css
.text-center{
    text-align:center;
}
```
```html
<h1 class="text-center">文本居中</h1>
<h2 class="text-center">文本居中</h2>
```
将类选择器指定为具体标签
```css
.help-block{
    backgroud:red;
}
span.help-block{
    font-size:12px;
    color:#aaa;
    backgroud:none;
}
```
```html
<span class="help-block">感谢访问</span>
```
### ID选择器
为有id属性的元素设置样式
```css
#container{
    backgroud:red;
}
```
```html
<h1 id="container">背景颜色为红色</h1>
```

## 结构选择器
选择器 | 例子  |  例子描述 
--- | --- |---|---
`element element` | div p | 选择div元素内部的所有p元素
`element>element` | div>p | 选择父元素为div的所有p元素
`element+element` | div+p | 选择紧接在div元素之后的p元素
`element1~element2` | p~ul | 选择前面有p元素的每个ul元素

### 后代选择器
HTML中元素是以父子级、兄弟关系存在的。后代选择器指元素后的元素(不只是子元素，是后代元素)。
```html
<style>
main article h2,main h1{
    color:green;
}
</style>
<main>
<article>
        <h2>atrist</h2>   <!--变绿色-->
        <aside>
            <h2>atrist.cn</h2> <!--变绿色-->
        </aside>
</article>
 <h2>atrist</h2>
 <h1 >atrist.cn</h1>        <!--变绿色-->
</main>
```
### 子元素选择器
子元素选择器中选择子元素，不包括孙级及以下元素
```html
<style>
main article>h2{
    color:green
}
</style>
<main>
	<article>
		<h2>atrist1</h2>  <!--变绿色-->
		<aside>
			<h2>atrist2</h2>
		</aside>
	</article>
	<h2>atrist3</h2>
	<h1>atrist4</h1>
</main>
```
### 紧邻兄弟元素 
用于选择紧挨着的同级兄弟元素
```html
<style>
main article+h2{
    color:green;
}
</style>
<main>
    <article>          
		<h2 >atrist1</h2>
		<aside>
			<h2>atrist2</h2>
		</aside>
	</article>
	<h2 >atrist3</h2>   <!--变绿色-->
	<h1>atrist4</h1>   
</main>
```
### 后面兄弟元素
用于选择后面的所有兄弟元素
```html
<style>
main article~* {
    color: green;
}
</style>
<main>
    <article>
        <h2>atrist1</h2>
        <aside>
            <h2>atrist2</h2>
        </aside>
    </article>
    <h2>atrist3</h2>    <!--变绿色-->
    <h1>atrist4</h1>    <!--变绿色-->
</main>
```
## 属性选择器
根据属性来为元素设置样式也是常用的场景
选择器 | 示例 | 描述
---|---|---
`[attribute]` | [target]| 选择带有target属性所有元素
`[attribute=value]`| [title=flower] | 选择title属性为"flower"的所有元素
`[attribute~=value]` | [title~=flower] | 选择title属性包含flower单词的所有元素
`[attribute|=value]` | [lang|=en] | 选择lang属性以"en"开头的元素
`[attribute*=value]`| a[src*="abc"] | 选择其src属性中包含"abc"子串的每个`<a>`元素
`[attribute^=value]` | a[src^="https"] | 选择其src属性以"https"开头的所有`<a>`元素
`[attribute$=value]` | a[src$=".pdf"] | 选择其src属性以".pdf"结尾的所有`<a>`元素

### 为具有`class`属性的h1标签设置样式
```html
<style>
h1[class]{
    color:red;
}
</style>
<h1 class="container">红色</h1>
```
### 约束多个属性
```html
h1[class][id]{
    color:red;
}
<h1 class="container" id >多个属性红色</h1>
```
### 具体属性值设置样式
```html
<style>
a[href="http://www.baidu.com"]{
    color:blue;
}
</style>
<a href="http://www.baidu.com">百度</a>
<a>链接</a>
```

### 以指定值开头的元素
```html
<style>
h2[name^="Atrist"]{
    color:blue;
}
</style>
<h2 name="Atrist">Atrist</h2>
<h2 name="AtrCom">AtrCom</h2>
```
### 以指定值结束的元素
```html
<style>
h2[name$="Com"]{
    color:blue;
}
</style>
<h2 name="Atrist">Atrist</h2>
<h2 name="AtrCom">AtrCom</h2>
```
### 属性内部任何位置出现值的元素
```html
<style>
h2[name*="com"]{
    color:red;
}
</style>
<h2 name="com">com</h2>
<h2 name="Acvcom">com</h2>
<h2 name="AcomADS">com</h2>
```
### 属性包含指定词汇的元素
```html
<style>
h2[name~="artist"]{
    color:red;
}
</style>
<h2 name="artist art">com红色</h2>
<h2 name="artistm m">com没有变化</h2>
<h2 name="AcomADS">com没有变化</h2>
```

### 以指定值开头或以属性连接破折号的元素
```html
<style>
h2[name|="aaaa"] {
    color: red;
}
</style>

<h2 name="aaaa">houdunren.com</h2>
<h2 name="aaaa-web">hdcms.com</h2>
```

## 伪类选择器
为元素的不同状态或不确定存在的元素设置样式规则

状态 | 示例 | 说明
---|---|---
:link|a:link|选择所有未被访问的链接
:visited| a:visited|选择所有已被访问的链接
:hover|a:hover|鼠标移动在元素上时
:active|a:active|点击正在发生时
:focus|input:focus|选择获得焦点的input元素
:root|:root|选择文档的根元素即HTML
:empty|p:empty|选择没有子元素的每个元素(包括文本节点)
:first-child|p:first-child|选择属于父元素的第一个子元素的每个元素
:last-child|p:last-child|选择属于其父元的最后一个子元素的每个元素
:first-of-type|p:first-of-type|选择属于其父元素的首个元素的每个元素
:last-of-type| p:last-of-type|选择属于其父元素的最后个元素的每个元素
:only-of-type|p:only-of-type|选择属于其父元素唯一的元素的每个元素
:only-child|p:only-child|选择属于其父元素的唯一子元素的每个元素
:nth-child(n)|p:nth-child(2)|选择属于其父元素的第二个子元素的每个元素
:nth-child(odd)|p:nth-child(odd)|选择属于其父元素的奇数元素
:nth-child(even)|p:nth-child(even)|选择属于其父亲的偶数元素
:nth-of-type(n)|p:nth-of-type(2)|选择属于其父元素的第二个元素的每个元素
:nth-last-child(n)|p:nth-last-child(2)|选择属于其父元素的倒数第二个元素的每个元素
:nth-last-of-type(n)|p:nth-last-of-type(2)|选择属于其父元素的倒数第二个元素的每个元素

### 超链接伪类
定义链接的不同状态
```html
a:link {
    color: red
}

a:visited {
    color: green
}

a:hover {
    color: blue
}

a:active {
    color: yellow
}
...

<a href="https://www.atrist.com">Atrist</a>
```
不只是链接可以使用伪类，其他元素也可以使用。下面是对表单的点击与获取焦点状态的样式设置
```html
a:link {
    color: red
}

a:visited {
    color: green
}

a:hover {
    color: blue
}

a:active {
    color: yellow
}
...

<a href="https://www.atrist.com">Atrist</a>
```
### :target
用于控制具有锚点目标元素的样式
```html
div{
    height:900px;

}

<a href="#atrst">atrist</a>
<div></div>
<div id="atrist">
	后台内容管理系统
</div>
```

### :root
根元素选择伪类即选择html
```tml
:root{
    font-size:100px;
}
```

### :empty
没有内容和空白的元素。下面第一个p标签会产生样式，第二个不会因为有空白内容
```html
:empty {
    border: solid 2px red;
}


<p></p>
<p> </p>
```

### 结构伪类
下面来通过结构伪类选择器选择树状结构中的标签元素
### :first-child
选择元素中`span`标签并且是第一个
```html
article span:first-child {
    color: red;
}
...

<article>
	<span>atrist</span>
	<aside>
		<span>atrist.com</span>
		<span>com.atrist</span>
	</aside>
</article>
```

### :first-of-type
选择类型是`span`的第一个元素
```html
article span:first-of-type {
    color: red;
}
...

<article>
	<span>atrist.com</span>
	<aside>
		<strong>com</strong>
		<span>atrist</span>
	</aside>
</article>
```
### :last-child
选择元素中`span`标签并且是最后一个
```html
article span:last-child {
    color: red;
}
<article>
  <span>atrist.com</span>
  <aside>
    <strong>atrist.com</span>
  </aside>
  <span>atrist.com</span>
</article>
```
### :last-of-type
选择类型为`span`的最后一个元素
```html
article span:last-of-type {
    color: red;
}
...

<article>
  <span>atrist.com</span>
  <aside>
  	<span>atrist.com</span>
  	<strong>atrist.com</strong>
  </aside>
  <span>atrist.com</span>
</article>
```
### :only-child
选择是唯一子元素的`span`标签
```html
article span:only-child {
    color: red;
}
...

<article>
	<span>houdunren.com</span>
	<aside>
		<span>houdunwang.com</span>
	</aside>
</article>
```
### :only-of-type

```html
<style>
article span:only-of-type {
    color: red;
}
</style>

<article>
	<span>atrist.com</span>
	<aside>
		<span>atrist.com</span>
		<span>atrist.com</span>
	</aside>
</article>
```
### nth-child(n)
选择第二个元素并且是span标签的
```html
article span:nth-child(2) {
    color: red;
}
...

<article>
  <span>houdunren.com</span>
  <aside>
    <span>houdunwang.com</span>
    <span>hdcms.com</span>
  </aside>
  <span>hdphp.com</span>
</article>
```
### nth-of-type(n)
选择第二个`span`元素，不管中间的其他元素
```html
article span:nth-of-child(2) {
    color: red;
}

<article>
  <span>Atrist.com</span>
  <aside>
    <span>Atrist</span>
    <span>Atrist</span>
  </aside>
  <span>Atrist</span>
</article>
```
### 计算数量
n为0/1/2/3……,下面是隔列变色
```html
table tr>td:nth-child(2n+1) {
    background: green;
    color: white;
}
<table border="1">
  <tr>
    <td>houdunren.com</td>
    <td>hdcms.com</td>
    <td>后盾人</td>
    <td>houdunwang.com</td>
    <td>hdcms</td>
  </tr>
</table>
```
从第三个开始设置样式
```html
<style>
table tr>td:nth-child(n+3) {
    background: rgb(128, 35, 2);
    color: white;
}
</style>
<table border="1">
  <tr>
    <td>houdunren.com</td>
    <td>hdcms.com</td>
    <td>后盾人</td>
    <td>houdunwang.com</td>
    <td>hdcms</td>
  </tr>
</table>
```
设置前三个元素
```html
<style>
table tr>td:nth-child(-n+3) {
    background: rgb(128, 35, 2);
    color: white;
}
</style>
```
### 奇数元素
选择奇数单元格
```html
<style>
table tr>td:nth-child(odd) {
    background: green;
    color: white;
}
</style>

<table border="1">
  <tr>
    <td>houdunren.com</td>
    <td>hdcms.com</td>
    <td>后盾人</td>
    <td>houdunwang.com</td>
    <td>hdcms</td>
  </tr>
</table>
```
### 偶数元素
选择偶数单元格
```html
<style>
table tr>td:nth-child(even) {
    background: green;
    color: white;
}
</style>

<table border="1">
  <tr>
    <td>houdunren.com</td>
    <td>hdcms.com</td>
    <td>后盾人</td>
    <td>houdunwang.com</td>
    <td>hdcms</td>
  </tr>
</table>
```
### :nth-last-child(n)
从最后一个元素开始获取
```html
<style>
table tr>td:nth-last-child(2n+1){
    background: green;
    color: white;
}
</style>

<table border="1">
  <tr>
    <td>houdunren.com</td>
    <td>hdcms.com</td>
    <td>后盾人</td>
    <td>houdunwang.com</td>
    <td>hdcms</td>
  </tr>
</table>
```
取最后两个元素
```css
table tr>td:nth-last-child(-n+2){
    background:green;
    color:white;
}
```
### :nth-last-of-type(n)
从最后一个元素开始选择`span`标签
```html
<style>
article span:nth-last-of-type(1) {
    background: red;
    color: white;
}
</style>

<article>
  <aside>
  	<span>houdunren.com</span>
  	<span>houdunwang.com</span>
  	<strong>hdcms.com</strong>
  </aside>
	<span>hdphp.com</span>
</article>
```
### :not(selector)
排除第一个li元素
```html
<style>
ul li:not(:nth-child(1)) {
    background: red;
}
</style>

<ul>
  <li>houdunren.com</li>
  <li>hdcms.com</li>
  <li>后盾人</li>
</ul>
```
## 表单伪类
选择器|示例|说明
---|---|---
:enabled|input:enabled|选择每个启用的input元素
:disabled|input:disabled|选择每个禁用的input元素
:checked|input:checked|选择每个被选中的input元素
:required|input:required|包含`required`属性的元素
:optional|input:optional|不包含`required`属性的元素
:valid|input:vaild|验证通过的表单元素
:invalid|input:invalid|验证不通过的表单元素

### 表单属性样式
```html
input:enabled {
    background: red;
}

input:disabled {
    background: #dddddd;
}

input:checked+label{
    color: green;
}
...

<input type="text" disabled>
<input type="text" name="info">

<input type="radio" name="sex" checked id="boy">
<label for="boy">男</label>
<input type="radio" name="sex" checked id="girl">
<label for="girl">女</label>
```
### 表单必选样式
```html
<style>
input:required {
    border: solid 2px blue;
}

input:optional {
	background: #dcdcdc; 
	border: none;
}
</style>


<input type="text" name="title" required>
<input type="text" name="name">
```

### 表单验证样式
```html
<style>
input:valid {
    border: solid 1px green;
}

input:invalid {
    border: solid 1px red;
}
</style>

<form>
<input type="email">
<button>保存</button>
</form>
```

### 字符伪类
状态|示例|说明
---|---|---
::first-letter|p::first-letter|选择每个元素的首字母
::first-line|p::first-line|选择每个元素的首行
::before|p::before|在每个元素的内容之前插入内容
::after|p::after|在每个元素的内容之后插入内容

### 首字母大写
```html
<style>
p::first-letter {
    font-size: 20px;
}
<p>
	后盾人不断更新视频教程
</p>
</style>
```
### 段落首行处理
```html
<style>
p::first-letter {
    font-size: 30px;
}
</style>
<p>
	后盾人不断更新视频教程
</p>
```

### 在元素前添加
```html
<style>
span::before {
    content: '⇰';
    color: red;
}
span::after {
    content: '⟲';
    color: green;
}
</style>

<span>后盾人</span>
```
### 搜索框示例
```html
<style>
div {
    border: solid 1px #ddd;
    width: 150px;
}

div>input[type="text"] {
    border: none;
    outline: none;
}

div>input[type="text"]+span:after {
    content: "\21AA";
    font-size: 14px;
    cursor: pointer;
}
</style>

<div>
	<input type="text"><span></span>
</div>
```

### 添加属性内容
```html
h2::before {
	content: attr(title);
}
...

<h2 title="后盾人">houdunren.com</h2>
```
# CSS元素权重
元素会被多个样式一层层作用，这就是层叠样式表的来源。
如果多个样式作用在元素上就会产生优先级权重问题。

使用类，ID，伪类都有不同的权重，具体应用哪条规则要看权限大小。
- 相同权重的规则应用最后出现的
- 可以使用 !important 强制提升某个规则的权限

## 权重应用
规则|粒度
---|---|---
ID|0100
class,类属性值|0010
标签，伪元素|0001
*|0000
行内样式|1000

**下面是ID权限大于CLASS的示例**

<style>
.color1{
    color:red;
}
#hot{
    color:green;
}
</style>
<h2 class="color1" id="hot">ID为绿，类为红</h2>

```html
<style>
  .color {
  	color: red;
  }

  #hot {
  	color: green;
  }
</style>
    
<h2 class="color" id="hot">HDCMS</h2>
```

## 属性权重的示例
<style>
  /* 权重:0021 */
  h2[class="color1"][id] {
		color: red;
  }

  /* 权重:0012 */
  article h2[class="color"] {
  	color: blue;
  }
</style>

<article>
	<h2 class="color1" id="hot1">HDCMS</h2>
</article>


```html
<style>
  /* 权重:0021 */
  h2[class="color1"][id] {
		color: red;
  }

  /* 权重:0012 */
  article h2[class="color1"] {
  	color: blue;
  }
</style>

<article>
	<h2 class="color" id="hot">HDCMS</h2>
</article>
```
## 行级优先级最高
<style>
  /* 权重:0012 */
  article h2[class="color"] {
  	color: blue;
  }

  #hot {
  	color: black;
  }
</style>

<h2 class="color" id="hot" style="color:green;">HDCMS</h2>

```html
<style>
  /* 权重:0012 */
  article h2[class="color"] {
  	color: blue;
  }

  #hot {
  	color: black;
  }
</style>

<h2 class="color" id="hot" style="color:green;">HDCMS</h2>
```

# 强制优先级
有时在规则冲突时，为了让某个规则强制有效可以使用 !important。
<style>
  .h2 {
 	 color: red !important;
  }

  .h2 {
 	 color: green;
  }
</style>

<h2 class="h2">HDCMS</h2>


```html
<style>
  h2 {
 	 color: red !important;
  }

  h2 {
 	 color: green;
  }
</style>

<h2>HDCMS</h2>
```
**两条规则权限一样，默认应用第二个规则，但第一个规则使用了!important 提升了权限，所以被应用。**

# 继承规则
子元素可以继承父元素设置的样式
- 继承的并不是全部样式，比如边框，高度等并不会继承
- 继承的规则没有权重
```html
<style>
  article {
    color: red;
    border: solid 1px #ddd;
  }
</style>
...

<article>
	<h2>hdcms <span>内容管理系统</span></h2>
</article>
```
### 通配符问题
```html
<style>
  * {
  	color: red;
  }

  h2 {
  	color: blue;
  }
</style>

<article>
	<h2>hdcms <span>内容管理系统</span></h2>
</article>
```
h2 中的`span`并没有继承 `h2` 的颜色，就是因为继承没有权重。而使用了 `*` 权重为0的规则。
