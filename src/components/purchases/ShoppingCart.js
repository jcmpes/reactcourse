import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCart } from '../../store/selectors';
import styles from './ShoppingCart.module.css';
import deleteIcon from '../../assets/svg/delete.svg';
import { useHistory } from 'react-router-dom';

// fake image // TODO: usar imágenes reales
import fakeImg from '../../assets/img/fake-course-img.png';

const ShoppingCart = ({ closeModal }) => {
  const history = useHistory();
  const shoppingCartItems = useSelector(getCart);
  const { t } = useTranslation(['global']);

  const handleClickCheckout = () => {
    closeModal();
    history.push('/checkout');
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
            <img style={{ width: "50px", marginRight: "1rem" }} src={course.courseImage} alt=""></img>
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
        <button onClick={handleClickCheckout}>
          {t('shoppint cart.check out')}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
