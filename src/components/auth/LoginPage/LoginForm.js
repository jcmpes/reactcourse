import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormField, Checkbox } from '../../shared';

function LoginForm({ passwordShown, onSubmit }) {
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

  const { t } = useTranslation(['global']);

  return (
    <div className="loginForm">
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          label={t('email')}
          name="email"
          value={credentials.email}
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
        <Checkbox
          className={'checkbox'}
          name={'remember'}
          text={t('remember session')}
          type={'checkbox'}
          checked={credentials.remember}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={!credentials.email | !credentials.password}
        >
          {t('log in')}
        </Button>
        <div className="password-forgotten">
          <a href="/forgot-password">{t('forgot option')}</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
