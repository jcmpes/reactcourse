import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions/logout';
import { setFilters } from '../store/actions/load-courses';
import { loadCoursesAction } from '../store/actions/load-courses';
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
    }
    //dispatch(loadCoursesAction());
    getCourses(filters).then(setCourses);
    dispatch(categoriesLoadRequest());
  }, [dispatch, filters]);

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
        {t('welcome to')}
        {t('title')}
        {username ? `, ${username}` : ''}
      </div>

      <div>{t('headline')}</div>

      <p>
        Current language: <strong>{i18n.language}</strong>
      </p>

      <CoursesList courses={courses} />
      <br />
      {!allResultsListed ? (
        <>
          <div>{courses.length} results</div>

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
