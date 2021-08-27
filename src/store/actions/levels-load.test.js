import { levelsLoadSuccess, levelsLoadAction } from './levels-load';
import { LEVELS_LOAD_SUCCESS, LEVELS_LOAD_REQUEST } from '../types';

describe('levelsLoadSuccess', () => {
  test('should return an CATEGORIES_LOAD_SUCCESS action', () => {
    const result = levelsLoadSuccess();
    expect(result).toEqual({ type: LEVELS_LOAD_SUCCESS });
  });
});

// ASYNC TEST
describe('levelsLoadAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = levelsLoadAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an LEVELS_LOAD_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: LEVELS_LOAD_REQUEST });
    });
  });
});
