import React from 'react';
import Course from './Course';
import { CourseSkeleton } from './CourseSkeleton';

import { useSelector } from 'react-redux';
import { getAuth, isInCart } from '../../store/selectors';

export const CoursesList = (courses) => {
  const { favs, purchased } = useSelector(getAuth);
  const getItemIsInCart = useSelector(isInCart);

  const coursesElement =
    courses.courses && favs ? (
      courses.courses.map((course) => {
        const faved = favs.includes(course._id);
        const purchasedCourses = purchased
          ? purchased.includes(course._id)
          : false;
        const itemIsInCart = getItemIsInCart(course._id);

        return (
          <div key={course._id}>
            <Course
              course={course}
              key={course._id}
              faved={faved}
              purchased={purchasedCourses}
              inCart={itemIsInCart}
            />
          </div>
        );
      })
    ) : (
      <CourseSkeleton />
    );
  return coursesElement;
};

export default CoursesList;
