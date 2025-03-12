import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { PrefixOption, ServiceRoute, UserRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public getUrl(route = ''): string {
    return joinUrl(this.apiOptions.accountServiceUrl, PrefixOption.Global, ServiceRoute.Auth, route);
  }

  public async getUser(id: string, requestId: string): Promise<UserRdo> {
    const url = this.getUrl(id);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<UserRdo>(url, headers);

    return data;
  }
}
