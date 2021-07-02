import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  UI_RESET_ERROR
} from './types';

export const initialState = {
  auth: false,
}

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
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
      return { ...state, loading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
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