import { useTranslation } from 'react-i18next';
import AuthButton from '../../auth/AuthButton';
import { Button } from '../../shared';
import MyButton from '../../shared/MyButton';
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

  return (
    <header className="header" {...props}>
      <a href="/">
        <Button>{t('header.home')}</Button>
      </a>
      <a href="/user">
        <Button>{t('header.user')}</Button>
      </a>

      <Button type="text" onClick={switchLanguage}>
        en
      </Button>
      <Button type="text" onClick={switchLanguage}>
        es
      </Button>

      <AuthButton
        className="header-button"
        isLogged={isLogged}
        onLogout={onLogout}
      />
    </header>
  );
};

export default Header;
