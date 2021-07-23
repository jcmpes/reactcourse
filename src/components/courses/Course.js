import React from 'react';
import { Link } from 'react-router-dom';
import { addFav, removeFav } from '../../api/courses';
import { useDispatch } from 'react-redux';
import { favoritesAction } from '../../store/actions/favorites';

const Course = ({ course, me, faved }) => {
  const dispatch = useDispatch();
  // console.log(course);
  const isAuthor = course.user.username === me;

  return (
    <div className="course-wrapper" key={course._id}>
      <br />
      Title:{' '}
      <Link className="course-title" to={`/courses/${course.slug}`}>
        {course.title}
      </Link>
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
      <div
        onClick={() => {
          dispatch(
            favoritesAction(course._id, !faved ? addFav : removeFav, !faved),
          );
          // if (!faved) addFav(course._id);
          // else removeFav(course._id);
        }}
      >
        {me && (
          <div style={{ cursor: 'pointer' }}>
            {faved === true ? 'FAVORITO' : 'no favorito'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
