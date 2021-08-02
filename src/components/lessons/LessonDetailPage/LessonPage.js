import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
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
  const [lessonCounter, setLessonCounter] = useState(0);
  const history = useHistory()

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
  function backToCourse() {
    history.push(`/courses/${courseSlug}`)
  }
  
  if(lessonCounter > 0) {
    return <Redirect to={`/courses/${courseSlug}/${course.lessons[lessonCounter].slug}`} />
  }

  return (
    
    <Layout>
      <div className="lesson-detail-page">
        {loading && "I'm loading..."}
        {lesson && 
          <>
            <LessonDetail {...lesson} />
            <div className="lesson-nav">
                { lessonCounter === 0 
                  ? <Button onClick={() => backToCourse()}>Back to Course presentation</Button>
                  : <Button onClick={() => navigate(false)}>Previous lesson</Button>
                }
                { course.lessons.length !== (lessonCounter + 1) &&
                    <Button onClick={() => navigate(true)}>Next lesson</Button>
                }
            </div>
          </>
        }
      </div>
    </Layout>
  );
}

export default LessonPage;
