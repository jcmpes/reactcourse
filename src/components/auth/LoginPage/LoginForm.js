import React from 'react';
import { Button, FormField } from "../../shared";

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
  });

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(credentials)
  };

  const handleChange = ev => {
    const newCredentials = {
      ...credentials,
      [ev.target.name]: ev.target.value,
    }
    setCredentials(newCredentials);
  };

  const { username, password } = credentials;

  return (
    <div className="loginForm">
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField 
          type="text"
          label="email or username: "
          name="username"
          value={username}
          onChange={handleChange}
        />
        <FormField
          type="password"
          label="password: "
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={!username | !password}
        >
          Log In
        </Button>
      </form>
    </div>
  )
}

export default LoginForm;