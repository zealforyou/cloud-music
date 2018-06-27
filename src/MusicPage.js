import React, {Component} from 'react';

import {connect} from 'react-redux';
import {actionType} from "./reducer/appState";

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
               console.log("app:" + audio.currentTime / audio.duration * 100);
               _this.props.setProgress(audio.currentTime / audio.duration * 100);
               _this.props.setCurrentTime(audio.currentTime);
               _this.props.setDuration(audio.duration);
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
         _this.props.setPlaying(false);
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
   }

   removeControl(audio) {
      audio.removeEventListener("laodeddata", this.loadeddata, false);
      audio.removeEventListener("pause", this.pause, false);
      audio.removeEventListener("play", this.play, false);
      audio.removeEventListener("ended", this.ended, false);
   }

   render() {
      return (
         <audio ref='music' id="music">
            亲 您的浏览器不支持html5的audio标签
         </audio>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      currentTime: state.appState.currentTime,
      duration: state.appState.duration,
      progress: state.appState.progress,
      playing: state.appState.playing,
      loaded: state.appState.loaded,
      currentMusic: state.appState.currentMusic,
      item: state.appState.item,
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
   }
};
MusicPage = connect(mapStateToProps, mapDispatchToProps)(MusicPage);
export default MusicPage