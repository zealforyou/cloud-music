import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import Page2 from './Page2';

export default class SwitchPage extends Component {
   constructor() {
      super();
   }

   render() {
      return (
         <div>
            <audio id="music">
               亲 您的浏览器不支持html5的audio标签
            </audio>
            <Switch>
               <Route exact path="/" component={App}/>
               <Route exact path="/Page2" component={Page2}/>
            </Switch>
         </div>
      )
   }
}