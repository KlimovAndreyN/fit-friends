import axios from 'axios';
import { AUTH_NAME, TokenPayloadRdo, UserTokenRdo } from './types/backend';
import { HttpCode } from './const';
import { getBearerAuthorization } from './utils/common';

const REQUEST_TIMEOUT = 5000;

function getAuthorizationHeader(token: string) {
  return { [AUTH_NAME]: getBearerAuthorization(token) };
}

function getAxiosOptions(token: string, timeout = REQUEST_TIMEOUT) {
  const headers = getAuthorizationHeader(token);

  return { timeout, headers };
}

export async function validateAccessToken(url: string, accessToken: string): Promise<boolean> {
  try {
    const response = await axios.get<TokenPayloadRdo>(url, getAxiosOptions(accessToken));

    return response.status === HttpCode.OK;
  } catch (error) {
    return false;
  }
}

export async function refreshRefreshToken(url: string, refreshToken: string): Promise<UserTokenRdo> {
  const { data } = await axios.post<UserTokenRdo>(url, {}, getAxiosOptions(refreshToken));

  return { ...data };
}
