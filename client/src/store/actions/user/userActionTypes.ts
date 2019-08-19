import { Action, PayloadAction } from '../../types';

export type UserActionTypes =
  | Action<'SIGN_IN_REQUEST'>
  | PayloadAction<'SIGN_IN_SUCCESS', { token: string }>
  | PayloadAction<'SIGN_IN_FAILUER', { error: object }>;
