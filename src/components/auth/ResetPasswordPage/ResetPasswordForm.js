import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared';
import FormField from '../../shared/FormField';
import { toast } from 'react-toastify';

const ResetPasswordForm = ({ passwordShown, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { t } = useTranslation(['global']);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password === passwordConfirm) {
      toast.success('Password updated');
      onSubmit(password);
    } else {
      toast.error(t('Passwords should match'));
    }
  };

  const handleChange = (ev) => {
    if (ev.target.name === 'password') {
      setPassword(ev.target.value);
    } else if (ev.target.name === 'password-confirm') {
      setPasswordConfirm(ev.target.value);
    }
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
            label={t('reset password.confirm password')}
            name="password-confirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" disabled={!password | !passwordConfirm}>
          {t('submit')}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
