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

   collectionModal;
   originTop;
   //组件已经挂载
   componentDidMount() {
      this.collectionModal = $('#collection_modal');
   }

   //组件即将销毁
   componentWillUnmount() {

   }
   componentWillReceiveProps(next) {
      this.setState({
         fadeAnimation: next.show ? "collection_fade_in 0.6s forwards" : "collection_fade_out 0.6s forwards",
         moveAnimation: next.show ? "collection_up 0.6s" : "collection_down 0.6s"
      });
   }

   currentY = 0;
   currentScroll = 0;
   onMoveStart(e) {
      if(!this.originTop) this.originTop=this.collectionModal.position().top;
      this.currentY = e.touches[0].clientY;
      $('body').css({"height":"100%","overflow":'hidden'});
   }
   onMove(e) {
      let scrollTop = e.currentTarget.scrollTop;
      let clientY = e.touches[0].clientY;
      let moved = clientY - this.currentY;
      this.currentY = clientY;
      if (scrollTop === 0 && moved >= 0) {
         this.currentScroll += moved;
         this.collectionModal.css("top", `${moved + this.collectionModal.position().top}px`);
      } else if (moved <= 0 && this.currentScroll > 0) {
         this.currentScroll += moved;
         this.collectionModal.css({"overflow":'hidden',"top":`${moved + this.collectionModal.position().top}px`});
      }else{
         this.collectionModal.css("overflow", 'scroll');
         this.currentScroll = 0;
      }

   }

   onMoveEnd(e) {
      $('body').css({"height":"auto","overflow":'visible'});
      console.log(this.collectionModal.position().top);
      if(this.collectionModal.position().top-this.originTop>=this.collectionModal.height()/2.5){
         this.setState({
            hide: true,
            moveAnimation: "collection_down 0.6s",
            fadeAnimation: "collection_fade_out 0.6s forwards"
         });

      }else{
         this.collectionModal.animate({top:this.originTop});
      }
      this.currentY = 0;
      this.currentScroll = 0;
   }


   //渲染
   render() {
      return (
         <div className="Collection" style={{
            display: this.props.show ? "block" : "none"
            , animation: this.state.fadeAnimation ? this.state.fadeAnimation : 'none'
         }}
              onClick={(e) => {
                 this.setState({
                    hide: true,
                    moveAnimation: "collection_down 0.6s",
                    fadeAnimation: "collection_fade_out 0.6s forwards"
                 });
              }}>
            <div id='collection_modal' className="modal"
                 style={{animation: this.state.moveAnimation ? this.state.moveAnimation : 'none'}}
                 onAnimationEnd={() => {
                    if (this.state.hide) {
                       this.collectionModal.css({top:$(window).height()-this.collectionModal.height()});
                       this.setState({hide: false}, function () {
                          this.props.onHidden ? this.props.onHidden(false) : '';
                       });
                    }
                 }} onTouchMoveCapture={this.onMove.bind(this)} onTouchEnd={this.onMoveEnd.bind(this)}
                 onTouchStart={this.onMoveStart.bind(this)}>
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