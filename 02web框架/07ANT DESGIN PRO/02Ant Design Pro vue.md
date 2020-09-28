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