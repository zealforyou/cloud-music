const query = require('../dao/InitDao');
var express = require('express');
var router = express.Router();
const baseResult = require('../BaseResult');
//SQL语句


router.get('/getList', async function (req, res) {
   let user_id = req.query.phone;
   var sql = 'select t1.*,\n' +
      'SUBSTRING_INDEX(GROUP_CONCAT(t2.pic ORDER BY t2.create_time desc SEPARATOR \'|\'),\'|\',1) as pic,\n' +
      't1.id as album_id,count(t2.id) as count\n' +
      'from tb_album t1 \n' +
      'left JOIN tb_music t2 on t1.id=t2.album_id where t1.user_id=?\n' +
      'GROUP BY t1.id\n' +
      'ORDER BY t1.type,create_time desc';
   let rows = await query(sql, [user_id]);
   //把搜索值输出
   res.send(rows);
});

router.get('/getMusic', async function (req, res) {
   let sql_get_music = "SELECT * from tb_music t where t.album_id=" + req.query.album_id + ' ORDER BY t.create_time desc';
   let rows = await query(sql_get_music);
   res.send(rows);
});
router.get('/isLike', async function (req, res) {
   let music_id = req.query.music_id;
   let phone = req.query.phone;
   if (!music_id) res.end();
   let sql = `SELECT * from tb_music t JOIN tb_album t2 on t.album_id=t2.id where t.id=? and t2.user_id=? and t2.type=0`;
   try {
      let rows = await query(sql, [music_id, phone]);
      res.send({result: rows && rows.length > 0});
   } catch (e) {
      console.log(e);
      res.send(baseResult(0, "数据库错误"));
   }

});
router.post('/setLike', async function (req, res) {
   let user_id = req.body.phone;
   let id = req.body.id;
   let name = req.body.name;
   let author = req.body.author;
   let url = req.body.url;
   let pic = req.body.pic;
   let lrc1 = req.body.lrc1;
   let sq = req.body.sq;
   if (!id) res.end();
   let sql = `SELECT * from tb_music t JOIN tb_album t2 on t.album_id=t2.id where t.id=? and t2.user_id=? and t2.type=0`;

   let rows;
   try {
      rows = await query(sql, [id, user_id]);
   } catch (e) {
      res.end();
      console.log(e);
      return;
   }
   let result;
   let error_code = 0;
   let error_msg = "";
   let liked = null;
   if (rows && rows.length > 0) {
      sql = `DELETE t FROM tb_music t JOIN tb_album t2 on t.album_id=t2.id where t.id=? and t2.user_id=? and t2.type=0`;
      try {
         await query(sql, [id, user_id]);
         liked = false;
      } catch (e) {
         error_code = 1;
         error_msg = e;
      }

   } else {
      try {
         sql = 'select id from tb_album t where t.user_id=? and t.type=0';
         result = await query(sql, [user_id]);
         sql = `INSERT INTO tb_music (id,name,author,url,pic,lrc1,album_id,sq) VALUES (?,?,?,?,?,?,?,?)`;
         await query(sql, [id, name, author, url, pic, lrc1, result[0].id,sq]);
         liked = true;
      } catch (e) {
         error_code = 1;
         error_msg = e;
      }
   }
   result = {
      error_code,
      error_msg,
      liked
   };
   res.send(result);
});

router.get('/create', async function (req, res) {
   let albumName = req.query.album_name;
   let phone = req.query.phone;
   try {
      let sql="insert into tb_album (user_id,album_name,type) values(?,?,1)";
      await query(sql,[phone,albumName]);
      res.send(baseResult(0,'创建歌单成功'));
   } catch (e) {
      res.send(baseResult(1,'创建歌单失败'));
   }
});

router.post('/collect', async function (req, res) {
   let album_id = req.body.album_id;
   let phone = req.body.phone;
   let id = req.body.id;
   let name = req.body.name;
   let author = req.body.author;
   let url = req.body.url;
   let pic = req.body.pic;
   let lrc1 = req.body.lrc1;
   let sq = req.body.sq;
   try {
      let sql="select * from tb_music where album_id=? and id=?";
      let result=await query(sql,[album_id,id]);
      if(result&&result.length>0){
         res.send(baseResult(1,'改歌单已收藏了此歌曲'));
         return;
      }
       sql="insert into tb_music (id,name,author,url,pic,lrc1,album_id,sq) values(?,?,?,?,?,?,?,?)";
      await query(sql,[id,name,author,url,pic,lrc1,album_id,sq]);
      res.send(baseResult(0,'收藏成功'));
   } catch (e) {
      res.send(baseResult(1,'收藏失败'));
   }
});


module.exports = router;