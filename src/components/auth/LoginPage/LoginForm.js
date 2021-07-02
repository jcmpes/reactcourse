import React from 'react';
import FormField from "../../shared/FormField";

function LoginForm() {
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
  });

  const handleFormSubmit = ev => {

  }

  const handleChange = ev => {
    const newCredentials = {
      ...credentials,
      [ev.target.name]: ev.target.value,
    }
    setCredentials(newCredentials);
  }

  return (
    <div className="loginForm">
      <form className="loginForm">
        <FormField 
          type="text"
          label="email or username: "
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <FormField
          type="password"
          label="password: "
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default LoginForm;