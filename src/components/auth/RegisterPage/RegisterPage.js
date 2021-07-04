import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { registerAction } from '../../../store/actions';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(registerAction(credentials, history, location));
  };

  return <RegisterForm onSubmit={handleSubmit} />;
};

export default RegisterPage;
