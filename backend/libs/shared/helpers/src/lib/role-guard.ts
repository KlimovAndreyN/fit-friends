import { ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';

import { RequestProperty, Role, TokenPayloadRdo } from '@backend/shared/core';

export function checkAccessByRole(context: ExecutionContext, allowRole: Role, guardName: string): boolean {
  const request = context.switchToHttp().getRequest<Request>();
  const { role } = request[RequestProperty.User] as TokenPayloadRdo;

  Logger.log(`${request.method}: ${request.url}: userRole is ${role}`, guardName);

  if (role === allowRole) {
    return true;
  }

  throw new ForbiddenException(`Allow only for ${allowRole}!`);
}
