import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editCourse, postCourse } from "../../../api/courses";
import { categoriesLoadAction } from "../../../store/actions/categories-load";
import { courseDetailAction } from "../../../store/actions/course-detail";
import { getCategories, getCourseDetail, getUi } from "../../../store/selectors";
import Layout from "../../layout/Layout";
import EditCourseForm from "./EditCourseForm";

function EditCoursePage() {
  const { courseSlug } = useParams();
  const { loading } = useSelector(getUi);
  const course = useSelector((state) => getCourseDetail(state, courseSlug));
  const [createdCourse, setCreatedCourse] = React.useState(null);
  const categories = useSelector(getCategories)

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    dispatch(courseDetailAction(courseSlug));
  }, [courseSlug, course, dispatch]);

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
        {course && categories && <EditCourseForm course={course} onSubmit={handleSubmit} categories={categories}/>}
      </Layout>
    </div>
  )
};

export default EditCoursePage;