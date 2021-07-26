import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Button } from '../../shared';
import { toast } from 'react-toastify';

const RegisterForm = ({ passwordShown, onSubmit }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

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

  const { t } = useTranslation(['global']);

  const { email, password, username } = credentials;

  const disabledButton =
    !email | !password | !username | !password | !passwordConfirm;

  return (
    <div className="registerForm">
      <form className="registerForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          label={t('username') + ': '}
          name="username"
          value={username}
          onChange={handleChange}
        />
        <FormField
          type="email"
          label={t('email') + ': '}
          name="email"
          value={email}
          onChange={handleChange}
        />
        <div className="pwd-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            label={t('password')}
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="pwd-confirm-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            label={t('confirm password') + ': '}
            name="password-confirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={disabledButton}>
          {t('register')}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
