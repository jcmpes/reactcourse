import React from 'react';
import CourseMini from './CourseMini';

export const CoursesListMini = (courses) => {
  const coursesElement = courses.courses.map((course) => {
    return (
      <div key={course._id}>
        <CourseMini course={course} />
      </div>
    );
  });
  return coursesElement;
};

export default CoursesListMini;
