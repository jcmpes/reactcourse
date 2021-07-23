import router from 'next/router';
import { toast } from 'react-toastify';
import { postCourse } from '../../api/courses';
import {
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
} from '../types';

// Create a course actions
export const createCourseRequest = () => {
  return {
    type: CREATE_COURSE_REQUEST,
  };
};

export const createCourseSuccess = () => {
  return {
    type: CREATE_COURSE_SUCCESS,
  };
};

export const createCourseFailure = (error) => {
  return {
    type: CREATE_COURSE_FAILURE,
    payload: error,
    error: true,
  };
};

// Create a course middleware
export const createCourseAction = (courseDetails) => {
  return async function (dispatch, getState) {
    dispatch(createCourseRequest());
    try {
      const result = await postCourse(courseDetails)
      if (result.error === 'no token provided'
        || result.error === 'The token provided is invalid or has expired') {
          toast.error('Invalid token: Log back in and try again');
          return;
        }
        dispatch(createCourseSuccess());
      router.push(`/courses/${result.slug}`);
      toast.success('Success: course has been gracefully created');
    } catch (error) {
      dispatch(createCourseFailure(error));
    }
  };
};