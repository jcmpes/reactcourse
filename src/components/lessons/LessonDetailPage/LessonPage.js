import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getLesson } from '../../../api/lessons';
import { getUi } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import LessonDetail from './LessonDetail';

function LessonPage() {
  const { courseSlug, lessonSlug } = useParams();
  const { loading } = useSelector(getUi);
  const [lesson, setLesson] = useState()
  const [course, setCourse] = useState()
  const [lessonCount, setLessonCount] = useState();


  React.useEffect(() => {
    const fetchData = async () =>  {
      setCourse(await getCourse(courseSlug))
      setLesson(await getLesson(courseSlug, lessonSlug))
    }
    fetchData()
  }, [lessonSlug]);

  return (
    <Layout>
      <div className="lesson-detail-page">
        {loading && "I'm loading..."}
        {lesson && 
          <>
            <LessonDetail {...lesson} />
            <div className="lesson-nav">
              <Link to={`/courses/${courseSlug}/${course.lessons[1].slug}`}>
                <Button>Next lesson</Button>
              </Link>
            </div>
          </>
        }
      </div>
    </Layout>
  );
}

export default LessonPage;
