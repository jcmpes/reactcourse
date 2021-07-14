import { forgotPasswordSuccess } from './forgot-password';
import { AUTH_FORGOT_PASSWORD_SUCCESS } from '../types';

describe('forgotPasswordSuccess', () => {
  test('should return an AUTH_FORGOT_PASSWORD_SUCCESS action', () => {
    const result = forgotPasswordSuccess();
    expect(result).toEqual({ type: AUTH_FORGOT_PASSWORD_SUCCESS });
  });
});
