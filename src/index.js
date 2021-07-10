import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureClient } from './api/client';
import { whoAmI } from './api/auth';
import configureStore from './store';
import storage from './utils/storage';

const accessToken = storage.get('auth');
configureClient({ accessToken });

const preState = {
  preloadedState: {
    auth: {
      isLogged: !!accessToken,
      username: null,
    },
    // history,
  },
};

if (!!accessToken)
  whoAmI().then((data) => {
    preState.preloadedState.auth.username = data;
    const store = configureStore(preState);
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
      document.getElementById('root'),
    );
  });
else {
  const store = configureStore(preState);
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
