import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { registerAction } from '../../../store/actions/register';
import RegisterForm from './RegisterForm';

// React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </Layout>
  );
};

export default RegisterPage;
