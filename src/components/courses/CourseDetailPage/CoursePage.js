import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { apiCallLoadAction } from '../../../store/actions/api-call';
import { getUi } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import Loading from '../../shared/Loading/Loading';
import CourseDetail from './CourseDetail';

require('dotenv').config();

function CoursePage() {
  const { courseSlug } = useParams();
  const { loading, error } = useSelector(getUi);
  const [course, setCourse] = useState();
  const dispatch = useDispatch()
  const { t } = useTranslation(['global']);


  React.useEffect(() => {
    dispatch(apiCallLoadAction(getCourse, setCourse, courseSlug))
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
