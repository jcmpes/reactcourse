import { getLevelsApiCall } from '../../api/courses';
import {
  LEVELS_LOAD_FAILURE,
  LEVELS_LOAD_REQUEST,
  LEVELS_LOAD_SUCCESS,
} from '../types';

// Tags load actions
export const levelsLoadRequest = () => {
  return {
    type: LEVELS_LOAD_REQUEST,
  };
};

export const levelsLoadSuccess = (levels) => {
  return {
    type: LEVELS_LOAD_SUCCESS,
    payload: levels,
  };
};

export const levelsLoadFailure = (error) => {
  return {
    type: LEVELS_LOAD_FAILURE,
    payload: error,
    error: true,
  };
};

export const levelsLoadAction = () => {
  return async function (dispatch, getState) {
    dispatch(levelsLoadRequest());
    try {
      const levels = await getLevelsApiCall();
      dispatch(levelsLoadSuccess(levels));
      console.log('***levels***', levels);
      return levels;
    } catch (err) {
      console.log('***error***', err);
      dispatch(levelsLoadFailure(err));
    }
  };
};
