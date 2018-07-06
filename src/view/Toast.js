import React, {Component} from 'react';
import './Toast.scss'
export default class Toast extends Component {
   constructor() {
      super();

   }
   showing=false;
   componentWillReceiveProps(props) {
      if (props.show){

      }
   }
   render() {
      return (
         <div className='Toast' style={{display:this.props.show?'flex':'none'}}>
            <span>
               {this.props.content}
            </span>
         </div>
      );
   }

}

