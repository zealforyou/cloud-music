import React, {Component} from 'react';
import PropTypes from "prop-types";
import ListView from "../ListView";

export default class SongSheet extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.setState({
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

            <ListView data={this.props.data}
                      renderItem={(position, item) => {
                         return (
                            <div className="song_sheet flex-row"
                                 style={{display: this.state.showSongSheet ? "flex" : 'none'}}
                                 onClick={() => {
                                    this.props.onItemClick ? this.props.onItemClick(position,item) :""
                                 }}>
                                 <span className="song_img">
                                    <img src={item.pic} alt=""/>
                                    {item.id===0?[<em className="mask"></em>,
                                       <img src={require('../img/akx.png')} alt="" className="maskimg"/>]:''}
                                 </span>
                               <div className="song_right flex-row-center">
                                  <div className="text flex-c" style={{flexGrow: "1"}}>
                                     <span>{item.album_name}</span>
                                     <span>{item.count}首</span>
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