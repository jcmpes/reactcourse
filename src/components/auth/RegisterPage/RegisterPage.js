import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { registerAction } from '../../../store/actions/register';
import RegisterForm from './RegisterForm';

import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';

const RegisterPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { t } = useTranslation(['global']);

  const handleSubmit = (credentials) => {
    const formData = new FormData();
    formData.append('email', credentials.email)
    formData.append('password', credentials.password)
    formData.append('username', credentials.username)
    if (credentials.image) formData.append('image', credentials.image)
    dispatch(registerAction(formData, history, location));
  };

  return (
    <Layout>
      <h1>{t('register')}</h1>
      <RegisterForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default RegisterPage;
