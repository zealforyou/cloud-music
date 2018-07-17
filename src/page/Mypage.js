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
      let phone = localManager.getPhone();
      if (phone){
         this._getAlbumList();
      }
      this.setState({loginDialog:!phone});
   }

   componentDidMount() {
      this.props.setShowPlay(true);
   }

   componentWillUnmount() {
      this.props.setShowPlay(false);
   }

   loginClick(e) {
      if (!this.state.phone || this.state.phone.length < 11) {
         this.showToast("请输入正确的手机号");
         return;
      }
      if (!this.state.name) {
         this.showToast("请输入昵称");
         return;
      }
      this._register();
   }

   _getUser() {
      var _this=this;
      let url = baseUrl.base + "user/getUser?phone="+this.state.phone;
      this.showLoading();
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         localManager.setAvatar(res.avatar?res.avatar:'');
         this.hideLoading();
            _this.setState({
               name:res.user_name,
               avatar:res.avatar
            });
      }).catch((e) => {
         this.hideLoading();
      })
   }
   _register(){
      var _this=this;
      let url = baseUrl.base + `user/register?phone=${this.state.phone}&name=${this.state.name}`;
      this.showLoading();
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         _this.hideLoading();
         if (res.error_code===0){
            _this._go(res);
         } else {
            _this.props.showToast(res.error_msg)
         }
      }).catch((e) => {
         _this.hideLoading();
         _this.props.showToast("注册失败");
      })
   }
   _go(user){
      localManager.setName(user.user_name);
      localManager.setPhone(user.user_id);
      this.setState({loginDialog:false});
      this._getAlbumList();
   }
   _getAlbumList() {
      var _this = this;
      let url = baseUrl.base + "album/getList?phone="+localManager.getPhone();
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         _this.props.setAlbumData(res);
      }).catch(() => {
      })
   }


   phoneInput(e) {
      var _this=this;
      let phone = e.currentTarget.value;
      this.setState({phone},function () {
         if (phone.length===11){
            _this._getUser();
         }
      });

   }

   nameInput(e) {
    let name = e.currentTarget.value;
    this.setState({name});
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
            <div className='div_login' style={{display: this.state.loginDialog?'block':'none'}}>
               <div className='center'>
                  <img className='avatar' src={this.state.avatar?this.state.avatar:require('../img/bt_girl.jpg')}/>
                  <div className='input flex-c-center'>
                     <input placeholder='phone' type='tel' value={this.state.phone}
                            maxLength='11' onInput={this.phoneInput.bind(this)}/>
                     <input value={this.state.name} placeholder='name' style={{marginTop: '15px'}}
                            onInput={this.nameInput.bind(this)}/>
                  </div>
                  <strong className='btn-enter' onClick={this.loginClick.bind(this)}>
                     Go
                  </strong>
               </div>
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
      showToast(content,onClick){
         dispatch({type: globalType.ACTION_SHOW_TOAST, toast:{left:"取消",content,onClick}});
      }
   }
};
Mypage = component(mapStateToProps, mapDispatchToProps,Mypage);
export default Mypage