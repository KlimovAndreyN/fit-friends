import { ForbiddenException, Injectable } from '@nestjs/common';

import { BasicUserProfileRdo, isCoachRole, Role } from '@backend/shared/core';
import { FitUserRepository } from '@backend/account/fit-user';
import { FitQuestionnaireRepository } from '@backend/account/fit-questionnaire'

const LIMIT_MAX = 50;

@Injectable()
export class FitUserProfileService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly fitQuestionnaireRepository: FitQuestionnaireRepository
  ) { }

  public async getReadyForTraining(userId: string, userRole: Role): Promise<BasicUserProfileRdo[]> {
    if (isCoachRole(userRole)) {
      throw new ForbiddenException('Not allow for coach!');
    }

    const users = await this.fitUserRepository.getAll([userId]);
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
