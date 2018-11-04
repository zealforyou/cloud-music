const defaultStatus={
   data:[],
   recommendData:[]
};
const searchActionType={
   SET_DATA:'search_set_data',
   SET_RECOMMEND_DATA:'recommend_set_data',
};
function searchState(state=defaultStatus,action) {
   switch (action.type){
      case searchActionType.SET_DATA:
         return {...state,data:action.data};
      case searchActionType.SET_RECOMMEND_DATA:
         return {...state,recommendData:action.data};
   }
   return state;
}
export {searchActionType,searchState}