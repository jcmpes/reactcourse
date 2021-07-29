import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../shared';
import { logout } from '../../../api/auth';
import { getIsLogged } from '../../../store/selectors';
import { authLogout } from '../../../store/actions/logout';
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FiltersForm from '../../FiltersForm/FiltersForm';
import ToggleButton from '../../shared/ToggleButton';
import styles from './Header.module.css';
import logo from '../../../assets/img/logo.png';
import shoppingCartIcon from '../../../assets/svg/shopping-cart.svg';
import translationIcon from '../../../assets/svg/translation.svg';
import hamburgerMenuIcon from '../../../assets/svg/menu.svg';

const Header = ({ isLogged, darkMode, toggleDarkMode }) => {
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

  const [temporaryMenu, setTemporaryMenu] = useState(false);

  function handleClick() {
    setTemporaryMenu(!temporaryMenu);
  }

  return (
    <header className={styles.header} data-theme={darkMode ? 'dark' : 'light'}>
      <div className={styles.navBar}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
        </div>

        <div className={styles.iconsContainer}>
          <div className={styles.hamburgerMenuIcon}>
            <img src={shoppingCartIcon} alt="shopping cart icon" />
          </div>
          <div className={styles.translationIcon}>
            <img src={translationIcon} alt="language selector icon" />
          </div>
          <div className={styles.hamburgerMenuIcon}>
            <img
              //
              onClick={handleClick}
              src={hamburgerMenuIcon}
              alt="hamburger menu icon"
            />
          </div>
        </div>
      </div>

      <div className={styles.searchBarContainer}>
        <FiltersForm className={styles.searchBarForm} />
      </div>

      {temporaryMenu && !isLogged && (
        <Link to="/register">
          <Button>{t('header.register')}</Button>
        </Link>
      )}
      {isLogged
        ? temporaryMenu && (
            <Button onClick={handleLogoutClick}>{t('header.log out')}</Button>
          )
        : temporaryMenu && (
            <Link to="/login">
              <Button>{t('header.log in')}</Button>
            </Link>
          )}
      {temporaryMenu && (
        <>
          <Button type="text" onClick={switchLanguage}>
            en
          </Button>
          <Button type="text" onClick={switchLanguage}>
            es
          </Button>
        </>
      )}
      <br />
      {temporaryMenu && isLogged && (
        <div>
          <Link to="/create">
            <Button>{t('header.create')}</Button>
          </Link>

          <Link to="/user">
            <Button>{t('header.user')}</Button>
          </Link>
          <Link to="/myfavs">
            <Button>{t('header.myfavs')}</Button>
          </Link>
        </div>
      )}
      {temporaryMenu && <ToggleButton onChange={toggleDarkMode} />}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

export default connect(mapStateToProps)(Header);
