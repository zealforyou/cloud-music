var express = require('express');
var router_music_list=require('./router/router_music_list');
var router_music_item=require('./router/router_music_item');
var router_album=require('./router/router_album');
var bodyParser=require('body-parser');
var app = express();
app.all("/*",function (req, res, next) {
   console.log("url:"+req.originalUrl);
   console.log(req.query);
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
});
app.use(bodyParser.json());
app.get("/music/list", router_music_list);
app.get("/music/item",router_music_item);
app.use("/album",router_album);
var server = app.listen(80, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log('Example app listening at http://%s:%s', host, port);
});