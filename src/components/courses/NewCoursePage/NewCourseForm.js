import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Button, Input } from '../../../components/shared';
import FileUpload from '../../shared/FileUpload';
import './NewCourseForm.css';

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
          <div className="row">
            <div className="col-12 ">
              <div className="row justify-content-md-center">
                <div className="col-lg-3 col-md-6 col-sm-3">
                  <FormField
                    type="text"
                    label={'title'}
                    rows={8}
                    cols={50}
                    name="title"
                    placeholder="Title"
                    value={courseDetails.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-lg-3 col-md-6 col-sm-3">
                  <FormField
                    type={'text'}
                    label={'video'}
                    name="video"
                    placeholder="Video"
                    value={courseDetails.video}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-3">
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
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row justify-content-md-center textareaWrapper">
                <div className="col-sm-3 col-md-6">
                  <textarea
                    type={'textarea'}
                    label={'content'}
                    rows={8}
                    cols={50}
                    name="content"
                    placeholder="Content"
                    value={courseDetails.content}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-md-6 col-sm-3">
                  <textarea
                    type={'text'}
                    label={'description'}
                    rows={8}
                    cols={50}
                    name="description"
                    placeholder="Description"
                    value={courseDetails.description}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-md-6 col-sm-3">
                  <textarea
                    type={'text'}
                    label={'requirements'}
                    name="requirements"
                    rows={8}
                    cols={50}
                    placeholder="Requirements"
                    value={courseDetails.requirements}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-3 col-md-6">
                  <textarea
                    type={'text'}
                    label={'whatYouWillLearn'}
                    rows={8}
                    cols={50}
                    name="whatYouWillLearn"
                    placeholder="What you will learn"
                    value={courseDetails.whatYouLearn}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="row justify-content-md-center selectByCategory">
                <div className="col-lg-2 col-md-6 col-sm-3 selectCategoryBarContainer">
                  <Input
                    className="selectCategoryBarForm"
                    as="select"
                    name="category"
                    value={courseDetails.category}
                    onChange={handleChange}
                    options={[
                      { name: 'Select category', _id: '000' },
                      ...categories,
                    ]}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-3">
                  <FormField
                    type={'number'}
                    label={'level'}
                    name="level"
                    min="0"
                    max="3"
                    placeholder="Level"
                    value={courseDetails.level}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-3">
                  <FileUpload
                    courseDetails={courseDetails}
                    setCourseDetails={setCourseDetails}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button disabled={verifyForm()} type="submit">
            {t('submit')}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewCourseForm;
