import React from 'react';
import Layout from '../../layout/Layout';
import CoursesList from '../../courses/CoursesList';
import { getUI } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import { userCourses } from '../../../api/courses';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const UserCourse = (...props) => {
  const { username } = useParams();
  const { loading, error } = useSelector(getUI);
  const [courses, setCourses] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(['global']);

  React.useEffect(() => {
    userCourses(username, setCourses);
  }, [username]);

  return !courses || error || loading ? (
    <div style={{ fontSize: 20 }}>🤷‍♂️</div>
  ) : (
    <Layout {...props}>
      <div style={{ fontSize: 25 }}>
        {t('Courses by')} {username}
      </div>
      <CoursesList courses={courses} />
    </Layout>
  );
};

export default UserCourse;
