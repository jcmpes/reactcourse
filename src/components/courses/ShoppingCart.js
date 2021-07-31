import React from 'react';
import { useSelector } from 'react-redux';
import { getCart, totalInChart } from '../../store/selectors';

const ShoppingCart = () => {
  const cart = useSelector(getCart);
  const total = useSelector(totalInChart);

  const coursesElement = cart.map((course) => {
    return (
      <div>
        {course.courseTitle}: {course.coursePrice}€
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
