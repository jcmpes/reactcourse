import axios from 'axios';

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
    return Promise.reject({
      message: error.response.statusText,
      ...error.response,
      ...error.response.data,
    });
  },
);

export const configureClient = ({ token }) => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export const resetClient = () => {
  removeAuthorizationHeader();
};

export default client;
