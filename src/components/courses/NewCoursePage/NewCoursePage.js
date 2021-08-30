import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { categoriesLoadAction } from '../../../store/actions/categories-load';
import { getCategories, getLevels } from '../../../store/selectors';
import Layout from '../../layout/Layout';
import NewCourseForm from './NewCourseForm';
import NewLessonForm from './NewLessonForm';
import { courseCreateAction } from '../../../store/actions/course-new';
import { getUi } from '../../../store/selectors';
import Loading from '../../shared/Loading/Loading';
import { levelsLoadAction } from '../../../store/actions/levels-load';

function NewCoursePage() {
  const { loading } = useSelector(getUi);
  const [lessonCounter, setLessonCounter] = React.useState(0);
  const [courseDetails, setCourseDetails] = React.useState({
    title: '',
    description: '',
    category: '',
    video: '',
    content: '',
    requirements: '',
    whatYouWillLearn: '',
    level: '',
    image: '',
    preview: '',
    price: 0,
    lessons: [],
  });

  const [createdCourse, setCreatedCourse] = React.useState(null);
  const categories = useSelector(getCategories);
  const lvls = useSelector(getLevels);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    dispatch(levelsLoadAction());
  }, [dispatch]);

  const handleAddLesson = () => {
    setLessonCounter(lessonCounter + 1);

    setCourseDetails((oldDetails) => {
      const newLesson = {
        number: lessonCounter,
        title: '',
        description: '',
        video: '',
        content: '',
      };
      return {
        ...oldDetails, // Copy al the other key value pairs of onject
        lessons: courseDetails.lessons.concat(newLesson),
      };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('title', courseDetails.title);
    formData.append('description', courseDetails.description);
    formData.append('category', courseDetails.category);
    formData.append('video', courseDetails.video);
    formData.append('requirements', courseDetails.requirements);
    formData.append('whatYouWillLearn', courseDetails.whatYouWillLearn);
    formData.append('level', courseDetails.level);
    formData.append('content', courseDetails.content);
    formData.append('price', courseDetails.price);
    if (courseDetails.image) formData.append('image', courseDetails.image);
    if (courseDetails.lessons) {
      formData.append('lessons', JSON.stringify(courseDetails.lessons));
    }
    makeApiCall(formData);
  };

  const makeApiCall = async (courseDetails) => {
    const created = await dispatch(courseCreateAction(courseDetails));
    if (created) setCreatedCourse(created);
  };

  if (createdCourse && !loading) {
    return <Redirect to={`/courses/${createdCourse.slug}`} />;
  }

  return (
    <div className="new-course-page">
      {loading && <Loading isLoading={true} />}
      <Layout>
        <h1>Create a course</h1>
        {categories ? (
          <>
            {lessonCounter === 0 && (
              <>
                <NewCourseForm
                  onSubmit={handleSubmit}
                  level={lvls}
                  categories={categories}
                  lessonCounter={lessonCounter}
                  setLessonCounter={setLessonCounter}
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                />
              </>
            )}
            {lessonCounter !== 0 && (
              <>
                <NewLessonForm
                  onSubmit={handleSubmit}
                  lessonCounter={lessonCounter}
                  setLessonCounter={setLessonCounter}
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                />
              </>
            )}
            <div className="button-conainer">
              <div className="lesson-navigate">
                {lessonCounter !== 0 && (
                  <button
                    className="buttonSecondary"
                    onClick={() => setLessonCounter(lessonCounter - 1)}
                  >
                    Previous Step
                  </button>
                )}
              </div>
              {Object.keys(courseDetails.lessons).length !== lessonCounter ? (
                <div className="button-conainer">
                  <button
                    className="buttonSecondary"
                    onClick={() => setLessonCounter(lessonCounter + 1)}
                  >
                    Next step
                  </button>
                </div>
              ) : (
                <div className="button-conainer">
                  <button className="buttonSecondary" onClick={handleAddLesson}>
                    Add a lesson
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          'Loading categories'
        )}
      </Layout>
    </div>
  );
}

export default NewCoursePage;
