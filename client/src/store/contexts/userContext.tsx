import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import userReducer, { initialState, AuthInitialState } from '../reducers/userReducer';
import { UserActionTypes } from '../actions/user/userActionTypes';
import { signInRequest, signInSuccess, signInFailuer } from '../actions/user/userActionCreator';

interface Props {
  children: React.ReactNode;
}

interface User {
  email: string;
  password: string;
}

interface ContextProps {
  state: AuthInitialState;
  dispatch: React.Dispatch<UserActionTypes>;
  authUser: Function;
}

const UserContext = createContext({} as ContextProps);

const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const authUser = async (user: User) => {
    try {
      dispatch(signInRequest());
      const response = await axios.post('/users/login', user);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      dispatch(signInSuccess(response.data.token));
    } catch (error) {
      dispatch(signInFailuer(error));
    }
  };

  return <UserContext.Provider value={{ state, dispatch, authUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
