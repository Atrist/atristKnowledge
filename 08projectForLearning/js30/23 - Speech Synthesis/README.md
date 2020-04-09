# 23 - Speech Synthesis
第23天要做一个语音的记事本类似的场景，输入一段内容，选择不同的语言可以进行朗读。还可以选择不同的语速和语调。

# 主要思路
1. 通过下拉菜单选择语言
2. 用过文本框获取用户输入
3. 调用接口,进行朗读

## 主要代码
**背景的生成**
```css
background-image:
  radial-gradient(circle at 100% 150%, #3BC1AC 24%, #42D2BB 25%, #42D2BB 28%, #3BC1AC 29%, #3BC1AC 36%, #42D2BB 36%, #42D2BB 40%, transparent 40%, transparent),
  radial-gradient(circle at 0    150%, #3BC1AC 24%, #42D2BB 25%, #42D2BB 28%, #3BC1AC 29%, #3BC1AC 36%, #42D2BB 36%, #42D2BB 40%, transparent 40%, transparent),
  radial-gradient(circle at 50%  100%, #42D2BB 10%, #3BC1AC 11%, #3BC1AC 23%, #42D2BB 24%, #42D2BB 30%, #3BC1AC 31%, #3BC1AC 43%, #42D2BB 44%, #42D2BB 50%, #3BC1AC 51%, #3BC1AC 63%, #42D2BB 64%, #42D2BB 71%, transparent 71%, transparent),
  radial-gradient(circle at 100% 50%, #42D2BB 5%, #3BC1AC 6%, #3BC1AC 15%, #42D2BB 16%, #42D2BB 20%, #3BC1AC 21%, #3BC1AC 30%, #42D2BB 31%, #42D2BB 35%, #3BC1AC 36%, #3BC1AC 45%, #42D2BB 46%, #42D2BB 49%, transparent 50%, transparent),
  radial-gradient(circle at 0    50%, #42D2BB 5%, #3BC1AC 6%, #3BC1AC 15%, #42D2BB 16%, #42D2BB 20%, #3BC1AC 21%, #3BC1AC 30%, #42D2BB 31%, #42D2BB 35%, #3BC1AC 36%, #3BC1AC 45%, #42D2BB 46%, #42D2BB 49%, transparent 50%, transparent);
```
**下来菜单的生成**
```js   
function populateVoices() {
voices = this.getVoices();
voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}
```
# 收获
# HTML
## input
HTML `<input>` 元素用于为基于Web的表单创建交互式控件，以便接受来自用户的数据; 可以使用各种类型的输入数据和控件小部件. [MND的文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)

## label
HTML `<label>` 元素（标签）表示用户界面中某个元素的说明。 [MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label)

将一个 `<label>` 和一个 `<input>` 元素放在一起会有以下几点好处：

- 标签文本不仅与其相应的文本输入在视觉上相关联; 它也以编程方式与它相关联。 这意味着，当用户点击到表单输入时，屏幕阅读器可以读出标签，使在使用辅助技术的用户更容易理解应输入哪些数据.
- 你可以单击关联的标签来聚焦或者激活 input，以及 input 本身。这种增加的命中区域为激活 input 提供了方便，包括那些使用触摸屏设备的。

>想要将一个 `<label>` 和一个 `<input>` 元素匹配在一起，你需要给 `<input>` 一个 id 属性。而 `<label>` 需要一个 for 属性，其值和 input 的 id 一样。

>另外，你也可以将 `<input>` 直接放在 `<label>` 里，这种情况就不需要 for 和 id 属性了，因为这时关联是隐含的
# CSS
## calc
calc() 此 CSS 函数允许在声明 CSS 属性值时执行一些计算。它可以用在如下场合：`<length>`、`<frequency>`, `<angle>`、`<time>`、`<percentage>`、`<number>`、或 `<integer>`。 [MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)

**语法**
```css
/* property: calc(expression) */
width: calc(100% - 80px);
```

此 calc()函数用一个表达式作为它的参数，用这个表达式的结果作为值。这个表达式可以是任何如下操作符的组合，采用标准操作符处理法则的简单表达式。
- `+` 加法。
-  `-` 减法。
- `*` 乘法，乘数中至少有一个是 `<number>`。
- / 除法，除数（/ 右面的数）必须是 `<number>`。

表达式中的运算对象可以使用任意`<length>` 值。如果你愿意，你可以在一个表达式中混用这类值的不同单位。在需要时，你还可以使用小括号来建立计算顺序。
# JS
## SpeechSynthesisUtterance
>**这是一项实验技术,在生产环境中使用此功能之前，请仔细检查浏览器兼容性表。**

Web语音API的SpeechSynthesisUtterance接口表示语音请求。它包含语音服务应阅读的内容以及有关如何阅读的信息（例如语言，音调和音量）。
[MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)

### 属性
#### SpeechSynthesisUtterance.lang
获取并设置话语的语言。[MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang)

SpeechSynthesisUtterance的lang属性获取并设置话语的语言。 如果未设置，则将使用应用的（即`<html>` lang值）lang，如果未设置，则使用用户代理默认值。
#### SpeechSynthesisUtterance.pitch
获取并设置说话时的音调。[MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch)

SpeechSynthesisUtterance的音高属性获取并设置说话时的音高。 如果未设置，将使用默认值1。
#### SpeechSynthesisUtterance.rate
获取并设置发声的速度。 [MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate)

peechSynthesisUtterance的rate属性获取并设置说出语音的速度。 如果未设置，将使用默认值1。
#### SpeechSynthesisUtterance.text
获取并设置在说出语音时将要合成的文本。 [MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text)

#### SpeechSynthesisUtterance.voice
获取并设置将用于说出语音的声音。 [MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice)

应该将其设置为`SpeechSynthesis.getVoices（）`返回的SpeechSynthesisVoice对象之一。如果未在说出语音时设置，则使用的语音将是可用于该讲话的lang设置的最合适的默认语音。
#### SpeechSynthesisUtterance.volume
获取并设置说话的音量.

SpeechSynthesisUtterance的volume属性获取并设置说出语音的音量。 如果未设置，将使用默认值1。

## speechSynthesis
Web Speech API的SpeechSynthesis接口是语音服务的控制器接口。这可用于检索有关设备上可用的合成语音，开始和暂停语音以及其他命令的信息。  [MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

### Methods
- SpeechSynthesis.cancel()
  - 从语音队列中删除所有语音。
- SpeechSynthesis.getVoices()
  - 返回SpeechSynthesisVoice对象的列表，这些对象表示当前设备上的所有可用语音。
- SpeechSynthesis.pause()
  - 将SpeechSynthesis对象置于暂停状态。
- SpeechSynthesis.resume()
  - 将SpeechSynthesis对象置于非暂停状态：如果已经暂停，则恢复它。
- SpeechSynthesis.speak()
  - 向语音队列添加语音；在说完其他话语之后，就会说出来。
### Eventvoiceschanged
当SpeechSynthesis.getVoices（）方法将返回的SpeechSynthesisVoice对象列表更改时触发。 也可以通过onvoiceschanged属性获得。 [MDN的文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event)

当SpeechSynthesis.getVoices（）方法将返回的SpeechSynthesisVoice对象的列表已更改时（触发了voiceschanged事件时），将触发Web Speech API的voiceschanged事件。