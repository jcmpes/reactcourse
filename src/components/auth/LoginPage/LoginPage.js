import React from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../store/actions';
import LoginForm from './LoginForm';

function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = credentials => {
    dispatch(loginAction(credentials))
  }

  return (
    <LoginForm onSubmit={handleSubmit}/>
  )
}

export default LoginPage;