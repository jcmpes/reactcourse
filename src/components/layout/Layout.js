import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../shared/MyButton';

import { Header, Footer } from '../layout';
import './Layout.css';

function Layout({ children, ...props }) {
  const storedDarkMode = localStorage.getItem('DARK_MODE');
  const [darkMode, setDarkMode] = React.useState(storedDarkMode);
  const toggleDarkMode = () => setDarkMode(darkMode ? false : true);

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
