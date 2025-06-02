import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  ServiceRoute, UserProfileRoute, UsersProfilesWithPaginationRdo,
  BasicUserProfileRdo, UserProfileQuery, RequestWithRequestIdAndUser,
  BasicUsersProfilesWithPaginationRdo, UserProfileRdo, Role,
  PageQuery, PaginationResult
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

  private getFriendsUrl(...routes: string[]): string {
    return joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.Friends, ...routes);
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

  public async getFriends(query: PageQuery, userId: string, requestId: string): Promise<UsersProfilesWithPaginationRdo> {
    const url = this.getFriendsUrl(getQueryString(query));
    const headers = makeHeaders(requestId, null, userId);
    const {
      data: { currentPage, entities: userIds, itemsPerPage, totalItems, totalPages }
    } = await this.httpService.axiosRef.get<PaginationResult<string[]>>(url, headers);

    //! отладка
    console.log('userIds', userIds);
    console.log('currentPage, itemsPerPage, totalItems, totalPages');
    //! временно
    const entities: UserProfileRdo[] = [];

    const data: UsersProfilesWithPaginationRdo = { entities, currentPage, itemsPerPage, totalItems, totalPages };

    return data;
  }

  public async checkFriend(userId: string, currentUserId: string, requestId: string): Promise<boolean> {
    const url = this.getFriendsUrl(userId);
    const headers = makeHeaders(requestId, null, currentUserId);
    const { data: isFriend } = await this.httpService.axiosRef.get<boolean>(url, headers);

    return isFriend;
  }

  public async addFriend(userId: string, currentUserId: string, role: Role, requestId: string): Promise<void> {
    const url = this.getFriendsUrl();
    const headers = makeHeaders(requestId, null, currentUserId, role);

    await this.httpService.axiosRef.post(url, { userId }, headers);
  }

  public async deleteFriend(userId: string, currentUserId: string, requestId: string): Promise<void> {
    const url = this.getFriendsUrl(userId);
    const headers = makeHeaders(requestId, null, currentUserId);

    await this.httpService.axiosRef.delete(url, headers);
  }
}
