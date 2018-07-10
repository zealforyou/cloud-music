import React, {Component} from 'react';
import './Loading.scss'
import {connect} from 'react-redux'

class Loading extends Component {
   constructor() {
      super();

   }

   render() {
      let loading = this.props.loading;
      return (
         <div className='Loading' style={{display: loading.show ? 'flex' : 'none'}}>
            <div className='center'>
               <img src={require('../img/loading_throbber.png')}
                    style={{animation:loading.show?'loading-animation 1s linear infinite':'none',
                    width:"35px"}}/>
               <span className='toast-content'>
                  {loading.content}
               </span>
            </div>
         </div>
      );
   }

}

let mapStateToProps = (state) => {
   return {
      loading: state.globalState.loading
   }
};

Loading = connect(mapStateToProps, null)(Loading);
export default Loading;

