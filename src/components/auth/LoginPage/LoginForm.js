import React from 'react';
import { Button, FormField, Checkbox } from '../../shared';

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (ev) => {
    setCredentials((oldCredentials) => ({
      ...oldCredentials,
      [ev.target.name]:
        ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(credentials);
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
        <Checkbox
          className={'checkbox'}
          name={'remember'}
          text={'Remember session'}
          type={'checkbox'}
          disabled={!credentials.email || !credentials.password}
          checked={credentials.remember}
          onChange={handleChange}
        />
        <Button type="submit" disabled={!email | !password}>
          Log In
        </Button>
        <div className="password-forgotten">
          <a href="/forgot-password">I forgot my password</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
