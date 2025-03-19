import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AccountRoute, ApiServiceRoute, AUTH_NAME } from '@backend/shared';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage } from './utils/parse-axios-error';
import { joinUrl, getBearerAuthorization, getViteEnvVariable, getViteEnvBooleanVariable } from './utils/common';

const VITE_BACKEND_URL_ENV = 'VITE_BACKEND_URL';
const VITE_SHOW_URL_AXIOS_ERROR_ENV = 'VITE_SHOW_URL_AXIOS_ERROR';
const REQUEST_TIMEOUT = 5000;

const baseURL = getViteEnvVariable(VITE_BACKEND_URL_ENV);
const showUrlAxiosError = getViteEnvBooleanVariable(VITE_SHOW_URL_AXIOS_ERROR_ENV);

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const { headers } = config;

      if (headers) {
        const refreshUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh);
        const logoutUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Logout);
        const url = config.url || '';
        const token = ([refreshUrl, logoutUrl].includes(url)) ? RefreshTokenStore.getToken() : AccessTokenStore.getToken();

        if (token) {
          headers[AUTH_NAME] = getBearerAuthorization(token);
        }
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DataAxiosError>) => {
      const { response, config: { url } } = error;
      const checkUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Check);

      if ((url !== checkUrl) || (response && !response.data)) {
        toast.dismiss();
        toast.warn(getAxiosErrorMessage(error, showUrlAxiosError));
      }

      return Promise.reject(error);
    }
  );

  return api;
}
