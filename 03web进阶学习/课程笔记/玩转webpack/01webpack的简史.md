# 为什么需要构建工具?
- 转换ES6语法
- 转换JSX
- CSS 前缀补全/预处理器
- 压缩混淆
- 图片压缩

# 前端构建演变之路
ant + YUI Toll ---> grunt ---> fis3 / gulp --> rollup/webpack/parcel

# 为什么选择webpack
| <br/>        | webpack        | grunt       | gulp        |
| ------------ | -------------- | ----------- | ----------- |
| 定义         | Module bundler | Task runner | Task runner |
| 语言         | Javascript     | Node.js     | Node.js     |
| 发布树见     | 2012.3         | 2012.6      | 2013.7      |
| Github stars | 40766          | 11796       | 29427       |
| 周下载量     | 3385392        | 478879      | 816228      |

- 社区生态丰富
- 配置灵活和插件化扩展
- 官方更新迭代速度快

# 初始webpack
## 配置文件名称
webpack默认配置文件: `webpack.config.js`

可以通过 webpack -- config 指定配置文件


## webpack配置组成
```js
module.exports = {
    entry:'./src/index.js',  //--- 打包的入口文件
    output:'./dist/main.js',  //--- 打包的输出
    mode:'production',   //--- 环境
    module:{
        rules:[    //--- loader配置
            {test:/\.txt$/, use:'raw-loader'}
        ]
    },
    plugins:[    //--- 插件配置
        new HtmlwebpackPlugin({
            template:'./src/index.html'
        })
    ]

}
```

## 零配置 webpack 包含哪些内容
```js
module.exports = {
    entry:'./src/index.js',  //--- 1 指定默认的entry 为 './src/index.js'
    output:'./dist/main.js',  //---2. 指定默认的output为 './dist/main.js'
    mode:'production',   //--- 环境
    module:{
        rules:[    //--- loader配置
            {test:/\.txt$/, use:'raw-loader'}
        ]
    },
    plugins:[    //--- 插件配置
        new HtmlwebpackPlugin({
            template:'./src/index.html'
        })
    ]

}
```
# 环境搭建
## nodejs 和 npm
- nodejs 和 npm(建议按照官网搭建)
- 检查是否安装成功: node -v, npm -v
## webpack 和 webpack-cli
创建空目录和 package.json
```bash
mkdir my-project
cd my-project
npm init -y
```
安装`webpack`和`webpack-cli`
```bash
npm install webpack webpack-cli --save-dev
```
检查是否安装成功
```bash
./node_modules/.bin/webpack -v
```
# 一个最简单的例子
webpack脚本
```js
const path = require('path');

module.exports ={
    mode:'production',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    mode:'production'
}
```
构建结果
```html
<!doctype html>
<html>
    <head>
        <title>webpack 示意例子</title>
    </head>
    <body>
        <script src="dist/bundle.js"></script>
    </body>
</html>
```

## 通过 npm script 运行 webpack
```json
{
    "name":"hello-webpack",
    "version":"1.0.0",
    "description":"Hello webpack",
    "main":"index.js",          
    "scripts":{
        "build":"webpack"
    },
    "keyword":[],
    "author":"",
    "license":"ISC"
}
```
通过 `npm run build` 运行构建

原理: 模块局部安装会在 `node_modules/.bin` 目录创建软链接


