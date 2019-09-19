import { SignUpActionTypes } from './signUpActionTypes';

export const signUpRequest = (): SignUpActionTypes => ({
  type: 'SIGN_UP_REQUEST',
});

export const signUpSuccess = (): SignUpActionTypes => ({
  type: 'SIGN_UP_SUCCESS',
});

export const signUpFailuer = (error: object): SignUpActionTypes => ({
  type: 'SIGN_UP_ERROR',
  payload: { error },
});
