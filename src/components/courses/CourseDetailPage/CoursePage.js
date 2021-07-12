import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { courseDetailAction } from "../../../store/actions";
import { getCourseDetail, getUi } from "../../../store/selectors";
import CourseDetail from "./CourseDetail";

function CoursePage() {
  const { courseSlug } = useParams();
  const { loading } = useSelector(getUi);
  const course = useSelector(state => getCourseDetail(state, courseSlug))
  console.log('Course: ', course)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(courseDetailAction(courseSlug));
  }, [courseSlug, course, dispatch])

  return (
    <div className="course-detail-page">
      {loading && "I'm loading..."}
      {course && <CourseDetail {...course} />}
    </div>
  )
}

export default CoursePage;