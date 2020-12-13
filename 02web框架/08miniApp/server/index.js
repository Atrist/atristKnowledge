var express = require('express');
var app = express();
var port = 3000;

app.get('/', (req, res) => {
    res.send('./index.html');

})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('listen `${port}`');
    }
});