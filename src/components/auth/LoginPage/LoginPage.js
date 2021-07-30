import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loginAction } from '../../../store/actions/login';
import LoginForm from './LoginForm';
import Layout from '../../layout/Layout';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials, history, location));
  };

  const { t } = useTranslation(['global']);

  return (
    <Layout>
      <h1>{t('log in')}</h1>
      <LoginForm onSubmit={handleSubmit} />
    </Layout>
  );
}

export default LoginPage;
