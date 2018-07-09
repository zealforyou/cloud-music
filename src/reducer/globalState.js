const def = {
   showPlay: false,
   toast: {
      show: false,
      title: '提示',
      content: "",
      left: '',
      right: '确定',
      onClick: null
   }
};
const actionType = {
   ACTION_SHOW_PLAY_CONTROLLER: 'show_play_controller',
   ACTION_SHOW_TOAST: 'action_show_toast',
   ACTION_HIDE_TOAST: 'action_hide_toast'
};

function globalState(state = def, action) {
   switch (action.type) {
      case actionType.ACTION_SHOW_PLAY_CONTROLLER:
         return {...state, showPlay: action.showPlay};
      case actionType.ACTION_SHOW_TOAST:
         return {
            ...state, toast: {
               ...action.toast,
               title: action.toast.title ? action.toast.title : state.toast.title,
               right:action.toast.right?action.toast.right:state.toast.right,
               show: true
            }
         };
      case actionType.ACTION_HIDE_TOAST:
         return {...state, toast: {...state.toast,...action.toast, show: false}}
   }
   return state;
}

export {actionType, globalState}