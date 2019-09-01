import React from 'react';
import './Links.css';

export interface Props {}

const SignOutLinks: React.SFC<Props> = () => {
  return (
    <ul>
      <li>
        <a href="/users/">Sign Up</a>
      </li>
      <li>
        <a href="/users/login">Sign In</a>
      </li>
    </ul>
  );
};

export default SignOutLinks;
