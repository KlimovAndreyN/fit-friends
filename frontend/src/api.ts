import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { TokenStore } from './utils/token-store';
import { AUTH_NAME } from './types/backend';

const BACKEND_URL = 'http://localhost:3000/api';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers) {
        const token = TokenStore.get();

        if (token) {
          config.headers[AUTH_NAME] = `Bearer ${token}`;
        }
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      toast.dismiss();
      //!toast.warn(error.response ? error.response.data.error : error.message);
      //! временно
      // eslint-disable-next-line no-console
      console.log(error);
      toast.warn(error.response ? error.response.statusText : error.message);
      //!

      return Promise.reject(error);
    }
  );

  return api;
};
