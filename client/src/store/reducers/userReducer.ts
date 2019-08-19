import { UserActionTypes } from '../actions/user/userActionTypes';

export interface AuthInitialState {
  signingIn: boolean;
  signedIn: boolean;
  token: string | null;
  error: boolean;
}

const token = JSON.parse(localStorage.getItem('token') as string);
export const initialState: AuthInitialState = token
  ? {
      signingIn: false,
      signedIn: true,
      token,
      error: false,
    }
  : {
      signingIn: false,
      signedIn: false,
      token: null,
      error: false,
    };

const userReducer = (state: AuthInitialState, action: UserActionTypes): AuthInitialState => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return {
        ...state,
        signingIn: true,
        signedIn: false,
        error: false,
      };
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        signingIn: false,
        signedIn: true,
        token: action.payload.token,
      };
    case 'SIGN_IN_FAILUER':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default userReducer;
