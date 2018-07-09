import React, {Component} from 'react';
import './CollectionSong.scss';
import ListView from "../ListView";

export default class CollectionSong extends Component {
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
         <div className="CollectionSong SearchPage">
            <div className='title app-title'>
               <img className='first-child' src={require('../img/ic_left.png')} onClick={() => {
                  this.props.history.goBack();
               }}/>
               <div className='input-div'>
                  <input placeholder={'给你推荐 ' + this.defaultValue} onInput={(e) => {
                     this.setState({keyword: e.currentTarget.value});
                  }}/>
                  <img src={require('../img/pf.png')}
                       onClick={() => {
                          let path = {
                             pathname: '/SearchPageIner',
                             query: {
                                keyword: this.state.keyword ? this.state.keyword : this.defaultValue
                             }
                          };
                          this.props.history.push(path);
                       }}/>
               </div>
            </div>
            <div className="mask"></div>
            <div className="modal">
               <p>收藏到歌单</p>
               <div className="box">
                  {/*<div className="song_sheet flex-row">
                     <span className="song_img">
                         <img src={require('../img/akx.png')} alt=""/>
                         <em className="mask"></em>
                         <img src={require('../img/akx.png')} alt="" className="maskimg"/>
                     </span>
                     <div className="song_right flex-row-center">
                        <div className="text flex-c" style={{flexGrow: "1"}}>
                           <span>sad</span>
                           <span>1首</span>
                        </div>
                     </div>
                  </div>*/}

                  <ListView data={[{pic:'',id:'',album_name:'gd1',count:0}]}
                            renderItem={(position, item) => {
                               return (
                                  <div className="song_sheet flex-row"
                                       style={{display: this.state.showSongSheet ? "flex" : 'none'}}
                                       onClick={() => {
                                          this.props.onItemClick ? this.props.onItemClick(position, item) : ""
                                       }}>
                                 <span className="song_img">
                                    <img src={item.pic} alt=""/>
                                    {item.id === 0 ? [<em className="mask"></em>,
                                       <img src={require('../img/akx.png')} alt="" className="maskimg"/>] : ''}
                                 </span>
                                     <div className="song_right flex-row-center">
                                        <div className="text flex-c" style={{flexGrow: "1"}}>
                                           <span>{item.album_name}</span>
                                           <span>{item.count}首</span>
                                        </div>

                                     </div>
                                  </div>
                               )
                            }}/>

               </div>
            </div>
         </div>
      )
   }
}