import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { AccountRoute, AUTH_NAME, PrefixOption, RequestProperty, ServiceRoute, TokenPayloadRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const url = joinUrl(this.apiOptions.accountServiceUrl, PrefixOption.Global, ServiceRoute.Auth, AccountRoute.Check);
    const requestId = request[RequestProperty.RequestId];
    const authorization = request.headers[AUTH_NAME];
    const { data } = await this.httpService.axiosRef.get<TokenPayloadRdo>(url, makeHeaders(requestId, authorization));
    const userId = data.sub;

    request[RequestProperty.User] = data; // для UsersController.checkToken
    request[RequestProperty.UserId] = userId; // для всех
    Logger.log(`${request.method}: ${request.url}: ${RequestProperty.UserId} is ${userId || 'empty'}`, CheckAuthGuard.name);

    return true;
  }
}
