import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Button } from '../../../components/shared';

function NewLessonForm({
  onSubmit,
  lessonCounter,
  courseDetails,
  setCourseDetails,
}) {
  const { t } = useTranslation(['global']);

  const number = lessonCounter - 1;

  // Control fields for lesson via page state
  const handleChange = (ev) => {
    setCourseDetails((oldDetails) => {
      const lessons = [...oldDetails.lessons];
      lessons[number][ev.target.name] = ev.target.value;
      return {
        ...oldDetails,
        lessons,
      };
    });
  };
  return (
    <div className="new-lesson-form">
      <h2>{t('course.create lesson') + ' ' + lessonCounter}</h2>
      <div className="lessonForm">
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12 ">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormField
                    type="text"
                    label={t('Title')}
                    name="title"
                    placeholder={t('Title')}
                    value={courseDetails.lessons[number].title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <FormField
                    type={'text'}
                    label={t('Video')}
                    name="video"
                    placeholder={t('Video')}
                    value={courseDetails.lessons[number].video}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 ">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <textarea
                    type={'text'}
                    label={t('Description')}
                    rows={8}
                    cols={50}
                    name="description"
                    placeholder={t('Description')}
                    value={courseDetails.lessons[number].description}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <textarea
                    type={'textarea'}
                    label={t('Content')}
                    rows={8}
                    cols={50}
                    name="content"
                    placeholder={t('Content')}
                    value={courseDetails.lessons[number].content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <Button type="submit">{t('course.save course')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewLessonForm;
