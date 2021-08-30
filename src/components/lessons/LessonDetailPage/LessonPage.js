import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCourse } from '../../../api/courses';
import { getLesson } from '../../../api/lessons';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import LessonDetail from './LessonDetail';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import Loading from '../../shared/Loading/Loading';
import { apiCallLoadAction } from '../../../store/actions/api-call';

function LessonPage() {
  const { loading, error } = useSelector(getUi);
  const { courseSlug, lessonSlug } = useParams();
  const [lesson, setLesson] = useState({});
  const [course, setCourse] = useState({});
  // const [error, setError] = useState(null);
  const [lessonCounter, setLessonCounter] = useState(0);
  const history = useHistory();
  // const [authorized, setAuthorized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiCallLoadAction(getCourse, setCourse, courseSlug))
    dispatch(apiCallLoadAction(getLesson, setLesson, courseSlug, lessonSlug))
    setLessonCounter(lesson.number);

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

  if (error) return <div>cacota</div>;
  return (
    <Layout>
      <div className="lesson-detail-page">
        {loading && <Loading isLoading={true} />}
        {/* {!authorized && (
          <div>
            You gotta buy it!
            <br />
            <Link to="/">Home</Link>
          </div>
        )} */}
        {lesson && (
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
