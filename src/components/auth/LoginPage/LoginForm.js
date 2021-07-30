import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormField, Checkbox } from '../../shared';
import userIcon from '../../../assets/svg/user.svg';
import lockIcon from '../../../assets/svg/lock.svg';

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
    <div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <FormField
            type="text"
            name="email"
            placeholder={t('username')}
            value={credentials.email}
            icon={userIcon}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormField
            type={passwordShown ? 'text' : 'password'}
            name="password"
            placeholder={t('password')}
            value={credentials.password}
            icon={lockIcon}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          disabled={!credentials.email | !credentials.password}
        >
          {t('log in button')}
        </Button>
        <Checkbox
          className={'checkbox'}
          name={'remember'}
          text={t('remember session')}
          type={'checkbox'}
          checked={credentials.remember}
          onChange={handleChange}
        />

        <div className="password-forgotten">
          <a href="/forgot-password">{t('forgot option')}</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
