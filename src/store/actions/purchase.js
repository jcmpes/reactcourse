import { PURCHASE_REQUEST, PURCHASE_SUCCESS, PURCHASE_FAILURE } from '../types';
import { purchase } from '../../api/purchases';
import { toast } from 'react-toastify';

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
  return async function (dispatch, getState) {
    const isLogged = getState.isLogged;
    if (isLogged) dispatch(purchaseRequest());
    else {
      toast.warning(
        "You must be logged in order to purchase a course. Please, login or register if you don't have an account.",
      );
      return;
    }
    try {
      await purchase(courses, paymentCode);
      console.log('hola');
      dispatch(purchaseSuccess(courses));
    } catch (error) {
      console.log(error);
      dispatch(purchaseFailure(error));
    }
  };
};
