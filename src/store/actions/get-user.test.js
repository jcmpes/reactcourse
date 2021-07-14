import { getUserSuccess } from './get-user';
import { GET_USER_SUCCESS } from '../types';

describe('userLoadedSuccess', () => {
  test('should return a GET_USER_SUCCESS action', () => {
    const expectedAction = { type: GET_USER_SUCCESS };
    const result = getUserSuccess();
    expect(result).toEqual(expectedAction);
  });
});
