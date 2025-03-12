import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage } from './utils/parse-axios-error';
import { getBearerAuthorization, getViteEnvVariable } from './utils/common';
import { joinUrl } from './utils/backend';
import { refreshRefreshToken, validateAccessToken } from './tokens';
import { ApiRoute, AUTH_NAME } from './const';

const VITE_BACKEND_URL_ENV = 'VITE_BACKEND_URL';
const BACKEND_URL = getViteEnvVariable(VITE_BACKEND_URL_ENV);
const REQUEST_TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      if (config.headers) {
        const currentAccessToken = AccessTokenStore.getToken();
        const currentRefreshToken = RefreshTokenStore.getToken();

        if (currentAccessToken && currentRefreshToken) {
          //! если идет проверка статуса, то будет вызвана два раза... как нибуть зачесть ответ первого вызова для второго...
          const checkUrl = joinUrl(BACKEND_URL, ApiRoute.Check);
          const isValid = await validateAccessToken(checkUrl, currentAccessToken);

          if (!isValid) {
            try {
              const refreshUrl = joinUrl(BACKEND_URL, ApiRoute.Refresh);
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

      if (url !== ApiRoute.Check || response && !response.data) {
        toast.dismiss();
        toast.warn(getAxiosErrorMessage(error));
      }

      return Promise.reject(error);
    }
  );

  return api;
}
