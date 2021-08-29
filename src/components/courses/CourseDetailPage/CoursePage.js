import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import Layout from '../../layout/Layout';
import CourseDetail from './CourseDetail';

require('dotenv').config();

function CoursePage() {
  const { courseSlug } = useParams();
  const [error, setError] = useState(null);
  const [course, setCourse] = useState();
  const { t } = useTranslation(['global']);


  React.useEffect(() => {
    const fetchData = async () => {
      setCourse(await getCourse(courseSlug));
    };
    fetchData().catch(err => {setError(err)});
  }, [courseSlug]);

  return (
    <Layout>
      <div className="course-detail-page">
        {error && t('course.error loading course')}
        {course && (
          <>
            <CourseDetail {...course} />
            {/* <div className="lesson-nav">
              {course.lessons.length > 0 ? (
                <Link to={`/courses/${courseSlug}/${course.lessons[0].slug}`}>
                  <Button>{t('course.Go to course')}</Button>
                </Link>
              ) : null}
            </div> */}
          </>
        )}
      </div>
    </Layout>
  );
}

export default CoursePage;
