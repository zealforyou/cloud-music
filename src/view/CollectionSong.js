import React, {Component} from 'react';
import './CollectionSong.scss';
import ListView from "../ListView";

export default class CollectionSong extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      var data = [
         {
            id: 0, album_name: 'K歌', count:4,
            pic:'http://img4.imgtn.bdimg.com/it/u=3036919756,557540970&fm=27&gp=0.jpg'
         },
         {
            id: 0, album_name: '说唱', count:1,
            pic:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3462574826,2219711957&fm=27&gp=0.jpg'
         },
         {
            id: 0, album_name: '柒个我 影视剧原声带', count:10,
            pic:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2136582533,387009032&fm=58&bpow=1060&bpoh=1484'
         },
         {
            id: 0, album_name: '崩坏', count:10,
            pic:'http://img0.imgtn.bdimg.com/it/u=2418988982,3933915728&fm=27&gp=0.jpg'
         },
         {
            id: 0, album_name: '外文', count:10,
            pic:'http://img4.imgtn.bdimg.com/it/u=3036919756,557540970&fm=27&gp=0.jpg'
         },
      ];
      this.setState({
         showSongSheet: true,
         animation: 'none',
         data
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
                  <div className="song_sheet flex-row">
                     <span className="song_img">
                         <img src={require('../img/xinjian.png')} alt=""/>
                     </span>
                     <div className="song_right flex-row-center">
                        <div className="text" style={{flexGrow: "1"}}>
                           <span>新建歌单</span>
                        </div>
                     </div>
                  </div>
                  <div className="song_sheet flex-row">
                     <span className="song_img">
                         <img src={require('../img/zbc.jpg')} alt=""/>
                         <em className="mask"></em>
                         <img src={require('../img/akx.png')} alt="" className="maskimg"/>
                     </span>
                     <div className="song_right flex-row-center">
                        <div className="text flex-c" style={{flexGrow: "1"}}>
                           <span>我喜欢的音乐</span>
                           <span>1首</span>
                        </div>
                     </div>
                  </div>

                  <ListView data={this.state.data}
                            renderItem={(position, item) => {
                               return (
                                  <div className="song_sheet flex-row"
                                       style={{display: this.state.showSongSheet ? "flex" : 'none'}}
                                       onClick={() => {
                                          this.props.onItemClick ? this.props.onItemClick(position, item) : ""
                                       }}>
                                 <span className="song_img">
                                    <img src={item.pic} alt=""/>
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