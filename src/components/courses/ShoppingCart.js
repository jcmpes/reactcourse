import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCart } from '../../store/selectors';
import styles from './ShoppingCart.module.css';
import deleteIcon from '../../assets/svg/delete.svg';

////////// fake images for development
import fakeImg from '../../assets/img/fake-course-img.png';

const ShoppingCart = () => {
  const { t } = useTranslation(['global']);
  const shoppingCartItems = useSelector(getCart);
  // console.log(shoppingCartItems);

  return (
    <div className={styles.shoppingCartContainer}>
      {shoppingCartItems.map((course) => (
        <div className={styles.courseCardContainer} key={course.courseTitle}>
          <div className={styles.courseImage}>
            <img src={fakeImg} alt="course" />
            {/* <img src={fakeImg} alt="course" width="100%" height="100%" /> */}
          </div>
          <div className={styles.courseDetails}>
            <div className={styles.courseName}>{course.courseTitle}</div>
            <div className={styles.courseDetailsBottom}>
              {/* <div className={styles.deleteBtn}></div> */}
              <div className={styles.coursePrice}>
                {course.coursePrice.toFixed(2).replace('.', ',')} €
              </div>
              <img src={deleteIcon} alt="delete course icon" />
            </div>
          </div>
        </div>
      ))}

      <div className={styles.totalPrice}>Total 230,00 €</div>
      <div className={styles.checkOutBtnContainer}>
        <button>Check out</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
