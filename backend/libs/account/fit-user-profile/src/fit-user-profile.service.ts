import { ForbiddenException, Injectable } from '@nestjs/common';

import { isCoachRole, Role, UserProfileRdo } from '@backend/shared/core';
import { FitUserRepository } from '@backend/account/fit-user';
import { FitQuestionnaireRepository } from '@backend/account/fit-questionnaire'

@Injectable()
export class FitUserProfileService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly fitQuestionnaireRepository: FitQuestionnaireRepository
  ) { }

  public async getReadyForTraining(userId: string, userRole: Role): Promise<UserProfileRdo[]> {
    if (isCoachRole(userRole)) {
      throw new ForbiddenException('Not allow for coach!');
    }

    const users = await this.fitUserRepository.getAll([userId]);
    const questionnaireUserIds = await this.fitQuestionnaireRepository.getReadyForTrainingUserIds();
    const filteredUsers = users.filter(({ id }) => (questionnaireUserIds.includes(id)))
    const usersProfiles: UserProfileRdo[] = [];

    for (const { id, location, name, role, avatarFileId } of filteredUsers.slice(0, 5)) {   //! обрезать до максимального значения
      const { specializations } = await this.fitQuestionnaireRepository.findByUserId(id);
      const userProfile: UserProfileRdo = { id, location, name, role, specializations, avatarFilePath: avatarFileId };

      usersProfiles.push(userProfile);
    }

    return usersProfiles;
  }
}
