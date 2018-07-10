import React, {Component} from 'react';
import './Collection.scss';
import '../page/css/SearchPage.scss'
import PropTypes from 'prop-types'
import $ from 'jquery'
import {component} from "../utils/ZUtil"
import {actionType as globalType} from "../reducer/globalState";
import CollectionSong from "./CollectionSong";

class Collection extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.setState({});
   }

   $modal;
   $scroll;
   $scrollDiv;
   animation;
   animationName;

   //组件已经挂载
   componentDidMount() {
      this.$scroll = $('.Collection');
      this.$modal = $('#collection_modal');
      this.$scrollDiv = $('.scroll-div');
      this.onShowDialog();
   }

   //组件即将销毁
   componentWillUnmount() {

   }

   componentWillReceiveProps(next) {

   }

   onShowDialog() {
      this.animationName = 'in';
      this.animation = true;
      this.$scroll.css({animation: "collection_fade_in 0.4s forwards"});
      this.$scroll.animate({scrollTop: 400}, 400, '', () => {
         console.log('end');
         this.animation = false;
      });
   }

   onHideDialog(e) {
      this.animationName = 'out';
      this.animation = true;
      this.$scroll.css({animation: "collection_fade_out 0.4s forwards"});
      this.$scroll.animate({scrollTop: 0}, 400, '', () => {
         this.animation = false;
         this.props.onHidden && this.props.onHidden(false)
      })
   }

   onTouchEnd(e) {
      let top = this.$scroll.scrollTop();
      if (!this.animation) {
         console.log(top);
         if (top < this.$modal.height() / 1.8) {
            this.onHideDialog();
         } else {
            this.onShowDialog();
         }
      }
   }


   //渲染
   render() {
      return (
         <div className="Collection">
            <div className='scroll-div'
                 onClick={() => {
                    this.onHideDialog()
                 }}>

            </div>
            <div id='collection_modal' className="modal">
               <p>歌曲：{this.props.data.name}</p>
               <div className="page_list">
                  <div className="flex-row-center item">
                     <img src={require('../img/next.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>下一首播放</span>
                     </div>
                  </div>
                  <div className="flex-row-center item" onClick={() => {
                     this.props.showCreateAlbum(this.props.data);
                     this.onHideDialog()
                  }}>
                     <img src={require('../img/shoucang.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>收藏到歌单</span>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/xiazai.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>下载</span>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/pinglun.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>评论</span>
                        <em>(0)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/fenxiang.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>分享</span>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a0n.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>歌手：</span>
                        <em>{this.props.data.author}</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a1l.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>专辑：</span>
                        <em>{this.props.data.album_name}</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a1n.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>查看视频</span>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      )
   }
}

Collection.propTypes = {
   show: PropTypes.bool,
   onHidden: PropTypes.func
};
let mapState = (state) => {
   return {}
};
let mapDispatch = (dispatch) => {
   return {
      showCreateAlbum(data) {
         dispatch({type: globalType.ACTION_SHOW_DIALOG, dialog: {component: CollectionSong,data}})
      }
   }
};
Collection = component(mapState, mapDispatch, Collection);
export default Collection;