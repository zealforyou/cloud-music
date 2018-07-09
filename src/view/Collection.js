import React, {Component} from 'react';
import './Collection.scss';
import '../page/css/SearchPage.scss'
import PropTypes from 'prop-types'
import $ from 'jquery'
export default class Collection extends Component {
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
      this.$scroll.css({animation: "collection_fade_in 0.5s forwards"});
      // this.$modal.css({animation: "collection_up 0.5s forwards"});
      this.$scroll.animate({scrollTop: 400}, 600, '', () => {
         console.log('end');
         this.animation = false;
      });
   }

   onHideDialog(e) {
      this.animationName = 'out';
      this.animation = true;
      this.$scroll.css({animation: "collection_fade_out 0.5s forwards"});
      // this.$modal.css({animation: "collection_down 0.5s forwards"});
      this.$scroll.animate({scrollTop: 0}, 600, '', () => {
         this.animation = false;
         this.props.onHidden && this.props.onHidden(false)
      })
   }

   onTouch(e) {
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

   onScroll(e) {
      // let top = e.target.scrollTop;
      // if (!this.animation && this.touched) {
      //    console.log(top);
      //    this.touched = false;
      //    if (top < this.$modal.height() / 1.8) {
      //       this.onHideDialog();
      //    } else {
      //       this.onShowDialog();
      //    }
      // }

   }


   //渲染
   render() {
      return (
         <div className="Collection" onScroll={this.onScroll.bind(this)} onClick={this.onTouch.bind(this)}>
            <div className='scroll-div'
                 onClick={this.onHideDialog.bind(this)}>

            </div>
            <div id='collection_modal' className="modal" >
               <p>歌曲：Please Don't Go</p>
               <div className="page_list">
                  <div className="flex-row-center item">
                     <img src={require('../img/next.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>下一首播放</span>
                     </div>
                  </div>
                  <div className="flex-row-center item">
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
                        <em>(124922)</em>
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
                        <em>Joel Adams</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a1l.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>专辑：</span>
                        <em>Please Don't Go</em>
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