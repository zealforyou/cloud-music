import data from '../MusicList';

const def = {
   duration: 1,
   currentTime: 0,
   progress: 0,
   playing: false,
   loaded: false,
   canPlay: false,
   currentMusic: -1,
   item: {}
};
const actionType = {
   SET_PROGRESS: 'set_progress',
   SET_PLAYING: 'set_playing',
   SET_LOADED: 'set_loaded',
   SET_CURRENT_MUSIC: 'set_current_music',
   SET_ITEM: 'set_item',
   SET_DURATION: 'set_duration',
   SET_CURRENT_TIME: 'set_current_time',
   SET_CAN_PLAY: 'set_can_play',
   ACTION_PLAY_CURRENT_MUSIC: 'action_play_current_music',
   ACTION_PRE_MUSIC: 'action_pre_music',
   ACTION_NEXT_MUSIC: 'action_next_music',
};

function appState(state = def, action) {
  if (action.type!==actionType.SET_CURRENT_TIME
     &&action.type!==actionType.SET_PROGRESS
  ) {
     console.log(action);
  }
   let me;
   let cm;//计算音乐position
   switch (action.type) {
      case actionType.SET_DURATION:
         return {...state, duration: action.duration};
      case actionType.SET_CURRENT_TIME:
         return {...state, currentTime: action.currentTime};
      case actionType.SET_PROGRESS:
         return {...state, progress: action.progress};
      case actionType.SET_PLAYING:
         return {...state, playing: action.playing};
      case actionType.SET_LOADED:
         return {...state, loaded: action.loaded};
      case actionType.SET_CURRENT_MUSIC:
         return {...state, currentMusic: action.currentMusic};
      case actionType.SET_ITEM:
         return {...state, item: action.item};
      case actionType.SET_CAN_PLAY:
         return {...state, canPlay: action.canPlay};
      // 播放前一首
      case actionType.ACTION_PRE_MUSIC:
         cm = (state.currentMusic<= 0 )? data.length-1 : state.currentMusic - 1;
         console.log(cm);
         me = {
            currentMusic: cm,
            item: data[cm],
            playing: false,
            progress: 0,
            loaded: false,
            duration:1,
            currentTime:0
         };

         if (action.player) {
            action.player.pause();
            action.player.src = me.item.url;
            action.player.play();
         } else {
            return state
         }
         return {...state, ...me};
      // 播放下一首
      case actionType.ACTION_NEXT_MUSIC:
         cm = (state.currentMusic >= data.length-1) ? 0 : state.currentMusic + 1;
         console.log(data.length);
         me = {
            currentMusic: cm,
            item: data[cm],
            playing: false,
            progress: 0,
            loaded: false,
            duration:1,
            currentTime:0
         };

         if (action.player) {
            action.player.pause();
            action.player.src = me.item.url;
            action.player.play();
         } else {
            return state
         }
         return {...state, ...me};
      // 播放指定位置音乐
      case actionType.ACTION_PLAY_CURRENT_MUSIC:
         me = {
            currentMusic: action.currentMusic,
            item: action.item,
            playing: false,
            progress: 0,
            loaded: false,
            duration:1,
            currentTime:0
         };
         if (action.player) {
            action.player.pause();
            action.player.src = action.item.url;
            action.player.play();
         } else {
            return state
         }
         return {...state, ...me};
   }
   return state;
}

export {actionType, appState};