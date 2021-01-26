## 开启 从 webpack 命令行说起
通过 npm scripts 运行 webpack
- 开发环境: npm run dev
- 生产环境: npm run build

通过 webpack 直接运行
- webpack entry.js bundle.js

### 查找 webpack 入口文件
在命令行运行以上命令后, npm 会 让命令行工具进入 `node_modlues\.bin` 目录查找是否存在 webpack.sh 或者 webpack.cmd文件, 如果存在, 就执行, 不存在, 就抛出错误

实际的入口文件是: `node_modules\webpack\bin\webpack.js`

## 分析 webpack 的 入口文件: webpack.js
```js
process.exitCode = 0                            // 1. 正常执行返回
const runCommand = (command, args) => {};       // 2. 运行某个命令
const isInstalled = packageName => {}           // 3. 判断某个包是否安装
const CLIs = [...]                              // 4. webpack 可用的 CLI: webpack-cli 和 webpack-command
const installedClis = CLIs.filter(cil => cli.installed)  // 5. 判断是否两个CLi是否安装了
if(installedClis.length === 0 ) {}                       // 6. 根据安装数量进行处理
else if(installedClis.length === 1) {}
else{}
```
## 启动后的结果
webpack 最终找到 webpack-cli(webpack-command)这个npm包, 并且执行CLi


## webpack-cli 做的事情
1. 引入 yargs, 对命令进行定制
2. 分析命令行参数, 对各个参数进行转换, 组成编译配置项
3. 引用webpack, 根据配置项进行编译和构建

### 从 NON_COMPILATION_CMD 分析出不需要编译的命令
webpack-cli 处理不需要经过编译的命令
```js
const { NON_COMPILATION_ARGS }  = require('./utils/constants');

const NON_COMPILATION_CMD = process.argv.find(arg =>{
    if(arg === 'serve'){
        global.precess.argv = global.process.filter(a=>a!=='serve');
        process.argv = global.process.argv;
    }
    return NON_COMPILATION_ARGS.find(a => a === arg);
});

if(NON_COMPILATION_CMD){
    return require('./utils/prompt-command')(NON_COMPILATION_CMD,...process.argv); 
}
```
### NON_COMPILATION_ARGS的内容
webpack-cli提供的不需要编译的命令
```js
const NON_COMPILATION_ARGS = [
    "init",                 // 创建一份webpack配置文件    
    "migrate",              // 进行 webpack 版本迁移
    "add",                  // 往 webpack配置文件中增加属性
    "remove",               // 往 webpack配置文件中删除属性
    "serve",                // 运行 webpack-serve
    "generate-loader",      // 生成 webpack loader 代码
    "generate-plugin",      // 生成 webpack  plugin代码
    "info"                  // 返回与本能地环境相关的一些信息
]
```
### webpack-cli 使用 args 分析
参数分组(config/config-args.js), 将命令划分为9类
- Config options: 配置相关从参数(文件名称, 运行环境等)
- Basic options: 基础参数(entry设置, debug模式设置, watch监听设置, devtool设置)
- Module options: 模块参数, 给loader设置扩展
- Output options: 输出参数(输出路径, 输出文件名称)
- Advanced options: 高级用法(记录设置, 缓存设置, 监听频率, bail等)
- Resolving options: 解析参数(alias 和 解析文件后缀设置)
- Optimizing options: 优化参数
- Stats options:统计参数
- options:通用参数(帮助命令, 版本信息等)

## webpack-cli 执行的结果
webpack-cli对配置文件和命令行参数进行转换最终生成配置选项参数  options

最终会根据配置参数实例化 `webpack` 对象, 然后执行构建流程

## webpack的本质
webpack 可以将其理解是一种基于事件流的编程范例, 一系列的插件运行

### Tapable 是什么?
Tapable是一个类似于Node.js的EventEmitter的库, 主要是控制钩子函数的发布与订阅, 控制着 webpack的插件系统

Tapable库暴露了很多Hook(钩子)类, 为插件提供挂载的钩子

```js
const {
    SyncHook,                   // 同步钩子
    SyncBailHook,               // 同步熔断钩子
    SyncWaterfallHook,          // 同步流水钩子
    AsyncParallelHook,          // 异步并发钩子
    AsyncSeriesHook,            // 异步并发熔断钩子
    AsyncSeriesBailHook,        // 异步串行熔断钩子
    AsyncSeriesWaterfallHook,   // 异步串行流水钩子
} = require('tapable')
```
### Tapable hooks 类型
| type          | function                                                   |
| ------------- | ---------------------------------------------------------- |
| Hook          | 所有钩子的后缀                                             |
| Waterfall     | 同步方法, 但是它会传值给下一个函数                         |
| Bail          | 熔断: 当化函数有任何返回值, 就会在当前执行函数停止         |
| Loop          | 监听函数返回 true表示继续循环, 返回 undefine 表示 结束循环 |
| Sync          | 同步方法                                                   |
| AsyncSeries   | 异步串行钩子                                               |
| AsyncParallel | 异步并行钩子                                               |

### Tapable 的使用 -new Hook 新建钩子
Tapable 暴露出来的都是类方法, new 一个类方法获得我们需要的钩子

class接受组参数 options, 非必传. 类方法会根据传参, 接受同样数量的参数
```js
const hook1 = new SyncHook(['arg1','arg2','arg3']);
```
### Tapable 的使用 -- 钩子的绑定与执行
Tabpack 提供了同步&异步绑定钩子的方法, 并且他们都有绑定事件和执行事件对应的方法
| Async                         | Sync       |
| ----------------------------- | ---------- |
| 绑定: tapAsync/tapPromise/tap | 绑定: tap  |
| 执行: callAsync/promise       | 执行: call |

### Tapable的使用 --hook基本用法示例
```js
const hook1 = new SyncHook(['arg1','arg2','arg3']);

// 绑定事件到 webpack 事件流
hook1.tap('hook1',(arg1,arg2,arg3)=> console.log(arg1,arg2,arg3))  // 1,2,3

// 执行绑定的事件
hook1.call(1,2,3)
```

## Tapable 的 使用 -- 实例例子演示
1. 定义一个 Car方法, 在内部hooks上新建钩子. 分别是同步钩子  `accelerate`, `brake(accelerate接受一个参数)`, 异步钩子 `calculateRoutes`
2. 使用钩子对应的绑定和执行方法
3. `calculateRoutes` 使用 `tapPromise` 可以返回一个 `promise` 对象


## Tapable 是 如何 和 webpack 联系起来的?
```js
if(Array.isArray(options)){
    compiler = new MultiCompiler(options.map(options => webpack(options)));
}else if(typeof options === 'object'){
    options = new WebpackOptionsDefaulter().process(options);
    compiler = new Compiler(options.context);
    complier.options = options;
    new NodeEnvironmentPlugin().apply(compiler);
    if(options.plugin && Array.isArray(options.plugins)){
        for(const plugin of options.plugins){
            if(typeof plugin === 'function'){
                plugin.call(compiler,compiler)
            }else{
                plugin.apply(compiler)
            }
        }
    }
    compiler.hooks.environment.call()
    compiler.hooks.afterEnvironment.call()
    compiler.options = new WebpackOptionsApply().process(options, complier) 
}
```
### 模拟 Compiler.js
```js
module.exports = class Compiler{
    constructor(){
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(['source','target','routesList'])
        }
    }
    run(){
        this.accelerate(10)
        this.break()
        this.calculateRoutes('Async','hook','demo')
    }
    accelerate(speed){
        this.hooks.accelerate.call(speed)
    }
    break(){
        this.hooks.break.call()
    }
    calculateRoutes(){
        this.hooks.calculateRoutes.promise(..arguments).then(()=>{},err=>{
            console.log(err)
        });
    }
}
```
### 插件 my-plugin.js
```js
const Compiler = require('./Compiler')

class MyPlugin{
    constructor(){
    }
    apply(compiler){
        compiler.hooks.brake.tap('WaringLampPlugin',()=>console.log('WarningLampPlugin'));
        compiler.hooks.accelerate.tap('LoggerPlugin',newSpeed=>console.log('Accelerating to `${newSpeed}`'));
        complier.hooks.calculateRoutes.tapPromise('calculateRoutes tapAsync',(source,target,routesList)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log('tapPromise to `${source} ${target} ${routesList}`')
                    resolve()
                },1000)
            })
        })

    }
}
```
### 模拟插件执行
```js
const myPlugin = new MyPlugin();

const options = {
    plugins: [myPlugin]
}

const compiler = new Compiler()

for(const plugin of options.plugins){
    if(typeof plugin === 'function'){
        plugin.call(complier, compiler)
    }else{
        plugin.apply(compiler)
    }
}
compiler.run()
```

## webpack 流程篇
webpack的编译都按照下面的钩子调用顺序执行
```bash
entry-option    初始化  option
    |
    |
    |
    V
   run          开始 编译
    |
    |
    |
    V
   make         从 entry开始递归的分析依赖, 对每个依赖模块进行build
    |
    |
    |
    V
before-resolve  对模块位置进行解析
    |
    |
    |
    V
build-module    开始构建某个模块
    |
    |
    |
    V
normal-module-loader  将loader加载完成的module进行编译, 生成AST树
    |
    |
    |
    V
   program       遍历AST, 当遇到 require等一些调用表达式时,收集依赖
    |
    |
    |
    V
   seal           所有依赖 build完成, 开始优化
    |
    |
    |
    V
   emit           输出到dist目录
```
### webpackOptionsApply
将所有的配置 options 参数转换成 webpack 内部插件

使用默认插件列表

举例:
- output.library  -> LibraryTemplatePlugin
- externals  -> ExternalsPlugin
- devtool -> EvalDevtoolModulePlugin, SourceMapDevToolPlugin
- AMDPlugin, CommonJsPlugin
- RemoveEmptyChunksPlugin

### Compiler hooks
流程相关
- (before-)run
- (before-/after-) compile
- make
- (after-)emit
- done

监听相关:
- watch-run
- watch-close

### Compilation
Compiler 调用 Compilation 生命周期方法
- addEntry -> addModuleChain
- finish(上级模块错误)
- seal

### ModuleFactory
- NormalModuleFactory
- ContextModuleFactory

### Module
- NormalModule    普通模块
- ContextModule
  - ./src/a
  - ./src/b
- ExternalModule
  - module.exports
  - jQuery
- DelegateModule
  - manifest
- MultiModule
  - entry: ['a','b']

#### NormalModule
Build
- 使用 loader-runner 运行  loaders
- 通过 Parser 解析 (内部是acron)
- ParserPlugin 添加依赖

### chunk 生成算法
1. webpack先将 entry 中对应的 module 都生成一个新的 chunk
2. 遍历 module的依赖列表, 将依赖的module也加入到 chunk中
3. 如果一个依赖 module是动态引入的模块, 那么就会根据这个module创建一个新的chunk, 继续遍历依赖
4. 重复上面的过程, 直至得到所有的chunks