# 资料来源
- [webpack的中文文档](https://www.webpackjs.com/concepts/)

# 介绍和安装

webpack以模块化来组织文件

## 查看node版本
node -v
## 安装
```js
npm install webpack -g 
npm install webpack-cli -h
```
##本地安装
```js
npm install webpack --save-dev 
npm install webpack-cli --save-dev 
```

# 使用


## 入口文件
## 出口文件
## loader
webpack 只能理解 JavaScript 和 JSON 文件，loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。


在更高层面，在 webpack 的配置中 loader 有两个属性：
- test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
- use 属性，表示进行转换时，应该使用哪个 loader。

#### 使用
1. 通过npm安装需要使用的loader
    文件不同，需要安装不同的loader
2. 在webpack.config.js中的modules关键字下配置

大部分的loader用法都可以在webpack官方找到

#### css文件处理
npm install --save-dev css-loader

部分代码
```js
module:{
    reules:[
    {
        test:/\.css$/,
        // css--loader只负责将css文件进行加载
        // style-loader负责将样式添加到DOM中
        // 使用多个loader时，是从右向左
        use:['style-loader','css-loader']
    }
    ]
}
```
## plugin插件

plugin是插件，它是对webpack本身的扩展，是一个扩展器


1. 通过npm安装需要使用的plugins
2. 在webpack.config.js中的plugins中配置插件



## 搭建本地服务器
webpack提供一个可选的本地开发服务器，这个本地服务器基于nodejs搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果

不过它是一个单独的模块，在webpack中使用之前需要先安装它
npm install --save-dev webpack-dev-server

devserver也是作为webpack的一个选项，选项本身可以设置如下属性：
- contentBase：为哪一个文件夹提供本地服务，默认是根文件夹
- port:端口号  默认端口为8080
- inline；页面实实时刷新
- HistoryApiFallback:在SPA页面中，依赖HTML5的History模式

## webpack配置文件的分离

便于生产环境和开发环境

需要使用到的工具
npm install webpack-merge --save-dev

指定配置文件

webpack --config  path(配置文件路径)