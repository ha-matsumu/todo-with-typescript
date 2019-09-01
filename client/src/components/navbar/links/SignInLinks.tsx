import React from 'react';
import './Links.css';

export interface Props {}

const SignInLinks: React.FC<Props> = () => {
  return (
    <ul>
      <li>
        {/* TODO:後でURL変更 */}
        <a href="/todos">New Todos</a>
      </li>
      <li>
        <a href="/users/login">Log Out</a>
      </li>
    </ul>
  );
};

export default SignInLinks;
