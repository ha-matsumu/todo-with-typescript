import React from 'react';
import SignInLinks from '../links/SignInLinks';
import './SideDrawer.css';

export interface Props {
  hasShown: boolean;
}

const SideDrawer: React.FC<Props> = ({ hasShown }: Props) => {
  let drawerClasses = 'side-drawer';
  if (hasShown) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <SignInLinks />
    </nav>
  );
};

export default SideDrawer;
