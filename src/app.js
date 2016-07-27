import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routeur from './router';

ReactDOM.render(
  <Provider store={store}>{Routeur}</Provider>,
  document.getElementById("content")
)