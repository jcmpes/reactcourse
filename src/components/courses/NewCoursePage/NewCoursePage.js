import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCourse } from "../../../api/courses";
import { categoriesLoadAction } from "../../../store/actions";
import { getCategories } from "../../../store/selectors";
import Layout from "../../layout/Layout";
import NewCourseForm from "./NewCourseForm";

function NewCoursePage() {
  const categories = useSelector(getCategories)
  const dispatch = useDispatch();
  console.log('Categories: ', categories);

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [])

  function handleSubmit(courseDetails) {
    postCourse(courseDetails);
  }

  return (
    <div className="new-course-page">
      <Layout>
        {categories && <NewCourseForm onSubmit={handleSubmit} categories={categories}/>}
      </Layout>
    </div>
  )
};

export default NewCoursePage;