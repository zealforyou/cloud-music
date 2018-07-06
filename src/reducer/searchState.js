const defaultStatus={
   data:[]
};
const searchActionType={
   SET_DATA:'search_set_data'
};
function searchState(state=defaultStatus,action) {
   switch (action.type){
      case searchActionType.SET_DATA:
         return {...state,data:action.data};
   }
   return state;
}
export {searchActionType,searchState}