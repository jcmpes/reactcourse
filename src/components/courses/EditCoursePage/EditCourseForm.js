import React from 'react';
import { useTranslation } from "react-i18next";
import { FormField, Button, Input } from "../../../components/shared";
import FileUpload from '../../shared/FileUpload';

function EditCourseForm({ courseDetails, setCourseDetails, onSubmit, categories }) {
  const { t } = useTranslation(['global']);
  const { title, description, category, video, image, content } = courseDetails
  const [featuredImage, setFeaturedImage] = React.useState(null)
  const [newCourseDetails, setNewCourseDetails] = React.useState({
    'title': title || '',
    'description': description || '',
    'category': category || '',
    'video': video || '',
    'content': content || '',
    'image': image ,
    'preview': { file: image }
  });

  const handleChange = (ev) => {
    setNewCourseDetails((oldCredentials) => ({
      ...oldCredentials,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    // Send course id to update in backend
    formData.append('_id', courseDetails._id)

    // Send the other details
    formData.append('title', newCourseDetails.title)
    formData.append('description', newCourseDetails.description)
    formData.append('category', newCourseDetails.category)
    formData.append('video', newCourseDetails.video)
    formData.append('content', newCourseDetails.content)
    if (newCourseDetails.image) formData.append('image', newCourseDetails.image)
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
            value={newCourseDetails.title}
            onChange={handleChange}
          />
          <Input
            as="select"
            label={'category'}
            name="category"
            value={newCourseDetails.category}
            onChange={handleChange}
            options={[{ name: 'Select category', _id: '000' }, ...categories]}
          />
          <FormField
            type={"text"}
            label={'description'}
            name="description"
            value={newCourseDetails.description}
            onChange={handleChange}
          />
          <FormField
            type={"text"}
            label={'video'}
            name="video"
            value={newCourseDetails.video}
            onChange={handleChange}
          />
          <FormField
            type={"textarea"}
            label={'content'}
            name="content"
            value={newCourseDetails.content}
            onChange={handleChange}
          />
          <FileUpload
            label={'image'}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            setCourseDetails={setNewCourseDetails}
            courseDetails={newCourseDetails}
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