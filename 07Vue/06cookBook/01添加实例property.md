# 添加实例 property
# 基本的示例

你可能会在很多组件里用到数据/实用工具，但是不想**污染全局作用域**。这种情况下，你可以通过在原型上定义它们使其在每个 Vue 的实例中可用。

```js
Vue.prototype.$appName = 'My App'
```
这样 `$appName` 就在所有的 Vue 实例中可用了，甚至在实例被创建之前就可以。如果我们运行：
```js
new Vue({
  beforeCreate: function () {
    console.log(this.$appName)
  }
})
```
则控制台会打印出 `My App`。就这么简单！

# 为实例 property 设置作用域的重要性
你可能会好奇：

>**“为什么 `appName` 要以 `$` 开头？这很重要吗？它会怎样？”**

这里没有什么魔法。`$` 是在 `Vue` 所有实例中都可用的 property 的一个简单约定。这样做会避免和已被定义的数据、方法、计算属性产生冲突。