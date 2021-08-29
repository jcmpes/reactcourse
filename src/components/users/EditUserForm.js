import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Button } from '../shared';
import userIcon from '../../assets/svg/user.svg';
import emailIcon from '../../assets/svg/envelope.svg';
import lockIcon from '../../assets/svg/lock.svg';
//import FileUpload from '../../shared/FileUpload'

function EditUserForm({ onSubmit, setUserDetails, userDetails }) {
  const { t } = useTranslation(['global']);

  const onSubmitForm = (ev) => {
    ev.preventDefault();
    onSubmit({
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
    });
  };

  const handleChange = (ev) => {
    setUserDetails((oldValue) => ({
      ...oldValue,
      [ev.target.name]: ev.target.value,
    }));
  };

  return (
    <div className="new-course-form">
      {/* <h2>{t('Edit profile')}</h2> */}
      <div className="courseForm">
        <form onSubmit={onSubmitForm}>
          <FormField
            type="text"
            label={'username'}
            name="username"
            value={userDetails.username || ''}
            icon={userIcon}
            onChange={handleChange}
          />
          <FormField
            type="text"
            label={'email'}
            name="email"
            value={userDetails.email || ''}
            icon={emailIcon}
            onChange={handleChange}
          />
          <FormField
            type="password"
            placeholder={t('password')}
            label={'password'}
            name="password"
            value={userDetails.password || ''}
            icon={lockIcon}
            onChange={handleChange}
          />
          <FormField
            type="password"
            placeholder={t('confirm password')}
            label={'password'}
            name="password2"
            value={userDetails.password2 || ''}
            icon={lockIcon}
            onChange={handleChange}
          />

          <Button
            type="submit"
            disabled={
              userDetails.username === '' ||
              userDetails.email === '' ||
              userDetails.password !== userDetails.password2
            }
          >
            {t('submit')}
          </Button>
        </form>
        {userDetails.password !== '' &&
          userDetails.password2 !== '' &&
          userDetails.password !== userDetails.password2 && (
            <div style={{ color: 'red' }}>{t('Passwords should match')}</div>
          )}
      </div>
    </div>
  );
}

export default EditUserForm;
