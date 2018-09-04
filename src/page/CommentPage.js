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
               content: ""
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

   onCommentLike(position) {
      this.showLoading();
      let item = this.state.data[position];
      let comment_id = item.id;
      let _this = this;
      let url = baseUrl.base + "user/setCommentLike?phone=" + localManager.getPhone() + "&comment_id=" + comment_id;
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         _this.hideLoading();
         if (res.error_code === 0) {
            if (res.isLike === 0) {
               item.animation = "btnBig1 0.5s";
               item.isLike = 0;
               item.likeCount === +item.likeCount ? item.likeCount++ : item.likeCount = 1;
            } else {
               item.animation = "btnBig 0.5s";
               item.isLike = 1;
               item.likeCount === +item.likeCount ? item.likeCount-- : item.likeCount = 0;
            }
            this.setState({
               data: _this.state.data,
            });
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
      let url = baseUrl.base + "user/getComment?music_id=" + this.props.item.id + "&phone=" + localManager.getPhone();
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         _this.hideLoading();
         if (res.error_code === 0) {
            console.log(res.commentList);
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
                        <p className='text-single-line' style={{maxWidth:"75vw"}}>{this.props.item && this.props.item.name ? this.props.item.name : "未知"}</p>
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
                            let date = new Date(item.create_date);
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
                                    <em>{date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"}</em>
                                 </span>
                                        <span className="comm_rigth flex-row-center">
                                    <em
                                       style={{color: item.isLike === 0 ? "red" : '#98999A'}}>{item.likeCount}</em>

                                    <ImgBtn
                                       selected={item.isLike === 0}
                                       drawable={{
                                          src: [require('../img/aar.png'), require('../img/note_btn_praised.png')],
                                          press: [require('../img/aar.png'), require('../img/note_btn_praised.png')]
                                       }} style={{
                                       flexGrow: 'contain',
                                       display: 'inline',
                                       animation: item.animation
                                    }}
                                       onCheckChanged={(selected) => {
                                          this.onCommentLike(position);
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