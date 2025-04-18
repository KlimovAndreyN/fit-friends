import { ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';

import { RequestProperty, Role, TokenPayloadRdo } from '@backend/shared/core';

export function checkAccessByRole(context: ExecutionContext, allowRole: Role, guardName: string): boolean {
  const request = context.switchToHttp().getRequest<Request>();
  const { role } = request[RequestProperty.User] as TokenPayloadRdo;
  const { method, url } = request;
  const logMessage = [method, url, `userRole is ${role}`].join(': ');

  Logger.log(logMessage, guardName);

  if (role === allowRole) {
    return true;
  }

  throw new ForbiddenException(`Allow only for ${allowRole}!`);
}
