## canvas
- 一个HTML5的标签，为画图提供画布，真正操作canvas需要使用js
- 标签自带属性：
  - width：宽度(默认300)
  - height：高度(默认150)
- canvas是一个行内块元素
- 支持HTML中的全局属性
- 支持HTML中的事件属性

- 默认情况下，canvas的坐标系和网页的坐标系是一样的，默认的坐标系圆点为canvas画布的左上角的点。
## 基本使用
- 获得canvas的DOM对象
    ```
    var mycanvas = docunment.getElementById('mycanvas');
    ```
- 获取画笔对象
    ```
    var ctx = mycanvas.getContext('2d');
    ```
- canvas的属性存在于ctx
- canvas的方法存储ctx的原型链上

## 基本画图
- 画弧(画圆)
- arc：