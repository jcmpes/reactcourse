import React from 'react';
import { useSelector } from 'react-redux';
import { getCart, totalInChart, getIdsInCart } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import {
  removeFromCartAction,
  purchaseAction,
} from '../../store/actions/purchase';
import closeImg from '../../assets/svg/close.svg';
import { useTranslation } from 'react-i18next';

const ShoppingCart = ({ closeModal }) => {
  const { t } = useTranslation(['global']);
  const cart = useSelector(getCart);
  const total = useSelector(totalInChart);
  const allCourses = useSelector(getIdsInCart);
  const dispatch = useDispatch();
  const removeItem = (event) => {
    dispatch(removeFromCartAction(event.target.id));
  };

  const checkout = () => {
    dispatch(purchaseAction(allCourses, '123456'));
    closeModal();
  };

  const coursesElement = cart.map((course) => {
    return (
      <div key={course.courseId}>
        <div>
          <li>
            {course.courseTitle}: {course.coursePrice}€{' '}
          </li>
          <img
            src={closeImg}
            alt=""
            id={course.courseId}
            onClick={removeItem}
          />
        </div>
      </div>
    );
  });

  return (
    allCourses.length > 0 && (
      <div>
        <div>{coursesElement}</div>
        <br />
        <div>
          <div>
            Total:&nbsp;
            <strong>{total} €</strong>
          </div>
          <button onClick={checkout} disabled={allCourses.length < 1}>
            {t('Checkout')}
          </button>
        </div>
      </div>
    )
  );
};

export default ShoppingCart;
