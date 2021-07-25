import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getUi } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import CourseDetail from './CourseDetail';

function CoursePage() {
  const { courseSlug } = useParams();
  const { loading } = useSelector(getUi);
  const [course, setCourse] = useState()

  React.useEffect(() => {
    const fetchData = async () =>  {
      setCourse(await getCourse(courseSlug))
    }
    fetchData()
  }, [courseSlug]);

  return (
    <Layout>
      <div className="course-detail-page">
        {loading && "I'm loading..."}
        {course && <CourseDetail {...course} />}
      </div>
    </Layout>
  );
}

export default CoursePage;
