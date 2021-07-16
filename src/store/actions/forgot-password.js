import {
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
} from '../types';

import { forgotPassword } from '../../api/auth';
import { toast } from 'react-toastify';

// Forgot Password actions
export const forgotPasswordRequest = (email) => {
  return {
    type: AUTH_FORGOT_PASSWORD_REQUEST,
  };
};

export const forgotPasswordSuccess = () => {
  return {
    type: AUTH_FORGOT_PASSWORD_SUCCESS,
  };
};

export const forgotPasswordFailure = (error) => {
  return {
    type: AUTH_FORGOT_PASSWORD_FAILURE,
    payload: error,
    error: true,
  };
};

// Forgot Password middleware
export const forgotPasswordAction = (email, history) => {
  return async function (dispatch, getState) {
    dispatch(forgotPasswordRequest());
    try {
      await forgotPassword(email);
      toast.success(
        'You will receive an email if this email address is in our database',
      );
      history.push('/login');
      dispatch(forgotPasswordSuccess());
    } catch (error) {
      dispatch(forgotPasswordFailure(error));
    }
  };
};
