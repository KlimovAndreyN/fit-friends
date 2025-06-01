import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  ServiceRoute, UserProfileRoute, UsersProfilesWithPaginationRdo,
  BasicUserProfileRdo, UserProfileQuery, RequestWithRequestIdAndUser,
  BasicUsersProfilesWithPaginationRdo, UserProfileRdo
} from '@backend/shared/core';
import { getQueryString, joinUrl, makeHeaders } from '@backend/shared/helpers';
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

  private async makeUsersProfiles(basicUsersProfiles: BasicUserProfileRdo[], requestId: string): Promise<UserProfileRdo[]> {
    const usersProfiles: UserProfileRdo[] = [];

    for (const { id, location, name, role, specializations, avatarFileId } of basicUsersProfiles) {
      const avatarFilePath = await this.fileService.getFilePath(avatarFileId, requestId);
      const userProfile: UserProfileRdo = { id, location, name, role, specializations, avatarFilePath };

      usersProfiles.push(userProfile);
    }

    return usersProfiles;
  }

  public async find(request: RequestWithRequestIdAndUser, query: UserProfileQuery): Promise<UsersProfilesWithPaginationRdo> {
    const { user: { sub, role }, requestId } = request;
    const url = this.getUrl(getQueryString(query));
    const headers = makeHeaders(requestId, null, sub, role);
    const {
      data: { currentPage, entities, itemsPerPage, totalItems, totalPages }
    } = await this.httpService.axiosRef.get<BasicUsersProfilesWithPaginationRdo>(url, headers);
    const usersProfiles = await this.makeUsersProfiles(entities, requestId);
    const data: UsersProfilesWithPaginationRdo = { entities: usersProfiles, currentPage, itemsPerPage, totalItems, totalPages };

    return data;
  }

  public async getReadyForTraining(request: RequestWithRequestIdAndUser): Promise<UserProfileRdo[]> {
    const { user: { sub, role }, requestId } = request;
    const url = this.getUrl(UserProfileRoute.LookForCompany);
    const headers = makeHeaders(requestId, null, sub, role);
    const { data: basicUsersProfiles } = await this.httpService.axiosRef.get<BasicUserProfileRdo[]>(url, headers);
    const usersProfiles = await this.makeUsersProfiles(basicUsersProfiles, requestId);

    return usersProfiles;
  }

  public async updateFriend(isFriend: boolean, userId: string, currentUserId: string, requestId: string): Promise<void> {
    //! отладка
    console.log('updateFriend', isFriend, userId, currentUserId, requestId);
    /*
    const { user: { sub, role }, requestId } = request;
    const url = this.getUrl(UserProfileRoute.LookForCompany);
    const headers = makeHeaders(requestId, null, sub, role);
    const { data: basicUsersProfiles } = await this.httpService.axiosRef.get<BasicUserProfileRdo[]>(url, headers);
    */
    /*
      const headers = makeHeaders(requestId, null, userId);
      const dto: UpdateQuestionnaireDto = { readyForTraining };
      await this.httpService.axiosRef.patch<QuestionnaireRdo>(this.getUrl(), dto, headers);
    */
  }
}
