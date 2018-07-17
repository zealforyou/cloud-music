import React, {Component} from 'react';
import "../view/MenuTab.scss";
import "./css/RadioStation.scss";
import "./css/Mypage.scss";
import ListView from "../ListView";
import {actionType as globalType, actionType} from "../reducer/globalState";
import {component} from "../utils/ZUtil";
import {albumActionType} from "../reducer/AlbumState";
import {Carousel} from 'antd';

class RadioStation extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.props.setShowPlay(true);
      var data = [
         {
            pic: 'http://p1.music.126.net/x-9deD6k7eNFAsU8BdSjJg==/109951163106286192.jpg?param=200y200',
            title: '会长不会长',
            content: '会长马睿给你的八卦小纸条',
            explain: '跟你分享娱乐圈、影视圈、互联网圈等',
            money: 79, time: '07月16日',
         },
         {
            pic: 'http://p1.music.126.net/TqVdY-fAS7HIiYTAJ9xDJw==/109951163104868937.jpg?param=200y200',
            title: '雯纪光影',
            content: '记录经典与情怀，重温旧梦光阴',
            explain: ' 有些旧时光，沉睡在人们的记忆里',
            money: 98, time: '07月16日',
         },
         {
            pic: 'http://p1.music.126.net/R_B4u9-1hC_pxWAaG7kxLQ==/109951163171342170.jpg?param=200y200',
            title: '后浪剧场',
            content: '一个交流情感与思想的空中剧场',
            explain: '这里是一个交流情感与思想的空中剧场',
            money: 59, time: '07月16日',
         },
         {
            pic: 'http://p1.music.126.net/lQk5fTJ1Huqexs3xF4v0kw==/109951163042542885.jpg?param=200y200',
            title: '世界影史百年经典100期',
            content: '那些经典电影为何成为经典',
            explain: '威尼斯电影节、柏林电影节最佳影片导演',
            money: 105, time: '07月16日',
         },
         {
            pic: 'http://p1.music.126.net/bpwFNWXI8g2PmPZj2HLf6Q==/109951163177243464.jpg?param=200y200',
            title: '闺蜜夜话Girlstalk',
            content: '神秘美少女组织与你八卦小秘密',
            explain: '三糙旗下的神秘美少女组织，每个夜晚',
            money: 89, time: '07月16日',
         },
         {
            pic: 'http://p1.music.126.net/9C-hk5u_-0yypUoJ39gWyg==/109951163365299431.jpg?param=200y200',
            title: '七天改善睡眠冥想',
            content: '睡前10分钟 全天幸福感',
            explain: ' 冥想，从硅谷到好莱坞都在流行，乔布斯、',
            money: 112, time: '07月16日',
         },
         {
            pic: 'http://p1.music.126.net/PmJHKvqfJnVcEBzTPLbKeg==/109951163087908126.jpg?param=200y200',
            title: '刘轩 | 幸福的最小行动',
            content: '哈佛大学心理学硕士的智慧分享',
            explain: '刘轩，作家，音乐制作人，资深DJ',
            money: 70, time: '07月16日',
         },

      ];
      var data2 = [
         {
            pic: 'http://p1.music.126.net/zyDlTGNNCACMN1st6AmzOA==/109951163410811405.jpg',
            pic2: 'http://p1.music.126.net/EQhQvuG-OysWp74yVCWXdQ==/109951163411042851.jpg',
            pic3: 'http://p1.music.126.net/d9j7TSyqSMIRjAh3sVdkaQ==/109951163410840018.jpg',
            pic4: 'http://p1.music.126.net/aoWfwrX70oAaxjvOKe7fTA==/109951163411046774.jpg',
            pic5: 'http://p1.music.126.net/SOqEUPKFRjVvPF8TktEtug==/109951163410835375.jpg',
            pic6: 'http://p1.music.126.net/UKo-YZN_JZtLwbsrp-6e5A==/109951163410830969.jpg',
            pic7: 'http://p1.music.126.net/DL3k4seDy_aHlcWp4D45ig==/109951163411043402.jpg',
            pic8: 'http://p1.music.126.net/WCqKTqy5lHdvErtloXApYA==/109951163411048644.jpg',
         },
      ];
      this.setState({
         data,
         data2
      });
   }

   //组件已经挂载
   componentDidMount() {

   }

   //组件即将销毁
   componentWillUnmount() {
      this.props.setShowPlay(false);
   }

   //渲染
   render() {
      return (
         <div className="RadioStation">
            <ListView className="list-view-x" data={this.state.data2}
                      renderItem={(position, item) => {
                         return (
                            <div className="swiper">
                               <Carousel autoplay>
                                  <div><img src={item.pic} alt=""/></div>
                                  <div><img src={item.pic2} alt=""/></div>
                                  <div><img src={item.pic3} alt=""/></div>
                                  <div><img src={item.pic4} alt=""/></div>
                                  <div><img src={item.pic5} alt=""/></div>
                                  <div><img src={item.pic6} alt=""/></div>
                                  <div><img src={item.pic7} alt=""/></div>
                                  <div><img src={item.pic8} alt=""/></div>
                               </Carousel>
                            </div>
                         )
                      }}/>

            <div className="Radio flex-row-center">
               <div className="flex-row-center">
                  <span><img src={require('../img/fenlei.png')} alt=""/></span>
                  <span>电台分类</span>
               </div>
               <div className="flex-row-center">
                  <span><img src={require('../img/paihang1.png')} alt=""/></span>
                  <span>电台排行</span>
               </div>
            </div>
            <div className="Radio_box flex-row-center">
               <p>付费精选</p>
               <img src={require('../img/a2u.png')} alt=""/>
            </div>

            <div className="Radio_station">
               <ListView className="list-view-x" data={this.state.data}
                         renderItem={(position, item) => {
                            return (
                               <div className="content flex-row-center">
                                  <div>
                                     <img src={item.pic} alt=""/>
                                     <p>{item.time}更新</p>
                                  </div>
                                  <div className="flex-c">
                                     <p>{item.title}</p>
                                     <p>{item.content}</p>
                                     <p><img src={require('../img/jiantou.jpg')} alt=""/>{item.explain}</p>
                                     <p>￥{item.money}</p>
                                  </div>
                               </div>
                            )
                         }}/>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      data: state.albumState.data
   }
};
const mapDispatchToProps = (dispatch) => {
   return {
      setShowPlay: (showPlay) => {
         dispatch({type: actionType.ACTION_SHOW_PLAY_CONTROLLER, showPlay});
      },
      setAlbumData(data) {
         dispatch({type: albumActionType.SET_DATA, data});
      },
      showToast(content, onClick) {
         dispatch({type: globalType.ACTION_SHOW_TOAST, toast: {left: "取消", content, onClick}});
      }
   }
};
RadioStation = component(mapStateToProps, mapDispatchToProps, RadioStation);
export default RadioStation


