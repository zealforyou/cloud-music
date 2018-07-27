const query= require('../dao/InitDao');
var express = require('express');
var baseResult = require('../BaseResult');
var router = express.Router();
router.get("/getUser",async(req,res)=>{
   let phone= req.query.phone;
   try {
      let sql="select * from tb_user where user_id=?";
      let user=await query(sql,[phone]);
      res.send(baseResult(0,'',{...user[0]}));
   }catch (e) {
      console.log(e);
      res.send(baseResult(1,"数据库错误"))
   }
});
router.get("/register",async (req,res)=>{
   let phone= req.query.phone;
   let name= req.query.name;
   let avatar=req.query.avatar;
   try {
      let sql="select * from tb_user where user_id=?";
      let update="update  tb_user set user_name=? where user_id=?";
      let sql_insert="insert into  tb_user (user_id,user_name) value(?,?)";
      let sql_create_album="insert into  tb_album (user_id,album_name,type) value(?,'我喜欢的音乐',0)";
      var user=await query(sql,[phone]);
      if (user&&user.length>0){
         if (name!==user[0].user_name){
            await query(update,[name,phone]);
         }
         res.send(baseResult(0,'',{...user[0],user_name:name}));
      }else{
         await query(sql_insert,[phone,name]);
         await query(sql_create_album,[phone]);
         res.send(baseResult(0,'',{user_id:phone,user_name:name}));
      }
   }catch (e) {
      res.send(baseResult(1,"数据库错误"))
   }
});
module.exports = router;