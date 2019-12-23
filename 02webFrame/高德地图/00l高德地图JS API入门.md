# 高德地图
国内的一个地图提供商

[官网](https://lbs.amap.com/)

# js API
## 入门
[官方教程](https://lbs.amap.com/api/javascript-api/guide/abc/prepare)

## 准备

1. 添加js API的入口脚本标签，并将其中「您申请的key值」替换为您申请的 key；
```html
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值"></script> 
```
2.  添加div标签作为地图容器，同时为该div指定id属性；
```html
<div id="container"></div> 
```
3. 为地图容器指定高度、宽度；
4. 简单创建一个地图只需要一行代码，构造参数中的container为准备阶段添加的地图容器的id：
```js
   var map = new AMap.Map('container');
```
创建的同时可以给地图设置中心点、级别、显示模式、自定义样式等属性：
```js
   var map = new AMap.Map('container', {
        zoom:11,//级别
        center: [116.397428, 39.90923],//中心点坐标
        viewMode:'3D'//使用3D视图
    });
```