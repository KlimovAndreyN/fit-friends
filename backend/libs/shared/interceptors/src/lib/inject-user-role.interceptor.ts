import { Observable } from 'rxjs';
import { BadRequestException, CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { RequestProperty, Role, XHeader } from '@backend/shared/core';
import { convertEnumToArray } from '@backend/shared/helpers';

@Injectable()
export class InjectUserRoleInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const userRole = request.headers[XHeader.UserRole];

    if (!userRole) {
      throw new BadRequestException(`Header '${XHeader.UserRole}' is empty!`);
    }

    const roles = convertEnumToArray(Role);
    if (!roles.includes(userRole)) {
      throw new BadRequestException(`Header '${XHeader.UserRole}' mast in (${roles.join(',')})`);
    }

    request[RequestProperty.UserRole] = userRole; //! можно доделать валидацию по Role
    Logger.log(`${request.method}: ${request.url}: ${RequestProperty.UserRole}: ${userRole}`, InjectUserRoleInterceptor.name);

    return next.handle();
  }
}
