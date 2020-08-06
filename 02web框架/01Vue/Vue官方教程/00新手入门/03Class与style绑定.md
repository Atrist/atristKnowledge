# class与Style绑定
## 绑定HTML Class
### 对象语法
我们可以传给`v-bind:class`一个对象，以动态地切换class：
```html
<div v-bind:class="{ active: isActive }"></div>
```
上面的语法表示`active`这个class存在与否将取决于数据属性`isActive`的`truthiness`.

你可以在对象中传入更多属性来动态切换多个class。此外，`v-bind:class`指令也可以与普通的class属性共存。
```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```
如下的data属性：
```js
data: {
  isActive: true,
  hasError: false
}
```
结果渲染为：
```html
<div class="static active"></div>
```
当 `isActive` 或者 `hasError` 变化时，`class` 列表将相应地更新。例如，如果 `hasError` 的值为 `true`，`class` 列表将变为 `"static active text-danger"`。

绑定的数据对象不必内联定义在模板里：
```html
<div v-bind:class="classObject"></>
```
```js
data:{
    classObject:{
        active:true,'tetx-danger',false
    }
}
```
渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的**计算属性**
```html
<div v-bind:class="classObject"></div>
```
```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 数组语法
```html
<div v-bind:class="[activeClass, errorClass]"></div>
```
```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
渲染为
```html
<div v-bind:class="[activeClass, errorClass]"></div>
```
如果你也想根据条件切换列表中的 class，可以用三元表达式：
```
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```
这样写将始终添加 errorClass，但是只有在 isActive 是` truthy` 时才添加 activeClass。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：
```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```


## 绑定内联样式
### 对象语法
`v-bind:style`的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。

CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```
直接绑定到一个样式对象通常更好，这会让模板更清晰：
```html
<div v-bind:style="styleObject"></div>
```
```js
data:{
    styleObject:{
        color:red,
        fontSize:'13px'
    }
}
```
同样的，对象语法常常结合返回对象的计算属性使用。

### 数组语法
`v-bind:style`的数组语法可以将多个样式对象应用到同一个元素上
```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```
### 自动添加前缀
当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS 属性时，如 `transform`，`Vue.js` 会自动侦测并添加相应的前缀。
### 多重值
```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。