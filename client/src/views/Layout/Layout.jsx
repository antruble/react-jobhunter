import React from 'react';
import Menu from './Menu';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-800 min-h-screen font-exo">
      <Menu />
      <div className="container mx-auto mt-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
