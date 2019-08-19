import { UserActionTypes } from './userActionTypes';

export const signInRequest = (): UserActionTypes => ({
  type: 'SIGN_IN_REQUEST',
});

export const signInSuccess = (token: string): UserActionTypes => ({
  type: 'SIGN_IN_SUCCESS',
  payload: { token },
});

export const signInFailuer = (error: object): UserActionTypes => ({
  type: 'SIGN_IN_FAILUER',
  payload: { error },
});
