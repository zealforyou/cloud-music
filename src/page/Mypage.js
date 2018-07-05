import React, {Component} from 'react';
import MenuTab from "../view/MenuTab";
import "../view/MenuTab.scss";
import "./css/Mypage.scss";
import SongSheet from "../view/SongSheet";
import "../view/SongSheet.scss";
import {connect} from "react-redux";
import {actionType} from "../reducer/globalState";
var baseUrl=require('../config/BaseUrl');
class Mypage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.setState({data:[]});
      this._getAlbumList();
   }

   componentDidMount() {
      this.props.setShowPlay(true);
   }

   componentWillUnmount() {
      this.props.setShowPlay(false);
   }

   _getAlbumList() {
      var _this = this;
      let url = baseUrl.base+"album/getList";
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         _this.setState({data: res});
      }).catch(() => {
      })
   }

   //渲染
   render() {
      return (
         <div className="Mypage">
            <div style={{position: 'fixed', width: '100%'}}>
               <div className="mypage app-title flex-row-center">
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
            </div>

            <div style={{paddingBottom: "50px", paddingTop: '115px'}}>
               <div className="page_list">
                  <div className="flex-row-center item">
                     <img src={require('../img/a1_.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>本地音乐</span>
                        <em>(2)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a1n.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>最近播放</span>
                        <em>(112)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a0t.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>下载管理</span>
                        <em>(0)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a1l.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>我的电台</span>
                        <em>(2)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a0n.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>我的收藏</span>
                        <em>(23)</em>
                     </div>
                  </div>


               </div>
               <SongSheet
                  data={this.state.data}
                  onItemClick={(position, item) => {
                     let path={
                       pathname:'/App',
                       query:{
                          album_id:item.id
                       }
                     };
                     this.props.history.push(path);
                  }}/>
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setShowPlay: (showPlay) => {
         dispatch({type: actionType.ACTION_SHOW_PLAY_CONTROLLER, showPlay});
      }
   }
};
Mypage = connect(null, mapDispatchToProps)(Mypage);
export default Mypage