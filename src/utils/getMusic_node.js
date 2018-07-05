const http = require('http');
const fs = require('fs');
const path = require('path');
var body = '';
var req = http.request({
   host: "www.kugou.com",
   port: 80,
   headers: {
      "content-type": 'application/json'
   },
   path: '/yy/index.php?r=play/getdata&hash=39040fb0508a9e09010992560368ebaa'
}, function (res) {
   res.setEncoding('utf-8');
   res.on('data', function (chunk) {
      body += chunk;
   }).on('end', function () {
      let result = JSON.parse(body);
      let obj = {
         name: result.data.song_name,
         author: result.data.author_name,
         url: result.data.play_url,
         pic: result.data.img,
         lrc1: "@@"
      }
      let wstr = JSON.stringify(obj);
      let lrcFile = result.data.song_name.replace(/ +/, '');
      wstr = wstr.replace("\"@@\"", `require('./lrcs/${lrcFile}')`);
      let musicJsonFile=path.resolve(__dirname,"./music.json");
      // fs.existsSync(musicJsonFile);
      fs.appendFile(musicJsonFile, wstr + ',\r\n', 'utf-8');
      fs.writeFile(path.resolve(__dirname, '../lrcs/' + lrcFile),
         result.data.lyrics.replace("\"", ''), 'utf-8')
   });
});
req.on('error', function (e) {
   console.log(e);
})
req.end();