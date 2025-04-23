import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AUTH_NAME, ITokensRdo } from '@backend/shared/core';
import { convertDtoToFormData } from '@backend/shared/helpers';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage, isErrorNetwork } from './utils/parse-axios-error';
import { getBearerAuthorization, getViteEnvVariable, getViteEnvBooleanVariable } from './utils/common';
import { ApiRoute } from './const';

enum HttpCode {
  NoAuth = 401,
  NotFound = 404
}

const ViteEnvOption = {
  BACKEND_URL: 'VITE_BACKEND_URL',
  URL_AXIOS_ERROR: 'VITE_SHOW_URL_AXIOS_ERROR'
} as const;

const REQUEST_TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: getViteEnvVariable(ViteEnvOption.BACKEND_URL),
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const { headers, useMultipartFormData, retry, url = '' } = config;
      const { REFRESH, LOGOUT } = ApiRoute;

      if (headers) {
        const token = ([REFRESH, LOGOUT].includes(url)) ? RefreshTokenStore.getToken() : AccessTokenStore.getToken();

        if (token) {
          headers[AUTH_NAME] = getBearerAuthorization(token);
        }
      }

      if (useMultipartFormData) {
        config.transformRequest = (retry) ? undefined : convertDtoToFormData;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<DataAxiosError>) => {
      const { response, config: { url = '', notFoundToReject } } = error;
      const status = response?.status;
      const originalRequestConfig = error.config;
      const showUrlAxiosError = getViteEnvBooleanVariable(ViteEnvOption.URL_AXIOS_ERROR);
      const { REFRESH, LOGIN, LOGOUT } = ApiRoute;

      // пробуем обновить токены
      if (
        ![REFRESH, LOGIN, LOGOUT].includes(url)
        && (status === HttpCode.NoAuth)
        && !originalRequestConfig.retry
      ) {
        originalRequestConfig.retry = true;

        if (!RefreshTokenStore.getToken()) {
          return Promise.reject('RefreshToken is empty!');
        }

        const { data: { accessToken, refreshToken } } = await api.post<ITokensRdo>(REFRESH);

        AccessTokenStore.save(accessToken);
        RefreshTokenStore.save(refreshToken);

        //! нужен ли await?
        return api(originalRequestConfig);
      }

      if ((status === HttpCode.NotFound) && notFoundToReject) {
        //! отладка обработки ошибок / при выставленной переменной окружения VITE_SHOW_URL_AXIOS_ERROR
        if (showUrlAxiosError) {
          // eslint-disable-next-line no-console
          console.log('notFoundToReject - ', url, ': error - ', error);
        }

        return Promise.reject(error);
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
      if (url === REFRESH) {
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
