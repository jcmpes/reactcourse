import React, { useState } from 'react';
import { FormField, Button } from '../../shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const eye = <FontAwesomeIcon style={{ width: '20px'}} icon={faEye} />;
const eyeSlash = <FontAwesomeIcon style={{ width: '20px'}} icon={faEyeSlash} />;

const RegisterForm = ({ onSubmit }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password === passwordConfirm) {
      onSubmit(credentials, password, passwordConfirm);
    } else {
      toast.error('Passwords should match');
    }
  };

  const handleChange = (ev) => {
    if (ev.target.name === 'password-confirm') {
      setPasswordConfirm(ev.target.value);
    } else {
      setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  
  const { email, password, username } = credentials;

  const disabledButton =
    !email | !password | !username | !password | !passwordConfirm;

  return (
    <div className="registerForm">
      <form className="registerForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          label={('username') + ': '}
          name="username"
          value={username}
          onChange={handleChange}
        />
        <FormField
          type="email"
          label={('email') + ': '}
          name="email"
          value={email}
          onChange={handleChange}
        />
        <div className="pwd-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            label={('password')}
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="pwd-confirm-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            label={('confirm password') + ': '}
            name="password-confirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
          {passwordShown ? (
            <i onClick={togglePasswordVisiblity}>{eyeSlash}</i>
          ) : (
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          )}
        </div>

        <Button type="submit" disabled={disabledButton}>
          {('register')}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
