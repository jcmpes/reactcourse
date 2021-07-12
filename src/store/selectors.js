export const getAuth = (state) => state.auth;

export const getIsLogged = (state) => state.auth.isLogged;

export const getUi = (state) => state.ui

export const getCourseDetail = (state, courseSlug) => 
  state.courses.data.find(item => item.slug === courseSlug)

export const getUI = (state) => state.ui;
