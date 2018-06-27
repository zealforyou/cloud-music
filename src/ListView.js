import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ListView extends Component {
   constructor() {
      super();
   }

   _renderItem(position, item) {
      return <li onClick={(e)=>{
         if(this.props.onItemClick){
         this.props.onItemClick(position,item);
      }
      }} ref={"listViewItem"+position} style={{listStyleType:"none"}}>{ this.props.renderItem(position, item)}</li>;
   }

   componentDidMount() {
      let _this=this;
   }
   render() {
      var views = [];
      for (var i = 0; i < this.props.data.length; i++) {
         views.push(this._renderItem(i,this.props.data[i]));
      }
      return (
         <ul style={{margin:0,padding:0,...this.props.style}}>
            {views}
         </ul>
      )
   }
}
ListView.propTypes = {
   data: PropTypes.array,
   renderItem: PropTypes.func
};