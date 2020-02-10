import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';

ReactDOM.render(< App />, document.getElementById('root'));

/* Add routes here  */
serviceWorker.unregister();