import React from 'react';
import LoginForm from './LoginForm';

function LoginPage() {
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
  });
  
  return (
    <LoginForm />
  )
}

export default LoginPage;