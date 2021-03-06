import client, { configureClient, resetClient } from './client';
import storage from '../utils/storage';

// Log in
export const login = ({ remember, ...credentials }) => {
  return client
    .post('/api/v1/loginJWT', credentials)
    .then(({ token, displayName, purchased, favs, avatar }) => {
      configureClient({ token });
      if (remember) {
        storage.set('auth', token);
      }
      return { displayName, token, purchased, favs, avatar };
    });
};

// Log in with token
export const loginWithToken = (token) => {
  return client
    .post('/api/v1/login-with-token', { token })
    .then(({ displayName, purchased, favs, avatar }) => {
      configureClient({ token });
      return { displayName, token, purchased, favs, avatar };
    });
};

// Log out
export const logout = () => {
  return Promise.resolve().then(resetClient).then(storage.clear);
};

// Register
export const register = (formData) => {
  return client
    .post('/api/v1/register', formData)
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

export const aboutMe = (setDetails) => {
  return client
    .get('/api/v1/aboutme')
    .then(setDetails)
    .catch((error) => {
      console.log('Error', error);
    });
};

export const whoAmI = () => {
  return client
    .get('/api/v1/aboutme')
    .then((name) => ({ username: name.username, avatar: name.avatar }))
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

export const myFavsDetail = () => {
  return client.get(`/api/v1/aboutme/myfavsdetails`);
};

export const editUser = (userDetails) => {
  return client.put(`/api/v1/user/edit`, userDetails).catch((error) => error);
};

export const deleteAccount = (password) => {
  return client.post(`/api/v1/user/delete-account`, password);
};

export const myPurchases = () => {
  return client.get('/api/v1/aboutme/detailed-purchases');
};
