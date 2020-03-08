# webworker

## 描述
当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。

web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

## 使用
1. 生成webworker
    ```js
    var webworker = new webworker('test.js');
    ```
2. 脚本运行完之后,回调函数
   ```js
   webworker.onmessage = function(result){}
   ```
3. 传递数据
    ```js
    postMessage('data');
    ```