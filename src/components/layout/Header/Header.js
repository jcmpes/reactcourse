import { Link } from 'react-router-dom';
import AuthButton from '../../auth/AuthButton';
import { Button } from '../../shared';
import './Header.css';

const Header = ({ isLogged, onLogout, ...props }) => {
  return (
    <header className="header" {...props}>
      <Link to="/create">
        Create
      </Link>
      <AuthButton
        className="header-button"
        isLogged={isLogged}
        onLogout={onLogout}
      />
    </header>
  );
};

export default Header;
