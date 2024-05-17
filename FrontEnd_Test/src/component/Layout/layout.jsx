import React from 'react';
// import SideBar from './SideBar'; // Assuming SideBar is your sidebar component

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* <SideBar /> */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;