import { toast } from 'react-toastify';
import {
  FAVORITES_LIST_REQUEST,
  FAVORITES_LIST_SUCCESS,
  FAVORITES_LIST_FAILURE,
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
  UI_RESET_ERROR,
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

export const favoritesListRequest = () => {
  return {
    type: FAVORITES_LIST_REQUEST,
  };
};

export const favoritesListSuccess = () => {
  return {
    type: FAVORITES_LIST_SUCCESS,
  };
};

export const favoritesListFailure = (error) => {
  return {
    type: FAVORITES_LIST_FAILURE,
    payload: error,
    error: true,
  };
};

export const favoritesListAction = (myFavsDetail, setFavs) => {
  return async function (dispatch, getState) {
    dispatch(favoritesListRequest());
    try {
      await myFavsDetail().then((favs) => {
        setFavs(favs);
        dispatch(favoritesListSuccess());
      });
    } catch (error) {
      dispatch(favoritesListFailure(error));
      toast.error(error);
    }
  };
};

export const setErrorToNull = () => {
  return { type: UI_RESET_ERROR };
};

export const setErrorToNullAction = () => {
  return async function (dispatch, getState) {
    dispatch(setErrorToNull());
  };
};
