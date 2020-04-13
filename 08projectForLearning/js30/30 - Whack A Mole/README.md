# 30 - Whack A Mole
第30天，是完成一个打地鼠游戏。

# 主要思路
1. 游戏开始函数,进行部分数据初始化
   - 规定分数为零
   - 游戏时间
2. 游戏开始
   1. 随机生成地鼠(包括时间随机,位置随机)
3. 时间到达,游戏结束

## 主要代码
### 显示地鼠的土的css代码
```css
.hole {
  flex: 1 0 33.33%;
  overflow: hidden;
  position: relative;
}

.hole:after {
  display: block;
  background: url(dirt.svg) bottom center no-repeat;
  background-size: contain;
  content: '';
  width: 100%;
  height:70px;
  position: absolute;
  z-index: 2;
  bottom: -30px;
}
```
### 显示地鼠css代码
```css
.mole {
  background: url('mole.svg') bottom center no-repeat;
  background-size: 60%;
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  transition:all 0.4s;
}
```
### 地鼠生成的js函数
```js
function randomHole(holes) {
const idx = Math.floor(Math.random() * holes.length);
const hole = holes[idx];
if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    // 如果与上次的地鼠位置相同,则重新生成
    return randomHole(holes);
}
lastHole = hole;
return hole;
}
```
### 地鼠显示的JS函数
```js
  function peep() {
    //   地鼠显示持续时间
    const time = randomTime(200, 1000);
    // 地鼠随机生成
    const hole = randomHole(holes);
    // 地鼠显示
    hole.classList.add('up');
    // 到指定时间,地鼠消失
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }
```
# 收获
# CSS
## bottom
bottom样式属性定义了定位元素下外边距边界与其包含块下边界之间的偏移，非定位元素设置此属性无效。[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom)

### bottom的效果取决于元素的position属性：

- 当position设置为absolute或fixed时，bottom属性指定了定位元素下外边距边界与其包含块下边界之间的偏移。
- 当position设置为relative时，bottom属性指定了元素的下边界离开其正常位置的偏移。
- 当position设置为sticky时，如果元素在viewport里面，bottom属性的效果和position为relative等同；如果元素在viewport外面，bottom属性的效果和position为fixed等同。
- 当position设置为static时，bottom属性无效。

>当 top和bottom同时指定时，并且 height没有被指定或者指定为auto或100%的时候，top和bottom都会生效，在其他情况下，如果 height被限制，则top属性会优先设置，bottom属性则会被忽略。
# JS

## e.isTrusted

接口的isTrusted只读属性是，即事件是由用户操作生成的，事件是由脚本创建或修改的，或者是通过调度的。[MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)
