# Build A Real World Beautiful Web APP with Angular 8 
- [原教程地址](https://medium.com/@hamedbaatour/build-a-real-world-beautiful-web-app-with-angular-6-a-to-z-ultimate-guide-2018-part-i-e121dd1d55e)

## 环境依赖
- angular/cli
```
npm i -g @angular/cli
```
## 步骤
### 1. 新建一个工程
```
ng new web-app --routing
```
因为需要用到angular自带的路由模块，所以需要加上 --routing

#### 2. 根组件
将根组件的内容全部删掉(即app.component.html文件内容)，它将作为我们网页的导航栏组件，我们通过用户是否登录为依据来显示或隐藏我们的导航栏。

登录功能，将使用`firebase`框架提供。