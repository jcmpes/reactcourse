import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLesson } from '../../../api/lessons';
import { getUi } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import LessonDetail from './LessonDetail';

function LessonPage() {
  const { courseSlug, lessonSlug } = useParams();
  const { loading } = useSelector(getUi);
  const [lesson, setLesson] = useState()

  React.useEffect(() => {
    const fetchData = async () =>  {
      setLesson(await getLesson(courseSlug, lessonSlug))
    }
    fetchData()
    console.log(lesson)
  }, [courseSlug]);

  return (
    <Layout>
      <div className="lesson-detail-page">
        {loading && "I'm loading..."}
        {lesson && <LessonDetail {...lesson} />}
      </div>
    </Layout>
  );
}

export default LessonPage;
