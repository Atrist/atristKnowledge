# 14 - JavaScript References VS Copying
第十四天我们主要练习的是JavaScript的变量引用和变量复制。简单一句话总结就是：基本类型按值操作，而对象类型由引用操作。

# 收获
## JS
###  JS的数据类型
[MDN的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

**最新的 ECMAScript 标准定义了 8 种数据类型:**
7 种原始类型:
- [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)
- [Null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)
- [Undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)
- [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)
- [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)
- [String](https://developer.mozilla.org/zh-CN/docs/Glossary/%E5%AD%97%E7%AC%A6%E4%B8%B2)
- [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol)
- 和[Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)
## 按值操作
值类型（基本类型）：String，Number，Boolean，Null，Undefined。
## 按引用操作
引用类型：Array、Object、Function、Date等有多个值构成的可变长度的复杂类型

### 基本类型与引用类型有什么区别？
1. 基本类型的变量保存的是变量值，引用类型的变量保存的是内存地址；
2. 基本类型长度固定，在内存中占据固定大小的空间，数据存放在栈内存中；引用类型可以给对象添加属性和方法，长度不固定，数据存放在堆内存中。引用类型的存储需要栈区和堆区（堆区是指内存里的堆内存）共同完成，栈区内存保存变量标识符和指向堆内存中该对象的指针，也可以说是该对象在堆内存的地址；
3. 基本类型在赋值的时候拷贝值，引用类型在赋值的时候只拷贝地址，不拷贝值。