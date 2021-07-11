import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { courseDetailAction } from "../../../store/actions";
import { getCourseDetail, getUi } from "../../../store/selectors";
import CourseDetail from "./CourseDetail";

function CoursePage() {
  const { courseId } = useParams();
  const { loading } = useSelector(getUi);
  const course = useSelector(state => getCourseDetail(state, courseId))
  console.log('Course: ', course)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(courseDetailAction(courseId));
  }, [courseId, course, dispatch])

  return (
    <div className="course-detail-page">
      {loading && "I'm loading..."}
      {course && <CourseDetail {...course} />}
    </div>
  )
}

export default CoursePage;