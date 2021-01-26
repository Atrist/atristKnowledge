# 自动清理构建目录
避免构建前每次都需要手动删除  dist

使用 `clean-webpack-plugin `
- 默认会删除 output 指定得输出目录


```diff
module.exports = {
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output:{ 
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },  
    mode:'development',
    plugins:[
+       new CleanWebpackPlugin()
   ],
}
```
# PostCSS 插件 autoprefixer 自动补齐 CSS3前缀
使用 autoprefixer 插件

根据 Can I Use 规则

```diff
module.exports = {
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output:{ 
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },  
    mode:'development',
    module:{
        rules:[
            {
                test:/.\less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader',
+                    {
+                        loader:'postcss-loader',
+                        options:{
+                            plugins:()=>[
+                                require('autoprefixer')({
+                                    browsers:["last 2 version",">1%","ios7"]
+                                })
+                            ]
+                        }
+                    }
                ]
            }
        ]
    }
}
```
# 移动端css px自动转换成 rem
## rem 是什么?
W3C 对 rem 的定义: font-size of the root element

rem 和 px 的对比:
- rem是相对单位
- px是绝对单位

## 使用 px2rem-loader
页面渲染时计算根元素的font-size值

- 可以使用手淘的lib-flexible库
- https://github.com/amfe/lib-flexible

```diff
module.exports = {
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output:{ 
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },  
    mode:'development',
    module:{
        rules:[
            {
                test:/.\less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader',
+                    {
+                        loader:'px2rem-loader',
+                        options:{
+                            remUint:75,
+                            remPrecision:9
+                        }
+                    }
                ]
            }
        ]
    }
}
```

# 资源内联的意义
### 代码层面
- 页面框架的初始化脚本
- 上报相关打点
- css 内联避免页面闪动

### 请求层面: 减少HTTP网络请求数
- 小图片或者字体内联(url-loader)

## HTML 和 JS 内联
### raw-loader  内联HTML
```html
<script>${require('raw-loader!babel-loader!./meta.html)}</script>
```
### raw-loader 内联JS
```html
<script>${require('raw-loader!babel-loader!../node_modules/lib_flexible')}</script>
```
## CSS 内联
### 方案一: 借助 style-loader
```diff
module.exports = {
    module:{
        rules:{
            [
                test:/\.scss$/,
                use:[
                    {
                        loader:'style-loader',
                        options:{
                            insertAt:'top',  // 样式插入到 <head>
                            singleton: true, // 将所有的style标签合并成一个
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            ],
        },
    }
}
```
### 方案二: html-inline-css-webpack-plugin
```diff
module.exports = {
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output:{ 
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },  
    mode:'development',
    plugins:[
+       new CleanWebpackPlugin()
   ],
}
```
# 多页面应用(MPA)概念

每一次页面跳转的时候, 后台服务器都会给返回一个新的html文档, 这种类型的网站也就是多页网站, 也叫做多页应用

## 多页面打包基本思路
每个页面对应一个 entry , 一个 html-webpack-plugin

缺点: 每次新增或删除页面需要改 `webpack` 配置
```js
modules.exports={
    entry:{
        index:'index.js',
        search:'./src/search.js'
    }
}
```
## 多页面打包通用方案
动态获取 entry 和 设置 html-webpack-plugin 数量

利用 `glob.sync`
```js
entry: glob.sync(path.join(__dirname,'./src/*/index.js')),
```
```js
modules.exports={
    entry:{
        index:'./src/index/index.js',
        search:'./src/search/index.js'
    }
}
```
# 使用 source map
作用: 通过 source map 定位到源代码
- source map科普文: http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html

开发环境开启, 线上环境关闭
- 线上排查问题的时候可以将 sourcemap 上传到错误监控系统

## source map 关键字
eval: 使用 eval包括模块代码

source map: 产生 .map文件

cheap: 不包含列信息

inline: 将 .map 作为 DataURI 嵌入, 不单独生成 .map 文件

module: 包含 loader 的 sourcemap

## source map类型
| devtool                      | 首次构建 | 二次构建 | 是否适合生产环境 | 可以定位的代码                     |
| ---------------------------- | -------- | -------- | ---------------- | ---------------------------------- |
| (none)                       | +++      | +++      | yes              | 最终输出的代码                     |
| eval                         | +++      | +++      | no               | webpack生成的代码(一个个的模块)    |
| cheap-eval-source-map        | +        | ++       | no               | 经过loader转换后的代码(只能看到行) |
| cheap-module-evel-source-map | +        | ++       | no               | 源代码(只能看到行)                 |
| eval-source-map              | --       | +        | no               | 源代码                             |
| cheap-source-map             | +        | O        | yes              | 经过loader转换后的代码(只能看到行) |
| cheap-module-source-map      | O        | -        | yes              | 源代码(只能看到行)                 |
| inline-cheap-source-map      | +        | O        | no               | 经过loader转换后的代码(只能看到行) |
| inline-cheap-module-map      | o        | -        | no               | 源代码(只能看到行)                 |
| source-map                   | --       | --       | yes              | 源代码                             |
| inline-source-map            | --       | --       | no               | 源代码                             |
| hidden-source-map            | --       | --       | yes              | 源代码                             |


# 提取页面公共资源
## 基础库分离
- 思路: 将 react, react-dom 基础包通过cdn引入, 不打入bundle中
- 方法: 使用 html-webpack-externals-plugin


## 利用 SplitChunksPlugin 进行公共脚本分离
Webpack4内置的, 代替CommonsChunkPlugin插件

chunks参数说明
- async 异步引入的库进行分离(默认)
- initial 同步引入的库进行分离
- all 所有引入的库进行分离(推荐)

```js
module.exports ={
    optimization:{
        splitChunks:{
            chunks:'async',
            minSize:30000,
            maxSize:0,
            minChunks:1,
            maxAsyncRequest:5,
            maxInitialRequest:3,
            automaticNameDelimiter:'~',
            name:true,
            cacheGroups:{
                vendors:{
                    test: /[\\/]node_modules[\\/]/,
                    priority:-10
                }
            }
        }
    }
}
```
### 利用SplitChunksPlugin分离基础包
test: 匹配出需要分离的包
```js
module.exports ={
    optimization:{
        splitChunks:{
            cacheGroups:{
                commons:{
                    test:/(react|react-dom)/,
                    name:'vendors',
                    chunks:'all',
                }        
            }
        }
    }
}
```
# tree shaking (摇树优化)
概念: 1个模块可能有多个方法, 只要其中的某个方法使用到了, 则整个文件都会被达到 bundle里面去, tree shaking 就是只把用到的方法打入 bundle, 没用到的方法会在 uglify阶段被擦掉

使用: webpack默认支持, 在.babelrc里设置modules:false 即可
- production mode的情况下默认开启

要求: 必须是ES6的语法, CJS的方式不支持

## DCE(Elimination)
- 代码不会被执行, 不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量(只写不读)

## Tree-shaking原理
利用ES6模块的特点
- 只能作为模块顶层的语句出现
- import的模块名只能是字符串常量
- import binding 是 immutable的

代码擦除: uglify阶段删除无用代码


## 模块转换分析
结论
- 被`webpack`转换后的模块会带上一层包裹
- `import` 会转换成 `_webpack_require`

### 进一步分析 webpack 的 模块机制
分析:
- 打包出来的是一个 IIFE(匿名闭包)
- modules是一个数组, 每一项是一个模块初始化函数
- _webpack_require 用来加载模块, 返回 module.exports
- 通过 WEBPACK_REQUIRE_METHOD(0) 启动程序

### scope hoisting 原理
原理: 将所有模块的代码按照引用顺序放在一个函数作用域里, 然后适当的重命名一些变量以防止变量名冲突

对比: 通过 scope hoisting 可以减少函数声明代码和内存开销

### scope hoisting 使用
webpack mode 为 production 默认开启

必须式 ES6语法, CJS不支持
```js
module.exports = {
    entry:{
        app:'./src/app.js',
        search:'./src/search.js'
    },
    output:{
        filename: '[name][chunkhash:8].js',
        path:__dirname+'/dist'
    },
    plugin:[
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
```
## 代码分割的意义
对于大的web应用来讲, 将所有的代码都放在一个文件中显然是不够有效的, 特别是当你的某些代码块是在某些特殊的时候才会被使用到. webpack有一个功能就是将你的代码库分割成 chunks(语块), 当代码运行到需要它们的时候再进行加载

适用的场景:
- 抽离相同代码到一个共享块
- 脚本懒加载, 使得初始下载的代码更小

### 懒加载JS脚本的方式
CommonJS: require.ensure

ES6: 动态 import (目前还没有原生支持, 需要 babel 转换)

### 如何使用动态 import?
安装 bable 插件
```bash
npm install @babel/plugin-syntax-dynamic-import-save-dev
```
ES6: 动态 import (目前还没有原生支持, 需要 babel 转换)
```js
{
    "plugins":["@babel/plugin-syntax-dynamic-import"],
}
```
## 行业里面优秀的ESLint规范实践
Airbnb: eslint-config-airbnb, eslint-config-airbnb-base

腾讯:
- alloyteam团队 eslint-cofnig-allloy
- ivweb团队 eslint-config-ivweb

## 制定团队的ESLint规范
- 不重复造轮子, 基于 eslint:recommend 配置并改进
- 能够帮助发现代码错误的规则, 全部开启
- 帮助保持团队的代码风格统一, 而不是限制开发体验

## ESLint 如何执行落地?
1. 和 CI/CD 系统集成
2. 和webpack集成

### 方案二: webpack 与 ESLint集成
使用 eslint-loader, 构建时检查JS规范
```js
module.exports = {
    module:{
        rules:[
            {
                text:/\.js$/,
                exclude:/node_modules/,
                use:[
                    "babel-loader",
                    "eslint-loader"
                ]
            }
        ]
    }
}
```
## webpack 打包库和组件
webpack除了可以用来打包应用, 也可以用来打包js库

实现一个大整数加法库的打包
- 需要打包压缩版和非压缩版本
- 支持 AMD/CJS/ESM 模块引入

### 库的目录结构和打包要求
#### 打包输出的库名称:
- 未压缩版 large-number.js
- 压缩版 large-number.min.js

```bash
+ |-/dist
+  | -large-number.js
+  | -large-number.min.js
+ |-webpack.config.js
+ |-package.json
+ |-index.js
+ |-/src
+  | index.js
```
#### 支持的使用方式
支持ES module
```js
import * as largeNumber from 'large-number';
// ...
largeNumber.add('999','1')
```
支持 CJS
```js
const largeNumbers = require('large-number');
//...
largeNumber.add('999','1');
```
支持AMD
```js
require(['large-number'],function(large-number){
    //...
    largeNumber.add('999','1');
})
```
可以直接通过script引入
```js
<script src="https://unpkg.com/larg-number"></script>
```
### 如何将库暴露出去
library: 指定库的全局变量

libraryTarget: 支持库引入的方式
```js
module.exports = {
    mode:'production',
    entry:{
        'larger-number':"./src/index.js',
        'larger-number.min':'./src/index.js'
    },
    output:{
        filename:'[name].js'
        library:'largeNumber',
        libraryExport:'default',
        libraryTarget:'umd'
    }
};
```
### 如何指对 .min 压缩
通过 include 设置 只压缩 min.js 结尾的文件
```js
module.exports = {
    mode:'node',
    entry:{
        'larger-number':"./src/index.js',
        'larger-number.min':'./src/index.js'
    },
    output:{
        filename:'[name].js'
        library:'largeNumber',
        libraryExport:'default',
        libraryTarget:'umd'
    },
    optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin({
                include:/\.min\.js$/,
            }),
        ]
    }
};
```
### 设置入口文件
package.json 的 main 字段 为 index.js
```js
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./dist/large-number.min.js')
}else{
    module.exports = require('./dist/large-number.js')
}
```

## 服务端渲染 (SSR) 是什么?
渲染: HTML + CSS + JS + Data  -> 渲染后的HTML

服务端:
- 所有模板等资源都存储再服务端
- 内网机器拉取数据更快
- 一个HTML返回所有数据

### 客服端渲染 vs 服务端渲染
| <p></p>  | 客户端渲染                                   | 服务端渲染                                   |
| -------- | -------------------------------------------- | -------------------------------------------- |
| 请求     | 多个请求(HTML,数据等)                        | 1个请求                                      |
| 加载过程 | HTML&数据串行加载                            | 1个请求返回HTML&数据                         |
| 渲染     | 前端渲染                                     | 服务端渲染                                   |
| 可交互   | 图片等静态资源加载完成, JS逻辑执行完成可交互 | 图片等静态资源加载完成, JS逻辑执行完成可交互 |

总结: 服务端渲染(SSR)的核心是减少请求

### SSR的优势
- 减少白屏时间
- 对于SEO友好

### SSR 代码实现思路
服务端
- 使用 react-dom/server 的 renderToString方法将React组件渲染成字符串
- 服务端路由返回对应的模板

客户端
- 打包出针对服务端的组件

### webpack ssr打包存在的问题
浏览器的全局变量(Node.js 中 没有 document, window)
- 组件适配: 将不兼容的组件根据打包环境进行适配
- 请求适配: 将  fetch 或者 ajax 发送请求的写法改成 isomorphic-fetch 或者 axios

样式问题(Node.js 无法解析  css)
- 方案一: 服务端打包通过 ignore-loader 忽略掉 css的解析
- 方案二: 将 style-loader 替换成 isomorphic-style-loader

### 如何解决方式不显示的问题
- 使用打包出来的浏览器端 html 为模板
- 设置占位符, 动态插入组件

### 首屏数据如何处理
- 服务端获取数据
- 替换占位符

## 当前构建时的日志显示
展示一大堆日志, 很多并不需要开发者关注

### 统计信息 stats
| Preset        | Alternatvie | Description                    |
| ------------- | ----------- | ------------------------------ |
| "errors-only" | none        | 只在发生错误时输出             |
| "minimal"     | none        | 只在发生错误或有新的编译时输出 |
| "none"        | false       | 没有输出                       |
| "normal"      | true        | 标准输出                       |
| "verbose"     | none        | 全部输出                       |

### 如何优化命令行的构建日志
使用 friendly-error-webpack-plugin
- success: 构建成功的日志提示
- warning: 构建警告的日志提示
- error: 构建报错的日志提示

stats 设置成 errors-only
```js
module.exports={
    entry:{
        app:'./src/app.js',
        search:'./src/search.js'
    },
    output:{
        filename:'[name][chunkhash:8].js',
        path:__dirname+'/dist'
    },
    plugins:[
        new FriendlyErrorsWebpack()
    ],
    stats:'error-only'
}
```
## 如何判断构建是否成功?
在CI/CD的pipline或者发布系统需要知道当前构建状态

每次构建完成输入 echo $? 获取错误码

### 构建异常和中断处理
webpack之前的版本构建失败不会抛出错误码(error code)

Node.js 中的 process.exit 规范
- 0 表示成功完成, 回调函数中, err 为 null
- 非 0 表示执行失败, 回调函数中,err 不为 null, err.code就是传给exit的数字

### 如何主动捕获并处理构建错误?
compiler 在每次构建结束后会触发 done 这个 hook

process.exit 主动处理构建报错

```js
plugins:[
    function(){
        this.hook.done.tap('stats')=>{
            if(stats.compilation.error&& stats.compilation.errors.length && process.argv.indexOf('--watch') == -1){
                console.log('build error');
                process.exit(1);
            }
        }
    }
]
```