const query = require('../dao/InitDao');
var express = require('express');
var baseResult = require('../BaseResult');
var router = express.Router();
router.get("/getUser", async (req, res) => {
   let phone = req.query.phone;
   try {
      let sql = "select * from tb_user where user_id=?";
      let user = await query(sql, [phone]);
      res.send(baseResult(0, '', {...user[0]}));
   } catch (e) {
      console.log(e);
      res.send(baseResult(1, "数据库错误"))
   }
});
router.get("/register", async (req, res) => {
   let phone = req.query.phone;
   let name = req.query.name;
   let avatar = req.query.avatar;
   try {
      let sql = "select * from tb_user where user_id=?";
      let update = "update  tb_user set user_name=? where user_id=?";
      let sql_insert = "insert into  tb_user (user_id,user_name) value(?,?)";
      let sql_create_album = "insert into  tb_album (user_id,album_name,type) value(?,'我喜欢的音乐',0)";
      var user = await query(sql, [phone]);
      if (user && user.length > 0) {
         if (name !== user[0].user_name) {
            await query(update, [name, phone]);
         }
         res.send(baseResult(0, '', {...user[0], user_name: name}));
      } else {
         await query(sql_insert, [phone, name]);
         await query(sql_create_album, [phone]);
         res.send(baseResult(0, '', {user_id: phone, user_name: name}));
      }
   } catch (e) {
      res.send(baseResult(1, "数据库错误"))
   }
});
router.post("/setComment", async (req, res) => {
   let phone = req.body.phone;
   let content = req.body.content;
   let music_id = req.body.music_id;
   try {
      let sql = "INSERT INTO tb_comment (content,user_id,music_id) VALUES (?,?,?)";
      let result = await query(sql, [content, phone, music_id]);
      res.send(baseResult(0, '评论成功', {}));
   } catch (e) {
      console.log(e);
      res.send(baseResult(1, "数据库错误"))
   }
});
router.get("/setCommentLike", async (req, res) => {
   let phone = req.query.phone;
   let comment_id = req.query.comment_id;
   let isLike = 0;
   try {
      let sql = "SELECT * FROM  tb_comment_like WHERE user_id=? AND comment_id=?";
      let result = await query(sql, [phone, comment_id]);
      isLike = result.length > 0 ? 0 : 1;
   } catch (e) {
      console.log(e);
   }
   try {
      let sql;
      if (isLike === 0) {
         sql = "DELETE FROM tb_comment_like WHERE user_id=? AND comment_id=?";
      } else {
         sql = "INSERT INTO tb_comment_like (user_id,comment_id) VALUES(?,?)";
      }
      let result = await query(sql, [phone, comment_id]);
      console.log("setCommentLike:" + result);
      res.send(baseResult(0, isLike === 0 ? '取消点赞成功' : '点赞成功', {
         isLike: isLike === 0 ? 1 : 0
      }));
   } catch (e) {
      console.log(e);
      res.send(baseResult(1, "数据库错误"))
   }
});
router.get("/getComment", async (req, res) => {
   let music_id = req.query.music_id;
   let phone = req.query.phone;
   try {
      let sql = "SELECT a.*,IF(find_in_set(?,GROUP_CONCAT(c.user_id)) > 0,0,1) AS isLike," +
         "b.user_name,COUNT(c.id) as likeCount FROM tb_comment a \n" +
         "LEFT JOIN tb_user b ON a.user_id = b.user_id\n" +
         "LEFT JOIN tb_comment_like c ON a.id = c.comment_id\n" +
         "WHERE a.music_id = ?\n" +
         "GROUP BY a.id ORDER BY a.create_date DESC\n";
      let commentList = await query(sql, [phone, music_id]);
      res.send(baseResult(0, '', {commentList: commentList}));
   } catch (e) {
      console.log(e);
      res.send(baseResult(1, "数据库错误"))
   }
});
module.exports = router;