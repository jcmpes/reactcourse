import { courseDetailSuccess, courseDetailAction } from './course-detail';
import { COURSE_DETAIL_SUCCESS, COURSE_DETAIL_REQUEST } from '../types';

describe('courseDetailSuccess', () => {
  test('should return an COURSE_DETAIL_SUCCESS action', () => {
    const result = courseDetailSuccess();
    expect(result).toEqual({ type: COURSE_DETAIL_SUCCESS });
  });
});

// ASYNC TEST
describe('courseDetailAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = courseDetailAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an COURSE_DETAIL_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: COURSE_DETAIL_REQUEST });
    });
  });
});
