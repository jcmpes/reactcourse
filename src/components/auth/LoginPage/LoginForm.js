import { Button, FormField, Checkbox } from '../../shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';

const eye = <FontAwesomeIcon style={{ width: '20px'}} icon={faEye} />;
const eyeSlash = <FontAwesomeIcon style={{ width: '20px'}} icon={faEyeSlash} />;

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [passwordShown, setPasswordShown] = useState(false);

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

  
  return (
    <div className="loginForm">
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          label={('email')}
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <div className="pwd-container">
          <FormField
            type={passwordShown ? 'text' : 'password'}
            label={('password')}
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
          text={('remember session')}
          type={'checkbox'}
          checked={credentials.remember}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={!credentials.email | !credentials.password}
        >
          {('log in')}
        </Button>
        <div className="password-forgotten">
          <Link href="/forgot-password">
            <a>{('forgot option')}</a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
