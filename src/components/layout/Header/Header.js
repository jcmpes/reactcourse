import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../shared';
import { logout } from '../../../api/auth';
import { getCart, getIsLogged } from '../../../store/selectors';
import { authLogout } from '../../../store/actions/logout';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ToggleButton from '../../shared/ToggleButton';
import styles from './Header.module.css';
import logo from '../../../assets/img/logo.png';
import shoppingCartIcon from '../../../assets/svg/shopping-cart.svg';
import translationIcon from '../../../assets/svg/translation.svg';
import hamburgerMenuIcon from '../../../assets/svg/menu.svg';
import ShoppingCart from '../../courses/ShoppingCart';
import loupeIcon from '../../../assets/svg/loupe.svg';
import darkModeIcon from '../../../assets/svg/dark-mode.svg';
import userIcon from '../../../assets/svg/user.svg';
import heartIcon from '../../../assets/svg/heart.svg';

const Header = ({ isLogged, darkMode, toggleDarkMode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector(getCart);

  const handleLogoutClick = () => {
    logout(); // clear local storage
    dispatch(authLogout()); // change isLogged state
    history.push('/');
  };

  const { t, i18n } = useTranslation(['global']);
  const switchLanguage = (ev) => {
    // TODO: improve this function in order to get available languages dinamically
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
    <>
      <ShoppingCart />
      <header
        className={styles.header}
        data-theme={darkMode ? 'dark' : 'light'}
      >
        <div className={styles.navBar}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </Link>
          </div>

          <div className={styles.categoriesBtn}>Categories</div>

          <div className={styles.navButtonsContainer}>
            {!isLogged ? (
              <div className={styles.myAccountBtns}>
                <div className={styles.registerLinkContainer}>
                  <Link to="/register" className={styles.registerBtn}>
                    <button>Register</button>
                  </Link>
                </div>
                <div className={styles.loginLinkContainer}>
                  <Link to="/login" className={styles.loginBtn}>
                    <button>Log in</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.myAccountBtns}>
                <div className={styles.userIcon}>
                  <img src={userIcon} alt="user icon" />
                </div>
                <div className={styles.heartIcon}>
                  <img src={heartIcon} alt="heart icon" />
                </div>
              </div>
            )}

            <div className={styles.navBarIcons}>
              <div className={styles.shoppingCartIcon}>
                {cart.length > 0 && (
                  <span className={styles.cartItemsNumber}>{cart.length}</span>
                )}
                <img src={shoppingCartIcon} alt="shopping cart icon" />
              </div>
              <div className={styles.darkModeIcon}>
                <img src={darkModeIcon} alt="" />
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
        </div>

        {/* Search input bar */}
        <div className={styles.searchBarContainer}>
          <span className={styles.loupeIconSpan}>
            <img src={loupeIcon} alt="" />
          </span>
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
      <hr className={styles.hr} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: getIsLogged(state),
  };
};

export default connect(mapStateToProps)(Header);
