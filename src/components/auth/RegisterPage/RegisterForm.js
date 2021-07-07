import React, { useState } from 'react';
import { FormField, Button } from '../../shared';

const RegisterForm = ({ onSubmit }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(credentials);
  };
  const handleChange = (ev) => {
    setCredentials((oldValues) => ({
      ...oldValues,
      [ev.target.name]: ev.target.value,
    }));
  };

  const { email, password, username } = credentials;

  return (
    <div className="registerForm">
      <form className="registerForm" onSubmit={handleSubmit}>
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
          type="text"
          label="username: "
          name="username"
          value={username}
          onChange={handleChange}
        />
        <Button type="submit" disabled={!email | !password | !username}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
