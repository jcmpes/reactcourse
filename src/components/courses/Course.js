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
import NoImg from '../../assets/img/noimg.png';
import './Course.css';

const Course = ({ course, faved, purchased, inCart }) => {
  const { t } = useTranslation(['global']);

  const { username, isLogged } = useSelector(getAuth);
  const dispatch = useDispatch();
  const isAuthor = course.user.username === username;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-3">
          <div className="card">
            <div className="card-horizontal">
              <div className="img-rounded-wrapper">
                <img
                  className="border border-dark"
                  src={course.image ? `${course.image}` : NoImg}
                  alt={`${course.title}`}
                />
              </div>
              <div className="card-body">
                <p className="card-title">
                  <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                </p>
                <p className="card-text description">{course.description}</p>
                <p className="card-text category">
                  {t('Category')}: {course.category.name}
                </p>
                <p className="card-text price">{course.price} €</p>
                <p className="card-text created">
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
                </p>
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
                            {t('Please')},{' '}
                            <Link to="/login">{t('log in')} </Link>
                            {t('to purchase')}.
                          </div>
                        );
                        toast.warning(<Msg />);
                      } else {
                        dispatch(
                          addToCartAction(
                            course._id,
                            course.title,
                            course.price,
                          ),
                        );
                      }
                    }}
                  >
                    <div className="button-conainer">
                      <button className="curseButton">
                        {t('purchases.buy for')} {course.price} €
                      </button>
                    </div>
                  </div>
                ) : inCart ? (
                  <div className="shopping-course">
                    {t('purchases.in the shopping cart')}
                  </div>
                ) : (
                  <div className="purchased-course">{t('purchases.owned')}</div>
                )}
                <div
                  onClick={() => {
                    dispatch(
                      favoritesAction(
                        course._id,
                        !faved ? addFav : removeFav,
                        !faved,
                      ),
                    );
                  }}
                >
                  {username && !isAuthor && (
                    <div style={{ cursor: 'pointer' }}>
                      {faved === true ? '❤️' : '🖤'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
