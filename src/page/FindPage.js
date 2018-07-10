import React, {Component} from 'react';
import {localManager} from "../utils/LocalManager";
import MenuTab from "../view/MenuTab";
import "../view/MenuTab.scss";
import "./css/Mypage.scss";
import "./css/FindPage.scss";
import ListView from "../ListView";


export default class FindPage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      var data = [
         {
            id: 0, likes: 2,
            content: '华语速爆新歌',
            pic: 'http://img4.imgtn.bdimg.com/it/u=3036919756,557540970&fm=27&gp=0.jpg'
         },
         {
            id: 0, likes: 2,
            content: '独立电子|异彩纷呈的聆听感觉',
            pic: 'http://img4.imgtn.bdimg.com/it/u=3036919756,557540970&fm=27&gp=0.jpg'
         },
         {
            id: 0, likes: 2,
            content: '神级Remix电音背后的优质原作总集...',
            pic: 'http://img4.imgtn.bdimg.com/it/u=3036919756,557540970&fm=27&gp=0.jpg'
         },

      ];
      this.setState({
         likeId: [],
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
         <div className="Find Mypage">
            <div style={{position: 'fixed', width: '100%', zIndex: '999'}}>
               <div className="mypage app-title flex-row-center">
               <span>
                  <img src={require('../img/ov.png')} alt="" onClick={() => {
                     this.props.showToast("是否切换账号", function (e) {
                        localManager.setPhone('');
                        localManager.setName('');
                        window.location.reload(true);
                     }.bind(this))
                  }}/>
               </span>
                  <div className="center flex-row" style={{justifyContent: 'center'}}>
                     <img src={require('../img/video.png')} alt=""/>
                     <img src={require('../img/wangyi.png')} alt=""/>
                     <img src={require('../img/friends.png')} alt=""/>
                  </div>
                  <span>
                  <img src={require('../img/pf.png')} alt="" onClick={() => {
                     this.props.history.push('/SearchPage');
                  }}/>
               </span>
               </div>
               <MenuTab selectItem={0} menus={[{title: '发现'}, {title: '我的'}, {title: '电台'}]}/>
            </div>
            <div className="swiper"></div>
            <div className="find_title flex-row-center">
               <div className="flex-c-center">
                  <img src={require('../img/FM.png')} alt=""/>
                  <span>私人FM</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/tuijian.png')} alt=""/>
                  <span>每日推荐</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/gedan.png')} alt=""/>
                  <span>歌单</span>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/paihang.png')} alt=""/>
                  <span>排行榜</span>
               </div>
            </div>


            <div className="recommend flex-row-center">
               <p>推荐歌单</p>
               <img src={require('../img/a2u.png')} alt=""/>
            </div>

            <ListView data={this.state.data}
                      renderItem={(position, item) => {
                         return (

                            <div className="recommend_song">
                               <div className="flex-c-center">
                                  <img src={item.pic} alt=""/>
                                  <span>{item.content}</span>

                                  <div className="number">
                                     <em><img src={require('../img/zh.png')} alt=""/></em>
                                     <em>{item.likes}亿</em>
                                  </div>
                               </div>
                              {/* <div className="flex-c-center">
                                  <img src={item.pic} alt=""/>
                                  <span>独立电子|异彩纷呈的聆听感觉</span>
                                  <div className="number">
                                     <em><img src={require('../img/zh.png')} alt=""/></em>
                                     <em>16万</em>
                                  </div>
                               </div>
                               <div className="flex-c-center">
                                  <img src={require('../img/album_default.png')} alt=""/>
                                  <span>神级Remix电音背后的优质原作总集...</span>
                                  <div className="number">
                                     <em><img src={require('../img/zh.png')} alt=""/></em>
                                     <em>1162万</em>
                                  </div>
                               </div>*/}
                            </div>

                         )
                      }}/>

            {/*<div className="recommend_song flex-row-center">*/}
               {/*<div className="flex-c-center">*/}
                  {/*<img src={require('../img/a20.9.png')} alt=""/>*/}
                  {/*<span>【社会人专用歌】</span>*/}

                  {/*<div className="number">*/}
                     {/*<em><img src={require('../img/zh.png')} alt=""/></em>*/}
                     {/*<em>72亿</em>*/}
                  {/*</div>*/}
               {/*</div>*/}
               {/*<div className="flex-c-center">*/}
                  {/*<img src={require('../img/qingren.jpg')} alt=""/>*/}
                  {/*<span>梦龙，林肯公园，马老五，共和，酷...</span>*/}
                  {/*<div className="number">*/}
                     {/*<em><img src={require('../img/zh.png')} alt=""/></em>*/}
                     {/*<em>11万</em>*/}
                  {/*</div>*/}
               {/*</div>*/}
               {/*<div className="flex-c-center">*/}
                  {/*<img src={require('../img/album_default.png')} alt=""/>*/}
                  {/*<span>适合读书时听得欧美小调</span>*/}
                  {/*<div className="number">*/}
                     {/*<em><img src={require('../img/zh.png')} alt=""/></em>*/}
                     {/*<em>547万</em>*/}
                  {/*</div>*/}
               {/*</div>*/}
            {/*</div>*/}

            <div className="recommend flex-row-center">
               <p style={{color: '#EB9B9D'}}>会员专区</p>
               <img src={require('../img/huiyuan.png')} alt="" style={{width: '3.5%'}}/>
            </div>

            <div className="recommend_song flex-row-center">
               <div className="flex-c-center">
                  <img src={require('../img/a20.9.png')} alt=""/>
                  <span>华语速爆新歌</span>

                  <div className="number">
                     <em><img src={require('../img/zh.png')} alt=""/></em>
                     <em>2亿</em>
                  </div>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/qingren.jpg')} alt=""/>
                  <span>独立电子|异彩纷呈的聆听感觉</span>
                  <div className="number">
                     <em><img src={require('../img/zh.png')} alt=""/></em>
                     <em>16万</em>
                  </div>
               </div>
               <div className="flex-c-center">
                  <img src={require('../img/album_default.png')} alt=""/>
                  <span>神级Remix电音背后的优质原作总集...</span>
                  <div className="number">
                     <em><img src={require('../img/zh.png')} alt=""/></em>
                     <em>1162万</em>
                  </div>
               </div>
            </div>


         </div>
      )
   }
}