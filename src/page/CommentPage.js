import React, {Component} from 'react';
import './css/CommentPage.scss';

export default class CommentPage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {

   }

   //组件已经挂载
   componentDidMount() {

   }

   //组件即将销毁
   componentWillUnmount() {

   }

   //渲染
   render() {
      return (
         <div className='Comment'>
               <div className="header">
                  <span onClick={()=>{
                     this.props.history.push(" ");
                  }}>
                     <img src={require('../img/ic_left.png')} alt=""/>
                  </span>
                  <span>评论(67364753)</span>
               </div>

         </div>

      )
   }
}