import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  ServiceRoute, UserProfileRoute, UsersProfilesWithPaginationRdo,
  BasicUserProfileRdo, UserProfileQuery, RequestWithRequestIdAndUser,
  BasicUsersProfilesWithPaginationRdo, UserProfileRdo, PaginationResult,
  PageQuery, Role, FriendsWithPaginationRdo, DetailUserProfileRdo,
  FriendRdo, TrainingRequestStatus
} from '@backend/shared/core';
import { getQueryString, joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { FileService } from './file.service';
import { UserService } from './user.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
    private readonly userService: UserService,
    private readonly fitQuestionnaireService: FitQuestionnaireService,
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

    for (const { avatarFileId, ...userFields } of basicUsersProfiles) {
      const avatarFilePath = await this.fileService.getFilePath(avatarFileId, requestId);
      const userProfile: UserProfileRdo = { ...userFields, avatarFilePath };

      usersProfiles.push(userProfile);
    }

    return usersProfiles;
  }

  public async getDetailUserProfile(userId: string, currentUserId: string, role: Role, requestId: string): Promise<DetailUserProfileRdo> {
    const user = await this.userService.getDetailUser(userId, currentUserId, role, requestId);
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire }
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

  public async getFriends(query: PageQuery, currentUserId: string, currentUserRole: Role, requestId: string): Promise<FriendsWithPaginationRdo> {
    const url = this.getFriendsUrl(getQueryString(query));
    const headers = makeHeaders(requestId, null, currentUserId);
    const { data: {
      currentPage,
      entities: userIds,
      itemsPerPage,
      totalItems,
      totalPages
    } } = await this.httpService.axiosRef.get<PaginationResult<string>>(url, headers);
    const entities: FriendRdo[] = [];

    for (const userId of userIds) {
      const detailUserProfile = await this.getDetailUserProfile(userId, currentUserId, currentUserRole, requestId);
      const {
        user: { id, name, role, location, avatarFilePath },
        questionnaire: { readyForTraining, specializations }
      } = detailUserProfile;
      const outJointTrainingStatus = undefined;
      const inJointTrainingStatus = undefined;
      let personalTrainingStatus = undefined;

      //! отладка
      if (currentUserId === '658170cbb954e9f5b905ccf4') {
        if (id === '683f30550f05978e7ecc5a41') {
          personalTrainingStatus = TrainingRequestStatus.Pending;
        }
      }
      if (currentUserId === '683f30550f05978e7ecc5a41') {
        if (id === '658170cbb954e9f5b905ccf4') {
          personalTrainingStatus = TrainingRequestStatus.Pending;
        }
        if (id === '683f30550f05978e7ecc5a3f') {
          personalTrainingStatus = TrainingRequestStatus.Accepted;
        }
        if (id === '683f30550f05978e7ecc5a3d') {
          personalTrainingStatus = TrainingRequestStatus.Rejected;
        }
      }
      //!

      entities.push({
        id,
        name,
        role,
        location,
        avatarFilePath,
        readyForTraining,
        specializations,
        outJointTrainingStatus,
        inJointTrainingStatus,
        personalTrainingStatus
      });
    }

    return {
      entities,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages
    };
  }

  public async checkFriend(userId: string, currentUserId: string, requestId: string): Promise<boolean> {
    const url = this.getFriendsUrl(userId);
    const headers = makeHeaders(requestId, null, currentUserId);
    const { data: isFriend } = await this.httpService.axiosRef.get<boolean>(url, headers);

    return isFriend;
  }

  public async addFriend(userId: string, request: RequestWithRequestIdAndUser): Promise<void> {
    const { user: { sub, role }, requestId } = request;
    const url = this.getFriendsUrl();
    const headers = makeHeaders(requestId, null, sub, role);

    await this.httpService.axiosRef.post(url, { userId }, headers);
  }

  public async deleteFriend(userId: string, currentUserId: string, requestId: string): Promise<void> {
    const url = this.getFriendsUrl(userId);
    const headers = makeHeaders(requestId, null, currentUserId);

    await this.httpService.axiosRef.delete(url, headers);
  }
}
