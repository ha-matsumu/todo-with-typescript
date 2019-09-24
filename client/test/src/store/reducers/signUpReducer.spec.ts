/* eslint-disable no-undef */
import signUpReducer, { initialState } from '../../../../src/store/reducers/signUpReducer';

describe('signUpReducer', () => {
  it('SIGN_UP_REQUESTの確認', () => {
    expect(
      signUpReducer(initialState, {
        type: 'SIGN_UP_REQUEST',
      })
    ).toEqual({
      signingUp: true,
      signedUp: false,
      error: false,
    });
  });

  it('SIGN_UP_SUCCESSの確認', () => {
    expect(
      signUpReducer(initialState, {
        type: 'SIGN_UP_SUCCESS',
      })
    ).toEqual({
      signingUp: false,
      signedUp: true,
      error: false,
    });
  });

  it('SIGN_UP_ERRORの確認', () => {
    expect(
      signUpReducer(initialState, {
        type: 'SIGN_UP_ERROR',
        payload: {
          error: {
            message: 'Sorry, our service is temporaily unavailable.',
            statusCode: 500,
          },
        },
      })
    ).toEqual({
      signingUp: false,
      signedUp: false,
      error: true,
    });
  });
});
