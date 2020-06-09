# fileReader
fileReader是html5中新增的一个类,用来对input中`[文件上传操作file类型]`进行处理的对象,通过该类创建的对象中提供了一些方法,能够对上传的文件进行[预先的读写],从而在某种情况下实现"预览"的效果

## 使用
文件读写一般分为三种方式:
- 文本读取
- 图片url读取
- 二进制流读取

## 语法
```js
var fileReader = new filereader();
// 获取文本的格式
fileReader.readAsText(从input元素中获得的文件流);
fileReader.onload() = function(){
    console.log(fileReader.result);
};
// 获取图片url
fileReader.readAsDataURL(从input元素中获得的文件流);
fileReader.onload() = function(){
    console.log(fileReader.result);
}
```