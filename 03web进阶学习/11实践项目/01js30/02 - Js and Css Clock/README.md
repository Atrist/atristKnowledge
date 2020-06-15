## 02 JS and CSS Clock

- 实现效果
  

## 关键步骤
- 表盘上的指针样式：旋转的效果
- 获取实时的时间
- 每一秒改变一次指针的状态
  
## 实现步骤

- 表盘的实现
- 指针的实现
- 指针移动的实现
- 实时时间的获取

# 学习笔记
## HTML
页面布局
```html
  <div class="clock">
    <div class="clock-face">
      <div class="hand hour-hand"></div>
      <div class="hand min-hand"></div>
      <div class="hand second-hand"></div>
    </div>
  </div>
```
## css
涉及到的特性
### box-shadow
`box-shadow`属性可以设置一个或多个下拉阴影的框。
```css
box-shadow: h-shadow v-shadow blur spread color inset;
```
**boxShadow 属性把一个或多个下拉阴影添加到框上。该属性是一个用逗号分隔阴影的列表，每个阴影由 2-4 个长度值、一个可选的颜色值和一个可选的 inset 关键字来规定。省略长度的值是 0。**

值|说明
--|--
h-shadow	|必需的。水平阴影的位置。允许负值
v-shadow	|必需的。垂直阴影的位置。允许负值
blur	|可选。模糊距离
spread	|可选。阴影的大小
color	|可选。阴影的颜色。在CSS颜色值寻找颜色值的完整列表
inset	|可选。从外层的阴影（开始时）改变阴影内侧阴影
### transform-oragin
- [MDN的参考链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)
- transform-origin CSS属性让你更改一个元素变形的原点。
- 转换起点是应用转换的点。例如，rotate()函数的转换原点是旋转中心。（这个属性的应用原理是先用这个属性的赋值转换该元素，进行变形，然后再用这个属性的值把元素转换回去）
## JS
- 获取时、分、秒的html节点
```js
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
```
- 获取时、分、秒
```js
const date = new Date();
const seconds = date.getSeconds();
const mins = date.getMinutes();
const hour = date.getHours();
```

### setInterval
- 简介：
  - setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。
- 语法：
`setInterval(code,millisec[,"lang"])`
  - code 要调用的函数或要执行的代码串
  - 周期性执行或调用code之间的时间间隔，以毫秒计
- 返回值：
  - 一个可以传递给 Window.clearInterval() 从而取消对 code 的周期性执行的值。
  
