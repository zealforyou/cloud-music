import React, {Component} from 'react';
import ListView from "./ListView";
import data from "./MusicList";

require('./App.css');

class App extends Component {
   constructor() {
      super();
      this.bgColor = [150, 50, 50];
      this.title="想唱就唱";
      this.username="唱的响亮";
   }

   componentWillMount() {
      this.setState({
         progress: 0,
         playing: false,
         loaded: false,
         currentMusic: -1,
         item: {}
      });
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
      // this._setTitleColor(1);
      this.refs.music = document.getElementById('music');
      this.playControl(this.refs.music);
      let state = window.localStorage.getItem("state");
      let back = window.localStorage.getItem("back");
      if (back === '1') {
         window.localStorage.setItem('back', '0');
         state = JSON.parse(state);
         this.setState(state);
      } else {
         var _this = this;
         setTimeout(() => {
            _this.itemClick(0, data[0]);
         }, 1500);

      }
      this.dragMove(this.refs.music);
   }

   componentWillUnmount() {
      window.removeEventListener("scroll", this.onScroll);
      var player = this.refs.music;
      this.removeControl(player);
      this.removeDragMove();
   }

   _setTitleColor(jd) {
      this.refs.title.style.backgroundColor = `rgba(${this.bgColor[0]},${this.bgColor[1]},${this.bgColor[2]},${0.5 + jd * 0.5})`;
      console.log(this.refs.title.style.backgroundColor)
   }

   num = -1;

   /**
    * 进度条控制
    * @param audio
    */
   dragMove(audio) {
      let _this = this;
      if (this.num === -1) {
         this.num = setInterval(function () {
            console.log("app:" + audio.currentTime / audio.duration * 100);
            if (_this.state.playing) {
               _this.setState({
                  progress: audio.currentTime / audio.duration * 100
               });
            }
         }, 1000);
         console.log("app:68 start>" + this.num);
      }

   }

   removeDragMove() {
      console.log("app:71 stop>" + this.num);
      clearInterval(this.num);
      this.num = -1;
   }


   playControl(audio) {
      let _this=this;
      /**
       * 播放控制
       */
      function loadeddata() {
         _this.setState({
            loaded: true,
            playing: true
         });
      }

      function pause() { //监听暂停
         let audio = _this.refs.music;
         if (audio.currentTime === audio.duration) {
            audio.currentTime = 0;
         }
      }

      function play() {
         console.log("appplay")
      }

      function ended() {
         console.log("appended")
         _this.setState({
            playing: false
         });
      }
      this.loadeddata=loadeddata;
      this.pause=pause;
      this.play=play;
      this.ended=ended;
      //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
      audio.addEventListener("loadeddata", loadeddata, false);
      audio.addEventListener("pause",pause, false);
      audio.addEventListener("play", play, false);
      audio.addEventListener("ended", ended, false);
   }

   removeControl(audio) {
      audio.removeEventListener("laodeddata", this.loadeddata, false);
      audio.removeEventListener("pause", this.pause, false);
      audio.removeEventListener("play", this.play, false);
      audio.removeEventListener("ended", this.ended, false);
   }

   itemClick(position, item) {
      window.localStorage.setItem("state", JSON.stringify(this.state));
      if (this.state.currentMusic !== position) {
         this.setState({
            currentMusic: position,
            playing: false,
            progress: 0,
            item: item,
            loaded: false
         });
         this.refs.music.pause();
         this.refs.music.src = item.url;
         this.refs.music.play();
      }
   }

   clickPlay(e) {
      e.stopPropagation();
      if (!this.state.item.url) {
         this.itemClick(0, data[0]);
         return;
      }
      var player = this.refs.music;
      if (this.state.playing) {
         player.pause();
         this.setState({
            playing: false
         });
      } else {
         if (this.state.loaded) {
            this.setState({
               playing: true
            });
         }
         player.play();
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
                     <img src={require("./img/pf.png")}/>
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
            <footer className='play-footer flex-row-center' onClick={(e) => {
               var path = {
                  pathname: '/Page2',
                  query: this.state
               };
               this.props.history.push(path);
            }}>
               <img src={this.state.item.pic ? this.state.item.pic : require("./img/a20.9.png")} className='m-pic'/>
               <div className='flex-c' style={{marginLeft: "10px", flexGrow: 1}}>
                  <span style={{fontSize: "15px"}}>{this.state.item.name}</span>
                  <span style={{color: "#888888", fontSize: "11px"}}>{this.state.item.author}</span>
               </div>
               <img onClick={this.clickPlay.bind(this)} src={require(this.state.playing ? "./img/bzm.png" : "./img/q1.png")}
                    style={{width: '25px', marginRight: "15px"}}/>
               <img src={require("./img/p4.png")} style={{width: '35px'}}/>
               <div className="progress" style={{width: this.state.progress + "%"}}>

               </div>
            </footer>
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

export default App;
