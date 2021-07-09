import React from 'react';
import ProtoTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import TemporaryWelcomePage from './components/TemporaryWelcomePage';
import LoginPage from './components/auth/LoginPage';
import NotFoundPage from './api/NotFoundPage';
import RegisterPage from './components/auth/RegisterPage';
import { getIsLogged } from './store/selectors';
import { useSelector } from 'react-redux';

function App() {
  const isLogged = useSelector(getIsLogged);

  return (
    <Switch>
      <Route path="/login">
        {() => (isLogged ? <Redirect to="/" /> : <LoginPage />)}
      </Route>
      <Route exact path="/">
        <TemporaryWelcomePage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route exact path="/404">
        <NotFoundPage />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
}

App.propTypes = {
  isInitiallyLogged: ProtoTypes.bool,
};

App.defaultProps = {
  isInitiallyLogged: false,
};

export default App;
