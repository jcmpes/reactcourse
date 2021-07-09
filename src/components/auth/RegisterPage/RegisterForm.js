import React, { useState } from 'react';
import { FormField, Button } from '../../shared';

const RegisterForm = ({ onSubmit }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password === passwordConfirm) {
      onSubmit(credentials);
    } else {
      // TODO: Throw message: 'Password must be the same'
    }
  };

  const handleChange = (ev) => {
    if (ev.target.name === 'password-confirm') {
      setPasswordConfirm(ev.target.value);
    } else {
      setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    }
  };

  const { email, password, username } = credentials;

  const disabledButton =
    !email | !password | !username | (password !== passwordConfirm);

  return (
    <div className="registerForm">
      <form className="registerForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          label="username: "
          name="username"
          value={username}
          onChange={handleChange}
        />
        <FormField
          type="email"
          label="email: "
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormField
          type="password"
          label="password: "
          name="password"
          value={password}
          onChange={handleChange}
        />
        <FormField
          type="password"
          label="confirm password: "
          name="password-confirm"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <Button type="submit" disabled={disabledButton}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
