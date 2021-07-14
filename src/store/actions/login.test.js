import { authLoginRequest, loginAction } from './login';
import { AUTH_LOGIN_REQUEST } from '../types';

describe('authLoginRequest', () => {
  test('should return an AUTH_LOGIN_REQUEST action', () => {
    const result = authLoginRequest();
    expect(result).toEqual({ type: AUTH_LOGIN_REQUEST });
  });
});

// ASYNC TEST
describe('loginAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = loginAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an AUTH_LOGIN_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
    });
  });
});
