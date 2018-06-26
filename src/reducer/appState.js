const def={
   duration:1,
   currentTime:0,
   progress: 0,
   playing: false,
   loaded: false,
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
};
function appState(state=def, action) {
   console.log(action);
   switch (action.type) {
      case actionType.SET_DURATION:
         return {...state,duration:action.duration};
      case actionType.SET_CURRENT_TIME:
         return {...state,currentTime:action.currentTime};
      case actionType.SET_PROGRESS:
         return {...state,progress:action.progress};
      case actionType.SET_PLAYING:
         return {...state,playing:action.playing};
      case actionType.SET_LOADED:
         return {...state,loaded:action.loaded};
      case actionType.SET_CURRENT_MUSIC:
         return {...state,currentMusic:action.currentMusic};
      case actionType.SET_ITEM:
         return {...state,item:action.item};
   }
   return state;
}
export {actionType,appState};