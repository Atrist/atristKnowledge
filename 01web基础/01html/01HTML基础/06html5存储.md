# 本地存储
## 数据持久化操作
数据持久化也叫数据本地化,是一种数据"长久"的保存在客户的操作

### 作用:
通过数据持久化操作,能够实现网站的登录效果,避免用户在网站页面间浏览器的时候重复登录,一段时间之内保存用户的登录效果,提高页面访问速率

### 类型
1. cookie
2. localStorage
3. sessionStorage

## cookie
cookie可以认为是一个记录了简单内容的文本文件,cookie是直接绑定在html页面上的.

cookie的设置分为前端设置和后端设置
### 前端设置
- 写入
    ```js
    document.cookie = 'key1=value1;key2=value2;expires=过期时间戳;';
    ```
- 读取
    ```js
    console.log(document.cookie);
    ```
- 删除
  ```js
  document.cookie = 'key=value;expires=当前时间戳+1';
  ```
## localStorage
### 语法
- 储存:localStorage.setItem(name,value);
- 读取:localStorage.getItem(name);
- 删除:localStorage.removeItem(name);
  
持久保持客户端数据的方案,用户不删除会一直存在

## sessionStorage
- 存储:sessionStorage.setItem(name,value);
- 读取:sessiionStorage.getItem(name);
- 删除:sessionStorage.removeItem(name);

sessionStorage对象存储特定于某个会话的数据,也就是和该数据只保持到浏览器关闭.