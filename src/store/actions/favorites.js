import { toast } from 'react-toastify';
import {
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
} from '../types';

export const favoritesRequest = () => {
  return {
    type: FAVORITES_REQUEST,
  };
};

export const favoritesSuccess = (course, add) => {
  return {
    type: FAVORITES_SUCCESS,
    payload: { course, add },
  };
};

export const favoritesFailure = (error) => {
  return {
    type: FAVORITES_FAILURE,
    payload: error,
    error: true,
  };
};

export const favoritesAction = (course, favAction, add) => {
  return async function (dispatch, getState) {
    dispatch(favoritesRequest());
    try {
      favAction(course, add).then(() => {
        dispatch(favoritesSuccess(course, add));
      });
    } catch (error) {
      dispatch(favoritesFailure(error));
      toast.error(error);
    }
  };
};
