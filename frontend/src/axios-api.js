import axios from 'axios';
import qs from 'qs';
import { getToken } from '@/api/token-manager.js';

const defaultParamsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });

const createAxiosInstance = (serialize = defaultParamsSerializer) =>
  axios.create({
    baseURL: 'http://127.0.0.1:3000',
    paramsSerializer: { serialize },
  });

const base = createAxiosInstance();

base.interceptors.request.use((config) => {
  config.headers['Authorization'] = getToken();
  return config;
});

base.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    if (error.response.status === 401) {
      // eslint-disable-next-line no-console
      console.log('?');
    } else {
      throw error;
    }
  },
);

export { base };
