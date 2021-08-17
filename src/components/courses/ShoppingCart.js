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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <li
            style={{
              width: '100%',
              padding: '10px 0 10px 0',
              borderBottom: '1px solid',
            }}
          >
            {course.courseTitle}: {course.coursePrice}€{' '}
          </li>
          <img
            src={closeImg}
            style={{
              height: '18px',
              backgroundColor: 'white',
              borderRadius: '50px',
              borderStyle: 'solid',
              borderWidth: '2px',
              float: 'right',
              marginRight: '30px',
              padding: '0px',
              cursor: 'pointer',
              position: 'relative',
              top: '15px',
              left: '10px',
            }}
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
      <div
        style={{ marginLeft: '30px', marginRight: '30px', textAlign: 'left' }}
      >
        <div>{coursesElement}</div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '1.2rem' }}>Total: {total} €</div>
          <button
            onClick={checkout}
            disabled={allCourses.length < 1}
            style={{
              float: 'right',
              marginRight: '30px',
              border: 'solid 1px var(--color-mid-grey)',
              padding: '5px 25px',
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            {t('Checkout')}
          </button>
        </div>
      </div>
    )
  );
};

export default ShoppingCart;
