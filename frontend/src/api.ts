import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AccountRoute, ApiServiceRoute, AUTH_NAME } from '@backend/shared/constants';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage } from './utils/parse-axios-error';
import { joinUrl, getBearerAuthorization, getViteEnvVariable, getViteEnvBooleanVariable } from './utils/common';
import { refreshRefreshToken, validateAccessToken } from './tokens';

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
    async (config: AxiosRequestConfig) => {
      if (config.headers) {
        const currentRefreshToken = RefreshTokenStore.getToken();
        const logoutUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Logout);

        if (config.url === logoutUrl) {
          if (currentRefreshToken) {
            config.headers[AUTH_NAME] = getBearerAuthorization(currentRefreshToken);
          }

          return config;
        }

        const currentAccessToken = AccessTokenStore.getToken();

        if (currentAccessToken && currentRefreshToken) {
          //! если идет проверка статуса, то будет вызвана два раза... как нибуть зачесть ответ первого вызова для второго...
          const checkUrl = joinUrl(baseURL, ApiServiceRoute.Users, AccountRoute.Check);
          const isValid = await validateAccessToken(checkUrl, currentAccessToken);

          if (!isValid) {
            const refreshUrl = joinUrl(baseURL, ApiServiceRoute.Users, AccountRoute.Refresh);

            try {
              const { accessToken, refreshToken } = await refreshRefreshToken(refreshUrl, currentRefreshToken);

              AccessTokenStore.save(accessToken);
              RefreshTokenStore.save(refreshToken);
            } catch (error) {
              AccessTokenStore.drop();
              RefreshTokenStore.drop();
            }
          }
        }

        const token = AccessTokenStore.getToken();

        if (token) {
          config.headers[AUTH_NAME] = getBearerAuthorization(token);
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
