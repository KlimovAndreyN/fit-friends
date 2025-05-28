import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import { ServiceRoute, UserProfileRoute, UserProfileRdo, RequestWithRequestIdAndUser } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { FileService } from './file.service';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  private getUrl(...routes: string[]): string {
    return joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.UsersProfiles, ...routes);
  }

  public async getReadyForTraining(request: RequestWithRequestIdAndUser): Promise<UserProfileRdo[]> {
    const { user: { sub, role }, requestId } = request;
    const url = this.getUrl(UserProfileRoute.LookForCompany);
    const headers = makeHeaders(requestId, null, sub, role);
    const { data } = await this.httpService.axiosRef.get<UserProfileRdo[]>(url, headers);

    //! отладка
    console.log('data', data);
    //! добавить avatarFilePath

    return data;
  }
}
