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
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);

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
                  // min-height="100%"
                  // max-height="auto"
                  // // height="320"
                  // // width="240"
                  alt={`${course.title}`}
                />
              </div>
              <div className="card-body">
                <p className="card-title">
                  {/* {t('Title')}:{' '} */}
                  <Link className="course-title" to={`/courses/${course.slug}`}>
                    {course.title}
                  </Link>
                </p>
                <p className="card-text description">
                  {/* {t('Description')}: {course.description} */}
                  {course.description}
                </p>
                <p className="card-text category">
                  {t('Category')}: {course.category.name}
                </p>
                <p className="card-text price">
                  {/* {t('Price')}: {course.price} */}
                  {course.price} €
                </p>
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
                            Please, <Link to="/login">log in</Link> to purchase.
                          </div>
                        );
                        toast.warning(<Msg />);
                      } else {
                        //dispatch(purchaseAction(course._id, '123456'));
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
                        Comprar por {course.price} €
                      </button>
                    </div>
                  </div>
                ) : inCart ? (
                  <div className="shopping-course">en carrito</div>
                ) : (
                  <div className="purchased-course">Comprado</div>
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

                    // if (!faved) addFav(course._id);
                    // else removeFav(course._id);
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
