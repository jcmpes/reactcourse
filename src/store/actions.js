import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_LOGOUT,
} from './types';

import { login, register, forgotPassword } from '../api/auth';
import { toast } from 'react-toastify';


// Register actions
export const authRegisterRequest = () => {
  return {
    type: AUTH_REGISTER_REQUEST,
  };
};

export const authRegisterSuccess = () => {
  toast.success('Registration successful')
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
};

export const authRegisterFailure = (error) => {
  toast.error('Registration failure', error)
  return {
    type: AUTH_REGISTER_FAILURE,
    payload: error,
    error: true,
  };
};

// Register middleware
export const registerAction = (credentials, history, location) => {
  return async function (dispatch, getState) {
    dispatch(authRegisterRequest);
    try {
      const response = await register(credentials);
      // Control when server responds with an error
      if (!response.error) {
        // Redirect
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
        dispatch(authRegisterSuccess);
      }
    } catch (error) {
      dispatch(authRegisterFailure);
    }
  };
};

// Log in actions
export const authLoginRequest = username => {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload: username,
  };
};

export const authLoginSuccess = username => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: username,
  };
};

export const authLoginFailure = (error) => {
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
      dispatch(authLoginSuccess(username));
      // Redirect
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

// Forgot Password actions
export const forgotPasswordRequest = email => {
  return {
    type: AUTH_FORGOT_PASSWORD_REQUEST,
  };
};

export const forgotPasswordSuccess = () => {
  return {
    type: AUTH_FORGOT_PASSWORD_SUCCESS,
  };
};

export const forgotPasswordFailure = error => {
  return {
    type: AUTH_FORGOT_PASSWORD_FAILURE,
    payload: error,
    error: true,
  };
};

// Forgot Password middleware
export const forgotPasswordAction = email => {
  return async function (dispatch, getState) {
    dispatch(forgotPasswordRequest());
    try {
      const response = await forgotPassword(email);
      console.log(response);
      dispatch(forgotPasswordSuccess());
    } catch (error) {
      dispatch(forgotPasswordFailure(error));
    }
  };
};

// Log out action
export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
