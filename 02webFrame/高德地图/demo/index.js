var json = [
    [106.436607,29.825877],
    [106.547134,29.606654]
];

var map = new AMap.Map('mapid', {
    center:json[0],
    zoom:50
 });


document.getElementById('change').addEventListener('change',function(){
    console.log(this.value);
    map.setCenter(json[this.value]);
})
