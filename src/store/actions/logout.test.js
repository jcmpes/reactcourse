import { authLogout } from './logout';
import { AUTH_LOGOUT } from '../types';

describe('authLogoutRequest', () => {
  test('should return an AUTH_LOGOUT action', () => {
    const result = authLogout();
    expect(result).toEqual({ type: AUTH_LOGOUT });
  });
});
