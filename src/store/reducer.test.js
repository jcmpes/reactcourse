import { courses, initialState } from './reducers';
import { LOAD_COURSES_SUCCESS, COURSE_DETAIL_SUCCESS } from './types';

describe('courses', () => {
  test('should manage ANY action', () => {
    const state = initialState.courses;
    const action = { type: 'ANY' };
    const nextState = courses(state, action);

    expect(nextState).toBe(state);
  });

  test('should manage LOAD_COURSES_SUCCESS action', () => {
    const state = initialState.courses;
    const action = { type: LOAD_COURSES_SUCCESS, payload: [] };
    const expectedState = {
      ...initialState.courses,
      loaded: false,
      data: action.payload,
    };
    const nextState = courses(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });

  test('should manage COURSE_DETAIL_SUCCESS action', () => {
    const state = initialState.courses;
    const course = {};
    const action = { type: COURSE_DETAIL_SUCCESS, payload: course };
    const expectedState = {
      ...initialState.courses,
      loaded: true,
      data: [...initialState.courses.data, action.payload],
    };
    const nextState = courses(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });
});
