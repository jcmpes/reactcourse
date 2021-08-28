import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getLesson } from '../../../api/lessons';
import { getUi } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import LessonDetail from './LessonDetail';
import { useTranslation } from 'react-i18next';
import Loading from '../../shared/Loading/Loading';
import { Link } from 'react-router-dom';

function LessonPage() {
  const { courseSlug, lessonSlug } = useParams();
  const { loading, error } = useSelector(getUi);
  const [lesson, setLesson] = useState({});
  const [course, setCourse] = useState({});
  const [lessonCounter, setLessonCounter] = useState(0);
  const history = useHistory();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const singleCourse = await getCourse(courseSlug);
      setCourse(singleCourse);
      console.log('Peticion API: ', lessonSlug);
      const singleLesson = await getLesson(courseSlug, lessonSlug);
      console.log(singleLesson);
      if (singleLesson.title) setAuthorized(true);
      return singleLesson;
    };
    fetchData().then((singleLesson) => {
      setLesson(singleLesson);
      console.log('LESSON: ', lesson);
      lesson && setLessonCounter(lesson.number);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonCounter, lessonSlug]);

  function backToCourse() {
    history.push(`/courses/${courseSlug}`);
  }

  function backOneLesson() {
    history.push(
      `/courses/${courseSlug}/${course.lessons[lessonCounter - 1].slug}`,
    );
    setLessonCounter(lessonCounter + 1);
  }

  function upOneLesson() {
    history.push(
      `/courses/${courseSlug}/${course.lessons[lessonCounter + 1].slug}`,
    );
    setLessonCounter(lessonCounter + 1);
  }

  const { t } = useTranslation(['global']);
  console.log(lesson);
  if (error) return <div>cacota</div>;
  return (
    <Layout>
      <div className="lesson-detail-page">
        {loading && <Loading isLoading={true} />}
        {!authorized && (
          <div>
            You gotta buy it!
            <br />
            <Link to="/">Home</Link>
          </div>
        )}
        {authorized && lesson && (
          <>
            <LessonDetail {...lesson} />
            <div className="lesson-nav">
              {lesson.number === 0 ? (
                <Button onClick={() => backToCourse()}>
                  {t('course.Back to Course presentation')}
                </Button>
              ) : (
                <Button onClick={() => backOneLesson()}>
                  {t('course.Previous lesson')}
                </Button>
              )}
              {course.lessons &&
                course.lessons.length !== lessonCounter + 1 && (
                  <Button onClick={() => upOneLesson()}>
                    {t('course.Next lesson')}
                  </Button>
                )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default LessonPage;
