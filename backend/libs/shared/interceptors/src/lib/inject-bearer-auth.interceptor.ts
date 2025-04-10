import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { AUTH_NAME, RequestProperty } from '@backend/shared/core';

@Injectable()
export class InjectBearerAuthInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers[AUTH_NAME];

    request[RequestProperty.BearerAuth] = authorization;
    Logger.log(`${request.method}: ${request.url}: ${RequestProperty.BearerAuth}: ${(authorization) ? 'exists' : 'empty'}`, InjectBearerAuthInterceptor.name);

    return next.handle();
  }
}
