import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD_REQUEST,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
} from './types';

import { login, register, resetPassword } from '../api/auth';

// Register actions
export const authRegisterRequest = () => {
  return {
    type: AUTH_REGISTER_REQUEST,
  };
};

export const authRegisterSuccess = () => {
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
};

export const authRegisterFailure = (error) => {
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
      await register(credentials);
      // Redirect
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
      dispatch(authRegisterSuccess);
    } catch (error) {
      dispatch(authRegisterFailure);
    }
  };
};

// Log in actions
export const authLoginRequest = (username) => {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload: username,
  };
};

export const authLoginSuccess = (username) => {
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

// Log out action
export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

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
