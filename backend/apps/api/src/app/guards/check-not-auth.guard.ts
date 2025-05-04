import { BadRequestException, CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { AUTH_NAME, AuthenticationMessage, RequestProperty } from '@backend/shared/core';

@Injectable()
export class CheckNotAuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { RequestId: requestIdKey } = RequestProperty;
    const requestId = request[requestIdKey];
    const { method, url, headers } = request;
    const authorization: string = headers[AUTH_NAME];
    const logMessage = [method, url, requestIdKey, requestId, `Authorization ${authorization ? 'exist' : 'is empty'}`].join(': ')

    Logger.log(logMessage, CheckNotAuthGuard.name);

    if (!authorization) {
      return true;
    }

    const [, token] = authorization.split(' ');
    const errorMessage = [AuthenticationMessage.RequireLogout, 'Token:', token].join(' ');

    throw new BadRequestException(errorMessage); //! возможно UnauthorizedException, т.к. клиент не обработает BadRequestException
  }
}
