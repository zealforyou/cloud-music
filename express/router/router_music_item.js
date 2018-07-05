var fetch = require('node-fetch');
module.exports= function (req, res) {
   let url = `http://www.kugou.com/yy/index.php?r=play/getdata&hash=${req.query.hash}`;
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
         console.log(result);
      }).catch(function (e) {
      console.log(e);
      res.send("no-data");
   });
};