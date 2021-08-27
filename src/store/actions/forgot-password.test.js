import { forgotPasswordSuccess, forgotPasswordAction } from './forgot-password';
import {
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_REQUEST,
} from '../types';

describe('forgotPasswordSuccess', () => {
  test('should return an CATEGORIES_LOAD_SUCCESS action', () => {
    const result = forgotPasswordSuccess();
    expect(result).toEqual({ type: AUTH_FORGOT_PASSWORD_SUCCESS });
  });
});

// ASYNC TEST
describe('categoriesLoadAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = forgotPasswordAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an AUTH_FORGOT_PASSWORD_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({
        type: AUTH_FORGOT_PASSWORD_REQUEST,
      });
    });
  });
});
