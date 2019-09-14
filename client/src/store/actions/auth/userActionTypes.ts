import { Action, PayloadAction } from '../../types';

export type SignUpActionTypes =
  | Action<'SIGN_UP_REQUEST'>
  | Action<'SIGN_UP_SUCCESS'>
  | PayloadAction<'SIGN_UP_ERROR', { error: object }>;
