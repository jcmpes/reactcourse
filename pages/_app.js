import { Provider } from 'react-redux';
import Layout from '../src/components/layout/Layout'
import configureStore from '../src/store'
import storage from '../src/utils/storage';

import '../styles/globals.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginWithToken } from '../src/api/auth';
import { configureClient } from '../src/api/client';

const accessToken = storage.get('auth');

const preState = {
  preloadedState: {
    auth: {
      isLogged: false,
      username: null,
      favs: [],
      loaded: false,
    },
    ui: {
      loading: false,
      error: null,
    },
    // history,
  },
};

if (!!accessToken) {
  loginWithToken(accessToken).then((data) => {
    if (!data.displayName) {
      storage.remove('auth');
    } else {
      configureClient({ accessToken });
      preState.preloadedState.auth.isLogged = true;
      preState.preloadedState.auth.username = data.displayName;
      preState.preloadedState.auth.favs = data.favs;
    }
  });
}

const store = configureStore(preState);
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </Layout>
    </Provider>
  )
}

export default MyApp
