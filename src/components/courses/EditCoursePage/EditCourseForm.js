import React from 'react';
import client from '../../../api/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FormField, Button, Input } from '../../../components/shared';
import FileUpload from '../../shared/FileUpload';
import ConfirmButton from '../../shared/ConfirmButton';
require('dotenv').config();

function EditCourseForm({ courseDetails, onSubmit, categories, levels }) {
  const { t } = useTranslation(['global']);
  const history = useHistory();
  const initialCategory = categories.find(
    (cat) => cat._id === courseDetails.category,
  );
  console.log(courseDetails.level._id);
  console.log();
  const initialLevel = levels.find(
    (lvl) => lvl._id === courseDetails.level._id,
  );
  const {
    title,
    description,
    video,
    image,
    content,
    requirements,
    whatYouWillLearn,
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
    level: initialLevel.name || '',
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
    console.log('Mndo:------->', newCourseDetails.level);
    // Send the other details
    formData.append('title', newCourseDetails.title);
    formData.append('description', newCourseDetails.description);
    formData.append('category', newCourseDetails.category);
    formData.append('video', newCourseDetails.video);
    formData.append('price', newCourseDetails.price);
    formData.append('content', newCourseDetails.content);
    formData.append('requirements', newCourseDetails.requirements);
    formData.append('whatYouWillLearn', newCourseDetails.whatYouWillLearn);
    formData.append('level', newCourseDetails.level);
    if (newCourseDetails.image)
      formData.append('image', newCourseDetails.image);
    onSubmit(formData);
  };

  const verifyForm = () => {
    if (
      !newCourseDetails.title ||
      !newCourseDetails.category ||
      !newCourseDetails.level ||
      !newCourseDetails.description ||
      !newCourseDetails.requirements ||
      !newCourseDetails.content ||
      !newCourseDetails.whatYouWillLearn ||
      newCourseDetails.price < 0
    ) {
      return true;
    }
    return false;
  };

  console.log(verifyForm());

  return (
    <div className="new-course-form">
      <div className="courseForm">
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 ">
              <div className="row justify-content-md-center">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <FormField
                    type="text"
                    label={t('Title')}
                    rows={8}
                    cols={50}
                    name="title"
                    placeholder={t('Title')}
                    value={newCourseDetails.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  <FormField
                    type={'text'}
                    label={t('Video')}
                    name="video"
                    placeholder={t('Video')}
                    value={newCourseDetails.video}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <FormField
                    type={'number'}
                    label={t('Price')}
                    min="0"
                    max="1000"
                    name="price"
                    placeholder={t('Price')}
                    value={newCourseDetails.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row justify-content-md-center textareaWrapper">
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <textarea
                    type={'textarea'}
                    label={t('Content')}
                    rows={8}
                    cols={50}
                    name="content"
                    placeholder={t('Content')}
                    value={newCourseDetails.content}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <textarea
                    type={'text'}
                    label={t('Description')}
                    rows={8}
                    cols={50}
                    name="description"
                    placeholder={t('Description')}
                    value={newCourseDetails.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <textarea
                    type={'text'}
                    label={t('Requirements')}
                    name="requirements"
                    rows={8}
                    cols={50}
                    placeholder={t('course.Requirements')}
                    value={newCourseDetails.requirements}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <textarea
                    type={'text'}
                    label={t('What you will learn')}
                    rows={8}
                    cols={50}
                    name="whatYouWillLearn"
                    placeholder={t('course.What you will learn')}
                    value={newCourseDetails.whatYouWillLearn}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="row justify-content-md-center selectByCategory">
                <div className="col-lg-4 col-md-6 col-sm-12 selectCategoryBarContainer">
                  <Input
                    className="selectCategoryBarForm"
                    as="select"
                    name="category"
                    value={newCourseDetails.category}
                    onChange={handleChange}
                    options={[
                      { name: 'Select category', _id: '000' },
                      ...categories,
                    ]}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="searchLevelyBarContainer">
                    <Input
                      className="searchLevelBarForm"
                      as="select"
                      name="level"
                      value={newCourseDetails.level}
                      onChange={handleChange}
                      options={[
                        { name: t('filter.Select Levels'), _id: '000' },
                        ...levels,
                      ]}
                    />
                  </div>
                </div>
                <FileUpload
                  label={'image'}
                  featuredImage={featuredImage}
                  setFeaturedImage={setFeaturedImage}
                  setCourseDetails={setNewCourseDetails}
                  courseDetails={newCourseDetails}
                />
              </div>
            </div>
          </div>
          <Button disabled={verifyForm()} type="submit">
            {t('course.Edit course')}
          </Button>
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
