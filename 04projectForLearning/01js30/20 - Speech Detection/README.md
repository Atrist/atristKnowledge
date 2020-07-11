# 20 - Speech Detection
第20天的练习是利用浏览器内部的Web speech API实时的将自己所说的话展现在页面上。Web speech API是关于浏览器语音识别服务的API。

**该服务需要在本地服务器上才能正常的使用.**

进入当前文件夹,安装
```bash
npm install
```
启动
```bash
npm start
```

# 主要思路
1. 获取语音识别API的对象,并定义部分属性
2. 启动服务,监听语音输入,并显示在屏幕中
3. 监听`result`事件,实时获取语音输入内容
4. 监听`end`事件,一旦该事件发生,再启动服务,持续监听

# 收获
# CSS
## -webkit-gradient
已淘汰的属性
### linear-gradient
CSS linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于`<gradient>`数据类型，是一种特别的`<image>`数据类型。[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient)

部分示例
```css
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);
```

**语法**
值
- `<side-or-corner>`
  - 描述渐变线的起始点位置。它包含to和两个关键词：第一个指出水平位置left or right，第二个指出垂直位置top or bottom。关键词的先后顺序无影响，且都是可选的。
to top, to bottom, to left 和 to right这些值会被转换成角度0度、180度、270度和90度。其余值会被转换为一个以向顶部中央方向为起点顺时针旋转的角度。渐变线的结束点与其起点中心对称。
- `<angle>`
  - 用角度值指定渐变的方向（或角度）。角度顺时针增加。 
- `<linear-color-stop>`
  - 由一个`<color>`值组成，并且跟随着一个可选的终点位置（可以是一个百分比值或者是沿着渐变轴的`<length>`）。CSS渐变的颜色渲染采取了与SVG相同的规则。
- `<color-hint>`
  - 颜色中转点是一个插值提示，它定义了在相邻颜色之间渐变如何进行。长度定义了在两种颜色之间的哪个点停止渐变颜色应该达到颜色过渡的中点。如果省略，颜色转换的中点是两个颜色停止之间的中点。 
# JS
## webSpeech
Web Speech API 使您能够将语音数据合并到 Web 应用程序中。 Web Speech API 有两个部分：SpeechSynthesis 语音合成 （文本到语音 TTS）和 SpeechRecognition  语音识别（异步语音识别）。[MDN文档]

[使用Web Speech API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API),一个mdn上的教程

程序源码
```js
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
// 创建一个P标签
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    console.log(e.results);
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
        // 一段话结束,便显示在屏幕上
        p = document.createElement('p');
        words.appendChild(p);
    }
});
recognition.addEventListener('end', recognition.start);
recognition.start();
```

