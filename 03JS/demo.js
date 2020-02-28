let info = {
  name: "后盾人",
  url: "houdunren.com"
};
for (const key in info) {
  if (info.hasOwnProperty(key)) {
      console.log(key)
    console.log(info[key]);
  }
}

