import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import SideDrawer from './components/navbar/SideDrawer/SideDrawer';
import Backdrop from './components/navbar/Backdrop/Backdrop';

const App: React.FC = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const clickDrawerToggleButtonHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const clickBackdropHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;
  if (sideDrawerOpen) {
    backdrop = <Backdrop clickBackdrop={clickBackdropHandler} />;
  }

  return (
    <div className="App" style={{ height: '100%' }}>
      <Navbar clickDrawerToggleButton={clickDrawerToggleButtonHandler} />
      <SideDrawer hasShown={sideDrawerOpen} />
      {backdrop}
      <main style={{ marginTop: '64px' }}>
        <p>This is the page content!</p>
      </main>
    </div>
  );
};

export default App;
