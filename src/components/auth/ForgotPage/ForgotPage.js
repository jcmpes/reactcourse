import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { forgotPasswordAction } from '../../../store/actions/forgot-password';
import Layout from '../../layout/Layout';
import ForgotForm from './ForgotForm';

const ForgotPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (email) => {
    dispatch(forgotPasswordAction(email, history));
  };

  return (
    <Layout>
      <ForgotForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ForgotPage;
