import { resetPasswordSuccess } from './reset-password';
import { AUTH_RESET_PASSWORD_SUCCESS } from '../types';

describe('resetPasswordSuccess', () => {
  test('should return an AUTH_RESET_PASSWORD_SUCCESS action', () => {
    const result = resetPasswordSuccess();
    expect(result).toEqual({ type: AUTH_RESET_PASSWORD_SUCCESS });
  });
});
