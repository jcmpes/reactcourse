import { UI_RESET_ERROR } from '../types';

export const setErrorToNull = () => {
  return { type: UI_RESET_ERROR };
};

export const setErrorToNullAction = () => {
  return async function (dispatch, getState) {
    dispatch(setErrorToNull());
  };
};
