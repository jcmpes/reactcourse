import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../shared';
import { logout } from '../../../api/auth';
import { getIsLogged } from '../../../store/selectors';
import { authLogout } from '../../../store/actions/logout';
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './Header.css';
import FiltersForm from '../../FiltersForm/FiltersForm';

const Header = ({ isLogged }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutClick = () => {
    logout(); // clear local storage
    dispatch(authLogout()); // change isLogged state
    history.push('/');
  };

  const { t, i18n } = useTranslation(['global']);
  const switchLanguage = (ev) => {
    // TODO: improve this function getting available languages dinamically
    if (ev.target.innerHTML === 'es') {
      i18n.changeLanguage('es');
    } else if (ev.target.innerHTML === 'en') {
      i18n.changeLanguage('en');
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <Button>{t('header.home')}</Button>
      </Link>
      <Link to="/register">
        <Button>{t('header.register')}</Button>
      </Link>

      {isLogged ? (
        <Button onClick={handleLogoutClick}>{t('header.log out')}</Button>
      ) : (
        <Link to="/login">
          <Button>{t('header.log in')}</Button>
        </Link>
      )}

      <Button type="text" onClick={switchLanguage}>
        en
      </Button>
      <Button type="text" onClick={switchLanguage}>
        es
      </Button>

      <br />
      <Link to="/create">
        <Button>{t('header.create')}</Button>
      </Link>

      <Link to="/user">
        <Button>{t('header.user')}</Button>
      </Link>
      <FiltersForm />
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

export default connect(mapStateToProps)(Header);
