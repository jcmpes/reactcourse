import { authRegisterRequest, registerAction } from './register';
import { AUTH_REGISTER_REQUEST } from '../types';

describe('authRegisterRequest', () => {
  test('should return an AUTH_REGISTER_REQUEST action', () => {
    const result = authRegisterRequest();
    expect(result).toEqual({ type: AUTH_REGISTER_REQUEST });
  });
});

describe('registerAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = registerAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an AUTH_REGISTER_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_REGISTER_REQUEST });
    });
  });
});
