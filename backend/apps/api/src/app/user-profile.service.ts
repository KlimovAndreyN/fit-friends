import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import { ServiceRoute, UserProfileRoute, UserProfileRdo, RequestWithRequestIdAndUser, BasicUserProfileRdo, UsersProfilesWithPaginationRdo, UserProfileQuery } from '@backend/shared/core';
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

  private async convertToUsersProfiles(basicUsersProfiles: BasicUserProfileRdo[], requestId: string): Promise<UserProfileRdo[]> {
    const usersProfiles: UserProfileRdo[] = [];

    for (const { id, location, name, role, specializations, avatarFileId } of basicUsersProfiles) {
      const avatarFilePath = await this.fileService.getFilePath(avatarFileId, requestId);
      const userProfile: UserProfileRdo = { id, location, name, role, specializations, avatarFilePath };

      usersProfiles.push(userProfile);
    }

    return usersProfiles;
  }

  public async find(request: RequestWithRequestIdAndUser, query: UserProfileQuery): Promise<UsersProfilesWithPaginationRdo> {
    //! временно
    console.log('UserProfileService - find - query', query);
    const usersProfiles = await this.getReadyForTraining(request);
    const data: UsersProfilesWithPaginationRdo = { entities: usersProfiles, currentPage: 1, itemsPerPage: 10, totalItems: 100, totalPages: 10 };
    //

    return data;
  }

  public async getReadyForTraining(request: RequestWithRequestIdAndUser): Promise<UserProfileRdo[]> {
    const { user: { sub, role }, requestId } = request;
    const url = this.getUrl(UserProfileRoute.LookForCompany);
    const headers = makeHeaders(requestId, null, sub, role);
    const { data: basicUsersProfiles } = await this.httpService.axiosRef.get<BasicUserProfileRdo[]>(url, headers);
    const usersProfiles = await this.convertToUsersProfiles(basicUsersProfiles, requestId);

    return usersProfiles;
  }
}
