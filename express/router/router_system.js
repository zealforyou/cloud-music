const query = require('../dao/InitDao');
var express = require('express');
var router = express.Router();
const baseResult = require('../BaseResult');

router.get('/getHostSearch', async function (req, res) {
   let sql_get_music = 'SELECT keyword,count(keyword) as count FROM `tb_search_log` t GROUP BY keyword ORDER BY count desc LIMIT 15';
   try {
      let rows = await query(sql_get_music);
      res.send(rows);
   } catch (e) {
      res.send(baseResult(1,'数据库错误'));
   }

});

module.exports = router;