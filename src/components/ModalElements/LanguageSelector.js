import React from 'react';
import ModalWindow from '../shared/ModalWindow';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './LanguageSelector.module.css';

const LanguageSelector = ({ closeModal }) => {
  const { t, i18n } = useTranslation(['global']);

  const switchLanguage = (ev) => {
    // TODO: improve this function in order to get available languages dinamically
    if (ev.target.innerHTML === 'Español') {
      i18n.changeLanguage('es');
      console.log(ev.target.innerHTML);
      console.log('seleccionado español ');
    } else if (ev.target.innerHTML === 'English') {
      i18n.changeLanguage('en');
      console.log(ev.target.innerHTML);
      console.log('seleccionado inglés');
    }
    closeModal();
  };

  return (
    <ModalWindow
      closeModal={closeModal}
      title={t('language selector.choose language')}
      children={
        <div className={styles.languageSelectorContainer}>
          <p type="text" onClick={switchLanguage}>
            English
          </p>
          <p type="text" onClick={switchLanguage}>
            Español
          </p>
        </div>
      }
    />
  );
};

export default LanguageSelector;
