import React, {Component} from 'react';
import ImgBtn from './ImgButton';
import SeekBar from './SeekBar';
import LrcView from "./LrcView";
import {connect} from "react-redux";
import {actionType} from "./reducer/appState";
import data from "./MusicList";
import {PLAY_MODE} from "./AppConfig";

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

   componentDidMount() {
      this._init();
      var _this = this;
      this.music = document.getElementById('music');
      document.addEventListener("keydown", keydown);

      function keydown(event) {
         if (event.keyCode === 32) {
            if (_this.props.playing) {
               _this.props.setPlaying(false);
               _this.music.pause();
            } else {
               _this.props.setPlaying(true);
               _this.music.play();
            }
         }
      }

      this.keydown = keydown;
   }

   componentWillUnmount() {
      var player = this.music;
      this.state.dialog = false;
      window.localStorage.setItem("back", '1');
      document.removeEventListener("keydown", this.keydown)
   }

   componentWillReceiveProps(props) {
      if (1===props.duration){
         this.changeLrc = true;
         this.setState({
            dialog: false,
            lrcEntity: null
         });
      }
   }

   music;
   _init(){
      var _this=this;
      this.music = document.getElementById('music');
      setTimeout(function () {
         let page=$('#page2');
         console.log(page.height());
         page.css('background-image','none');
         $('.page2-back-img').css('height',page.height());
      },50);
      let music=this.props.match.params.music;
      if(music&&music!=='-1'){
         this.setState({
            showAx:true,
            showAxAnimation:false
         });
      }
   }
   _findMusic(){
      let music=this.props.match.params.music;
      if(music&&music!==-1){
         for(let i=0;i<data.length;i++){
            let item=data[i];
            if(item.name.toLowerCase().includes(music.toLowerCase())){
               this.props.playMusic(i,item,this.music);
               console.log(item);
               break;
            }
         }
      }
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


   render() {
      let playModeImg = [];
      switch (this.props.playMode) {
         case PLAY_MODE.XH:
            playModeImg[0] = require('./img/xh.png');
            playModeImg[1] = require('./img/xh_press.png');
            break;
         case PLAY_MODE.ONE_XH:
            playModeImg[0] = require('./img/adi.png');
            playModeImg[1] = require('./img/adj.png');
            break;
         case PLAY_MODE.ONE:
            playModeImg[0] = require('./img/adi.png');
            playModeImg[1] = require('./img/adj.png');
            break;
         case PLAY_MODE.SJ:
            playModeImg[0] = require('./img/sj.png');
            playModeImg[1] = require('./img/sj_press.png');
            break;
      }
      return (
         <div className='page' id='page2'>
            <div className='page2-back-img'>
               <img src={this.props.item.pic ? this.props.item.pic : require('./img/ww.jpg')}/>
               <div/>
            </div>

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
                          style={{animationPlayState: this.props.playing ? "running" : "paused"}}
                     />
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
                        style={{
                           width: '100%', height: "100%",
                           margin: 0, padding: 0, overflow: 'scroll'
                        }}/>
                  ) : ''}
               </div>
            </div>
            {/*点赞按钮等*/}
            <div className='page2Menu1'>
               <ImgBtn style={{animation: this.state.animation ? this.state.animation : 'none'}}
                       onCheckChanged={(checked) => {
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
            <SeekBar progress={this.props.progress} duration={this.props.duration} currentTime={this.props.currentTime}
                     onSeek={(progress) => {
                        var player = this.music;
                        let time = player.duration * progress / 100;
                        player.currentTime = time.toFixed(3);
                        this.props.setProgress(progress);
                        this.props.setCurrentTime(player.currentTime);
                     }}/>
            {/*播放控制按钮组*/}
            <div className='flex-row-center controlMenu'>
               <ImgBtn drawable={{
                  src: playModeImg[0],
                  press: playModeImg[1]
               }} onClick={() => {
                  this.props.switchPlayMode();
               }}/>
               <div style={{width: "8%"}}/>
               <ImgBtn drawable={{
                  src: require('./img/ac7.png'),
                  press: require('./img/ac8.png')
               }} onClick={() => {
                  this.props.preMusic(this.music);
               }}/>
               <div style={{width: "3%"}}/>
               <ImgBtn clickable={this.props.loaded} selected={!this.props.playing} drawable={{
                  src: [require('./img/ac3.png'), require('./img/ac5.png')],
                  press: [require('./img/ac4.png'), require('./img/ac6.png')],
               }}
                       onCheckChanged={(pause) => {
                          var player = this.music;
                          if (pause) {
                             this.props.setPlaying(false);
                             player.pause();
                          } else {
                             this.props.setPlaying(true);
                             player.play();
                          }
                       }}/>
               <div style={{width: "3%"}}/>
               <ImgBtn drawable={{
                  src: require('./img/ac1.png'),
                  press: require('./img/ac2.png')
               }} onClick={() => {
                  this.props.nextMusic(this.music);
               }}/>
               <div style={{width: "8%"}}/>
               <ImgBtn drawable={{
                  src: require('./img/adz.png'),
                  press: require('./img/ae1.png')
               }}/>
            </div>
            <div style={{height:'100%',width:'100%',display:this.state.showAx?'block':'none',
            position:'absolute',left:0,top:0,backgroundColor:'rgba(0,0,0,0.8)'}}>
               <img style={{width:'100vw', position:'absolute',left:0,top:0,right:0,bottom:0,
               margin:'auto',objectFit:'contain',animation:this.state.showAxAnimation?"ax-animation 1.5s":"none",
               transformOrigin:'50% 50%'}}
               src={require('./img/aixintao.jpg')}
               onClick={()=>{
                  this.setState({
                     showAxAnimation:true
                  });
                  let _this=this;
                  _this._findMusic();
                  setTimeout(()=>{
                     _this.setState({
                        showAx:false
                     })
                  },1500);

               }}/>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      progress: state.appState.progress,
      playing: state.appState.playing,
      loaded: state.appState.loaded,
      duration: state.appState.duration,
      currentTime: state.appState.currentTime,
      item: state.appState.item,
      playMode: state.appState.playMode
   }
};
const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      setPlaying: (playing) => {
         dispatch({type: actionType.SET_PLAYING, playing})
      },
      setProgress: (progress) => {
         dispatch({type: actionType.SET_PROGRESS, progress})
      },
      setCurrentTime: (currentTime) => {
         dispatch({type: actionType.SET_CURRENT_TIME, currentTime})
      },
      nextMusic: (player) => {
         dispatch({type: actionType.ACTION_NEXT_MUSIC, player})
      },
      preMusic: (player) => {
         dispatch({type: actionType.ACTION_PRE_MUSIC, player})
      },
      playMusic: (currentMusic,item,player) => {
         dispatch({type: actionType.ACTION_PLAY_CURRENT_MUSIC, player, currentMusic, item})
      },
      switchPlayMode: () => {
         dispatch({type: actionType.ACTION_SWITCH_MODE})
      }
   }
};
Page2 = connect(mapStateToProps, mapDispatchToProps)(Page2);
export default Page2;
