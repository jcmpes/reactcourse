import React from 'react';
import Course from './Course';

import { useSelector } from 'react-redux';
import { getAuth } from '../../store/selectors';

export const CoursesList = (courses) => {
  const { username: me, favs } = useSelector(getAuth);

  console.log(courses);
  const coursesElement =
    courses && favs
      ? courses.courses.map((course) => {
          const faved = favs.includes(course._id);
          return (
            <div key={course._id}>
              <Course course={course} me={me} key={course._id} faved={faved} />
            </div>
          );
        })
      : [];
  return coursesElement;
};

export default CoursesList;
