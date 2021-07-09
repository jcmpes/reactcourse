import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loginAction } from '../../../store/actions';
import LoginForm from './LoginForm';

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = async (credentials) => {
    dispatch(loginAction(credentials, history, location));
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default LoginPage;
