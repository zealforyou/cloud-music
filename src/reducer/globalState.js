
const def = {
   homePageIndex:0,
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
      show: false,
      content: "加载中..."
   },
   dialog: {
      component: null,
      show: false,
      data:null
   }
};
const actionType = {
   ACTION_SHOW_PLAY_CONTROLLER: 'show_play_controller',
   ACTION_SHOW_TOAST: 'action_show_toast',
   ACTION_HIDE_TOAST: 'action_hide_toast',
   ACTION_SHOW_LOADING: 'action_show_loading',
   ACTION_HIDE_LOADING: ' action_hide_loading',
   ACTION_SHOW_DIALOG: ' action_show_dialog',
   ACTION_HIDE_DIALOG: ' action_hide_dialog',
   ACTION_SET_HOME_INDEX: ' action_set_home_index',
};

function globalState(state = def, action) {
   switch (action.type) {
      case actionType.ACTION_SET_HOME_INDEX:
         return {...state, homePageIndex: action.homePageIndex};
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
         return {...state, loading: {...state.loading, ...action.loading, show: false}};
      case actionType.ACTION_SHOW_DIALOG:
         return {
            ...state, dialog: {
               ...action.dialog, show: true
            }
         };
      case actionType.ACTION_HIDE_DIALOG:
         return {...state, dialog: {...state.dialog, component: null, show: false}}
   }
   return state;
}

export {actionType, globalState}