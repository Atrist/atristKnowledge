# 通过Vue2 和 firebase构建一个身份验证系统
- [原教程地址:](https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c)

## 准备
1. 安装**Vue Cli**
    ```
    npm install -g @vue/cli
    ```
2. 创建一个新的工程
    ```
    vue create vue-firebase-project
    ```
3. 接下来：
    - Manually select features
    - 选择 router
## 编写代码
#### 部分逻辑：
我们的app，包含了三个视图
- 登录视图
  - 不需要验证
- 注册视图
  - 不需要验证
- 主页
  - 需要验证
- 成功登录后或创建新帐户后，我们将被重定向到应用程序的经过身份验证的部分，即“主视图”。
### 创建一个新的视图文件login.vue，在src/views
文件内容如下：
```html
<template>
<div class="login">
    <input type="text" placeholder="Email"><br>
    <input type="password" placeholder="Password"><br>
    <button>Connection</button>
    <p>You don't have an account ? You can create one</p>
</div>
</template>
<script>
export default {
    name:'login',
    data(){
        return {};
    },
    methods:{}
}
</script>
<style scoped>
</style>
```

### 配置路由文件,src/router/index.js
最后，类似如下
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'  //login.vue所在文件目录
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})
export default router
```


## 安装FireBase模块
- npm install --save firebase


