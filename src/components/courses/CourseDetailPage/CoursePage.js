import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import Layout from '../../layout/Layout';
import Loading from '../../shared/Loading/Loading';
import CourseDetail from './CourseDetail';

require('dotenv').config();

function CoursePage() {
  const { courseSlug } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState();
  const { t } = useTranslation(['global']);


  React.useEffect(() => {
    const fetchData = async () => {
      setCourse(await getCourse(courseSlug));
    };
    fetchData().then(setLoading(false)).catch(err => {setError(err)});
  }, [courseSlug]);

  return (
    <Layout>
      <div className="course-detail-page">
        {error && t('course.error loading course')}
        {loading && <Loading isLoading={true}/>}
        {course && (
          <>
            <CourseDetail {...course} />
          </>
        )}
      </div>
    </Layout>
  );
}

export default CoursePage;
