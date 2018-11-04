import React, {Component} from 'react';
// import data from "../MusicList";
import ListView from "../ListView";
import {component} from "../utils/ZUtil";
import {actionType} from "../reducer/globalState";
import {actionType as actionType1} from "../reducer/appState";
import {searchActionType} from "../reducer/searchState";
import Collection from "../view/Collection";
import {localManager} from "../utils/LocalManager";
import $ from "jquery";

var baseUrl = require('../config/BaseUrl');
const parseLrc = require('../LrcManager');

class SearchPageIner extends Component {
   constructor() {
      super();
      this.source="tencent";
   }

   componentWillMount() {
      this.setState({
         inputValue: this.props.location.query ? this.props.location.query.keyword : ""
      }, function () {
         this._fetchData();
      });
   }

   componentDidMount() {
      var _this = this;
      this.props.setShowPlay(true);
      document.onkeydown = (e) => {
         if (e.keyCode === 13) {
            if (_this.state.inputValue) {
               _this._fetchData();
            }
         }
      }
   }

   _fetchData() {
      if (!this.state.inputValue) {
         return;
      }
      this.props.setData([]);
      var _this = this;
      this._record();
      this.showLoading();
      $.ajax({
         method: "GET",
         url: baseUrl.base+"gqss/api.php?types=search&count=20&pages=0&source="+this.source+"&name="+this.state.inputValue,
         dataType: "jsonp",
         success: async function(jsonData) {
            _this.hideLoading();
            let tempList = [];
            let tempItem = {};
            for (let i = 0; i < jsonData.length; i++) {
               tempItem =  {
                  id: jsonData[i].id,  // 音乐ID
                  name: jsonData[i].name,  // 音乐名字
                  artist: jsonData[i].artist[0], // 艺术家名字
                  album: jsonData[i].album,    // 专辑名字
                  source: jsonData[i].source,     // 音乐来源
                  url_id: jsonData[i].url_id,  // 链接ID
                  pic_id: jsonData[i].pic_id,  // 封面ID
                  lyric_id: jsonData[i].lyric_id,  // 歌词ID
                  pic: null,    // 专辑图片
                  url: null   // mp3链接
               };
               tempList.push(tempItem);
            }
            _this.props.setData(tempList);
         },
         error: error => {
            _this.hideLoading();
            _this.showToast("获取失败")
         }
      });
   }

   _fetchMusic(item, collect, sq) {
      var _this = this;
      this.showLoading();
      $.ajax({
         method: "GET",
         url: baseUrl.base+"gqss/api.php?types=url&source="+this.source+"&id="+item.id,
         dataType: "jsonp",
         success: async function(jsonData) {
            let lyric=await _this._getLrc(item.lyric_id);
            let lrc = parseLrc(lyric);
            let pic=await _this._getPic(item.pic_id);
            _this.hideLoading();
            let music = {
               id: item.id,
               sq: sq,
               name: item.name,
               author:item.artist,
               url: jsonData.url,
               pic: pic,
               lrc1:lyric,
               album_name: item.album,
               lrcEntity: lrc
            };

            if (collect) {
               _this.setState({
                  showCollection: true, musicItem: {...music, lrcEntity: ''}
               });
            } else {
               let player = document.getElementById("music");
               _this.props.playMusic(0, music, player);
            }
         },
         error: error => {
            _this.hideLoading();
            _this.showToast("获取失败")
         }
      });
   }
   _getLrc(lyric_id) {
      let _this = this;
      return  new Promise(function (resolve, reject) {
         $.ajax({
            method: "GET",
            url: baseUrl.base+"gqss/api.php?types=lyric&source="+_this.source+"&id=" + lyric_id,
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
   _getPic(picId) {
      let _this = this;
      return  new Promise(function (resolve, reject) {
         $.ajax({
            method: "GET",
            url: baseUrl.base+"gqss/api.php?types=pic&source="+_this.source+"&id=" + picId,
            dataType: "jsonp",
            success: jsonData => {
               resolve(jsonData.url);
            },
            error: error => {
               resolve("");
               console.log(`error为${error.data}`)
            }
         })
      });
   }
   _record() {
      if (!this.state.inputValue) {
         return;
      }
      this.props.setData([]);
      var _this = this;
      let url = baseUrl.base + `music/list?keyword=${this.state.inputValue}&page=1&pagesize=20&user_id=${localManager.getPhone()}`;
      fetch(url, {})
         .then((res) => {
            return res.json();
         })
         .then((result) => {
         })
         .catch((e) => {
         });
   }
   componentWillUnmount() {
      this.props.setShowPlay(false);
      document.onkeydown = null;
   }

   openCollection(item) {
      this._fetchMusic(item,true, 2);
   }
   render() {
      var _this = this;
      return (
         <div className='SearchPage'>
            <div className='title app-title'>
               <img className='first-child' src={require('../img/ic_left.png')} onClick={() => {
                  this.props.history.goBack();
               }}/>
               <div className='input-div'>
                  <input placeholder='给你推荐 暧昧' value={this.state.inputValue}
                         onInput={(e) => {
                            let value = e.currentTarget.value;
                            _this.setState({
                               inputValue: value
                            });
                         }}/>
                  <img src={require('../img/ou.png')}
                       style={{display: this.state.inputValue ? "block" : 'none'}}
                       onClick={() => {
                          _this.setState({
                             inputValue: ''
                          });
                       }}
                  />
               </div>
            </div>
            <div style={{marginTop: '65px'}}></div>
            <ListView data={this.props.data}
                      onItemClick={(postion, item) => {
                         this._fetchMusic(item, false,2);
                      }}
                      style={{paddingBottom: "3rem", backgroundColor: "#f6f6f6"}}
                      renderItem={(position, item) => {
                         return (
                            <div className='flex-row-center list-item'>
                               <span style={{color: "#888888"}}>{position + 1}</span>
                               <div className='flex-row-center item-right'>
                                  <div className='flex-c' style={{flexGrow: 1}}>
                                     <span>{item.name ? item.name : "歌曲名"}</span>
                                     <div className='flex-row-center' style={{marginTop: '6px'}}>
                                        <img src={require('../img/a3n.png')} style={{width: '15px', marginRight: '5px'}}/>
                                        <span style={{
                                           color: "#888888",
                                           fontSize: "13px"
                                        }}>{item.artist ? item.artist : "演唱者"}</span>
                                     </div>
                                  </div>
                                  <img src={require('../img/a_2.png')} style={{width: '20px', marginRight: '10px'}}/>
                                  <img src={require('../img/a3c.png')} style={{width: '15px'}} onClick={(e) => {
                                     e.stopPropagation();
                                     this.openCollection(item);
                                  }}/>
                               </div>

                            </div>
                         )
                      }}/>
            {this.state.showCollection ? <Collection data={this.state.musicItem}
                                                     onAuthor={(author)=>{
                                                        this.setState({
                                                           inputValue:author
                                                        },()=>{
                                                           this._fetchData();
                                                        })
                                                     }}
                                                     onHidden={(show) => {
                                                        this.setState({showCollection: show});
                                                     }}/> : ''}
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      data: state.searchState.data
   }
};
const mapDispatchToProps = (dispatch) => {
   return {
      setShowPlay: (showPlay) => {
         dispatch({type: actionType.ACTION_SHOW_PLAY_CONTROLLER, showPlay});
      },
      playMusic(currentMusic, item, player, data) {
         dispatch({type: actionType1.ACTION_PLAY_CURRENT_MUSIC, currentMusic, item, player, data});
      },
      setData(data) {
         dispatch({type: searchActionType.SET_DATA, data});
      }

   }
};
SearchPageIner = component(mapStateToProps, mapDispatchToProps, SearchPageIner);
export default SearchPageIner