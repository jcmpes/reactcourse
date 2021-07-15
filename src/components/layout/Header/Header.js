import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from '../../auth/AuthButton';
import { Button } from '../../shared';
import { useTranslation } from 'react-i18next';
import { filterCourses } from '../../../api/courses';

import './Header.css';

const Header = ({ isLogged, onLogout, ...props }) => {
  const { t, i18n } = useTranslation(['global']);
  const switchLanguage = (ev) => {
    if (ev.target.innerHTML === 'es') {
      i18n.changeLanguage('es');
    } else if (ev.target.innerHTML === 'en') {
      i18n.changeLanguage('en');
    }
  };

  const [inputText, setinputText] = React.useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = await filterCourses(inputText);
    console.log(data);
  }

  function handleChange(ev) {
    setinputText(ev.target.value);
  }

  return (
    <header className="header" {...props}>
      <Link to="/create">
        <Button>{t('header.create')}</Button>
      </Link>
      <Link to="/">
        <Button>{t('header.home')}</Button>
      </Link>
      <Link to="/user">
        <Button>{t('header.user')}</Button>
      </Link>
      <Link to="/register">
        <Button>{t('header.register')}</Button>
      </Link>

      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleChange}></input>
        <button type="submit">{t('header.search')}</button>
      </form>

      <AuthButton
        className="header-button"
        isLogged={isLogged}
        onLogout={onLogout}
      />

      <Button type="text" onClick={switchLanguage}>
        en
      </Button>
      <Button type="text" onClick={switchLanguage}>
        es
      </Button>
    </header>
  );
};

export default Header;
