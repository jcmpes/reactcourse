import React from 'react';
import { Twitter, Facebook } from 'react-social-sharing';
import { YoutubeEmbed } from '../../shared';
import { getAuth, isInCart } from '../../../store/selectors';
import { addFav, removeFav } from '../../../api/courses';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import heart from '../../../assets/svg/heart.svg';
import noHeart from '../../../assets/svg/heartBlank.svg';
import { favoritesAction } from '../../../store/actions/favorites';
import { addToCartAction } from '../../../store/actions/purchase';
import { useTranslation } from 'react-i18next';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import './CourseDetail.css';
import backIcon from '../../../assets/svg/back.svg';

function CourseDetail({
  title,
  video,
  description,
  content,
  image,
  lessons,
  slug,
  numFavs,
  user,
  price,
  _id,
  level,
  whatYouWillLearn,
  requirements,
}) {
  const { favs, purchased } = useSelector(getAuth);
  const getItemIsInCart = useSelector(isInCart);
  const faved = favs.includes(_id);
  const dispatch = useDispatch();
  const { username, isLogged } = useSelector(getAuth);
  const isAuthor = user.username === username;
  const purchasedCourses = purchased ? purchased.includes(_id) : false;
  const itemIsInCart = getItemIsInCart(_id);
  const history = useHistory();

  console.log(lessons.length);

  const { t } = useTranslation(['global']);
  return (
    <div className="container-fluid">
      <div width="100%">
        {/* <Link to="/search">
          <img src={backIcon} alt="back" width="35" />
        </Link> */}
        <div style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
          <img src={backIcon} alt="back" width="35" />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-3">
          <div className="card">
            <div className="row">
              <h4 className="col-10 col-md-11 card-title detailTitle">
                {title}
              </h4>
              <div
                className="favoriteDetail"
                onClick={() => {
                  dispatch(
                    favoritesAction(_id, !faved ? addFav : removeFav, !faved),
                  );
                }}
              >
                <div style={{ cursor: 'pointer', marginTop: '1rem' }}>
                  {faved === true ? (
                    <img src={heart} alt="faved" width="27px" />
                  ) : (
                    <img src={noHeart} alt="no faved" width="27px" />
                  )}
                </div>
              </div>
            </div>
            <div className="row m-3">
              <div className="col-12 col-sm-6">
                <p className="card-text description">{content}</p>
                <br />
                <p>{description}</p>
                <p>
                  {t('course.instructor')}: {user.username}
                </p>
                <p className="card-text level-list">
                  {t('Level')}:{' '}
                  <span>
                    {level.name === 'Basic'
                      ? '💪'
                      : level.name === 'Medium'
                      ? '💪💪'
                      : level.name === 'Expert'
                      ? '💪💪💪'
                      : level.name === 'Professional'
                      ? '💪💪💪💪'
                      : null}
                  </span>
                </p>
                <p className="priceDetail">{price} €</p>

                {isAuthor ? (
                  <div className="button-conainer">
                    <Link to={`/edit/${slug}`}>
                      <button className="buttonSecondary" type="reset">
                        ✏️ {t('course.Edit your course')}
                      </button>
                    </Link>
                  </div>
                ) : !purchasedCourses && !itemIsInCart ? (
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
                        dispatch(addToCartAction(_id, title, price, image));
                      }
                    }}
                  >
                    <div className="button-conainer">
                      <button className="curseButton">
                        {t('purchases.buy for')} {price} €
                      </button>
                    </div>
                  </div>
                ) : itemIsInCart ? (
                  <div className="shopping-course">
                    {t('purchases.in the shopping cart')}
                  </div>
                ) : (
                  <div className="purchased-course">{t('purchases.owned')}</div>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <div className="videoInsert">
                  <YoutubeEmbed video={video} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="deatail-sharer">
        <Facebook link={window.location.href} />
        <Twitter link={window.location.href} />
      </div>
      <div>
        {t('course.has')} {numFavs} {t('course.favorites')}
      </div>
      <div className="infoCourse">
        <div className="row mb-3">
          <div className="col-lg-8 col-sm-12">
            <div className="interlineDetailContainer">
              <h5 className="courseDetail col-xl-4 col-lg-5 col-sm-4">
                <div className="interlineDetailTitle">
                  {t('course.What you will learn')}
                </div>
              </h5>
              <div className="lineDetail"></div>
            </div>
            <p>{content}</p>
            <p>{whatYouWillLearn}</p>
            <div className="interlineDetailContainer">
              <h5 className="courseDetail col-xl-4 col-lg-5 col-sm-4">
                <div className="interlineDetailTitle">
                  {t('course.Course content')}
                </div>
              </h5>
              <div className="lineDetail"></div>
            </div>

            <ul>
              {lessons.length >= 1 ? (
                lessons.map((leson, i) => {
                  return (
                    <li
                      className="list-group-item list-group-item-secondary"
                      key={lessons[i].id}
                      margin="2px"
                    >
                      <PlayCircleOutlineIcon />
                      <div className="lessonInfo">
                        Leccion {i + 1} {lessons[i].title}
                      </div>
                    </li>
                  );
                })
              ) : (
                <li
                  className="list-group-item list-group-item-secondary"
                  key={title}
                  margin="2px"
                >
                  <PlayCircleOutlineIcon />
                  <div className="lessonInfo">Leccion 1 {title}</div>
                </li>
              )}
            </ul>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="interlineDetailContainer">
              <h5 className="courseDetail col-xl-4 col-lg-5 col-sm-4">
                <div className="interlineDetailTitle">
                  {t('course.Requirements')}
                </div>
              </h5>
              <div className="lineDetail"></div>
            </div>
            <p>{requirements}</p>
            <div className="row mb-3">
              <div className="col-4">
                <div className="detail-image">
                  <img
                    style={{
                      width: '75px',
                      height: '75px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    src={image}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-8">
                <div className="interlineDetailContainer">
                  <h5 className="courseDetail col-xl-4 col-lg-5 col-sm-4">
                    <div className="interlineDetailTitle">
                      {t('course.instructor')}
                    </div>
                  </h5>
                  <div className="lineDetail"></div>
                </div>
              </div>
            </div>
            <p>{user.username}</p>
            <p>{title}</p>
            <p>
              {user.username} is a Senior Curriculum Engineer at MongoDB. Prior
              to MongoDB Yulia worked at Stuyvesant High School where she
              tautght Computer Science to hundreds of unsuspecting studetns
            </p>
          </div>
        </div>
      </div>
      <div className="lesson-nav">
        {lessons.length > 0 && !purchasedCourses ? (
          <div className="button-conainer">
            <Link to={`/courses/${slug}/${lessons[0].slug}`}>
              <button className="curseButton">
                {t('course.Go to course')}
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CourseDetail;
