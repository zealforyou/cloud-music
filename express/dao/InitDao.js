const mysql = require('mysql');
//创建连接
const pool = mysql.createPool({
   host: 'localhost',
   port: '3306',
   user: 'root',
   password: '123456',
   database: 'cloud-music'
});
// 接收一个sql语句 以及所需的values // 这里接收第二参数values的原因是可以使用mysql的占位符 '?' // 比如 query(`select * from my_database where id = ?`, [1])
let query = function (sql, values) {
// 返回一个 Promise
   return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
         if (err) {
            reject(err)
         } else {
            connection.query(sql, values, (err, rows) => {
               if (err) {
                  reject(err)
               } else {
                  resolve(rows)
               }
               // 结束会话
               connection.release()
            })
         }
      })
   })
};
module.exports = query;