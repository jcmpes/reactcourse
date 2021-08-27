import React from 'react';
import client from '../../../api/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FormField, Button, Input } from '../../../components/shared';
import FileUpload from '../../shared/FileUpload';
import ConfirmButton from '../../shared/ConfirmButton';
require('dotenv').config();

function EditCourseForm({
  courseDetails,
  onSubmit,
  categories,
}) {
  const { t } = useTranslation(['global']);
  const history = useHistory();
  const initialCategory = categories.find(
    (cat) => cat._id === courseDetails.category,
  );
  const {
    title,
    description,
    video,
    image,
    content,
    requirements,
    whatYouWillLearn,
    level,
  } = courseDetails;
  const [featuredImage, setFeaturedImage] = React.useState(null);
  const [newCourseDetails, setNewCourseDetails] = React.useState({
    title: title || '',
    description: description || '',
    category: initialCategory.name || '',
    video: video || '',
    content: content || '',
    requirements: requirements || '',
    whatYouWillLearn: whatYouWillLearn || '',
    level: level || '',
    image: image,
    preview: { file: image },
  });

  const deleteCourse = () => {
    client
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/courses/${courseDetails._id}`,
      )
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        console.log('Error deleting course: ', err);
      });
  };

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
    formData.append('_id', courseDetails._id);

    // Send the other details
    formData.append('title', newCourseDetails.title);
    formData.append('description', newCourseDetails.description);
    formData.append('category', newCourseDetails.category);
    formData.append('video', newCourseDetails.video);
    formData.append('content', newCourseDetails.content);
    formData.append('requirements', newCourseDetails.requirements);
    formData.append('whatYouWillLearn', newCourseDetails.whatYouWillLearn);
    formData.append('level', newCourseDetails.level);
    if (newCourseDetails.image)
      formData.append('image', newCourseDetails.image);
    onSubmit(formData);
  };

  return (
    <div className="new-course-form">
      <div className="loginForm">
        <form className="loginForm" onSubmit={handleSubmit}>
          <FormField
            type="text"
            label={'title'}
            name="title"
            placeholder="Title"
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
            type={'text'}
            label={'description'}
            name="description"
            placeholder="Description"
            value={newCourseDetails.description}
            onChange={handleChange}
          />
          <FormField
            type={'text'}
            label={'video'}
            name="video"
            placeholder="Video"
            value={newCourseDetails.video}
            onChange={handleChange}
          />
          <FormField
            type={'textarea'}
            label={'content'}
            name="content"
            placeholder="Content"
            value={newCourseDetails.content}
            onChange={handleChange}
          />
          <FormField
            type={'text'}
            label={'requirements'}
            name="requirements"
            placeholder="Requirements"
            value={newCourseDetails.requirements}
            onChange={handleChange}
          />
          <FormField
            type={'text'}
            label={'whatYouWillLearn'}
            name="whatYouWillLearn"
            placeholder="What will learn"
            value={newCourseDetails.whatYouWillLearn}
            onChange={handleChange}
          />
          <FormField
            type={'number'}
            label={'level'}
            name="level"
            placeholder="Level"
            min="0"
            max="3"
            value={newCourseDetails.level}
            onChange={handleChange}
          />
          <FileUpload
            label={'image'}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            setCourseDetails={setNewCourseDetails}
            courseDetails={newCourseDetails}
          />
          <Button type="submit">{t('submit')}</Button>
        </form>
        <ConfirmButton
          iconButton={null}
          titleButton={t('course.delete course')}
          okAction={deleteCourse}
          message={<div>{t('course.sure you want to delete')}</div>}
          subtitle={<div>{t('course.deletion confirmation message')}</div>}
        />
      </div>
    </div>
  );
}

export default EditCourseForm;
