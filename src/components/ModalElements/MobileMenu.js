import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../api/auth';
import { authLogout } from '../../store/actions/logout';
import ModalWindow from '../shared/ModalWindow';
import styles from './MobileMenu.module.css';
import { getIsLogged } from '../../store/selectors';
import CategoryList from './CategoryList';

const MobileMenu = ({
  closeModal,
  isCategoryListOpen,
  setCategoryListOpen,
}) => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogged = useSelector(getIsLogged);

  const handleLogoutClick = () => {
    logout(); // clear local storage
    dispatch(authLogout()); // change isLogged state
    history.push('/');
  };

  const handleClickCategories = () => {
    setCategoryListOpen(true);
    closeModal();
  };

  return (
    <div>
      <ModalWindow
        title={t('mobile menu.menu')}
        closeModal={closeModal}
        children={
          <div className={styles.mobileMenu} onClick={closeModal}>
            {isLogged && (
              <>
                <Link className={styles.link} onClick={closeModal} to="/user">
                  {t('mobile menu.my account')}
                </Link>
                <Link className={styles.link} onClick={closeModal} to="/myfavs">
                  {t('mobile menu.my favourites')}
                </Link>
                <Link className={styles.link} onClick={closeModal} to="/search">
                  {t('mobile menu.courses')}
                </Link>
                <Link className={styles.link} onClick={closeModal} to="/create">
                  {t('mobile menu.create course')}
                </Link>
              </>
            )}
            <p className={styles.link} onClick={handleClickCategories}>
              {t('mobile menu.categories')}
            </p>
            {isCategoryListOpen ? (
              <CategoryList closeModal={() => setCategoryListOpen(false)} />
            ) : null}

            {!isLogged && (
              <>
                <Link
                  className={styles.link}
                  onClick={closeModal}
                  to="/register"
                >
                  {t('mobile menu.register')}
                </Link>

                <Link className={styles.link} onClick={closeModal} to="/login">
                  {t('mobile menu.log in')}
                </Link>
              </>
            )}

            {isLogged && (
              <Link className={styles.link} onClick={handleLogoutClick} to="/">
                {t('mobile menu.logout')}
              </Link>
            )}
          </div>
        }
      ></ModalWindow>
    </div>
  );
};

export default MobileMenu;
