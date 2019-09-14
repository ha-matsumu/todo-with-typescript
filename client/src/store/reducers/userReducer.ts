import { SignUpActionTypes } from '../actions/auth/userActionTypes';

export interface SignUpInitialState {
  signingUp: boolean;
  signedUp: boolean;
  error: boolean;
}

export const initialState: SignUpInitialState = {
  signingUp: false,
  signedUp: false,
  error: false,
};

const userReducer = (state: SignUpInitialState, action: SignUpActionTypes): SignUpInitialState => {
  switch (action.type) {
    case 'SIGN_UP_REQUEST':
      return {
        ...state,
        signingUp: true,
        signedUp: false,
        error: false,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        signingUp: false,
        signedUp: true,
      };
    case 'SIGN_UP_ERROR':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default userReducer;
