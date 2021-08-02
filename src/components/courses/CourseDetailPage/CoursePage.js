import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getUi } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import CourseDetail from './CourseDetail';

function CoursePage() {
  const { courseSlug } = useParams();
  const { loading } = useSelector(getUi);
  const [course, setCourse] = useState();
  

  React.useEffect(() => {
    const fetchData = async () =>  {
      setCourse(await getCourse(courseSlug))
    }
    fetchData()
  }, [courseSlug]);

  return (
    <Layout>
        <div className="course-detail-page">
          {loading && "I'm loading..."}
          {course &&
            <>
              <CourseDetail {...course} />
              <div className="lesson-nav">
                { course.lessons.length > 0 ?
                  <Link to={`/courses/${courseSlug}/${course.lessons[0].slug}`}>
                    <Button>Go to course</Button>
                  </Link>
                  : null
                }
              </div>
            </>
          }
        </div>
    </Layout>
  );
}

export default CoursePage;
