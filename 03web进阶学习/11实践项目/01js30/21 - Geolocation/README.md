# 21-Geolocation
第21天的目的是练习NavigatorGeolocation.geolocation这一webAPI的使用，通过使用此API可以访问到设备的位置信息。这允许网站或应用根据用户的位置提供个性化结果。

# 主要思路
1. 获取用户地理位置
2. 展示

#  主要代码
```js
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
    console.error(err);
});
```
由于笔记本电脑一般不带速度及方向传感器，从结果中可以看到返回值中heading及speed键值均为null,为演示可视化效果，代码中采用手动赋值的方式进行演示。


于是代码更改为:
```js
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = 200;
    arrow.style.transform = `rotate(${200}deg)`;
    console.log(data);
}, (err) => {
    console.log(err);
});
```
# 收获
# CSS
## radial-gradient()
CSS radial-gradient() 函数创建了一个图片，其由一个从原点辐射开的在两个或者多个颜色之前的渐变组成。这个方法得到的是一个CSS`<gradient>`数据类型的对象，其是` <image> `的一种。 [MDN的文档参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient)

```css
background:
    radial-gradient(black 15%, transparent 16%) 0 0,
    radial-gradient(black 15%, transparent 16%) 8px 8px,
    radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255, 255, 255, .1) 15%, transparent 20%) 8px 9px;
```
与其他渐变相同，径向渐变是一个不固定尺寸的图片，譬如，它没有默认尺寸、比例。具体尺寸由它所定义的元素尺寸决定。

如需要填充容器的循环渐变，请使用CSS的repeating-radial-gradient 方法。

因为 `<gradient> `属于 `<image>` 类型，所以它可以用于任何适用于 `<image>` 的地方。正是因为这样，radial-gradient() 不能用于 background-color 和其他属性比如 `<color>` 数据类型。

## background
background 是一种 CSS 简写属性，用于一次性集中定义各种背景属性，包括 color, image, origin 与 size, repeat 方式等等。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)

### background-attachment
background-attachment CSS 属性决定背景图像的位置是在视口内固定，还是随着包含它的区块滚动。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)

**取值**

- fixed
  - 此关键字表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。
- local
  - 此关键字表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动， 并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含他们的边框。
- scroll
  - 此关键字表示背景相对于元素本身固定， 而不是随着它的内容滚动（对元素边框是有效的）。


# JS

## navigator.geolocation
Geolocation 接口是一个用来获取设备地理位置的可编程的对象，它可以让Web内容访问到设备的地理位置，这将允许Web应用基于用户的地理位置提供定制的信息。说实话：其实Geolocation 就是用来获取到当前设备的经纬度（位置）[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)

### 方法
- Geolocation.getCurrentPosition()
  - 确定设备的位置并返回一个携带位置信息的 Position 对象
- Geolocation.watchPosition()
  - 注册一个位置改变监听器，每当设备位置改变时，返回一个 long 类型的该监听器的ID值。
- Geolocation.clearWatch()
  - 取消由 watchPosition()注册的位置监听器。

### position对象
- Position.coords 只读
  - 返回一个定义了当前位置的Coordinates 对象.
- Position.timestamp 只读
  - 返回一个时间戳DOMTimeStamp， 这个时间戳表示获取到的位置的时间。
#### cordinates
Coordinates （坐标）接口表示设备在地球上的位置和海拔，以及计算这些属性的精确度。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationCoordinates)

**属性**
- Coordinates.latitude 只读
  - Returns a double representing the position's latitude in decimal degrees.
- Coordinates.longitude 只读
  - Returns a double representing the position's longitude in decimal degrees.
- Coordinates.altitude 只读
  - Returns a double representing the position's altitude in metres, relative to sea level. This value can be null if the implementation cannot provide the data.
- Coordinates.accuracy 只读
  - Returns a double representing the accuracy of the latitude and longitude properties, expressed in meters.
- Coordinates.altitudeAccuracy 只读
  - Returns a double representing the accuracy of the altitude expressed in meters. This value can be null.
- Coordinates.heading 只读
  - Returns a double representing the direction in which the device is traveling. This value, specified in degrees, indicates how far off from heading due north the device is. 0 degrees represents true true north, and the direction is determined clockwise (which means that east is 90 degrees and west is 270 degrees). If speed is 0, heading is NaN. If the device is unable to provide heading information, this value is null.
- Coordinates.speed 只读
  - Returns a double representing the velocity of the device in meters per second. This value can be null.




