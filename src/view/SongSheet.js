import React, {Component} from 'react';
import PropTypes from "prop-types";
import ListView from "../ListView";

export default class SongSheet extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      var data = [
         {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530246778762&di=81b5059d7031fb528ed2ad2a9bbfcd2e&imgtype=0&src=http%3A%2F%2Fwww.5068.com%2Fuploads%2Fallimg%2F160225%2F1-160225145030.jpg',
            title: 'K歌',
            umber: '4'
         },
         {
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2117426799,1602652188&fm=27&gp=0.jpg',
            title: '说唱',
            number: '1'
         },
         {
            img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530246963429&di=7d98871a1a47a35d07d54f144a4f7969&imgtype=0&src=http%3A%2F%2Fs14.sinaimg.cn%2Fmw690%2F006DduSPzy7gB7OvykR1d%26690',
            title:'柒个我 影视剧原声带',
            number: '15'
         },
      ];
      this.setState({
         data,
         showSongSheet: true,
         animation: 'none'
      });
   }

   //组件已经挂载
   componentDidMount() {

   }

   //组件即将销毁
   componentWillUnmount() {

   }

   //渲染
   render() {
      return (
         <div>
            <div className="page_title flex-row" onClick={() => {
               this.setState({
                  showSongSheet: !this.state.showSongSheet,
                  animation: this.state.showSongSheet ? 'anim-up 0.3s forwards' : 'anim-down 0.3s forwards'
               });
            }}>
               <div>
               <span>
                  <img src={require('../img/a2u.png')} alt=""
                       style={{animation: this.state.animation}}/>
               </span>
                  <span>创建的歌单(12)</span>
               </div>
               <span className="shezhi">
                  <img src={require('../img/a62.png')} alt=""/>
               </span>
            </div>

            <div className="song_sheet flex-row"
                 style={{display: this.state.showSongSheet ? "flex" : 'none'}}
                 onClick={this.props.onItemClick ? this.props.onItemClick : () => {
                 }}>
               <span className="song_img">
                  <img src={require('../img/zbc.jpg')} alt=""/>
                  <em className="mask"></em>
                  <img src={require('../img/akx.png')} alt="" className="maskimg"/>
               </span>
               <div className="song_right flex-row-center">
                  <div className="text flex-c" style={{flexGrow: "1"}}>
                     <span>我喜欢的音乐</span>
                     <span>1213首</span>
                  </div>
                  <div>
                     <img src={require('../img/a3c.png')} alt=""/>
                  </div>
               </div>
            </div>
            <ListView data={this.state.data}
                      renderItem={(position, item) => {
                         return (
                            <div className="song_sheet flex-row"
                                 style={{display: this.state.showSongSheet ? "flex" : 'none'}}
                                 onClick={this.props.onItemClick ? this.props.onItemClick : () => {
                                 }}>
                                 <span className="song_img">
                                    <img src={item.img} alt=""/>
                                 </span>
                               <div className="song_right flex-row-center">
                                  <div className="text flex-c" style={{flexGrow: "1"}}>
                                     <span>{item.title}</span>
                                     <span>{item.number}首</span>
                                  </div>
                                  <div>
                                     <img src={require('../img/a3c.png')} alt=""/>
                                  </div>
                               </div>
                            </div>
                         )
                      }}/>
         </div>
      )
   }
}

SongSheet.propTypes = {
   onItemClick: PropTypes.func,
};