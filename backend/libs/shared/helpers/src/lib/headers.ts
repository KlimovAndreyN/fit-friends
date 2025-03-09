import { AUTH_NAME, XHeader } from '@backend/shared/core';

type XHeaders = { headers: { [XHeader.RequestId]: string, [AUTH_NAME]?: string, [XHeader.UserId]?: string } };

export function makeHeaders(requestId: string, authorization?: string, userId?: string): XHeaders {
  const headers = { [XHeader.RequestId]: requestId };

  if (authorization) {
    headers[AUTH_NAME] = authorization;
  }

  if (userId) {
    headers[XHeader.UserId] = userId;
  }

  return { headers };
}
