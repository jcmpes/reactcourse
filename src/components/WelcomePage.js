import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions/logout';
import { getAuth, getUI, getFilters } from '../store/selectors';
import Layout from './layout/Layout';
import { useTranslation } from 'react-i18next';
import { getCourses } from '../api/courses';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadRequest } from '../store/actions/categories-load';
import CoursesList from './courses/CoursesList';
import FiltersForm from './FiltersForm/FiltersForm';
import Scroll from './shared/Scroll';
// import styles from './WelcomePage.module.css';
import { setFilters, loadCoursesAction } from '../store/actions/load-courses';
import Loading from './shared/Loading/Loading';
import ErrorMessage from './shared/ErrorMessage';
import Course from './courses/Course';
import loader from '../assets/img/loading-mini.gif';

function WelcomePage({ auth, onLogout, ...props }) {
  const { t, i18n } = useTranslation(['global']);

  const { loading, error } = useSelector(getUI);
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [allResultsListed, setAllResultsListed] = React.useState(false);
  const [sort, setSort] = React.useState(-1);
  const [moreLoading, setMoreLoading] = React.useState(false);
  const handleChange = (ev) => {
    setSort(sort === 1 ? -1 : 1);
    filters.skip = 0;
    dispatch(setFilters(filters));
  };

  const gimmeMore = async () => {
    filters.skip = filters.skip + 10;
    dispatch(setFilters(filters));
    const coursesAux = courses;
    setMoreLoading(true);
    try {
      const newCourses = await getCourses(filters);
      if (newCourses.length < filters.limit) setAllResultsListed(true);
      setCourses(coursesAux.concat(newCourses));
    } catch (err) {
      console.log(err);
    } finally {
      setMoreLoading(false);
    }
  };

  const { username } = auth;

  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    setAllResultsListed(false);
  }, [filters]);

  React.useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      filters.skip = 0;
      dispatch(categoriesLoadRequest());
    }
    if (sort === 1) {
      filters.sort = 1;
    } else {
      filters.sort = -1;
    }
    dispatch(setFilters(filters));
    dispatch(
      loadCoursesAction(
        getCourses,
        setCourses,
        filters,
        setAllResultsListed,
        filters.limit,
      ),
    );
    getCourses(filters).then((results) => {
      if (results && results.length < filters.limit) setAllResultsListed(true);
      setCourses(results);
    });
    // getCourses(filters).then((results) => {
    //   if (results.length < filters.limit) setAllResultsListed(true);
    //   setCourses(results);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters, sort]);
  if (error) return <ErrorMessage error={error} resetError={null} />;
  return (
    <Layout {...props}>
      <Scroll showBellow={250} />
      <div
        style={{
          textAlign: 'center',
          fontSize: 40,
        }}
      >
        {t('welcome to')}
        {t('title')}
        {username ? `, ${username}` : ''}
      </div>

      <div>{t('headline')}</div>
      <label htmlFor="order-checkbox">{t('Ascending')}</label>
      <input
        type="checkbox"
        id="order-checkbox"
        checked={sort === 1}
        onChange={handleChange}
      />

      <p>
        Current language: <strong>{i18n.language}</strong>
      </p>
      <div>
        {/*className={styles.searchBarForm}*/}
        <FiltersForm />
        <div>
          {loading ? (
            <>
              <Course
                course={{
                  title: 'La prisa mata',
                  description: 'Relajado todo es mejor',
                  user: { username: 'Alguien que sabe' },
                  category: { name: 'Cualquiera será buena' },
                  createdAt: Date.now(),
                  price: 0,

                  image: 'https://i.postimg.cc/wTFWZ0BG/sandwatch.png',
                }}
                key={'a'}
                faved={false}
                purchased={false}
                inCart={null}
              />
              <Loading isLoading={true} />
            </>
          ) : (
            <>
              <CoursesList courses={courses} />
              <br />
              {!allResultsListed ? (
                <>
                  <div>{courses ? courses.length : '0'} results</div>

                  {!moreLoading ? (
                    <button onClick={gimmeMore}>{t('Show more')}</button>
                  ) : (
                    <img width="20px" src={loader} alt="loading" />
                  )}
                </>
              ) : (
                <>
                  <div>{courses ? courses.length : '0'} results</div>
                  <div>There's no more results</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
