import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { TokensStore } from './utils/token-store';
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
        const accessToken = TokensStore.getAccessToken();
        const refreshToken = TokensStore.getRefreshToken();

        if (accessToken && refreshToken) {
          const isValid = await validateAccessToken(accessToken);

          if (!isValid) {
            try {
              const tokens = await refreshRefreshToken(refreshToken);

              TokensStore.save(tokens.accessToken, tokens.refreshToken);
            } catch (error) {
              TokensStore.drop();
            }
          }
        }

        const token = TokensStore.getAccessToken();

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
