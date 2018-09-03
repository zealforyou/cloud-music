import React, {Component} from 'react';
import './css/CommentPage.scss';
import ListView from "../ListView";
import ImgBtn from "../ImgButton";
import {pics} from '../config/Resource';
import {Title} from '../config/Resource';
import {component} from "../utils/ZUtil";
import * as baseUrl from "../config/BaseUrl";
import {localManager} from "../utils/LocalManager";

class CommentPage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      this.setState({
         likeId: [],
         data: []
      });
   }

   //组件已经挂载
   componentDidMount() {
      this._getComment();
   }

   //组件即将销毁
   componentWillUnmount() {

   }

   onComment(e) {
      if (!this.state.content || !this.props.item || !localManager.getPhone()) {
         return;
      }
      this.showLoading();
      let _this = this;
      let url = baseUrl.base + "user/setComment";
      fetch(url, {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            content: this.state.content, music_id: this.props.item.id,
            phone: localManager.getPhone()
         })
      }).then((res) => {
         return res.json();
      }).then((res) => {
         _this.hideLoading();
         if (res.error_code === 0) {
            _this.setState({
               content:""
            });
            _this._getComment();
            window.scrollTo(0, 0);
         } else {
            _this.showToast(res.error_msg);
         }

      }).catch((e) => {
         this.hideLoading();
      });
   }

   _getComment() {
      this.showLoading();
      let _this = this;
      let url = baseUrl.base + "user/getComment?music_id=" + this.props.item.id;
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         _this.hideLoading();
         if (res.error_code === 0) {
            _this.setState({data: res.commentList});
         } else {
            _this.showToast(res.error_msg);
         }

      }).catch((e) => {
         this.hideLoading();
      });
   }

   //渲染
   render() {
      return (
         <div className='Comment'>
            <div className="header app-title">
                  <span onClick={() => {
                     this.props.history.goBack();
                  }}>
                     <img src={require('../img/ic_left.png')} alt=""/>

                  </span>
               <span>评论({this.state.data.length})</span>
            </div>

            <div className="comm_conter">
               <div className="box">
                  <ul className="clearfix">
                     <li><img
                        src={this.props.item && this.props.item.pic ? this.props.item.pic : require('../img/comm_hear.png')}/>
                     </li>
                     <li>
                        <p>{this.props.item && this.props.item.name ? this.props.item.name : "未知"}</p>
                        <p>{this.props.item && this.props.item.author ? this.props.item.author : "未知"}</p>
                     </li>
                     <li><img src={require('../img/a2u.png')} alt=""/></li>
                  </ul>

               </div>
               <h1>精彩评论</h1>
               <div className="test flex-row">
                  <div><img src={require('../img/yk.png')} alt=""/></div>
                  <div className="test_one flex-c">
                     <div>相关专栏文章</div>
                     <div className='flex-row-center' style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #ECECEC'
                     }}>
                        <img src={require('../img/bt_girl.jpg')} alt=""/>
                        <div className='test_two flex-c' style={{justifyContent: 'space-between'}}>
                           <span>Lady Gaga: 你如此爱她，绝不仅仅因为她的音乐</span>
                           <span><em>by Tsausenjay</em> 阅读 <em>36.8</em>万</span>
                        </div>
                     </div>
                  </div>
               </div>
               <ListView data={this.state.data}
                         renderItem={(position, item) => {
                            return (
                               <div className="comm_box test flex-row">
                                  <div className='avatar'><img src={item.avatar ? item.avatar : require('../img/bt_girl.jpg')}
                                                               alt=""/>
                                  </div>
                                  <div className="test_one flex-c" style={{flexGrow: 1}}>
                                     <div className="flex-row"
                                          style={{width: '100%', marginBottom: '2px', justifyContent: "space-between"}}>
                                 <span className="comm_left flex-c">
                                    <em>{item.user_name}</em>
                                    <em>{item.create_date}</em>
                                 </span>
                                        <span className="comm_rigth flex-row-center">
                                    <em
                                       style={{color: isInArray(this.state.likeId, item.id) ? "red" : '#98999A'}}>{item.likes}</em>

                                    <ImgBtn
                                       selected={isInArray(this.state.likeId, item.id)}
                                       drawable={{
                                          src: [require('../img/aar.png'), require('../img/note_btn_praised.png')],
                                          press: [require('../img/aar.png'), require('../img/note_btn_praised.png')]
                                       }} style={{
                                       flexGrow: 'contain',
                                       display: 'inline',
                                       animation: isInArray(this.state.likeId, item.id) ? this.state.animation : 'none'
                                    }}
                                       onCheckChanged={(selected) => {
                                          let likeId = this.state.likeId;
                                          let isLike = isInArray(likeId, item.id);
                                          if (!isLike) {
                                             item.likes++;
                                             likeId.push(item.id);
                                             this.setState({
                                                likeId,
                                                animation: `${selected ? "btnBig" : "btnBig1"} 0.5s`
                                             });
                                          } else {
                                             item.likes--;
                                             let index;
                                             for (let i in likeId) {
                                                if (likeId[i] === item.id) {
                                                   index = i;
                                                }
                                             }
                                             delete likeId[index];
                                             this.setState({
                                                likeId,
                                             });
                                          }
                                       }}
                                    />
                                 </span>
                                     </div>
                                     <div className="words">{item.content}</div>
                                  </div>
                               </div>
                            )
                         }}/>

               <div className="comm_footer flex-row" style={{justifyContent: "space-between"}}>
                  <span style={{flexGrow: 1}}>
                     <img src={require('../img/pen.png')} alt=""/>
                     <input type="text" value={this.state.content} placeholder="随乐而起，有感而发" onInput={(res) => {
                        var content = res.currentTarget.value;
                        this.setState({
                           content: content
                        });
                     }}/>
                     <img src={require('../img/a9r.png')} alt="" style={{marginLeft: '-26px'}}/>
                  </span>
                  <span onClick={this.onComment.bind(this)}>发送</span>
               </div>
            </div>

         </div>

      )
   }
}

const mapStateToProps = (state) => {
   return {
      item: state.appState.item,
   }
};
const mapDispToProps = () => {
   return {}
};

CommentPage = component(mapStateToProps, mapDispToProps, CommentPage);
export default CommentPage;

function isInArray(arr, value) {
   for (let i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
         return true;
      }
   }
   return false;
}