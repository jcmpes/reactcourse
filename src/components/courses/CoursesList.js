import React from 'react';
import Course from './Course';

import { useSelector } from 'react-redux';
import { getAuth } from '../../store/selectors';

export const CoursesList = (courses) => {
  const { favs, purchased } = useSelector(getAuth);
  const coursesElement =
    courses.courses && favs ? (
      courses.courses.map((course) => {
        const faved = favs.includes(course._id);
        const purchasedCourses = purchased
          ? purchased.includes(course._id)
          : false;
        return (
          <div key={course._id}>
            <Course
              course={course}
              key={course._id}
              faved={faved}
              purchased={purchasedCourses}
            />
          </div>
        );
      })
    ) : (
      <div>Ups</div>
    );
  return coursesElement;
};

export default CoursesList;
