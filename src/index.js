import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SwitchPage from './SwitchPage';
import registerServiceWorker from './registerServiceWorker';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import reducers from './reducer/reducers';

const history = createHistory();
const middleware = routerMiddleware(history);
const combReducer=combineReducers({
   ...reducers,
   router: routerReducer
});
const store = createStore(combReducer, applyMiddleware(middleware));


ReactDOM.render((
   <Provider store={store}>
      <ConnectedRouter history={history}>
         <SwitchPage/>
      </ConnectedRouter>
   </Provider>
), document.getElementById('root'));

registerServiceWorker();
