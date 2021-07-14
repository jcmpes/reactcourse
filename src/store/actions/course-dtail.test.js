import { courseDetailSuccess } from './course-detail';
import { COURSE_DETAIL_SUCCESS } from '../types';

describe('courseDetailSuccess', () => {
  test('should return an COURSE_DETAIL_SUCCESS action', () => {
    const result = courseDetailSuccess();
    expect(result).toEqual({ type: COURSE_DETAIL_SUCCESS });
  });
});
