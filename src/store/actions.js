import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD_REQUEST,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
  COURSE_DETAIL_REQUEST,
  COURSE_DETAIL_SUCCESS,
  COURSE_DETAIL_FAILURE,
  COURSES_LOAD_REQUEST,
  COURSES_LOAD_SUCCESS,
  COURSES_LOAD_FAILURE,
} from './types';

import { login, register, forgotPassword, resetPassword } from '../api/auth';
import { toast } from 'react-toastify';
import { getCourseDetail } from './selectors';
import { getCourse, getCourses } from '../api/courses';

// Register actions
export const authRegisterRequest = () => {
  return {
    type: AUTH_REGISTER_REQUEST,
  };
};

export const authRegisterSuccess = () => {
  toast.success('Registration successful');
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
};

export const authRegisterFailure = (error) => {
  toast.error('Registration failure', error);
  return {
    type: AUTH_REGISTER_FAILURE,
    payload: error,
    error: true,
  };
};

// Register middleware
export const registerAction = (credentials, history, location) => {
  return async function (dispatch, getState) {
    dispatch(authRegisterRequest());
    try {
      const response = await register(credentials);
      // Control when server responds with an error
      if (!response.error) {
        // Redirect
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
        dispatch(authRegisterSuccess());
      }
    } catch (error) {
      dispatch(authRegisterFailure());
    }
  };
};

// Log in actions
export const authLoginRequest = (username) => {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload: username,
  };
};

export const authLoginSuccess = (username) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: username,
  };
};

export const authLoginFailure = (error) => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
};

// Log in middleware
export const loginAction = (credentials, history, location) => {
  return async function (dispatch, getState) {
    dispatch(authLoginRequest());
    try {
      const username = await login(credentials);
      dispatch(authLoginSuccess(username));
      // Redirect
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

// Forgot Password actions
export const forgotPasswordRequest = (email) => {
  return {
    type: AUTH_FORGOT_PASSWORD_REQUEST,
  };
};

export const forgotPasswordSuccess = () => {
  return {
    type: AUTH_FORGOT_PASSWORD_SUCCESS,
  };
};

export const forgotPasswordFailure = (error) => {
  return {
    type: AUTH_FORGOT_PASSWORD_FAILURE,
    payload: error,
    error: true,
  };
};

// Forgot Password middleware
export const forgotPasswordAction = (email) => {
  return async function (dispatch, getState) {
    dispatch(forgotPasswordRequest());
    try {
      const response = await forgotPassword(email);
      console.log(response);
      dispatch(forgotPasswordSuccess());
    } catch (error) {
      dispatch(forgotPasswordFailure(error));
    }
  };
};

// Log out action
export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

// Reset Password actions
export const resetPasswordRequest = (newPassword) => {
  return {
    type: AUTH_RESET_PASSWORD_REQUEST,
    payload: newPassword,
  };
};

export const resetPasswordSuccess = (newPassword) => {
  return {
    type: AUTH_RESET_PASSWORD_SUCCESS,
    payload: newPassword,
  };
};
export const resetPasswordFailure = (error) => {
  return {
    type: AUTH_RESET_PASSWORD_FAILURE,
    payload: error,
    error: true,
  };
};

// Reset Password middleware
export const resetPasswordAction = (
  resetToken,
  newPassword,
  history,
  location,
) => {
  return async function (dispatch, getState) {
    dispatch(resetPasswordRequest(newPassword));
    try {
      await resetPassword(resetToken, newPassword);
      // Redirect
      const { from } = location.state || { from: { pathname: '/login' } };
      history.replace(from);
      dispatch(resetPasswordSuccess(newPassword));
    } catch (error) {
      dispatch(resetPasswordFailure(error));
    }
  };
};

// Load Courses actions
export const coursesLoadRequest = () => {
  return {
    type: COURSES_LOAD_REQUEST,
  };
};

export const coursesLoadSuccess = () => {
  return {
    type: COURSES_LOAD_SUCCESS,
  };
};

export const coursesLoadFailure = (error) => {
  return {
    type: COURSES_LOAD_FAILURE,
    payload: error,
    error: true,
  };
};

export const coursesLoadAction = () => {
  return async function(dispatch, getState) {
    dispatch(coursesLoadRequest());
    try {
      const courses = await getCourses();
      dispatch(coursesLoadSuccess());
      return courses;
    } catch (err) {
      dispatch(coursesLoadFailure(err));
    }
  }
}

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

export const courseDetailAction = (courseId) => {
  return async function(dispatch, getState) {
    // Use Redux as cache
    const courseCached = getCourseDetail(getState(), courseId);
    if (courseCached) {
      return
    };
    dispatch(courseDetailRequest());
    try {
      const course = await getCourse(courseId);
      dispatch(courseDetailSuccess(course));
      return course;
    } catch (err) {
      dispatch(courseDetailFailure(err));
    }
  }
}
