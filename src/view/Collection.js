import React, {Component} from 'react';
import './Collection.scss';
import '../page/css/SearchPage.scss'

export default class Collection extends Component {
   constructor() {
      super();
   }

   //组件即将挂载
   componentWillMount() {

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
         <div className="Collection SearchPage">
            <div className='title app-title'>
               <img className='first-child' src={require('../img/ic_left.png')} onClick={()=>{
                  this.props.history.goBack();
               }}/>
               <div className='input-div'>
                  <input placeholder={'给你推荐 '+this.defaultValue} onInput={(e)=>{
                     this.setState({keyword:e.currentTarget.value});
                  }}/>
                  <img src={require('../img/pf.png')}
                       onClick={()=>{
                          let path={
                             pathname:'/SearchPageIner',
                             query:{
                                keyword:this.state.keyword?this.state.keyword:this.defaultValue
                             }
                          };
                          this.props.history.push(path);
                       }}/>
               </div>
            </div>


            <div className="mask"></div>
            <div className="modal">
               <p>歌曲：Please Don't Go</p>
                  <div className="page_list">
                     <div className="flex-row-center item">
                        <img src={require('../img/next.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>下一首播放</span>
                        </div>
                     </div>
                     <div className="flex-row-center item">
                        <img src={require('../img/shoucang.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>收藏到歌单</span>
                        </div>
                     </div>
                     <div className="flex-row-center item">
                        <img src={require('../img/xiazai.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>下载</span>
                        </div>
                     </div>
                     <div className="flex-row-center item">
                        <img src={require('../img/pinglun.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>评论</span>
                           <em>(124922)</em>
                        </div>
                     </div>
                     <div className="flex-row-center item">
                        <img src={require('../img/fenxiang.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>分享</span>
                        </div>
                     </div>
                     <div className="flex-row-center item">
                        <img src={require('../img/a0n.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>歌手：</span>
                           <em>Joel Adams</em>
                        </div>
                     </div>
                     <div className="flex-row-center item">
                        <img src={require('../img/a1l.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>专辑：</span>
                           <em>Please Don't Go</em>
                        </div>
                     </div>
                     <div className="flex-row-center item">
                        <img src={require('../img/a1n.png')} alt=""/>
                        <div className='flex-row-center'>
                           <span>查看视频</span>
                        </div>
                     </div>


                  </div>
            </div>
         </div>
      )
   }
}