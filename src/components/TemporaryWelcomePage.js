import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions/logout';
import { loadCoursesAction } from '../store/actions/load-courses';
import { getAuth, getUI, getFilters } from '../store/selectors';
import Layout from './layout/Layout';
import { useTranslation } from 'react-i18next';
import { getCourses } from '../api/courses';
import Course from '../components/courses/Course';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesLoadRequest } from '../store/actions/categories-load';
import { Button } from '../components/shared';

function TemporaryWelcomePage({ auth, onLogout, ...props }) {
  const { t, i18n } = useTranslation(['global']);

  const { loading, error } = useSelector(getUI);
  const filters = useSelector(getFilters);
  console.log('filters', filters);
  const dispatch = useDispatch();

  const switchLanguage = (ev) => {
    if (ev.target.innerHTML === 'Español') {
      i18n.changeLanguage('es');
    } else if (ev.target.innerHTML === 'English') {
      i18n.changeLanguage('en');
    }
  };

  const { username, favs } = auth;

  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    // getCourses().then(setCourses);
    dispatch(loadCoursesAction(getCourses, setCourses, filters));
    dispatch(categoriesLoadRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const coursesElement =
    courses && favs
      ? courses.map((course) => {
          const faved = favs.includes(course._id);
          return (
            <div>
              <Course
                course={course}
                me={username}
                key={course._id}
                faved={faved}
              />
            </div>
          );
        })
      : [];

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

      {coursesElement.length === 0 && !loading
        ? "There's no courses yet"
        : coursesElement}
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
