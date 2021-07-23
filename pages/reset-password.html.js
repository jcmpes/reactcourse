import { useDispatch } from 'react-redux';
import { resetPasswordAction } from '../src/store/actions/reset-password';
import ResetPasswordForm from '../src/components/auth/ResetPasswordPage/ResetPasswordForm';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation'


const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const location = useRouter();
  const { resetToken } = useRouter().query;
  const { t } = useTranslation('common')

  const handleSubmit = (newPassword) => {
    dispatch(resetPasswordAction(resetToken, newPassword, history, location));
    // TODO UX:
    // React-toastify -> 'Password updated'
  };

  return (
    <>
      <h1>{t('reset password.reset password')}</h1>
      <p>{t('reset password.confirm password')}</p>
      <ResetPasswordForm onSubmit={handleSubmit} />
    </>
  );
};

export default ResetPasswordPage;
