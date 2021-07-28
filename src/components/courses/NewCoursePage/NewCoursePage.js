import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { postCourse } from "../../../api/courses";
import { categoriesLoadAction } from "../../../store/actions/categories-load";
import { courseDetailAction } from "../../../store/actions/course-detail";
import { getCategories } from "../../../store/selectors";
import Layout from "../../layout/Layout";
import NewCourseForm from "./NewCourseForm";
import NewLessonForm from "./NewLessonForm";

function NewCoursePage() {
  const [lessonCounter, setLessonCounter] = React.useState(0)
  const [courseDetails, setCourseDetails] = React.useState({
    'title': '',
    'description': '',
    'category': '',
    'video': '',
    'content': '',
    "image": '',
    "preview": '',
    "price": 0,
    'lessons': []
  })

  const [createdCourse, setCreatedCourse] = React.useState(null);
  const categories = useSelector(getCategories)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(categoriesLoadAction());
    // dispatch(courseDetailAction())
  }, [dispatch])

  const handleAddLesson = () => {
    setLessonCounter(lessonCounter + 1);
    setCourseDetails(oldDetails => ({
      ...oldDetails,                // Copy al the other key value pairs of onject
      lessons: [...oldDetails.lessons,
              {
                "number": lessonCounter,
                "title": '',
                "description": '',
                "video": '',
                "content": '',
                "image": '',
                "preview": ''
              }]
    
    }))
  }

  function handleSubmit(courseDetails) {
    postCourse(courseDetails)
      .then(result => {
        if (result.slug) setCreatedCourse(result)
        if (result.error === 'no token provided'
          || result.error === 'The token provided is invalid or has expired') {
            toast.error('Invalid token: Log back in and try again')
          }
      }).catch(err => err)
  }

  if (createdCourse) {
    return <Redirect to={`/courses/${createdCourse.slug}`} />
  }

  return (
    <div className="new-course-page">
      <Layout>
        <h1>Create a course</h1>
        {categories ?
          <>
            {lessonCounter === 0 && 
              <>
                <NewCourseForm
                  onSubmit={handleSubmit}
                  categories={categories}
                  lessonCounter={lessonCounter}
                  setLessonCounter={setLessonCounter}
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                />
                
              </>
            }
            {lessonCounter !== 0 &&
              <>
                <NewLessonForm
                  onSubmit={handleSubmit}
                  lessonCounter={lessonCounter}
                  setLessonCounter={setLessonCounter}
                  courseDetails={courseDetails}
                  setCourseDetails={setCourseDetails}
                />
                
              </>
            }
            <div className="lesson-navigate">
            {lessonCounter !== 0
              && <button onClick={() => setLessonCounter(lessonCounter - 1)}>Previous Step</button>
            }
            {courseDetails.lessons.length !== lessonCounter
              ? <button onClick={() => setLessonCounter(lessonCounter + 1)}>Next step</button>
              : <button onClick={handleAddLesson}>Add a lesson</button>
            }
          </div>
          </>
        : 'Loading categories'}
      </Layout>
    </div>
  )
};

export default NewCoursePage;