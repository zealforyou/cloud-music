import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SwitchPage from './SwitchPage';
import {HashRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
   <HashRouter>
      <SwitchPage/>
   </HashRouter>
), document.getElementById('root'));
registerServiceWorker();
