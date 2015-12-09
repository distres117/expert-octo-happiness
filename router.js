var Profile = require('./profile.js');
var renderer = require('./renderer.js');
var querystring = require('querystring');
var commonHeader = {'Content-Type':'text/html'};

function home(req,res){
    //Handle the HTTP route GET / and POST

    if (req.method === "GET"){
        //show search
        res.writeHead(200, commonHeader);
        renderer.view("header", {}, res);
        renderer.view("search", {}, res);
        renderer.view("footer", {}, res);
        res.end();
    } else {
        //if url == "/" && POST
        //get the POST data from body
        req.on('data', function(body){
        //extract username
           var query = querystring.parse(body.toString());
            //redirect to /:username
           res.writeHead(303, {"Location": "/" + query.username});
           res.end();
        });
    }
}



//handle HTTP route GET /:username
function user(req,res){
    //if url == '/...'
    var username = req.url.replace("/", "");
    if (username.length > 0)
    res.writeHead(200, commonHeader);
        renderer.view("header", {}, res);
        var studentProfile = new Profile(username);
        studentProfile.on("end", function(profileJSON){
            //show profile
            
            //store the values which we need
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javaScript: profileJSON.points.JavaScript
            };
            renderer.view("profile", values, res);
            renderer.view("footer", {}, res);
            res.end();
        });
        studentProfile.on('error', function(error){
           renderer.view("error", {errorMessage: error.message}, res);
           renderer.view("search", {}, res);
           renderer.view("footer", {}, res);
           res.end();
        });
        
}

module.exports.home = home;
module.exports.user = user;