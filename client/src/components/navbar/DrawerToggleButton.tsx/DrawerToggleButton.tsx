import React from 'react';
import './DrawerToggleButton.css';

export interface Props {
  clickDrawerToggleButton: () => void;
}

const DrawerToggleButton: React.SFC<Props> = ({ clickDrawerToggleButton }: Props) => {
  return (
    <button className="toggle-button" onClick={clickDrawerToggleButton}>
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
    </button>
  );
};

export default DrawerToggleButton;
