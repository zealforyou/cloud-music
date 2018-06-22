var fs = require("fs");
var rootPath = "C:\\Users\\zhuo.zhang\\Downloads\\KugouPlayer_219_V8.9.8\\r";
var destPath = rootPath.substring(0, rootPath.lastIndexOf("\\") + 1) + "AAAAll";

function readDir(dirPath) {
   fs.readdir(dirPath,
      function (err, files) {
         if (err) {
            console.log(err);
            return;
         }
         files.forEach(function (file) {
            fs.stat(dirPath + "/" + file, function (err, stats) {
               if (stats.isFile() && file.endsWith(".png")) {
                  fs.readFile(dirPath + "/" + file, 'base64', function (err, data) {
                     if (err) {
                        console.log(err);
                     }
                     fs.writeFile(destPath + "/" + file, data, "base64", function (err) {
                        if (err) {
                           return console.error(err);
                        }
                     });
                  });
               } else if (stats.isDirectory()) {
                  readDir(dirPath + "/" + file);
               }
            });
         });
      });
}

fs.exists(destPath, function (r) {
   if (r) {
      readDir(rootPath);
   } else {
      fs.mkdir(destPath, function (err) {
         if (err) {
            return console.error(err);
         }
         readDir(rootPath);
      })
   }
});