import React, {Component} from 'react';
import {localManager} from "../utils/LocalManager";
import MenuTab from "../view/MenuTab";
import "../view/MenuTab.scss";
import "./css/Mypage.scss";
import "./css/FindPage.scss";
import {Switch, Route} from 'react-router-dom';
import ListView from "../ListView";
import FindPage from "./FindPage";
import Mypage from "./Mypage";
import RadioStation from "./RadioStation";


export default class HomePage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {

      this.setState({
         likeId: []
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
      return (
         <div className="Find Mypage">
            <div style={{position: 'fixed', width: '100%', zIndex: '999'}}>
               <div className="mypage app-title flex-row-center">
               <span>
                  <img src={require('../img/ov.png')} alt="" onClick={() => {
                     this.props.showToast("是否切换账号", function (e) {
                        localManager.setPhone('');
                        localManager.setName('');
                        window.location.reload(true);
                     }.bind(this))
                  }}/>
               </span>
                  <div className="center flex-row" style={{justifyContent: 'center'}}>
                     <img src={require('../img/video.png')} alt=""/>
                     <img src={require('../img/wangyi.png')} alt=""/>
                     <img src={require('../img/friends.png')} alt=""/>
                  </div>
                  <span>
                  <img src={require('../img/pf.png')} alt="" onClick={() => {
                     this.props.history.push('/SearchPage');
                  }}/>
               </span>
               </div>
               <MenuTab selectItem={0} menus={[{title: '发现'}, {title: '我的'}, {title: '电台'}]}
                        itemClick={(index) => {
                           this.setState({currentPage:index})
                        }}/></div>
            {
               this.switchPage(this.state.currentPage)
            }
         </div>
      )
   }

   switchPage(index) {
      switch (index) {
         case 0:
            return <FindPage  history={this.props.history}/>;
         case 1:
            return <Mypage  history={this.props.history}/>;
         case 2:
            return <RadioStation  history={this.props.history}/>
      }
      return '';
   }
}