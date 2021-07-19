import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureClient } from './api/client';
import { loginWithToken } from './api/auth';
import configureStore from './store';
import storage from './utils/storage';

const accessToken = storage.get('auth');

const preState = {
  preloadedState: {
    auth: {
      isLogged: false,
      username: null,
      favs: [],
      loaded: false,
    },
    ui: {
      loading: false,
      error: null,
    },
    // history,
  },
};

if (!!accessToken) {
  loginWithToken(accessToken).then((data) => {
    if (!data.displayName) {
      storage.remove('auth');
    } else {
      configureClient({ accessToken });
      preState.preloadedState.auth.isLogged = true;
      preState.preloadedState.auth.username = data.displayName;
      preState.preloadedState.auth.favs = data.favs;
    }
  });
}
const store = configureStore(preState);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
