import React from 'react';
import { useSelector } from 'react-redux';
import { getCart, totalInChart, getIdsInCart } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import {
  removeFromCartAction,
  purchaseAction,
} from '../../store/actions/purchase';

require('dotenv').config();

const ShoppingCart = () => {
  const cart = useSelector(getCart);
  const total = useSelector(totalInChart);
  const allCourses = useSelector(getIdsInCart);
  const dispatch = useDispatch();
  const removeItem = (event) => {
    dispatch(removeFromCartAction(event.target.id));
  };

  const checkout = () => {
    dispatch(purchaseAction(allCourses, '123456'));
  };

  const makePayment = (token) => {
    const body = {
      token,
      cart,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        const { status } = response;
        console.log('STATUS: ', status);
      })
      .catch((err) => console.log(err));
  };

  const coursesElement = cart.map((course) => {
    return (
      <div key={course.courseId}>
        {course.courseTitle}: {course.coursePrice}€{' '}
        <button id={course.courseId} onClick={removeItem}>
          Remove
        </button>
      </div>
    );
  });
  return (
    allCourses.length > 0 && (
      <>
        <div>{coursesElement}</div>
        <div>Total: {total} €</div>
        <button onClick={checkout} disabled={allCourses.length < 1}>
          Checkout
        </button>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
          token={makePayment}
          name='sample order'
          amount={total * 100}
        >
          <button className="btn-large pink">Buy for {total}$</button>
        </StripeCheckout>
      </>
    )
  );
};

export default ShoppingCart;
