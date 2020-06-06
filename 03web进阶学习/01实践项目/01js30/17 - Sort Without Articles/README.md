# 17 - Sort Without Articles
第十七天的主要操作是对数组进行排序。将乐队按照乐曲名称进行排序，曲名前面的a/an/the不参与排序。

# 收获
## CSS

### list-style
list-style CSS 属性是一个简写对属性集合，包括list-style-type, list-style-image, 和 list-style-position。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style)


**语法**
```css
Formal syntax: <'list-style-type'> || <'list-style-position'> || <'list-style-image'>
```
以任何顺序接受一个，二个或者三个关键词
- <'list-style-type'>
  - 参看 [list-style-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type)
- <'list-style-image'>
  - 参看 [list-style-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-image)
- <'list-style-position'>
  - 参看 [list-style-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-position)
  - outside 标记盒在主块盒的外面。
  - inside 标记盒是主要块盒中的第一个行内盒，处于元素的内容流之后。

## JS
### 正则表达式
- [MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [菜鸟教程](https://www.runoob.com/regexp/regexp-tutorial.html)

```js
function stripp(bandName){
    return bandName.replace(/^(a |the |an )/i,'').trim();
}
// 会将a an the 替换成空字符串,同时使用trim()函数去掉字符串的首尾的空格
```


### trim
trim() 方法会从一个字符串的两端删除空白字符。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)

**语法**
```js
str.trim()
```
**返回值**

一个代表调用字符串两端去掉空白的新字符串。