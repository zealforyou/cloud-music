import React, {Component} from 'react';
import {localManager} from "../utils/LocalManager";
import MenuTab from "../view/MenuTab";
import "../view/MenuTab.scss";
import "./css/Mypage.scss";
import "./css/FindPage.scss";


export default class FindPage extends Component {
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
         <div className="Find Mypage">
            <div style={{position: 'fixed', width: '100%'}}>
               <div className="mypage app-title flex-row-center">
               <span>
                  <img src={require('../img/ov.png')} alt="" onClick={()=>{
                     this.props.showToast("是否切换账号",function (e) {
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
               <MenuTab selectItem={0} menus={[{title: '发现'}, {title: '我的'}, {title: '电台'}]}/>
            </div>
            <div className="swiper"> </div>
            <div className="find_title flex-row-center">
               <div className="flex-c-center">
                  <img src={require('../img/FM.png')} alt=""/>
                  <span>私人FM</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/tuijian.png')} alt=""/>
                  <span>每日推荐</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/gedan.png')} alt=""/>
                  <span>歌单</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/paihang.png')} alt=""/>
                  <span>排行榜</span>
               </div>
            </div>
            <div className="recommend flex-row-center">
                  <p>推荐歌单</p>
                  <img src={require('../img/a2u.png')} alt=""/>
            </div>

            <div className="recommend_song flex-row-center">
               <div className="flex-c-center">
                  <img src={require('../img/a20.9.png')} alt=""/>
                  <span>私人FM</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/qingren.jpg')} alt=""/>
                  <span>每日推荐</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/album_default.png')} alt=""/>
                  <span>歌单</span>
               </div>
            </div>

         </div>
      )
   }
}