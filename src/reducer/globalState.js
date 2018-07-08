const def = {
   showPlay: false,
   toast: {
      show: false,
      title: '提示',
      content: "",
      left: '',
      right: '确定',
      onClick: null
   },
   loading: {
      show: false
      ,
      content: "加载中..."
   }
};
const actionType = {
   ACTION_SHOW_PLAY_CONTROLLER: 'show_play_controller',
   ACTION_SHOW_TOAST: 'action_show_toast',
   ACTION_HIDE_TOAST: 'action_hide_toast',
   ACTION_SHOW_LOADING: 'action_show_loading',
   ACTION_HIDE_LOADING: ' action_hide_loading'
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
               right: action.toast.right ? action.toast.right : state.toast.right,
               show: true
            }
         };
      case actionType.ACTION_HIDE_TOAST:
         return {...state, toast: {...state.toast, ...action.toast, show: false}};
      case actionType.ACTION_SHOW_LOADING:
         return {
            ...state, loading: {
               ...action.loading, show: true,
               content: action.loading.content ? action.loading.content : state.loading.content
            }
         };
      case actionType.ACTION_HIDE_LOADING:
         return {...state, loading: {...state.loading, ...action.loading, show: false}}
   }
   return state;
}

export {actionType, globalState}