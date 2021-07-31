import React from 'react';
import { useSelector } from 'react-redux';
import { getCart, totalInChart, getIdsInCart } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import {
  removeFromCartAction,
  purchaseAction,
} from '../../store/actions/purchase';

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
    <>
      <div>{coursesElement}</div>
      <div>Total: {total} €</div>
      <button onClick={checkout}>Checkout</button>
    </>
  );
};

export default ShoppingCart;
