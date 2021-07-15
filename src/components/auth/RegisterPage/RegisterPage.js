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
    dispatch(registerAction(credentials, history, location));
  };

  return (
    <Layout>
      <h1>{t('register')}</h1>
      <RegisterForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default RegisterPage;
