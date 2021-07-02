import client, { configureClient, resetClient } from "./client";

export const login = credentials => {
  return client.post('/api/v1/loginJWT', credentials).then(({ accessToken }) => {
    configureClient({ accessToken });
    localStorage.setItem('auth', accessToken);
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    resetClient();
    localStorage.removeItem('auth')
  });
};