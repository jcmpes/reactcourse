import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Button } from '../../shared';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import userIcon from '../../../assets/svg/user.svg';
import emailIcon from '../../../assets/svg/envelope.svg';
import lockIcon from '../../../assets/svg/lock.svg';
import FileUpload from '../../shared/FileUpload';

const RegisterForm = ({ passwordShown, onSubmit }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
    image: ''
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password === passwordConfirm) {
      onSubmit(credentials, password, passwordConfirm);
    } else {
      toast.error(t('Passwords should match'));
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
          placeholder={t('username')}
          name="username"
          value={username}
          icon={userIcon}
          onChange={handleChange}
        />
        <FormField
          type="email"
          placeholder={t('email')}
          name="email"
          value={email}
          icon={emailIcon}
          onChange={handleChange}
        />
        <div className="pwd-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            placeholder={t('password')}
            name="password"
            value={credentials.password}
            icon={lockIcon}
            onChange={handleChange}
          />
        </div>
        <div className="pwd-confirm-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            placeholder={t('confirm password')}
            name="password-confirm"
            value={passwordConfirm}
            icon={lockIcon}
            onChange={handleChange}
          />
        </div>
        <FileUpload
          courseDetails={credentials}
          setCourseDetails={setCredentials}
        />

        <Button type="submit" disabled={disabledButton}>
          {t('register')}
        </Button>
      </form>
      {t('Already registered?')} <Link to="/login">{t('Log in!')}</Link>
    </div>
  );
};

export default RegisterForm;
