import { useDispatch } from 'react-redux';
import { forgotPasswordAction } from '../../../store/actions';
import Layout from '../../layout/Layout';
import ForgotForm from './ForgotForm';

const ForgotPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (email) => {
    dispatch(forgotPasswordAction(email));
  };

  return (
    <Layout>
      <ForgotForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ForgotPage;
