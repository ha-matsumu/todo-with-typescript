import React, { useState, useContext } from 'react';
import { UserContext } from '../../store/contexts/userContext';

const SignUp: React.SFC = () => {
  const { signUpUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpHandler = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const inputData = {
      name,
      email,
      password,
      userRoleId: 2, // 一般ユーザー
    };
    try {
      await signUpUser(inputData);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      <label htmlFor="name">
        Name
        <input id="name" type="text" placeholder="name" onChange={e => setName(e.target.value)} required />
      </label>
      <label htmlFor="email">
        E-mail
        <input id="email" type="email" placeholder="email" onChange={e => setEmail(e.target.value)} required />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button onClick={signUpHandler}>Sign Up</button>
    </div>
  );
};

export default SignUp;
