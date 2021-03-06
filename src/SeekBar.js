import React, {Component} from 'react';

export default class SeekBar extends Component {
   constructor() {
      super();
   }

   componentWillMount() {
      this.setState({
         dx: 0,
         time:0,
         startMove: false
      });
   }

   limit = 255;

   componentDidMount() {
      this.limit = this.refs.bar.offsetWidth;
      this.setState({dx:this.props.progress / 100 * this.limit,
      time:this.props.currentTime});
   }

   componentWillReceiveProps() {
      if (this.props.currentTime===0){
         this.setState({dx:0,
            time:this.props.currentTime});
      }
   }

   current = 0;

   addPreZero(num) {
      if (num < 10) {
         return '0' + num;
      } else {
         return num;
      }
   }

   render() {
      let {duration, currentTime, progress, ...other} = this.props;
      let dx = this.state.startMove ? this.state.dx : progress / 100 * this.limit;
      let time=this.state.startMove ? this.state.time:currentTime;
      return (
         <div {...other} style={Style.seekBar}>
            <span style={{color: "#aaa", ...Style.time}}>
               {`${this.addPreZero(parseInt(time / 60))}:${this.addPreZero(parseInt(time % 60))}`}
               </span>
            <div id='bar' ref='bar' style={Style.bar}>
               <div style={Style.grayLine}>
                  <div style={{...Style.redLine, width: `${dx}px`}}/>
               </div>
               <div style={{...Style.ball, left: `${dx}px`}}
                    onTouchStart={(e) => {
                       let touch = e.touches[0];
                       this.current = touch.clientX;
                       this.setState({
                          startMove: true,
                          dx:this.props.progress / 100 * this.limit
                       });
                    }}
                    onTouchMove={(e) => {
                       let touch = e.touches[0];
                       let dx = touch.clientX - this.current;
                       this.current = touch.clientX;
                       dx = this.state.dx + dx;
                       let limit = this.refs.bar.offsetWidth;
                       dx=dx <= 0 ? 0 : dx >= limit ? limit : dx;
                       let  time=dx/this.limit*duration;
                       this.setState({
                          dx,
                          time
                       });
                    }}
                    onTouchEnd={() => {
                       if(this.props.onSeek){
                          this.props.onSeek(this.state.dx/this.limit*100);
                       }
                       this.setState({
                          startMove: false
                       });
                    }}>
                  <img src={require('./img/agl.png')} style={Style.smallBall}/>
               </div>
            </div>
            <span
               style={{color: "rgba(200,200,200,0.3)", ...Style.time}}>
                  {`${this.addPreZero(parseInt(duration / 60))}:${this.addPreZero(parseInt(duration % 60))}`}
            </span>
         </div>
      )
   }
}
const Style = {
   seekBar: {
      display: "flex",
      alignItems: "center",
      width: '90%',
      margin: '0 auto',
   },
   bar: {
      flexGrow: 1,
      margin: "0 10px",
      position: 'relative',
      height: '15px'

   },
   grayLine: {
      width: '100%',
      borderRadius: '0.5px',
      height: '2px',
      position: 'absolute',
      margin: 'auto',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#aaa'
   },
   redLine: {
      borderRadius: '0.5px',
      height: '100%',
      backgroundColor: '#dd2200'
   },
   ball: {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      backgroundColor: 'white',
      position: 'relative',
      transform: 'translate(-50%,0)'
   },
   smallBall: {
      width: '25%',
      height: '25%',
      position: 'absolute',
      margin: 'auto',
      top: 0, left: 0, right: 0, bottom: 0
   },
   time: {
      fontSize: '12px',
      transform: 'scale(0.8)'
   }
};

