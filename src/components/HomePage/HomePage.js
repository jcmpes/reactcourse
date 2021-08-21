import React from 'react';
import Layout from '../layout/Layout';
import Scroll from '../shared/Scroll';
import { connect, useSelector, useDispatch } from 'react-redux';
import { authLogout } from '../../store/actions/logout';
import { getAuth } from '../../store/selectors';
import photo1 from '../../assets/img/home1.jpg';
import photo2 from '../../assets/img/home2.jpg';
import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.css';
import { getCategories } from '../../store/selectors';
import { categoriesLoadAction } from '../../store/actions/categories-load';
import {
  loadCoursesAction,
  setFilters,
} from '../../store/actions/load-courses';
import { Link } from 'react-router-dom';
import CoursesListMini from '../courses/CoursesListMini';
import { getCourses } from '../../api/courses';

const HomePage = ({ auth, onLogout, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);
  const dispatch = useDispatch();
  const defaultFilters = {
    title: '',
    category: '',
    username: '',
    categories: [],
    price: [0, 600],
    limit: 10,
    skip: 0,
    sort: -1,
  };
  const [newCourses, setNewCourses] = React.useState([]);

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    dispatch(
      loadCoursesAction(getCourses, setNewCourses, defaultFilters, () => {}, 5),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  console.log(newCourses);

  const categories = useSelector(getCategories);

  const catElements = categories.map((cat) => (
    <Link className={styles.categoriesButtons} to="/search">
      <button
        key={cat._id}
        className={styles.categoriesButton}
        onClick={() => {
          dispatch(setFilters({ ...defaultFilters, category: cat.name }));
        }}
      >
        {cat.name}
      </button>
    </Link>
  ));

  return (
    <>
      <Layout {...props}>
        <Scroll showBellow={250} />
        <div className={styles.section1Container}>
          <div>
            <img className="photo1" src={photo1} alt="" />
            <div className={styles.txtInside}>
              <strong>
                {t('home.Learn anytime and anywhere with an expert')}
              </strong>
            </div>
          </div>
          <div className={styles.containerMessages}>
            <div className={styles.msg1}>
              <strong>{t('home.Do you want to be a tutor?')}</strong>
            </div>
            <div className={styles.msg2}>
              <strong>{t('home.To become an instructor')}</strong>
            </div>
            <div className={styles.description1}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </div>
            <Link to="/create">
              <button className={styles.starTeachingBtn}>
                {t('home.Start teaching')}
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.interlineContainer}>
          <div className={styles.interlineTitleLeft}>
            {t('home.New courses')}
          </div>
          <div className={styles.line3}></div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflow: 'auto',
          }}
        >
          <CoursesListMini courses={newCourses} />
        </div>
        <div className={styles.interlineContainer2}>
          <div className={styles.line}></div>
          <div className={styles.interlineTitle}>
            <strong>{t('header.categories')}</strong>
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.categoriesButtons}>{catElements}</div>
        <div className={styles.interlineContainer}>
          <div className={styles.line2}></div>
        </div>

        <div className={styles.section2Container}>
          <div>
            <img className="photo2" src={photo2} alt="" />
            <div className={styles.txtInside}>
              <strong>
                {t('home.Learn anytime and anywhere with an expert')}
              </strong>
            </div>
          </div>
          <div className={styles.containerMessages}>
            <div className={styles.msg1_2}>
              <strong>{t('home.Find the best online tutor for you')}</strong>
            </div>
            <div className={styles.msg2_2}>
              <strong>{t('home.Build up your skills')}</strong>
            </div>
            <div className={styles.description1}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </div>
            <Link to="/search">
              <button
                className={styles.starTeachingBtn}
                onClick={() => {
                  dispatch(setFilters(defaultFilters));
                }}
              >
                {t('home.Search')}
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
