var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//创建连接
var connection = mysql.createConnection({
   host: '172.22.203.99',
   port: '3306',
   user: 'root',
   password: '123456',
   database: 'zhangzhuo'
});
//执行创建连接
connection.connect();
//SQL语句
var  sql = 'SELECT a.*,COUNT(b.id) as count,b.pic from tb_album a,tb_music b WHERE a.id = b.album_id GROUP BY a.id  ORDER BY a.id,b.id';

router.get('/getList', function (req, res) {
   connection.query(sql,function (err, result) {
      if(err){
         console.log('[SELECT ERROR] - ',err.message);
         res.end();
         return;
      }
      //把搜索值输出
      res.send(result);
   });
});

router.get('/getMusic', function (req, res) {
   let sql_get_music="SELECT * from tb_music t where t.album_id="+req.query.album_id;
   connection.query(sql_get_music,function (err, result) {
      if(err){
         console.log('[SELECT ERROR] - ',err.message);
         res.end();
         return;
      }
      //把搜索值输出
      res.send(result);
   });
});
module.exports = router;