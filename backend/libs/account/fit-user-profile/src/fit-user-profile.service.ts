import { ForbiddenException, Injectable } from '@nestjs/common';

import {
  BasicUserProfileRdo, UserProfileQuery, getRoreByUserSortType,
  BasicUsersProfilesWithPaginationRdo, isCoachRole, Role
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { FitUserRepository } from '@backend/account/fit-user';
import { FitQuestionnaireRepository } from '@backend/account/fit-questionnaire'

const Default = {
  PAGE: 1,
  LIMIT_MAX: 50
} as const;

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

    const {
      page: currentPage = Default.PAGE,
      limit: take = Default.LIMIT_MAX,
      sortType,
      locations,
      trainingLevel,
      specializations
    } = query;

    const userIds = await this.fitQuestionnaireRepository.findUserIds(trainingLevel, specializations);
    const { entities, itemsPerPage, totalItems, totalPages } = await this.fitUserRepository.findManyWithPagination(currentPage, take, [userId], userIds, getRoreByUserSortType(sortType), locations); //! тут нужно обработать пагинацию
    const usersProfiles = entities.map((user) => (fillDto(BasicUserProfileRdo, user.toPOJO())));

    for (const userProfile of usersProfiles) {
      const { specializations: userSpecializations } = await this.fitQuestionnaireRepository.findByUserId(userProfile.id);

      userProfile.specializations = [...userSpecializations];
    }

    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      entities: usersProfiles
    };
  }

  public async getReadyForTraining(userId: string, role: Role): Promise<BasicUserProfileRdo[]> {
    this.checkNotAllowForCoach(role);

    const users = await this.fitUserRepository.findSportsmans([userId]);
    const questionnaireUserIds = await this.fitQuestionnaireRepository.getReadyForTrainingUserIds();
    const filteredUsers = users.filter(({ id }) => (questionnaireUserIds.includes(id)));
    const usersProfiles: BasicUserProfileRdo[] = [];

    for (const { id, location, name, role, avatarFileId } of filteredUsers.slice(0, Default.LIMIT_MAX)) {
      const { readyForTraining, specializations } = await this.fitQuestionnaireRepository.findByUserId(id);
      const userProfile: BasicUserProfileRdo = { id, location, name, role, readyForTraining, specializations, avatarFileId };

      usersProfiles.push(userProfile);
    }

    return usersProfiles;
  }
}
