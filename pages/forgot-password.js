import { useDispatch } from 'react-redux';
import { forgotPasswordAction } from '../src/store/actions/forgot-password';
import ForgotForm from '../src/components/auth/ForgotPage/ForgotForm';
import { useRouter } from 'next/router';

const ForgotPage = () => {
  const dispatch = useDispatch();
  const history = useRouter();

  const handleSubmit = (email) => {
    dispatch(forgotPasswordAction(email, history));
  };

  return (
      <ForgotForm onSubmit={handleSubmit} />
  );
};

export default ForgotPage;
