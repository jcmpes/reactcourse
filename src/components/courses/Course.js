import React from 'react';
import { Link } from 'react-router-dom';
import { addFav, removeFav } from '../../api/courses';
import { useDispatch } from 'react-redux';
import { favoritesAction } from '../../store/actions/favorites';
import { useSelector } from 'react-redux';
import { getAuth } from '../../store/selectors';
import { useTranslation } from 'react-i18next';
import { purchase } from '../../api/purchases';

const Course = ({ course, faved, purchased }) => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);

  const { username } = useSelector(getAuth);
  const dispatch = useDispatch();
  // console.log(course);
  const isAuthor = course.user.username === username;

  return (
    <div className="course-wrapper" key={course._id}>
      <br />
      {t('Title')}:{' '}
      <Link className="course-title" to={`/courses/${course.slug}`}>
        {course.title}
      </Link>
      <br />
      <img src={`${course.image}`} height="50" alt={`${course.title}`} />
      <br />
      {t('Description')}: {course.description}
      <br />
      {t('Category')}: {course.category.name}
      <br />
      {t('Price')}: {course.price}
      <br />
      {t('Created by')}{' '}
      <Link to={`/courses-by/${course.user.username}`}>
        {isAuthor ? t('me') : course.user.username}
      </Link>{' '}
      {t('at')}{' '}
      {new Date(course.createdAt).toLocaleDateString(t('en-en'), {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
      <br />
      {isAuthor && (
        <div>
          <Link to={`/edit/${course.slug}`}>✏️ Edit</Link>
        </div>
      )}
      <div
        onClick={() => {
          dispatch(
            favoritesAction(course._id, !faved ? addFav : removeFav, !faved),
          );
          // if (!faved) addFav(course._id);
          // else removeFav(course._id);
        }}
      >
        {username && (
          <div style={{ cursor: 'pointer' }}>
            {faved === true ? 'FAVORITO' : 'no favorito'}
          </div>
        )}
      </div>
      <br />
      {!purchased ? (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            purchase(course._id, '123456');
          }}
        >
          GIMME YOUR MONEY!
        </div>
      ) : (
        'Comprado'
      )}
    </div>
  );
};

export default Course;
