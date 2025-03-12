import { BadRequestException, CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { AUTH_NAME, AuthenticationMessage, RequestProperty } from '@backend/shared/core';

@Injectable()
export class CheckNotAuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const requestId = request[RequestProperty.RequestId];
    const bearerAuth: string = request.headers[AUTH_NAME] || '';

    Logger.log(`${request.method}: ${request.url}: ${RequestProperty.RequestId}: ${requestId}: Authorization ${bearerAuth ? 'exist' : 'is empty'} `, CheckNotAuthGuard.name);

    if (bearerAuth) {
      const [, token] = bearerAuth.split(' ');

      throw new BadRequestException([AuthenticationMessage.RequireLogout, 'Token:', token].join(' '));
    }

    return true;
  }
}
