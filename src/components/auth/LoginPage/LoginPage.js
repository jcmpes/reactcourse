import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loginAction } from '../../../store/actions';
import LoginForm from './LoginForm';

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials, history, location));
  };

  return (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default LoginPage;
