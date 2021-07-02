import React from 'react';
import { Button, FormField } from "../../shared";

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = React.useState({
    email: '',
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

  const { email, password } = credentials;

  return (
    <div className="loginForm">
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField 
          type="text"
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
        <Button
          type="submit"
          disabled={!email | !password}
        >
          Log In
        </Button>
      </form>
    </div>
  )
}

export default LoginForm;