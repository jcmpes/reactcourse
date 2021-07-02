import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { authLogout } from '../store/actions';
import { getIsLogged } from '../store/selectors';
import { Button } from '../components/shared';

function TemporaryWelcomePage({ isLogged, onLogout }) {
  const handleLogoutClick = () => {
    logout().then(onLogout)
  }
  
  const propsButton = { onClick: handleLogoutClick, children: 'Log Out'}
  const propsLink = {
      to: '/login',
      children: 'Log In',
    };
  
  return (
    <React.Fragment>
      <div style={{
        textAlign: 'center',
        fontSize: 40,
      }}>
        Welcome to Courseapp
      </div>
      {isLogged
        ? <Button {...propsButton} />
        : <Link {...propsLink} />
      }     
    </React.Fragment>
  )
}

const mapStateToProps = state => ({ isLogged: getIsLogged(state) });

const mapDispatchToProps = {
  onLogout: authLogout,
}


export default connect(mapStateToProps, mapDispatchToProps)(TemporaryWelcomePage)