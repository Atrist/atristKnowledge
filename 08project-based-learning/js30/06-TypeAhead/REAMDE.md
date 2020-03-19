# 06 - Type Ahead
第六天的练习是通过在输入框中输入一个词，能够迅速匹配出含有这个词的城市名称或者州名，城市的来源是通过加载页面时从网络中异步获得的JSON数据。


本来是 含有这个词的城市名称或者州名,但英文看着总是不习惯,所以 使用[soyaine所提供的诗词](https://github.com/soyaine/JavaScript30/blob/master/06%20-%20Type%20Ahead/README.md)修改了一下代码.

json数据地址:
```js
https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json
```

# 收获
## HTML
无
## CSS
### hsla()
css函数,定义HSL颜色,并设置颜色,[菜鸟教程](https://www.runoob.com/cssref/func-hsla.html)

示例
```css
{background-color:hsl(120,100%,50%,0.3);} /* 绿色 */
{background-color:hsl(120,100%,75%,0.3);} /* 浅绿  */
{background-color:hsl(120,100%,25%,0.3);} /* 暗绿  */
{background-color:hsl(120,60%,70%,0.3);} /* 柔和的绿色 */
```

**定义与用法**

hsla() 函数使用色相、饱和度、亮度、透明度来定义颜色。

HSLA 即色相、饱和度、亮度、透明度（英语：Hue, Saturation, Lightness, Alpha ）。
- 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
- 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取 0-100% 的数值。
- 亮度（L） 取 0-100%，增加亮度，颜色会向白色变化；减少亮度，颜色会向黑色变化。
- 透明度（A） 取值 0~1 之间， 代表透明度。

**语法**

值|描述
--|--|--
hue - 色相	| 定义色相 (0 到 360) - 0 (或 360) 为红色, 120 为绿色, 240 为蓝色
saturation - 饱和度	|定义饱和度; 0% 为灰色， 100% 全色
lightness - 亮度	|定义亮度 0% 为暗, 50% 为普通, 100% 为白
alpha - 透明度	|定义透明度 0（透完全明） ~ 1（完全不透明）
## JS
### Fetch
js异步获取数据的[MDN fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

简单示例:
```js
const endPoint='url';
const poems = [];
// 异步获取数据
fetch(endPoint)
.then(blob => blob.json())
.then(data => poems.push(...data));
```
