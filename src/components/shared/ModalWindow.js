import React from 'react';
import styles from './ModalWindow.module.css';
import closeIcon from '../../assets/svg/close.svg';

const ModalWindow = ({ title, isMenuOpen, closeMenu, children }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.closeBtnContainer}>
        <img src={closeIcon} onClick={closeMenu} alt="close icon" />
      </div>

      {title && <div className={styles.modalTitle}>{title}</div>}

      <main>{children}</main>
    </div>
  );
};

export default ModalWindow;
