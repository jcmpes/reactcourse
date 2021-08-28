import { categoriesLoadSuccess, categoriesLoadAction } from './categories-load';
import { CATEGORIES_LOAD_SUCCESS, CATEGORIES_LOAD_REQUEST } from '../types';

describe('categoriesLoadSuccess', () => {
  test('should return an CATEGORIES_LOAD_SUCCESS action', () => {
    const result = categoriesLoadSuccess();
    expect(result).toEqual({ type: CATEGORIES_LOAD_SUCCESS });
  });
});

// ASYNC TEST
describe('categoriesLoadAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = categoriesLoadAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an CATEGORIES_LOAD_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: CATEGORIES_LOAD_REQUEST });
    });
  });
});
