## 引言
链表相对于数组来说，要复杂的多，首先，链表不需要连续的内存空间，它是由一组零散的内存块透过指针连接而成，所以，每一个块中必须包含当前节点内容以及后继指针。最常见的链表类型有单链表、双链表以及循环链表。

学习链表最重要的是 多画图多练习 ，没有捷径可循，在遇到链表问题时，瓶子君总结了一下，可以按照以下五步骤：

- 确定解题的数据结构：单链表、双链表或循环链表等
- 确定解题思路：如何解决问题
- 画图实现：画图可以帮助我们发现思维中的漏洞（一些思路不周的情况）
- 确定边界条件：思考解题中是否有边界问题以及如何解决
- 代码实现：解题完成✅


本文会给常用链表（单链表、双链表以及循环链表）的基本操作已经代码实现，并给出实现思路，这些都是链表解题的基石，请务必掌握！⛽️⛽️⛽️

最后附赠一道 leetcode 题目，并按照链表解题五步骤给出答案！

## 一、单链表
![](https://camo.githubusercontent.com/1ff6e05c5a770474c4e98705cabd818da222f9dd/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032302f706e672f3237333530362f313538343138393434353333342d64363537623037372d373262332d346439352d386164622d6439313862363534333535372e706e67)

单链表结构：
```js
function List () {
  // 节点
  let Node = function (element) {
    this.element = element
    this.next = null
  }
  // 初始头节点为 null
  let head = null
  
  // 链表长度
  let length = 0
  // 操作
  this.getList = function() {return head}
  this.search = function(list, element) {}
  this.append = function(element) {}
  this.insert = function(position, element) {}
  this.remove = function(element){}
  this.isEmpty = function(){}
  this.size = function(){}
}
```
1. 追加节点：

**确定解题的数据结构：** 单链表

**确定解题思路**： 初始化一个节点（待追加节点），遍历到链尾，在尾节点后插入该节点

**画图实现：**

![](https://camo.githubusercontent.com/8e352bf039eb370e678825fc69862c48e5b09783/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303430333233303433352e706e67)

**确定边界条件：** 当链表为 null ，直接将 head 指向待插入节点，不需要遍历

**代码实现：**
```js
function append (element) {
  let node = new Node(element),
      p = head
  if (!head){
    head = node
  } else {
    while (p.next) {
      p = p.next
    }
    p.next = node
  }
  length += 1
}

// 测试
let list = new List()
for(let i = 0; i < 5; i+=1) {
  list.append(i)
}
```
解题完成✅

2. 查找：

**确定解题的数据结构：** 单链表

**确定解题思路：** 遍历单链表，判断节点值是否等于待查找值，相等则返回 true ，否则继续遍历下一个节点，直到遍历完整个链表还未找到，则返回 false

**画图实现：** 很简单，读者可以尝试画一下

**确定边界条件：** 当链表为 null ，可直接返回 false

**代码实现：**
```js
// 判断链表中是否存在某节点
function search(element) {
  let p = head
  if (!p) return false
  while(p) {
    if (p.element === element) return true
    p = p.next
  }
  return false
}

// 测试
list.search(4) // true
list.search(11) // false
```
解题完成✅

3. 在 position 位置插入：

**确定解题的数据结构：** 单链表

**确定解题思路：** 初始化一个节点（待插入节点 node ），遍历到 position 前一个位置节点，在该节点后插入 node

**画图实现：**

![](https://camo.githubusercontent.com/2f1963c7caf1133c175baf6bb039a69e9c7d0ea8/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032302f706e672f3237333530362f313538343139333237313434302d31616161346664392d656335632d346139632d396366382d6533353763623531383166392e706e67)

**确定边界条件：**

- 当 `position` 为 0 时，直接将插入节点 node.next 指向 head ， head 指向 node 即可，不需要遍历
- 当待插入位置 `position < 0` 或超出链表长度 `position > length` ，都是有问题的，不可插入，此时直接返回 null ，插入失败

**代码实现：**
```js
// 插入 position 的后继节点
function insert (position, element) {
  // 创建插入节点
  let node = new createNode(element)
  if (position >= 0 && position <= length) {
    let prev = head, 
        curr = head,
        index = 0
    if(position === 0) {
      node.next = head
      head = node
    } else {
      while(index < position) {
        prev = curr
        curr = curr.next
        index ++
      }
      prev.next = node
      node.next = curr
    }
    length += 1
  } else {
    return null
  }
}

// 测试
list.insert(10)
```
解题完成✅

4. 删除：
**确定解题的数据结构：** 单链表

**确定解题思路：** 遍历单链表，找到待删除节点，删除

**画图实现：**
![](https://camo.githubusercontent.com/045fd7b00afdbd4366fd7a8dd27ac17d82cbf9a5/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032302f706e672f3237333530362f313538343139333430333733382d39626361366631312d626365632d343033612d626639362d3732323064343131353436302e706e67)

**确定边界条件：** 当链表为 null ，直接返回

**代码实现：**
```js
// 删除值为 element 节点
function remove (element) {
  let p = head, prev = head
  if(!head) return
  while(p) {
    if(p.element === element) {
      p = p.next
      prev.next = p
    } else {
        prev = p
        p = p.next  
    }
  }
}
```
解题完成✅

5. 复杂度分析：
- **查找：从头节点开始查找，时间复杂度为 O(n)**

- **插入或删除：在某一节点后插入或删除一个节点（后继节点）的时间复杂度为 O(1)**

链表五步骤是不是很好用😊，下面看一下双链表👇

## 二、双链表
顾名思义，单链表只有一个方向，从头节点到尾节点，那么双链表就有两个方向，从尾节点到头节点：
![](https://camo.githubusercontent.com/3141298bf41dc4da5aeff6e62b0dc722281ea54f/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303332363233303934372e706e67)
```js
function DoublyLinkedList() {
    let Node = function(element) {
        this.element = element
        // 前驱指针
        this.prev = null
        // 后继指针
        this.next = null
    }
    // 初始头节点为 null
  	let head = null
    // 新增尾节点
    let tail = null
  	// 链表长度
  	let length = 0
    // 操作
    this.search = function(element) {}
    this.insert = function(position, element) {}
    this.removeAt = function(position){}
    this.isEmpty = function(){ return length === 0 } 
    this.size = function(){ return length }
}
```
1. 在 position 位置插入节点：
**确定解题的数据结构**： 双链表

**确定解题思路**： 初始化一个节点（待插入节点 node ），遍历链表到 position 前一个位置节点，在该节点位置后插入 node

**画图实现**：

![](https://camo.githubusercontent.com/fc246f31367aa80919412ceecd3fc7d46a33a1ae/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303430333233313332312e706e67)

**确定边界条件：**

当待插入位置 position < 0 或超出链表长度 position > length ，都是有问题的，不可插入，此时直接返回 null ，插入失败

**代码实现：**
```js
// 插入 position 的后继节点
function insert (position, element) {
  // 创建插入节点
  let node = new Node(element)
  if (position >= 0 && position < length) {
    let prev = head, 
        curr = head,
        index = 0
    if(position === 0) {
      // 在第一个位置添加
        if(!head) { // 注意这里与单链表不同
          head = node
          tail = node
        } else {
          // 双向
          node.next = head
          head.prev = node
          // head 指向新的头节点
          head = node
        }
    } else if(position === length) {
      // 插入到尾节点
      curr = tial
      curr.next = node
      node.prev = curr
      // tail 指向新的尾节点
      tail = node
    } else {
      while(index < position) {
        prev = curr
        curr = curr.next
        index ++
      }
      // 插入到 prev 后，curr 前
      prev.next = node
      node.next = curr
      curr.prev = node
      node.prev = prev
    }
    length += 1
    return true
  } else {
    return false
  }
}

// 测试
list.insert(10)
```
2. 删除：
**确定解题的数据结构：** 双链表

**确定解题思路：** 遍历双链表，找到待删除节点，删除

**画图实现：**

![](https://camo.githubusercontent.com/971a58859a67bb3fc769a7d8637747da56283a4c/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303430333233323030322e706e67)

**确定边界条件：** 当链表为 null ，直接返回

**代码实现：**
```js
// 删除 position 位置的节点
function removeAt (position) {
  if (position >= 0 && position < length && length > 0) {
    let prev = head, 
        curr = head,
        index = 0
    if(position === 0) {
      // 移除头节点
        if(length === 1) { // 仅有一个节点
          head = null
          tail = null
        } else {
          head = head.next
          head.prev = null
        }
    } else if(position === length-1) {
      // 移除尾节点
      curr = tial
      tail = curr.prev
      tail.next = null
    } else {
      while(index < position) {
        prev = curr
        curr = curr.next
        index ++
      }
      // 移除curr
      prev.next = curr.next
      curr.next.prev = prev
    }
    length -= 1
    return curr.element
  } else {
    return null
  }
}
```
3. 查找：
双链表的查找和单链表类似，都是遍历链表，找到返回 true，找不到返回 false 。
4. 复杂度分析：
- **查找：查找前驱节点或后继节点时间复杂度为 O(1)，其它节点仍为 O(n)**

- **插入或删除：插入或删除前驱节点或后继节点的时间复杂度都为 O(1)**

## 三、循环单链表
循环单链表是一种特殊的单链表，它和单链表的唯一区别是：单链表的尾节点指向的是 NULL，而循环单链表的尾节点指向的是头节点，这就形成了一个首尾相连的环：

![](https://camo.githubusercontent.com/c44b1fda0edbd1e1ad68652afe58b42abe277dc0/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032302f706e672f3237333530362f313538343139343133323631352d30333861333633632d326338362d343463382d623539612d3133336464353166656337322e706e67)

既然有循环单链表，当然也有循环双链表，循环双链表和双链表不同的是：

- 循环双链表的 `tail.next`（ tail 的后继指针） 为 `null` ，循环双链表的 `tail.next` 为 head
- 循环双链表的 `head.prev`（ head 的前驱指针） 为 `null` ，循环双链表的 `head.prev` 为 tail

这里以循环单列表为例
```js
function CircularLinkedList() {
    let Node = function(element) {
        this.element = element
        // 后继指针
        this.next = null
    }
    // 初始头节点为 null
  	let head = null
  	// 链表长度
  	let length = 0
    // 操作
    this.search = function(element) {}
    this.insert = function(positon, element) {}
    this.removeAt = function(position){}
    this.isEmpty = function(){ return length === 0 } 
    this.size = function(){ return length }
}
```
1. 在 positon 后插入：
**确定解题的数据结构：** 循环单链表

**确定解题思路：** 初始化一个节点（待插入节点 node ），遍历到 position 前一个位置节点，在该节点后插入 node

**画图实现：**

![](https://camo.githubusercontent.com/5c5bfecce13f1def52975f362f9a20b3fc090f95/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303430333233323735312e706e67)

**确定边界条件：**

- 当 position 为 0 时，需要遍历到尾节点，然后在尾节点后插入节点 ， 并将 head 指向
- 当待插入位置 position < 0 或超出链表长度 position > length ，都是有问题的，不可插入，此时直接返回 null ，插入失败

**代码实现：**
```js
// 插入 position 的后继节点
function insert (position, element) {
  // 创建插入节点
  let node = new createNode(element)
  if (position >= 0 && position <= length) {
    let prev = head, 
        curr = head,
        index = 0
    if(position === 0) {
      // 与单链表插入不同的
      while(index < length) {
        prev = curr
        curr = curr.next
        index ++
      }
      prev.next = node
      node.next = curr
      head = node
    } else {
      while(index < position) {
        prev = curr
        curr = curr.next
        index ++
      }
      prev.next = node
      node.next = curr
    }
    length += 1
  } else {
    return null
  }
}

// 测试
list.insert(10)
```
2. 查找：
和单链表类似，唯一不同的是：循环单链表的循环结束条件为 `index++ < length`
```js
// 判断链表中是否存在某节点
function search(element) {
  if (!head) return false
  let p = head, index = 0
  // 和单链表的不同所在
  while(index++ < length) {
    if (p.element === element) return true
    p = p.next
  }
  return false
}
// 测试
list.search(4) // true
list.search(11) // false
```
3. 删除：
和单链表类似，唯一不同的是：循环单链表的循环结束条件为 `index++ < length`
```js
// 删除值为 element 节点
function remove (element) {
  let p = head, prev = head, index = 0
  // 空链表
  if(!head || ) return
  // 仅有一个节点且element一致
  if(length === 1 && head.element === element){  
    head = null
    length-- 
    return  
  }
  while(index++ < length) {
    if(p.element === element) {
      p = p.next
      prev.next = p
      length --
    } else {
        prev = p
        p = p.next  
    }
  }
}
```
4. 复杂度分析
**查找：循环链表从任一节点开始查找目标节点，时间复杂度为 O(n)**

**插入或删除：它和单链表一样，后继节点插入及删除的时间复杂度为 O(1)**

## 四、leetcode21：合并两个有序链表
将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例：
```js
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```
### 解答：

**确定解题的数据结构**： 单链表

**确定解题思路**： 从链表头开始比较，l1 与 l2 是有序递增的，所以比较 l1.val 与 l2.val 的较小值就是合并后链表的最小值，次小值就是小节点的 next.val 与大节点的 val 比较的较小值，依次递归，直到递归到 l1 l2 均为 null

画图实现： 画图帮助理解一下

![](https://camo.githubusercontent.com/32acd3834de95681eadce1e9a1f732c0a88260e6/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303230303431303031303133382e706e67)

**确定边界条件：** 当递归到任意链表为 null ，直接将 next 指向另外的链表即可，不需要继续递归了

代码实现：
```js
function mergeTwoLists(l1, l2) {
    if(l1 === null) {
        return l2
    }
    if(l2 === null) {
        return l1
    }
    if(l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l2.next, l1)
        return l2
    }
}
```