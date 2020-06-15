# npm 包管理器简介

## npm 简介

`npm` 是 Node.js 标准的软件包管理器。

在 2017 年 1 月时，npm 仓库中就已有超过 350000 个软件包，这使其成为世界上最大的单一语言代码仓库，并且可以确定几乎有可用于一切的软件包。

它起初是作为下载和管理 Node.js 包依赖的方式，但其现在也已成为前端 JavaScript 中使用的工具。

`npm` 有很多功能。

> [Yarn](https://yarnpkg.com/en/) 是 npm 的一个替代选择。


## 下载
`npm` 可以管理项目依赖的下载。

## 安装所有依赖
如果项目具有 package.json 文件，则通过运行：
```bash
npm install
```
它会在 `node_modules` 文件夹（如果尚不存在则会创建）中安装项目所需的所有东西。

## 安装单个软件包
也可以通过运行以下命令安装特定的软件包：
```bash
npm install <package-name>
```
通常会在此命令中看到更多标志：

- `--save` 安装并添加条目到 package.json 文件的 dependencies。
- `--save-dev` 安装并添加条目到 package.json 文件的 devDependencies。

区别主要是，`devDependencies` 通常是开发的工具（例如测试的库），而 `dependencies` 则是与生产环境中的应用程序相关。

## 更新软件包
通过运行以下命令，更新也变得很容易：
```bash
npm update
```
`npm` 会检查所有软件包是否有满足版本限制的更新版本。

也可以指定单个软件包进行更新：
```bash
npm update <package-name>
```
## 版本控制
除了简单的下载外，`npm `还可以管理版本控制，因此可以指定软件包的任何特定版本，或者要求版本高于或低于所需版本。

很多时候，一个库仅与另一个库的主版本兼容。

或者，一个库的最新版本中有一个缺陷（仍未修复）引起了问题。

指定库的显式版本还有助于使每个人都使用相同的软件包版本，以便整个团队运行相同的版本，直至 `package.json` 文件被更新。

在所有这些情况中，版本控制都有很大的帮助，`npm` 遵循语义版本控制标准。

## 运行任务
`package.json` 文件支持一种用于指定命令行任务（可通过使用以下方式运行）的格式：
```bash
npm run <task-name>
```
例如：
```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  },
}
```
使用此特性运行 Webpack 是很常见的：
```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js",
  },
}
```
因此可以运行如下，而不是输入那些容易忘记或输入错误的长命令：
```bash
$ npm run watch
$ npm run dev
$ npm run prod
```
# npm 安装软件包到哪里？
使用npm安装软件包时，可以执行两种安装类型：
- 本地安装
- 全局安装

默认情况下，当您键入npm install命令时，例如：
```bash
npm install lodash
```
软件包安装在当前路径的`node_modules`子文件夹下。

发生这种情况时，npm还会在当前文件夹中存在的package.json文件的`dependencies`属性中添加lodash条目。

使用`-g`标志执行全局安装：
```bash
npm install -g lodash
```
发生这种情况时，npm不会将软件包安装在本地文件夹下，而是放在全局的文件夹中。