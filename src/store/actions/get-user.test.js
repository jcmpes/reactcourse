import { getUserSuccess, getUserAction } from './get-user';
import { GET_USER_SUCCESS, GET_USER_REQUEST } from '../types';

describe('getUserSuccess', () => {
  test('should return an GET_USER_SUCCESS action', () => {
    const result = getUserSuccess();
    expect(result).toEqual({ type: GET_USER_SUCCESS });
  });
});

// ASYNC TEST
describe('getUserAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = getUserAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an GET_USER_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: GET_USER_REQUEST });
    });
  });
});
