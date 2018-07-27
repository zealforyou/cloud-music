import React, {Component} from 'react';
import {localManager} from "../utils/LocalManager";
import MenuTab from "../view/MenuTab";
import "../view/MenuTab.scss";
import "./css/Mypage.scss";
import "./css/FindPage.scss";
import {Switch, Route} from 'react-router-dom';
import ListView from "../ListView";
import FindPage from "./FindPage";
import Mypage from "./Mypage";
import RadioStation from "./RadioStation";
import {component} from "../utils/ZUtil";
import {albumActionType} from "../reducer/AlbumState";
import {actionType as globalType, actionType} from "../reducer/globalState";
import * as baseUrl from "../config/BaseUrl";


 class HomePage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      let phone = localManager.getPhone();
      this.setState({
         likeId: [],
         currentPage:1,
         loginDialog:!phone
      });
      if (phone){
         this._getAlbumList();
      }
   }

   //组件已经挂载
   componentDidMount() {
      this.props.setShowPlay(true);
   }

   //组件即将销毁
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
   //渲染
   render() {
      return (
         <div className="Mypage">
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
               <MenuTab selectItem={1} menus={[{title: '发现'}, {title: '我的'}, {title: '电台'}]}
                        itemClick={(index) => {
                           this.setState({currentPage:index})
                        }}/></div>
            {
               this.switchPage(this.state.currentPage)
            }
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

   switchPage(index) {
      switch (index) {
         case 0:
            return <FindPage  history={this.props.history}/>;
         case 1:
            return <Mypage  history={this.props.history}/>;
         case 2:
            return <RadioStation  history={this.props.history}/>
      }
      return '';
   }

}
const mapStateToProps = (state) => {
   return {
   }
};
const mapDispatchToProps = (dispatch) => {
   return {
      setShowPlay: (showPlay) => {
         dispatch({type: actionType.ACTION_SHOW_PLAY_CONTROLLER, showPlay});
      },
      showToast(content,onClick){
         dispatch({type: globalType.ACTION_SHOW_TOAST, toast:{left:"取消",content,onClick}});
      },
      setAlbumData(data) {
         dispatch({type: albumActionType.SET_DATA, data});
      }
   }
};
HomePage = component(mapStateToProps, mapDispatchToProps,HomePage);
export default HomePage