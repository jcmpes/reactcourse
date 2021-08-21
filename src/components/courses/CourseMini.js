import React from 'react';

import styles from './CourseMini.module.css';

const CourseMini = ({ course }) => {
  return (
    <div className={styles.miniCard}>
      <img src={course.image} alt="" />
      {course.title}
      <div className={styles.author}>{course.user.username}</div>
      <div className={styles.price}>{course.price} €</div>
    </div>
  );
};

export default CourseMini;
