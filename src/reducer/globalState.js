const def={
   showPlay:false
};
const actionType={
   ACTION_SHOW_PLAY_CONTROLLER:'show_play_controller'
};
function globalState(state=def,action) {
   switch (action.type) {
      case actionType.ACTION_SHOW_PLAY_CONTROLLER:
         return {...state,showPlay:action.showPlay}
   }
   return state;
}

export {actionType,globalState}