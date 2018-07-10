import React, {Component} from 'react';
import './css/SearchPage.scss'
import {connect} from 'react-redux';
import {actionType} from "../reducer/globalState";
import * as baseUrl from "../config/BaseUrl";

class SearchPage extends Component {
   constructor() {
      super();
   }

   defaultValue = "全部都是你";

   componentWillMount() {
      this.setState({keywords: []});
   }

   componentDidMount() {
      this.props.setShowPlay(true);
      this._fetchKeywords();
   }

   componentWillUnmount() {
      this.props.setShowPlay(false);
   }

   _fetchKeywords() {
      let url = baseUrl.base + "system/getHostSearch";
      let _this = this;
      fetch(url).then((res) => {
         return res.json();
      }).then((res) => {
         if (res.error_code !== 1) {
            _this.setState({keywords: res});
         }
      }).catch((e) => {

      })
   }

   render() {
      let _this=this;
      let items = this.state.keywords.map(function (item) {
         return (<div className='flow-item' onClick={() => {
            let path = {
               pathname: '/SearchPageIner',
               query: {
                  keyword: item.keyword
               }
            };
            _this.props.history.push(path);
         }}>
            {item.keyword}
         </div>)
      });
      return (
         <div className='SearchPage'>
            <div className='title app-title'>
               <img className='first-child' src={require('../img/ic_left.png')} onClick={() => {
                  this.props.history.goBack();
               }}/>
               <div className='input-div'>
                  <input placeholder={'给你推荐 ' + this.defaultValue} onInput={(e) => {
                     this.setState({keyword: e.currentTarget.value});
                  }}/>
                  <img src={require('../img/pf.png')}
                       onClick={() => {
                          let path = {
                             pathname: '/SearchPageIner',
                             query: {
                                keyword: this.state.keyword ? this.state.keyword : this.defaultValue
                             }
                          };
                          this.props.history.push(path);
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
                  {items}
               </div>
            </div>

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
SearchPage = connect(null, mapDispatchToProps)(SearchPage);
export default SearchPage