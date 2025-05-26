import { Injectable } from '@nestjs/common';

import { FitUserRepository } from '@backend/account/fit-user';
import { FitQuestionnaireEntity, FitQuestionnaireRepository } from '@backend/account/fit-questionnaire'

@Injectable()
export class FitUserProfileService {
  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly fitQuestionnaireRepository: FitQuestionnaireRepository
  ) { }

  public async getReadyForTraining(): Promise<FitQuestionnaireEntity[]> {
    const entities = await this.fitQuestionnaireRepository.getReadyForTraining();

    //! отладка
    console.log('FitUserProfileService - getReadyForTraining - entities', entities);

    return entities;
  }
}
