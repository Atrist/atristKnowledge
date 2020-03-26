# 10 - Hold Shift and Check Checkboxes
第十天的练习,是要做一个按住shift键选中这一次与上一次点击的checkbox之间的所有checkbox.

主要代码:

```js
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  // Check if they had the shift key down
  // AND check that they are checking it
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log('Starting to check them in between!');
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```

## 简单的业务逻辑
1. 使用一个变量来保存上一次点击的checkbox
2. 对checkbox进行迭代运算
   1. 需要选出两个checkbox之间的所有checkbox,需要使用到一个标记变量
   2. 由于是迭代,当迭代的checkbox为被点击的多选框时,或者是上一次被点击的多选框,将inBetween置反(设置为true),意为接下来的元素,在这个两个checkbox元素之间
   3. 当inBetween为真,选中checkbox
   4. 当迭代的checkbox为上一次被点击的多选框,或者是这一次被点击的多选框时,将inBetween置反(设置为假)
   5. 如此便选中了其中所有的多选框元素.