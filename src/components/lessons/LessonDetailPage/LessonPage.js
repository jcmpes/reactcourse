import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getLesson } from '../../../api/lessons';
import { getUi } from '../../../store/selectors';
import CoursesList from '../../courses/CoursesList';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import LessonDetail from './LessonDetail';

function LessonPage() {
  const { courseSlug, lessonSlug } = useParams();
  const { loading } = useSelector(getUi);
  const [lesson, setLesson] = useState()
  const [course, setCourse] = useState()
  const [lessonCounter, setLessonCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () =>  {
      setCourse(await getCourse(courseSlug))
      setLesson(await getLesson(courseSlug, lessonSlug))
    }
    fetchData()
  }, [lessonCounter]);

  function navigate(up) {
    up ? setLessonCounter(lessonCounter + 1) 
      : setLessonCounter(lessonCounter - 1) ;
  }

  if(lessonCounter > 0) {
    return <Redirect to={`/courses/${courseSlug}/${course.lessons[lessonCounter].slug}`} />
  }

  debugger;
  return (
    
    <Layout>
      <div className="lesson-detail-page">
        {loading && "I'm loading..."}
        {lesson && 
          <>
            <LessonDetail {...lesson} />
            <div className="lesson-nav">
                <Button onClick={() => navigate(false)}>Previous lesson</Button>
                { course.lessons.length === lessonCounter
                    ? null
                    : <Button onClick={() => navigate(true)}>Next lesson</Button>
                }
            </div>
          </>
        }
      </div>
    </Layout>
  );
}

export default LessonPage;
