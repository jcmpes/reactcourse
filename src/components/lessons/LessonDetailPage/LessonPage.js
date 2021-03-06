import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getLesson } from '../../../api/lessons';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import LessonDetail from './LessonDetail';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import Loading from '../../shared/Loading/Loading';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../shared/ErrorMessage';

function LessonPage() {
  const { loading, error } = useSelector(getUi);
  const { courseSlug, lessonSlug } = useParams();
  const [lesson, setLesson] = useState({});
  const [course, setCourse] = useState({});
  // const [error, setError] = useState(null);
  const [lessonCounter, setLessonCounter] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const singleCourse = await getCourse(courseSlug);
      setCourse(singleCourse);
      const singleLesson = await getLesson(courseSlug, lessonSlug);
      return singleLesson;
    };
    fetchData().then((singleLesson) => {
      setLesson(singleLesson);
      lesson && setLessonCounter(lesson.number);
    }).catch(err => console.log(err));
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
  if (error) return <ErrorMessage error={error} />;
  return (
    <Layout>
      <div className="lesson-detail-page">
        {loading && <Loading isLoading={true} />}
        {!lesson && (
          <div>
            You gotta buy it!
            <br />
            <Link to="/">Home</Link>
          </div>
        )}
        {lesson && course && (
          <>
            <LessonDetail {...lesson} avatar={course.user ? course.user.avatar : null} />
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
