# 28 - Video Speed Controller
第28天的练习是一个视频播放速率控制的效果。

# 主要思路
1. 为速度进度条添加鼠标移动事件
2. 计算进度条相对高度,设置为视频播发的速度,并更新进度条的数字

## 主要代码
```js
function handleMove(e) {

const y = e.pageY - this.offsetTop;
const percent = y / this.offsetHeight;
const min = 0.4;
const max = 4;
const height = Math.round(percent * 100) + '%';
// 
const playbackRate = percent * (max - min) + min;
bar.style.height = height;
bar.textContent = playbackRate.toFixed(2) + '×';
video.playbackRate = playbackRate;
}
```
# 收获  
# JS
##  offsetHeight
offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。 [MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)

##  Math.round() 
Math.round() 函数返回一个数字四舍五入后最接近的整数。
## Touch.pageY
触点相对于HTML文档上边沿的的Y坐标. 和 clientY 属性不同, 这个值是相对于整个html文档的坐标, 和用户滚动位置无关. 因此当存在垂直滚动的偏移时, 这个值包含了垂直滚动的偏移.

## Number.prototype.toFixed()
toFixed() 方法使用定点表示法来格式化一个数值。
### 参数
- digits
  - 小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。
