import React from 'react';
import Layout from '../layout/Layout';
import Scroll from '../shared/Scroll';
import { connect, useSelector, useDispatch } from 'react-redux';
import { authLogout } from '../../store/actions/logout';
import { getAuth, getUi } from '../../store/selectors';
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
import placeholder from '../../assets/img/homePlaceholder.jpg';
import { levelsLoadAction } from '../../store/actions/levels-load';
import Loading from '../shared/Loading/Loading';
import ErrorMessage from '../shared/ErrorMessage';
import { setErrorToNullAction } from '../../store/actions/reset-error';
import { defaultFilters } from '../../data/constants';

const HomePage = ({ auth, onLogout, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);
  const dispatch = useDispatch();
  const { loading, error } = useSelector(getUi);

  const [newCourses, setNewCourses] = React.useState([]);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgLoaded2, setImgLoaded2] = React.useState(false);

  const loaded = () => {
    setImgLoaded(true);
  };
  const loaded2 = () => {
    setImgLoaded2(true);
  };

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    dispatch(levelsLoadAction());
    dispatch(
      loadCoursesAction(getCourses, setNewCourses, defaultFilters, () => {}, 5),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setError = () => {
    dispatch(setErrorToNullAction());
  };

  const categories = useSelector(getCategories);

  const catElements = categories.map((cat) => (
    <Link className={styles.categoriesButtons} key={cat.name} to="/search">
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
        {error && <ErrorMessage error={error} resetError={setError} />}
        {loading && <Loading isLoading={true} />}
        <div className={styles.homeContainer}>
          <Scroll showBellow={250} />
          <div className={styles.section1Container}>
            <div className={styles.placeholder}>
              <img
                className="photo1"
                src={imgLoaded ? photo1 : placeholder}
                alt=""
                onLoad={loaded}
              />
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
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
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
              paddingBottom: '1.5rem',
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
              <div className={styles.placeholder}>
                <img
                  className="photo2"
                  src={imgLoaded2 ? photo2 : placeholder}
                  alt=""
                  onLoad={loaded2}
                />
                {/* <div className={styles.txtInside2}>
                <strong>
                  {t('home.Learn anytime and anywhere with an expert')}
                </strong>
              </div> */}
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
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </div>
              <Link to="/create">
                <button className={styles.starTeachingBtn}>
                  {t('home.Start teaching')}
                </button>
              </Link>
            </div>
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
