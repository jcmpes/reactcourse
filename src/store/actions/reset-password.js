import {
  AUTH_RESET_PASSWORD_FAILURE,
  AUTH_RESET_PASSWORD_REQUEST,
  AUTH_RESET_PASSWORD_SUCCESS,
} from '../types';

import { resetPassword } from '../../api/auth';

// Reset Password actions
export const resetPasswordRequest = (newPassword) => {
  return {
    type: AUTH_RESET_PASSWORD_REQUEST,
    payload: newPassword,
  };
};

export const resetPasswordSuccess = (newPassword) => {
  return {
    type: AUTH_RESET_PASSWORD_SUCCESS,
    payload: newPassword,
  };
};
export const resetPasswordFailure = (error) => {
  return {
    type: AUTH_RESET_PASSWORD_FAILURE,
    payload: error,
    error: true,
  };
};

// Reset Password middleware
export const resetPasswordAction = (
  resetToken,
  newPassword,
  history,
  location,
) => {
  return async function (dispatch, getState) {
    dispatch(resetPasswordRequest(newPassword));
    try {
      await resetPassword(resetToken, newPassword);
      // Redirect
      const { from } = location.state || { from: { pathname: '/login' } };
      history.replace(from);
      dispatch(resetPasswordSuccess(newPassword));
    } catch (error) {
      dispatch(resetPasswordFailure(error));
    }
  };
};
