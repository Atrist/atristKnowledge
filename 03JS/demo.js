let hd = {};
let parent = { name: "parent" };
Object.setPrototypeOf(hd, parent);
console.log(hd);
console.log(Object.getPrototypeOf(hd));
