import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { resetPasswordAction } from '../../../store/actions/reset-password';
import Layout from '../../layout/Layout';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { t } = useTranslation(['global']);

  const { resetToken } = useParams();

  const handleSubmit = (newPassword) => {
    dispatch(resetPasswordAction(resetToken, newPassword, history, location));
    // TODO UX:
    // React-toastify -> 'Password updated'
  };

  return (
    <Layout>
      <h1>{t('reset password')}</h1>
      <ResetPasswordForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ResetPasswordPage;
