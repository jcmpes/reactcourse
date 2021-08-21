import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseMini.module.css';

const CourseMini = ({ course }) => {
  return (
    <Link to={`/courses/${course.slug}`}>
      <div className={styles.miniCard}>
        <img src={course.image} alt="" />
        {course.title}
        <div className={styles.author}>{course.user.username}</div>
        <div className={styles.author}>{course.lessons.length} lessons</div>
        <div className={styles.price}>{course.price} €</div>
      </div>
    </Link>
  );
};

export default CourseMini;
