function parseLrc(lrc) {
   const result = {
      header: {},
      body: {
         times: [],//{time:number,lrc:string}
      }
   };

   function parseHead(line) {
      let split = line.split(':');
      switch (split[0]) {
         case 'ti':
            result.header.ti = split[1];
            break;
         case 'ar':
            result.header.ar = split[1];
            break;
         case 'al':
            result.header.al = split[1];
            break;
         case 'by':
            result.header.by = split[1];
            break;
      }
   }

   function parseBody(line) {
      let split = line.split(']');
      let lrc = '\n';
      let temp=[];
      for (let i = 0; i < split.length; i++) {
         let content = split[i];
         if (content.includes('[')) {//时间
            let timeStr = content.replace('[', '');
            let timeSp = timeStr.split(':');
            let s = parseInt(timeSp[0]) * 60 + parseFloat(timeSp[1]);
            let time = {};
            time.time = s;
            temp.push(time);
         } else {//歌词
            lrc = content?content:'';
         }
      }
      for (let i = 0; i < temp.length; i++) {
         temp[i].lrc = lrc;
      }
      result.body.times.push(...temp);
   }

   let split = lrc.split(/\n/g);
   for (let i = 0; i < split.length; i++) {
      let line = split[i];
      if (/^\[(ti|ar|al|by).*/.test(line)) {
         parseHead(line.replace(/\[|\]/g, ''));
      } else if (/^(\[\d{2}:\d{2,}.*\])+.*/.test(line)) {
         parseBody(line);
      }
   }
   result.body.times.sort(function (a, b) {
      return a.time - b.time;
   });
   return result;
}


module.exports = parseLrc;