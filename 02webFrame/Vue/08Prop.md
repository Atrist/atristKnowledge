# Prop
## Prop的大小写(camelCase VS kebab-case)
HTML中的特性名时大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用DOM中的模板时，camelCase(驼峰命名法)的prop名需要使用其等价的kebab-case(短横线分隔命名)命名:
```js
Vue.componet('blog-post',{
    props:['postTitle'],
    template:'<h3>{{postTitle}}</h3>'
})
```
```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```
重申一次，如果你使用字符串模板，那么这个限制就不存在了。

## Prop类型
到这里，我们只看到了以字符串数组形式列出的 prop：
```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```
但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型：
```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```
这不仅为你的组件提供了文档，还会在它们遇到错误的类型时从浏览器的 JavaScript 控制台提示用户。