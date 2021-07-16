import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from '../types';

import { login } from '../../api/auth';
import { toast } from 'react-toastify';

// Log in actions
export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
};

export const authLoginSuccess = (userData) => {
  toast.success(`Hello, ${userData.displayName}.`);
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: userData,
  };
};

export const authLoginFailure = (error) => {
  toast.error(`Error: ${error.error}.`);
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
};

// Log in middleware
export const loginAction = (credentials, history, location) => {
  return async function (dispatch, getState) {
    dispatch(authLoginRequest());
    try {
      const userData = await login(credentials);
      if (userData.error) {
        dispatch(authLoginFailure(userData.error));
      } else {
        dispatch(authLoginSuccess(userData));
      }
      // Redirect
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};
