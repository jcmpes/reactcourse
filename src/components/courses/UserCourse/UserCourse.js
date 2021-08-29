import React from 'react';
import Layout from '../../layout/Layout';
import CoursesList from '../../courses/CoursesList';
import { getUI } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import { userCourses } from '../../../api/courses';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../../shared/Loading/Loading';
import ErrorMessage from '../../shared/ErrorMessage';

export const UserCourse = (...props) => {
  const { username } = useParams();
  const { loading, error } = useSelector(getUI);
  const [courses, setCourses] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);

  React.useEffect(() => {
    userCourses(username, setCourses);
  }, [username]);

  if (!courses || error)
    return <ErrorMessage error={error} resetError={null} />;

  return (
    <Layout {...props}>
      {loading && <Loading loading={loading} />}
      <div style={{ fontSize: 25 }}>
        {t('Courses by')} {username}
      </div>
      <CoursesList courses={courses} />
    </Layout>
  );
};

export default UserCourse;
