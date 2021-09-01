import {
  LOAD_COURSES_FAILURE,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  SET_FILTERS_SUCCESS,
} from '../types';

// Load courses actions
export const loadCoursesRequest = () => {
  return {
    type: LOAD_COURSES_REQUEST,
  };
};

export const loadCoursesSuccess = () => {
  return {
    type: LOAD_COURSES_SUCCESS,
  };
};

export const loadCoursesFailure = (error) => {
  return {
    type: LOAD_COURSES_FAILURE,
    payload: error,
    error: true,
  };
};

export const setFilters = (filters) => {
  return {
    type: SET_FILTERS_SUCCESS,
    payload: filters,
  };
};

// Load courses middleware
export const loadCoursesAction = (
  getCourses,
  setCourses,
  filters,
  setAllResultsListed,
  limit,
) => {
  return async function (dispatch, getState) {
    dispatch(loadCoursesRequest());
    try {
      await getCourses(filters).then((results) => {
        setCourses(results);
        if (results && results.length < limit) setAllResultsListed(true);
        dispatch(loadCoursesSuccess());
      });
    } catch (error) {
      dispatch(loadCoursesFailure(error));
    }
  };
};
