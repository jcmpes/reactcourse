import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { courseDetailAction } from '../../src/store/actions/course-detail';
import { getCourseDetail, getUi } from '../../src/store/selectors';
import CourseDetail from '../../src/components/courses/CourseDetailPage/CourseDetail';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getCourse, getCourses } from '../../src/api/courses';

function CoursePage({ course }) {
  const { loading } = useSelector(getUi);
  // const [course, setCourse] = useState(null)
  // const { courseSlug } = useRouter().query;
  // const dispatch = useDispatch();
  // // const course = useSelector((state) => getCourseDetail(state, courseSlug));
  // useEffect(() => {
  //   // dispatch(courseDetailAction(courseSlug));
  //   async function fetchData() {
  //     const course = await getCourse(courseSlug);
  //     setCourse(course)
  //   }
  //   fetchData()
  // }, [courseSlug]);


  return (
      <div className="course-detail-page">
        {loading && "I'm loading..."}
        {course && <CourseDetail {...course} />}
      </div>
  );
}

// This function gets called at build time
export const getStaticProps = async({ params }) => {
  const { courseSlug } = params;
  const course = await getCourse(courseSlug)
  { console.log('props: ', props)}
  if (!course) {
    return {
      notFound: true,
    }
  }

  return {
    // will be passed to the page component as props
    props: {
      course
    }
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const courses = await getCourses()

  // Get the paths we want to pre-render based on posts
  const paths = courses.map((course) => ({
    params: { courseSlug: course.slug, course: course },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export default CoursePage;
