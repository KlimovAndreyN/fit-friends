import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { AccountRoute, AUTH_NAME, RequestProperty, ServiceRoute, TokenPayloadRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

const ERROR_MESSAGE = 'Authorization is empty!';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { RequestId: requestIdKey, UserId: userIdKey } = RequestProperty;
    const requestId = request[requestIdKey];
    const { method, url: requestUrl, headers } = request;
    const authorization = headers[AUTH_NAME];

    if (!authorization) {
      const logMessage = [method, requestUrl, requestIdKey, requestId, ERROR_MESSAGE].join(': ')

      Logger.log(logMessage, CheckAuthGuard.name);

      throw new UnauthorizedException(ERROR_MESSAGE);
    }

    const url = joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.Account, AccountRoute.Check);
    const { data } = await this.httpService.axiosRef.get<TokenPayloadRdo>(url, makeHeaders(requestId, authorization));
    const userId = data.sub;

    request[RequestProperty.User] = data; // для UsersController.checkToken, CheckSportsmanGuard, CheckCoachGuard
    request[userIdKey] = userId; // для всех

    const logMessage = [method, requestUrl, `${userIdKey} is ${userId || 'empty'}`].join(': ')

    Logger.log(logMessage, CheckAuthGuard.name);

    return true;
  }
}
