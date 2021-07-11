export const getAuth = (state) => state.auth;

export const getIsLogged = (state) => state.auth.isLogged;

export const getUi = (state) => state.ui

export const getCourseDetail = (state, courseId) => 
  state.courses.data.find(item => item._id === courseId)
