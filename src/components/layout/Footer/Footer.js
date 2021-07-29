import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = ({ darkMode }) => {
  const { t } = useTranslation(['global']);

  return (
    <footer
      style={{ backgroundColor: 'grey' }}
      className="App"
      data-theme={darkMode ? 'dark' : 'light'}
    >
      <div style={{ padding: '20px' }}>
        <p>{t('footer.footer')}</p>
      </div>
    </footer>
  );
};

export default Footer;
