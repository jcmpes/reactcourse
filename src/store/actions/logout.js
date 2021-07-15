import { AUTH_LOGOUT } from '../types';

// Log out action
export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
