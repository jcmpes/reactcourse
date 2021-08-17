import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalWindow from '../shared/ModalWindow';
import styles from './CartModal.module.css';
import ShoppingCart from '../courses/ShoppingCart';
import { useSelector } from 'react-redux';
import { totalInChart } from '../../store/selectors';

const MobileMenu = ({ closeModal }) => {
  const { t } = useTranslation(['global']);
  const total = useSelector(totalInChart);

  return (
    <div className={styles.cartMenu}>
      <ModalWindow
        title={t('Shopping Cart')}
        closeModal={closeModal}
        children={
          <>
            {total > 0 ? (
              <ShoppingCart closeModal={closeModal} />
            ) : (
              'Empty cart'
            )}
          </>
        }
      ></ModalWindow>
    </div>
  );
};

export default MobileMenu;
