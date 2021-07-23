import { favoritesRequest, favoritesAction } from './favorites';
import { FAVORITES_REQUEST } from '../types';

describe('favoritesRequest', () => {
  test('should return an FAVORITES_REQUEST action', () => {
    const result = favoritesRequest();
    expect(result).toEqual({ type: FAVORITES_REQUEST });
  });
});

// ASYNC TEST
describe('favoritesAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = favoritesAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an FAVORITES_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: FAVORITES_REQUEST });
    });
  });
});
