import React, {Component} from 'react';
import './css/CommentPage.scss';
import ListView from "../ListView";
import ImgBtn from "../ImgButton";

export default class CommentPage extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {
      var data=[
         {
            title: 'CITTE', likes: 520, time: '2017年4月16日',
            content: '即将达成网易云第一首没有资源的评论最快999+歌曲'
         },
         {
            title: 'CITTE', likes: 520, time: '2017年4月16日',
            content: '即将达成网易云第一首没有资源的评论最快999+歌曲'
         },
         {
            title: 'CITTE', likes: 520, time: '2017年4月16日',
            content: '即将达成网易云第一首没有资源的评论最快999+歌曲'
         },
      ];
      this.setState({
         likeId:[],
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
            <div className="header">
                  <span onClick={() => {
                     this.props.history.goBack();
                  }}>
                     <img src={require('../img/ic_left.png')} alt=""/>

                  </span>
               <span>评论(67364753)</span>
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
                     <div className='flex-row-center'>
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
                                  <div className='avatar'><img src={require('../img/bt_girl.jpg')} alt=""/></div>
                                  <div className="test_one flex-c" style={{flexGrow: 1}}>
                                     <div className="flex-row"
                                          style={{width: '100%', marginBottom: '2px', justifyContent: "space-between"}}>
                                 <span className="comm_left flex-c">
                                    <em>{item.title}</em>
                                    <em>{item.time}</em>
                                 </span>
                                        <span className="comm_rigth">
                                    <em style={{color:isInArray(this.state.likeId,position)?"red":'#98999A'}}>{item.likes}</em>

                                    <ImgBtn  drawable={{
                                       src: [require('../img/note_btn_praise_white.png'),
                                          require('../img/note_btn_praised.png')],
                                       press: [require('../img/note_btn_praise_white.png'),
                                          require('../img/note_btn_praised.png')]
                                    }} style={{display:'inline'}}
                                       onCheckChanged={(selected)=>{
                                             let likeId=this.state.likeId;
                                             if(selected){
                                                item.likes++;
                                                likeId.push(likeId);
                                                this.setState({
                                                   likeId
                                                });
                                             }else {
                                                item.likes--;
                                                let id;
                                                for(let i in likeId){
                                                  if( likeId[i]===position){
                                                     id=i;
                                                  }
                                                }
                                                delete likeId[id];
                                                this.setState({
                                                   likeId
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
                     <input type="text" placeholder="随乐而起，有感而发"/>
                     <img src={require('../img/a9r.png')} alt="" style={{marginLeft: '-26px'}}/>
                  </span>
                  <span>发送</span>
               </div>
            </div>

         </div>

      )
   }
}
function isInArray(arr,value){
   for(let i = 0; i < arr.length; i++){
      if(value === arr[i]){
         return true;
      }
   }
   return false;
}