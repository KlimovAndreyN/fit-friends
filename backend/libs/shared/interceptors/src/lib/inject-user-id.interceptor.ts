import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, UnauthorizedException } from '@nestjs/common';

import { RequestProperty, XHeader } from '@backend/shared/core';

@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.headers[XHeader.UserId];

    if (!userId) {
      throw new UnauthorizedException(`Header '${XHeader.UserId}' is empty!`);
    }

    request[RequestProperty.UserId] = userId; //! можно доделать валидацию по GuidValidationPipe
    Logger.log(`${request.method}: ${request.url}: ${RequestProperty.UserId}: ${userId}`, InjectUserIdInterceptor.name);

    return next.handle();
  }
}
