import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../store/selectors';
import styles from './ShoppingCart.module.css';
import deleteIcon from '../../assets/svg/delete.svg';
import { useHistory } from 'react-router-dom';
import { removeFromCartAction } from '../../store/actions/purchase';

const ShoppingCart = ({ closeModal }) => {
  const history = useHistory();
  const shoppingCartItems = useSelector(getCart);
  const dispatch = useDispatch();
  const { t } = useTranslation(['global']);
  const removeItem = (event) => {
    dispatch(removeFromCartAction(event.target.id));
  };

  const handleClickCheckout = () => {
    closeModal();
    history.push('/checkout');
  };

  return (
    <div className={styles.shoppingCartContainer}>
      {/* course card */}
      {shoppingCartItems.map((course) => (
        <div className={styles.courseCardContainer} key={course.courseTitle}>
          <div className={styles.courseImage}>
            <img src={course.courseImage} alt="course" />
          </div>
          <div className={styles.courseDetails}>
            <div className={styles.courseName}>{course.courseTitle}</div>
            <div className={styles.courseDetailsBottom}>
              <img
                className={styles.deleteButton}
                src={deleteIcon}
                id={course.courseId}
                onClick={removeItem}
                alt="delete course icon"
              />
              <div className={styles.coursePrice}>
                {course.coursePrice.toFixed(2).replace('.', t('decimals'))} €
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* total price */}
      <div className={styles.priceContainer}>
        <div className={styles.priceText}>Total</div>
        <div className={styles.priceNumber}>
          {shoppingCartItems
            .map((price) => price.coursePrice)
            .reduce((price, total) => price + total)
            .toFixed(2)
            .replace('.', t('decimals'))}{' '}
          €
        </div>
      </div>
      {/*  checkout button */}
      <div className={styles.checkOutContainer}>
        <button onClick={handleClickCheckout}>
          {t('shoppint cart.check out')}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
