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

   componentDidMount() {
      this._caItemHeight();
   }
   _caItemHeight(){
      // console.log($('#lrcView').children('li').length);

   }
   componentWillReceiveProps(pre) {
      let {data, nextTime} = pre;
      if (!data)return;
      if (!nextTime) nextTime = 0;
      let selectLrcId = this._selectLrcId(data, nextTime);
      this.setState({
         selectLrcId
      },function () {

      });
   }

   componentDidUpdate() {
      if (this.canScroll){
         this.canScroll=false;
         this._scrollTo(this.state.selectLrcId)
      }
   }
   canScroll=false;
   _selectLrcId(data, nextTime) {
      for (let i = 0; i < data.body.times.length; i++) {
         let time = data.body.times[i];
         if (parseInt(nextTime) === parseInt(time.time)&&time.lrc) {
            if (this.props.onLrcSelect){
               this.props.onLrcSelect(i);
            }
            this.canScroll=true;
            return i;
         }
      }
      return this.state.selectLrcId;
   }

   _scrollTo(position) {
      let a = $('#lrcView');
      let scroll=0;
      let childrens = a.children('li');
      if (childrens.length<2)return;
      for(let i=1;i<childrens.length;i++){
         if (position===i-1)break;
         scroll+=childrens[i].offsetHeight;
      }
      a.animate({"scrollTop":scroll})
   }

   render() {
      let {data, nextTime, ...others} = this.props;
      var _this = this;
      return (
         <ul id='lrcView' ref='lrcView' {...others}>
            {<li id='lrcFirstChild' style={{height:'50%', display:'flex',flexDirection:'column',
               color:'white',justifyContent:'center',alignItems:'center'}}>
            </li>}
            {
               data?data.body.times.map((item, index, array) => {
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
               }):''
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