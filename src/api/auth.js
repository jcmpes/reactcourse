import client, { configureClient, resetClient } from './client';
import storage from '../utils/storage';

// Log in
export const login = ({ remember, ...credentials }) => {
  return client
    .post('/api/v1/loginJWT', credentials)
    .then(({ token, displayName, purchased, favs }) => {
      configureClient({ token });
      if (remember) {
        storage.set('auth', token);
      }
      console.log('comprado ' + purchased);
      return { displayName, token, purchased, favs };
    });
};

// Log in with token
export const loginWithToken = (token) => {
  return client
    .post('/api/v1/login-with-token', { token })
    .then(({ displayName, purchased, favs }) => {
      configureClient({ token });
      return { displayName, token, purchased, favs };
    });
};

// Log out
export const logout = () => {
  return Promise.resolve().then(resetClient).then(storage.clear);
};

// Register
export const register = (credentials) => {
  return client
    .post('/api/v1/register', credentials)
    .then((data) => data)
    .catch((error) => error);
};

// Forgot Password
export const forgotPassword = (email) => {
  return client
    .post('/api/v1/forgot-password', { email })
    .then((data) => data)
    .catch((error) => console.log('Error', error));
};

// Reset Password
export const resetPassword = (resetToken, newPassword) => {
  return client
    .post('/api/v1/reset-password', { resetToken, newPassword })
    .then((data) => console.log(data))
    .catch((error) => console.error('Error', error));
};

export const whoAmI = () => {
  return client
    .get('/api/v1/aboutme')
    .then((name) => name.username)
    .catch((error) => console.error('Error', error));
};

export const isFav = (course) => {
  return client
    .get(`/api/v1/aboutme/isfav/${course}`)
    .then((isFav) => isFav.result);
};

export const myFavs = () => {
  return client
    .get(`/api/v1/aboutme/myfavs`)
    .then((favorites) => favorites.favs);
};

export const myFavsDetail = (setFavs) => {
  return client.get(`/api/v1/aboutme//myfavsdetails`).then((data) => {
    setFavs(data);
  });
};
