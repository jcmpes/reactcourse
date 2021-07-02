import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../../../store/actions';
import LoginForm from './LoginForm';

const history = useHistory();
const location = useLocation();

function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = credentials => {
    dispatch(loginAction(credentials, history, location))
  }

  return (
    <LoginForm onSubmit={handleSubmit}/>
  )
}

export default LoginPage;