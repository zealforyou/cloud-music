import React, {Component} from 'react';
import './css/SearchPage.scss'

export default class SearchPage extends Component {
   constructor() {
      super();
   }

   render() {
      return (
         <div className='SearchPage'>
            <div className='title'>
               <img className='first-child' src={require('../img/ic_left.png')} onClick={()=>{
                  this.props.history.goBack();
               }}/>
               <div className='input-div'>
                  <input placeholder='给你推荐 暧昧'/>
                  <img src={require('../img/pf.png')}
                  onClick={()=>{
                     this.props.history.push('/SearchPageIner');
                  }}/>
               </div>
            </div>
            <div className='flex-row-center singer'>
               <img src={require('../img/ah2.png')}/>
               <span>歌手分类</span>
               <img src={require('../img/a2u.png')}/>
            </div>
            <div style={{paddingLeft: '15px'}}>
               <div style={{fontSize: '12px', color: '#aaa', marginTop: '40px'}}>热门搜索</div>
               <div className='flow-contain'>
                  <div className='flow-item'>123我爱你</div>
                  <div className='flow-item'>心跳</div>
                  <div className='flow-item'>Closer</div>
                  <div className='flow-item'>爸爸妈妈</div>
                  <div className='flow-item'>那就这样吧</div>
                  <div className='flow-item'>Something just like this</div>
                  <div className='flow-item'>全部都是你</div>
                  <div className='flow-item'>野子</div>
                  <div className='flow-item'>Starry Starry Night</div>
                  <div className='flow-item'>你就不要想起我</div>
               </div>
            </div>

         </div>
      )
   }
}