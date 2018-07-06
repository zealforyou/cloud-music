import React, {Component} from 'react';
import App from "./App";
import CommentPage from "./page/CommentPage";
import Page2 from "./Page2";
import {Switch, Route} from 'react-router-dom';
import MusicPage from "./MusicPage";
import SearchPage from "./page/SearchPage";
import SearchPageIner from "./page/SearchPageIner";
import Mypage from "./page/Mypage";
import Toast from "./view/Toast";
import Collection from "./view/Collection";

export default class RouterPage extends Component {
   constructor() {
      super();
   }

   render() {
      return (
         <div>
            <Switch>
               <Route exact path="/" component={Mypage}/>
               <Route path="*/Page2/:music" component={Page2}/>
               <Route exact path="/CommentPage" component={CommentPage}/>
               <Route exact path="/SearchPage" component={SearchPage}/>
               <Route exact path="/SearchPageIner" component={SearchPageIner}/>
               <Route exact path="/App" component={App}/>
               {/*<Route exact path="/App" component={Collection}/>*/}
            </Switch>
            <MusicPage history={this.props.history}/>
            <Toast/>
         </div>

      )
   }
}