import React, {Component} from 'react';
import ListView from "./ListView";
import data from "./MusicList";
import {actionType}from './reducer/appState';
import {connect}from 'react-redux';
import {actionType as globalType} from "./reducer/globalState";
require('./App.css');

class App extends Component {
   constructor() {
      super();
      this.bgColor = [150, 50, 50];
      this.title="想唱就唱";
      this.username="唱的响亮";
   }

   componentWillMount() {
      this.setState({dialog1:false});
      var _this = this;
      var onScroll = (e) => {
         var top = document.documentElement.scrollTop;
         var min = 150;
         var max = 201;
         if (top >= min && top <= max) {
            _this._setTitleColor(1);
         } else if (top < min) {
            _this._setTitleColor(0);
         }
      };
      this.onScroll = onScroll;

      window.addEventListener("scroll", onScroll);
   }

   componentDidMount() {
      this.props.setShowPlay(true);
      this.refs.music = document.getElementById('music');
      let back = window.localStorage.getItem("back");
      if (back === '1') {
         window.localStorage.setItem('back', '0');
      } else {
         var _this = this;
         // setTimeout(() => {
         //    _this.itemClick(0, data[0]);
         // }, 1500);

      }
   }

   componentWillUnmount() {
      this.props.setShowPlay(false);
      window.removeEventListener("scroll", this.onScroll);
   }

   _setTitleColor(jd) {
      this.refs.title.style.backgroundColor = `rgba(${this.bgColor[0]},${this.bgColor[1]},${this.bgColor[2]},${0.5 + jd * 0.5})`;
      console.log(this.refs.title.style.backgroundColor)
   }

   num = -1;



   itemClick(position, item) {
      if (this.props.currentMusic !== position) {
         this.props.playCurrentMusic(this.refs.music,position,item);
      }
   }



   render() {
      return (
         <div>
            <header className="top">
               <div ref='title' className='title'
                    style={{backgroundColor: `rgba(${this.bgColor[0]},${this.bgColor[1]},${this.bgColor[2]},0.5)`}}>
                  <div className='flex-row-center'>
                     <img src={require("./img/ic_left.png")}/>
                     <span>歌单</span>
                  </div>
                  <div className='flex-row-center'>
                     <img src={require("./img/pf.png")} onClick={()=>{
                        this.props.history.push('/SearchPage');
                     }}/>
                     <img src={require("./img/p9.png")}/>
                  </div>
               </div>
               {/*上半部分容器*/}
               <div className='top-bg flex-c'
                    style={{backgroundColor: `rgb(${this.bgColor[0]},${this.bgColor[1]},${this.bgColor[2]})`}}>
                  <div className="flex-row" style={{paddingTop: '4em'}}>
                     <div className='big-img'>
                        <img
                           onClick={() => {
                              this.setState({dialog1: true});
                           }}
                           src={data.length>0?data[0].pic:require('./img/bt_girl.jpg')}
                           className='fm'/>
                        <span className='flex-row-center' style={{position: 'absolute', zIndex: 1000, right: '5px'}}>
                             <img src={require('./img/zh.png')} style={{width: "12px"}}/>
                        <span style={{float: 'right', fontSize: "13px", marginLeft: "5px"}}>520</span></span>
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
                        <span>{this.title}</span>
                        <div className='flex-row-center' style={{height: '60%'}}>
                           <img src={require('./img/a20.9.png')} className='avatar'/>
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
                          onClick={()=>{
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
                     <span style={{marginLeft: '10px'}}>播放全部<span style={{color: "#aaa"}}>(共{data.length}首)</span></span>
                  </div>

                  <div className='flex-row-center'>
                     <img src={require('./img/a3d.png')} style={{width: '20px'}}/>
                     <span style={{marginLeft: '10px'}}>多选</span>
                  </div>
               </div>

               <ListView data={data}
                         onItemClick={this.itemClick.bind(this)}
                         style={{paddingBottom: "3rem", backgroundColor: "#f6f6f6"}}
                         renderItem={(position, item) => {
                            return (
                               <div className='flex-row-center list-item'>
                                  <span style={{color: "#888888"}}>{position + 1}</span>
                                  <div className='flex-row-center item-right'>
                                     <div className='flex-c' style={{flexGrow: 1}}>
                                        <span>{item.name ? item.name : "歌曲名"}</span>
                                        <div className='flex-row-center' style={{marginTop: '6px'}}>
                                           <img src={require('./img/a3n.png')} style={{width: '15px', marginRight: '5px'}}/>
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
               <img className='big' src={data.length>0?data[0].pic:require('./img/bt_girl.jpg')}/>
               <img className='close' src={require('./img/a_w.png')} onClick={() => {
                  this.setState({dialog1: false});
               }}/>
            </div>
         </div>
      );
   }
}

const mapStateToProps=(state)=>{
   return{
      progress:state.appState.progress,
      playing:state.appState.playing,
      loaded:state.appState.loaded,
      currentMusic:state.appState.currentMusic,
      item:state.appState.item,
   }
};
const mapDispatchToProps=(dispatch,ownProps)=>{
   return {
      setShowPlay:(showPlay)=>{
         dispatch({type:globalType.ACTION_SHOW_PLAY_CONTROLLER,showPlay})
      },
      playCurrentMusic(player,currentMusic,item){
         dispatch({type:actionType.ACTION_PLAY_CURRENT_MUSIC,player,currentMusic,item})
      }
   }
};
App=connect(mapStateToProps,mapDispatchToProps)(App);
export default App;
