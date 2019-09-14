import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SideDrawer from './components/navbar/SideDrawer/SideDrawer';
import Backdrop from './components/navbar/Backdrop/Backdrop';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import TodoList from './components/todos/TodoList';
import { UserProvider } from './store/contexts/userContext';

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
        <Route exact path="/users/login" component={SignIn} />
        <UserProvider>
          <Route exact path="/users/" component={SignUp} />
        </UserProvider>
        <Route exact path="/todos/" component={TodoList} />
      </main>
    </div>
  );
};

export default App;
