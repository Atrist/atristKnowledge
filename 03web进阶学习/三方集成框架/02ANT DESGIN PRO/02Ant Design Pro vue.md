## 网址
https://pro.antdv.com/docs/getting-started


## 中后台管理控制台的脚手架
```bash
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 个人页
  - 个人中心
  - 个人设置
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 目录结构

```bash
├── public
│   └── logo.png             # LOGO
|   └── index.html           # Vue 入口模板
├── src
│   ├── api                  # Api ajax 等
│   ├── assets               # 本地静态资源
│   ├── config               # 项目基础配置，包含路由，全局设置
│   ├── components           # 业务通用组件
│   ├── core                 # 项目引导, 全局配置初始化，依赖包引入等
│   ├── router               # Vue-Router
│   ├── store                # Vuex
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── views                # 业务页面入口和常用模板
│   ├── App.vue              # Vue 模板入口
│   └── main.js              # Vue 入口 JS
│   └── permission.js        # 路由守卫(路由权限控制)
│   └── global.less          # 全局样式
├── tests                    # 测试工具
├── README.md
└── package.json
```

1. 特别提示：使用本项目，请仔细查阅 src/main.js 中引入哪些依赖
2. 特别提示：本项目使用了按需加载，部分组件没用到没引入到项目中，当你遇到提示无注册组件时，应当自行引入！！


## 路与和菜单
路由和菜单是组织起一个应用的关键骨架，pro 中的路由为了方便管理，使用了中心化的方式，在 `router.config.js` 统一配置和管理（另外，我们也提供了完全动态从后端加载的解决方案，可至本文末尾查看）。

### 基本结构
在这一部分，脚手架通过结合一些配置文件、基本算法及工具函数，搭建好了路由和菜单的基本框架，主要涉及以下几个模块/功能：

- 路由管理 通过约定的语法根据在 `router.config.js` 中配置路由。
- 菜单生成 根据路由配置来生成菜单。菜单项名称，嵌套路径与路由高度耦合。
- 面包屑 组件 PageHeaderWrapper 中内置的面包屑也可由脚手架提供的配置信息自动生成。


下面简单介绍下各个模块的基本思路，如果你对实现过程不感兴趣，只想了解应该怎么实现相关需求，可以直接查看需求实例。

#### 路由
目前脚手架中所有的路由都通过 `router.config.js` 来统一管理，在 vue-router 的配置中我们增加了一些参数，如 hideChildrenInMenu,meta.title,meta.icon,meta.permission，来辅助生成菜单。其中：

- `hideChildrenInMenu` 用于隐藏不需要在菜单中展示的子路由。用法可以查看 个人设置 的配置。
- `meta.title` 和 `meta.icon`分别代表生成菜单项的文本和图标。
- `meta.permission` 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示 *（默认情况下）。

#### 菜单 #
菜单根据 `router.config.js` 生成，具体逻辑在 `src/store/modules/permission.js` 中的 `actions.GenerateRoutes` 方法实现。

### 需求实例
上面对这部分的实现概要进行了介绍，接下来通过实际的案例来说明具体该怎么做。

#### 菜单跳转到外部地址
你可以直接将完整 url 填入 path 中，框架会自动处理。
```js
{
    path: 'https://pro.loacg.com/docs/getting-started',
    name: 'docs',
    meta: {
        title: '文档', 
        target: '_blank' // 打开到新窗口
   }
}
```
加好后，会默认生成相关的路由及导航。

### 新增布局
在脚手架中我们通过嵌套路由来实现布局模板。`router.config.js` 是一个数组，其中第一级数据就是我们的布局，如果你需要新增布局可以再直接增加一个新的一级数据。
```js
{
    path: '/new-router',
    name: 'newRouter',
    redirect: '/new-router/ahaha',
    component: RouteView,
    meta: { title: '仪表盘', keepAlive: true, permission: [ 'dashboard' ] },
    children: [
    {
        path: '/new-router/ahaha',
        name: 'ahaha',
        component: () => import('@/views/dashboard/Analysis'),
        meta: { title: '分析页', keepAlive: false, permission: [ 'ahaha' ] }
    }
    ]
}
```

## 布局
页面整体布局是一个产品最外层的框架结构，往往会包含导航、页脚、侧边栏、通知栏以及内容等。在页面之中，也有很多区块的布局结构。在真实项目中，页面布局通常统领整个应用的界面，有非常重要的作用。

### Ant Design Pro 的布局
在 Ant Design Pro 中，我们抽离了使用过程中的通用布局，都放在 `/layouts` 目录中，分别为：

- BasicLayout：基础页面布局，包含了头部导航，侧边栏和通知栏：
- UserLayout：抽离出用于登陆注册页面的通用布局
- PageView：基础布局，包含了面包屑，和中间内容区 (slot)
- RouterView：空布局，专门为了二级菜单内容区自定义
- BlankLayout：空白的布局

## 错误处理 #
在用户使用过程中，可能遇到各种异常情况，比如页面404，申请结果失败，请求的返回异常等等，这篇文档会按照报错形式的不同，分别介绍下相应的处理建议。

### 页面级报错
#### 应用场景
- 路由直接引导到报错页面，比如你输入的网址没有匹配到任何页面，可以由路由引导到预设的 404 页面。
- 代码控制跳转到报错页面，比如根据请求返回的数据，将没有权限的用户引导到 403 页面。
### 实现
针对页面级的报错，我们提供了两个业务组件供你选择，可以很方便地实现一个报错页面：

- Exception 异常页

    ```html
    <template>
        <exception-page type="404" />
    <template>

    <script>
    import ExceptionPage from '@/views/exception/ExceptionPage'

    export default {
    components: {
        ExceptionPage
    }
    }
    </script>
    ```
    默认支持 404，403，500 三种错误，也可自定义文案等内容。

- Result 结果页

    ```html
    <template>
    <result 
        :is-success="false"
        title="提交失败"
        description="请核对并修改以下信息后，再重新提交。"
    >
        <template slot="action">
            <a-buttion size="large" type="primary">返回修改</a-buttion>
            <a-buttion size="large" type="default">取消</a-buttion>
        </template>
    </result>
    </template>

    <script>
    import { Result } from '@/components'

    export default {
    components: {
        Result
    }
    }
    </script>
    ```
    这个组件一般用在提交结果展示，文案操作等均可自定义。

#### 应用场景
- 表单项校验报错。
- 操作反馈。
- 网络请求错误。

#### 实现
关于表单项报错，请参考 antd vue Form 中的实现。对于操作反馈和网络请求错误提示，有一些组件可能会用到：

- [Alert](https://vue.ant.design/components/alert-cn/)
- [message](https://vue.ant.design/components/message-cn/)
- [notification](https://vue.ant.design/components/notification-cn/)

在单页应用中，最常见的需求就是处理网络错误信息，我们可以利用 `message` 和 `notification` 来吐出响应的接口/网络/业务数据错误。

Ant Design Pro 封装了一个强大的 [request.js](https://github.com/sendya/ant-design-pro-vue/blob/master/src/utils/request.js) 统一处理请求，提供了默认的错误处理以及提示。
```js
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({ message: 'Forbidden', description: data.message })
    }
    if (error.response.status === 401) {
      notification.error({ message: 'Unauthorized', description: 'Authorization verification failed' })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}
```
为了方便展示 404 等页面，我们在 request.js 中封装了根据状态跳转到相应页面的逻辑,建议在线上环境中删除这个逻辑，代码如下：
```js
if (error.response.status === 401) {
    notification.error({ message: 'Unauthorized', description: 'Authorization verification failed' })
    if (token) {
        store.dispatch('Logout').then(() => {
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        })
    }
}
```
## 权限管理
权限控制是中后台系统中常见的需求之一，你可以利用我们提供的 路由权限 和 指令权限，实现一些基本的权限控制功能，脚手架中也包含了几个简单示例以提供参考。

### 路由和默认权限控制
Pro 提供了两套权限实现方案，其中默认方案为前端固定路由表和权限配置，由后端提供用户权限标识，来识别是否拥有该路由权限。另一套方案为后端提供权限和路由信息结构接口，动态生成权限和菜单。

默认实现方式是通过获取当前用户的权限去比对路由表，生成当前用户具有的权限可访问的路由表，通过 `router.addRoutes` 动态挂载到 `router` 上。

整体流程可以看这张图:

![](https://pro.antdv.com/assets/router-permission.png)


步骤如下:

1. 判断是否有 `AccessToken` 如果没有则跳转到登录页面
2. 获取用户信息和拥有权限s`tore.dispatch('GetInfo')`
用户信息获取成功后, 调用 `store.dispatch('GenerateRoutes', userInfo)` 根据获取到的用户信息构建出一个已经过滤好权限的路由结构(`src/store/modules/permission.js`)
4. 将构建的路由结构信息利用 `Vue-Router` 提供的动态增加路由方法 `router.addRoutes` 加入到路由表中
5. 加入路由表后将页面跳转到用户原始要访问的页面,如果没有 `redirect` 则进入默认页面 (`/dashboard/workplace`)

>这里可以看出把 `登录` 和 `获取用户信息` 分成了两个接口，主要目的在于当用户刷新页面时，可以根据登录时获取到的身份令牌（`cookie/token`）等，去获取用户信息，从而避免刷新需要调用登录接口
>
>Pro 实现的路由权限的控制代码都在 [@/permission.js](https://github.com/vueComponent/ant-design-vue-pro/blob/master/src/permission.js) 中，如果想修改逻辑，直接在适当的判断逻辑中 `next()` 释放钩子即可。
两套权限实现 均使用 [@/permission.js](https://github.com/vueComponent/ant-design-vue-pro/blob/master/src/permission.js) （路由守卫）来进行控制。


### 动态路由 #
但其实很多公司的业务逻辑可能并不是上面描述的简单实现方案，比如正常业务逻辑下 每个页面的信息都是动态从后端配置的，并不是像 Pro 默认的路由表那样写死在预设的。你可以在后台通过一个 tree 或者其它展现形式给每一个页面动态配置权限，之后将这份路由表存储到后端。

>由 `角色关联` 到多个 权限(菜单) 。 角色 1 对多权限，用户 1 对多角色 或 用户 1 对 1 角色；

当用户登录后得到 roles，前端根据 roles 去向后端请求可访问的路由表，从而动态生成可访问页面，之后就是 `router.addRoutes` 动态挂载到 router 上，你会发现原来是相同的，万变不离其宗。

```js
// 后端返回的 JSON 动态路由结构
const servicePermissionMap = {
"message": "",
"result": [
 {
   "title": "首页",
   "key": "",
   "name": "index",
   "component": "BasicLayout",
   "redirect": "/dashboard/workplace",
   "children": [
     {
       "title": "仪表盘",
       "key": "dashboard",
       "component": "RouteView",
       "icon": "dashboard",
       "children": [
         {
           "title": "分析页",
           "key": "analysis",
           "icon": ""
         },
         ...
       ]
     },
     {
       "title": "系统管理",
       "key": "system",
       "component": "PageView",
       "icon": "setting",
       "children": [
         {
           "title": "用户管理",
           "key": "userList"
         },
         ...
       ]
     }
   ]
 }
],
"status": 200,
"timestamp": 1534844188679
}
```

```js
import { axios } from '@/utils/request'
// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'


// 前端路由映射表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,

  // 你需要动态引入的页面组件
  analysis: () => import('@/views/dashboard/Analysis'),
  workplace: () => import('@/views/dashboard/Workplace'),
  monitor: () => import('@/views/dashboard/Monitor')
  // ...more
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件
      component: constantRouterComponents[item.component || item.key],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: { title: item.title, icon: item.icon || undefined, permission: item.key && [ item.key ] || null }
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}
```


### 指令权限
Pro 封装了一个非常方便实现按钮级别权限的自定义指令。 [v-action](https://github.com/vueComponent/ant-design-vue-pro/blob/master/src/core/directives/action.js)

使用
```html
<!-- eg: 当前页面为 dashboard -->

<template>
    <!-- 校验是否有 dashboard 权限下的 add 操作权限 -->
    <a-button v-action:add >添加用户</a-button>

    <!-- 校验是否有 dashboard 权限下的 del 操作权限 -->
    <a-button v-action:del>删除用户</a-button>

    <!-- 校验是否有 dashboard 权限下的 edit 操作权限 -->
    <a v-action:edit @click="edit(record)">修改</a>
</template>
```

>需要注意的是，指令权限默认从 store 中获取当前已经登陆的用户的角色和权限信息进行比对，所以也要对指令权限的获取和校验 Action 权限部分进行自定义。

在某些情况下，不适合使用 `v-action`，例如 Tab 组件，只能通过手动设置 `v-if` 来实现。

这时候，Pro 为其提供了原始 v-if 级别的权限判断。
```html
<template>
    <a-tabs>
        <a-tab-pane v-if="$auth('dashboard.add')" tab="Tab 1">
            some context..
        </a-tab-pane>
        <a-tab-pane v-if="$auth('dashboard.del')" tab="Tab 2">
            some context..
        </a-tab-pane>
        <a-tab-pane v-if="$auth('dashboard.edit')" tab="Tab 3">
            some context..
        </a-tab-pane>
    </a-tabs>
</template>
```
>以上代码的 if 判断会检查，当前登录用户是否存在 `dashboard` 下的 `add / del / edit` 权限

实现思路：

在 Vue 初始化时，[@/utils/helper/permission.js](https://github.com/vueComponent/ant-design-vue-pro/blob/master/src/core/permission/permission.js#L17) 作为插件注册到 Vue 原型链上，在 Vue 实例中就可以用 `this.$auth()` 方法进行权限判断。 当然这里也要对权限的获取和校验 Action 权限部分进行自定义。