import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../api/auth';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/img/logo.png';

// redux:
import { authLogout } from '../../../store/actions/logout';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCart, getIsLogged } from '../../../store/selectors';

// components:
import { Button } from '../../shared';
import ToggleButton from '../../shared/ToggleButton';
import MobileMenu from '../../ModalElements/MobileMenu';
import LanguageSelector from '../../ModalElements/LanguageSelector';

// icons:
import shoppingCartIcon from '../../../assets/svg/shopping-cart.svg';
import translationIcon from '../../../assets/svg/translation.svg';
import hamburgerMenuIcon from '../../../assets/svg/menu.svg';
import ShoppingCart from '../../courses/ShoppingCart';
import loupeIcon from '../../../assets/svg/loupe.svg';
import darkModeIcon from '../../../assets/svg/dark-mode.svg';
import userIcon from '../../../assets/svg/user.svg';
import heartIcon from '../../../assets/svg/heart.svg';

// styles:
import styles from './Header.module.css';

const Header = ({ isLogged, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector(getCart);
  const { t } = useTranslation(['global']);

  const handleLogoutClick = () => {
    logout(); // clear local storage
    dispatch(authLogout()); // change isLogged state
    history.push('/');
  };

  const [temporaryMenu, setTemporaryMenu] = useState(false);

  function handleClickMenu() {
    setMenuOpen(true);
  }

  function handleClickLanguage() {
    setLanguageOpen(true);
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

          <div className={styles.categoriesBtn}>{t('header.categories')}</div>

          <div className={styles.navButtonsContainer}>
            {!isLogged ? (
              <div className={styles.myAccountBtns}>
                <div className={styles.registerLinkContainer}>
                  <Link to="/register" className={styles.registerBtn}>
                    <button>{t('header.register')}</button>
                  </Link>
                </div>
                <div className={styles.loginLinkContainer}>
                  <Link to="/login" className={styles.loginBtn}>
                    <button>{t('header.log in')}</button>
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
                <img
                  onClick={handleClickLanguage}
                  src={translationIcon}
                  alt="language selector icon"
                />
              </div>
              <div className={styles.hamburgerMenuIcon}>
                <img
                  onClick={handleClickMenu}
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

        {/* MODAL hamburger menu */}
        {isMenuOpen && <MobileMenu closeModal={() => setMenuOpen(false)} />}

        {/* MODAL language selector */}
        {isLanguageOpen && (
          <LanguageSelector closeModal={() => setLanguageOpen(false)} />
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
