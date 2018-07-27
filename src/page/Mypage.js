import React, {Component} from 'react';
import "../view/MenuTab.scss";
import "./css/Mypage.scss";
import SongSheet from "../view/SongSheet";
import "../view/SongSheet.scss";
import {component} from "../utils/ZUtil";
import {actionType as globalType, actionType as globalActionType, actionType} from "../reducer/globalState";
import {albumActionType} from "../reducer/AlbumState";
import {localManager} from '../utils/LocalManager';

var baseUrl = require('../config/BaseUrl');

class Mypage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {


   }

   componentDidMount() {

   }

   componentWillUnmount() {

   }




   //渲染
   render() {
      return (
         <div className="Mypage">
            <div style={{paddingBottom: "50px", paddingTop: '110px'}}>
               <div className="page_list">
                  <div className="flex-row-center item">
                     <img src={require('../img/a1_.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>本地音乐</span>
                        <em>(2)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a1n.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>最近播放</span>
                        <em>(112)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a0t.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>下载管理</span>
                        <em>(0)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a1l.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>我的电台</span>
                        <em>(2)</em>
                     </div>
                  </div>
                  <div className="flex-row-center item">
                     <img src={require('../img/a0n.png')} alt=""/>
                     <div className='flex-row-center'>
                        <span>我的收藏</span>
                        <em>(23)</em>
                     </div>
                  </div>


               </div>
               <SongSheet
                  data={this.props.data}
                  onItemClick={(position, item) => {
                     let path = {
                        pathname: '/App',
                        query: {
                           album_id: item.id,
                           album_name:item.album_name
                        }
                     };
                     this.props.history.push(path);
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

   }
};
Mypage = component(mapStateToProps, mapDispatchToProps,Mypage);
export default Mypage