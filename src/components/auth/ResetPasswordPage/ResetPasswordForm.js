import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared';
import FormField from '../../shared/FormField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const ResetPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);

  const { t } = useTranslation(['global']);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password === passwordConfirm) {
      onSubmit(password);
    } else {
      // TODO:
      // React-toastify -> "Passwords don't match"
    }
  };

  // TODO checkbox: "Show password"

  const handleChange = (ev) => {
    if (ev.target.name === 'password') {
      setPassword(ev.target.value);
    } else if (ev.target.name === 'password-confirm') {
      setPasswordConfirm(ev.target.value);
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="reset-password">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        {/* TODO: ?? Add new field here to input email or username */}
        <div className="pwd-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            label={t('password')}
            name="password"
            value={password}
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
          {passwordShown ? (
            <i onClick={togglePasswordVisiblity}>{eyeSlash}</i>
          ) : (
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          )}
        </div>
        <Button
          type="submit"
          disabled={
            !password | !passwordConfirm | (password !== passwordConfirm)
          }
        >
          {t('submit')}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
