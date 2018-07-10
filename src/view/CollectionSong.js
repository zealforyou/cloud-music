import React, {Component} from 'react';
import './CollectionSong.scss';
import ListView from "../ListView";
import {localManager} from "../utils/LocalManager";
import * as baseUrl from "../config/BaseUrl";

export default class CollectionSong extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.setState({
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


   //渲染
   render() {
      return (
         <div className="CollectionSong">
            <div className="modal">
               <p>收藏到歌单</p>
               <div className="box">
                  <div className="song_sheet flex-row">
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
                                       onClick={() => {
                                          this.props.onItemClick ? this.props.onItemClick(position, item) : ""
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
            </div>
         </div>
      )
   }
}