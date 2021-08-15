import { getCategoriesApiCall } from '../../api/courses';
import {
  CATEGORIES_LOAD_FAILURE,
  CATEGORIES_LOAD_REQUEST,
  CATEGORIES_LOAD_SUCCESS,
} from '../types';

// Tags load actions
export const categoriesLoadRequest = () => {
  return {
    type: CATEGORIES_LOAD_REQUEST,
  };
};

export const categoriesLoadSuccess = (categories) => {
  return {
    type: CATEGORIES_LOAD_SUCCESS,
    payload: categories,
  };
};

export const categoriesLoadFailure = (error) => {
  return {
    type: CATEGORIES_LOAD_FAILURE,
    payload: error,
    error: true,
  };
};

export const categoriesLoadAction = () => {
  return async function (dispatch, getState) {
    dispatch(categoriesLoadRequest());
    try {
      const categories = await getCategoriesApiCall();
      dispatch(categoriesLoadSuccess(categories));
      return categories;
    } catch (err) {
      dispatch(categoriesLoadFailure(err));
    }
  };
};
