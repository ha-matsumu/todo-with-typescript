import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import userReducer, { SignUpInitialState, initialState } from '../reducers/userReducer';
import { SignUpActionTypes } from '../actions/auth/userActionTypes';
import { signUpFailuer, signUpRequest, signUpSuccess } from '../actions/auth/userActionCreator';

interface Props {
  children: React.ReactNode;
}

interface InputData {
  email: string;
  password: string;
}

interface ContextProps {
  state: SignUpInitialState;
  dispatch: React.Dispatch<SignUpActionTypes>;
  signUpUser: Function;
}

const UserContext = createContext({} as ContextProps);

const UserProvider: React.SFC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signUpUser = async (inputData: InputData) => {
    try {
      dispatch(signUpRequest());
      await axios.post('/users/', inputData);
      dispatch(signUpSuccess());
    } catch (error) {
      dispatch(signUpFailuer(error));
    }
  };
  return <UserContext.Provider value={{ state, dispatch, signUpUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
