import {
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from '../types';

import { toast } from 'react-toastify';
import { register } from '../../api/auth';

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
  toast.error(`Error: ${error}.`);
  return {
    type: AUTH_REGISTER_FAILURE,
    payload: error,
    error: true,
  };
};

// Register middleware
export const registerAction = (credentials, history, location) => {
  return async function (dispatch, getState) {
    dispatch(authRegisterRequest());
    try {
      const response = await register(credentials);
      if (response.error) {
        dispatch(authRegisterFailure(response.error));
      } else if (response.success) {
        toast.success('Registration successful');
        dispatch(authRegisterSuccess());
        // Redirect
        const { from } = location.state || { from: { pathname: '/login' } };
        history.replace(from);
      }
    } catch (error) {
      dispatch(authRegisterFailure(error));
    }
  };
};
