import {
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
} from '../types';

// Load courses actions
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

// Load courses middleware
export const favoritesAction = (course, favAction, add) => {
  return async function (dispatch, getState) {
    dispatch(favoritesRequest());
    try {
      console.log(course);

      favAction(course, add).then(() => {
        dispatch(favoritesSuccess(course, add));
      });
    } catch (error) {
      dispatch(favoritesFailure(error));
    }
  };
};
