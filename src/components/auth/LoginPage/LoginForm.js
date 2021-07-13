import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormField, Checkbox } from '../../shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    remember: false,
  });

  const [passwordShown, setPasswordShown] = React.useState(false);

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

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
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
          {passwordShown ? (
            <i onClick={togglePasswordVisiblity}>{eyeSlash}</i>
          ) : (
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          )}
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
