import { PURCHASE_REQUEST, PURCHASE_SUCCESS, PURCHASE_FAILURE } from '../types';
import { purchase } from '../../api/purchases';

// Load courses actions
export const purchaseRequest = () => {
  return {
    type: PURCHASE_REQUEST,
  };
};

export const purchaseSuccess = (course) => {
  return {
    type: PURCHASE_SUCCESS,
    payload: { course },
  };
};

export const purchaseFailure = (error) => {
  return {
    type: PURCHASE_FAILURE,
    payload: error,
    error: true,
  };
};

// Load courses middleware
export const purchaseAction = (courses, paymentCode) => {
  console.log('hola');
  return async function (dispatch, getState) {
    dispatch(purchaseRequest());
    try {
      purchase(courses, paymentCode).then(() => {
        dispatch(purchaseSuccess(courses));
      });
    } catch (error) {
      dispatch(purchaseFailure(error));
    }
  };
};
