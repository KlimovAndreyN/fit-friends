import axios from 'axios';

import { ITokenPayloadRdo, IUserTokenRdo } from '@backend/shared/interafces/rdo';

import { getBearerAuthorization } from './utils/common';
import { HttpCode, AUTH_NAME } from './const';

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
    const response = await axios.get<ITokenPayloadRdo>(url, getAxiosOptions(accessToken));

    return response.status === HttpCode.OK;
  } catch (error) {
    return false;
  }
}

export async function refreshRefreshToken(url: string, refreshToken: string): Promise<IUserTokenRdo> {
  const { data } = await axios.post<IUserTokenRdo>(url, {}, getAxiosOptions(refreshToken));

  return { ...data };
}
