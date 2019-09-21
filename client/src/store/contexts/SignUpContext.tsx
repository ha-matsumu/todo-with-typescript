import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import userReducer, { SignUpInitialState, initialState } from '../reducers/signUpReducer';
import { SignUpActionTypes } from '../actions/auth/signUp/signUpActionTypes';
import { signUpFailuer, signUpRequest, signUpSuccess } from '../actions/auth/signUp/signUpActionCreator';

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

const SignUpContext = createContext({} as ContextProps);

const SignUpProvider: React.SFC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signUpUser = async (inputData: InputData) => {
    try {
      dispatch(signUpRequest());
      await axios.post('/users/', {
        ...inputData,
        userRoleId: 2,
      });
      dispatch(signUpSuccess());
    } catch (error) {
      dispatch(signUpFailuer(error));

      // TODO:後でエラーメッセージ表示処理の実装
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };
  return <SignUpContext.Provider value={{ state, dispatch, signUpUser }}>{children}</SignUpContext.Provider>;
};

export { SignUpContext, SignUpProvider };
