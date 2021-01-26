# 模块化: 增强代码可读性和维护性
- 传统的网页开发转变成 Web App 开发
- 代码复杂度在逐步提高
- 分离的Js文件/模块, 便于后续代码的维护性
- 部署时希望把代码优化成几个HTTP请求

# 常见的几种模块化方式
- ES module
- CJS
- AMD

# AST 基础知识
抽象语法树(abstract syntax tree 或者缩写为 AST), 或者说 语法树(syntax tree), 是源代码的抽象语法树的树状表现形式, 这里特指编程语言的源代码, 树上的每个节点都表示源代码中的一种结构

# 动手实现一个简易的  webpack
可以将 ES6 语法转换成 ES5 的语法
- 通过   babylon 生成AST
- 通过 babel-core 将AST重新生成源码
可以分析模块之间的依赖关系
- 通过 babel-traverse 的 importDeclaration 方法获取依赖属性
生成的JS文件可以在浏览器中运行

## 一个最简单的 loader 代码结构
定义: loader 只是一个导出为函数的JavaScript模块
```js
module.exports = function(source){
    return source 
};
```
## 多 Loader 时 的执行顺序
- 多个 Loader 串行执行
- 顺序从后到前

```js
module.exports = {
    entry:'./src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
```
## 函数组合的两种情况
- Unix中的 pipline
- Compose(webpack 采取的时这种)
- compose = (f,g) => (...args) => f(g(...args));

### 通过 一个例子 验证 loader 的 执行顺序
`a-loader.js`
```js
module.exports = function(source){
    console.log('loader a is executed');
    return source
}
```
`b-loader.js`
```js
module.exports = function(source){
    console.log('loader b is executed');
    return source
}
```

## loader-runner 介绍
- 定义: loader-runner 允许你在不安装 webpack的情况下 允许 loaders
- 作用:
  - 作为 webpack 的 依赖, webpack 中使用它执行 loader
  - 进行 loader 的开发和调试

### loader-runner 的 使用
```js
import { runLoaders } from 'loader-runner'

runLoaders({
    resource: './abs/path/file.txt?query',     // String: 资源的绝对路径(可以增加查询字符串)
    loaders: [ 'abs/path/to/loader.js?query'], // String[]: loader 的绝对路径(可以增加查询字符串)
    context: {minimize: true}                  // 基础上下文之外的额外 loader 上下文
    readResource: fs.readFile.bind(fs)         // 读取资源的函数
}, function(err, result){
    // err: Error?
    // result.result: Buffer | String
})
```
### 开发一个 raw-loader
`src/raw-loader.js`
```js
module.exports = function(source){
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')         // 为了安全起见 es6模板字符串的问题
        .replace(/\u2029/g, '\\u2029');

        return `export default ${json}`
    
}
```

`src/demo.txt`
```txt
foobar
```
### 使用  loader-runner 调试 loader
run-loader.js
```js
const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');

runLoaders({
    resource: './demo.txt',
    loader: [path.resolve(__dirname, './loaders/raw-loader')],
    context:{
        minimize: true
    },
    readResource: fs.readFile.bind(fs),
    },
    (err, result) => (err ? console.error(err):console.log(result))
)
```
允许查看结果:
```bash
node run-loader.js
```


## loader的参数获取
通过 loader-utils的 getOptions 方法获取

```js
const loaderUtils = require('loader-utils')

module.exports = function(content){
    const { name } = loaderUtils.getOptions(this);
}
```
## loader异常处理
loader 内直接通过 throw 抛出

通过 this.callback 传递错误
```js
this.callback{
    err:Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    meta: any
}
```