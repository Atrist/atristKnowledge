var htttp = require("http");

htttp.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("atrist,hello");
    response.end();
    console.log("回调函数");    
}).listen(8888);
