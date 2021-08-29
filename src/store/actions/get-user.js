import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USERNAME,
} from '../types';

import { whoAmI } from '../../api/auth';
// Get User actions
export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  };
};

export const getUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
};

export const getUserFailure = (error) => {
  return {
    type: GET_USER_FAILURE,
    payload: error,
    error: true,
  };
};

// Get User middleware
export const getUserAction = (username, history) => {
  return async function (dispatch, getState) {
    dispatch(getUserRequest());
    try {
      const user = await whoAmI();
      dispatch(getUserSuccess(user));
      history.push(user.username ? `/user/${user.username}` : `/login`);
    } catch (error) {
      dispatch(getUserFailure());
    }
  };
};

export const updateUsernameSuccess = (username) => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};
export const updateUsernameAction = (username) => {
  return async function (dispatch, getState) {
    dispatch(updateUsernameSuccess(username));
  };
};
