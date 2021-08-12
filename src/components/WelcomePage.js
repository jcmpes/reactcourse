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
import Scroll from './shared/Scroll';

function WelcomePage({ auth, onLogout, ...props }) {
  const { t, i18n } = useTranslation(['global']);

  const { loading, error } = useSelector(getUI);
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [allResultsListed, setAllResultsListed] = React.useState(false);
  const [sort, setSort] = React.useState(-1);
  const handleChange = (ev) => {
    setSort(sort === 1 ? -1 : 1);
    filters.skip = 0;
  };

  const gimmeMore = async () => {
    filters.skip = filters.skip + 10;
    //dispatch(setFilters(filters));
    const coursesAux = courses;
    const newCourses = await getCourses(filters);

    if (newCourses.length === 0) setAllResultsListed(true);
    setCourses(coursesAux.concat(newCourses));
  };

  const { username } = auth;

  const [courses, setCourses] = React.useState([]);

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
    //dispatch(loadCoursesAction());
    getCourses(filters).then(setCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters, sort]);

  return error || loading ? (
    'Loading...'
  ) : (
    <Layout {...props}>
      <Scroll showBellow={250} />
      <div
        style={{
          textAlign: 'center',
          fontSize: 40,
        }}
      >
        <br />
        <br />
        <br />
        <br />
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

      <CoursesList courses={courses} />
      <br />
      {!allResultsListed ? (
        <>
          <div>{courses ? courses.length : '0'} results</div>

          <button onClick={gimmeMore}>{t('Show more')}</button>
        </>
      ) : (
        "There's no more results"
      )}
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
