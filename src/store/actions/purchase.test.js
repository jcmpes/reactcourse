import { purchaseAction, purchaseSuccess } from './purchase';
import { PURCHASE_REQUEST, PURCHASE_SUCCESS } from '../types';

describe('purchaseSuccess', () => {
  test('should return an PURCHASE_SUCCESS action', () => {
    const result = purchaseSuccess();
    expect(result).toEqual({ type: PURCHASE_SUCCESS });
  });
});

describe('purchaseAction', () => {
  describe('when login api resolves', () => {
    const course = 'courses';
    const action = purchaseAction(course);
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an PURCHASE_REQUEST action', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: PURCHASE_REQUEST });
    });
  });
});
