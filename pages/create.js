import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesLoadAction } from "../src/store/actions/categories-load";
import { getCategories } from "../src/store/selectors";
import NewCourseForm from "../src/components/courses/NewCoursePage/NewCourseForm";
import { createCourseAction } from "../src/store/actions/create-course";

function NewCoursePage() {
  const categories = useSelector(getCategories)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
  }, [dispatch])

  function handleSubmit(courseDetails) {
    dispatch(createCourseAction(courseDetails))  
  }

  return (
    <div className="new-course-page">
        <h1>Create a course</h1>
        {categories && <NewCourseForm onSubmit={handleSubmit} categories={categories}/>}
    </div>
  )
};

export default NewCoursePage;