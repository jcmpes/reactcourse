import { loadCoursesSuccess } from './load-courses';
import { LOAD_COURSES_SUCCESS } from '../types';

describe('coursesLoadedSuccess', () => {
  test('should return a LOAD_COURSES_SUCCESS action', () => {
    const courses = 'courses';
    const expectedAction = { type: LOAD_COURSES_SUCCESS };
    const result = loadCoursesSuccess(courses);
    expect(result).toEqual(expectedAction);
  });
});
