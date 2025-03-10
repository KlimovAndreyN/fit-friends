import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { AUTH_NAME, RequestProperty, RouteAlias } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';
import { TokenPayloadRdo } from '@backend/account/authentication';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const url = [this.apiOptions.accountServiceUrl, RouteAlias.Check].join('/');
    const requestId = request[RequestProperty.RequestId];
    const authorization = request.headers[AUTH_NAME]
    const { data } = await this.httpService.axiosRef.get<TokenPayloadRdo>(url, makeHeaders(requestId, authorization));
    const userId = data.sub;

    request[RequestProperty.User] = data; // для UsersController.checkToken
    request[RequestProperty.UserId] = userId; // для всех
    Logger.log(`${request.method}: ${request.url}: ${RequestProperty.UserId} is ${userId || 'empty'}`, CheckAuthGuard.name);

    return true;
  }
}
