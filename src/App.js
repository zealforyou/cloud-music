import React, {Component} from 'react';
import ListView from "./ListView";
import {actionType} from './reducer/appState';
import {component} from './utils/ZUtil';
import {actionType as globalType} from "./reducer/globalState";
import $ from 'jquery';
import 'rgbaster';
import {localManager} from "./utils/LocalManager";

require('./App.css');
var baseUrl = require('./config/BaseUrl');

class App extends Component {
   constructor() {
      super();
      this.bgColor = [200, 200, 200];
      this.title = "想唱就唱";
      this.username = localManager.getName();
   }

   componentWillMount() {
      this.setState({dialog1: false, data: []});
      this._getMusic();
   }

   componentDidMount() {
      var _this = this;
      this.props.setShowPlay(true);
      this.refs.music = document.getElementById('music');
      let back = window.localStorage.getItem("back");
      if (back === '1') {
         window.localStorage.setItem('back', '0');
      }
      var AppDiv = $('#App');
      var onScroll = (e) => {
            var top = AppDiv.scrollTop();
            var min = 150;
            var max = 201;
            if (top >= min && top <= max) {
               _this._setTitleColor(((top - min) / (max - min)).toFixed(2));
            } else if (top < min) {
               _this._setTitleColor(0);
            } else {
               _this._setTitleColor(1);
            }
         }
      ;
      AppDiv.scroll(onScroll);
   }

   componentWillUnmount() {
      this.props.setShowPlay(false);
      $('#App').scroll(null);
   }

   _setBgColor(data) {
      var _this = this;
      if (data[0])
         window.RGBaster.colors(data[0].pic, {
            success: function (payload) {
               // payload.dominant是主色，RGB形式表示
               // payload.secondary是次色，RGB形式表示

               // payload.palette是调色板，含多个主要颜色，数组
               let rgb = payload.secondary;
               console.log(payload.dominant);
               console.log(payload.secondary);
               console.log(payload.palette);
               if (rgb) {
                  rgb = rgb.substring(rgb.indexOf('(') + 1, rgb.indexOf(')'));
                  rgb = rgb.split(',');
                  _this.bgColor = [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])];
                  _this.setState({refresh: true});
               }
            }
         });
   }

   _setTitleColor(jd) {
      this.refs.title.style.backgroundColor = `rgba(${this.bgColor[0]},${this.bgColor[1]},${this.bgColor[2]},${0.5 + jd * 0.5})`;
   }

   num = -1;


   _getMusic() {
      var _this = this;
      let album_id = this.props.location.query ? this.props.location.query.album_id : this.props.album_id;
      let album_name = this.props.location.query ? this.props.location.query.album_name : this.props.album_name;
      this.props.setAlbumIdAndName(album_id,album_name);
      let url = baseUrl.base + "album/getMusic?album_id=" + album_id;
      if (!this.props.location.query){
         _this._refresh(this.props.album_data);
      }else {
         this.showLoading();
      }
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         _this.hideLoading();
         _this.props.setAlbumData(res);
         _this._refresh(res);
      }).catch((e) => {
         _this.hideLoading();
      });

   }
   _refresh(data){
      this._setBgColor(data);
      this.setState({data});
   }
   itemClick(position, item) {

      this.props.playCurrentMusic(this.refs.music, position, item, this.state.data);
   }


   render() {

      let user_avatar = localManager.getAvatar() ? localManager.getAvatar() : require('./img/a20.9.png');
      return (
         <div id='App'>
            <header className="top">
               <div ref='title' className='title'
                    style={{backgroundColor: `rgba(${this.bgColor[0]},${this.bgColor[1]},${this.bgColor[2]},0.5)`}}>
                  <div className='flex-row-center'>
                     <img src={require("./img/ic_left.png")} onClick={() => {
                        this.props.history.goBack();
                     }}/>
                     <span>歌单</span>
                  </div>
                  <div className='flex-row-center'>
                     <img src={require("./img/pf.png")} onClick={() => {
                        this.props.history.push('/SearchPage');
                     }}/>
                     <img src={require("./img/p9.png")}/>
                  </div>
               </div>
               {/*上半部分容器*/}
               <div className='top-bg flex-c'
                    style={{backgroundColor: `rgb(${this.bgColor[0]},${this.bgColor[1]},${this.bgColor[2]})`}}>
                  <div className="flex-row" style={{paddingTop: '65px'}}>
                     <div className='big-img'>
                        {/*专辑图片*/}
                        <img
                           id='music_pic'
                           onClick={() => {
                              this.setState({dialog1: true});
                           }}
                           src={this.state.data.length > 0 ? this.state.data[0].pic : require('./img/album_default.png')}
                           className='fm'/>
                        <span className='flex-row-center' style={{position: 'absolute', zIndex: 1000, right: '5px'}}>
                           <img src={require('./img/zh.png')} style={{width: "12px"}}/>
                           {/*播放次数*/}
                           <span style={{float: 'right', fontSize: "13px", marginLeft: "5px"}}>520</span>
                        </span>
                        <img style={{
                           position: 'absolute', right: '5px', bottom: '5px',
                           width: '20px',
                           objectFit: "cover"
                        }} src={require("./img/a2n.png")}/>
                     </div>
                     <div className='flex-c' style={{
                        paddingLeft: '1rem',
                        paddingTop: '0.5rem'
                     }}>
                        {/*专辑名称*/}
                        <span>{this.props.album_name ? this.props.album_name : this.title}</span>
                        <div className='flex-row-center' style={{height: '60%',marginTop:'15px'}}>
                           {/*用户头像*/}
                           <img src={user_avatar} className='avatar'/>
                           {/*用户昵称*/}
                           <span style={{fontSize: '15px', padding: '0 8px'}}>{this.username} </span>
                           <img style={{width: '7px'}} src={require('./img/po.png')}/>
                        </div>
                     </div>
                  </div>
                  <div className='flex-row-center menu'>
                     <div className='flex-c-center'>
                        <img src={require('./img/a2l.png')}/>
                        <span>收藏</span>
                     </div>
                     <div className='flex-c-center'
                          onClick={() => {
                             this.props.history.push("/CommentPage");
                          }}>
                        <img src={require('./img/a2j.png')}/>
                        <span>评论</span>
                     </div>
                     <div className='flex-c-center'>
                        <img src={require('./img/a2r.png')}/>
                        <span>分享</span>
                     </div>
                     <div className='flex-c-center'>
                        <img src={require('./img/a2k.png')}/>
                        <span>下载</span>
                     </div>
                  </div>
               </div>
            </header>
            <section className='flex-c'>
               <div className='flex-row-center list-top' style={{backgroundColor: "#f6f6f6"}}>
                  <div className='flex-row-center'>
                     <img src={require('./img/note_btn_play_white.png')} style={{width: '20px'}}/>
                     <span style={{marginLeft: '10px'}}>播放全部<span
                        style={{color: "#aaa"}}>(共{this.state.data.length}首)</span></span>
                  </div>

                  <div className='flex-row-center'>
                     <img src={require('./img/a3d.png')} style={{width: '20px'}}/>
                     <span style={{marginLeft: '10px'}}>多选</span>
                  </div>
               </div>

               <ListView data={this.state.data}
                         onItemClick={this.itemClick.bind(this)}
                         style={{paddingBottom: "3rem", backgroundColor: "#f6f6f6"}}
                         renderItem={(position, item) => {
                            return (
                               <div className='flex-row-center list-item'>
                                  <span style={{color: "#888888"}}>{position + 1}</span>
                                  <div className='flex-row-center item-right'>
                                     <div className='flex-c' style={{flexGrow: 1}}>
                                        <span className='text-single-line' style={{maxWidth:'70vw'}}>{item.name ? item.name : "歌曲名"}</span>
                                        <div className='flex-row-center' style={{marginTop: '6px'}}>
                                           <img src={require('./img/a3n.png')} style={{width: '15px', marginRight: '5px',
                                              display:item.sq>1? "block" : 'none'}}/>
                                           <span style={{
                                              color: "#888888",
                                              fontSize: "13px"
                                           }}>{item.author ? item.author : "演唱者"}</span>
                                        </div>

                                     </div>
                                     <img src={require('./img/a_2.png')} style={{width: '20px', marginRight: '10px'}}/>
                                     <img src={require('./img/a3c.png')} style={{width: '15px'}}/>
                                  </div>

                               </div>
                            )
                         }}/>
            </section>

            <div className='dialog-center' style={{display: this.state.dialog1 ? 'flex' : 'none'}}>
               <img className='big' src={this.state.data.length > 0 ? this.state.data[0].pic : require('./img/bt_girl.jpg')}/>
               <img className='close' src={require('./img/a_w.png')} onClick={() => {
                  this.setState({dialog1: false});
               }}/>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      progress: state.appState.progress,
      playing: state.appState.playing,
      loaded: state.appState.loaded,
      currentMusic: state.appState.currentMusic,
      item: state.appState.item,
      album_id: state.appState.album_id,
      album_name: state.appState.album_name,
      album_data:state.appState.album_data
   }
};
const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      setShowPlay: (showPlay) => {
         dispatch({type: globalType.ACTION_SHOW_PLAY_CONTROLLER, showPlay})
      },
      playCurrentMusic(player, currentMusic, item, data) {
         dispatch({type: actionType.ACTION_PLAY_CURRENT_MUSIC, player, currentMusic, item, data})
      },
      setAlbumIdAndName: (album_id,album_name) => {
         dispatch({type: actionType.SET_ALBUM_ID_AND_NAME, album_id,album_name});
      },
      setAlbumData: (album_data) => {
         dispatch({type: actionType.SET_ALBUM_DATA, album_data});
      }
   }
};
App = component(mapStateToProps, mapDispatchToProps,App);
export default App;
