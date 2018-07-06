import React, {Component} from 'react';
import './css/CommentPage.scss';
import ListView from "../ListView";
import ImgBtn from "../ImgButton";
import {pics}from '../config/Resource';
import {Title}from '../config/Resource';
export default class CommentPage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      var data = [
         {
            id: 0, title: 'CITTE', likes:910, time: '2017年4月16日',
            content: '我喜欢我望向别处时你落在我身上的目光',
            pic:'http://img4.imgtn.bdimg.com/it/u=3036919756,557540970&fm=27&gp=0.jpg'
         },
         {
            id: 1, title: '傻傻傻傻了', likes: 610, time: '2017年4月16日',
            content: '当你觉得孤独无助时，想一想还有十几亿的细胞只为了你一个人而活',
            pic:'http://i-2.497.com/2016/4/26/8af29e76-d8bb-4bbf-b917-01e3d50d7ead.jpg'
         },
         {
            id: 2, title: '小小强King', likes:599, time: '2017年4月16日',
            content: '小时候刮奖刮出“谢”字还不扔，非要把“谢谢惠顾”都刮的干干净净才舍得放手，和后来太多的事一模一样。',
            pic:'http://img0.imgtn.bdimg.com/it/u=3802209446,1934862206&fm=27&gp=0.jpg'
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
         <div className='Comment'>
            <div className="header app-title">
                  <span onClick={() => {
                     this.props.history.goBack();
                  }}>
                     <img src={require('../img/ic_left.png')} alt=""/>

                  </span>
               <span>评论(5465)</span>
            </div>

            <div className="comm_conter">
               <div className="box">
                  <ul className="clearfix">
                     <li><img src={require('../img/comm_hear.png')}/></li>
                     <li>
                        <p>The Cure</p>
                        <p>Lady Gaga</p>
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
                                  <div className='avatar'><img src={item.pic?item.pic:require('../img/bt_girl.jpg')} alt=""/></div>
                                  <div className="test_one flex-c" style={{flexGrow: 1}}>
                                     <div className="flex-row"
                                          style={{width: '100%', marginBottom: '2px', justifyContent: "space-between"}}>
                                 <span className="comm_left flex-c">
                                    <em>{item.title}</em>
                                    <em>{item.time}</em>
                                 </span>
                                 <span className="comm_rigth flex-row-center">
                                    <em style={{color: isInArray(this.state.likeId, item.id) ? "red" : '#98999A'}}>{item.likes}</em>

                                    <ImgBtn
                                       selected={isInArray(this.state.likeId, item.id)}
                                       drawable={{
                                          src: [require('../img/aar.png'),
                                             require('../img/note_btn_praised.png')],
                                          press: [require('../img/aar.png'),
                                             require('../img/note_btn_praised.png')]
                                       }} style={{
                                          flexGrow:'contain',
                                       display: 'inline',
                                       animation: isInArray(this.state.likeId, item.id) ? this.state.animation : 'none'
                                    }}
                                       onCheckChanged={(selected) => {
                                          let likeId = this.state.likeId;
                                          if (selected) {
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
                  <span onClick={() => {
                     if (!this.state.content) {
                        return;
                     }
                     let ct = new Date();
                     ct = `${ct.getFullYear()}年${ct.getMonth() + 1}月${ct.getDate()}日`;

                     let newObj = Object.assign({}, this.state.data[0], {
                        id: Math.random() * 900000 + 100000,
                        content: this.state.content,
                        time: ct,
                        likes: 0,
                        pic:pics[parseInt(this.state.data.length%Title.length)],
                        title:Title[parseInt(Math.random()*Title.length)]
                     });
                     this.state.data.unshift(newObj);
                     this.setState({data: this.state.data, content: ''});
                     window.scrollTo(0,0);
                  }}>发送</span>
               </div>
            </div>

         </div>

      )
   }
}

function isInArray(arr, value) {
   for (let i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
         return true;
      }
   }
   return false;
}