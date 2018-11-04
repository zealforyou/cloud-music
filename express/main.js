var express = require('express');
var router_music_list=require('./router/router_music_list');
var router_music_item=require('./router/router_music_item');
var router_album=require('./router/router_album');
var router_user=require('./router/router_user');
var router_system=require('./router/router_system');
var bodyParser=require('body-parser');
var app = express();
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
// 超时时间
const TIME_OUT = 30 * 1e3;
// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
   if (!req.timedout) next();
});
const  HOST = 'http://www.gequdaquan.net';
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
app.use("/user",router_user);
app.use("/system",router_system);
app.use('/gqss/api.php', proxy({ target: HOST, changeOrigin: true }));
var server = app.listen(80, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log('Example app listening at http://%s:%s', host, port);
});