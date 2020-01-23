import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/index.css';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);