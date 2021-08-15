import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ModalWindow from '../shared/ModalWindow';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ title, isMenuOpen, closeMenu }) => {
  const { t } = useTranslation(['global']);

  return (
    <div>
      <ModalWindow
        title={title}
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        children={
          <div className={styles.mobileMenu} onClick={closeMenu}>
            <Link className={styles.link} onClick={closeMenu} to="/login">
              {t('mobile menu.log in')}
            </Link>
            <Link className={styles.link} onClick={closeMenu} to="/register">
              {t('mobile menu.register')}
            </Link>
            <Link className={styles.link} onClick={closeMenu} to="/courses">
              {t('mobile menu.courses')}
            </Link>
            <Link className={styles.link} onClick={closeMenu} to="/create">
              {t('mobile menu.create course')}
            </Link>
            <Link className={styles.link} onClick={closeMenu} to="/user">
              {t('mobile menu.my account')}
            </Link>
            <Link className={styles.link} onClick={closeMenu} to="/myfavs">
              {t('mobile menu.my favourites')}
            </Link>
            <Link className={styles.link} onClick={closeMenu} to="/categories">
              {t('mobile menu.categories')}
            </Link>
          </div>
        }
      ></ModalWindow>
    </div>
  );
};

export default MobileMenu;
