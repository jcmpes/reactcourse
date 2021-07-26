import React from 'react';
import PropTypes from 'prop-types';
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
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} {...props} />
      <div className="App" data-theme={darkMode ? 'dark' : 'light'}>
        <main>{children}</main>
      </div>
      <Footer darkMode={darkMode}/>
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
