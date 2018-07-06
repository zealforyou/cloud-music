const query= require('../dao/InitDao');
var express = require('express');
var router = express.Router();

//SQL语句


router.get('/getList', async function (req, res) {
   var  sql = 'SELECT a.*,COUNT(b.id) as count,b.pic from tb_album a left join tb_music b on a.id = b.album_id where 1=1 GROUP BY a.id  ORDER BY a.id,b.create_time desc';
   let rows=await query(sql);
   //把搜索值输出
   res.send(rows);
});

router.get('/getMusic', async function (req, res) {
   let sql_get_music="SELECT * from tb_music t where t.album_id="+req.query.album_id+' ORDER BY t.create_time desc';
   let rows=await query(sql_get_music);
   res.send(rows);
});
router.get('/isLike',async function (req, res) {
   let music_id=req.query.music_id;
   if(!music_id) res.end();
   let sql=`SELECT * from tb_music t where t.id='${music_id}' and t.album_id=0`;
   let rows=await query(sql);
   res.send({result: rows && rows.length > 0});
});
router.post('/setLike',async function (req, res) {
   let id=req.body.data.music_id;
   let name=req.body.data.name;
   let author=req.body.data.author;
   let url=req.body.data.url;
   let pic=req.body.data.pic;
   let lrc1=req.body.data.lrc1;
   if(!id) res.end();
   let sql=`SELECT * from tb_music t where t.id='${id}' and t.album_id=0`;

   let rows;
   try{
      rows=await query(sql);
   }catch (e){
      res.end();
      console.log(e);
      return;
   }
   let result;
   let error_code=0;
   let error_msg="";
   let liked=null;
   if(rows&&rows.length>0){
       sql=`DELETE FROM tb_music WHERE id='${id}' AND album_id=0`;
       try{
          await query(sql);
          liked=false;
       }catch (e){
          error_code=1;
          error_msg=e;
       }

   }else {
       sql=`INSERT INTO tb_music  (id,name,author,url,pic,lrc1,album_id) VALUES (?,?,?,?,?,?,?)`;
      try{
         result=await query(sql,[id,name,author,url,pic,lrc1,0]);
         liked=true;
      }catch (e){
         error_code=1;
         error_msg=e;
      }
   }
   result={
      error_code,
      error_msg,
      liked
   };
   res.send(result);
});

module.exports = router;