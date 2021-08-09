import React from 'react';
import { useTranslation } from "react-i18next";
import { FormField, Button, Input } from "../../../components/shared"
import FileUpload from '../../shared/FileUpload'
import VideoUpload from '../../shared/VideoUpload';

function NewCourseForm({ onSubmit, categories, lessonCounter, courseDetails, setCourseDetails }) {
  const { t } = useTranslation(['global']);

  const handleChange = (ev) => {
    setCourseDetails((oldCredentials) => ({
      ...oldCredentials,
      [ev.target.name]: ev.target.value,
    }));
  };

  return (
    <div className="new-course-form">
      <h2>{t('course.course intro')}</h2>
      <div className="courseForm">
        <form onSubmit={onSubmit}>
          <FormField
            type="text"
            label={'title'}
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
          />
          <Input
            as="select"
            label={'category'}
            name="category"
            value={courseDetails.category}
            onChange={handleChange}
            options={[{ name: 'Select category', _id: '000' }, ...categories]}
          />
          <FormField
            type={"text"}
            label={'description'}
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
          />
          {/* <FormField
            type={"text"}
            label={'video'}
            name="video"
            value={courseDetails.video}
            onChange={handleChange}
          /> */}
          <VideoUpload
            label={"video"}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
          />
          <FormField
            type={"number"}
            label={'price'}
            name="price"
            value={courseDetails.price}
            onChange={handleChange}
          />
          <FormField
            type={"textarea"}
            label={'content'}
            name="content"
            value={courseDetails.content}
            onChange={handleChange}
          />
          <FileUpload
            label={'image'}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
          />
          
          <Button
            type="submit"
          >
            {t('submit')}
          </Button>
        </form>
      </div>
    </div>
  )
}



export default NewCourseForm;