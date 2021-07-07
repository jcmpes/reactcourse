import React, { useState } from 'react';
import { Button } from '../../shared';
import FormField from '../../shared/FormField';

const ResetPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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

  return (
    <div className="reset-password">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        {/* TODO: ?? Add new field here to input email or username */}
        <FormField
          type="password"
          label="new password: "
          name="password"
          value={password}
          onChange={handleChange}
        />
        <FormField
          type="password"
          label="confirm password: "
          name="password-confirm"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={
            !password | !passwordConfirm | (password !== passwordConfirm)
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
