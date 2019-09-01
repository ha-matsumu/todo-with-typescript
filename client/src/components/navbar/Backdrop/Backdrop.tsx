import React from 'react';
import './Backdrop.css';

export interface Props {
  clickBackdrop: () => void;
}

const Backdrop: React.FC<Props> = ({ clickBackdrop }: Props) => {
  return <div className="backdrop" role="button" tabIndex={0} onClick={clickBackdrop} onKeyDown={clickBackdrop} />;
};

export default Backdrop;
