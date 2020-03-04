let user = {
  show() {
    return this.name;
  }
};
let hd = Object.create(user, {
  name: {
    value: "后盾人"
  }
});
console.log(hd);
console.log(hd.show());
console.log(hd.name);