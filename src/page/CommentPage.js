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

               <span>
                   <em><img src={require('../img/ic_left.png')} alt=""/></em>
                  <em>评论(67364753)</em>

               </span>
         </div>

      )
   }
}