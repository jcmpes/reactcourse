import React, { useState } from 'react';
import { Button } from '../../shared';
import FormField from '../../shared/FormField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const ResetPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password === passwordConfirm) {
      toast.success('Password updated');
      onSubmit(password);
    } else {
      toast.error('Passwords should match');
    }
  };

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
            label={('password')}
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="pwd-confirm-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            label={('reset password.confirm password')}
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
        <Button type="submit" disabled={!password | !passwordConfirm}>
          {('submit')}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
