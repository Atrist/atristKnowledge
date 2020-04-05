# 19 - Webcam Fun
第十九天的练习是使用浏览器的摄像头，实时记录影像，并输出到canvas中，并用canvas对图像进行滤镜的处理。

[MDN上一个类似的教程](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API/Taking_still_photos)
# 主要思路
### 1.获取摄像头,并在页面上播放信息
### 2.捕捉一帧并输入到canvas
### 3.借助canvas输出
# 收获
## HTML
### audio
HTML `<audio> `元素用于在文档中表示音频内容。` <audio> `元素可以包含多个音频资源， 这些音频资源可以使用 src 属性或者`<source>` 元素来进行描述； 浏览器将会选择最合适的一个来使用。对于不支持`<audio>`元素的浏览器，`<audio>`元素也可以作为浏览器不识别的内容加入到文档中。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

**属性**
- autoplay
  - 布尔属性；如果指定（默认值为"false"！）；指定后，音频会马上自动开始播放，不会停下来等着数据载入结束。
- controls
  - 如果设置了该属性，浏览器将提供一个包含声音，播放进度，播放暂停的控制面板，让用户可以控制音频的播放。

## CSS
### clearfix
清楚浮动的一种常用方式
```css
.photobooth:after {
    content: '';
    display: block;
    clear: both;
}
```

### a:nth-child(an+b)
:nth-child(an+b) 这个 CSS 伪类首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从1开始排序，选择的结果为CSS伪类:nth-child括号中表达式（an+b）匹配到的元素集合（n=0，1，2，3...）。[MDN文档的链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)

示例：
- `0n+3` 或简单的 `3` 匹配第三个元素。
- `1n+0` 或简单的`n`匹配每个元素。（兼容性提醒：在 Android 浏览器 4.3 以下的版本 n 和 1n 的匹配方式不一致。1n 和 1n+0 是一致的，可根据喜好任选其一来使用。）
- `2n+0` 或简单的 `2n` 匹配位置为 2、4、6、8...的元素（n=0时，2n+0=0，第0个元素不存在，因为是从1开始排序)。你可以使用关键字 `even` 来替换此表达式。
- `2n+1` 匹配位置为 1、3、5、7...的元素。你可以使用关键字 `odd` 来替换此表达式。
- `3n+4` 匹配位置为 4、7、10、13...的元素。

>`a` 和 `b` 都必须为整数，并且元素的第一个子元素的下标为 1。换言之就是，该伪类匹配所有下标在集合 `{ an + b; n = 0, 1, 2, ...}` 中的子元素。另外需要特别注意的是，`a`n 必须写在 `b` 的前面，不能写成 `b+an` 的形式。
## JS
### 获取摄像头
```js
function getVideo() {
    navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then(function (stream) {
            // chrome
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.log("An error occured! " + err);
        });
}
```
- [navigator的mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator)
- [mediaDevices的MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)

### Canvas
#### drawIamge()
Canvas 2D API 中的 CanvasRenderingContext2D.drawImage() 方法提供了多种方式在Canvas上绘制图像。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

**语法**
```js
void ctx.drawImage(image, dx, dy);
void ctx.drawImage(image, dx, dy, dWidth, dHeight);
void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

**参数**
- image
  - 绘制到上下文的元素。允许任何的 canvas 图像源(CanvasImageSource)，例如：CSSImageValue，HTMLImageElement，SVGImageElement，HTMLVideoElement，HTMLCanvasElement，ImageBitmap 或者OffscreenCanvas。
- sx可选
  - 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 X 轴坐标。
- sy可选
  - 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 Y 轴坐标。
- sWidth可选
  - 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的sx和sy开始，到image的右下角结束。
- sHeight可选
  - 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的高度。
- dx
  - image的左上角在目标canvas上 X 轴坐标。
- dy
  - image的左上角在目标canvas上 Y 轴坐标。
- dWidth可选
  - image在目标canvas上绘制的宽度。 允许对绘制的image进行缩放。 如果不说明， 在绘制时image宽度不会缩放。
- dHeight可选
  - image在目标canvas上绘制的高度。 允许对绘制的image进行缩放。 如果不说明， 在绘制时image高度不会缩放。

#### getImageData()
CanvasRenderingContext2D.getImageData() 返回一个[ImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
- [MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
- [菜鸟教程](https://www.runoob.com/jsref/met-canvas-getimagedata.html)

**语法**
```js
ImageData ctx.getImageData(sx, sy, sw, sh);
```
**参数**
- sx
  - 将要被提取的图像数据矩形区域的左上角 x 坐标。
- sy
  - 将要被提取的图像数据矩形区域的左上角 y 坐标。
- sw
  - 将要被提取的图像数据矩形区域的宽度。
- sh
  - 将要被提取的图像数据矩形区域的高度。

**返回值**
- 一个ImageData 对象，包含canvas给定的矩形图像数据。

### ImageData
ImageData 接口描述 `<canvas>` 元素的一个隐含像素数据的区域。[mdn的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)

**属性**
- ImageData.data 
  - [菜鸟教程](https://www.runoob.com/jsref/prop-canvas-imagedata-data.html)
  - Uint8ClampedArray 描述了一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示。 
  - data 属性返回一个对象，该对象包含指定的 ImageData 对象的图像数据。
  - 对于 ImageData 对象中的每个像素，都存在着四方面的信息，即 RGBA 值：
    - R - 红色（0-255）
    - G - 绿色（0-255）
    - B - 蓝色（0-255）
    - A - alpha 通道（0-255; 0 是透明的，255 是完全可见的）
  - color/alpha 信息以数组形式存在，并存储于 ImageData 对象的 data 属性中。

- ImageData.height 只读
  - 无符号长整型（unsigned long），使用像素描述 ImageData 的实际高度。
- ImageData.width 只读
  - 无符号长整型（unsigned long），使用像素描述 ImageData 的实际宽度。

#### putImageData()
CanvasRenderingContext2D.putImageData() 是 Canvas 2D API 将数据从已有的 ImageData 对象绘制到位图的方法.如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)

**语法**
```js
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```

**参数**
- imageData
  - ImageData ，包含像素值的数组对象。
- dx
  - 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
- dy
  - 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。