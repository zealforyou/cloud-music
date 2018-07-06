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
      this.setState({
         src: this.props.selected ? drawable.src[1] : drawable.src[0],
         selected: this.props.selected ? this.props.selected : false
      });
   }

   componentWillReceiveProps(nextProps) {
      let drawable = nextProps.drawable;
      let src;
      let selectSrc;
      if (drawable.src instanceof Array) {
         src = drawable.src[0];
         selectSrc = drawable.src.length > 1 ? drawable.src[1] : src;
      } else {
         selectSrc = src = drawable.src;
      }
      let selected=(typeof nextProps.selected)==='undefined'? this.state.selected :nextProps.selected;
      this.setState({
         src: selected ? selectSrc : src,
         selected:selected
      });

   }

   render() {
      let {onCheckChanged, clickable, onClick, drawable, ...other} = this.props;
      if ((typeof clickable) === 'undefined') {
         clickable = true;
      }
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
                 if (!clickable) return;
                 if (onClick) {
                    onClick(e)
                 }
                 if (drawable.src.length < 2) return;
                 if((typeof this.props.selected)==='undefined'){
                    if (this.state.selected) {
                       this.setState({
                          src: drawable.src[0],
                          selected: false
                       }, function () {
                          onCheckChanged ? onCheckChanged(false) : false;
                       });
                    } else {
                       this.setState({
                          src: drawable.src[1],
                          selected: true
                       }, function () {
                          onCheckChanged ? onCheckChanged(true) : false;
                       });
                    }
                 }else{
                    if (this.state.selected) {
                       this.setState({
                          src: drawable.src[1],
                          selected: true
                       });
                       onCheckChanged ? onCheckChanged(true) : true;
                    } else {
                       this.setState({
                          src: drawable.src[0],
                          selected: false
                       });
                       onCheckChanged ? onCheckChanged(false) : false;
                    }
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