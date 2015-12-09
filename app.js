//Need a simple way to look at a user's badge count and js points from web browser
var router = require('./router.js');

//Create a web server
var http = require('http');
http.createServer(function(req,res){
    if (req.url === '/')
        router.home(req,res);
    else
        router.user(req,res);
    
}).listen(process.env.PORT, process.env.IP);
console.log('Server is running..');



