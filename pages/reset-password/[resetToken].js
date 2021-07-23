import { useDispatch } from 'react-redux';
import { resetPasswordAction } from '../../src/store/actions/reset-password';
import ResetPasswordForm from '../../src/components/auth/ResetPasswordPage/ResetPasswordForm';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation'


const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const location = useRouter();
  const { t } = useTranslation('common')

  
  const { resetToken } = useRouter().query;

  const handleSubmit = (newPassword) => {
    dispatch(resetPasswordAction(resetToken, newPassword, history, location));
    // TODO UX:
    // React-toastify -> 'Password updated'
  };

  return (
    <>
      <h1>{t('reset password.reset password')}</h1>
      <p>{t('reset password.please enter your new password')}</p>
      <ResetPasswordForm onSubmit={handleSubmit} />
    </>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  return { paths: [], fallback: false }
}

export default ResetPasswordPage;
