import React, {Component} from 'react';
import './CollectionSong.scss';
import ListView from "../ListView";
import {localManager} from "../utils/LocalManager";
import * as baseUrl from "../config/BaseUrl";
import {component} from "../utils/ZUtil";

class CollectionSong extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.setState({
         showCreateDialog: false,
         inputCount: 0,
         createName: '',
         showSongSheet: true,
         animation: 'none',
         data: []
      });
   }

   //组件已经挂载
   componentDidMount() {
      this._getAlbumList();
   }

   //组件即将销毁
   componentWillUnmount() {

   }

   _getAlbumList() {
      var _this = this;
      let url = baseUrl.base + "album/getList?phone=" + localManager.getPhone();
      console.log(url);
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         this.setState({data: res});
      }).catch(() => {
      })
   }

   createAlbumCommit() {
      let _this = this;
      let url = baseUrl.base + `album/create?phone=${localManager.getPhone()}&album_name=${this.state.createName}`;
      this.showLoading();
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         if (res.error_code === 0) {
            _this._getAlbumList();
         } else {
            _this.showToast(res.error_msg);
         }
         _this.hideLoading();
         _this._hideCreateDialog();
      }).catch((e) => {
         _this.hideLoading();
         _this._hideCreateDialog();
         _this.showToast("创建失败");
      })
   }

   _hideCreateDialog() {
      this.setState({
         showCreateDialog: false,
         inputCount: 0,
         createName: ""
      });
   }

   onItemClick(position, item) {
      let url = baseUrl.base + "album/collect";
      let _this=this;
      this.showLoading();
      fetch(url, {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({album_id: item.album_id, ...this.props.musicItem})
      }).then((res) => {
         return res.json()
      }).then((res) => {
         _this.hideLoading();
         if(res.error_code===0){
            _this.hideDialog();
         }else {
            _this.showToast(res.error_msg);
         }
      }).catch((e) => {
         _this.showToast("收藏失败");
         _this.hideLoading();
      });

   }

   //渲染
   render() {
      return (
         <div className="CollectionSong" onClick={(e)=>{e.stopPropagation()}}>
            <p>收藏到歌单</p>
            <div className="box">
               <div className="song_sheet flex-row" onClick={(e) => {
                  this.setState({showCreateDialog: true})
               }}>
                     <span className="song_img">
                         <img src={require('../img/xinjian.png')} alt=""/>
                     </span>
                  <div className="song_right flex-row-center">
                     <div className="text" style={{flexGrow: "1"}}>
                        <span>新建歌单</span>
                     </div>
                  </div>
               </div>
               <ListView data={this.state.data}
                         renderItem={(position, item) => {
                            return (
                               <div className="song_sheet flex-row"
                                    style={{display: this.state.showSongSheet ? "flex" : 'none'}}
                                    onClick={(e) => {
                                       this.onItemClick && this.onItemClick(position, item);
                                    }}>
                                     <span className="song_img">
                                    <img src={item.pic ? item.pic : require('../img/album_default.png')} alt=""/>
                                        {item.id === 0 ? [<em className="mask"></em>,
                                           <img src={require('../img/akx.png')} alt="" className="maskimg"/>] : ''}
                                 </span>
                                  <div className="song_right flex-row-center">
                                     <div className="text flex-c" style={{flexGrow: "1"}}>
                                        <span>{item.album_name}</span>
                                        <span>{item.count}首</span>
                                     </div>

                                  </div>
                               </div>
                            )
                         }}/>
            </div>
            <div className='create-album-div' style={{display: this.state.showCreateDialog ? "block" : "none"}}>
               <div className='center flex-c-center'>
                  <span style={{alignSelf: 'flex-start'}}>新建歌单</span>
                  <input placeholder='请输入歌单标题' value={this.state.createName} onInput={(e) => {
                     let value = e.target.value;
                     let count = value ? value.length : 0;
                     this.setState({createName: value, inputCount: count})
                  }}/>
                  <span className='input-count'
                        style={{color: this.state.inputCount > 0 ? "#333" : "#ddd"}}>{this.state.inputCount}/40</span>
                  <div className='flex-row' style={{alignSelf: 'flex-end'}}>
                     <span className='button' onClick={() => {
                        this._hideCreateDialog();
                     }}>取消</span>
                     <span className='button'
                           style={{marginLeft: '5px', color: this.state.inputCount > 0 ? "#ff4500" : "rgba(255,65,0,0.5)"}}
                           onClick={this.state.inputCount > 0 ? this.createAlbumCommit.bind(this) : null}>
                        提交</span>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

let mapState = (state) => {
   return {
      musicItem: state.globalState.dialog.data
   }
};
let mapDis = (dispatch) => {
   return {}
};
CollectionSong = component(mapState, mapDis, CollectionSong);
export default CollectionSong;