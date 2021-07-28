import React from 'react';
import { useTranslation } from "react-i18next";
import { FormField, Button, Input } from "../../../components/shared"
import FileUpload from '../../shared/FileUpload'

function NewLessonForm({ onSubmit, lessonCounter, courseDetails, setCourseDetails }) {
  const { t } = useTranslation(['global']);

  if (courseDetails.lessons.length === lessonCounter) {
    courseDetails.lessons[lessonCounter]({
      "number": lessonCounter,
      "title": '',
      "description": '',
      "video": '',
      "content": '',
      "image": ''
    })
  }
  const number = lessonCounter - 1

  // Control fields for lesson via page state
  const handleChange = (ev) => {
    setCourseDetails((oldDetails) => {
      const lessons = { ...oldDetails.lessons }
      lessons[number][ev.target.name] = ev.target.value;
      return {
        ...oldDetails,
        lessons
      }
    });
  };
  console.log(courseDetails.lessons)
  return (
    <div className="new-lesson-form">
      <h2>{t('course.create lesson') + ' ' + lessonCounter }</h2>
      <div className="lessonForm">
        <form onSubmit={onSubmit}>
          <FormField
            type="text"
            label={'title'}
            name="title"
            value={courseDetails.lessons[number].title}
            onChange={handleChange}
          />
          <FormField
            type={"text"}
            label={'description'}
            name="description"
            value={courseDetails.lessons[number].description}
            onChange={handleChange}
          />
          <FormField
            type={"text"}
            label={'video'}
            name="video"
            value={courseDetails.lessons[number].video}
            onChange={handleChange}
          />
          <FormField
            type={"textarea"}
            label={'content'}
            name="content"
            value={courseDetails.lessons[number].content}
            onChange={handleChange}
          />
          <FileUpload
            label={'image'}
            image={courseDetails.lessons[number].image}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
            lessonCounter={lessonCounter}
          />
          <Button
            type="submit"
          >
            {t('course.save course')}
          </Button>
        </form>
      </div>
    </div>
  )
}



export default NewLessonForm;