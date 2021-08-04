import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editCourse, getCourse } from "../../../api/courses";
import { categoriesLoadAction } from "../../../store/actions/categories-load";
import { getCategories } from "../../../store/selectors";
import Layout from "../../layout/Layout";
import EditCourseForm from "./EditCourseForm";

function EditCoursePage() {
  const { courseSlug } = useParams();
  const [createdCourse, setCreatedCourse] = React.useState(null);
  const categories = useSelector(getCategories)
  const dispatch = useDispatch();

  const [courseDetails, setCourseDetails] = useState()

  React.useEffect(() => {
    const fetchData = async () =>  {
      setCourseDetails(await getCourse(courseSlug))
    }
    fetchData()
  }, [courseSlug]);

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [courseSlug, courseDetails, dispatch]);

  function handleSubmit(courseDetails) {
    editCourse(courseDetails)
      .then(result => {
        if (result.slug) setCreatedCourse(result)
        if (result.error === 'no token provided'
          || result.error === 'The token provided is invalid or has expired') {
            toast.error('Invalid token: Log back in and try again')
          }
      }).catch(err => err)
  }

  if (createdCourse) {
    return <Redirect to={`/courses/${createdCourse.slug}`} />
  }

  return (
    <div className="new-course-page">
      <Layout>
        <h1>Edit course</h1>
        {courseDetails && categories &&
          <EditCourseForm
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
            onSubmit={handleSubmit}
            categories={categories}
          />}
      </Layout>
    </div>
  )
};

export default EditCoursePage;