var fetch = require('node-fetch');
var query=require('../dao/InitDao');
module.exports= async function (req, res) {
   let keyword = encodeURI(req.query.keyword);
   let user_id = encodeURI(req.query.user_id);
   if(user_id){
      let sql="insert into tb_search_log (user_id,keyword) values (?,?)";
      await query(sql,[user_id,req.query.keyword])
   }
   let url = `http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${keyword}&page=${req.query.page}&pagesize=${req.query.pagesize}&showtype=1`;
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