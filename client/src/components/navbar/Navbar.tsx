import React from 'react';
import DrawerToggleButton from './DrawerToggleButton.tsx/DrawerToggleButton';
import SignOutLinks from './links/SignOutLinks';
import SignInLinks from './links/SignInLinks';
import './Navbar.css';

export interface Props {
  clickDrawerToggleButton: () => void;
}

const Navbar: React.FC<Props> = ({ clickDrawerToggleButton }: Props) => {
  return (
    <header className="navbar">
      <nav className="navbar-navigation">
        <div className="navbar-toggle-button">
          <DrawerToggleButton clickDrawerToggleButton={clickDrawerToggleButton} />
        </div>
        <div className="navbar-logo">
          <a href="/todos">TODO</a>
        </div>
        <div className="spacer" />
        <div className="navbar-navigation-items">
          {/* TODO:ログイン状態により表示を切り替えるように修正する */}
          <SignOutLinks />
          <SignInLinks />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
