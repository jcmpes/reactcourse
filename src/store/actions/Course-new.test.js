import { courseCreateSuccess, courseCreateAction } from './course-new';
import { COURSE_CREATE_SUCCESS, COURSE_CREATE_REQUEST } from '../types';

describe('courseCreateSuccess', () => {
  test('should return an COURSE_CREATE_SUCCESS action', () => {
    const result = courseCreateSuccess();
    expect(result).toEqual({ type: COURSE_CREATE_SUCCESS });
  });
});

describe('courseCreateAction', () => {
  describe('when login api resolves', () => {
    const courseSlug = 'courseSlug';
    const action = courseCreateAction(courseSlug);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an COURSE_CREATE_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: COURSE_CREATE_REQUEST });
    });
  });
});
