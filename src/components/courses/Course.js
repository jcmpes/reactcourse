import React from 'react';

const Course = ({ course, me }) => {
  const isAuthor = course.user.username === me;
  return (
    <div>
      <br />
      Title: {course.title}
      <br />
      Description: {course.description}
      <br />
      Category: {course.category.name}
      <br />
      Created by {isAuthor ? 'me' : course.user.username} at{' '}
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
