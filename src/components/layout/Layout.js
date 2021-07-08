import React from 'react';
import PropTypes from 'prop-types';

import { Header, Footer } from '../layout';
import './Layout.css';

function Layout({children}) {
  return (
    <div className="layout">
      <Header />
      <hr/>
      <main>{children}</main>
      <hr/>
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
