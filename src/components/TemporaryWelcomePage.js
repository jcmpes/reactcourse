import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { authLogout } from '../store/actions/logout';
import { loadCoursesAction } from '../store/actions/load-courses';
import { getAuth, getUI } from '../store/selectors';
import Layout from './layout/Layout';
import { Button } from '../components/shared';
import { useTranslation } from 'react-i18next';
import { getCourses } from '../api/courses';
import Course from '../components/courses/Course';
import { useDispatch, useSelector } from 'react-redux';

function TemporaryWelcomePage({ auth, onLogout, ...props }) {
  const { t, i18n } = useTranslation(['global']);

  const { loading, error } = useSelector(getUI);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    logout().then(onLogout);
  };

  const switchLanguage = (ev) => {
    if (ev.target.innerHTML === 'Español') {
      i18n.changeLanguage('es');
    } else if (ev.target.innerHTML === 'English') {
      i18n.changeLanguage('en');
    }
  };

  const propsButton = { onClick: handleLogoutClick, children: 'Log Out' };

  const propsLoginLink = {
    to: '/login',
    children: 'Log In',
  };
  const propsRegisterLink = {
    to: '/register',
    children: 'Register',
  };

  const { isLogged, username } = auth;

  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    // getCourses().then(setCourses);
    dispatch(loadCoursesAction(getCourses, setCourses));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const coursesElement = courses
    ? courses.map((course) => {
        return (
          <div>
            <Course course={course} me={username} key={course._id} />
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

      {isLogged ? <Button {...propsButton} /> : <Link {...propsLoginLink} />}
      <br />
      {!isLogged && <Link {...propsRegisterLink} />}

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
