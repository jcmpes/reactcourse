import client, { configureClient, resetClient } from './client';

export const login = credentials => {
  return client
    .post('/api/v1/loginJWT', credentials)
    .then(({ token, displayName }) => {
      configureClient({ token });
      localStorage.setItem('auth', token);
      return displayName;
    });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    resetClient();
    localStorage.removeItem('auth');
  });
};
