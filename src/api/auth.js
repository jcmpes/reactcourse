import client, { configureClient, resetClient } from './client';
import storage from '../utils/storage';

// Log in
export const login = ({ remember, ...credentials }) => {
  return client
    .post('/api/v1/loginJWT', credentials)
    .then(({token, displayName}) => {
      configureClient( {token} );
      if (remember) {
        storage.set('auth',token);
      }      
      return displayName;
    })
    
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
    .catch((error) => console.error('Error', error));
};

// Forgot Password
export const forgotPassword = email => {
  return client
    .post('/api/v1/forgot', { email })
    .then((data) => data)
    .catch(error => console.log('Error', error));
}

