/* eslint-disable no-undef */
// import { useContext } from 'react';
import axios from 'axios';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import MockAdapter from 'axios-mock-adapter';

// import { SignUpContext } from '../../../../src/store/contexts/SignUpContext';
// import { userConstants } from '../../../../src/constants/user';

// const axiosMock = new MockAdapter(axios);
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// const { signUpUser } = useContext(SignUpContext);

// const inputData = {
//   name: 'test',
//   email: 'test@test.com',
//   password: 'Test1234',
//   userRoleId: userConstants.USER_ROLE.NORMAL,
// };

// describe('signUpContext', () => {
//   afterEach(() => {
//     axiosMock.reset();
//   });

//   it('signUpUserの処理確認', () => {
//     const path = '/users/';
//     axiosMock.onPost(path).reply(200, inputData);

//     const expectedActions = [{ type: 'SIGN_UP_REQUEST' }, { type: 'SIGN_UP_SUCCESS' }];
//     const store = mockStore();

//     store.dispatch(signUpUser(inputData)).then(() => {
//       const result = store.getActions();

//       expect(result).toEqual(expectedActions);
//     });
//   });
// });
