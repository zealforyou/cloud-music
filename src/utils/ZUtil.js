import{connect} from 'react-redux';
import {actionType as globalType} from "../reducer/globalState";

function component(mapStateToProps,mapDispatchToProps,Class) {
   let outObj;
   let _Class=Class;
   let tempMapDispatchToProps=(dispatch)=>{
      let mdtp=mapDispatchToProps?mapDispatchToProps(dispatch):{};
      let obj={
         showToast(content){
            dispatch({type:globalType.ACTION_SHOW_TOAST,toast:{content}})
         },
         hideToast(){
            dispatch({type:globalType.ACTION_HIDE_TOAST});
         },
         showLoading(){
            dispatch({type:globalType.ACTION_SHOW_LOADING,loading:{}})
         },
         hideLoading(){
            dispatch({type:globalType.ACTION_HIDE_LOADING});
         }
      };
      _Class.prototype.showToast=obj.showToast;
      _Class.prototype.hideToast=obj.hideToast;
      _Class.prototype.showLoading=obj.showLoading;
      _Class.prototype.hideLoading=obj.hideLoading;
      return {
         ...obj,
         ...mdtp
      }
   };
   Class=connect(mapStateToProps,tempMapDispatchToProps)(Class);
   return Class;
}
export {component}