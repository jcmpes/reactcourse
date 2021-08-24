import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Button, Input } from '../../../components/shared';
import FileUpload from '../../shared/FileUpload';

function NewCourseForm({
  onSubmit,
  categories,
  lessonCounter,
  courseDetails,
  setCourseDetails,
}) {
  const { t } = useTranslation(['global']);

  const handleChange = (ev) => {
    setCourseDetails((oldCredentials) => ({
      ...oldCredentials,
      [ev.target.name]: ev.target.value,
    }));
  };

  const verifyForm = () => {
    if (
      !courseDetails.title ||
      !courseDetails.category ||
      courseDetails.price < 0
    ) {
      return true;
    }
    return false;
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
            placeholder="Title"
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
            type={'text'}
            label={'description'}
            name="description"
            placeholder="Description"
            value={courseDetails.description}
            onChange={handleChange}
          />
          <FormField
            type={'text'}
            label={'video'}
            name="video"
            placeholder="Video"
            value={courseDetails.video}
            onChange={handleChange}
          />
          <FormField
            type={'number'}
            label={'price'}
            min="0"
            max="1000"
            name="price"
            placeholder="Price"
            value={courseDetails.price}
            onChange={handleChange}
          />
          <FormField
            type={'textarea'}
            label={'content'}
            name="content"
            placeholder="Content"
            value={courseDetails.content}
            onChange={handleChange}
          />
          <FormField
            type={'text'}
            label={'requirements'}
            name="requirements"
            placeholder="Requirements"
            value={courseDetails.requirements}
            onChange={handleChange}
          />
          <FormField
            type={'text'}
            label={'whatYouWillLearn'}
            name="whatYouWillLearn"
            placeholder="What you will learn"
            value={courseDetails.whatYouLearn}
            onChange={handleChange}
          />
          <Input
            as="select"
            label={'level'}
            name="level"
            value={courseDetails.level}
            onChange={handleChange}
            options={[
              { name: 'Easy', _id: '0', value: '0' },
              { name: 'Medium', _id: '1', value: '1' },
              { name: 'Hard', _id: '2', value: '2' },
              { name: 'Expert', _id: '3', value: '3' },
            ]}
          />
          <FileUpload
            label={'image'}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
          />
          <Button disabled={verifyForm()} type="submit">
            {t('submit')}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewCourseForm;
