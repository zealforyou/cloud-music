import React, {Component} from 'react';
import ImgBtn from './ImgButton';
import SeekBar from './SeekBar';

const Style = require('./Page2.css');
const $ = require('jquery');
export default class Page2 extends Component {
   constructor() {
      super();
   }

   componentWillMount() {
      var query = this.props.location.query;
      console.log(query);
      this.setState({
         ...query,
         duration: 1,
         currentTime: 0
      });
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
      window.localStorage.setItem("state", JSON.stringify(this.state));
      window.localStorage.setItem("back", '1');
   }

   _showLrc() {
      var _this=this;
      if(this.state.item.lrc&&!this.state.item.lrcStr){
         this.state.item.lrcLoading=true;
         $.ajax(this.state.item.lrc,{
            success(res){
               res=res.replace(/"/g,'').replace(/[\n]/g,'<br/>');
               console.log(res);
               _this.state.item.lrcLoading=false;
               _this.state.item.lrcStr=res;
               $("#lrc").html(res);
               _this.setState({item:_this.state.item});
            },
            error(){
               _this.state.item.lrcLoading=false;
               _this.state.item.lrcErr=true;
               _this.setState({item:_this.state.item});
            }
         })
      }

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
            if (_this.state.playing) {
               _this.setState({
                  currentTime: audio.currentTime,
                  duration: audio.duration,
                  progress: audio.currentTime / audio.duration * 100
               });
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
      var _this = this;
      audio.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
         function () {
            let allTime = audio.duration;
            _this.setState({
               loaded: true,
               playing: true
            });
         }, false);

      audio.addEventListener("pause",
         function () { //监听暂停
            if (audio.currentTime === audio.duration) {
               audio.currentTime = 0;
            }
         }, false);
      audio.addEventListener("play",
         function () { //监听播放
         }, false);
      audio.addEventListener("ended", function () {
         _this.setState({
            playing: false
         });
      }, false)
   }

   clickPlay(e) {
      var player = this.music;
      if (this.state.playing) {
         this.setState({
            playing: false
         });
         player.pause();
      } else {
         this.setState({
            playing: true
         });
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
                     <span>{this.state.item.name}</span>
                     <span style={{fontSize: "13px", color: "#ddd"}}>{this.state.item.author}</span>
                  </div>

               </div>
               <img src={require("./img/a8k.png")} style={{}}/>
            </div>
            <div className="line">
            </div>
            <div className='circle-lrc-contain'>
               <div className="circleContain" style={{display: this.state.dialog ? 'none' : 'block'}} onClick={() => {
                  this.setState({dialog: true});
                  this._showLrc();
               }}>
                  <div className='g-pan'>
                     <img className="big" src={require('./img/aea.png')}/>
                     <img className="small" src={this.state.item.pic}
                          style={{animationPlayState: this.state.playing ? "running" : "paused"}}/>
                     <img className="big" src={require('./img/acg.png')}/>
                  </div>
                  <div className='div-img1'>
                     <img src={require('./img/ae2.png')}
                          style={{animation: this.state.playing ? 'head-in 1s forwards' : 'head-out 1s forwards'}}/>
                  </div>
               </div>
               <div className='dialog-lrc' style={{display: !this.state.dialog ? 'none' : 'block'}} onClick={() => {
                  this.setState({dialog: false});
               }}>
                  <p id='lrc'>
                     {/*{this.state.item.lrcErr?"暂无歌词":this.state.item.lrcLoading?"正在加载歌词":this.state.item.lrcStr}*/}
                  </p>
               </div>
            </div>
            <div className='page2Menu1'>
               <ImgBtn style={{animation: this.state.animation ? this.state.animation : 'none'}} onCheckChanged={(checked) => {
                  this.setState({
                     animation: `${checked ? "btnBig" : "btnBig1"} 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)`
                  });
               }} drawable={{
                  press: [require("./img/add.png"), require('./img/adf.png')],
                  src: [require("./img/adc.png"), require('./img/ade.png')]
               }}/>
               <ImgBtn drawable={{press: require("./img/ad3.png"), src: require("./img/ad2.png")}}/>
               <ImgBtn drawable={{press: require("./img/ad0.png"), src: require("./img/acz.png")}}>
                  <small style={{
                     fontSize: "0.05rem", position: 'absolute', right: '5%'
                     , top: "25%", transform: "scale(0.8)", fontFamily: "Consolas"
                  }}>999+
                  </small>
               </ImgBtn>
               <ImgBtn drawable={{press: require("./img/adh.png"), src: require("./img/adg.png")}}/>
            </div>
            <SeekBar duration={this.state.duration} currentTime={this.state.currentTime}/>
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
               <ImgBtn selected={!this.state.playing} drawable={{
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