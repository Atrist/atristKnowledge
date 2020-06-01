# 03 CSS Variables
通过JS更改css变量
- [实现效果]()

## 关键步骤


# 收获

## HTML
### input标签
- [W3schhool input标签](https://www.w3school.com.cn/html5/tag_input.asp)
## CSS
### css变量
自定义属性(有时也被称作css变量或级联变量)是由CSS作者定义，它包含的值可以在整个文档中重复使用.是由CSS作者定义，它包含的值可以在整个文档中重复使用,[详情见](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

#### 基本用法
声明一个自定义属性：
```css
element {
  --main-bg-color: brown;
}
```
使用一个局部变量
```css
element{
    background-color:var(--main-bg-color);
}
```
定义全局属性
```css
:root{
    --main-bg-color:brown;
}
```



