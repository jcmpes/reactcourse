import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { getAuth } from "../../../store/selectors";
import { FormField, Button, Input } from "../../../components/shared";
import FileUpload from '../../shared/FileUpload';

function EditCourseForm({ course, onSubmit, categories }) {
  const { t } = useTranslation(['global']);
  const { title, description, category, video, image, content } = course
  const [featuredImage, setFeaturedImage] = React.useState(null)
  const [courseDetails, setCourseDetails] = React.useState({
    'title': title || '',
    'description': description || '',
    'category': category || '',
    'video': video || '',
    'content': content || '',
  });

  const handleChange = (ev) => {
    setCourseDetails((oldCredentials) => ({
      ...oldCredentials,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    // Send course id to update in backend
    formData.append('_id', course._id)

    // Send the other details
    formData.append('title', courseDetails.title)
    formData.append('description', courseDetails.description)
    formData.append('category', courseDetails.category)
    formData.append('video', courseDetails.video)
    formData.append('content', courseDetails.content)
    if (image) formData.append('image', featuredImage)
    onSubmit(formData)
  };

  return (
    <div className="new-course-form">
      <div className="loginForm">
        <form className="loginForm" onSubmit={handleSubmit}>
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
            image={image}
            setImage={setFeaturedImage}
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



export default EditCourseForm;