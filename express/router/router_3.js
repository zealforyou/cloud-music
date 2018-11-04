var request=require("http");
var express = require('express');
var router = express.Router();
router.get('/api.php', async function (req, res) {
   let type = req.query.types;
   switch (type) {
      case "search":
         search(req,res,type);
         break;
      case "url":
         break;
      case "pic":
         break;
      case "lyric":
         break;
      case "playlist":
         break;
   }
});

function search(req, res, type) {
   // let count=req.query.count;
   // let pages=req.query.pages;
   // let source=req.query.source;
   // let name=req.query.name;
   let url = `http://www.gequdaquan.net/`+req.url;
   // console.log(url);
   // fetch(url, {
   //    method: 'GET',
   //    dataType: "jsonp",
   //    header:{
   //       "user-agent":"PostmanRuntime/7.1.1",
   //       accept:"*/*"
   //    }
   // })
   //    .then((result) => {
   //       return result.text();
   //    })
   //    .then(function (result) {
   //       res.send(result);
   //       console.log(result);
   //    }).catch(function (e) {
   //    console.log(e);
   //    res.send("no-data");
   // });
   req.pipe(request(url)).pipe(res);

}
module.exports = router;