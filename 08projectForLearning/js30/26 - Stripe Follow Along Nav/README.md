# 26 - Stripe Follow Along Nav
第26天的练习是一个导航栏动画的实现，当鼠标悬浮在不同的导航按钮上背景的变化会伴随着动画的出现


# 主要思路
1. 为li列表添加鼠标移入,移出的事件监听
2. 当鼠标出现在列表上,就显示下拉菜单,以及白色背景
3. 当鼠标移出列表后,下拉菜单和白色背景就消失.

## 主要代码
下拉菜单的css代码
```css
.dropdown {
    opacity: 0;
    position: absolute;
    overflow: hidden;
    padding: 20px;
    top: -20px;
    border-radius: 2px;
    transition: all 0.5s;
    transform: translateY(100px);
    will-change: opacity;
    display: none;
}
```
下拉菜单显示的css代码
```css
.trigger-enter .dropdown {
    display: block;
}

.trigger-enter-active .dropdown {
    opacity: 1;
}
```

白色背景的css代码
```css
.dropdownBackground {
    width: 100px;
    height: 100px;
    position: absolute;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 50px 100px rgba(50, 50, 93, .1), 0 15px 35px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, .1);
    transition: all 0.3s, opacity 0.1s, transform 0.2s;
    transform-origin: 50% 0;
    display: flex;
    justify-content: center;
    opacity: 0;
}
```
显示背景的css代码
```css
.dropdownBackground.open {
    opacity: 1;
}
```
显示背景和下拉菜单的JS代码
```js
function handleEnter() {
this.classList.add('trigger-enter');
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
background.classList.add('open');

const dropdown = this.querySelector('.dropdown');
const dropdownCoords = dropdown.getBoundingClientRect();
const navCoords = nav.getBoundingClientRect();

const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
};

background.style.setProperty('width', `${coords.width}px`);
background.style.setProperty('height', `${coords.height}px`);
background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}
```

# 收获
# CSS
## perspective
CSS 属性 perspective指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。 z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。 [MDN的文档参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

三维元素在观察者后面的部分不会绘制出来，即 z 轴坐标值大于 perspective 属性值的部分。


默认情况下，消失点位于元素的中心，但是可以通过设置 [perspective-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin) 属性来改变其位置。

当该属性值不为 0 和 none 时，会创建新的 层叠上下文。在这种情况下，容器内元素的层叠关系像是使用了 position: fixed 一样。

**值**
- none
  - 没有应用 perspective 样式时的默认值.
- `<length>`
  - `<length>` 指定观察者距离 z=0 平面的距离，为元素及其内容应用透视变换。当值为0或负值时，无透视变换。
## will-change
CSS 属性 will-change 为web开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。 这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

### 用好这个属性并不是很容易：

- **不要将 will-change 应用到太多元素上**：浏览器已经尽力尝试去优化一切可以优化的东西了。有一些更强力的优化，如果与 will-change 结合在一起的话，有可能会消耗很多机器资源，如果过度使用的话，可能导致页面响应缓慢或者消耗非常多的资源。

- **有节制地使用**：通常，当元素恢复到初始状态时，浏览器会丢弃掉之前做的优化工作。但是如果直接在样式表中显式声明了 will-change 属性，则表示目标元素可能会经常变化，浏览器会将优化工作保存得比之前更久。所以最佳实践是当元素变化之前和之后通过脚本来切换 will-change 的值。

- **不要过早应用 will-change 优化**：如果你的页面在性能方面没什么问题，则不要添加 will-change 属性来榨取一丁点的速度。 will-change 的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题。它不应该被用来预防性能问题。过度使用 will-change 会导致大量的内存占用，并会导致更复杂的渲染过程，因为浏览器会试图准备可能存在的变化过程。这会导致更严重的性能问题。

- **给它足够的工作时间**：这个属性是用来让页面开发者告知浏览器哪些属性可能会变化的。然后浏览器可以选择在变化发生前提前去做一些优化工作。所以给浏览器一点时间去真正做这些优化工作是非常重要的。使用时需要尝试去找到一些方法提前一定时间获知元素可能发生的变化，然后为它加上 will-change 属性。
