import Axios, { AxiosError } from 'axios';

import storage from '@/util/storage';

export const axios = Axios.create({ baseURL: import.meta.env.VITE_APP_BACKEND_URL });

axios.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const accessToken = storage.get('access_token');
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  config.headers['accept'] = 'application/json';
  config.headers['content-type'] = 'application/json';

  return config;
});

axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  },
);
