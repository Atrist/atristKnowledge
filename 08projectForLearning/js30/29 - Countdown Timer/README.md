# 29 - Countdown Timer
第29天的练习是一个倒计时的效果。

# 主要思路
1. 为顶部按钮添加点击事件,通过data-time传递数据
2. 一秒刷新一次中间屏幕显示
3. 归零之后,就禁止不动

## 主要代码
部分button的布局
```html
<div class="timer__controls">
    <button data-time="20" class="timer__button">20 Secs</button>
    <button data-time="300" class="timer__button">Work 5</button>
    <button data-time="900" class="timer__button">Quick 15</button>
    <button data-time="1200" class="timer__button">Snack 20</button>
    <button data-time="3600" class="timer__button">Lunch Break</button>
    <form name="customForm" id="custom">
        <input type="text" name="minutes" placeholder="Enter Minutes">
    </form>
</div>
```
定时器的主要代码
```js
function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}
```
展现实时倒计时
```js
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}
```
展示停止时间
```js
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ?'0':''}${minutes}`;
}
```

# 收获
# Date
创建一个 JavaScript Date 实例，该实例呈现时间中的某个时刻。Date 对象则基于 Unix Time Stamp，即自1970年1月1日（UTC）起经过的毫秒数。 [MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)


## 时间的展示
```js
`Be Back At ${adjustedHour}:${minutes < 10 ?'0':''}${minutes}`
```

## preventDefault()
Event 接口的 preventDefault()方法，告诉user agent：如果此事件没有被显式处理，它默认的动作也不应该照常执行。此事件还是继续传播，除非碰到事件侦听器调用stopPropagation() 或stopImmediatePropagation()，才停止传播。

## reset
reset 方法可以重置一个表单内的所有表单控件的值到初始状态. [MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/reset)

