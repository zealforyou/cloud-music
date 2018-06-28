import React, {Component} from 'react';
import MenuTab from "../view/MenuTab";
import "../view/MenuTab.scss";
import "./css/Mypage.scss";

export default class Mypage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.setState({
         showSongSheet:true,
         animation:'none'
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
         <div className="Mypage">
            <div className="mypage flex-row-center">
               <span>
                  <img src={require('../img/ov.png')} alt=""/>
               </span>
               <div className="center flex-row" style={{justifyContent: 'center'}}>
                  <img src={require('../img/video.png')} alt=""/>
                  <img src={require('../img/wangyi.png')} alt=""/>
                  <img src={require('../img/friends.png')} alt=""/>
               </div>
               <span>
                  <img src={require('../img/pf.png')} alt=""/>
               </span>
            </div>
            <MenuTab selectItem={1} menus={[{title: '发现'}, {title: '我的'}, {title: '电台'}]}/>
            <div className="page_list">
               <div className="flex-row">
                     <span>
                        <img src={require('../img/a1_.png')} alt=""/>
                     </span>
                  <div>本地音乐 <em>(2)</em></div>
               </div>
               <div className="flex-row">
                     <span>
                        <img src={require('../img/a1n.png')} alt=""/>
                     </span>
                  <div>最近播放 <em>(112)</em></div>
               </div>
               <div className="flex-row">
                     <span>
                        <img src={require('../img/a0t.png')} alt=""/>
                     </span>
                  <div>下载管理 <em>(0)</em></div>
               </div>
               <div className="flex-row">
                     <span>
                        <img src={require('../img/a1l.png')} alt=""/>
                     </span>
                  <div>我的电台 <em>(1)</em></div>
               </div>
               <div className="flex-row">
                     <span>
                        <img src={require('../img/a0n.png')} alt=""/>
                     </span>
                  <div>我的收藏 <em>(23)</em></div>
               </div>
            </div>

            <div className="page_title" onClick={() => {
                  this.setState({
                     showSongSheet:!this.state.showSongSheet,
                     animation:this.state.showSongSheet?'anim-up 0.3s forwards':'anim-down 0.3s forwards'
                  });
            }}>
               <span>
                  <img src={require('../img/a2u.png')} alt=""
                  style={{animation:this.state.animation}}/>
               </span>
               <span>创建的歌单(12)</span>
            </div>

            <div className="song_sheet flex-row" style={{
               display:this.state.showSongSheet?"flex":'none'
            }}>
               <span className="song_img">
                  <img src={require('../img/aj7.png')} alt=""/>
                  <em className="mask"></em>
                  <img src={require('../img/akx.png')} alt="" className="maskimg"/>
               </span>
               <div className="song_right flex-row-center">
                  <div className="text flex-c" style={{flexGrow: "1"}}>
                     <span>我喜欢的音乐</span>
                     <span>1213首</span>
                  </div>
                  <div>
                     <img src={require('../img/a3c.png')} alt=""/>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}