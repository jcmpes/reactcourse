import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer = ({ darkMode }) => {
  const { t } = useTranslation(['global']);

  return (
    <footer className={styles.footer} data-theme={darkMode ? 'dark' : 'light'}>
        <p>{t('footer.footer')}</p>
    </footer>
  );
};

export default Footer;
