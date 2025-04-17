import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AccountRoute, ApiServiceRoute, AUTH_NAME, ITokensRdo } from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage, isErrorNetwork } from './utils/parse-axios-error';
import { getBearerAuthorization, getViteEnvVariable, getViteEnvBooleanVariable } from './utils/common';

export enum HttpCode {
  OK = 200,
  NoAuth = 401
}

const ViteEnvOption = {
  BACKEND_URL: 'VITE_BACKEND_URL',
  URL_AXIOS_ERROR: 'VITE_SHOW_URL_AXIOS_ERROR'
} as const;

const REQUEST_TIMEOUT = 5000;

const baseURL = getViteEnvVariable(ViteEnvOption.BACKEND_URL);
const showUrlAxiosError = getViteEnvBooleanVariable(ViteEnvOption.URL_AXIOS_ERROR);

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const { headers } = config;

      if (headers) {
        const refreshUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh);
        const logoutUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Logout);
        const url = config.url;
        const token = (url && [refreshUrl, logoutUrl].includes(url)) ? RefreshTokenStore.getToken() : AccessTokenStore.getToken();

        if (token) {
          headers[AUTH_NAME] = getBearerAuthorization(token);
        }
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<DataAxiosError>) => {
      const { response, config: { url } } = error;
      const refreshUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh);
      const loginUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Login);
      const logoutUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Logout);
      const originalRequestConfig = error.config;

      // пробуем обновить токены
      if (![refreshUrl, loginUrl, logoutUrl].includes(url || '') && (response?.status === HttpCode.NoAuth) && !originalRequestConfig.retry) {
        originalRequestConfig.retry = true;

        if (!RefreshTokenStore.getToken()) {
          return Promise.reject('RefreshToken is empty!');
        }

        const { data: { accessToken, refreshToken } } = await api.post<ITokensRdo>(refreshUrl);

        AccessTokenStore.save(accessToken);
        RefreshTokenStore.save(refreshToken);

        //! нужен ли await?
        return api(originalRequestConfig);
      }

      //! отладка обработки ошибок / при выставленной переменной окружения VITE_SHOW_URL_AXIOS_ERROR
      if (showUrlAxiosError) {
        //! проверить обработку ошибок
        // eslint-disable-next-line no-console
        console.log('response', response);
        // eslint-disable-next-line no-console
        console.log('url', url);
        // eslint-disable-next-line no-console
        console.log('error', error);
      }

      toast.dismiss();
      toast.warn(getAxiosErrorMessage(error, showUrlAxiosError));

      // если ошибка при обновлении токенов
      if (url === refreshUrl) {
        // если ошибка не по связи
        if (!isErrorNetwork(error)) {
          // то удалим токены
          AccessTokenStore.drop();
          RefreshTokenStore.drop();
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
