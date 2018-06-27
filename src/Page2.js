import React, {Component} from 'react';
import ImgBtn from './ImgButton';
import SeekBar from './SeekBar';
import LrcView from "./LrcView";
import {connect} from "react-redux";
import {actionType} from "./reducer/appState";
const Style = require('./Page2.css');
const $ = require('jquery');
const lrcParse = require('./LrcManager');
 class Page2 extends Component {
   constructor() {
      super();
   }

   componentWillMount() {
      this.setState({});
   }

   music;

   componentDidMount() {
      this.music = document.getElementById('music');
      this.playControl(this.music);
      var query = this.props.location.query;
      this.dragMove(this.music);
   }

   componentWillUnmount() {
      var player = this.music;
      this.removeDragMove();
      this.removeControl(player);
      this.state.dialog = false;
      window.localStorage.setItem("back", '1');
   }

   _showLrc() {
      var _this = this;
      let lrc1 = this.props.item.lrc1;
      if (this.props.item.lrcEntity) {
         this.setState({
            lrcEntity: this.props.item.lrcEntity,
         });
      } else {
         let url = lrc1 ? lrc1 : require('./lrcs/empty');
         $.ajax(url, {
            success(res) {
               console.log(res);
               _this._showLrcView(res);
               // _this._showLrcText(res);
            },
            error() {

            }
         })
      }
   }

   _showLrcView(res) {
      let data = lrcParse(res);
      this.props.item.lrcEntity = data;
      this.setState({
         lrcEntity: data
      });
   }

   _showLrcText(res) {
      res = res.replace(/"/g, '').replace(/[\n]/g, '<br/>');
      $(".dialog-lrc").html(`<p id='lrc'>${res}</p>`);
   }


   num = -1;

   /**
    * 进度条控制
    * @param audio
    */
   dragMove(audio) {
      let _this = this;
      if (this.num === -1)
         this.num = setInterval(function () {
            if (_this.props.playing) {
               _this.props.setCurrentTime(audio.currentTime);
               _this.props.setDuration( audio.duration);
               _this.props.setProgress(audio.currentTime / audio.duration * 100);
            }
         }, 1000);
   }

   removeDragMove() {
      clearInterval(this.num);
      this.num = -1;
   }


   /**
    * 播放控制
    */
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
         let audio = _this.music;
         if (audio.currentTime === audio.duration) {
            audio.currentTime = 0;
         }
      }

      function play() {
         console.log("page2play");
      }

      function ended() {
         console.log("page2ended");
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
      audio.removeEventListener("laodeddata", this.loadeddata);
      audio.removeEventListener("pause", this.pause);
      audio.removeEventListener("play", this.play);
      audio.removeEventListener("ended", this.ended);
   }

   clickPlay(e) {
      var player = this.music;
      if (this.props.playing) {
         this.props.setPlaying(false);
         player.pause();
      } else {
         this.props.setPlaying(true);
         player.play();
      }
   }

   render() {
      return (
         <div className='page'>
            <div className='page2title flex-row-center'
                 style={{backgroundColor: `rgba(0,0,0,0)`}}>
               <div className='flex-row-center'>
                  <img onClick={() => {
                     this.props.history.goBack()
                  }} src={require("./img/ic_left.png")} width="25px" style={{marginRight: "10px"}}/>
                  <div className='flex-c'>
                     <span>{this.props.item.name}</span>
                     <span style={{fontSize: "13px", color: "#ddd"}}>{this.props.item.author}</span>
                  </div>

               </div>
               <img src={require("./img/a8k.png")} style={{width: "20px"}}/>
            </div>
            <div className="line">
            </div>
            {/*光盘区域*/}
            <div className='circle-lrc-contain'>
               <div className="circleContain" style={{display: this.state.dialog ? 'none' : 'block'}} onClick={() => {
                  this.setState({dialog: true});
                  this._showLrc();
               }}>
                  <div className='g-pan'>
                     <img className="big" src={require('./img/aea.png')}/>
                     <img className="small" src={this.props.item.pic}
                          style={{animationPlayState: this.props.playing ? "running" : "paused"}}/>
                     <img className="big" src={require('./img/acg.png')}/>
                  </div>
                  <div className='div-img1'>
                     <img src={require('./img/ae2.png')}
                          style={{animation: this.props.playing ? 'head-in 1s forwards' : 'head-out 1s forwards'}}/>
                  </div>
               </div>
               {/*歌词dialog*/}
               <div className='dialog-lrc' style={{display: !this.state.dialog ? 'none' : 'block'}} onClick={() => {
                  this.setState({dialog: false});
               }}>
                  {this.state.lrcEntity ? (
                     <LrcView
                        nextTime={this.props.currentTime}
                        data={this.state.lrcEntity}
                        onLrcSelect={(selectLrcId) => {
                           this.selectLrcId = selectLrcId;
                        }}
                        selectLrcId={this.state.selectLrcId}
                        style={{
                           width: '100%', height: "100%",
                           margin: 0, padding: 0,overflow:'scroll'
                        }}/>
                  ) : ''}
               </div>
            </div>
            {/*点赞按钮等*/}
            <div className='page2Menu1'>
               <ImgBtn style={{animation: this.state.animation ? this.state.animation : 'none'}} onCheckChanged={(checked) => {
                  this.setState({
                     animation: `${checked ? "btnBig" : "btnBig1"} 0.5s`
                  });
               }} drawable={{
                  press: [require("./img/add.png"), require('./img/adf.png')],
                  src: [require("./img/adc.png"), require('./img/ade.png')]
               }}/>
               <ImgBtn drawable={{press: require("./img/ad3.png"), src: require("./img/ad2.png")}}/>
               <ImgBtn drawable={{press: require("./img/ad0.png"), src: require("./img/acz.png")}}>
                  <small style={{
                     fontSize: "0.1rem", position: 'absolute', right: '11%'
                     , top: "26%", transform: "scale(1)", fontFamily: "Consolas"
                  }}
                  >999+
                  </small>
               </ImgBtn>
               <ImgBtn drawable={{press: require("./img/adh.png"), src: require("./img/adg.png")}}/>
            </div>
            {/*进度条*/}
            <SeekBar progress={this.props.progress} duration={this.props.duration} currentTime={this.props.currentTime}/>
            {/*播放控制按钮组*/}
            <div className='flex-row-center controlMenu'>
               <ImgBtn drawable={{
                  src: require('./img/adi.png'),
                  press: require('./img/adj.png')
               }}/>
               <div style={{width: "8%"}}/>
               <ImgBtn drawable={{
                  src: require('./img/ac7.png'),
                  press: require('./img/ac8.png')
               }}/>
               <div style={{width: "3%"}}/>
               <ImgBtn selected={!this.props.playing} drawable={{
                  src: [require('./img/ac3.png'), require('./img/ac5.png')],
                  press: [require('./img/ac4.png'), require('./img/ac6.png')],
               }}
                       onClick={this.clickPlay.bind(this)}
               />
               <div style={{width: "3%"}}/>
               <ImgBtn drawable={{
                  src: require('./img/ac1.png'),
                  press: require('./img/ac2.png')
               }}/>
               <div style={{width: "8%"}}/>
               <ImgBtn drawable={{
                  src: require('./img/adz.png'),
                  press: require('./img/ae1.png')
               }}/>
            </div>
         </div>
      )
   }
}

const mapStateToProps=(state)=>{
   return{
      progress:state.appState.progress,
      playing:state.appState.playing,
      loaded:state.appState.loaded,
      duration:state.appState.duration,
      currentTime:state.appState.currentTime,
      item:state.appState.item
   }
};
const mapDispatchToProps=(dispatch,ownProps)=>{
   return {
      setDuration:(duration)=>{
         dispatch({type:actionType.SET_DURATION,duration})
      },
      setCurrentTime:(currentTime)=>{
         dispatch({type:actionType.SET_CURRENT_TIME,currentTime})
      },
      setProgress:(progress)=>{
         dispatch({type:actionType.SET_PROGRESS,progress})
      },
      setPlaying:(playing)=>{
         dispatch({type:actionType.SET_PLAYING,playing})
      },
      setLoaded:(loaded)=>{
         dispatch({type:actionType.SET_LOADED,loaded})
      },
   }
};
Page2=connect(mapStateToProps,mapDispatchToProps)(Page2);
export default Page2;
