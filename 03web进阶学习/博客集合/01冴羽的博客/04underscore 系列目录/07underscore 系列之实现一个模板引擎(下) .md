## 前言
本篇接着上篇 [underscore 系列之实现一个模板引擎(上)](https://github.com/mqyqingfeng/Blog/issues/63)。

鉴于本篇涉及的知识点太多，我们先来介绍下会用到的知识点。

## 反斜杠的作用
```js
var txt = "We are the so-called "Vikings" from the north."
console.log(txt);
```
我们的本意是想打印带 "" 包裹的 Vikings 字符串，但是在 JavaScript 中，字符串使用单引号或者双引号来表示起始或者结束，这段代码会报 Unexpected identifier 错误。

如果我们就是想要在字符串中使用单引号或者双引号呢？

我们可以使用反斜杠用来在文本字符串中插入省略号、换行符、引号和其他特殊字符：
```js
var txt = "We are the so-called \"Vikings\" from the north."
console.log(txt);
```
现在 JavaScript 就可以输出正确的文本字符串了。

**这种由反斜杠后接字母或数字组合构成的字符组合就叫做“转义序列”。**

值得注意的是，转义序列会被视为单个字符。

我们常见的转义序列还有 `\n` 表示换行、`\t` 表示制表符、`\r` 表示回车等等。

## 转义序列
在 JavaScript 中，字符串值是一个由零或多个 Unicode 字符（字母、数字和其他字符）组成的序列。

字符串中的每个字符均可由一个转义序列表示。比如字母 a，也可以用转义序列 `\u0061` 表示。

>转义序列以反斜杠 \ 开头，它的作用是告知 JavaScript 解释器下一个字符是特殊字符。

>转义序列的语法为 `\uhhhh`，其中 `hhhh` 是四位十六进制数。

根据这个规则，我们可以算出常见字符的转义序列，以字母 `m` 为例：
```js
// 1. 求出字符 `m` 对应的 unicode 值
var unicode = 'm'.charCodeAt(0) // 109
// 2. 转成十六进制
var result = unicode.toString(16); // "6d"
```
我们就可以使用 `\u006d` 表示 `m`，不信你可以直接在浏览器命令行中直接输入字符串 `'\u006d'`，看下打印结果。

值得注意的是: `\n` 虽然也是一种转义序列，但是也可以使用上面的方式：
```js
var unicode = '\n'.charCodeAt(0) // 10
var result = unicode.toString(16); // "a"
```
所以我们可以用 \u000A 来表示换行符 \n，比如在浏览器命令行中直接输入 'a \n b' 和 'a \u000A b' 效果是一样的。

讲了这么多，我们来看看一些常用字符的转义序列以及含义：

| Unicode 字符值 | 转义序列 | 含义       |
| -------------- | -------- | ---------- |
| \u0009         | `\t`     | 制表符     |
| \u000A         | `\n`     | 换行       |
| \u000D         | `\r`     | 回车       |
| \u0022         | `\"`     | 双引号     |
| \u0027         | `\'`     | 单引号     |
| \u005C         | `\\`     | 反斜杠     |
| \u2028         |          | 行分隔符   |
| \u2029         |          | 段落分隔符 |

## Line Terminators
Line Terminators，中文译文`行终结符`。像空白字符一样，`行终结符`可用于改善源文本的可读性。

在 ES5 中，有四个字符被认为是`行终结符`，其他的折行字符都会被视为空白。

这四个字符如下所示：
| 字符编码值 | 名称       |
| ---------- | ---------- |
| \u000A     | 换行符     |
| \u000D     | 回车符     |
| \u2028     | 行分隔符   |
| \u2029     | 段落分隔符 |

## Function
试想我们写这样一段代码，能否正确运行：
```js
var log = new Function("var a = '1\t23';console.log(a)");
log()
```
答案是可以，那下面这段呢：
```js
var log = new Function("var a = '1\n23';console.log(a)");
log()
```
答案是不可以，会报错 `Uncaught SyntaxError: Invalid or unexpected token`。

这是为什么呢？

这是因为在 Function 构造函数的实现中，首先会将函数体代码字符串进行一次 ToString 操作，这时候字符串变成了：
```js
var a = '1
23';console.log(a)
```
然后再检测代码字符串是否符合代码规范，在 JavaScript 中，**字符串表达式中是不允许换行的**，这就导致了报错。

为了避免这个问题，我们需要将代码修改为：
```js
var log = new Function("var a = '1\\n23';console.log(a)");
log()
```
其实不止 `\n`，其他三种 行终结符，如果你在字符串表达式中直接使用，都会导致报错！

之所以讲这个问题，是因为在模板引擎的实现中，就是使用了 `Function` 构造函数，如果我们在模板字符串中使用了 行终结符，便有可能会出现一样的错误，所以我们必须要对这四种 行终结符 进行特殊的处理。

## 特殊字符
除了这四种 行终结符 之外，我们还要对两个字符进行处理。

一个是 `\`。

比如说我们的模板内容中使用了`\`:
```js
var log = new Function("var a = '1\23';console.log(a)");
log(); // 1
```
其实我们是想打印 `'1\23'`，但是因为把 `\` 当成了特殊字符的标记进行处理，所以最终打印了 `1`。

同样的道理，如果我们在使用模板引擎的时候，使用了 `\` 字符串，也会导致错误的处理。

第二个是 `'`。

如果我们在模板引擎中使用了 `'`，因为我们会拼接诸如 `p.push(' ') `等字符串，因为 ` 的原因，字符串会被错误拼接，也会导致错误。

所以总共我们需要对六种字符进行特殊处理，处理的方式，就是正则匹配出这些特殊字符，然后比如将 `\n` 替换成 `\\n`，`\` 替换成 `\\`，`'` 替换成 `\\'`，处理的代码为：
```js
var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};

var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function(match) {
    return '\\' + escapes[match];
};
```
我们测试一下：
```js
var str = 'console.log("I am \n Kevin");';
var newStr = str.replace(escapeRegExp, escapeChar);

eval(newStr)
// I am 
// Kevin
```
## replace
我们来讲一讲字符串的 replace 函数：

语法为：
```js
str.replace(regexp|substr, newSubStr|function)
```
`replace` 的第一个参数，可以传一个字符串，也可以传一个正则表达式。

第二个参数，可以传一个新字符串，也可以传一个函数。

我们重点看下传入函数的情况，简单举一个例子：
```js
var str = 'hello world';
var newStr = str.replace('world', function(match){
    return match + '!'
})
console.log(newStr); // hello world!
```
match 表示匹配到的字符串，但函数的参数其实不止有 match，我们看个更复杂的例子：
```js
function replacer(match, p1, p2, p3, offset, string) {
    // match，表示匹配的子串 abc12345#$*%
    // p1，第 1 个括号匹配的字符串 abc
    // p2，第 2 个括号匹配的字符串 12345
    // p3，第 3 个括号匹配的字符串 #$*%
    // offset，匹配到的子字符串在原字符串中的偏移量 0
    // string，被匹配的原字符串 abc12345#$*%
    return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer); // abc - 12345 - #$*%
```
另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式， 那么这个方法将被多次调用，每次匹配都会被调用。

举个例子，如果我们要在一段字符串中匹配出 <%=xxx%> 中的值：
```js
var str = '<li><a href="<%=www.baidu.com%>"><%=baidu%></a></li>'

str.replace(/<%=(.+?)%>/g, function(match, p1, offset, string){
    console.log(match);
    console.log(p1);
    console.log(offset);
    console.log(string);
})
```
传入的函数会被执行两次，第一次的打印结果为：
```html
<%=www.baidu.com%>
www.baidu.com
13
<li><a href="<%=www.baidu.com%>"><%=baidu%></a></li>
```
第二次的打印结果为：
```html
<%=baidu%>
'baidu'
33
<li><a href="<%=www.baidu.com%>"><%=baidu%></a></li>
```
## 正则表达式的创建
当我们要建立一个正则表达式的时候，我们可以直接创建：
```js
var reg = /ab+c/i;
```
也可以使用构造函数的方式：
```js
new RegExp('ab+c', 'i');
```
值得一提的是：每个正则表达式对象都有一个 source 属性，返回当前正则表达式对象的模式文本的字符串：
```js
var regex = /fooBar/ig;
console.log(regex.source); // "fooBar"，不包含 /.../ 和 "ig"。
```
## 正则表达式的特殊字符
