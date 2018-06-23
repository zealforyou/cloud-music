import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class ImgBtn extends Component {
   constructor() {
      super();
   }

   componentWillMount() {
      let drawable = this.props.drawable;
      if (!(drawable.src instanceof Array)) {
         drawable.src = [drawable.src]
      }
      if (!(drawable.press instanceof Array)) {
         drawable.press = [drawable.press]
      }
      this.setState({
         src: this.props.selected ? drawable.src[1] : drawable.src[0],
         selected: this.props.selected ? this.props.selected : false
      });
   }
   componentWillReceiveProps(nextProps){
      let drawable = nextProps.drawable;
      if (!(drawable.src instanceof Array)) {
         drawable.src = [drawable.src]
      }
      if (!(drawable.press instanceof Array)) {
         drawable.press = [drawable.press]
      }
      this.setState({
         src: nextProps.selected ? drawable.src[1] : drawable.src[0],
         selected: nextProps.selected ? nextProps.selected : false
      });
   }
   render() {
      let {onCheckChanged, onClick, drawable, ...other} = this.props;
      if (!(drawable.src instanceof Array)) {
         drawable.src = [drawable.src]
      }
      if (!(drawable.press instanceof Array)) {
         drawable.press = [drawable.press]
      }
      return (
         <div className='ImgBtn' {...other}
              onTouchStart={(e) => {
                 this.setState({
                    src: this.state.selected ? drawable.press[1] : drawable.press[0]
                 });
              }}
              onTouchEnd={() => {
                 this.setState({
                    src: this.state.selected ? drawable.src[1] : drawable.src[0]
                 });
              }}
              onClick={(e) => {
                 if (onClick) {
                    onClick(e)
                 }
                 if (drawable.src.length < 2) return;
                 if (this.state.selected) {
                    this.setState({
                       src: drawable.src[0],
                       selected: false
                    });
                    onCheckChanged ? onCheckChanged(false) : false;
                 } else {
                    this.setState({
                       src: drawable.src[1],
                       selected: true
                    });
                    onCheckChanged ? onCheckChanged(true) : false;
                 }
              }}>
            <img src={this.state.src} style={Style.img}/>
            {this.props.children ? this.props.children : ''}
         </div>
      )
   }
}
ImgBtn.propTypes = {
   selected: PropTypes.bool,
   onCheckChanged: PropTypes.func,
   drawable:
      PropTypes.shape({
         press: PropTypes.string,
         src: PropTypes.string,
         select: PropTypes.string,
         unSelect: PropTypes.string
      })
}
;
const Style = {
   img: {
      width: '100%',
      height: '100%',
   }
};