import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { authLogout } from '../store/actions';
import { getAuth } from '../store/selectors';
import Layout from './layout/Layout';
import { Button } from '../components/shared';

function TemporaryWelcomePage({ auth, onLogout }) {
  const handleLogoutClick = () => {
    logout().then(onLogout);
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
    <React.Fragment>
      <Layout>
      <div
        style={{
          textAlign: 'center',
          fontSize: 40,
        }}
      >
        Welcome to Courseapp, {username}
      </div>
      <div>We hope you survive the experience...</div>
      {isLogged ? <Button {...propsButton} /> : <Link {...propsLoginLink} />}
      <br />
      {!isLogged && <Link {...propsRegisterLink} />}
      </Layout>
    </React.Fragment>
  );
}


const mapStateToProps = state => ({
  auth: getAuth(state),
});

const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemporaryWelcomePage);
