var fetch = require('node-fetch');
module.exports=function (req, res) {
   let url = `http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURI(req.query.keyword)}&page=${req.query.page}&pagesize=${req.query.pagesize}&showtype=1`;
   console.log(url);
   fetch(url,{
      method:'GET',
      headers: {
         "Content-Type": "application/json;charset=utf-8"
      }
   })
      .then((result)=>{
         return result.json();
      })
      .then(function (result) {
         res.send(result);
      }).catch(function (e) {
      console.log(e);
      res.send("no-data");
   });
};