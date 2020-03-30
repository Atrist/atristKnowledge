# 13 - Slide in on Scroll
第十三天的小练习是实现页面内伴随着鼠标滚动，到每个图片时图片出现，并伴随着动画出现。


# 收获
## CSS
### 实现图片的移出
```css
.slide_in{
    opacity:0;
    transition: all .5s;
}
.slide_in.active{
    opacity:1;
    transform:translateX(0%) scale(1);
}
```
### opacity
**语法**
```css
opacity: value|inherit;
```
值	|描述
--|--
value	|规定不透明度。从 0.0 （完全透明）到 1.0（完全不透明）。
inherit	|应该从父元素继承 opacity 属性的值。

## JS
### 防抖
参考资料
- https://www.cnblogs.com/wssdx/p/11557706.html

**什么是函数防抖**
概念：函数防抖（debounce），就是指触发事件后，在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。

**目的**

　前端开发过程中，有一些事件，常见的例如，onresize，scroll，mousemove ,mousehover 等，会被频繁触发（短时间内多次触发），不做限制的话，有可能一秒之内执行几十次、几百次，如果在这些函数内部执行了其他函数，尤其是执行了操作 DOM 的函数（浏览器操作 DOM 是很耗费性能的），那不仅会浪费计算机资源，还会降低程序运行速度，甚至造成浏览器卡死、崩溃。这种问题显然是致命的。

**除此之外，短时间内重复的 ajax 调用不仅会造成数据关系的混乱，还会造成网络拥塞，增加服务器压力，显然这个问题也是需要解决的。**

**关键点**

函数防抖的要点，是需要一个 setTimeout 来辅助实现，延迟运行需要执行的代码。如果方法多次触发，则把上次记录的延迟执行代码用 clearTimeout 清掉，重新开始计时。若计时期间事件没有被重新触发，等延迟时间计时完毕，则执行目标代码。


代码
```js
function debounce(func, wait = 20, immediate = true) {
    // wait 防抖的时间
    var timeout;
    // 计算正式执行命令的时间
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
```


### apply
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

>注意：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

```js
func.apply(thisArg, [argsArray])
```
**参数**
- thisArg
  - 必选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
- argsArray
  - 可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性 请参阅本文底部内容。

**返回值**

调用有指定this值和参数的函数的结果。


### setTImeout
WindowOrWorkerGlobalScope 混合的 setTimeout()方法设置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码。

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)

**语法**
```js
var timeoutID = setTimeout(function[, delay, arg1, arg2, ...]);
var timeoutID = setTimeout(function[, delay]); 
var timeoutID = ssetTimeout(code[, delay]);
```

**参数**

- function
  - function 是你想要在到期时间(delay毫秒)之后执行的函数。
- code
  - 这是一个可选语法，你可以使用字符串而不是function ，在delay毫秒之后编译和执行字符串 **(使用该语法是不推荐的, 原因和使用 eval()一样，有安全风险)**.
- delay 可选
  - 延迟的毫秒数 (一秒等于1000毫秒)，函数的调用会在该延迟之后发生。如果省略该参数，delay取默认值0，意味着“马上”执行，或者尽快执行。不管是哪种情况，实际的延迟时间可能会比期待的(delay毫秒数) 值长，原因请查看实际延时比设定值更久的原因：最小延迟时间。
- arg1, ..., argN 可选
    - 附加参数，一旦定时器到期，它们会作为参数传递给function
>备注：需要注意的是，IE9 及更早的 IE 浏览器不支持向回调函数传递额外参数(第一种语法)。
### clearTimeout
WindowOrWorkerGlobalScope内置的clearTimeout()方法取消了先前通过调用setTimeout()建立的定时器。
[wdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowTimers/clearTimeout)

**语法**
```js
scope.clearTimeout(timeoutID)
```

**参数**
- timeoutID
    - 您要取消定时器的标识符。 该ID由相应的setTimeout()调用返回。

>值得注意的是，setTimeout()和setInterval()使用共享的ID池， 这意味着你可以在技术上交替使用clearTimeout()和clearInterval() 。


## 关键的逻辑点
```js
function checkslide() {
    sliderImages.forEach(sliderImage => {
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        }
        else {
            sliderImage.classList.remove('active');
        }
    });
}
```

### 涉及一些对象属性
- window.scrollY
  - Window接口的只读scrollY属性返回文档当前垂直滚动的像素数.
- window.innerHeight
  - 浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。
- image.offsetTop
  - HTMLElement.offsetTop 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。