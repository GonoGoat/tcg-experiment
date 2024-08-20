import React from 'react';
import { createRoot } from 'react-dom/client';

import "./config"
import './index.css';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
/*import store from './Redux/Store'
import {Provider} from 'react-redux'
*/

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>
);

/*  <Provider store={store}>
    <Home/>
  </Provider>
  */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// <React.StrictMode>