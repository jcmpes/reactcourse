import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  CATEGORIES_LOAD_REQUEST,
  CATEGORIES_LOAD_SUCCESS,
  COURSE_DETAIL_REQUEST,
  COURSE_DETAIL_SUCCESS,
  //FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  //LOAD_COURSES_FAILURE,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  UI_RESET_ERROR,
  SET_FILTERS_SUCCESS,
} from './types';

export const initialState = {
  auth: {
    isLogged: false,
    username: '',
    favs: [],
  },
  courses: {
    loaded: false,
    data: [],
    filters: {},
  },
  categories: {
    loaded: false,
    data: [],
  },
  ui: {
    loading: false,
    error: null,
  },
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        isLogged: true,
        username: action.payload.displayName,
        favs: action.payload.favs,
      };
    case AUTH_LOGOUT:
      return { isLogged: false, username: null, favs: [] };
    case FAVORITES_SUCCESS:
      if (action.payload.add) {
        return { ...state, favs: [...state.favs, action.payload.course] };
      } else {
        const favs = state.favs.filter((fav) => {
          return fav !== action.payload.course;
        });
        console.log();
        return {
          ...state,
          favs,
        };
      }
    default:
      return state;
  }
}

export function categories(state = initialState.categories, action) {
  switch (action.type) {
    case CATEGORIES_LOAD_REQUEST:
      return { ...state, loaded: false };
    case CATEGORIES_LOAD_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function courses(state = initialState.courses, action) {
  switch (action.type) {
    case COURSE_DETAIL_REQUEST:
      return { ...state, loaded: false };
    case COURSE_DETAIL_SUCCESS:
      return { ...state, loaded: true, data: [...state.data, action.payload] };
    case SET_FILTERS_SUCCESS:
      return { ...state, filters: action.payload };
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
      //case FAVORITES_REQUEST:
      return { ...state, loading: true, error: null };
    case COURSE_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case COURSE_DETAIL_SUCCESS:
      return { ...state, loading: false };
    case AUTH_LOGIN_SUCCESS:
    case LOAD_COURSES_SUCCESS:
      //case FAVORITES_SUCCESS:
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
