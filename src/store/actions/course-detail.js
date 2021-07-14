import {
  COURSE_DETAIL_FAILURE,
  COURSE_DETAIL_REQUEST,
  COURSE_DETAIL_SUCCESS,
} from '../types';

import { getCourse } from '../../api/courses';
import { getCourseDetail } from '../selectors';

// Course Detail actions
export const courseDetailRequest = () => {
  return {
    type: COURSE_DETAIL_REQUEST,
  };
};

export const courseDetailSuccess = (course) => {
  return {
    type: COURSE_DETAIL_SUCCESS,
    payload: course,
  };
};

export const courseDetailFailure = (error) => {
  return {
    type: COURSE_DETAIL_FAILURE,
    payload: error,
    error: true,
  };
};

// Course Detail middleware
export const courseDetailAction = (courseSlug) => {
  return async function (dispatch, getState) {
    // Use Redux as cache
    const courseCached = getCourseDetail(getState(), courseSlug);
    if (courseCached) {
      return;
    }
    dispatch(courseDetailRequest());
    try {
      const course = await getCourse(courseSlug);
      dispatch(courseDetailSuccess(course));
      return course;
    } catch (err) {
      dispatch(courseDetailFailure(err));
    }
  };
};
