import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { getAuth } from "../../../store/selectors";
import { FormField, Button, Input } from "../../../components/shared"

function NewCourseForm({ onSubmit, categories }) {
  const { t } = useTranslation(['global']);
  const { username } = useSelector(getAuth);
  const [courseDetails, setCourseDetails] = React.useState({
    'title': '',
    'description': '',
    'category': '',
    'video': '',
    'content': '',
    'user': username,
  });

  const handleChange = (ev) => {
    setCourseDetails((oldCredentials) => ({
      ...oldCredentials,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(courseDetails)
  };

  return (
    <div className="new-course-form">
      <div className="loginForm">
        <form className="loginForm" onSubmit={handleSubmit}>
          <FormField
            type="text"
            label={'title'}
            name="title"
            value={courseDetails.email}
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