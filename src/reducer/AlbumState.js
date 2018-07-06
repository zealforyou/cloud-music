const defaultStatus = {
   data:[],
   albumMusic:[]
};
const albumActionType = {
   SET_DATA:'album_set_data',
   SET_ALBUM_MUSIC:'set_album_music'
};

function albumState(state = defaultStatus, action) {
   switch (action.type) {
      case albumActionType.SET_DATA:
         return {...state,data:action.data};
      case albumActionType.SET_ALBUM_MUSIC:
         return {...state,albumMusic:action.albumMusic}
   }
   return state;
}

export {albumActionType, albumState}