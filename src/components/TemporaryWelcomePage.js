import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { authLogout } from '../store/actions';
import { getAuth } from '../store/selectors';
import Layout from './layout/Layout';
import { Button } from '../components/shared';
import { useTranslation } from 'react-i18next';

function TemporaryWelcomePage({ auth, onLogout, ...props }) {
  const { t, i18n } = useTranslation(['global']);
  const handleLogoutClick = () => {
    logout().then(onLogout);
  };

  const switchLanguage = (ev) => {
    if (ev.target.innerHTML === 'Español') {
      i18n.changeLanguage('es');
    } else if (ev.target.innerHTML === 'English') {
      i18n.changeLanguage('en');
    }
  };

  const propsButton = { onClick: handleLogoutClick, children: 'Log Out' };

  const propsLoginLink = {
    to: '/login',
    children: 'Log In',
  };
  const propsRegisterLink = {
    to: '/register',
    children: 'Register',
  };

  const { isLogged, username } = auth;

  return (
    <Layout {...props}>
      <div
        style={{
          textAlign: 'center',
          fontSize: 40,
        }}
      >
        {t('welcome')}
        {t('title')}
        {username ? `, ${username}` : ''}
      </div>

      <div>{t('headline')}</div>

      {isLogged ? <Button {...propsButton} /> : <Link {...propsLoginLink} />}
      <br />
      {!isLogged && <Link {...propsRegisterLink} />}

      <p>
        Current language: <strong>{i18n.language}</strong>
      </p>
      <Button children="English" onClick={switchLanguage} />
      <Button children="Español" onClick={switchLanguage} />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemporaryWelcomePage);
