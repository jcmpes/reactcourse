import React from 'react';
import { useTranslation } from "react-i18next";
import { FormField, Button, Input } from "../../../components/shared"
import FileUpload from '../../shared/FileUpload'

function NewCourseForm({ onSubmit, categories, lessonCounter, setLessonCounter, courseDetails, setCourseDetails }) {
  const { t } = useTranslation(['global']);
  // const [image, setImage] = React.useState(null)  

  const handleChange = (ev) => {
    setCourseDetails((oldCredentials) => ({
      ...oldCredentials,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('title', courseDetails.title)
    formData.append('description', courseDetails.description)
    formData.append('category', courseDetails.category)
    formData.append('video', courseDetails.video)
    formData.append('content', courseDetails.content)
    if (courseDetails.image) formData.append('image', courseDetails.image)
    console.log('datos en react: ', formData)
    onSubmit(formData)
  };

  return (
    <div className="new-course-form">
      <h2>{t('course.course intro')}</h2>
      <div className="courseForm">
        <form onSubmit={handleSubmit}>
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
          <FormField
            type={"text"}
            label={'video'}
            name="video"
            value={courseDetails.video}
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
            image={courseDetails.image}
            lessonCounter={lessonCounter}
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