import client, { configureClient, resetClient } from './client';

// Log in
export const login = credentials => {
  return client
    .post('/api/v1/loginJWT', credentials)
    .then(({ token, displayName }) => {
      configureClient({ token });
      localStorage.setItem('auth', token);
      return displayName;
    });

};

// Log out
export const logout = () => {
  return Promise.resolve().then(() => {
    resetClient();
    localStorage.removeItem('auth');
  });
};

// Register
export const register = (credentials) => {
  return client
    .post('/api/v1/register', credentials)
    .then((data) => data)
    .catch((error) => console.error('Error', error));
};

// Forgot Password
export const forgotPassword = email => {
  return client
    .post('/api/v1/forgot', { email })
    .then((data) => data)
    .catch(error => console.log('Error', error));
}

