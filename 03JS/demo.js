
let hd = `张三:010-99999999,李四:020-88888888`;
let res = hd.match(/[^:\d-,]+/g);
console.log(res);




