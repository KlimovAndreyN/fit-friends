import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { TokensStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage } from './utils/parse-axios-error';
import { AUTH_NAME } from './types/backend';
import { ApiRoute } from './const';

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
        const token = TokensStore.getAccessToken();

        if (token) {
          config.headers[AUTH_NAME] = `Bearer ${token}`;
        }
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DataAxiosError>) => {
      const { response, config: { url } } = error;

      if (url !== ApiRoute.Check || response && !response.data) {
        toast.dismiss();
        toast.warn(getAxiosErrorMessage(error));
      }

      return Promise.reject(error);
    }
  );

  return api;
};
