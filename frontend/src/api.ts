import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AccessTokenStore, RefreshTokenStore } from './utils/token-store';
import { DataAxiosError, getAxiosErrorMessage } from './utils/parse-axios-error';
import { AUTH_NAME, Token } from './types/backend';
import { ApiRoute, HttpCode } from './const';

const BACKEND_URL = 'http://localhost:3000/api';
const REQUEST_TIMEOUT = 5000;

function getBearerAuthorization(token: string): string {
  return `Bearer ${token}`;
}

async function validateAccessToken(
  accessToken: string,
  timeout = REQUEST_TIMEOUT
): Promise<boolean> {
  {
    const url = [BACKEND_URL, ApiRoute.Check].join('');
    const options = {
      timeout,
      headers: { [AUTH_NAME]: getBearerAuthorization(accessToken) }
    };

    try {
      const response = await axios.get<Token>(url, options);

      return response.status === HttpCode.OK;
    } catch (error) {
      return false;
    }
  }
}

async function refreshRefreshToken(
  refreshToken: string,
  timeout = REQUEST_TIMEOUT
): Promise<Token> {
  {
    const url = [BACKEND_URL, ApiRoute.Refresh].join('');
    const options = {
      timeout,
      headers: { [AUTH_NAME]: getBearerAuthorization(refreshToken) }
    };
    const { data } = await axios.post<Token>(url, {}, options);

    return { ...data };
  }
}

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
          const isValid = await validateAccessToken(currentAccessToken);

          if (!isValid) {
            try {
              const { accessToken, refreshToken } = await refreshRefreshToken(currentRefreshToken);

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
