import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../shared/MyButton';
import storage from '../../utils/storage';

import { Header, Footer } from '../layout';
import './Layout.css';

function Layout({ children, ...props }) {
  const storedDarkMode = storage.get('DARK_MODE');
  const [darkMode, setDarkMode] = React.useState(storedDarkMode || false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  React.useEffect(() => {
    localStorage.setItem('DARK_MODE', darkMode);
  }, [darkMode]);

  return (
    <div className="layout">
      <Header {...props} />
      <MyButton onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </MyButton>
      <hr />
      <div className="App" data-theme={darkMode ? 'dark' : 'light'}>
        <main>{children}</main>
      </div>
      <hr />
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
