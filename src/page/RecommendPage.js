import React, {Component} from 'react';
import {component} from "../utils/ZUtil";
import {actionType} from "../reducer/globalState";
import "./css/Recommend.scss"
import $ from "jquery";
import ListView from "../ListView";
import {actionType as actionType1} from "../reducer/appState";
import * as baseUrl from "../config/BaseUrl";
import {searchActionType} from "../reducer/searchState";

const parseLrc = require('../LrcManager');
class RecommendPage extends Component {
   constructor() {
      super();
   }

   componentWillMount() {
      this.setState({data: [], cover: ""});
   }

//组件已经挂载
   componentDidMount() {
      this.props.setShowPlay(true);
      this._getMusicList();
   }

//组件即将销毁
   componentWillUnmount() {
      this.props.setShowPlay(false);

   }

   _getMusicList() {
      let _this = this;
      if(this.props.data.length===0){
         this.showLoading();
      }
      $.ajax({
         method: "GET",
         url: baseUrl.base+"gqss/api.php?types=playlist&id=3778678",
         dataType: "jsonp",
         success: jsonData => {
            _this.hideLoading();
            // 存储歌单信息
            var tempList = {
               id: 3778678,    // 列表的网易云 id
               name: jsonData.playlist.name,   // 列表名字
               cover: jsonData.playlist.coverImgUrl,   // 列表封面
               creatorName: jsonData.playlist.creator.nickname,   // 列表创建者名字
               creatorAvatar: jsonData.playlist.creator.avatarUrl,   // 列表创建者头像
               item: []
            };

            if (jsonData.playlist.coverImgUrl !== '') {
               tempList.cover = jsonData.playlist.coverImgUrl + "?param=200y200";
            }
            if (typeof jsonData.playlist.tracks !== undefined || jsonData.playlist.tracks.length !== 0) {
               // 存储歌单中的音乐信息
               for (let i = 0; i < jsonData.playlist.tracks.length; i++) {
                  tempList.item[i] = {
                     id: jsonData.playlist.tracks[i].id,  // 音乐ID
                     name: jsonData.playlist.tracks[i].name,  // 音乐名字
                     artist: jsonData.playlist.tracks[i].ar[0].name, // 艺术家名字
                     album: jsonData.playlist.tracks[i].al.name,    // 专辑名字
                     source: "netease",     // 音乐来源
                     url_id: jsonData.playlist.tracks[i].id,  // 链接ID
                     pic_id: null,  // 封面ID
                     lyric_id: jsonData.playlist.tracks[i].id,  // 歌词ID
                     pic: jsonData.playlist.tracks[i].al.picUrl + "?param=300y300",    // 专辑图片
                     url: null   // mp3链接
                  };
               }
            }
            _this.props.setData(tempList.item);
            _this.setState({ cover: tempList.cover});
         },
         error: error => {
            _this.hideLoading();
            console.log(`error为${error.data}`)
         }
      })
   }

   _getMusic(item) {
      let _this = this;
      this.showLoading();
      $.ajax({
         method: "GET",
         url: baseUrl.base+"gqss/api.php?types=url&source=netease&id=" + item.id,
         dataType: "jsonp",
         success: async function(jsonData) {
            let lyric=await _this._getLrc(item);
            let lrc = parseLrc(lyric);
            _this.hideLoading();
            let music = {
               id: item.id,
               name: item.name,
               author: item.artist,
               url: jsonData.url,
               pic: item.pic,
               lrc1: lyric,
               album_name: item.album,
               lrcEntity: lrc
            };
            let player = document.getElementById("music");
            _this.props.playMusic(0, music, player);
         },
         error: error => {
            _this.hideLoading();
            console.log(`error为${error.data}`)
         }
      })
   }
   _getLrc(item) {
   return  new Promise(function (resolve, reject) {
         let _this = this;
         $.ajax({
            method: "GET",
            url: baseUrl.base+"gqss/api.php?types=lyric&source=netease&id=" + item.lyric_id,
            dataType: "jsonp",
            success: jsonData => {
               resolve(jsonData.lyric);
            },
            error: error => {
               resolve("");
               console.log(`error为${error.data}`)
            }
         })
      });
   }

   itemClick(position, item) {
      this._getMusic(item);
   }

   render() {
      return (
         <div className="Recommend">
            <div className='common-title'>
               <img className='tt-back' src={require('../img/ic_left.png')} onClick={() => {
                  this.props.history.goBack();
               }}/>
               <span className="tt-name">
                  每日推荐
               </span>
            </div>
            <div style={{position: "relative", marginTop: "60px"}}>
               <img
                  src={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536229424078&di=261d3c47b8f3e5560d074ab7d90a1975&imgtype=0&src=http%3A%2F%2Fpic.paopaoche.net%2Fup%2F2015-3%2F14272477554869764.jpg"}
                  className="banner"/>
               <div style={{
                  position: "absolute",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0
               }}>
               </div>
            </div>
            <div className="play-list-div">
               <div className="menu-div flex-row-center">
                  <img src={require("../img/note_btn_play_white.png")}
                       style={{width: "20px", height: "20px", marginLeft: "15px"}}/>
                  <span style={{color: "#000", padding: "0 10px"}}>播放全部</span>
                  <div style={{flexGrow: 1}}></div>
                  <img src={require("../img/a3d.png")}
                       style={{width: "20px", height: "20px", marginLeft: "15px"}}/>
                  <span style={{color: "#000", padding: "0 10px"}}>多选</span>
               </div>
            </div>
            <ListView data={this.props.data}
                      onItemClick={this.itemClick.bind(this)}
                      style={{paddingBottom: "3rem", backgroundColor: "#f6f6f6", position: "relative", top: "-14px"}}
                      renderItem={(position, item) => {
                         return (
                            <div className='flex-row-center list-item'>
                               <img src={item.pic} style={{width: '50px'}}/>
                               <div className='flex-row-center item-right'>
                                  <div className='flex-c' style={{flexGrow: 1}}>
                                     <span className='text-single-line'
                                           style={{maxWidth: '60vw'}}>{item.name ? item.name : "歌曲名"}</span>
                                     <div className='flex-row-center' style={{marginTop: '6px'}}>
                                        <img src={require('../img/a3n.png')} style={{
                                           width: '15px', marginRight: '5px',
                                           display: 'none'
                                        }}/>
                                        <span style={{
                                           color: "#888888",
                                           fontSize: "13px"
                                        }}>{item.artist ? item.artist : "演唱者"}</span>
                                     </div>

                                  </div>
                                  <img src={require('../img/a_2.png')} style={{width: '20px', marginRight: '10px'}}/>
                                  <img src={require('../img/a3c.png')} style={{width: '15px'}}/>
                               </div>

                            </div>
                         )
                      }}/>
         </div>
      )
   }
}


let mapStateToProps = (state) => {
   return {
      data: state.searchState.recommendData
   }
};
let mapDispatchToProps = (dispatch) => {
   return {
      setData(data){
         dispatch({type: searchActionType.SET_RECOMMEND_DATA, data});
      },
      playMusic(currentMusic, item, player, data) {
         dispatch({type: actionType1.ACTION_PLAY_CURRENT_MUSIC, currentMusic, item, player, data});
      },
      setShowPlay: (showPlay) => {
         dispatch({type: actionType.ACTION_SHOW_PLAY_CONTROLLER, showPlay});
      }
   }
};
RecommendPage = component(mapStateToProps, mapDispatchToProps, RecommendPage);
export default RecommendPage;