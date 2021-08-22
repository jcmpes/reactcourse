import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseMini.module.css';
import placeholder from '../../assets/img/noimg.png';

const CourseMini = ({ course }) => {
  return (
    <Link to={`/courses/${course.slug}`}>
      <div className={styles.miniCard}>
        <img src={course.image || placeholder} alt="" />
        {course.title}
        <div className={styles.author}>{course.user.username}</div>
        <div className={styles.author}>
          {course.lessons.length} lesson{course.lessons.length !== 1 && 's'}
        </div>
        <div className={styles.price}>{course.price} €</div>
      </div>
    </Link>
  );
};

export default CourseMini;
