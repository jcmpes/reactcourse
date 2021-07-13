import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation(['global']);

  return (
    <footer>
      <div>
        <p>{t('footer.footer')}</p>
      </div>
    </footer>
  );
};

export default Footer;
