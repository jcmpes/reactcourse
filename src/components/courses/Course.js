import React from 'react';
import { Link } from 'react-router-dom';
import { isFav } from '../../api/auth';

const Course = ({ course, me }) => {
  const isAuthor = course.user.username === me;
  const [favorited, setFavorited] = React.useState(null);

  React.useEffect(() => {
    isFav(course._id).then(setFavorited);
  }, [course._id]);
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
      {favorited !== true || 'es favorito'}
    </div>
  );
};

export default Course;
