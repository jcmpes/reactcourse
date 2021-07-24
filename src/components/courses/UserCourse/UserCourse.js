import React from 'react';
import Layout from '../../layout/Layout';
import CoursesList from '../../courses/CoursesList';
import { getUI } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import { userCourses } from '../../../api/courses';
import { useParams } from 'react-router-dom';

export const UserCourse = (...props) => {
  const { username } = useParams();
  const { loading, error } = useSelector(getUI);
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    userCourses(username, setCourses);
  }, [username]);

  return !courses || error || loading ? (
    <div style={{ fontSize: 20 }}>🤷‍♂️</div>
  ) : (
    <Layout {...props}>
      <CoursesList courses={courses} />
    </Layout>
  );
};

export default UserCourse;
