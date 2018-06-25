import React, {Component} from 'react';
import PropTypes from "prop-types";

const $ = require('jquery');

export default class LrcView extends Component {
   constructor() {
      super();
   }

   componentWillMount() {
      this.setState({selectLrcId:-1});
   }

   componentWillReceiveProps(pre) {
      let {data, nextTime} = pre;
      if (!nextTime) nextTime = 0;
      let selectLrcId = this._selectLrcId(data, nextTime);
      this.setState({
         selectLrcId
      });
   }

   _selectLrcId(data, nextTime) {
      for (let i = 0; i < data.body.times.length; i++) {
         let time = data.body.times[i];
         if (parseInt(nextTime) === parseInt(time.time)&&time.lrc) {
            if (this.props.onLrcSelect){
               this.props.onLrcSelect(i);
            }
            this._scrollTo(i);
            return i;
         }
      }
      return this.state.selectLrcId;
   }

   _scrollTo(position) {
      // var lrcView=this.refs.lrcView;
      let a = $('#lrcView');
      let first=$('#lrcFirstChild');
      console.log(first.scrollTop());
      // a.scrollTop((position) * 30);
      a.animate({"scrollTop":(position) * 30})
   }

   render() {
      let {data, nextTime, ...others} = this.props;
      var _this = this;
      return (
         <ul id='lrcView' ref='lrcView' {...others}>
            {<li id='lrcFirstChild' style={{height:'50%', display:'flex',flexDirection:'column',
               color:'white',justifyContent:'center',alignItems:'center'}}>
               {/*<div style={{fontSize:'18px'}}>*/}
                   {/*{data.header.ti}*/}
               {/*</div>*/}
               {/*<div style={{fontSize:'15px',marginTop:'10px'}}>*/}
                   {/*{"演唱者："+data.header.ar}*/}
               {/*</div>*/}
               {/*<div style={{fontSize:'15px',marginTop:'10px'}}>*/}
                   {/*{"专辑："+data.header.al}*/}
               {/*</div>*/}

            </li>}
            {
               data.body.times.map((item, index, array) => {
                  let highLight = _this.state.selectLrcId === index;
                  return (
                     <li style={{
                        listStyleType: "none",
                        height:item.lrc?'auto':'35px',
                        fontSize: highLight ? '18px' : '15px',
                        lineHeight: '30px', textAlign: 'center',
                        color: highLight ? '#fff' : '#aaa'
                        ,padding:'0 15px'
                     }}>{item.lrc}</li>
                  )
               })
            }
            {<li id='lrcLastChild' style={{height:'50%'}}>

            </li>}
         </ul>
      )
   }
}

LrcView.propTypes = {
   data: PropTypes.array,
   nextTime: PropTypes.number,
   selectLrcId:PropTypes.number,
   onLrcSelect:PropTypes.func,
   show:PropTypes.any
};