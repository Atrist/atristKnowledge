# 25 - Event Capture, Propagation, Bubbling and Once
第25天的训练是学习DOM的事件机制，主要包括事件捕获，事件冒泡，单次执行事件。

# 主要代码
```js
function logText(e) {
    console.log(this.classList.value);
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
}

divs.forEach(div => div.addEventListener('click', logText, {

    once: true
}));

button.addEventListener('click', () => {
    console.log('Click!!!');
}, {
    once: true
});
```
# 收获

# JS
## Event
事件是您在编程时系统内发生的动作或者发生的事情，系统通过它来告诉您在您愿意的情况下您可以以某种方式对它做出回应。[MDN的介绍](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)

### 事件冒泡及捕获
当一个事件发生在具有父元素的元素上时，现代浏览器运行两个不同的阶段 - 捕获阶段和冒泡阶段。 

**在捕获阶段：**
- 浏览器检查元素的最外层祖先`<html>`，是否在捕获阶段中注册了一个onclick事件处理程序，如果是，则运行它。
- 然后，它移动到`<html>`中单击元素的下一个祖先元素，并执行相同的操作，然后是单击元素再下一个祖先元素，依此类推，直到到达实际点击的元素。

**在冒泡阶段，恰恰相反:**
- 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个`onclick`事件处理程序，如果是，则运行它
- 然后它移动到下一个直接的祖先元素，并做同样的事情，然后是下一个，等等，直到它到达`<html>`元素。

![](https://media.prod.mdn.mozit.cloud/attachments/2016/10/07/14075/1805b5a6f5ec0cd7f64f9d645f144510/bubbling-capturing.png)


>**在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。**

#### 用stopPropagation()修复问题

这是令人讨厌的行为，但有一种方法来解决它！标准事件对象具有可用的名为 `stopPropagation()`的函数, 当在事件对象上调用该函数时，它只会让当前事件处理程序运行，但事件不会在冒泡链上进一步扩大，因此将不会有更多事件处理器被运行(不会向上冒泡)。

#### 事件委托
冒泡还允许我们利用事件委托——这个概念依赖于这样一个事实,如果你想要在大量子元素中单击任何一个都可以运行一段代码，您可以将事件监听器设置在其父节点上，并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。

一个很好的例子是一系列列表项，如果你想让每个列表点击时弹出一条信息，您可以将click单击事件监听器设置在父元素`<ul>`上，它将会冒泡到列表项上。
## EventTarget.addEventListener()
`EventTarget.addEventListener()` 方法将指定的监听器注册到 `EventTarget` 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 事件目标可以是一个文档上的元素 `Element`,`Document`和`Window`或者任何其他支持事件的对象 (比如 XMLHttpRequest)。

`addEventListener()`的工作原理是将实现`EventListener`的函数或对象添加到调用它的`EventTarget`上的指定事件类型的事件侦听器列表中。

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

### 语法
```js
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
target.addEventListener(type, listener, useCapture, wantsUntrusted  );  // Gecko/Mozilla only
````
### 参数
- type
    - 表示监听[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的字符串。
- listener
    - 当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。listener 必须是一个实现了 EventListener 接口的对象，或者是一个函数。
- options 可选
    - 一个指定有关 listener 属性的可选参数对象。可用的选项如下：
        - capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
        - once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 `true`， listener 会在其被调用之后自动移除。
        - passive: Boolean，设置为true时，表示 listener 永远不会调用 `preventDefault()`。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
- useCapture  可选
    - Boolean，在DOM树中，注册了listener的元素， 是否要先于它下面的EventTarget，调用该listener。 
    - 当useCapture(设为true) 时，沿着DOM树向上冒泡的事件，不会触发listener。
    - 当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。
    - 如果没有指定， useCapture 默认为 false 。 
