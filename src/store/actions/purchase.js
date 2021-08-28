import {
  PURCHASE_REQUEST,
  PURCHASE_SUCCESS,
  PURCHASE_FAILURE,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
} from '../types';
import { toast } from 'react-toastify';

// Load courses actions
export const purchaseRequest = () => {
  return {
    type: PURCHASE_REQUEST,
  };
};

export const purchaseSuccess = (courses) => {
  return {
    type: PURCHASE_SUCCESS,
    payload: courses,
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
export const purchaseAction = (courses, history) => {
  return async function (dispatch, getState) {
    dispatch(purchaseRequest());
    try {
      dispatch(purchaseSuccess(courses));
      const options = {
        onClose: () => history.push('/'),
        autoClose: 4000,
      };
      toast.success('Compra realizada con éxito', options);
    } catch (error) {
      dispatch(purchaseFailure(error));
    }
  };
};

export const addToCartSuccess = (course, title, price, image) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: { course, title, price, image },
  };
};

export const addToCartAction = (course, title, price, image) => {
  return async function (dispatch, getState) {
    try {
      dispatch(addToCartSuccess(course, title, price, image));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCartSuccess = (course) => {
  return {
    type: REMOVE_FROM_CART_SUCCESS,
    payload: { course },
  };
};

export const removeFromCartAction = (course) => {
  return async function (dispatch, getState) {
    try {
      dispatch(removeFromCartSuccess(course));
    } catch (error) {
      console.log(error);
    }
  };
};
