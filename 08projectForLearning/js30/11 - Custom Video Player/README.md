# 11 - Custom Video Player
第十一天是要做一个自定义的视频播放器，在具有基本样式的前提下，实现视频的播放，暂停，进度条拖拽，音量加减，播放速度加减，快进快退的功能。

# 收获
## HTML
### video标签
HTML `<video>` 元素 用于在HTML或者XHTML文档中嵌入媒体播放器，用于支持文档内的视频播放。你也可以将` <video>`  标签用于音频内容，但是 `<audio> `元素可能在用户体验上更合适。 
[MDN文档链接](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

浏览器并不是都支持相同的视频格式，所以你可以在` <source> `元素里提供多个视频源，然后浏览器将会使用它所支持的第一个源。
```js
<video controls>
  <source src="myVideo.mp4" type="video/mp4">
  <source src="myVideo.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. Here is
     a <a href="myVideo.mp4">link to the video</a> instead.</p>
</video>
```

**其他使用注意事项**
- 如果你没有指定 controls 属性，那么视频不会展示浏览器自带的控件，你也可以用 JavaScript 和 HTMLMediaElement API 来创建你自己的控件。
- HTMLMediaElement 会激活许多不同的事件，以便于让你可以控制视频（和音频）内容。
- 你可以用CSS 属性 object-position 来调整视频在元素内部的位置，它可以控制视频尺寸适应于元素外框的方式。
- 如果想在视频里展示字幕或者标题，你可以在 `<track>` 元素和 WebVTT 格式的基础上使用 JavaScript 来实现。

**属性**
就像其他的HTML元素一样，这个元素也同样支持全局属性。
- autoplay
  - 布尔属性；指定后，视频会马上自动开始播放，不会停下来等着数据载入结束。
- buffered
  - 这个属性可以读取到哪段时间范围内的媒体被缓存了。
- controls
  - 加上这个属性，Gecko 会提供用户控制，允许用户控制视频的播放，包括音量，跨帧，暂停/恢复播放。
- currentTime
  - 读取CurentTime返回一个双精度浮点值，指示以秒为单位的媒体的当前播放位置。
- duration 只读
  - 一个双精度浮点值，它指示媒体的持续时间(总长度)，以秒为单位，在媒体的时间线上。
  
## CSS
### cursor
CSS属性定义鼠标指针悬浮在元素上方显示的鼠标光标。[MDN文档链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)

```css
/* 仅关键字 */
cursor: pointer;
cursor: auto;

/* 使用URL并提供一个关键字值作为回退机制 */
cursor: url(hand.cur), pointer;

/* URL和xy的坐标偏移值，最后提供一个关键字值作为回退机制 */
cursor:  url(cursor1.png) 4 12, auto;
cursor:  url(cursor2.png) 2 2, pointer;

/* 全局属性 */
cursor: inherit;
cursor: initial;
cursor: unset;
```
cursor属性为零个或多个`<url>`值，最后必填一个关键字值，它们之间用逗号分隔。`<url>`指向一个图像文件。浏览器将尝试加载指定的第一个图像，如果无法加载则返回下一个图像，如果无法加载图像或未指定图像，则返回关键字值。

每个`<url>`后面都可选跟一对空格分隔的数字`<x><y>`表示偏移。这些将设置光标相对于图像左上角的点。

### ::webkit-slider-thumb
这是type为range的input标签内的一种伪类样式,用于设置range的滑块的具体样式,该伪类只在**内核为webkit/blink**的浏览器中有效

### ::-webkit-slider-runnable-track
表示其在type为range的input标签内中的滑块凹槽,也就是滑块可滑动的区域,该伪类只在**内核为webkit/blink**的浏览器中有效

### ::-moz-range-thumb
这是type为range的input标签内的一种伪类样式,用于设置range的滑块的具体样式,该伪类只在**火狐**的浏览器中有效
### ::-moz-range-track
表示其在type为range的input标签内中的滑块凹槽,也就是滑块可滑动的区域,该伪类只在**火狐**的浏览器中有效
## JS

### video对象
Video 对象是 HTML5 中的新对象。Video 对象表示 HTML `<video>` 元素。[video对象w3schol文档](https://www.w3school.com.cn/jsref/dom_obj_video.asp)

**属性**
属性 | 描述
--|--
audioTracks	|返回表示可用音频轨道的 AudioTrackList 对象。
autoplay	|设置或返回是否在就绪（加载完成）后随即播放视频。
buffered	|返回表示视频已缓冲部分的 TimeRanges 对象。
controller	|返回表示视频当前媒体控制器的 MediaController 对象。
controls	|设置或返回视频是否应该显示控件（比如播放/暂停等）。
crossOrigin	|设置或返回视频的 CORS 设置。
currentSrc	|返回当前视频的 URL。
currentTime	|设置或返回视频中的当前播放位置（以秒计）。
defaultMuted	|设置或返回视频默认是否静音。
defaultPlaybackRate	|设置或返回视频的默认播放速度。
duration	|返回视频的长度（以秒计）。
ended	|返回视频的播放是否已结束。
error	|返回表示视频错误状态的 MediaError 对象。
height	|设置或返回视频的 height 属性的值。
loop	|设置或返回视频是否应在结束时再次播放。
mediaGroup	|设置或返回视频所属媒介组合的名称。
muted	|设置或返回是否关闭声音。
networkState	|返回视频的当前网络状态。
paused	|设置或返回视频是否暂停。
playbackRate	|设置或返回视频播放的速度。
played	|返回表示视频已播放部分的 TimeRanges 对象。
poster	|设置或返回视频的 poster 属性的值。
preload	|设置或返回视频的 preload 属性的值。
readyState	|返回视频当前的就绪状态。
seekable	|返回表示视频可寻址部分的 TimeRanges 对象。
seeking	|返回用户当前是否正在视频中进行查找。
src	|设置或返回视频的 src 属性的值。
startDate	|返回表示当前时间偏移的 Date 对象。
textTracks	|返回表示可用文本轨道的 TextTrackList 对象。
videoTracks	|返回表示可用视频轨道的 VideoTrackList 对象。
volume	|设置或返回视频的音量。
width	|设置或返回视频的 width 属性的值。

**对象方法**
方法	|描述
--|--
addTextTrack()	|向视频添加新的文本轨道。
canPlayType()	|检查浏览器是否能够播放指定的视频类型。
load()	|重新加载视频元素。
play()	|开始播放视频。
pause()	|暂停当前播放的视频。


### 视频的播放与暂停
```js
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
// 更新页面显示的状态
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}
```
### 音量的加减
```js
function handleRangeUpdate() {
    video[this.name] = this.value;
}
```
### 进度条的拖拽
```js
function scrub(e) {
    const srubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = srubTime;
}
```

对进度条的处理:
获取
```js
offsetX、offsetY
//  相对于带有定位的父盒子的x，y坐标 
offsetWidth
// 获取的是盒子最终的宽
```

## 改进
我在测试代码的时候,发现了一个问题,当鼠标在拖动进度条的时候,鼠标必须在进度条上松开,否则或出现,进度条会随着鼠标移动而移动.
```js
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```
参照bilibili视频的做法,当鼠标在进度条上按下时,进度条全权接管鼠标,只有当鼠标键松开的时候,然后更新进度条.
