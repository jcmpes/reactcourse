import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  //LOAD_COURSES_FAILURE,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  UI_RESET_ERROR,
} from './types';

export const initialState = {
  auth: {
    isLogged: false,
    username: '',
  },
  ui: {
    loading: false,
    error: null,
  },
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return { isLogged: true, username: action.payload };
    case AUTH_LOGOUT:
      return { isLogged: false, username: '' };
    default:
      return state;
  }
}

export function ui(state = initialState.ui, action) {
  // case AUTH_LOGIN_FAILURE managed with if statement
  if (action.error) {
    return { ...state, loading: false, error: action.payload };
  }
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case LOAD_COURSES_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
    case LOAD_COURSES_SUCCESS:
      return { ...state, loading: false };
    case UI_RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
