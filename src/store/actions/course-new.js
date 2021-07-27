import {
  COURSE_CREATE_FAILURE,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
} from '../types';

import { getCourse, postCourse } from '../../api/courses';

// Course Detail actions
export const courseCreateRequest = () => {
  return {
    type: COURSE_CREATE_REQUEST,
  };
};

export const courseCreateSuccess = (course) => {
  return {
    type: COURSE_CREATE_SUCCESS,
    payload: course,
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
export const courseCreateAction = (courseSlug) => {
  return async function (dispatch, getState) {
    dispatch(courseCreateRequest());
    try {
      const course = await postCourse(courseSlug);
      dispatch(courseCreateSuccess(course));
      return course;
    } catch (err) {
      dispatch(courseCreateFailure(err));
    }
  }
}