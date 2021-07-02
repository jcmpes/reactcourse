import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureClient } from './api/client';
import configureStore from './store';

const accessToken = localStorage.get('auth');
configureClient({ accessToken });

const store = configureStore({
  preloadedState: { auth: !!accessToken },
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App store={store} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
