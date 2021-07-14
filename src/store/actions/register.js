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
  toast.success('Registration successful');
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
};

export const authRegisterFailure = (error) => {
  toast.error(`Registration failure: 
  ${error}`);
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
      // Control when server responds with an error
      if (!response.error) {
        // Redirect
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
        dispatch(authRegisterSuccess());
      } else {
        dispatch(authRegisterFailure(response.error));
      }
    } catch (error) {
      dispatch(authRegisterFailure(error));
    }
  };
};
