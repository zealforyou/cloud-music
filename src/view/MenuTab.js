import React, {Component} from 'react';
import './MenuTab.scss';
import $ from 'jquery';

export default class MenuTab extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      let menuCount = this.props.menus.length;
      let width = 100 / parseInt(menuCount);
      this.setState({
         pressId: -1,
         animationName: 'none',
         childWidth: width
      });
   }

   //组件已经挂载
   componentDidMount() {

   }

   //组件即将销毁
   componentWillUnmount() {

   }

   //渲染
   render() {
      var _this = this;
      return (
         <div className="MenuTab">
            <div className='menu-root'>
               {
                  this.props.menus.map(function (value, index, att) {
                     return (
                        <div className='child' style={{
                           animation: _this.state.pressId === index ? _this.state.animationName : 'none',
                           width: _this.state.childWidth + '%',
                        }}
                             onTouchStart={(e) => {
                                _this.setState({
                                   animationName: 'fade-in 3s forwards',
                                   pressId: index
                                });
                             }}
                             onTouchEnd={(e) => {
                                _this.setState({
                                   animationName: 'fade-out 0.5s forwards',
                                   pressId: index
                                });
                             }}
                             onClick={(e) => {
                                $('#readLine').animate({left: (index) * _this.state.childWidth + '%'});
                                if (_this.props.itemClick){
                                   _this.props.itemClick(index);
                                }
                             }}>
                           {value.title}
                        </div>
                     )
                  })
               }
               <div className='red-line'>

                  <div id='readLine'
                       style={{
                          width: _this.state.childWidth + '%',
                          left: (this.props.selectItem && this.props.selectItem < this.props.menus.length
                             ? this.props.selectItem * _this.state.childWidth : 0) + '%'
                       }}>
                     <div></div>
                  </div>
               </div>

            </div>
         </div>
      )
   }
}