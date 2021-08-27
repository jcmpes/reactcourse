import {
  COURSE_CREATE_FAILURE,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
} from '../types';

import { postCourse } from '../../api/courses';
import { toast } from 'react-toastify';

// Course Detail actions
export const courseCreateRequest = () => {
  return {
    type: COURSE_CREATE_REQUEST,
  };
};

export const courseCreateSuccess = () => {
  return {
    type: COURSE_CREATE_SUCCESS,
  };
};

export const courseCreateFailure = (error) => {
  return {
    type: COURSE_CREATE_FAILURE,
    payload: error,
    error: true,
  };
};

// Course Detail middleware
export const courseCreateAction = (courseDetails) => {
  return async function (dispatch, getState) {
    dispatch(courseCreateRequest());
    console.log(courseDetails);
    try {
      const course = await postCourse(courseDetails);
      console.log(course);
      if (course.title) {
        dispatch(courseCreateSuccess());
        return course;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch(courseCreateFailure(err));
    }
  };
};
