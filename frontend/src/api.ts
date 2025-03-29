import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AccountRoute, ApiServiceRoute, AUTH_NAME, ITokensRdo } from '@backend/shared';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage, isErrorNetwork } from './utils/parse-axios-error';
import { joinUrl, getBearerAuthorization, getViteEnvVariable, getViteEnvBooleanVariable } from './utils/common';
import { HttpCode } from './const';

const VITE_BACKEND_URL_ENV = 'VITE_BACKEND_URL';
const VITE_SHOW_URL_AXIOS_ERROR_ENV = 'VITE_SHOW_URL_AXIOS_ERROR';

const REQUEST_TIMEOUT = 5000;

const baseURL = getViteEnvVariable(VITE_BACKEND_URL_ENV);
const showUrlAxiosError = getViteEnvBooleanVariable(VITE_SHOW_URL_AXIOS_ERROR_ENV);

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

      //! отладка обработки ошибок / при выставленной переменной окружения showUrlAxiosError
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
