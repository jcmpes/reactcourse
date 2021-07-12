import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course, me }) => {
  const isAuthor = course.user.username === me;
  return (
    <div className="course-wrapper">
      <br />
      Title: <Link className="course-title" to={`/courses/${course.slug}`}>{course.title}</Link>
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
