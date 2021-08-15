import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ModalWindow from '../shared/ModalWindow';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ closeModal }) => {
  const { t } = useTranslation(['global']);

  return (
    <div>
      <ModalWindow
        title={t('mobile menu.menu')}
        closeModal={closeModal}
        children={
          <div className={styles.mobileMenu} onClick={closeModal}>
            <Link className={styles.link} onClick={closeModal} to="/login">
              {t('mobile menu.log in')}
            </Link>
            <Link className={styles.link} onClick={closeModal} to="/register">
              {t('mobile menu.register')}
            </Link>
            <Link className={styles.link} onClick={closeModal} to="/courses">
              {t('mobile menu.courses')}
            </Link>
            <Link className={styles.link} onClick={closeModal} to="/create">
              {t('mobile menu.create course')}
            </Link>
            <Link className={styles.link} onClick={closeModal} to="/user">
              {t('mobile menu.my account')}
            </Link>
            <Link className={styles.link} onClick={closeModal} to="/myfavs">
              {t('mobile menu.my favourites')}
            </Link>
            <Link className={styles.link} onClick={closeModal} to="/categories">
              {t('mobile menu.categories')}
            </Link>
          </div>
        }
      ></ModalWindow>
    </div>
  );
};

export default MobileMenu;
