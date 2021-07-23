import { loadCoursesSuccess, setFilters } from './load-courses';
import { LOAD_COURSES_SUCCESS, SET_FILTERS_SUCCESS } from '../types';

describe('coursesLoadedSuccess', () => {
  test('should return a LOAD_COURSES_SUCCESS action', () => {
    const courses = 'courses';
    const expectedAction = { type: LOAD_COURSES_SUCCESS };
    const result = loadCoursesSuccess(courses);
    expect(result).toEqual(expectedAction);
  });
});

describe('setFiltersSuccess', () => {
  test('should return an SET_FILTERS_SUCCESS action', () => {
    const result = setFilters();
    expect(result).toEqual({ type: SET_FILTERS_SUCCESS });
  });
});
