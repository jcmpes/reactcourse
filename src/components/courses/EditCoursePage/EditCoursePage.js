import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editCourse, getCourse } from '../../../api/courses';
import { categoriesLoadAction } from '../../../store/actions/categories-load';
import { levelsLoadAction } from '../../../store/actions/levels-load';
import { getCategories, getLevels } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import EditCourseForm from './EditCourseForm';
import { useTranslation } from 'react-i18next';

function EditCoursePage() {
  const { t } = useTranslation(['global']);
  const { courseSlug } = useParams();
  const [createdCourse, setCreatedCourse] = React.useState(null);
  const categories = useSelector(getCategories);
  const levels = useSelector(getLevels);
  const dispatch = useDispatch();

  const [courseDetails, setCourseDetails] = useState();

  React.useEffect(() => {
    const fetchData = async () => {
      setCourseDetails(await getCourse(courseSlug));
    };
    fetchData();
  }, [courseSlug]);

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    dispatch(levelsLoadAction());
  }, [courseSlug, courseDetails, dispatch]);

  function handleSubmit(newCourseDetails) {
    editCourse(newCourseDetails)
      .then((result) => {
        if (result.slug) setCreatedCourse(result);
        if (
          result.error === 'no token provided' ||
          result.error === 'The token provided is invalid or has expired'
        ) {
          toast.error(t('Invalid token: Log back in and try again'));
        }
      })
      .catch((err) => err);
  }

  if (createdCourse) {
    return <Redirect to={`/courses/${createdCourse.slug}`} />;
  }

  return (
    <div className="edit-course-page">
      <Layout>
        <h1>Edit course</h1>
        {courseDetails && categories && (
          <EditCourseForm
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
            onSubmit={handleSubmit}
            categories={categories}
            levels={levels}
          />
        )}
      </Layout>
    </div>
  );
}

export default EditCoursePage;
