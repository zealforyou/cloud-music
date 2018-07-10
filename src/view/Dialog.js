import React, {Component} from 'react';
import "./dialog.scss";
import {component} from "../utils/ZUtil";

class Dialog extends Component {
   constructor() {
      super();
   }

   render() {
      let dialog = this.props.dialog;
      let show = dialog.show;
      let MDialog = dialog.component;
      return (
         <div className='Common-Dialog' style={{display:show?"block":'none'}} onClick={()=>{
            this.hideDialog();
         }}>
            {MDialog && show ? <MDialog/> : ''}
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      dialog: state.globalState.dialog
   }
};
const mapDispatchToProps = (dispatch) => {
   return {}
};
Dialog = component(mapStateToProps, mapDispatchToProps,Dialog);
export default Dialog