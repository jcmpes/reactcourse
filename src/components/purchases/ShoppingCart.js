import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCart } from '../../store/selectors';
import styles from './ShoppingCart.module.css';
import deleteIcon from '../../assets/svg/delete.svg';

// fake image // TODO: usar imágenes reales
import fakeImg from '../../assets/img/fake-course-img.png';

const ShoppingCart = () => {
  const shoppingCartItems = useSelector(getCart);
  const { t } = useTranslation(['global']);

  return (
    <div className={styles.shoppingCartContainer}>
      {/* course card */}
      {shoppingCartItems.map((course) => (
        <div className={styles.courseCardContainer} key={course.courseTitle}>
          <div className={styles.courseImage}>
            <img src={fakeImg} alt="course" />
          </div>
          <div className={styles.courseDetails}>
            <div className={styles.courseName}>{course.courseTitle}</div>
            <div className={styles.courseDetailsBottom}>
              <img
                className={styles.deleteButton}
                src={deleteIcon}
                // onClick={deleteCourse}
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
        {/* TODO: hacer lógica del botón: redirección, cerrar modal, etc */}
        <button
        // onClick={handleClickBtn}
        >
          {t('shoppint cart.check out')}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
