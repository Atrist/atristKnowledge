## 资料地址
作者：花裤衩<br/>
链接：https://juejin.im/post/5c92ff94f265da6128275a85<br/>
来源：掘金

## 前言
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 从 `2017.04.17`提交第一个 commit 以来，维护至今已经有两年多的时间了了，发布了四十多个版本，收获了三万多的 stars，远远的超出了自己的预期。距离上次手摸手系列教程也已经过去了很久，主要因为：作为一个个人开源项目，维持它已经很难了，所以真的没啥时间写详细的教程了，光是维护项目 [文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/) 就让我很头疼了。也有不少人建议我出付费教学视频，但我个人还是更愿意把这个时间投入到维护开源项目之中吧。

本篇教程主要是趁着`vue-element-admin`发布了 [v4.0](https://github.com/PanJiaChen/vue-element-admin/releases) 新版本，首先来简单说一下`4.0`版本做了哪些改动和优化。后半部分则会分享一些新的思考和一些小技巧吧。之前几篇手摸手文章都差不多两年前的了，但随着技术的不断发展迭代，很多之前的不能解决的问题也是都是有了新的解决方案的，同时也会出现一些新的问题和挑战。


## 4.0 做了什么
首先大概说一下4.0版本做了些什么，通过 [pull request](https://github.com/PanJiaChen/vue-element-admin/pull/1291) 可以看出这是一次比较大的升级，有大概 170 多次的 commits，200 多个文件的改动。其中最大的改变是接轨 vue 社区，直接通过 `vue-cli`来进行构建，省去了很多额外繁琐的配置(下文会介绍)，并修改了之前 mock 数据的方案，本地改用 `mock-server` 来解决之前`mockjs`带来的各种问题。同时增加了 `jest` 单元测试，使用了`async/await`，增加了可视化配置权限，增加了自定义布局等等，优化了原先`addRoutes`的权限方案，支持不刷新页面更新路由等等功能。具体的可看 [github release](https://github.com/PanJiaChen/vue-element-admin/releases/tag/v4.0.0)。接下来我们着重来分析一下这几个功能。

### vue-cli@3
