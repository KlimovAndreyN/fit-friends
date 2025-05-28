import { ForbiddenException, Injectable } from '@nestjs/common';

import {
  BasicUserProfileRdo, isCoachRole, UserProfileQuery,
  BasicUsersProfilesWithPaginationRdo, Role
} from '@backend/shared/core';
import { FitUserRepository } from '@backend/account/fit-user';
import { FitQuestionnaireRepository } from '@backend/account/fit-questionnaire'

const LIMIT_MAX = 50;

@Injectable()
export class FitUserProfileService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly fitQuestionnaireRepository: FitQuestionnaireRepository
  ) { }

  private checkNotAllowForCoach(role: Role) {
    if (isCoachRole(role)) {
      throw new ForbiddenException('Not allow for coach!');
    }
  }

  public async find(userId: string, query: UserProfileQuery, role: Role): Promise<BasicUsersProfilesWithPaginationRdo> {
    this.checkNotAllowForCoach(role);

    //! временно
    console.log('query', query);
    const usersProfiles = await this.getReadyForTraining(userId, role);
    const data: BasicUsersProfilesWithPaginationRdo = { currentPage: 1, itemsPerPage: 10, totalItems: 100, totalPages: 10, entities: usersProfiles };
    //

    return data;
  }

  public async getReadyForTraining(userId: string, role: Role): Promise<BasicUserProfileRdo[]> {
    this.checkNotAllowForCoach(role);

    const users = await this.fitUserRepository.getAllWithoutIds([userId]);
    const questionnaireUserIds = await this.fitQuestionnaireRepository.getReadyForTrainingUserIds();
    const filteredUsers = users.filter(({ id }) => (questionnaireUserIds.includes(id)))
    const usersProfiles: BasicUserProfileRdo[] = [];

    for (const { id, location, name, role, avatarFileId } of filteredUsers.slice(0, LIMIT_MAX)) {
      const { specializations } = await this.fitQuestionnaireRepository.findByUserId(id);
      const userProfile: BasicUserProfileRdo = { id, location, name, role, specializations, avatarFileId };

      usersProfiles.push(userProfile);
    }

    return usersProfiles;
  }
}
