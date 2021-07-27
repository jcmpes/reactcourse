import React from 'react';
import { useTranslation } from "react-i18next";
import { FormField, Button, Input } from "../../../components/shared"
import FileUpload from '../../shared/FileUpload'

function NewLessonForm({ onSubmit, lessonCounter, courseDetails, setCourseDetails }) {
  const { t } = useTranslation(['global']);

  if (courseDetails.lessons.length === lessonCounter) {
    courseDetails.lessons.push({
      "number": lessonCounter,
      "title": '',
      "description": '',
      "video": '',
      "content": '',
      "image": ''
    })
  }

  // Control fields for lesson via page state
  const handleChange = (ev) => {
    setCourseDetails((oldDetails) => {
      const lessons = [ ...oldDetails.lessons ]
      lessons[lessonCounter][ev.target.name] = ev.target.value;
      return {
        ...oldDetails,
        lessons
      }
    });
  };

  return (
    <div className="new-lesson-form">
      <h2>{t('course.create lesson') + ' ' + lessonCounter }</h2>
      <div className="lessonForm">
        <form>
          <FormField
            type="text"
            label={'title'}
            name="title"
            value={courseDetails.lessons[lessonCounter].title}
            onChange={handleChange}
          />
          <FormField
            type={"text"}
            label={'description'}
            name="description"
            value={courseDetails.lessons[lessonCounter].description}
            onChange={handleChange}
          />
          <FormField
            type={"text"}
            label={'video'}
            name="video"
            value={courseDetails.lessons[lessonCounter].video}
            onChange={handleChange}
          />
          <FormField
            type={"textarea"}
            label={'content'}
            name="content"
            value={courseDetails.lessons[lessonCounter].content}
            onChange={handleChange}
          />
          <FileUpload
            label={'image'}
            image={courseDetails.lessons[lessonCounter].image}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
            lessonCounter={lessonCounter}
          />
          <Button
            onClick={onSubmit}
          >
            {t('course.save course')}
          </Button>
        </form>
      </div>
    </div>
  )
}



export default NewLessonForm;