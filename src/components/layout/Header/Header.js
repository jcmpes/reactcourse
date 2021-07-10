import AuthButton from '../../auth/AuthButton';
import './Header.css';

const Header = ({ isLogged, onLogout, ...props }) => {
  return (
    <header className="header" {...props}>
      <AuthButton
        className="header-button"
        isLogged={isLogged}
        onLogout={onLogout}
      />
    </header>
  );
};

export default Header;
