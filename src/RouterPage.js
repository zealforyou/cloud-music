import React, {Component} from 'react';
import App from "./App";
import CommentPage from "./page/CommentPage";
import Page2 from "./Page2";
import {Switch, Route} from 'react-router-dom';
import MusicPage from "./MusicPage";

export default class RouterPage extends Component {
   constructor() {
      super();
   }

   render() {
      return (
         <div>
            <Switch>
               <Route exact path="/" component={App}/>
               <Route exact path="/Page2" component={Page2}/>
               <Route exact path="/CommentPage" component={CommentPage}/>
            </Switch>
            <MusicPage/>
         </div>

      )
   }
}