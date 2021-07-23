import { useDispatch } from 'react-redux';
import { loginAction } from '../src/store/actions/login';
import LoginForm from '../src/components/auth/LoginPage/LoginForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

function LoginPage() {
  const history = useRouter();
  const location = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials, history, location));
  };

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="login here"/>
      </Head>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} />
    </div>
 );
}

export default LoginPage;
