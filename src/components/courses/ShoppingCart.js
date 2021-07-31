import React from 'react';
import { useSelector } from 'react-redux';
import { getCart, totalInChart } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import { removeFromCartAction } from '../../store/actions/purchase';

const ShoppingCart = () => {
  const cart = useSelector(getCart);
  const total = useSelector(totalInChart);
  const dispatch = useDispatch();
  const removeItem = (event) => {
    dispatch(removeFromCartAction(event.target.id));
  };

  const coursesElement = cart.map((course) => {
    return (
      <div>
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
      <button>Checkout</button>
    </>
  );
};

export default ShoppingCart;
