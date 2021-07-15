import { resetClient } from '../../api/client';
import { AUTH_LOGOUT } from '../types';

// Log out action
export const authLogout = () => {
  resetClient()
  return {
    type: AUTH_LOGOUT,
  };
};
