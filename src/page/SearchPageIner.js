import React, {Component} from 'react';
// import data from "../MusicList";
import ListView from "../ListView";
import {connect} from "react-redux";
import {actionType} from "../reducer/globalState";

class SearchPageIner extends Component {
   constructor() {
      super();
   }

   componentWillMount() {
      this.setState({
         inputValue: '',
         data: []
      });
   }

   componentDidMount() {
      var _this = this;
      this.props.setShowPlay(true);
      document.onkeydown = (e) => {
         if (e.keyCode === 13) {
            if (_this.state.inputValue) {
               _this._fetchData();
            }
         }
      }
   }

   _fetchData() {
      var _this = this;
      let url = `/api/v3/search/song?format=json&keyword=${this.state.inputValue}&page=1&pagesize=20&showtype=1`;
      fetch(url,{
         method: 'get',
         dataType: "json",
      }).then(function (res) {
         console.log(res);
         if (res && res.status === 1) {
            _this.setState({
               data: res.info
            });
         }
      }).catch(function (err) {

      });
   }

   componentWillUnmount() {
      this.props.setShowPlay(false);
      document.onkeydown = null;
   }

   render() {
      var _this = this;
      return (
         <div className='SearchPage'>
            <div className='title'>
               <img className='first-child' src={require('../img/ic_left.png')} onClick={() => {
                  this.props.history.goBack();
               }}/>
               <div className='input-div'>
                  <input placeholder='给你推荐 暧昧' value={this.state.inputValue}
                         onInput={(e) => {
                            let value = e.currentTarget.value;
                            _this.setState({
                               inputValue: value
                            });
                         }}/>
                  <img src={require('../img/ou.png')}
                       style={{display: this.state.inputValue ? "block" : 'none'}}
                       onClick={() => {
                          _this.setState({
                             inputValue: ''
                          });
                       }}
                  />
               </div>
            </div>
            <div style={{marginTop: '50px'}}></div>
            <ListView data={this.state.data}
                      onItemClick={() => {
                      }}
                      style={{paddingBottom: "3rem", backgroundColor: "#f6f6f6"}}
                      renderItem={(position, item) => {
                         return (
                            <div className='flex-row-center list-item'>
                               <span style={{color: "#888888"}}>{position + 1}</span>
                               <div className='flex-row-center item-right'>
                                  <div className='flex-c' style={{flexGrow: 1}}>
                                     <span>{item.songname ? item.songname : "歌曲名"}</span>
                                     <div className='flex-row-center' style={{marginTop: '6px'}}>
                                        <img src={require('../img/a3n.png')} style={{width: '15px', marginRight: '5px'}}/>
                                        <span style={{
                                           color: "#888888",
                                           fontSize: "13px"
                                        }}>{item.singername ? item.singername : "演唱者"}</span>
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

const mapDispatchToProps = (dispatch) => {
   return {
      setShowPlay: (showPlay) => {
         dispatch({type: actionType.ACTION_SHOW_PLAY_CONTROLLER, showPlay});
      }
   }
};
SearchPageIner = connect(null, mapDispatchToProps)(SearchPageIner);
export default SearchPageIner