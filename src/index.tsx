import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'todomvc-app-css/index.css';

import { make as makeStore } from './store';
import { make as makeApi } from './store/api';
import { App } from './components/App';

const API_ROOT = '//localhost:3001/api/tasks';
const store = makeStore(makeApi(API_ROOT));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
