import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { postCourse } from "../../../api/courses";
import { categoriesLoadAction } from "../../../store/actions";
import { getAuth, getCategories } from "../../../store/selectors";
import Layout from "../../layout/Layout";
import NewCourseForm from "./NewCourseForm";

function NewCoursePage() {
  const [createdCourse, setCreatedCourse] = React.useState(null);
  const categories = useSelector(getCategories)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [])

  function handleSubmit(courseDetails) {
    postCourse(courseDetails)
      .then(result => {
        if (result.slug) setCreatedCourse(result)  
      })
  }

  if (createdCourse) {
    return <Redirect to={`/courses/${createdCourse.slug}`} />
  }

  return (
    <div className="new-course-page">
      <Layout>
        <h1>Create a course</h1>
        {categories && <NewCourseForm onSubmit={handleSubmit} categories={categories}/>}
      </Layout>
    </div>
  )
};

export default NewCoursePage;