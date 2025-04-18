import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger } from '@nestjs/common';

import { RequestProperty, Role, TokenPayloadRdo } from '@backend/shared/core';

@Injectable()
export class CheckSportsmanGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { role } = request[RequestProperty.User] as TokenPayloadRdo;

    Logger.log(`${request.method}: ${request.url}: userRole is ${role}`, CheckSportsmanGuard.name);

    if (role === Role.Sportsman) {
      return true;
    }

    throw new ForbiddenException(`Allow only for ${Role.Sportsman}`);
  }
}
