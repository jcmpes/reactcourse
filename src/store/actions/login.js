import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from '../types';

import { login } from '../../api/auth';
import { toast } from 'react-toastify';

// Log in actions
export const authLoginRequest = (username) => {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload: username,
  };
};

export const authLoginSuccess = (username) => {
  toast.success(`Hello, ${username.displayName}.`);
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: username,
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
      const username = await login(credentials);
      if (username.error) {
        dispatch(authLoginFailure(username.error));
      } else {
        dispatch(authLoginSuccess(username));
      }
      // Redirect
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};
