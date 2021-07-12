import { authLoginRequest, loadCoursesSuccess, loginAction } from './actions';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  LOAD_COURSES_SUCCESS,
} from './types';

describe('authLoginRequest', () => {
  test('should return an AUTH_LOGIN_REQUEST action', () => {
    const result = authLoginRequest();
    expect(result).toEqual({ type: AUTH_LOGIN_REQUEST });
  });
});

describe('coursesLoadedSuccess', () => {
  test('should return a LOAD_COURSES_SUCCESS action', () => {
    const courses = 'courses';
    const expectedAction = { type: LOAD_COURSES_SUCCESS };
    const result = loadCoursesSuccess(courses);
    expect(result).toEqual(expectedAction);
  });
});

// ASYNC TEST
describe('loginAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = loginAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an AUTH_LOGIN_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
    });
  });
});
