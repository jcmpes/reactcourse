import { API_CALL_FAILURE, API_CALL_REQUEST, API_CALL_SUCCESS } from '../types';

// Tags load actions
export const apiCallRequest = () => {
  return {
    type: API_CALL_REQUEST,
  };
};

export const apiCallSuccess = () => {
  return {
    type: API_CALL_SUCCESS,
  };
};

export const apiCallFailure = (error) => {
  return {
    type: API_CALL_FAILURE,
    payload: error,
    error: true,
  };
};

export const apiCallLoadAction = (apiCall, afterApiCall) => {
  return async function (dispatch, getState) {
    dispatch(apiCallRequest());
    try {
      apiCall().then(afterApiCall);
      dispatch(apiCallSuccess());
    } catch (err) {
      dispatch(apiCallFailure(err));
    }
  };
};
