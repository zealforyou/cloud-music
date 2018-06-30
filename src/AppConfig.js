const PLAY_MODE={
   XH:0,
   // ONE:1,
   ONE_XH:2,
   SJ:3
};

const createPlayModer=function () {
   let playModer=[];
   for (let key in PLAY_MODE){
      playModer.push(PLAY_MODE[key]);
   } 
   return playModer;
};
export {createPlayModer,PLAY_MODE}