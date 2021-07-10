import React from 'react';

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <br />
      Title: {course.title}
      <br />
      Description: {course.description}
      <br />
      Category: {course.categoryName}
      <br />
      Created by {course.authorName} at{' '}
      {new Date(course.createdAt).toLocaleDateString('es-es', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
      <br />
    </div>
  );
};

export default Course;
