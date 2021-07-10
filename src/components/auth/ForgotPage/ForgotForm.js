import React from 'react';
import { Button, FormField } from '../../shared';

const ForgotForm = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('');
  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(email);
  };
  const handleChange = (ev) => {
    setEmail(ev.target.value);
  };

  return (
    <div className="forgotForm">
      <form className="forgotPasswordForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          label="email:"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Button type="submit" disabled={!email}>
          Next
        </Button>
      </form>
    </div>
  );
};

export default ForgotForm;
