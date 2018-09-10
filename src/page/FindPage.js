import React, {Component} from 'react';
import "../view/MenuTab.scss";
import "./css/Mypage.scss";
import "./css/FindPage.scss";
import ListView from "../ListView";
import {Carousel} from 'antd';
import {actionType} from "../reducer/globalState";
import {component} from "../utils/ZUtil";

class FindPage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      var data = [
         {
            id: 0, likes: '2亿',
            content: '华语速爆新歌',
            pic: 'http://p1.music.126.net/tk4L-mj-QoIBlj4zYQZJlQ==/109951163410830065.jpg?param=140y140'
         },
         {
            id: 0, likes: '16万',
            content: '日系无前奏丨几秒内所带来的惊艳',
            pic: 'http://p1.music.126.net/UaBSOq0LbXHkS_G7l6xCgg==/18735678139514783.jpg?param=140y140'
         },
         {
            id: 0, likes: '1104万',
            content: '『震撼心灵的史诗音乐』',
            pic: 'http://p1.music.126.net/C4F_cFkqS6u_7x6hJKursQ==/7812030116003837.jpg?param=140y140'
         },
         {
            id: 0, likes: '74万',
            content: '那些为电音画龙点睛的惊艳女Vocals',
            pic: 'http://p1.music.126.net/8FApbXtB5Tk7MjPSDFJuKQ==/109951163168405697.jpg?param=140y140'
         },
         {
            id: 0, likes: '11万',
            content: '毛不易《平凡的一天》：人生苦短，我愿用一切交换。',
            pic: 'http://p1.music.126.net/4GSGFDKgqTLEsWR8UwYE1A==/109951163405538342.jpg?param=140y140'
         },
         {
            id: 0, likes: '65万',
            content: '【特辑】余秀华领衔：不盲从 我有我的独立态度',
            pic: 'http://p1.music.126.net/Gu1v2tVXW9ukZ0EiEcmKuw==/109951163405273550.jpg?param=140y140'
         },

      ];
      var data1 = [
         {
            likes: '5万',
            content: '〖日系〗骑行少年与元气摇滚',
            pic: 'http://p1.music.126.net/sRbsvGKoOel-7lMQl4Moig==/109951163399596872.jpg?param=140y140'
         },
         {
            likes: '16万',
            content: '华语唱作人|才华横溢文武双全',
            pic: 'http://p1.music.126.net/T7P8hvtC2QNje88Ur5dfEw==/18614731860453500.jpg?param=140y140'
         },
         {
            likes: '22万',
            content: 'DJ Snake Radio',
            pic: 'http://p1.music.126.net/nMRjEaAJ6kf4t5n-E-NWPA==/109951163403259562.jpg?param=140y140'
         },
         {
            likes: '9万',
            content: '愿对方安好，愿你可以放下',
            pic: 'http://p1.music.126.net/l891nAHJaQQNUXPYgDsjEg==/109951163410028044.jpg?param=140y140'
         },
         {
            likes: '66万',
            content: '“甜蜜的事情有一大半都发生在夏天”',
            pic: 'http://p1.music.126.net/duEGdGbhHbsihRvG4jhd9A==/109951163398515275.jpg?param=140y140'
         },
         {
            likes: '83万',
            content: '最新神曲合集，这个夏天就靠它们过了！',
            pic: 'http://p1.music.126.net/VVHU6FzAisT1JAtlPdwdCQ==/18738976674416019.jpg?param=140y140'
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
         likeId: [],
         data,
         data1,
         data2
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
         <div className="Find">

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


            <div className="find_title flex-row-center">
               <div className="flex-c-center"
               >
                  <img src={require('../img/FM.png')} alt=""/>
                  <span>私人FM</span>
               </div>
               <div className="flex-c-center"
                    onClick={() => {
                       this.props.history.push("/RecommendPage");
                    }}>
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

            <div className="FindPage">
               <ListView className="list-view-x" data={this.state.data}
                         renderItem={(position, item) => {
                            return (

                               <div className="recommend_song">
                                  <div className="flex-c-center">
                                     <img src={item.pic} alt=""/>
                                     <span>{item.content}</span>

                                     <div className="number">
                                        <em><img src={require('../img/zh.png')} alt=""/></em>
                                        <em>{item.likes}</em>
                                     </div>
                                  </div>
                               </div>

                            )
                         }}/>

            </div>
            <div className="recommend flex-row-center">
               <p style={{color: '#EB9B9D'}}>会员专区</p>
               <img src={require('../img/huiyuan.png')} alt="" style={{width: '3.5%'}}/>
            </div>

            <div className="FindPage">
               <ListView className="list-view-x" data={this.state.data1}
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
                               </div>
                            )
                         }}/>
            </div>
         </div>
      )
   }
}

let mapStateToProps = (state) => {
   return {}
};
let mapDispatchToProps = (dispatch) => {
   return {}
};
FindPage = component(mapStateToProps, mapDispatchToProps, FindPage);
export default FindPage;