import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AccountRoute, ApiServiceRoute, AUTH_NAME, IUserTokenRdo } from '@backend/shared';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage } from './utils/parse-axios-error';
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
      //! отладка
      // eslint-disable-next-line no-console
      console.log('error', error);

      const { response, config: { url } } = error;
      const refreshUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Refresh);
      const originalRequestConfig = error.config;

      //! продумать удаление токенов при ошибках
      /*
      if (!isErrorNetwork(checkTokenError)) {
        AccessTokenStore.drop();
        RefreshTokenStore.drop();
      }
      */

      // пробуем обновить токены
      if ((url !== refreshUrl) && (response?.status === HttpCode.NoAuth) && !originalRequestConfig.retry) {
        originalRequestConfig.retry = true;

        if (!RefreshTokenStore.getToken()) {
          return Promise.reject('RefreshToken is empty!');
        }

        //! нужно ли ловить исключение и так обрабытывает, по refreshUrl
        // try {
        const { data: { accessToken, refreshToken } } = await api.post<IUserTokenRdo>(refreshUrl);

        AccessTokenStore.save(accessToken);
        RefreshTokenStore.save(refreshToken);

        //! ? await ? return await api(originalRequestConfig);
        return api(originalRequestConfig);
        /*
        } catch (refreshError) {
          console.error('Unable to refresh tokens', refreshError);
        }
        */
      }

      //! проверить обработку ошибок
      const checkUrl = joinUrl(ApiServiceRoute.Users, AccountRoute.Check);
      // eslint-disable-next-line no-console
      console.log('response', response);
      // eslint-disable-next-line no-console
      console.log('url', url);
      // eslint-disable-next-line no-console
      console.log('checkUrl', checkUrl);

      //! if ((url !== checkUrl) || (response && !response.data)) {
      toast.dismiss();
      toast.warn(getAxiosErrorMessage(error, showUrlAxiosError));
      //! }

      return Promise.reject(error);
    }
  );

  return api;
}
