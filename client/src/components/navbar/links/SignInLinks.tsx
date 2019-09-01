import React from 'react';
import './Links.css';

const SignInLinks: React.SFC = () => {
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
