import {
  LOAD_COURSES_FAILURE,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
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

// Load courses middleware
export const loadCoursesAction = (getCourses, setCourses) => {
  return async function (dispatch, getState) {
    dispatch(loadCoursesRequest());
    try {
      getCourses()
        .then(setCourses)
        .then(() => {
          dispatch(loadCoursesSuccess());
        });
    } catch (error) {
      dispatch(loadCoursesFailure(error));
    }
  };
};
