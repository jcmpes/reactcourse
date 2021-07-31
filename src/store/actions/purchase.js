import {
  PURCHASE_REQUEST,
  PURCHASE_SUCCESS,
  PURCHASE_FAILURE,
  ADD_TO_CART_SUCCESS,
} from '../types';
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
  return async function (dispatch, getState) {
    dispatch(purchaseRequest());
    try {
      await purchase(courses, paymentCode);
      dispatch(purchaseSuccess(courses));
    } catch (error) {
      dispatch(purchaseFailure(error));
    }
  };
};

export const addToCartSuccess = (course, title, price) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: { course, title, price },
  };
};

export const addToCartAction = (course, title, price) => {
  return async function (dispatch, getState) {
    try {
      dispatch(addToCartSuccess(course, title, price));
    } catch (error) {
      console.log(error);
    }
  };
};
