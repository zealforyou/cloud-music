import React, {Component} from 'react';
import data from "../MusicList";
import ListView from "../ListView";

export default class SearchPageIner extends Component {
   constructor() {
      super();
   }

   render() {
      return (
         <div className='SearchPage'>
            <div className='title'>
               <img className='first-child' src={require('../img/ic_left.png')} onClick={() => {
                  this.props.history.goBack();
               }}/>
               <div className='input-div'>
                  <input placeholder='给你推荐 暧昧'/>
                  <img src={require('../img/ou.png')}
                       onClick={() => {
                       }}/>
               </div>
            </div>
            <div style={{marginTop: '50px'}}></div>
            <ListView data={data}
                      onItemClick={() => {
                      }}
                      style={{paddingBottom: "3rem", backgroundColor: "#f6f6f6"}}
                      renderItem={(position, item) => {
                         return (
                            <div className='flex-row-center list-item'>
                               <span style={{color: "#888888"}}>{position + 1}</span>
                               <div className='flex-row-center item-right'>
                                  <div className='flex-c' style={{flexGrow: 1}}>
                                     <span>{item.name ? item.name : "歌曲名"}</span>
                                     <div className='flex-row-center' style={{marginTop: '6px'}}>
                                        <img src={require('../img/a3n.png')} style={{width: '15px', marginRight: '5px'}}/>
                                        <span style={{
                                           color: "#888888",
                                           fontSize: "13px"
                                        }}>{item.author ? item.author : "演唱者"}</span>
                                     </div>

                                  </div>
                                  <img src={require('../img/a_2.png')} style={{width: '20px', marginRight: '10px'}}/>
                                  <img src={require('../img/a3c.png')} style={{width: '15px'}}/>
                               </div>

                            </div>
                         )
                      }}/>
         </div>
      )
   }
}