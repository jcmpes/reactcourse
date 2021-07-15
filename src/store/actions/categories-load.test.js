import { categoriesLoadSuccess } from './categories-load';
import { CATEGORIES_LOAD_SUCCESS } from '../types';

describe('categoriesLoadSuccess', () => {
  test('should return an CATEGORIES_LOAD_SUCCESS action', () => {
    const result = categoriesLoadSuccess();
    expect(result).toEqual({ type: CATEGORIES_LOAD_SUCCESS });
  });
});
