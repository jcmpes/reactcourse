import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalWindow from '../shared/ModalWindow';
import styles from './CartModal.module.css';
import ShoppingCart from '../purchases/ShoppingCart';
import { useSelector } from 'react-redux';
import { getIdsInCart } from '../../store/selectors';

const MobileMenu = ({ closeModal }) => {
  const { t } = useTranslation(['global']);
  const numItems = useSelector(getIdsInCart).length;

  return (
    <div className={styles.cartMenu}>
      <ModalWindow
        title={t('Shopping Cart')}
        closeModal={closeModal}
        children={
          <>
            {numItems > 0 ? (
              <ShoppingCart closeModal={closeModal} />
            ) : (
              t('Empty cart')
            )}
          </>
        }
      ></ModalWindow>
    </div>
  );
};

export default MobileMenu;
