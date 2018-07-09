import React, {Component} from 'react';
import './Toast.scss'
import {connect} from 'react-redux'
import {actionType} from "../reducer/globalState";

class Toast extends Component {
   constructor() {
      super();

   }

   render() {
      let toast = this.props.toast;
      return (
         <div className='Toast' style={{display: toast.show ? 'flex' : 'none'}}>
            <div className='center'>
               <span className='toast-title'>
                  {toast.title}
               </span>
               <span className='toast-content'>
                  {toast.content}
               </span>
               <div className='flex-row-center' style={{width: '100%', borderTop: "1px solid #f1f1f1"}}>
                  <div className='toast-btn' style={{display:toast.left?'block':'none',borderRight: '1px solid #f1f1f1'}}
                       onClick={() => {
                          this.props.hideToast();
                       }}>
                     {toast.left}
                  </div>
                  <div className='toast-btn'
                       onClick={(e) => {
                          if (toast.onClick) {
                             toast.onClick(e);
                          }
                          this.props.hideToast();
                       }}>
                     {toast.right}
                  </div>
               </div>
            </div>
         </div>
      );
   }

}

let mapStateToProps = (state) => {
   return {
      toast: state.globalState.toast
   }
};
let mapDispatchToProps = (dispatch) => {
   return {
      hideToast() {
         dispatch({type: actionType.ACTION_HIDE_TOAST});
      }
   }
};
Toast = connect(mapStateToProps, mapDispatchToProps)(Toast);
export default Toast;

