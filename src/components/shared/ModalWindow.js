import React from 'react';
import styles from './ModalWindow.module.css';
import closeIcon from '../../assets/svg/close.svg';

const ModalWindow = ({ title, closeModal, children }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.closeBtnContainer}>
        <img src={closeIcon} onClick={closeModal} alt="close icon" />
      </div>
      {title && <div className={styles.modalTitle}>{title}</div>}
      <main>{children}</main>
    </div>
  );
};

export default ModalWindow;
