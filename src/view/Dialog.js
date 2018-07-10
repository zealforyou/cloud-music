import React, {Component} from 'react';
import "./dialog.scss";
import {connect} from 'react-redux';

class Dialog extends Component {
   constructor() {
      super();
   }

   render() {
      let dialog = this.props.dialog;
      let show = dialog.show;
      let MDialog = dialog.component;
      return (
         <div className='Common-Dialog' style={{display:show?"block":'none'}}>
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
Dialog = connect(mapStateToProps, mapDispatchToProps)(Dialog);
export default Dialog