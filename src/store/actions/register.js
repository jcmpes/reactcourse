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
  toast.error(`Registration failure: 
  ${error}.`);
  return {
    type: AUTH_REGISTER_FAILURE,
    payload: error,
    error: true,
  };
};

// Register middleware
export const registerAction = (
  credentials,
  passwordsMatch,
  history,
  location,
) => {
  return async function (dispatch, getState) {
    dispatch(authRegisterRequest());
    try {
      const response = await register(credentials);
      console.log('* try');
      console.log('response ->', response);
      console.log('response.error ->', response.error);
      console.log('response.message ->', response.message);

      if (response.error) {
        console.log('* if');
        dispatch(authRegisterFailure(response.error));
      } else if (response.success) {
        console.log('* else 2');
        console.log('response', response);
        dispatch(authRegisterSuccess());
        toast.success('Registration successful');
        // Redirect
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      }
    } catch (error) {
      dispatch(authRegisterFailure(error));
    }
  };
};
