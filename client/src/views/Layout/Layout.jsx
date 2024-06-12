import React from 'react';
import Menu from './Menu';

const Layout = ({ children }) => {
  return (
    <div>
      <Menu />
      <div className="container mx-auto mt-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
