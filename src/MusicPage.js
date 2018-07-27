import React, {Component} from 'react';

import {connect} from 'react-redux';
import {actionType} from "./reducer/appState";
import {actionType as globalType} from "./reducer/globalState";
import {PLAY_MODE} from './AppConfig'

class MusicPage extends Component {
   constructor() {
      super();
   }

   componentDidMount() {
      // this._setTitleColor(1);
      // this.refs.music = document.getElementById('music');
      this.playControl(this.refs.music);
      this.dragMove(this.refs.music);
   }

   componentWillUnmount() {
      var player = this.refs.music;
      this.removeControl(player);
      this.removeDragMove();
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
            if (_this.props.playing) {
               _this.props.setProgress(audio.currentTime / audio.duration * 100);
               _this.props.setCurrentTime(audio.currentTime);
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
      let _this = this;

      /**
       * 播放控制
       */
      function loadeddata() {
         _this.props.setLoaded(true);
         _this.props.setPlaying(true);
         _this.props.setDuration(audio.duration);
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
         console.log("appended");
         switch (_this.props.playMode) {
            case PLAY_MODE.SJ:
               _this.props.nextMusic(_this.refs.music);
               break;
            case PLAY_MODE.ONE_XH:
               _this.props.playMusic(_this.props.currentTime, _this.props.item, _this.refs.music, true);
               break;
            case PLAY_MODE.XH:
               _this.props.nextMusic(_this.refs.music);
               break;
            case PLAY_MODE.ONE:
               _this.props.setPlaying(false);
               _this.props.setProgress(0);
               _this.props.setCurrentTime(0);
               break;
         }
      }

      function canplay() {
         console.log("appcanplay");
      }

      this.loadeddata = loadeddata;
      this.pause = pause;
      this.play = play;
      this.ended = ended;
      //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
      audio.addEventListener("loadeddata", loadeddata, false);
      audio.addEventListener("pause", pause, false);
      audio.addEventListener("play", play, false);
      audio.addEventListener("ended", ended, false);
      audio.addEventListener("canplay", canplay, false);
   }

   removeControl(audio) {
      audio.removeEventListener("laodeddata", this.loadeddata, false);
      audio.removeEventListener("pause", this.pause, false);
      audio.removeEventListener("play", this.play, false);
      audio.removeEventListener("ended", this.ended, false);
      audio.removeEventListener("canplay", this.canplay, false);
   }

   clickPlay(e) {
      e.stopPropagation();
      if (!this.props.item.id) return;
      var player = this.refs.music;
      if (!this.props.item.url) {
         this.props.playMusic(0, this.props.data[0], player);
         return;
      }
      if (this.props.playing) {
         player.pause();
         this.props.setPlaying(false);
      } else {
         if (this.props.loaded) {
            this.props.setPlaying(true);
         }
         player.play();
      }
   }

   render() {
      return (
         <div>
            <audio ref='music' id="music">
               亲 您的浏览器不支持html5的audio标签
            </audio>
            <footer className='play-footer flex-row-center' onClick={(e) => {
               this.props.history.push('/Page2/-1');
            }} style={{display: this.props.showPlay ? "flex" : "none"}}>
               <img src={this.props.item.pic ? this.props.item.pic : require("./img/a20.9.png")} className='m-pic'/>
               <div className='flex-c' style={{marginLeft: "10px", flexGrow: 1}}>
                  <span className='text-single-line' style={{fontSize: "15px"}}>{this.props.item.name}</span>
                  <span style={{color: "#888888", fontSize: "11px"}}>{this.props.item.author}</span>
               </div>
               <img onClick={this.clickPlay.bind(this)} src={require(this.props.playing ? "./img/bzm.png" : "./img/q1.png")}
                    style={{
                       width: '25px', marginRight: "15px",
                       animation: !this.props.loaded && this.props.currentMusic !== -1 ? 'loading-play 3s linear infinite ' : 'none'
                    }}/>
               <img src={require("./img/p4.png")} style={{width: '35px'}}/>
               <div className="progress" style={{width: this.props.progress + "%"}}>

               </div>
            </footer>
         </div>

      )
   }
}

const mapStateToProps = (state) => {
   return {
      data: state.appState.data,
      showPlay: state.globalState.showPlay,
      currentTime: state.appState.currentTime,
      duration: state.appState.duration,
      progress: state.appState.progress,
      playing: state.appState.playing,
      loaded: state.appState.loaded,
      currentMusic: state.appState.currentMusic,
      item: state.appState.item,
      canPlay: state.appState.canPlay,
      playMode: state.appState.playMode
   }
};
const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      setCurrentTime: (currentTime) => {
         dispatch({type: actionType.SET_CURRENT_TIME, currentTime})
      },
      setDuration: (duration) => {
         dispatch({type: actionType.SET_DURATION, duration})
      },
      setProgress: (progress) => {
         dispatch({type: actionType.SET_PROGRESS, progress})
      },
      setPlaying: (playing) => {
         dispatch({type: actionType.SET_PLAYING, playing})
      },
      setLoaded: (loaded) => {
         dispatch({type: actionType.SET_LOADED, loaded})
      },
      setCanPlay: (canPlay) => {
         dispatch({type: actionType.SET_CAN_PLAY, canPlay})
      },
      setItem: (item) => {
         dispatch({type: actionType.SET_ITEM, item})
      },
      setShowPlay: (showPlay) => {
         dispatch({type: globalType.ACTION_SHOW_PLAY_CONTROLLER, showPlay})
      },
      playMusic(currentMusic, item, player, repeat) {
         dispatch({type: actionType.ACTION_PLAY_CURRENT_MUSIC, repeat, currentMusic, item, player});
      },
      nextMusic(player) {
         dispatch({type: actionType.ACTION_NEXT_MUSIC, player});
      },
      preMusic(player) {
         dispatch({type: actionType.ACTION_PRE_MUSIC, player});
      }
   }
};
MusicPage = connect(mapStateToProps, mapDispatchToProps)(MusicPage);
export default MusicPage