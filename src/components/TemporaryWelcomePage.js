import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions/logout';
import { loadCoursesAction } from '../store/actions/load-courses';
import { getAuth, getUI, getFilters } from '../store/selectors';
import Layout from './layout/Layout';
import { useTranslation } from 'react-i18next';
import { getCourses } from '../api/courses';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadRequest } from '../store/actions/categories-load';
import { Button } from '../components/shared';
import CoursesList from './courses/CoursesList';

function TemporaryWelcomePage({ auth, onLogout, ...props }) {
  const { t, i18n } = useTranslation(['global']);

  const { loading, error } = useSelector(getUI);
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  const switchLanguage = (ev) => {
    if (ev.target.innerHTML === 'Español') {
      i18n.changeLanguage('es');
    } else if (ev.target.innerHTML === 'English') {
      i18n.changeLanguage('en');
    }
  };

  const { username } = auth;

  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    // getCourses().then(setCourses);
    dispatch(loadCoursesAction(getCourses, setCourses, filters));
    dispatch(categoriesLoadRequest());
  }, [dispatch, filters]);

  return error || loading ? (
    'Loading...'
  ) : (
    <Layout {...props}>
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
      <Button children="English" onClick={switchLanguage} />
      <Button children="Español" onClick={switchLanguage} />

      <CoursesList courses={courses} />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

const mapDispatchToProps = {
  onLogout: authLogout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemporaryWelcomePage);
