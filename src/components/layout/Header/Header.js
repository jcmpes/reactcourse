import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/img/logo.png';

// redux:
import { connect, useSelector } from 'react-redux';
import { getCart, getIsLogged } from '../../../store/selectors';

// components:
import MobileMenu from '../../ModalElements/MobileMenu';
import LanguageSelector from '../../ModalElements/LanguageSelector';
import CategoryList from '../../ModalElements/CategoryList';

// icons:
import shoppingCartIcon from '../../../assets/svg/shopping-cart.svg';
import translationIcon from '../../../assets/svg/translation.svg';
import hamburgerMenuIcon from '../../../assets/svg/menu.svg';
import loupeIcon from '../../../assets/svg/loupe.svg';
import darkModeIcon from '../../../assets/svg/dark-mode.svg';
import darkModeIcon2 from '../../../assets/img/dark-mode.png';
import CartModal from '../../ModalElements/CartModal';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../store/actions/load-courses';
import { getFilters } from '../../../store/selectors';
import Tooltip from '@material-ui/core/Tooltip';

import userIcon from '../../../assets/svg/user.svg';
import heartIcon from '../../../assets/svg/heart.svg';

// styles:
import { makeStyles } from '@material-ui/core/styles';
import styles from './Header.module.css';

const Header = ({ isLogged, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryListOpen, setCategoryListOpen] = useState(false);
  const cart = useSelector(getCart);
  const { t } = useTranslation(['global']);
  const colorTeachItUp = '#f24b88';

  const [formSubmited, setFormSubmited] = React.useState(false);

  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  function handleChange(ev) {
    filters.skip = 0;
    const newFilter = { ...filters, [ev.target.name]: ev.target.value };
    dispatch(setFilters(newFilter));
  }

  function handleClickMenu() {
    setMenuOpen(true);
  }

  function handleClickLanguage() {
    setLanguageOpen(true);
  }

  function handleClickCategories() {
    setCategoryListOpen(true);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    setFormSubmited(true);
  }
  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: colorTeachItUp,
    },
    tooltip: {
      backgroundColor: colorTeachItUp,
    },
  }));
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  }

  React.useEffect(() => {
    return () => {
      setFormSubmited(false);
    };
  }, [formSubmited]);

  return formSubmited ? (
    <Redirect to="/search" />
  ) : (
    <>
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

          <div className={styles.categoriesBtn} onClick={handleClickCategories}>
            {t('header.categories')}
          </div>

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
                  <BootstrapTooltip title={t('header.My Account')}>
                    <img
                      src={userIcon}
                      alt="user icon"
                      onClick={handleClickMenu}
                    />
                  </BootstrapTooltip>
                </div>
                <div className={styles.heartIcon}>
                  <BootstrapTooltip title={t('header.Favorites')}>
                    <Link to="myfavs">
                      <img src={heartIcon} alt="heart icon" />
                    </Link>
                  </BootstrapTooltip>
                </div>
              </div>
            )}

            <div className={styles.navBarIcons}>
              <BootstrapTooltip title={t('header.Cart')}>
                <div
                  className={styles.shoppingCartIcon}
                  onClick={() => {
                    setIsCartOpen(true);
                  }}
                >
                  {cart.length > 0 && (
                    <span className={styles.cartItemsNumber}>
                      {cart.length}
                    </span>
                  )}
                  <img src={shoppingCartIcon} alt="shopping cart icon" />
                </div>
              </BootstrapTooltip>
              <div className={styles.darkModeIcon}>
                <BootstrapTooltip title={t('header.Dark/Light Mode')}>
                  <img
                    src={darkMode ? darkModeIcon : darkModeIcon2}
                    alt=""
                    onClick={toggleDarkMode}
                  />
                </BootstrapTooltip>
              </div>
              <div className={styles.translationIcon}>
                <BootstrapTooltip title={t('header.Languages')}>
                  <img
                    onClick={handleClickLanguage}
                    src={translationIcon}
                    alt="language selector icon"
                  />
                </BootstrapTooltip>
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
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              className={styles.searchBarForm}
              placeholder={t('header.search')}
              value={filters.title}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* MODAL shopping cart menu */}
        {isCartOpen && <CartModal closeModal={() => setIsCartOpen(false)} />}

        {/* MODAL hamburger menu */}
        {isMenuOpen && (
          <MobileMenu
            isCategoryListOpen={isCategoryListOpen}
            setCategoryListOpen={setCategoryListOpen}
            closeModal={() => setMenuOpen(false)}
          />
        )}

        {/* MODAL language selector */}
        {isLanguageOpen && (
          <LanguageSelector closeModal={() => setLanguageOpen(false)} />
        )}

        {/* MODAL category list */}
        {isCategoryListOpen && (
          <CategoryList closeModal={() => setCategoryListOpen(false)} />
        )}
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
