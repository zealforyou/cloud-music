import React, {Component} from 'react';
import {localManager} from "../utils/LocalManager";
import MenuTab from "../view/MenuTab";
import "../view/MenuTab.scss";
import "./css/RadioStation.scss";
import "./css/Mypage.scss";
import ListView from "../ListView";
import {actionType as globalType, actionType} from "../reducer/globalState";
import {component} from "../utils/ZUtil";
import {albumActionType} from "../reducer/AlbumState";

class RadioStation extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.props.setShowPlay(true);
      var data = [
         {
            pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1241090614,1586339867&fm=27&gp=0.jpg',
            title: '阿里铁军销售实战秘笈',
            content: '你离高收入只差一套靠谱的方法',
            explain: '初次见面的6-分钟，做对了就能当场签约',
            money: 79, time: '07月16日',
         },
         {
            pic: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1238871875,1707086016&fm=27&gp=0.jpg',
            title: '刘雪枫 古典音乐怎么用',
            content: '100个生活场景的音乐解决方案',
            explain: '乐曲纯享|勃拉姆斯《间奏曲op.118-2》',
            money: 98, time: '07月16日',
         },
         {
            pic: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=155021805,2616215770&fm=27&gp=0.jpg',
            title: '阿里铁军销售实战秘笈',
            content: '你离高收入只差一套靠谱的方法',
            explain: '初次见面的6-分钟，做对了就能当场签约',
            money: 59, time: '07月16日',
         },
         {
            pic: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2941537821,91652186&fm=27&gp=0.jpg',
            title: '阿里铁军销售实战秘笈',
            content: '你离高收入只差一套靠谱的方法',
            explain: '初次见面的6-分钟，做对了就能当场签约',
            money: 105, time: '07月16日',
         },
         {
            pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=545245121,1021087145&fm=27&gp=0.jpg',
            title: '阿里铁军销售实战秘笈',
            content: '你离高收入只差一套靠谱的方法',
            explain: '初次见面的6-分钟，做对了就能当场签约',
            money: 89, time: '07月16日',
         },
         {
            pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3272699629,2997225522&fm=27&gp=0.jpg',
            title: '阿里铁军销售实战秘笈',
            content: '你离高收入只差一套靠谱的方法',
            explain: '初次见面的6-分钟，做对了就能当场签约',
            money: 112, time: '07月16日',
         },
         {
            pic: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3019593476,1807650631&fm=27&gp=0.jpg',
            title: '阿里铁军销售实战秘笈',
            content: '你离高收入只差一套靠谱的方法',
            explain: '初次见面的6-分钟，做对了就能当场签约',
            money: 70, time: '07月16日',
         },

      ];
      this.setState({
         data,
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
            <div className="swiper"></div>

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


