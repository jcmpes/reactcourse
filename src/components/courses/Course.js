import React from 'react';
import { Link } from 'react-router-dom';
import { addFav, removeFav } from '../../api/courses';
import { useDispatch } from 'react-redux';
import { favoritesAction } from '../../store/actions/favorites';
import { useSelector } from 'react-redux';
import { getAuth } from '../../store/selectors';
import { useTranslation } from 'react-i18next';
import { addToCartAction } from '../../store/actions/purchase';
import { toast } from 'react-toastify';

const Course = ({ course, faved, purchased, inCart }) => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);

  const { username, isLogged } = useSelector(getAuth);
  const dispatch = useDispatch();
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
        month: 'long',
        day: 'numeric',
      })}
      <br />
      {isAuthor ? (
        <div>
          <Link to={`/edit/${course.slug}`}>✏️ Edit</Link>
        </div>
      ) : !purchased && !inCart ? (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (!isLogged) {
              const Msg = ({ closeToast, toastProps }) => (
                <div>
                  Please, <Link to="/login">log in</Link> to purchase.
                </div>
              );
              toast.warning(<Msg />);
            } else {
              //dispatch(purchaseAction(course._id, '123456'));
              dispatch(addToCartAction(course._id, course.title, course.price));
            }
          }}
        >
          <button>Comprar por {course.price} €</button>
        </div>
      ) : inCart ? (
        <div>en carrito</div>
      ) : (
        <div>Comprado</div>
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
        {username && !isAuthor && (
          <div style={{ cursor: 'pointer' }}>
            {faved === true ? '❤️' : '💛'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
